import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import type { ApplicationUpdate, Application } from "@/types";
import { getApplication } from "@/api/applications";
import { updateApplication } from "@/api/applications";
import { getActiveTab } from "@/store/reducers/navigationSlice";
import DetailsHeader from "./DetailsHeader";
import DetailsBody from "./DetailsBody/index";

const initApplication: Application = {
  id: "",
  company: "",
  title: "",
  status: "",
  dateApplied: "",
  location: "",
  salary: "",
  postingLink: "",
  companySite: "",
  posting: "",
  summary: "",
  notes: "",
  resume: "",
};

function ApplicationDetails() {
  const applicationId = useSelector(getActiveTab);
  const [application, setApplication] = useState<Application>(initApplication);

  const handleUpdate = async (form: ApplicationUpdate) => {
    const updatedApp = await updateApplication({ ...application, ...form });
    setApplication(updatedApp);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbApp = await getApplication(applicationId);
      setApplication(dbApp);
    };
    fetchData();
  }, [applicationId]);

  return (
    <div className="page flex flex-wrap justify-center">
      <div className="max-w-3xl grow md:w-md flex flex-col">
        <DetailsHeader application={application} />
        <hr />
        <DetailsBody application={application} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}

export default ApplicationDetails;
