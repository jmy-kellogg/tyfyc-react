import OpenAI from "openai";
import { removePunctuation } from "@utils";

interface ParsedData {
  [key: string]: string | Array<string>;
}

type ParsedText = Array<string>;

const getCandidates = (parsedText: ParsedText): ParsedText => {
  const firstItems = parsedText.slice(0, 10);
  return firstItems.filter((str) => str.length < 50);
};

const findJobTitle = (parsedText: ParsedText) => {
  const title = parsedText.find((text) => {
    const lcText = text.toLocaleLowerCase();
    return lcText.includes("engineer") || lcText.includes("developer");
  });
  return title || "";
};

const findCompany = (parsedText: ParsedText) => {
  const isCap = /[A-Z]/;
  const isLower = /[a-z(]/;

  const candidate: string | undefined = parsedText.find((text) => {
    const startsWithAt = text.slice(0, 2).toLocaleLowerCase() === "at";
    const nextWord = text.split(" ")[1];
    return startsWithAt && isCap.test(nextWord);
  });

  if (candidate) {
    const words: ParsedText = candidate.split(" ");
    // remove the "At"
    words.shift();
    const firstLowerCase = words.findIndex((str) => isLower.test(str[0]));
    const company = words.slice(0, firstLowerCase).join(" ");

    return removePunctuation(company);
  } else {
    return "";
  }
};

const findLocation = (parsedText: ParsedText): string => {
  let locationText: string = "";
  const locationTag = parsedText.find((text) => text.includes("Location: "));
  const remoteText = parsedText.find((text) =>
    text.toLocaleLowerCase().includes("remote")
  );

  if (locationTag) {
    locationText = locationTag.replace("Location: ", "");
  } else if (remoteText) {
    locationText = remoteText;
  }

  return locationText;
};

export const jobPostingManualParse = (posting: string): ParsedData => {
  const parsedText = posting.split("\n").filter((str) => !!str);
  const candidates = getCandidates(parsedText);

  const application = {
    company: findCompany(parsedText) || "",
    posting: posting,
    title: findJobTitle(candidates) || "",
    salary: "",
    location: findLocation(candidates) || "",
    postingLink: "",
    companySite: "",
  };

  return application;
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const jobPostingAiParse = async (
  posting: string
): Promise<ParsedData> => {
  let applicationData: ParsedData = {
    company: "",
    posting: posting,
    title: "",
    salary: "",
    location: "",
    postingLink: "",
    companySite: "",
    skills: [],
  };
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that extracts data from job postings. For the following post get the company name, job title, location, salary range, and list all technical skills. Return the data in a json format using this format {company: string, title: string, location: string, salary: string, skills: Array<string>}. If there is no data use an empty string or array.",
        },
        {
          role: "user",
          content: posting,
        },
      ],
    });
    const responseMessage = completion.choices[0].message.content || "";
    const parsedData: ParsedData = JSON.parse(responseMessage) || {};
    Object.keys(parsedData).forEach((key) => {
      if (key in applicationData) {
        applicationData[key] = parsedData[key] || "";
      }
    });
  } catch {
    const manualParse = jobPostingManualParse(posting);
    applicationData = { ...applicationData, ...manualParse };
  }
  return applicationData;
};
