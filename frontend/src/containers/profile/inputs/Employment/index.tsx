import { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";

import {
  getEmploymentList,
  createEmployment,
  deleteEmployment,
} from "@/api/employment";
import type { Employment } from "@/types/employment";
import EmploymentItem from "./EmploymentItem";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

const TEMP_EMPLOYMENT_ID = "new_employment_item";

function Employment({ editAll, lockEdit }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [employmentList, setEmploymentList] = useState<Employment[]>([]);

  const addNew = async () => {
    const lastItem = employmentList[employmentList.length - 1];
    if (
      lastItem.jobTitle ||
      lastItem.company ||
      lastItem.start ||
      lastItem.end ||
      lastItem.location ||
      lastItem.description
    ) {
      try {
        const employment = await createEmployment({
          jobTitle: "",
          company: "",
          start: "",
          end: "",
          location: "",
          description: "",
        });
        setEmploymentList([...employmentList, employment]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const remove = async (id: string) => {
    const newList = employmentList.filter((job) => job.id !== id);
    if (id === TEMP_EMPLOYMENT_ID) {
      setEmploymentList(newList);
      setShowAdd(true);
    } else {
      try {
        await deleteEmployment(id);
        setEmploymentList(newList);
      } catch (err) {
        console.error(err);
      }
    }
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
              remove={remove}
            />
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}

export default Employment;
