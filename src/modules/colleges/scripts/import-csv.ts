import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { validateCollegeCsvRows } from "../services/csv-validator";
import { prisma } from "../../shared/db/prisma";

export async function importCollegesFromCsv(filePath: string) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`CSV file not found at: ${resolvedPath}`);
  }

  const fileContent = fs.readFileSync(resolvedPath, "utf-8");
  const rawRecords = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  const { validRows, rejectedRows } = validateCollegeCsvRows(rawRecords);

  // eslint-disable-next-line no-console
  console.info(`[CSV Import] Processed ${rawRecords.length} rows.`);
  // eslint-disable-next-line no-console
  console.info(`[CSV Import] Valid: ${validRows.length}, Rejected: ${rejectedRows.length}`);

  if (rejectedRows.length > 0) {
    // eslint-disable-next-line no-console
    console.warn("\n--- REJECTED ROWS (Failed Data Quality Policy) ---");
    for (const rejected of rejectedRows) {
      // eslint-disable-next-line no-console
      console.warn(`Row #${rejected.rowNumber} (${rejected.data["name"] || "Unknown"}):`);
      for (const err of rejected.errors) {
        // eslint-disable-next-line no-console
        console.warn(`  - ${err}`);
      }
    }
  }

  // Attempt DB import for valid rows if Prisma is available
  if (process.env.DATABASE_URL && validRows.length > 0) {
    try {
      let importedCount = 0;
      for (const row of validRows) {
        const slug =
          row.slug ||
          row.name
            .toLowerCase()
            .replace(/\[sample\]/g, "")
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        await prisma.college.upsert({
          where: { slug },
          update: {
            name: row.name,
            type: row.type,
            address: row.address,
            districtId: row.district_id,
            phone: row.phone || null,
            email: row.email || null,
            website: row.website || null,
            establishedYear: row.established_year || null,
            verifiedAt: new Date(row.verified_at),
            verifiedLevel: 1,
            isSample: row.name.includes("[Sample]"),
          },
          create: {
            name: row.name,
            slug,
            type: row.type,
            address: row.address,
            districtId: row.district_id,
            phone: row.phone || null,
            email: row.email || null,
            website: row.website || null,
            establishedYear: row.established_year || null,
            verifiedAt: new Date(row.verified_at),
            verifiedLevel: 1,
            isSample: row.name.includes("[Sample]"),
          },
        });
        importedCount++;
      }
      // eslint-disable-next-line no-console
      console.info(`[CSV Import] Successfully saved ${importedCount} colleges to database.`);
    } catch (dbError) {
      // eslint-disable-next-line no-console
      console.warn(
        "[CSV Import] DB operation skipped or failed (DB might be offline):",
        (dbError as Error).message
      );
    }
  }

  return { validRows, rejectedRows };
}

// Run CLI directly if executed via node/tsx
if (require.main === module) {
  const targetFile = process.argv[2] || "data/sample-colleges.csv";
  importCollegesFromCsv(targetFile)
    .then(() => process.exit(0))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("[CSV Import Error]:", err);
      process.exit(1);
    });
}
