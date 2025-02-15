import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobEdit from "./JobEdit";
import JobDoc from "./JobDoc";
import Tabs from "../Tabs";
import { setActiveTab } from "../../store/reducers/settingsSlice";
import type { State, Application } from "../../../types";

type CsvRow = Array<string>;
type CsvData = Array<CsvRow>;

function JobPosting() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [data, setData] = useState<CsvData>([]);
  const applications = useSelector((state: State) => state.applications.list);
  const activeTab = useSelector((state: State) => state.settings.activeTab);
  const openTabs = useSelector((state: State) =>
    state.applications.openTabs.map((jobId) => {
      const application = applications.find((job) => job.jobId === jobId);
      const company = application?.company || "Job";
      return {
        label: company,
        value: jobId,
      };
    })
  );
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const setActive = (jobId: string) => {
    dispatch(setActiveTab(jobId));
  };
  useEffect(() => {
    const headers: CsvRow = Object.keys(applications[0]);
    const values: CsvData = applications.map(
      (app: Application): CsvRow => Object.values(app)
    );
    setData([headers, ...values]);
  }, [applications]);
  return (
    <>
      <div>
        {!smallDisplay && (
          <Tabs tabs={openTabs} active={activeTab} setActive={setActive} />
        )}
        {openTabs.map(({ value }) => {
          const application = applications.find((job) => job.jobId === value);
          if (application) {
            return (
              activeTab === value && (
                <div className="w-full max-w-3xl">
                  <div className="float-right m-5">
                    {!showForm && (
                      <CSVLink
                        className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                        data={data}
                        filename={`tyfyc_job_search.csv`}
                        target="_blank"
                      >
                        Save Application Details
                      </CSVLink>
                    )}
                    <button
                      className="rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
                      onClick={() => setShowForm(!showForm)}
                    >
                      {showForm ? "Preview" : "Edit"}
                    </button>
                  </div>
                  <div className="bg-white p-5">
                    {showForm ? (
                      <JobEdit application={application} />
                    ) : (
                      <JobDoc application={application} />
                    )}
                  </div>
                </div>
              )
            );
          }
        })}
      </div>
    </>
  );
}

export default JobPosting;
