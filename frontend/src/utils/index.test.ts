import { describe, expect, test } from "@jest/globals";
import {
  removePunctuation,
  getFormattedDate,
  snake_case_string,
} from "./index";

describe("removePunctuation", () => {
  test("removes punctuation at the end of a string", () => {
    expect(removePunctuation("Hello!")).toBe("Hello");
    expect(removePunctuation("Test,")).toBe("Test");
    expect(removePunctuation("Wow...")).toBe("Wow..");
  });

  test("does not remove punctuation in the middle of a string", () => {
    expect(removePunctuation("Hello, world!")).toBe("Hello, world");
    expect(removePunctuation("This.is.a.test!")).toBe("This.is.a.test");
  });

  test("returns the same string if no punctuation at the end", () => {
    expect(removePunctuation("No punctuation")).toBe("No punctuation");
    expect(removePunctuation("12345")).toBe("12345");
  });

  test("handles empty strings", () => {
    expect(removePunctuation("")).toBe("");
  });
});

describe("getFormattedDate", () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, "language", {
      value: "en-US",
      configurable: true,
    });
  });

  test("formats date with default options", () => {
    expect(getFormattedDate("2024-02-20")).toBe("Feb 20");
  });

  test("formats date with custom options", () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    expect(getFormattedDate("2024-02-20", options)).toBe("February 20, 2024");
  });

  test("handles different time zones", () => {
    expect(getFormattedDate("2024-02-20T23:59:59.999Z")).toBe("Feb 20");
  });

  test("returns 'Invalid Date' for incorrect input", () => {
    expect(getFormattedDate("invalid-date")).toBe("Invalid Date");
  });
});

describe("snake_case_string", () => {
  test("converts camelCase to snake_case", () => {
    expect(snake_case_string("camelCaseExample")).toBe("camel_case_example");
    expect(snake_case_string("thisIsATest")).toBe("this_is_a_test");
  });

  test("converts PascalCase to snake_case", () => {
    expect(snake_case_string("PascalCaseExample")).toBe("pascal_case_example");
  });

  test("handles strings with numbers", () => {
    expect(snake_case_string("version1Test2")).toBe("version1_test2");
    expect(snake_case_string("Test123Example")).toBe("test123_example");
  });

  test("converts ALLCAPS to lowercase snake_case", () => {
    expect(snake_case_string("APIResponseCode")).toBe("api_response_code");
  });

  test("handles single words", () => {
    expect(snake_case_string("hello")).toBe("hello");
    expect(snake_case_string("Hello")).toBe("hello");
  });

  test("handles empty strings", () => {
    expect(snake_case_string("")).toBe("");
  });

  test("handles already snake_case strings", () => {
    expect(snake_case_string("already_snake_case")).toBe("already_snake_case");
  });

  test("handles mixed cases and special cases", () => {
    expect(snake_case_string("SnakeCase123Test")).toBe("snake_case123_test");
    expect(snake_case_string("HTTPServerResponse")).toBe(
      "http_server_response",
    );
  });
});
