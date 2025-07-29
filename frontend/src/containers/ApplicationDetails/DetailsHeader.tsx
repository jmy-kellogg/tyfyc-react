import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { statusOptions } from "@options";
import type { Application, ApplicationUpdate } from "@/types";
import { deleteApplication } from "@/api/applications";
import { updateApplication } from "@/api/applications";
import { setJobTab, removeJobTab } from "@/store/reducers/navigationSlice";
import InputLink from "@/components/InputLink";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import DateInput from "@/components/DateInput";
import DeleteBtn from "@/components/DeleteBtn";

interface Props {
  application: Application;
}

function DetailsHeader({ application }: Props) {
  const dispatch = useDispatch();
  const [currApp, setCurrApp] = useState<Application>(application);

  const handleUpdate = async (form: ApplicationUpdate) => {
    const updatedApp = await updateApplication({ ...currApp, ...form });
    setCurrApp(updatedApp);
  };

  const updateCompanyName = (companyInfo: ApplicationUpdate) => {
    if (!application.id) return;
    const companyName = companyInfo.company;
    if (companyName && companyName !== currApp.company) {
      dispatch(setJobTab({ label: companyName, value: application.id }));
    }
    handleUpdate(companyInfo);
  };

  const remove = async () => {
    if (currApp.id) {
      await deleteApplication(currApp.id);
      dispatch(removeJobTab(currApp.id));
    }
  };

  useEffect(() => {
    if (currApp.id !== application.id) {
      setCurrApp({ ...application });
    }
  }, [currApp.id, application]);

  return (
    <div className="max-h-max">
      <div className="float-end">
        <DeleteBtn application={currApp} onRemove={remove} />
      </div>
      <InputLink
        label="Company Name"
        inputName="company"
        inputValue={currApp.company || ""}
        linkName="companySite"
        linkValue={currApp.companySite || ""}
        onUpdate={updateCompanyName}
        tag="h1"
      />
      <InputLink
        label="Job Title"
        inputName="title"
        inputValue={currApp.title || ""}
        linkName="postingLink"
        linkValue={currApp.postingLink || ""}
        onUpdate={handleUpdate}
      />
      <div className="flex flex-wrap items-center justify-between m-3">
        <div className="flex items-center">
          <b>Status: </b>
          <Dropdown
            inputName="status"
            inputValue={currApp.status || ""}
            options={statusOptions}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b className="mx-1 w-max">Applied: </b>
          <DateInput
            inputName="dateApplied"
            inputValue={currApp.dateApplied || ""}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b>Location: </b>
          <Input
            label="Location"
            inputName="location"
            inputValue={currApp.location || ""}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b>Salary: </b>
          <Input
            label="Salary"
            inputName="salary"
            inputValue={currApp.salary || ""}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
