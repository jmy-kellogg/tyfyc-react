import { statusOptions } from "./options";
import type { Application, StatusOption } from "../types";

// This is to allow us to see sections when importing pdf, until we have a more robust parser
export const divider = (): string => {
  let index: number = 100;
  let line: string = "";
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
  const lang: string = navigator?.language || "en-US";
  const dateOptions: Intl.DateTimeFormatOptions = {
    ...options,
    timeZone: "UTC",
  };

  return new Date(dateString).toLocaleDateString(lang, dateOptions);
};
export const getToday = (): string => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1;
  const day: number = today.getDate();
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

// Skills Utils
export const snake_case_string = (str: string): string => {
  const regex: RegExp =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  const regexOutput: RegExpMatchArray | null = str.match(regex);
  return (regexOutput || []).map((s: string) => s?.toLowerCase()).join("_");
};

export const snakeToCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string): string =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
};

export const camelToSnakeCase = (str: string): string => {
  const regex: RegExp =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  const regexOutput: RegExpMatchArray | null = str.match(regex);
  return (regexOutput || []).map((s: string) => s?.toLowerCase()).join("_");
};

export const camelToText = (str: string): string => {
  const words = str.replace(/([A-Z])/g, " $1").trim();

  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const createSkill = (
  newSkill: string
): { label: string; value: string } => {
  return {
    label: newSkill,
    value: snake_case_string(newSkill),
  };
};

// API Utils
export const jsToPythonKeys = <T extends Record<string, unknown>>(
  item: T
): T => {
  if (item && item.constructor === Object) {
    const keys: string[] = Object.keys(item);
    keys.forEach((key: string): void => {
      const snake_case: string = camelToSnakeCase(key);
      if (snake_case !== key) {
        (item as Record<string, unknown>)[snake_case] = item[key];
        delete (item as Record<string, unknown>)[key];
      }
    });
  }
  return item;
};

export const pythonToJsKeys = <T extends Record<string, unknown>>(
  item: T
): T => {
  if (item && item.constructor === Object) {
    const keys: string[] = Object.keys(item);
    keys.forEach((key: string): void => {
      if (key.includes("_")) {
        const camelCase: string = snakeToCamelCase(key);
        (item as Record<string, unknown>)[camelCase] = item[key];
        delete (item as Record<string, unknown>)[key];
      }
    });
  }
  return item;
};
