import { useState, useCallback, useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import DndSort from "@/components/Sortable/DndSort";
import Divider from "src/components/Divider";

import {
  getSkills,
  addSkill,
  deleteSkill,
  getSkillOptions,
  addSkillOption,
} from "@/api/skills";
import type { SortableList, Skill } from "@/types";

interface Props {
  lockEdit: boolean;
}

// ToDo: update the skill mapping
interface SkillSelect {
  label: string;
  value: string;
  id: string;
}

function Skills({ lockEdit }: Props) {
  const [skills, setSkills] = useState<SkillSelect[]>([]);
  const [skillOptions, setSkillOptions] = useState<SkillSelect[]>([]);
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  const handleAddSkill = async (skillOptionsId: string) => {
    const skill: Skill | undefined = await addSkill({
      skillOptionsId,
      category: "",
    });

    if (skill) {
      setSkills([
        ...skills,
        { label: skill.name, value: skill.skillOptionsId, id: skill.id },
      ]);
    }
  };

  const onChange = async (
    _newValue: MultiValue<SkillSelect>,
    actionMeta: ActionMeta<SkillSelect>
  ) => {
    if (actionMeta.action === "select-option" && actionMeta?.option?.value) {
      await handleAddSkill(actionMeta.option.value);
    } else if (
      actionMeta.action === "remove-value" &&
      actionMeta?.removedValue?.id
    ) {
      await removeSkill(actionMeta.removedValue.id);
    }
  };

  const onCreateOption = async (inputValue: string) => {
    const skillOption = await addSkillOption({ name: inputValue });

    handleAddSkill(skillOption.id);

    setSkillOptions([
      ...skillOptions,
      { label: skillOption.name, value: skillOption.id, id: skillOption.id },
    ]);
  };

  const removeSkill = async (id: string) => {
    if (!id) return;

    const updatedSkills: SkillSelect[] = skills.filter(
      (skill) => skill.id !== id
    );

    await deleteSkill(id);
    setSkills(updatedSkills);
  };

  const formatSortList = (skill: SkillSelect) => ({
    ...skill,
    component: (
      <div className="flex rounded-sm border-1 border-indigo-600 text-indigo-600 m-1 pl-1 shadow-md hover:cursor-grab hover:bg-indigo-100">
        {skill.label}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 self-center hover:cursor-pointer hover:font-bold hover:text-red-600"
          onClick={() => removeSkill(skill.id || "")}
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </div>
    ),
  });

  const handleSort = (list: SortableList) => {
    // ToDo: save order in DB
    const updatedSkills: SkillSelect[] = list.map(({ label, value, id }) => ({
      label,
      value,
      id,
    }));

    setSkills(updatedSkills);
  };

  const fetchSkillOptions = useCallback(async () => {
    try {
      const dbSkillOptions = await getSkillOptions();
      setSkillOptions(
        dbSkillOptions.map(({ id, name }) => ({
          label: name,
          value: id,
          id: "",
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    try {
      const dbSkills = await getSkills();
      setSkills(
        dbSkills.map(({ id, name, skillOptionsId }) => ({
          label: name,
          value: skillOptionsId,
          id,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchSkillOptions();
  }, [fetchSkillOptions]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <>
      <div className="flex items-center gap-2">
        <h2>
          <b>Skills</b>
        </h2>
        {toggleSort ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-emerald-500 rounded-lg hover:cursor-pointer hover:text-white hover:bg-emerald-300"
            id="skill-sort-check"
            onClick={() => setToggleSort(!toggleSort)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:cursor-pointer rounded-lg hover:cursor-pointer hover:text-sky-500"
            onClick={() => setToggleSort(!toggleSort)}
            id="skill-sort-funnel"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        )}
      </div>
      {toggleSort ? (
        <div className="flex flex-wrap w-9/10">
          <DndSort
            list={skills.map(formatSortList)}
            direction="horizontal"
            onSort={handleSort}
          ></DndSort>
        </div>
      ) : (
        <>
          {lockEdit ? (
            <div>
              <p>{skills.map(({ label }) => label).join(", ")}</p>
            </div>
          ) : (
            <CreatableSelect
              isMulti
              isClearable={false}
              name="skills"
              isSearchable
              classNamePrefix="select"
              className="basic-single"
              placeholder="Technologies"
              options={skillOptions}
              value={skills}
              onChange={onChange}
              onCreateOption={onCreateOption}
              styles={{
                multiValue: (styles) => {
                  return {
                    ...styles,
                    backgroundColor: "#a3b3ff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "3px",
                  };
                },
              }}
            />
          )}
        </>
      )}

      <Divider />
    </>
  );
}

export default Skills;
