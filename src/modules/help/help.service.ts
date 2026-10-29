import { HelpRequestSubmissionInput } from "./help.schema";
import { BadRequestError, NotFoundError, RateLimitError } from "../shared/api/errors";
import { prisma } from "../shared/db/prisma";

export interface StoredHelpRequest {
  id: string;
  refCode: string;
  name: string;
  phone: string;
  email?: string | null;
  currentStatus: string;
  seeGpa?: number | null;
  plus2Stream?: string | null;
  interests?: string[];
  budgetNpr?: number | null;
  districtPref?: string | null;
  consideredCollege?: string | null;
  question?: string | null;
  channelPref: string;
  contactTime: string;
  consentContact: boolean;
  consentShare: boolean;
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "FOLLOW_UP" | "RESOLVED" | "CLOSED";
  assignedTo?: string | null;
  notes: { id: string; author: string; note: string; createdAt: string }[];
  createdAt: string;
  resolvedAt?: string | null;
}

// In-memory fallback queue for reliable testing and local development
const memoryHelpRequests: StoredHelpRequest[] = [];
let requestSequenceCounter = 1;

// IP Rate Limiter store: ip -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export function checkRateLimit(ip: string): void {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    throw new RateLimitError(
      "Submission rate limit reached. Please wait before submitting another help request."
    );
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
}

/**
 * Generates reference code matching ITN-YYYY-NNNNN
 */
export function generateReferenceCode(year = new Date().getFullYear(), seq?: number): string {
  const currentSeq = seq !== undefined ? seq : requestSequenceCounter++;
  const padded = String(currentSeq).padStart(5, "0");
  return `ITN-${year}-${padded}`;
}

/**
 * Email notification stub (Doc 09 Section 4)
 */
export function sendCounsellorNotificationEmail(request: StoredHelpRequest): void {
  // eslint-disable-next-line no-console
  console.info(`[Email Dispatch Stub] 📧 Notification to counsellors@itinnepal.com:`);
  // eslint-disable-next-line no-console
  console.info(`  - Ref: ${request.refCode}`);
  // eslint-disable-next-line no-console
  console.info(`  - Student: ${request.name} (${request.phone}, ${request.email || "No email"})`);
  // eslint-disable-next-line no-console
  console.info(`  - Question: ${request.question || "General Guidance"}`);
  // eslint-disable-next-line no-console
  console.info(`  - Share with Colleges Consented: ${request.consentShare ? "YES" : "NO"}`);
}

export async function createHelpRequest(
  input: HelpRequestSubmissionInput,
  clientIp = "127.0.0.1"
): Promise<StoredHelpRequest> {
  // 1. Honeypot check
  if (input.website_hp && input.website_hp.length > 0) {
    throw new BadRequestError("Spam verification triggered.");
  }

  // 2. Rate limit check
  checkRateLimit(clientIp);

  // 3. Generate reference code ITN-YYYY-NNNNN
  const refCode = generateReferenceCode();
  const nowIso = new Date().toISOString();

  const record: StoredHelpRequest = {
    id: `req-${Date.now()}`,
    refCode,
    name: input.name,
    phone: input.phone,
    email: input.email || null,
    currentStatus: input.currentStatus,
    seeGpa: input.seeGpa || null,
    plus2Stream: input.plus2Stream || null,
    interests: input.interests || [],
    budgetNpr: input.budgetNpr || null,
    districtPref: input.districtPref || null,
    consideredCollege: input.consideredCollege || null,
    question: input.question || null,
    channelPref: input.channelPref,
    contactTime: input.contactTime,
    consentContact: true,
    consentShare: input.consentShare,
    status: "NEW",
    assignedTo: null,
    notes: [],
    createdAt: nowIso,
    resolvedAt: null,
  };

  // Attempt database persistence if Prisma is online and not in unit testing
  if (process.env.NODE_ENV !== "test") {
    try {
      await prisma.helpRequest.create({
        data: {
          refCode: record.refCode,
          name: record.name,
          phone: record.phone,
          email: record.email,
          seeGpa: record.seeGpa,
          plus2Stream: record.plus2Stream,
          interests: record.interests ? record.interests.join(",") : null,
          budgetNpr: record.budgetNpr,
          districtPref: record.districtPref,
          question: record.question,
          channelPref: record.channelPref,
          contactTime: record.contactTime,
          consentShare: record.consentShare,
          status: "NEW",
        },
      });
    } catch {
      // Falls back gracefully to memory store
    }
  }

  memoryHelpRequests.unshift(record);

  // Trigger counsellor notification stub
  sendCounsellorNotificationEmail(record);

  return record;
}

export async function getHelpRequestByRef(refCode: string): Promise<StoredHelpRequest> {
  const found = memoryHelpRequests.find(
    (r) => r.refCode.toUpperCase() === refCode.trim().toUpperCase()
  );
  if (!found) {
    throw new NotFoundError(`Help request with reference '${refCode}' not found.`);
  }
  return found;
}

export async function listHelpRequests(status?: string): Promise<StoredHelpRequest[]> {
  if (status) {
    return memoryHelpRequests.filter((r) => r.status === status);
  }
  return memoryHelpRequests;
}

export async function updateHelpRequestStatus(
  refCode: string,
  newStatus: StoredHelpRequest["status"],
  counsellorNote?: string,
  assignedTo?: string
): Promise<StoredHelpRequest> {
  const req = await getHelpRequestByRef(refCode);
  req.status = newStatus;
  if (assignedTo) {
    req.assignedTo = assignedTo;
  }
  if (newStatus === "RESOLVED" || newStatus === "CLOSED") {
    req.resolvedAt = new Date().toISOString();
  }
  if (counsellorNote) {
    req.notes.push({
      id: `note-${Date.now()}`,
      author: assignedTo || "Counsellor Staff",
      note: counsellorNote,
      createdAt: new Date().toISOString(),
    });
  }
  return req;
}

// Clear memory for testing purposes
export function resetHelpRequestsMemory(): void {
  memoryHelpRequests.length = 0;
  rateLimitMap.clear();
  requestSequenceCounter = 1;
}
