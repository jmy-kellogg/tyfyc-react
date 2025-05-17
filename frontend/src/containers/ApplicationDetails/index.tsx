import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { statusOptions } from "@options";
import type { ApplicationUpdate } from "@/types/applications";
import type { SkillOption } from "@/types/skills";
import { getApplication } from "@/api/applications";
import { getSkillOptions, getSkills, addSkill } from "@/api/skills";
import { updateApplication } from "@/api/applications";
import { getActiveTab } from "@/store/reducers/navigationSlice";
import InputLink from "@/components/InputLink";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import DateInput from "@/components/DateInput";
import TextInput from "@/components/TextInput";

function ApplicationDetails() {
  const applicationId = useSelector(getActiveTab);

  const [application, setApplication] = useState<ApplicationUpdate>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [postingSkills, setPostingSkills] = useState<SkillOption[]>([]);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);
  const [skillsToggle, setSkillsToggle] = useState<boolean>(true);
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
    <div className="page">
      <div className="w-3xl m-3 justify-self-center">
        <InputLink
          label="Company Name"
          inputName="company"
          inputValue={application.company || ""}
          linkName="companySite"
          linkValue={application.companySite || ""}
          onUpdate={handleUpdate}
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
              onChange={() => setNotesToggle(!notesToggle)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
              Notes
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
    </div>
  );
}

export default ApplicationDetails;
