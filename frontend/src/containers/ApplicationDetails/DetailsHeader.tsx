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
  const handleUpdate = async (form: ApplicationUpdate) => {
    await updateApplication({ ...application, ...form });
  };

  const updateCompanyName = (companyInfo: ApplicationUpdate) => {
    if (!application.id) return;
    const companyName = companyInfo.company;
    if (companyName && companyName !== application.company) {
      dispatch(setJobTab({ label: companyName, value: application.id }));
    }
    handleUpdate(companyInfo);
  };

  const remove = async () => {
    if (application.id) {
      await deleteApplication(application.id);
      dispatch(removeJobTab(application.id));
    }
  };

  return (
    <div className="max-h-max">
      <div className="float-end">
        <DeleteBtn application={application} onRemove={remove} />
      </div>
      <InputLink
        label="Company Name"
        inputName="company"
        inputValue={application.company || ""}
        linkName="companySite"
        linkValue={application.companySite || ""}
        onUpdate={updateCompanyName}
        tag="h1"
      />
      <InputLink
        label="Job Title"
        inputName="title"
        inputValue={application.title || ""}
        linkName="postingLink"
        linkValue={application.postingLink || ""}
        onUpdate={handleUpdate}
      />
      <div className="flex flex-wrap items-center justify-between m-3">
        <div className="flex items-center">
          <b>Status: </b>
          <Dropdown
            inputName="status"
            inputValue={application.status || ""}
            options={statusOptions}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b className="mx-1 w-max">Applied: </b>
          <DateInput
            inputName="dateApplied"
            inputValue={application.dateApplied || ""}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b>Location: </b>
          <Input
            label="Location"
            inputName="location"
            inputValue={application.location || ""}
            onUpdate={handleUpdate}
          />
        </div>
        <span className="px-1">{"|"}</span>
        <div className="flex items-center">
          <b>Salary: </b>
          <Input
            label="Salary"
            inputName="salary"
            inputValue={application.salary || ""}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
