import { useState, useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import DndSort from "@/components/Sortable/DndSort";

import {
  addSkill,
  updateSkill,
  deleteSkill,
  addSkillOption,
} from "@/api/skills";
import type { SortableList, SkillSelect, SkillGroup } from "@/types";

interface Props {
  lockEdit: boolean;
  toggleSort: boolean;
  allSkills: SkillSelect[];
  skillOptions: SkillSelect[];
  groupId: string;
}

const groups: SkillGroup[] = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "general", name: "General" },
];

function SkillsGroup({
  lockEdit,
  toggleSort,
  allSkills,
  skillOptions,
  groupId = "general",
}: Props) {
  const displayName = groups.find(({ id }) => id == groupId)?.name || "General";
  const [skills, setSkills] = useState<SkillSelect[]>([]);

  const handleAddSkill = async (skillOptionsId: string) => {
    let skill: SkillSelect | undefined = allSkills.find(({ value }) => {
      return value === skillOptionsId;
    });

    try {
      if (skill) {
        await updateSkill(skill.id, { category: groupId });
      } else {
        skill = await addSkill({
          skillOptionsId,
          category: groupId,
        });
      }

      if (skill) {
        setSkills([...skills, skill]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (
    _newValue: MultiValue<SkillSelect>,
    actionMeta: ActionMeta<SkillSelect>
  ) => {
    if (actionMeta.action === "select-option" && actionMeta?.option?.value) {
      handleAddSkill(actionMeta.option.value);
    } else if (
      actionMeta.action === "remove-value" &&
      actionMeta?.removedValue?.id
    ) {
      removeSkill(actionMeta.removedValue.id);
    }
  };

  const onCreateOption = async (inputValue: string) => {
    const skillOption = await addSkillOption({ name: inputValue });

    handleAddSkill(skillOption.id);
  };

  const removeSkill = async (id: string) => {
    if (!id) return;

    const updatedSkills: SkillSelect[] = skills
      .filter((skill) => skill.id !== id)
      .sort((a, b) => (a.rank || 0) - (b.rank || 0));

    await deleteSkill(id);
    setSkills(updatedSkills);
  };

  const formatSortList = (skill: SkillSelect) => ({
    ...skill,
    component: (
      <div className="grid grid-cols-[1fr_auto] items-center rounded-sm border-1 border-indigo-600 text-indigo-600 m-1 pl-1 shadow-md hover:cursor-grab hover:bg-indigo-100">
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

  const handleSort = async (list: SortableList) => {
    const updatedSkills: SkillSelect[] = list.map(
      ({ label, value, id, category }, index) => ({
        label,
        value,
        id,
        category,
        rank: index,
      })
    );

    setSkills(updatedSkills);

    // Update each skill's rank in the database
    for (const skill of updatedSkills) {
      try {
        await updateSkill(skill.id, { rank: skill.rank });
      } catch (error) {
        console.error(`Failed to update rank for skill ${skill.id}:`, error);
      }
    }
  };

  useEffect(() => {
    const filteredSkills = allSkills
      .filter(({ category }) => category === groupId)
      .sort((a, b) => (a.rank || 0) - (b.rank || 0));

    setSkills(filteredSkills);
  }, [allSkills, groupId]);

  return (
    <div className="m-2">
      {toggleSort ? (
        <div className="grid grid-cols-[5rem_1fr] items-start gap-2">
          <b>{`${displayName}: `}</b>
          <div className="flex flex-wrap">
            <DndSort
              list={skills.map(formatSortList)}
              direction="horizontal"
              onSort={handleSort}
            ></DndSort>
          </div>
        </div>
      ) : (
        <>
          {lockEdit ? (
            <div>
              <div className="grid grid-cols-[5rem_1fr] items-start gap-2">
                <b>{`${displayName}: `}</b>
                <p>{skills.map(({ label }) => label).join(", ")}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[5rem_1fr] items-start gap-2">
              <b>{`${displayName}: `}</b>
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SkillsGroup;
