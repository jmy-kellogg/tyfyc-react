import type { StatusOption } from "../types";

export const statusOptions: Array<StatusOption> = [
  {
    id: "interviewing",
    label: "Interviewing",
    value: "interviewing",
    style: "text-emerald-400",
    color: "oklch(0.765 0.177 163.223)",
  },
  {
    id: "accepted",
    label: "Accepted",
    value: "accepted",
    style: "text-emerald-600",
    color: "oklch(0.596 0.145 163.225);",
  },
  {
    id: "no_offer",
    label: "No Offer",
    value: "no_offer",
    style: "text-amber-500",
    color: "oklch(0.769 0.188 70.08)",
  },
  {
    id: "declined",
    label: "Declined",
    value: "declined",
    style: "text-rose-400",
    color: "oklch(0.712 0.194 13.428)",
  },
  {
    id: "rejected",
    label: "Rejected",
    value: "rejected",
    style: "text-amber-400",
    color: "oklch(0.828 0.189 84.429)",
  },
  {
    id: "auto_rejected",
    label: "Auto Rejected",
    value: "auto_rejected",
    style: "text-gray-600",
    color: "oklch(0.446 0.03 256.802)",
  },
  {
    id: "no_response",
    label: "Ghosted",
    value: "no_response",
    style: "text-gray-400",
    color: "oklch(0.707 0.022 261.325)",
  },
  {
    id: "applied",
    label: "Applied",
    value: "applied",
    style: "text-blue-400",
    color: "oklch(0.707 0.165 254.624)",
  },
  {
    id: "pending",
    label: "Pending",
    value: "pending",
    style: "text-purple-400",
    color: "oklch(0.714 0.203 305.504)",
  },
];
