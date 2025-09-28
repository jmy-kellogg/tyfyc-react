import Papa from "papaparse";
import React, { ChangeEvent } from "react";

import type { Applications, ApplicationUpdate } from "@/types";
import { getApplications, addApplication } from "@/api/applications";

interface ImportCSVProps {
  fetchData: () => void;
}

const ImportCSV: React.FC<ImportCSVProps> = ({ fetchData }) => {
  const isObject = (item: unknown): boolean => {
    return (
      item !== null && typeof item === "object" && Object.keys(item).length > 0
    );
  };

  const uploadApplications = async (csvData: Array<Record<string, unknown>>): Promise<void> => {
    try {
      const dbApplications: Applications = await getApplications();
      const jobIdLists: string[] = dbApplications.map(({ id }) => id);
      const uploadList: Array<ApplicationUpdate> = csvData
        .filter(isObject)
        .filter((item: Record<string, unknown>) => {
          return !item?.id || !jobIdLists.includes(item.id as string);
        });

      if (uploadList.length) {
        uploadList.forEach(async (application: ApplicationUpdate): Promise<void> => {
          await addApplication(application);
        });
        fetchData();
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files: FileList | null = event.target.files;
    const file: File | undefined = files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results: Papa.ParseResult<Record<string, unknown>>): Promise<void> => {
          const csvData: Array<Record<string, unknown>> | undefined = results?.data;
          if (!csvData) {
            console.error("No data from CSV found");
          } else {
            await uploadApplications(csvData);
          }
        },
        error: function (error: Papa.ParseError): void {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <>
      <label className="self-center rounded-md bg-indigo-600 border-2 border-indigo-600 text-white my-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500 hover:border-indigo-500">
        <span>Import CSV</span>
        <input
          id="csv-upload"
          name="csvUpload"
          type="file"
          className="sr-only"
          accept=".csv"
          onChange={onFilePicked}
        />
      </label>
    </>
  );
};

export default ImportCSV;
