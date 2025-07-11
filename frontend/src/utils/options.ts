import type { StatusOption } from "../types";

export const statusOptions: Array<StatusOption> = [
  {
    id: "interviewing",
    label: "Interviewing",
    value: "interviewing",
    style: "text-emerald-400",
  },
  {
    id: "applied",
    label: "Applied",
    value: "applied",
    style: "text-blue-400",
  },
  {
    id: "accepted",
    label: "Accepted",
    value: "accepted",
    style: "text-emerald-600",
  },
  {
    id: "no_offer",
    label: "No Offer",
    value: "no_offer",
    style: "text-amber-500",
  },
  {
    id: "declined",
    label: "Declined",
    value: "declined",
    style: "text-rose-400",
  },
  {
    id: "rejected",
    label: "Rejected",
    value: "rejected",
    style: "text-amber-400",
  },
  {
    id: "auto_rejected",
    label: "Auto Rejected",
    value: "auto_rejected",
    style: "text-gray-600",
  },
  {
    id: "no_response",
    label: "Ghosted",
    value: "no_response",
    style: "text-gray-400",
  },
  { id: "", label: "Pending", value: "pending", style: "text-purple-400" },
  { id: "", label: "Unknown", value: "", style: "text-white" },
];
