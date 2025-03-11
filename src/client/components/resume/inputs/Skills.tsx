import Select, { ActionMeta, MultiValue } from "react-select";
import { useSelector, useDispatch } from "react-redux";

import DndSort from "../sortable/DndSort";
import { skillsOptions } from "@options";

import { setSkills } from "@/reducers/skillsSlice";
import type { State } from "@store";
import type { Skill, SkillsList, SortableItem, SortableList } from "@types";

function Skills() {
  const skills: SkillsList = useSelector((state: State) => state.skills);
  const dispatch = useDispatch();

  const onChange = (
    newValue: MultiValue<Skill>,
    actionMeta: ActionMeta<Skill>
  ) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "remove-value"
    ) {
      const updatedSkills: SkillsList = [...newValue];
      dispatch(setSkills(updatedSkills));
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
      <div className="col-span-full">
        <h2>
          <b>Skills</b>
        </h2>
        <label className="block text-sm/6 font-medium">Technologies</label>
        <Select
          isMulti
          isClearable={false}
          components={{ ValueContainer }}
          name="skills"
          isSearchable
          classNamePrefix="select"
          className="basic-single"
          defaultValue={skillsOptions[0]}
          options={skillsOptions}
          value={skills}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default Skills;
