import Papa from "papaparse";
import { ChangeEvent } from "react";

import type { Applications, ApplicationReqBody } from "@/types/applications";
import { getApplications, addApplication } from "@/api/applications";

interface Props {
  fetchData: () => void;
}

function ImportCSV({ fetchData }: Props) {
  const isObject = (item: unknown): boolean => {
    return (
      item !== null && typeof item === "object" && Object.keys(item).length > 0
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadApplications = async (csvData: Array<any>) => {
    try {
      const dbApplications: Applications = await getApplications();
      const jobIdLists = dbApplications.map(({ id }) => id);
      const uploadList: Array<ApplicationReqBody> = csvData
        .filter(isObject)
        .filter((item: ApplicationReqBody) => {
          return !item?.id || !jobIdLists.includes(item?.id);
        });

      if (uploadList.length) {
        uploadList.forEach(async (application) => {
          await addApplication(application);
        });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    const file: File = files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const csvData = results?.data;
          if (!csvData) {
            console.error("No data from CSV found");
          } else {
            await uploadApplications(csvData);
          }
        },
        error: function (error) {
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
}

export default ImportCSV;
