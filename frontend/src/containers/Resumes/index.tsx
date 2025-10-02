import React, { useState, useEffect } from "react";

import Resume from "@/components/Resume";
import { fetchUser, updateUser } from "@/api/user";

import type { User } from "@/types";
const Resumes: React.FC = () => {
  const [resume, setResume] = useState<string>("");
  const saveResume = async (resume: string): Promise<void> => {
    if (resume) {
      await updateUser({ resume });
    }
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const { resume }: User = await fetchUser();

      setResume(resume || "");
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="page">
        <Resume resume={resume} onSave={saveResume} />
      </div>
    </>
  );
};

export default Resumes;
