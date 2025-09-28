import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Resume from "@/components/Resume";
import { updateUser } from "@/api/user";

import type { State } from "@/store";

const Resumes: React.FC = () => {
  const [resume, setResume] = useState<string>("");
  const user = useSelector((state: State) => state.auth.user);

  const saveResume = async (resume: string): Promise<void> => {
    if (resume) {
      await updateUser({ resume });
    }
  };

  useEffect((): void => {
    if (user?.resume) {
      setResume(user.resume);
    }
  }, [user]);

  return (
    <>
      <div className="page">
        <Resume resume={resume} onSave={saveResume} />
      </div>
    </>
  );
};

export default Resumes;
