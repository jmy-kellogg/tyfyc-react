import type { StatusOption } from "../types";

export const statusOptions: Array<StatusOption> = [
  { label: "Applied", value: "applied", color: "blue" },
  { label: "Interviewing", value: "interviewing", color: "green" },
  { label: "No Offer", value: "no_offer", color: "slate" },
  { label: "Declined", value: "declined", color: "gray" },
  { label: "Auto Rejected", value: "auto_rejected", color: "gray" },
  { label: "Pending", value: "pending", color: "yellow" },
  { label: "Unknown", value: "", color: "" },
];
