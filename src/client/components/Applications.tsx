import { useSelector, useDispatch } from "react-redux";

import {
  addNewApplication,
  removeApplication,
} from "../store/reducers/applicationsSlice";
import type { State, ApplicationsList } from "../../types";

interface Props {
  smallDisplay: boolean;
}

function Applications({ smallDisplay }: Props) {
  const applications: ApplicationsList = useSelector(
    (state: State) => state.applications.list
  );
  const dispatch = useDispatch();

  const addNew = () => {
    dispatch(addNewApplication());
  };

  const remove = (jobId: string) => {
    dispatch(removeApplication(jobId));
  };

  return (
    <>
      <div className="mx-5 w-lg">
        {!smallDisplay && <h2 className="text-center">Applications</h2>}
        <div className="bg-white p-5">
          <h1>Job Applications List</h1>
          {applications.map((application) => (
            <div key={application.jobId}>
              <h2>{application.company}</h2>
              <button
                type="button"
                className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => remove(application.jobId)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addNew}
          >
            Add Application
          </button>
        </div>
      </div>
    </>
  );
}

export default Applications;
