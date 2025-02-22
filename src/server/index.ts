import PDFParser from "pdf2json";
import multer from "multer";
import express, { Request, Response } from "express";
import parseResume from "./resumeParser";

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
