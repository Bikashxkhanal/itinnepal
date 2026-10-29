import { z } from "zod";

export const HelpRequestSubmissionSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^(?:\+977[- ]?)?(?:98|97)\d{8}$/,
      "Please enter a valid 10-digit Nepali mobile number (starting with 98 or 97)"
    ),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  currentStatus: z.enum(["SEE", "PLUS_TWO", "BACHELOR_COMPLETED"], {
    errorMap: () => ({ message: "Please select your current education level" }),
  }),
  seeGpa: z.coerce.number().min(0).max(4).optional(),
  plus2Stream: z.enum(["Science", "Management", "Humanities", "CTEVT", "Other"]).optional(),
  interests: z.array(z.string()).optional(),
  budgetNpr: z.coerce.number().min(0).optional(),
  districtPref: z.string().optional(),
  consideredCollege: z.string().optional(),
  question: z.string().max(500, "Question cannot exceed 500 characters").optional(),
  channelPref: z.enum(["call", "whatsapp", "viber"]).default("call"),
  contactTime: z.enum(["morning", "afternoon", "evening", "anytime"]).default("anytime"),
  // Mandatory Consent 1: Contact by ITinNepal counsellor
  consentContact: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to be contacted by an ITinNepal student counsellor.",
    }),
  }),
  // Separate Consent 2: Optional consent to share details with colleges (Doc 09 Section 7)
  consentShare: z.boolean().default(false),
  // Anti-spam honeypot field (hidden in UI)
  website_hp: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type HelpRequestSubmissionInput = z.infer<typeof HelpRequestSubmissionSchema>;
