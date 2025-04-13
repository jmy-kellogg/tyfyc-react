import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { statusOptions } from "@options";
import type { ApplicationUpdate } from "@/types/applications";

import { getApplication } from "@/api/applications";
import { updateApplication } from "@/api/applications";
import { getActiveTab } from "@/store/reducers/settingsSlice";
import InputLink from "@/components/InputLink";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import DateInput from "@/components/DateInput";
import TextInput from "@/components/TextInput";

function ApplicationDetails() {
  const applicationId = useSelector(getActiveTab);

  const [application, setApplication] = useState<ApplicationUpdate>({});

  const handleUpdate = async (form: ApplicationUpdate) => {
    const updatedApp = await updateApplication({ ...application, ...form });
    setApplication(updatedApp);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbApplication = await getApplication(applicationId);
      setApplication(dbApplication);
    };
    fetchData();
  }, [applicationId]);

  return (
    <div className="page">
      <div className="w-3xl m-3 justify-self-center">
        <div className="flex justify-around">
          <InputLink
            label="Company Name"
            inputName="company"
            inputValue={application.company || ""}
            linkName="companySite"
            linkValue={application.companySite || ""}
            onUpdate={handleUpdate}
          />
          <InputLink
            label="Job Title"
            inputName="title"
            inputValue={application.title || ""}
            linkName="postingLink"
            linkValue={application.postingLink || ""}
            onUpdate={handleUpdate}
          />
        </div>

        <div className="flex justify-between m-3">
          <div className="flex items-center">
            <b className="mx-1">Status: </b>
            <Dropdown
              inputName="status"
              inputValue={application.status || ""}
              options={statusOptions}
              onUpdate={handleUpdate}
            />
            <span className="mx-1">{"|"}</span>
          </div>
          <div className="flex items-center">
            <b className="mx-1">Date Applied: </b>
            <DateInput
              inputName="dateApplied"
              inputValue={application.dateApplied || ""}
              onUpdate={handleUpdate}
            />
            <span className="mx-1">{"|"}</span>
          </div>
          <div className="flex items-center">
            <b className="mx-1">Location: </b>
            <Input
              label="Location"
              inputName="location"
              inputValue={application.location || ""}
              onUpdate={handleUpdate}
            />
            <span className="mx-1">{"|"}</span>
          </div>
          <div className="flex items-center">
            <b className="mx-1">Salary: </b>
            <Input
              label="Salary"
              inputName="salary"
              inputValue={application.salary || ""}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
        <hr />
        <div className="m-3">
          <TextInput
            label="Notes:"
            inputName="notes"
            inputValue={application.notes || ""}
            onUpdate={handleUpdate}
          />
          <TextInput
            label="Posting:"
            inputName="posting"
            inputValue={application.posting || ""}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
