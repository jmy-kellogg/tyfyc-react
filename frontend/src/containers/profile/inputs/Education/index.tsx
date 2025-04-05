import { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";
import EducationItem from "./EducationItem";

import {
  getEducationList,
  createEducation,
  deleteEducation,
} from "@/api/education";
import type { Education } from "@/types/education";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Education({ editAll, lockEdit }: Props) {
  const [eduList, setEduList] = useState<Education[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const addNew = async () => {
    const lastItem = eduList[eduList.length - 1];
    if (lastItem.school || lastItem.degree || lastItem.gradYear) {
      try {
        const newEdu = await createEducation({
          school: "",
          degree: "",
          gradYear: "",
        });
        setEduList([...eduList, newEdu]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteEducation(id);
      setEduList(eduList.filter((edu) => edu.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEducation = useCallback(async () => {
    try {
      const education = await getEducationList();
      setEduList(education);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  return (
    <>
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Education </b>
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
        {eduList.map((education: Education) => (
          <div key={education.id}>
            <EducationItem
              education={education}
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

export default Education;
