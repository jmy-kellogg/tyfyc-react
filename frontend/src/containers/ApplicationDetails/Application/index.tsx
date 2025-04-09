import { useState, useEffect } from "react";
import { getApplication } from "@/api/applications";

import InfoEdit from "./InfoEdit";
import InfoDoc from "./InfoDoc";
import Notes from "./Notes";
import Posting from "./Posting";
import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  applicationId: string;
}

function Application({ applicationId }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [application, setApplication] = useState<ApplicationUpdate>({});

  useEffect(() => {
    const fetchData = async () => {
      const dbApplication = await getApplication(applicationId);
      setApplication(dbApplication);
    };
    fetchData();
  }, [applicationId, showForm]);

  return (
    <>
      <div className="w-3xl justify-self-center">
        {showForm ? (
          <InfoEdit application={application} setShowForm={setShowForm} />
        ) : (
          <InfoDoc application={application} setShowForm={setShowForm} />
        )}
        <Notes application={application} showForm={showForm} />
        <Posting application={application} showForm={showForm} />
      </div>
    </>
  );
}

export default Application;
