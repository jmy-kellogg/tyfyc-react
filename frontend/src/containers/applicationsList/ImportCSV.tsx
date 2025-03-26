import Papa from "papaparse";
import { ChangeEvent } from "react";

import type { Application, Applications } from "@/types/applications";
import api from "@/api";

function ImportCSV() {
  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    const file: File = files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const csvData = results?.data || [];
          if (!csvData || !csvData.length) {
            console.error("Must be a TYFYC CSV");
          } else {
            const dbApplications: Applications =
              (await api.get("/applications"))?.data || [];
            const jobIdLists = dbApplications.map(({ id }) => id);

            const uploaded: Array<Partial<Application>> = csvData
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((item: unknown): item is Record<string, any> => {
                return (
                  item !== null &&
                  typeof item === "object" &&
                  Object.keys(item).length > 0
                );
              })
              .filter((item: Partial<Application>) => {
                return !item?.id || !jobIdLists.includes(item?.id);
              })
              .map((item: Partial<Application>) => {
                return {
                  company: item.company || "",
                  title: item.title || "",
                  status: item.status || "applied",
                  location: item.location || "",
                  dateApplied: item.dateApplied || "",
                  salary: item.salary || "",
                  postingLink: item.postingLink || "",
                  companySite: item.companySite || "",
                  posting: item.posting || "",
                };
              });

            if (uploaded.length) {
              uploaded.forEach(async (application) => {
                try {
                  await api.post("/applications", application);
                } catch (err) {
                  console.error(err);
                }
              });
            }
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
      <div className="bg-white mx-5">
        <div className="flex">
          <div className="flex">
            <label className="self-center rounded-md bg-indigo-600 text-white my-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportCSV;
