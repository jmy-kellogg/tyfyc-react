import Select, { ActionMeta, MultiValue } from "react-select";
import { useSelector, useDispatch } from "react-redux";

import { skillsOptions } from "../../../../utils/options";
import { setSkills } from "../../../store/reducers/skillsSlice";

import type { Skill, SkillsList } from "../../../../types";
import type { State } from "../../../store";

function Skills() {
  const skills: SkillsList = useSelector((state: State) => state.skills.list);
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

  return (
    <>
      <div className="col-span-full">
        <h2>
          <b>Skills</b>
        </h2>
        <label className="block text-sm/6 font-medium">Technologies</label>
        <Select
          isMulti
          isClearable
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
