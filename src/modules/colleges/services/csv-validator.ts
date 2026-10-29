import { z } from "zod";

export const CollegeCsvRowSchema = z.object({
  name: z.string().min(2, "College name must have at least 2 characters"),
  slug: z.string().optional(),
  type: z.enum(["GOVERNMENT", "COMMUNITY", "PRIVATE"]).default("PRIVATE"),
  established_year: z.coerce.number().int().min(1900).max(2030).optional(),
  address: z.string().min(2, "Address is required"),
  district_id: z.string().min(2, "District is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  programs: z.string().optional(), // comma-separated program slugs
  // Mandatory verification fields (Doc 02, Doc 03, Doc 04)
  academic_year: z
    .string()
    .min(4, "Academic year is required (e.g. 2025/2026)")
    .refine((val) => val.trim().length > 0, "Academic year cannot be empty"),
  source_url: z
    .string()
    .min(1, "Source URL is strictly required")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      "Source URL must be a valid HTTP/HTTPS URL from an official source"
    ),
  verified_at: z
    .string()
    .min(1, "Verification date (verified_at) is strictly required")
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "verified_at must be a valid parseable date (YYYY-MM-DD)"
    ),
});

export type CollegeCsvRow = z.infer<typeof CollegeCsvRowSchema>;

export interface CsvValidationResult {
  validRows: CollegeCsvRow[];
  rejectedRows: {
    rowNumber: number;
    data: Record<string, string>;
    errors: string[];
  }[];
}

export function validateCollegeCsvRows(rows: Record<string, string>[]): CsvValidationResult {
  const validRows: CollegeCsvRow[] = [];
  const rejectedRows: CsvValidationResult["rejectedRows"] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2; // header is row 1
    const parseResult = CollegeCsvRowSchema.safeParse(row);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      rejectedRows.push({
        rowNumber,
        data: row,
        errors: errorMessages,
      });
    } else {
      validRows.push(parseResult.data);
    }
  });

  return { validRows, rejectedRows };
}
