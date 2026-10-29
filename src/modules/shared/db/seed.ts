import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import {
  SAMPLE_PROGRAMS,
  SAMPLE_UNIVERSITIES,
  SAMPLE_ENTRANCE_EXAMS,
  SAMPLE_COLLEGES_DATA,
} from "./sample-data";

export async function runSeed() {
  // eslint-disable-next-line no-console
  console.info("🌱 Starting ITinNepal database seed (Sample Data)...");

  // Always ensure a static JSON snapshot of the 20 sample colleges is available
  // This allows offline/mock repositories to serve realistic data when PG is not running
  const dataDir = path.resolve(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const snapshotPath = path.join(dataDir, "seed-snapshot.json");
  fs.writeFileSync(
    snapshotPath,
    JSON.stringify(
      {
        universities: SAMPLE_UNIVERSITIES,
        programs: SAMPLE_PROGRAMS,
        entranceExams: SAMPLE_ENTRANCE_EXAMS,
        colleges: SAMPLE_COLLEGES_DATA,
      },
      null,
      2
    ),
    "utf-8"
  );
  // eslint-disable-next-line no-console
  console.info(`[Seed Snapshot] Saved sample dataset snapshot to ${snapshotPath}`);

  // If DB connection is available, seed PostgreSQL
  try {
    // 1. Seed Universities
    const uniMap = new Map<string, string>();
    for (const uni of SAMPLE_UNIVERSITIES) {
      const record = await prisma.university.upsert({
        where: { slug: uni.slug },
        update: { name: uni.name, type: uni.type, website: uni.website, country: uni.country },
        create: uni,
      });
      uniMap.set(uni.slug, record.id);
    }
    // eslint-disable-next-line no-console
    console.info(`✓ Seeded ${SAMPLE_UNIVERSITIES.length} universities`);

    // 2. Seed Programs
    const programMap = new Map<string, string>();
    for (const prog of SAMPLE_PROGRAMS) {
      const record = await prisma.program.upsert({
        where: { slug: prog.slug },
        update: {
          name: prog.name,
          level: prog.level,
          durationMonths: prog.durationMonths,
          category: prog.category,
          summary: prog.summary,
        },
        create: prog,
      });
      programMap.set(prog.slug, record.id);
    }
    // eslint-disable-next-line no-console
    console.info(`✓ Seeded ${SAMPLE_PROGRAMS.length} master programs`);

    // 3. Seed Entrance Exams
    const examMap = new Map<string, string>();
    for (const exam of SAMPLE_ENTRANCE_EXAMS) {
      const record = await prisma.entranceExam.upsert({
        where: { slug: exam.slug },
        update: {
          name: exam.name,
          body: exam.body,
          website: exam.website,
          pattern: exam.pattern,
          passMarks: exam.passMarks,
          fullMarks: exam.fullMarks,
          feeNpr: exam.feeNpr,
        },
        create: exam,
      });
      examMap.set(exam.slug, record.id);
    }
    // eslint-disable-next-line no-console
    console.info(`✓ Seeded ${SAMPLE_ENTRANCE_EXAMS.length} entrance exams`);

    // 4. Seed 20 Sample Colleges with full relations
    let collegeCount = 0;
    const academicYear = "2025/2026";
    const verifiedAt = new Date("2026-01-15T00:00:00.000Z");

    for (const col of SAMPLE_COLLEGES_DATA) {
      const collegeRecord = await prisma.college.upsert({
        where: { slug: col.slug },
        update: {
          name: col.name,
          type: col.type,
          establishedYear: col.establishedYear,
          description: col.description,
          address: col.address,
          districtId: col.districtId,
          provinceId: col.provinceId,
          phone: col.phone,
          email: col.email,
          website: col.website,
          verifiedLevel: 2,
          verifiedAt,
          isSample: true,
          status: "PUBLISHED",
        },
        create: {
          name: col.name,
          slug: col.slug,
          type: col.type,
          establishedYear: col.establishedYear,
          description: col.description,
          address: col.address,
          districtId: col.districtId,
          provinceId: col.provinceId,
          phone: col.phone,
          email: col.email,
          website: col.website,
          verifiedLevel: 2,
          verifiedAt,
          isSample: true,
          status: "PUBLISHED",
        },
      });

      // University affiliation
      const universityId = uniMap.get(col.universitySlug);
      if (universityId) {
        await prisma.collegeAffiliation.upsert({
          where: {
            collegeId_universityId: {
              collegeId: collegeRecord.id,
              universityId,
            },
          },
          update: {},
          create: {
            collegeId: collegeRecord.id,
            universityId,
          },
        });
      }

      // Media placeholders (5 categorised photos per Doc 02 Section 2)
      const categories = ["campus", "labs", "library", "classrooms", "hostel"];
      for (const cat of categories) {
        await prisma.media.create({
          data: {
            collegeId: collegeRecord.id,
            type: "PHOTO",
            category: cat,
            url: `/placeholder/${cat}.webp`,
            altText: `${col.name} - ${cat} facility [Sample]`,
            caption: `Modern ${cat} facility at ${col.name} (Sample Image)`,
            status: "APPROVED",
          },
        });
      }

      // Seed college programs
      for (const progSpec of col.programs) {
        const programId = programMap.get(progSpec.programSlug);
        if (!programId) continue;

        const collegeProg = await prisma.collegeProgram.upsert({
          where: {
            collegeId_programId: {
              collegeId: collegeRecord.id,
              programId,
            },
          },
          update: {
            shift: progSpec.shift,
            seats: progSpec.seats,
          },
          create: {
            collegeId: collegeRecord.id,
            programId,
            shift: progSpec.shift,
            seats: progSpec.seats,
            status: "ACTIVE",
          },
        });

        // Fee line items
        for (const fee of progSpec.feeItems) {
          await prisma.feeItem.create({
            data: {
              collegeProgramId: collegeProg.id,
              label: fee.label,
              type: fee.type,
              amountNpr: fee.amountNpr,
              frequency: fee.frequency,
              academicYear,
              sourceUrl: `${col.website}/admission/fees-2025`,
              verifiedAt,
            },
          });
        }

        // Admission rules
        const examId = progSpec.entranceSlug ? examMap.get(progSpec.entranceSlug) : null;
        await prisma.admissionRule.create({
          data: {
            collegeProgramId: collegeProg.id,
            entranceRequired: Boolean(progSpec.entranceSlug),
            examId: examId || null,
            minGpa: progSpec.minGpa,
            eligibilityText: progSpec.eligibilityText,
            selectionMethod: progSpec.selectionMethod,
            academicYear,
            sourceUrl: `${col.website}/admission/criteria`,
            verifiedAt,
            documentsJson: JSON.stringify([
              "SEE Marksheet & Character Certificate",
              "+2 Transcript & Migration Certificate",
              "Entrance Exam Admit Card & Scorecard",
              "Citizenship or Birth Certificate Copy",
              "3 Passport Size Photos",
            ]),
            stepsJson: JSON.stringify([
              "Check GPA and subject prerequisites",
              "Fill official entrance examination form",
              "Sit for central or college entrance test",
              "Check publication of merit list",
              "Attend document verification & counselling",
              "Confirm admission and pay first semester fees",
            ]),
          },
        });

        // Cutoffs
        if (progSpec.cutoffMarks) {
          await prisma.cutoff.create({
            data: {
              collegeProgramId: collegeProg.id,
              round: "Round 1 Merit List",
              cutoffMarks: progSpec.cutoffMarks,
              academicYear: "2024/2025",
              sourceUrl: "https://iost.tu.edu.np/results-2024",
              verifiedAt: new Date("2025-11-20T00:00:00.000Z"),
            },
          });
        }

        // Enrollment stats
        await prisma.enrollmentStat.create({
          data: {
            collegeProgramId: collegeProg.id,
            seats: progSpec.enrollment.seats,
            enrolled: progSpec.enrollment.enrolled,
            passRate: progSpec.enrollment.passRate,
            studentTeacherRatio: progSpec.enrollment.studentTeacherRatio,
            academicYear: "2024/2025",
            sourceUrl: "https://ugcnepal.edu.np/tracer-report-2024",
            verifiedAt: new Date("2025-12-01T00:00:00.000Z"),
          },
        });

        // Alumni outcome
        if (progSpec.alumniOutcome) {
          await prisma.alumniOutcome.create({
            data: {
              collegeProgramId: collegeProg.id,
              batchYear: 2024,
              placedPct: progSpec.alumniOutcome.placedPct,
              medianSalaryNpr: progSpec.alumniOutcome.medianSalaryNpr,
              topEmployersJson: JSON.stringify(progSpec.alumniOutcome.topEmployers),
              academicYear: "2024/2025",
              sourceUrl: `${col.website}/tracer-study`,
              verifiedAt: new Date("2025-12-10T00:00:00.000Z"),
            },
          });
        }
      }

      // Notable alumni
      for (const al of col.notableAlumni) {
        const pId = programMap.get(al.programSlug);
        await prisma.alumni.create({
          data: {
            collegeId: collegeRecord.id,
            name: al.name,
            batchYear: al.batchYear,
            programId: pId || null,
            currentRole: al.role,
            employer: al.employer,
            consent: true,
            testimonial: al.testimonial,
          },
        });
      }

      collegeCount++;
    }

    // eslint-disable-next-line no-console
    console.info(`✓ Successfully seeded ${collegeCount} sample colleges into database.`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "[Seed Notice] PostgreSQL connection not active; static snapshot was generated for local usage:",
      (error as Error).message
    );
  }
}

if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("[Seed Error]:", err);
      process.exit(1);
    });
}
