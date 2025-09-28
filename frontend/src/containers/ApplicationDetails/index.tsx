import React, { useState, useEffect } from "react";
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

const ApplicationDetails: React.FC = () => {
  const applicationId: string = useSelector(getActiveTab);
  const [application, setApplication] = useState<Application>(initApplication);

  const handleUpdate = async (form: ApplicationUpdate): Promise<void> => {
    const updatedApp: Application = await updateApplication({
      ...application,
      ...form,
    });
    setApplication(updatedApp);
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const dbApp: Application = await getApplication(applicationId);
      setApplication(dbApp);
    };
    fetchData();
  }, [applicationId]);

  return (
    <div className="page flex flex-wrap justify-center">
      <div className="max-w-3xl grow md:w-md flex flex-col">
        <DetailsHeader application={application} onUpdate={handleUpdate} />
        <hr />
        <DetailsBody application={application} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ApplicationDetails;
