import OpenAI from "openai";
import dotenv from "dotenv";
import { removePunctuation } from "@utils";

interface ParsedData {
  [key: string]: string;
}

type ParsedText = Array<string>;

dotenv.config();

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

export const manualJobPostingParse = (description: string): ParsedData => {
  const parsedText = description.split("\n").filter((str) => !!str);
  const candidates = getCandidates(parsedText);

  const application = {
    company: findCompany(parsedText) || "",
    description: description,
    title: findJobTitle(candidates) || "",
    salary: "",
    location: findLocation(candidates) || "",
    postingLink: "",
    companyLink: "",
  };

  return application;
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiJobPostingParse = async (
  description: string
): Promise<ParsedData> => {
  let applicationData: ParsedData = {
    company: "",
    description: description,
    title: "",
    salary: "",
    location: "",
    postingLink: "",
    companyLink: "",
  };
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "developer",
          content:
            "For the following job posting. Give me the job data in form of this json for example { company: 'Company x', title: 'Frontend Developer', location: 'Remote', salary: '$100,000 - $200,000' }",
        },
        {
          role: "user",
          content: description,
        },
      ],
    });
    const responseMessage = completion.choices[0].message.content || "";
    const parsedData: ParsedData = JSON.parse(responseMessage) || {};
    Object.keys(parsedData).forEach((key) => {
      if (key in applicationData && typeof parsedData[key] === "string") {
        applicationData[key] = parsedData[key] || "";
      }
    });
  } catch {
    const manualParse = manualJobPostingParse(description);
    applicationData = { ...applicationData, ...manualParse };
  }
  return applicationData;
};
