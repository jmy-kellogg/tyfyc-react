import React, { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";
import EducationItem from "./EducationItem";

import {
  getEducationList,
  createEducation,
  deleteEducation,
} from "@/api/education";
import type { Education } from "@/types";

interface EducationProps {
  lockEdit: boolean;
}

const Education: React.FC<EducationProps> = ({ lockEdit }) => {
  const [eduList, setEduList] = useState<Education[]>([]);

  const addNew = async (): Promise<void> => {
    const lastItem = eduList[eduList.length - 1];
    if (lastItem.school || lastItem.degree || lastItem.gradYear) {
      const newEdu = await createEducation({
        school: "",
        degree: "",
        gradYear: "",
      });
      setEduList([...eduList, newEdu]);
    }
  };

  const remove = async (id: string): Promise<void> => {
    await deleteEducation(id);
    setEduList(eduList.filter((edu) => edu.id !== id));
  };

  const fetchEducation = useCallback(async (): Promise<void> => {
    const education = await getEducationList();
    setEduList(education);
  }, []);

  useEffect((): void => {
    fetchEducation();
  }, [fetchEducation]);

  return (
    <>
      <h2>
        <b>Education </b>
        {!lockEdit && (
          <button
            type="button"
            className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              addNew();
            }}
          >
            Add Education
          </button>
        )}
      </h2>
      {eduList.map((education: Education) => (
        <div key={education.id}>
          <EducationItem
            education={education}
            lockEdit={lockEdit}
            remove={remove}
          />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Education;
