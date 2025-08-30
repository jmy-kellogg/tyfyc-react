import { useState, useEffect } from "react";

import type { ApplicationUpdate, Application } from "@/types";
import Resume from "@/components/Resume";
import Toggle from "@/components/Toggle";
import SkillSection from "./SkillsSection";
import TextInput from "./TextInput";
import PostingBtnMenu from "./PostingBtnMenu";

interface Props {
  application: Application;
  onUpdate: (form: ApplicationUpdate) => void;
}
function DetailsBody({ application, onUpdate }: Props) {
  const [notesToggle, setNotesToggle] = useState<boolean>(false);
  const [resumeToggle, setResumeToggle] = useState<boolean>(false);
  const [skillsToggle, setSkillsToggle] = useState<boolean>(true);
  const [postingToggle, setPostingToggle] = useState<boolean>(true);

  const saveResume = (resume: string) => {
    onUpdate({ resume });
  };

  const handleNotesToggle = () => {
    setNotesToggle(!notesToggle);
    if (!notesToggle && !application.notes) {
      // ToDo: allow this to be customizable
      onUpdate({
        notes: `<h3>Intro:</h3><p></p><h3><strong>Questions:</strong></h3><p>What are the most important qualities they are looking for?</p><p>What is the team?</p><p>What will I be working on?</p><p></p><h3><strong>About Company:</strong></h3><p></p><h3><strong>Steps:</strong></h3><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>Recruiter Interview</strong> - 30 Mins</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>HM Interview </strong>- 30 Mins</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>Technical Challenge</strong></p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><p><strong>Onsite:</strong></p><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Code Interview</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Behavior Interview</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>System Design</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><p></p>`,
      });
    }
  };

  useEffect(() => {
    const toggle = !!application.notes && application.notes !== "<p></p>";
    setNotesToggle(toggle);
  }, [application]);

  return (
    <>
      <div className="m-3">
        <Toggle
          checked={notesToggle}
          onChange={handleNotesToggle}
          label="Notes"
        />
        <Toggle
          checked={resumeToggle}
          onChange={() => setResumeToggle(!resumeToggle)}
          label="Resume"
        />
        <Toggle
          checked={skillsToggle}
          onChange={() => setSkillsToggle(!skillsToggle)}
          label="Skills"
        />
        <Toggle
          checked={postingToggle}
          onChange={() => setPostingToggle(!postingToggle)}
          label="Posting"
        />
      </div>
      <div className="m-3">
        {skillsToggle && <SkillSection posting={application.posting} />}
      </div>
      <div className="m-3">
        {notesToggle && (
          <TextInput
            label="Notes:"
            inputName="notes"
            inputValue={application.notes || ""}
            onUpdate={onUpdate}
          />
        )}
      </div>
      <div className="m-3">
        {postingToggle && (
          <TextInput
            label="Posting:"
            inputName="posting"
            inputValue={application.posting || ""}
            onUpdate={onUpdate}
            popupBtnMenu={<PostingBtnMenu onUpdate={onUpdate} />}
          />
        )}
      </div>

      <div className="m-3">
        {resumeToggle && (
          <Resume
            resume={application.resume || ""}
            onSave={saveResume}
            jobTitle={application.title}
          />
        )}
      </div>
    </>
  );
}

export default DetailsBody;
