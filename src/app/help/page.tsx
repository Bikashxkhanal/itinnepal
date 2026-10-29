"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, CheckCircle2, Clock, Send, Search, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

interface LookupResult {
  refCode: string;
  name: string;
  status: string;
  channelPref: string;
  contactTime: string;
  createdAt: string;
  resolvedAt?: string | null;
  notes: { id: string; author: string; note: string; createdAt: string }[];
}

export default function HelpDeskPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    currentStatus: "PLUS_TWO",
    plus2Stream: "Science",
    seeGpa: "",
    budgetNpr: "",
    districtPref: "Kathmandu",
    question: "",
    channelPref: "call",
    contactTime: "afternoon",
    consentContact: false,
    consentShare: false,
    website_hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Status tracker state
  const [lookupRef, setLookupRef] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.consentContact) {
      setErrorMessage("Please check the mandatory consent to allow our counsellor to contact you.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/help-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          seeGpa: formData.seeGpa ? parseFloat(formData.seeGpa) : undefined,
          budgetNpr: formData.budgetNpr ? parseFloat(formData.budgetNpr) : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || "Failed to submit help request.");
      }

      setSubmittedRef(json.data.refCode);
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupRef.trim()) return;

    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/v1/help-requests/${encodeURIComponent(lookupRef.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || "Reference code not found.");
      }
      setLookupResult(json.data);
    } catch (err) {
      setLookupError((err as Error).message);
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Student Help Desk" }]} />

      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold uppercase text-indigo-700">
            Human Guidance
          </span>
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
            100% Free & Impartial
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Student Help Desk & Counselling
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Unsure which college suits your entrance rank, budget, or daily commute? Talk to an
          ITinNepal student counsellor. We give honest advice with zero commercial bias.
        </p>
      </div>

      {/* Direct Contact Channels */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a
          href="https://wa.me/9779800000000?text=Hello%20ITinNepal%20Counsellor%2C%20I%20need%20help%20choosing%20an%20IT%20college"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 transition-all hover:border-emerald-400 hover:shadow-sm"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-emerald-900">WhatsApp Chat</span>
            <span className="text-xs font-medium text-emerald-700">+977 9800000000</span>
          </div>
        </a>

        <a
          href="viber://chat?number=%2B9779800000000"
          className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-purple-50/60 p-4 transition-all hover:border-purple-400 hover:shadow-sm"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-purple-900">Viber Message</span>
            <span className="text-xs font-medium text-purple-700">+977 9800000000</span>
          </div>
        </a>

        <a
          href="tel:+97714000000"
          className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 transition-all hover:border-indigo-400 hover:shadow-sm"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-indigo-900">Direct Helpline</span>
            <span className="text-xs font-medium text-indigo-700">+977 1 4000000</span>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {submittedRef ? (
            <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Request Submitted Successfully!</h2>
              <p className="mx-auto max-w-md text-sm text-slate-600">
                Your request has been assigned to our counselling team. A counsellor will contact
                you via your preferred channel within 24 hours.
              </p>
              <div className="mx-auto max-w-sm rounded-xl border border-emerald-300 bg-white p-4">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your Tracking Reference Code
                </span>
                <span className="mt-1 text-2xl font-extrabold tracking-wider text-indigo-600">
                  {submittedRef}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    currentStatus: "PLUS_TWO",
                    plus2Stream: "Science",
                    seeGpa: "",
                    budgetNpr: "",
                    districtPref: "Kathmandu",
                    question: "",
                    channelPref: "call",
                    contactTime: "afternoon",
                    consentContact: false,
                    consentShare: false,
                    website_hp: "",
                  });
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Request a Free Callback & Guidance
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Please provide your contact details and academic background. All fields with * are
                  required.
                </p>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Anti-spam honeypot (hidden from view) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Leave empty</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="student-name"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    placeholder="e.g. Aayush Adhikari"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label
                    htmlFor="student-phone"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Nepali Mobile Number *
                  </label>
                  <input
                    id="student-phone"
                    type="tel"
                    required
                    placeholder="98XXXXXXXX / 97XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Email */}
                <div>
                  <label
                    htmlFor="student-email"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Education Status */}
                <div>
                  <label
                    htmlFor="education-status"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Latest Level *
                  </label>
                  <select
                    id="education-status"
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="PLUS_TWO">+2 Passed / Appearing</option>
                    <option value="SEE">SEE Passed</option>
                    <option value="BACHELOR_COMPLETED">Bachelor Completed</option>
                  </select>
                </div>

                {/* Stream */}
                <div>
                  <label
                    htmlFor="plus2-stream"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    +2 Stream
                  </label>
                  <select
                    id="plus2-stream"
                    value={formData.plus2Stream}
                    onChange={(e) => setFormData({ ...formData, plus2Stream: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Science">Science (Physics & Math)</option>
                    <option value="Management">Management (Computer/Math)</option>
                    <option value="Humanities">Humanities</option>
                    <option value="CTEVT">CTEVT Diploma</option>
                    <option value="Other">Other Stream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* GPA */}
                <div>
                  <label
                    htmlFor="gpa-score"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    +2 / SEE GPA (Optional)
                  </label>
                  <input
                    id="gpa-score"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    placeholder="e.g. 3.25"
                    value={formData.seeGpa}
                    onChange={(e) => setFormData({ ...formData, seeGpa: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Estimated Budget */}
                <div>
                  <label
                    htmlFor="budget-npr"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Total Course Budget (NPR, Approx)
                  </label>
                  <input
                    id="budget-npr"
                    type="number"
                    step="10000"
                    placeholder="e.g. 400000"
                    value={formData.budgetNpr}
                    onChange={(e) => setFormData({ ...formData, budgetNpr: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <label
                  htmlFor="student-question"
                  className="mb-1.5 block text-xs font-bold text-slate-800"
                >
                  Your Specific Question or Shortlisted Colleges (Max 500 characters)
                </label>
                <textarea
                  id="student-question"
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. I scored 2.8 GPA in +2 Science and want to know whether BSc CSIT or BCA is better for web development in Kathmandu..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="preferred-channel"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Preferred Contact Channel *
                  </label>
                  <select
                    id="preferred-channel"
                    value={formData.channelPref}
                    onChange={(e) => setFormData({ ...formData, channelPref: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="call">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="viber">Viber Message</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferred-time"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    Preferred Contact Time *
                  </label>
                  <select
                    id="preferred-time"
                    value={formData.contactTime}
                    onChange={(e) => setFormData({ ...formData, contactTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="evening">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="anytime">Anytime during working hours</option>
                  </select>
                </div>
              </div>

              {/* Consent Checkboxes (Doc 09 Section 7 - Strictly Separate) */}
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs">
                {/* Mandatory Consent */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consentContact}
                    onChange={(e) => setFormData({ ...formData, consentContact: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium text-slate-800">
                    I agree to be contacted by an ITinNepal student counsellor regarding my college
                    inquiry. *
                  </span>
                </label>

                {/* Separate Optional Consent */}
                <label className="flex cursor-pointer items-start gap-2.5 border-t border-slate-200 pt-2">
                  <input
                    type="checkbox"
                    checked={formData.consentShare}
                    onChange={(e) => setFormData({ ...formData, consentShare: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-600">
                    (Optional) I consent to ITinNepal sharing my inquiry and contact details with
                    shortlisted colleges for admission updates.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? "Submitting..." : "Submit Help Request"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar: Tracking Box & SLAs */}
        <aside className="space-y-6">
          {/* Status Tracker */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 text-sm font-bold text-slate-900">Track Existing Request</h3>
            <p className="mb-4 text-xs text-slate-500">
              Enter your reference code (e.g. ITN-2026-00001) to check status.
            </p>

            <form onSubmit={handleLookup} className="flex gap-2">
              <input
                type="text"
                placeholder="ITN-YYYY-NNNNN"
                value={lookupRef}
                onChange={(e) => setLookupRef(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {lookupError && <p className="mt-3 text-xs font-medium text-rose-600">{lookupError}</p>}

            {lookupResult && (
              <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{lookupResult.refCode}</span>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                    {lookupResult.status}
                  </span>
                </div>
                <p className="text-slate-600">
                  Student: <strong>{lookupResult.name}</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Submitted on: {new Date(lookupResult.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* SLA commitments */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-xs shadow-sm">
            <h3 className="flex items-center gap-1.5 font-bold text-slate-900">
              <Clock className="h-4 w-4 text-indigo-600" />
              Our Counselling SLA
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>First reply within 24 hours (target: 4 hrs)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>Zero sales pressure or forced phone calls</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>Opt-out & data deletion anytime</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
