import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { statusOptions } from "@options";
import type { ApplicationUpdate, SkillOption } from "@/types";
import { getApplication, deleteApplication } from "@/api/applications";
import { getSkillOptions, getSkills, addSkill } from "@/api/skills";
import { updateApplication } from "@/api/applications";
import {
  getActiveTab,
  setJobTab,
  removeJobTab,
} from "@/store/reducers/navigationSlice";
import InputLink from "@/components/InputLink";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import DateInput from "@/components/DateInput";
import TextInput from "@/components/TextInput";
import Resume from "@/components/Resume";
import DeleteBtn from "@/components/DeleteBtn";

function ApplicationDetails() {
  const dispatch = useDispatch();
  const applicationId = useSelector(getActiveTab);

  const [application, setApplication] = useState<ApplicationUpdate>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [postingSkills, setPostingSkills] = useState<SkillOption[]>([]);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);
  const [resumeToggle, setResumeToggle] = useState<boolean>(false);
  const [skillsToggle, setSkillsToggle] = useState<boolean>(false);
  const [postingToggle, setPostingToggle] = useState<boolean>(true);

  const handleUpdate = async (form: ApplicationUpdate) => {
    const updatedApp = await updateApplication({ ...application, ...form });
    setApplication(updatedApp);
  };

  const addSkillToProfile = async (skill: SkillOption) => {
    await addSkill({
      skillOptionsId: skill.id,
      category: "",
    });
    setSkills([...skills, skill.id]);
  };

  const saveResume = (resume: string) => {
    handleUpdate({ resume });
  };

  const handleNotesToggle = () => {
    setNotesToggle(!notesToggle);
    if (!notesToggle && !application.notes) {
      // ToDo: allow this to be customizable
      handleUpdate({
        notes: `<h3>Intro:</h3><p></p><h3><strong>Questions:</strong></h3><p>What are the most important qualities they are looking for?</p><p>What is the team?</p><p>What will I be working on?</p><p></p><h3><strong>About Company:</strong></h3><p></p><h3><strong>Steps:</strong></h3><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>Recruiter Interview</strong> - 30 Mins</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>HM Interview </strong>- 30 Mins</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><strong>Technical Challenge</strong></p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><p><strong>Onsite:</strong></p><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Code Interview</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Behavior Interview</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><ul class="taskList" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>System Design</p></div></li></ul><ul class="bulletList"><li><p>Notes:</p></li></ul><p></p>`,
      });
    }
  };

  const updateCompanyName = (companyInfo: ApplicationUpdate) => {
    const companyName = companyInfo.company;
    if (companyName && companyName !== application.company) {
      dispatch(setJobTab({ label: companyName, value: applicationId }));
    }
    handleUpdate(companyInfo);
  };

  const remove = async () => {
    await deleteApplication(applicationId);
    dispatch(removeJobTab(applicationId));
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbApp = await getApplication(applicationId);
      const dbSkillOptions = await getSkillOptions();
      const dbSkills = await getSkills();
      const hasNotes = !!dbApp.notes && dbApp.notes !== "<p></p>";
      const posting = `/${dbApp.posting}/i`;
      const postingSkills = dbSkillOptions.filter((skill) => {
        // ToDo: properly handle irregular regex characters
        if (skill.name.includes("+")) {
          return false;
        }
        return posting.match(skill.name);
      });
      setApplication(dbApp);
      setNotesToggle(hasNotes);
      setPostingSkills(postingSkills);
      setSkills(dbSkills.map(({ skillOptionsId }) => skillOptionsId));
    };
    fetchData();
  }, [applicationId]);

  return (
    <div className="page flex flex-wrap justify-center">
      <div className="max-w-3xl grow md:w-md">
        <div className="float-end">
          <DeleteBtn application={application} onRemove={remove} />
        </div>

        <InputLink
          label="Company Name"
          inputName="company"
          inputValue={application.company || ""}
          linkName="companySite"
          linkValue={application.companySite || ""}
          onUpdate={updateCompanyName}
          tag="h1"
        />
        <InputLink
          label="Job Title"
          inputName="title"
          inputValue={application.title || ""}
          linkName="postingLink"
          linkValue={application.postingLink || ""}
          onUpdate={handleUpdate}
        />
        <div className="flex flex-wrap items-center justify-between m-3">
          <div className="flex items-center">
            <b>Status: </b>
            <Dropdown
              inputName="status"
              inputValue={application.status || ""}
              options={statusOptions}
              onUpdate={handleUpdate}
            />
          </div>
          <span className="px-1">{"|"}</span>
          <div className="flex items-center">
            <b className="mx-1 w-max">Applied: </b>
            <DateInput
              inputName="dateApplied"
              inputValue={application.dateApplied || ""}
              onUpdate={handleUpdate}
            />
          </div>
          <span className="px-1">{"|"}</span>
          <div className="flex items-center">
            <b>Location: </b>
            <Input
              label="Location"
              inputName="location"
              inputValue={application.location || ""}
              onUpdate={handleUpdate}
            />
          </div>
          <span className="px-1">{"|"}</span>
          <div className="flex items-center">
            <b>Salary: </b>
            <Input
              label="Salary"
              inputName="salary"
              inputValue={application.salary || ""}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
        <hr />
        <div className="m-3">
          <label className="mx-2 inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={notesToggle}
              onChange={handleNotesToggle}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
              Notes
            </span>
          </label>
          <label className="mx-2 inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={resumeToggle}
              onChange={() => setResumeToggle(!resumeToggle)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
              Resume
            </span>
          </label>
          <label className="mx-2 inline-flex items-center ≈-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={skillsToggle}
              onChange={() => setSkillsToggle(!skillsToggle)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
              Skills
            </span>
          </label>
          <label className="mx-2 inline-flex items-center ≈-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={postingToggle}
              onChange={() => setPostingToggle(!postingToggle)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
              Posting
            </span>
          </label>
        </div>
        <div className="m-3">
          {notesToggle && (
            <TextInput
              label="Notes:"
              inputName="notes"
              inputValue={application.notes || ""}
              onUpdate={handleUpdate}
            />
          )}
        </div>
        <div className="m-3">
          {skillsToggle &&
            postingSkills.map((skill) => (
              <button
                className={`rounded-sm border-1 border-indigo-600 text-indigo-600 m-1 px-2 shadow-md ${skills.includes(skill.id) ? "bg-yellow-100" : "hover:bg-indigo-100"}`}
                key={skill.id}
                disabled={skills.includes(skill.id)}
                onClick={() => addSkillToProfile(skill)}
              >
                <span className="flex items-center">
                  {!skills.includes(skill.id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  )}
                  {skill.name}
                </span>
              </button>
            ))}
        </div>

        <div className="m-3">
          {postingToggle && (
            <TextInput
              label="Posting:"
              inputName="posting"
              inputValue={application.posting || ""}
              onUpdate={handleUpdate}
            />
          )}
        </div>
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
    </div>
  );
}

export default ApplicationDetails;
