import { statusOptions } from "@options";
import type { Skill, StatusOption, Application } from "@types";

// This is to allow us to see sections when importing pdf, until we have a more robust parser
export const divider = (): string => {
  let index = 100;
  let line = "";
  while (index > 0) {
    index--;
    line += "_";
  }
  return line;
};

// Application Utils
export const removePunctuation = (str: string): string => {
  return str.replace(/[.,!?;:]$/g, "");
};

export const getStatus = (
  statusValue: Application["status"]
): StatusOption | undefined => {
  return statusOptions.find(({ value }) => value === statusValue);
};

export const getFormattedDate = (
  dateString: Application["dateApplied"],
  options: Intl.DateTimeFormatOptions | undefined = {
    day: "numeric",
    month: "short",
  }
): string => {
  const lang = navigator?.language || "en-US";
  const dateOptions = {
    ...options,
    timeZone: "UTC",
  };

  return new Date(dateString).toLocaleDateString(lang, dateOptions);
};
export const getToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

// Skills Utils
export const snake_case_string = (str: string): string => {
  const regex =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  const regexOutput = str.match(regex) || [];
  return regexOutput.map((s) => s?.toLowerCase()).join("_");
};

export const createSkill = (newSkill: string): Skill => {
  return {
    label: newSkill,
    value: snake_case_string(newSkill),
  };
};
