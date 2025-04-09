import { useSelector } from "react-redux";

import Application from "./Application";

import { getActiveTab } from "src/store/reducers/settingsSlice";

function ApplicationDetails() {
  const activeTab = useSelector(getActiveTab);

  return (
    <>
      <div className="page">
        <Application applicationId={activeTab} />
      </div>
    </>
  );
}

export default ApplicationDetails;
