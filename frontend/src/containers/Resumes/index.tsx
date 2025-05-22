import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Resume from "@/components/Resume";
import { updateUser } from "@/api/user";

import type { State } from "@/store";

function Resumes() {
  const [resume, setResume] = useState("");
  const user = useSelector((state: State) => state.auth.user);

  const saveResume = async (resume: string) => {
    if (resume) {
      await updateUser({ resume });
    }
  };

  useEffect(() => {
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
}

export default Resumes;
