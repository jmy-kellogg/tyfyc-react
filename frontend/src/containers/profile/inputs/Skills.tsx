import { useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useSelector, useDispatch } from "react-redux";

import DndSort from "@/components/Sortable/DndSort";
import Divider from "src/components/Divider";
import { skillsOptions } from "@options";

import { setSkills } from "src/store/reducers/skillsSlice";
import type { State } from "src/store";
import type { Skill, SkillsList, SortableItem, SortableList } from "@/types";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Skills({ editAll, lockEdit }: Props) {
  const dispatch = useDispatch();
  const skills: SkillsList = useSelector((state: State) => state.skills);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const onChange = (
    newValue: MultiValue<Skill>,
    actionMeta: ActionMeta<Skill>
  ) => {
    if (actionMeta.action === "select-option") {
      const updatedSkills: SkillsList = [...newValue];
      dispatch(setSkills(updatedSkills));
      setHover(false);
    }
  };

  const removeSkill = (value: string) => {
    const updatedSkills: SkillsList = skills.filter(
      (skill) => skill.value !== value
    );
    dispatch(setSkills(updatedSkills));
  };

  const formatSortList = (skill: Skill): SortableItem => ({
    ...skill,
    id: skill.value,
    component: (
      <div className="flex rounded-sm border-1 border-indigo-600 text-indigo-600 m-1 pl-1 shadow-md hover:cursor-grab hover:bg-indigo-100">
        {skill.label}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 self-center hover:cursor-pointer hover:font-bold hover:text-red-600"
          onClick={() => removeSkill(skill.value)}
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </div>
    ),
  });

  const handleSort = (list: SortableList) => {
    const updatedSkills: SkillsList = list.map(({ label, value }) => ({
      label,
      value,
    }));
    dispatch(setSkills(updatedSkills));
  };

  const ValueContainer = () => {
    return (
      <div className="flex flex-wrap w-9/10">
        <DndSort
          list={skills.map(formatSortList)}
          direction="horizontal"
          onSort={handleSort}
        ></DndSort>
      </div>
    );
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2>
          <b>Skills</b>
        </h2>
        {!lockEdit && (editAll || hover || open) ? (
          <Select
            isMulti
            isClearable={false}
            components={{ ValueContainer }}
            name="skills"
            isSearchable
            classNamePrefix="select"
            className="basic-single"
            placeholder="Technologies"
            defaultValue={skillsOptions[0]}
            options={skillsOptions}
            value={skills}
            onChange={onChange}
            onMenuOpen={() => setOpen(true)}
            onMenuClose={() => setOpen(false)}
          />
        ) : (
          <div>
            <p>{skills.map(({ label }) => label).join(", ")}</p>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Skills;
