"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { StoredHelpRequest } from "@/modules/help/help.service";

export default function CounsellorQueuePage() {
  const [requests, setRequests] = useState<StoredHelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<StoredHelpRequest | null>(null);
  const [noteText, setNoteText] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/v1/help-requests?status=${statusFilter}`
        : "/api/v1/help-requests";
      const res = await fetch(url);
      const json = await res.json();
      if (res.ok) {
        setRequests(json.data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleStatusChange = async (refCode: string, newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/help-requests/${refCode}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: noteText ? noteText : undefined,
          assignedTo: "Counsellor Staff",
        }),
      });
      if (res.ok) {
        setNoteText("");
        fetchRequests();
        const json = await res.json();
        setSelectedRequest(json.data);
      }
    } catch {
      // ignore
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Counsellor Help Desk Queue</h1>
            <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
              Staff View
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Incoming student queries, callback requests, and counselling case management.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-xs font-semibold text-slate-600">
            Filter:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New (Unassigned)</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="CONTACTED">Contacted</option>
            <option value="FOLLOW_UP">Follow-up</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Requests List */}
        <div className="space-y-3 lg:col-span-2">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              Loading requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-xs text-slate-500">
              No help requests found in this view.
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.refCode}
                onClick={() => setSelectedRequest(req)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  selectedRequest?.refCode === req.refCode
                    ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-700">{req.refCode}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      req.status === "NEW"
                        ? "bg-rose-100 text-rose-800"
                        : req.status === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="mt-2">
                  <h2 className="text-sm font-bold text-slate-900">{req.name}</h2>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {req.phone}
                    </span>
                    <span>Channel: {req.channelPref}</span>
                    <span>Time: {req.contactTime}</span>
                  </div>
                </div>

                {req.question && (
                  <p className="mt-2 line-clamp-1 text-xs italic text-slate-600">
                    &ldquo;{req.question}&rdquo;
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
                  <span>Level: {req.currentStatus}</span>
                  <span>Share with colleges: {req.consentShare ? "Consented" : "No"}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Request Detail & Actions */}
        <div className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="border-b border-slate-100 pb-2 text-sm font-bold text-slate-900">
            Request Details & Actions
          </h2>

          {selectedRequest ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="block font-mono font-bold text-indigo-700">
                  {selectedRequest.refCode}
                </span>
                <p className="text-base font-bold text-slate-900">{selectedRequest.name}</p>
                <p className="flex items-center gap-1 text-slate-600">
                  <Phone className="h-3.5 w-3.5" />
                  {selectedRequest.phone}
                </p>
                {selectedRequest.email && (
                  <p className="flex items-center gap-1 text-slate-600">
                    <Mail className="h-3.5 w-3.5" />
                    {selectedRequest.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p>
                  <strong>Level:</strong> {selectedRequest.currentStatus}
                </p>
                {selectedRequest.plus2Stream && (
                  <p>
                    <strong>Stream:</strong> {selectedRequest.plus2Stream}
                  </p>
                )}
                {selectedRequest.seeGpa && (
                  <p>
                    <strong>GPA:</strong> {selectedRequest.seeGpa}
                  </p>
                )}
                {selectedRequest.budgetNpr && (
                  <p>
                    <strong>Budget:</strong> NPR {selectedRequest.budgetNpr.toLocaleString()}
                  </p>
                )}
                <p>
                  <strong>College Sharing Consent:</strong>{" "}
                  {selectedRequest.consentShare ? (
                    <span className="font-bold text-emerald-700">Consented</span>
                  ) : (
                    <span className="font-medium text-slate-500">Do not share (Restricted)</span>
                  )}
                </p>
              </div>

              {selectedRequest.question && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                  <strong className="mb-1 block text-indigo-900">Student Question:</strong>
                  <p className="leading-relaxed text-slate-700">{selectedRequest.question}</p>
                </div>
              )}

              {/* Status Updater */}
              <div className="space-y-2 border-t border-slate-100 pt-2">
                <label htmlFor="counsellor-note" className="block font-bold text-slate-800">
                  Add Case Note
                </label>
                <textarea
                  id="counsellor-note"
                  rows={2}
                  placeholder="Record counsellor call notes or recommendations..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                />

                <span className="block font-bold text-slate-800">Update Status</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => handleStatusChange(selectedRequest.refCode, "CONTACTED")}
                    className="rounded-lg bg-blue-600 py-1.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Mark Contacted
                  </button>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => handleStatusChange(selectedRequest.refCode, "RESOLVED")}
                    className="rounded-lg bg-emerald-600 py-1.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-xs text-slate-400">
              Select a help request from the left column to view student details and manage
              counselling status.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
