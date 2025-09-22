import { useState, useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import DndSort from "@/components/Sortable/DndSort";

import { addSkill, deleteSkill, addSkillOption } from "@/api/skills";
import type { SortableList, Skill } from "@/types";

interface SkillSelect {
  label: string;
  value: string;
  id: string;
  category: string;
  rank: number | null;
}

interface Props {
  lockEdit: boolean;
  toggleSort: boolean;
  allSkills: SkillSelect[];
  skillOptions: SkillSelect[];
  groupId: string;
}

interface SkillGroup {
  id: "frontend" | "backend" | "database" | "";
  name: string;
}

const groups: SkillGroup[] = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "", name: "General" },
];

function SkillsGroup({
  lockEdit,
  toggleSort,
  allSkills,
  skillOptions,
  groupId = "",
}: Props) {
  const displayName = groups.find(({ id }) => id == groupId)?.name || "General";
  const [skills, setSkills] = useState<SkillSelect[]>([]);

  const handleAddSkill = async (skillOptionsId: string) => {
    const skill: Skill | undefined = await addSkill({
      skillOptionsId,
      category: groupId,
    });

    if (skill) {
      setSkills([
        ...skills,
        {
          label: skill.name,
          value: skill.skillOptionsId,
          id: skill.id,
          category: skill.category,
          rank: skill.rank || null,
        },
      ]);
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

    const updatedSkills: SkillSelect[] = skills.filter(
      (skill) => skill.id !== id
    );

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

  const handleSort = (list: SortableList) => {
    // ToDo: save order in DB
    const updatedSkills: SkillSelect[] = list.map(
      ({ label, value, id, category, rank }) => ({
        label,
        value,
        id,
        category,
        rank,
      })
    );

    setSkills(updatedSkills);
  };

  useEffect(() => {
    const filteredSkills = allSkills.filter(
      ({ category }) => category === groupId
    );

    setSkills(filteredSkills);
  }, [allSkills, groupId]);

  return (
    <div className="m-2">
      {toggleSort ? (
        <div className="grid grid-cols-[5rem_1fr] items-start gap-2">
          <b>{`${displayName}: `}</b>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 w-9/10">
            <DndSort
              list={skills
                .filter(({ category }) => category == groupId)
                .map(formatSortList)}
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
                <p>
                  {skills
                    .filter(({ category }) => category == groupId)
                    .map(({ label }) => label)
                    .join(", ")}
                </p>
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
                value={skills.filter(({ category }) => category == groupId)}
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
