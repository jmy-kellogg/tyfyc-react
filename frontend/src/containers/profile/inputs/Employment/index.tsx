import React, { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";
import EmploymentItem from "./EmploymentItem";

import {
  getEmploymentList,
  createEmployment,
  deleteEmployment,
} from "@/api/employment";
import type { Employment } from "@/types";

interface EmploymentProps {
  lockEdit: boolean;
}

const TEMP_EMPLOYMENT_ID = "new_employment_item";

const Employment: React.FC<EmploymentProps> = ({ lockEdit }) => {
  const [employmentList, setEmploymentList] = useState<Employment[]>([]);

  const addNew = async (): Promise<void> => {
    const lastItem = employmentList[employmentList.length - 1];
    if (
      lastItem.jobTitle ||
      lastItem.company ||
      lastItem.start ||
      lastItem.end ||
      lastItem.location ||
      lastItem.description
    ) {
      const employment = await createEmployment({
        jobTitle: "",
        company: "",
        start: "",
        end: "",
        location: "",
        description: "",
      });
      setEmploymentList([...employmentList, employment]);
    }
  };

  const remove = async (id: string): Promise<void> => {
    const newList = employmentList.filter((job) => job.id !== id);
    if (id === TEMP_EMPLOYMENT_ID) {
      setEmploymentList(newList);
    } else {
      await deleteEmployment(id);
      setEmploymentList(newList);
    }
  };

  const fetchEmployment = useCallback(async (): Promise<void> => {
    const employment = await getEmploymentList();
    setEmploymentList(employment);
  }, []);

  useEffect((): void => {
    fetchEmployment();
  }, [fetchEmployment]);

  return (
    <>
      <h2>
        <b>Professional Experience </b>
        {!lockEdit && (
          <button
            type="button"
            className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              addNew();
            }}
          >
            Add Job
          </button>
        )}
      </h2>
      {employmentList.map((employment: Employment) => (
        <div key={employment.id}>
          <EmploymentItem
            employment={employment}
            lockEdit={lockEdit}
            remove={remove}
          />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Employment;
