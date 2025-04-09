import { useState, useEffect } from "react";
import { getApplication } from "@/api/applications";

import InfoEdit from "./InfoEdit";
import InfoDoc from "./InfoDoc";
import Notes from "./Notes";
import Posting from "./Posting";
import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  applicationId: string;
  showForm: boolean;
}

function Application({ applicationId, showForm }: Props) {
  const [application, setApplication] = useState<ApplicationUpdate>({});

  useEffect(() => {
    const fetchData = async () => {
      const dbApplication = await getApplication(applicationId);
      setApplication(dbApplication);
    };
    fetchData();
  }, [applicationId]);

  return (
    <>
      <div className="p-4 space-y-4">
        {showForm ? (
          <InfoEdit application={application} />
        ) : (
          <InfoDoc application={application} />
        )}
        <hr />
        <Notes application={application} showForm={showForm} />
        <hr />
        <Posting application={application} showForm={showForm} />
      </div>
    </>
  );
}

export default Application;
