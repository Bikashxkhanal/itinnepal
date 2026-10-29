import { describe, it, expect, beforeEach } from "vitest";
import {
  HelpRequestSubmissionSchema,
  HelpRequestSubmissionInput,
} from "@/modules/help/help.schema";
import {
  createHelpRequest,
  generateReferenceCode,
  getHelpRequestByRef,
  listHelpRequests,
  updateHelpRequestStatus,
  resetHelpRequestsMemory,
  checkRateLimit,
} from "@/modules/help/help.service";
import { RateLimitError } from "@/modules/shared/api/errors";
import { POST as helpRequestsPost } from "@/app/api/v1/help-requests/route";
import {
  GET as helpRequestGet,
  PATCH as helpRequestPatch,
} from "@/app/api/v1/help-requests/[ref]/route";
import { NextRequest } from "next/server";

describe("Help Request Schema & Validation (Doc 09)", () => {
  const validBasePayload: HelpRequestSubmissionInput = {
    name: "Suman Shrestha",
    phone: "9841000000",
    email: "suman@example.com",
    currentStatus: "PLUS_TWO",
    plus2Stream: "Science",
    seeGpa: 3.4,
    budgetNpr: 500000,
    districtPref: "Kathmandu",
    question: "Which college has the best placement for BSc CSIT?",
    channelPref: "call",
    contactTime: "afternoon",
    consentContact: true,
    consentShare: false,
    website_hp: "",
  };

  it("validates a compliant help desk submission", () => {
    const parse = HelpRequestSubmissionSchema.safeParse(validBasePayload);
    expect(parse.success).toBe(true);
  });

  it("validates Nepali mobile numbers (starts with 98 or 97, 10 digits)", () => {
    // Valid numbers
    expect(
      HelpRequestSubmissionSchema.safeParse({
        ...validBasePayload,
        phone: "9812345678",
      }).success
    ).toBe(true);

    expect(
      HelpRequestSubmissionSchema.safeParse({
        ...validBasePayload,
        phone: "9741234567",
      }).success
    ).toBe(true);

    expect(
      HelpRequestSubmissionSchema.safeParse({
        ...validBasePayload,
        phone: "+9779841234567",
      }).success
    ).toBe(true);

    // Invalid numbers
    expect(
      HelpRequestSubmissionSchema.safeParse({
        ...validBasePayload,
        phone: "9123456789", // not 98 or 97
      }).success
    ).toBe(false);

    expect(
      HelpRequestSubmissionSchema.safeParse({
        ...validBasePayload,
        phone: "984123", // too short
      }).success
    ).toBe(false);
  });

  it("enforces mandatory consent to contact, rejecting if false", () => {
    const result = HelpRequestSubmissionSchema.safeParse({
      ...validBasePayload,
      consentContact: false,
    });
    expect(result.success).toBe(false);
  });

  it("allows consentShare to be independent (separate consent flag)", () => {
    const withShare = HelpRequestSubmissionSchema.safeParse({
      ...validBasePayload,
      consentContact: true,
      consentShare: true,
    });
    expect(withShare.success).toBe(true);

    const withoutShare = HelpRequestSubmissionSchema.safeParse({
      ...validBasePayload,
      consentContact: true,
      consentShare: false,
    });
    expect(withoutShare.success).toBe(true);
  });

  it("detects spam bots via honeypot field (website_hp)", () => {
    const botPayload = {
      ...validBasePayload,
      website_hp: "http://spam-site.com",
    };
    const parse = HelpRequestSubmissionSchema.safeParse(botPayload);
    expect(parse.success).toBe(false);
  });
});

describe("Reference Code Generator (ITN-YYYY-NNNNN)", () => {
  it("formats reference code matching ITN-YYYY-NNNNN standard", () => {
    const code = generateReferenceCode(2026, 42);
    expect(code).toBe("ITN-2026-00042");
    expect(/^ITN-\d{4}-\d{5}$/.test(code)).toBe(true);
  });
});

describe("Help Desk Service & Rate Limiting", () => {
  beforeEach(() => {
    resetHelpRequestsMemory();
  });

  it("creates a new help request with status NEW and refCode", async () => {
    const created = await createHelpRequest({
      name: "Bikash Thapa",
      phone: "9800000001",
      currentStatus: "PLUS_TWO",
      channelPref: "call",
      contactTime: "anytime",
      consentContact: true,
      consentShare: true,
    });

    expect(created.refCode).toMatch(/^ITN-\d{4}-\d{5}$/);
    expect(created.status).toBe("NEW");
    expect(created.name).toBe("Bikash Thapa");
    expect(created.consentShare).toBe(true);
  });

  it("enforces IP-based rate limiting after exceeding 5 requests in window", async () => {
    const testIp = "192.168.1.100";
    for (let i = 0; i < 5; i++) {
      checkRateLimit(testIp);
    }

    expect(() => checkRateLimit(testIp)).toThrow(RateLimitError);
  });

  it("fetches, lists, and updates status with notes in counsellor workflow", async () => {
    const created = await createHelpRequest({
      name: "Prashant Giri",
      phone: "9841234567",
      currentStatus: "SEE",
      channelPref: "whatsapp",
      contactTime: "morning",
      consentContact: true,
      consentShare: false,
    });

    const fetched = await getHelpRequestByRef(created.refCode);
    expect(fetched.name).toBe("Prashant Giri");

    // Update status to CONTACTED
    const updated = await updateHelpRequestStatus(
      created.refCode,
      "CONTACTED",
      "Spoke with student, suggested St. Xavier and Thames",
      "Counsellor Anjali"
    );

    expect(updated.status).toBe("CONTACTED");
    expect(updated.assignedTo).toBe("Counsellor Anjali");
    expect(updated.notes.length).toBe(1);
    expect(updated.notes[0]?.note).toContain("suggested St. Xavier");

    // Update status to RESOLVED
    const resolved = await updateHelpRequestStatus(
      created.refCode,
      "RESOLVED",
      "Student satisfied with recommendation"
    );
    expect(resolved.status).toBe("RESOLVED");
    expect(resolved.resolvedAt).toBeDefined();

    // Verify filter by status
    const all = await listHelpRequests();
    expect(all.length).toBe(1);

    const resolvedList = await listHelpRequests("RESOLVED");
    expect(resolvedList.length).toBe(1);

    const newList = await listHelpRequests("NEW");
    expect(newList.length).toBe(0);
  });
});

describe("Help Desk API Endpoints", () => {
  beforeEach(() => {
    resetHelpRequestsMemory();
  });

  it("POST /api/v1/help-requests creates request and returns 201 with refCode", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/help-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aakash KC",
        phone: "9861112233",
        currentStatus: "PLUS_TWO",
        channelPref: "call",
        contactTime: "afternoon",
        consentContact: true,
        consentShare: false,
      }),
    });

    const res = await helpRequestsPost(req);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.refCode).toMatch(/^ITN-\d{4}-\d{5}$/);
    expect(json.data.status).toBe("NEW");
  });

  it("POST /api/v1/help-requests returns 422 if consentContact is false", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/help-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aakash KC",
        phone: "9861112233",
        currentStatus: "PLUS_TWO",
        channelPref: "call",
        contactTime: "afternoon",
        consentContact: false, // Rejected
      }),
    });

    const res = await helpRequestsPost(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("GET /api/v1/help-requests/[ref] retrieves request by reference code", async () => {
    const created = await createHelpRequest({
      name: "Roshani Rana",
      phone: "9849998877",
      currentStatus: "BACHELOR_COMPLETED",
      channelPref: "viber",
      contactTime: "morning",
      consentContact: true,
      consentShare: true,
    });

    const req = new NextRequest(`http://localhost:3000/api/v1/help-requests/${created.refCode}`);
    const res = await helpRequestGet(req, { params: { ref: created.refCode } });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data.refCode).toBe(created.refCode);
    expect(json.data.name).toBe("Roshani Rana");
  });

  it("PATCH /api/v1/help-requests/[ref] updates status and adds note", async () => {
    const created = await createHelpRequest({
      name: "Roshani Rana",
      phone: "9849998877",
      currentStatus: "BACHELOR_COMPLETED",
      channelPref: "viber",
      contactTime: "morning",
      consentContact: true,
      consentShare: true,
    });

    const req = new NextRequest(`http://localhost:3000/api/v1/help-requests/${created.refCode}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "CONTACTED",
        note: "Sent WhatsApp message with course brochure",
        assignedTo: "Counsellor Ramesh",
      }),
    });

    const res = await helpRequestPatch(req, { params: { ref: created.refCode } });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data.status).toBe("CONTACTED");
    expect(json.data.notes.length).toBe(1);
    expect(json.data.notes[0].note).toBe("Sent WhatsApp message with course brochure");
  });
});
