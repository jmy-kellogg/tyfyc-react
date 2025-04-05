import { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";

import { getEmploymentList } from "@/api/employment";
import type { Employment } from "@/types/employment";
import EmploymentItem from "./EmploymentItem";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Employment({ editAll, lockEdit }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [employmentList, setEmploymentList] = useState([]);

  const addNew = () => {
    console.log("ADD NEW");
  };

  const fetchEmployment = useCallback(async () => {
    try {
      const employment = await getEmploymentList();
      setEmploymentList(employment);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchEmployment();
  }, [fetchEmployment]);

  return (
    <>
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Professional Experience </b>
          {!lockEdit && (editAll || showAdd) && (
            <button
              type="button"
              className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={addNew}
            >
              Add Job
            </button>
          )}
        </h2>
        {employmentList.map((employment: Employment) => (
          <div key={employment.id}>
            <EmploymentItem
              employment={employment}
              editAll={editAll}
              lockEdit={lockEdit}
            />
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}

export default Employment;
