import PDFParser from "pdf2json";
import multer from "multer";
import express, { Request, Response } from "express";
import getFlag from "@featureFlags";

import parseResume from "./resumeParser";
import resumeRecommendations from "./resumeChecker";
import { jobPostingManualParse, jobPostingAiParse } from "./jobPostingParser";

export const app = express();

// ToDo: find a better upload solution
const upload = multer({ dest: "uploads/" });
app.post("/parser", upload.single("file"), (req: Request, res: Response) => {
  const pdfParser = new PDFParser(this, true);
  const path = req?.file?.path || "";

  pdfParser.loadPDF(path);

  pdfParser.on("pdfParser_dataError", (errData) => {
    return res.status(500).send({ error: errData.parserError });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
    if (pdfData.Meta.Author === "tyfyc") {
      const rawText = pdfParser.getRawTextContent();
      const textData = parseResume(rawText);
      return res.status(200).send(textData);
    } else {
      return res.status(400).send({ error: "Can only accept TYFYC resumes" });
    }
  });
});

app.post("/job-posting", async (req: Request, res: Response) => {
  const posting: string = `${req.query.posting}` || "";

  if (!posting) {
    return res.status(400).send({ error: "Must give posting" });
  }

  if (getFlag("OPENAI_FEATURE_FLAG")) {
    if (posting) {
      const applicationData = await jobPostingAiParse(posting);
      return res.status(200).send(applicationData);
    }
  } else {
    const manualParse = jobPostingManualParse(posting);
    return res.status(200).send(manualParse);
  }
});

app.post("/resume-recommendation", async (req: Request, res: Response) => {
  const summary: string = `${req.query.summary}` || "";
  const description: string = `${req.query.description}` || "";

  if (!summary || !description) {
    return res.status(400).send({ error: "Must give description" });
  }

  if (getFlag("OPENAI_FEATURE_FLAG")) {
    if (description) {
      const responseRec = await resumeRecommendations({ summary, description });
      return res.status(200).send({ ...responseRec, originalSummary: summary });
    }
  } else {
    return res
      .status(200)
      .send({ summary, description, originalSummary: summary });
  }
});
