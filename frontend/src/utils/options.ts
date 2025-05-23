import type { StatusOption } from "../types";

export const statusOptions: Array<StatusOption> = [
  { label: "Interviewing", value: "interviewing", color: "green" },
  { label: "Applied", value: "applied", color: "blue" },
  { label: "Accepted", value: "accepted", color: "green" },
  { label: "No Offer", value: "no_offer", color: "yellow" },
  { label: "Declined", value: "declined", color: "gray" },
  { label: "Rejected", value: "rejected", color: "yellow" },
  { label: "Auto Rejected", value: "auto_rejected", color: "gray" },
  { label: "Ghosted", value: "no_response", color: "gray" },
  { label: "Pending", value: "pending", color: "yellow" },
  { label: "Unknown", value: "", color: "" },
];
