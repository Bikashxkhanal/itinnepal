-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('GOVERNMENT', 'COMMUNITY', 'PRIVATE');

-- CreateEnum
CREATE TYPE "CollegeStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProgramLevel" AS ENUM ('DIPLOMA', 'BACHELOR', 'MASTER');

-- CreateEnum
CREATE TYPE "FeeItemType" AS ENUM ('ADMISSION', 'SEMESTER', 'ANNUAL', 'LAB', 'EXAM', 'OTHER');

-- CreateEnum
CREATE TYPE "SelectionMethod" AS ENUM ('ENTRANCE', 'MERIT', 'INTERVIEW', 'MIXED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "HelpRequestStatus" AS ENUM ('NEW', 'ASSIGNED', 'CONTACTED', 'FOLLOW_UP', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('VISITOR', 'STUDENT', 'COLLEGE_ADMIN', 'COUNSELLOR', 'CONTENT_EDITOR', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "universities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "website" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Nepal',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colleges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL DEFAULT 'PRIVATE',
    "established_year" INTEGER,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "province_id" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logo_url" TEXT,
    "status" "CollegeStatus" NOT NULL DEFAULT 'DRAFT',
    "verified_level" INTEGER NOT NULL DEFAULT 0,
    "verified_at" TIMESTAMP(3),
    "claimed_by" TEXT,
    "is_sample" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "college_affiliations" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,

    CONSTRAINT "college_affiliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "ProgramLevel" NOT NULL DEFAULT 'BACHELOR',
    "duration_months" INTEGER NOT NULL DEFAULT 48,
    "summary" TEXT,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "college_programs" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "shift" TEXT NOT NULL DEFAULT 'Morning',
    "seats" INTEGER NOT NULL DEFAULT 48,
    "intake_per_year" INTEGER NOT NULL DEFAULT 1,
    "syllabus_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "college_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee_items" (
    "id" TEXT NOT NULL,
    "college_program_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "FeeItemType" NOT NULL DEFAULT 'SEMESTER',
    "amount_npr" DOUBLE PRECISION NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'per_semester',
    "notes" TEXT,
    "academic_year" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fee_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarships" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "discount_pct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deadline" TEXT,
    "source_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scholarships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrance_exams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "website" TEXT,
    "pattern" TEXT,
    "pass_marks" INTEGER,
    "full_marks" INTEGER,
    "fee_npr" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrance_exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admission_rules" (
    "id" TEXT NOT NULL,
    "college_program_id" TEXT NOT NULL,
    "entrance_required" BOOLEAN NOT NULL DEFAULT true,
    "exam_id" TEXT,
    "min_gpa" DOUBLE PRECISION,
    "eligibility_text" TEXT,
    "selection_method" "SelectionMethod" NOT NULL DEFAULT 'ENTRANCE',
    "documents_json" TEXT,
    "apply_url" TEXT,
    "steps_json" TEXT,
    "academic_year" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admission_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cutoffs" (
    "id" TEXT NOT NULL,
    "college_program_id" TEXT NOT NULL,
    "round" TEXT NOT NULL DEFAULT 'Round 1',
    "cutoff_marks" DOUBLE PRECISION NOT NULL,
    "academic_year" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cutoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment_stats" (
    "id" TEXT NOT NULL,
    "college_program_id" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "enrolled" INTEGER NOT NULL,
    "pass_rate" DOUBLE PRECISION,
    "student_teacher_ratio" TEXT,
    "academic_year" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollment_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumni" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "batch_year" INTEGER NOT NULL,
    "program_id" TEXT,
    "current_role" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "linkedin_url" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "testimonial" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumni_outcomes" (
    "id" TEXT NOT NULL,
    "college_program_id" TEXT NOT NULL,
    "batch_year" INTEGER NOT NULL,
    "placed_pct" DOUBLE PRECISION NOT NULL,
    "median_salary_npr" DOUBLE PRECISION,
    "top_employers_json" TEXT,
    "academic_year" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumni_outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'PHOTO',
    "category" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt_text" TEXT NOT NULL,
    "caption" TEXT,
    "uploaded_by" TEXT,
    "status" TEXT NOT NULL DEFAULT 'APPROVED',
    "license_info" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_items" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating_json" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_requests" (
    "id" TEXT NOT NULL,
    "ref_code" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "see_gpa" DOUBLE PRECISION,
    "plus2_stream" TEXT,
    "interests" TEXT,
    "budget_npr" DOUBLE PRECISION,
    "district_pref" TEXT,
    "question" TEXT,
    "channel_pref" TEXT NOT NULL DEFAULT 'call',
    "contact_time" TEXT NOT NULL DEFAULT 'anytime',
    "consent_share" BOOLEAN NOT NULL DEFAULT false,
    "status" "HelpRequestStatus" NOT NULL DEFAULT 'NEW',
    "assigned_to" TEXT,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "help_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_notes" (
    "id" TEXT NOT NULL,
    "help_request_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "help_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notices" (
    "id" TEXT NOT NULL,
    "college_id" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "diff_json" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "universities_slug_key" ON "universities"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "colleges_slug_key" ON "colleges"("slug");

-- CreateIndex
CREATE INDEX "colleges_slug_idx" ON "colleges"("slug");

-- CreateIndex
CREATE INDEX "colleges_district_id_idx" ON "colleges"("district_id");

-- CreateIndex
CREATE INDEX "colleges_status_idx" ON "colleges"("status");

-- CreateIndex
CREATE UNIQUE INDEX "college_affiliations_college_id_university_id_key" ON "college_affiliations"("college_id", "university_id");

-- CreateIndex
CREATE UNIQUE INDEX "programs_slug_key" ON "programs"("slug");

-- CreateIndex
CREATE INDEX "programs_slug_idx" ON "programs"("slug");

-- CreateIndex
CREATE INDEX "college_programs_college_id_idx" ON "college_programs"("college_id");

-- CreateIndex
CREATE INDEX "college_programs_program_id_idx" ON "college_programs"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "college_programs_college_id_program_id_key" ON "college_programs"("college_id", "program_id");

-- CreateIndex
CREATE INDEX "fee_items_college_program_id_idx" ON "fee_items"("college_program_id");

-- CreateIndex
CREATE INDEX "scholarships_college_id_idx" ON "scholarships"("college_id");

-- CreateIndex
CREATE UNIQUE INDEX "entrance_exams_slug_key" ON "entrance_exams"("slug");

-- CreateIndex
CREATE INDEX "admission_rules_college_program_id_idx" ON "admission_rules"("college_program_id");

-- CreateIndex
CREATE INDEX "cutoffs_college_program_id_idx" ON "cutoffs"("college_program_id");

-- CreateIndex
CREATE INDEX "enrollment_stats_college_program_id_idx" ON "enrollment_stats"("college_program_id");

-- CreateIndex
CREATE INDEX "alumni_college_id_idx" ON "alumni"("college_id");

-- CreateIndex
CREATE INDEX "alumni_outcomes_college_program_id_idx" ON "alumni_outcomes"("college_program_id");

-- CreateIndex
CREATE INDEX "media_college_id_idx" ON "media"("college_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "saved_items_user_id_entity_type_entity_id_key" ON "saved_items"("user_id", "entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "reviews_college_id_idx" ON "reviews"("college_id");

-- CreateIndex
CREATE UNIQUE INDEX "help_requests_ref_code_key" ON "help_requests"("ref_code");

-- CreateIndex
CREATE INDEX "help_requests_ref_code_idx" ON "help_requests"("ref_code");

-- CreateIndex
CREATE INDEX "help_requests_status_idx" ON "help_requests"("status");

-- CreateIndex
CREATE INDEX "help_notes_help_request_id_idx" ON "help_notes"("help_request_id");

-- CreateIndex
CREATE INDEX "notices_college_id_idx" ON "notices"("college_id");

-- CreateIndex
CREATE INDEX "audit_log_entity_entity_id_idx" ON "audit_log"("entity", "entity_id");

-- AddForeignKey
ALTER TABLE "college_affiliations" ADD CONSTRAINT "college_affiliations_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "college_affiliations" ADD CONSTRAINT "college_affiliations_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "college_programs" ADD CONSTRAINT "college_programs_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "college_programs" ADD CONSTRAINT "college_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_items" ADD CONSTRAINT "fee_items_college_program_id_fkey" FOREIGN KEY ("college_program_id") REFERENCES "college_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarships" ADD CONSTRAINT "scholarships_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_rules" ADD CONSTRAINT "admission_rules_college_program_id_fkey" FOREIGN KEY ("college_program_id") REFERENCES "college_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_rules" ADD CONSTRAINT "admission_rules_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "entrance_exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cutoffs" ADD CONSTRAINT "cutoffs_college_program_id_fkey" FOREIGN KEY ("college_program_id") REFERENCES "college_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_stats" ADD CONSTRAINT "enrollment_stats_college_program_id_fkey" FOREIGN KEY ("college_program_id") REFERENCES "college_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumni" ADD CONSTRAINT "alumni_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumni" ADD CONSTRAINT "alumni_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumni_outcomes" ADD CONSTRAINT "alumni_outcomes_college_program_id_fkey" FOREIGN KEY ("college_program_id") REFERENCES "college_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "help_notes" ADD CONSTRAINT "help_notes_help_request_id_fkey" FOREIGN KEY ("help_request_id") REFERENCES "help_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notices" ADD CONSTRAINT "notices_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

