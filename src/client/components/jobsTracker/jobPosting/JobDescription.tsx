import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePunctuation } from "../../../../utils";
import { skillsOptions } from "../../../../utils/options";
import { setSkills } from "../../../store/reducers/skillsSlice";
import type { Skill, SkillsList } from "../../../../types";
import type { State } from "../../../store";
interface Props {
  description: string | null;
}

function JobDescription({ description }: Props) {
  const [popover, setPopover] = useState<number | null>(null);
  const skills: SkillsList = useSelector((state: State) => state.skills);
  const dispatch = useDispatch();

  const skillsAliases = skillsOptions.reduce(
    (acc: Array<string>, curr: Skill) => {
      let newList: Array<string> = [...acc, curr.label];
      if (curr.alias) {
        newList = [...newList, ...curr.alias];
      }
      return newList;
    },
    []
  );

  const addSkill = (skill: string) => {
    const skillOption = skillsOptions.find(
      (opt) => opt.label === skill || opt.alias?.includes(skill)
    );
    if (
      skillOption &&
      !skills.map(({ value }) => value).includes(skillOption.value)
    ) {
      dispatch(setSkills([...skills, skillOption]));
    }
  };

  return (
    <p className="whitespace-pre-wrap">
      {description?.split(" ").map((str, i) => {
        const word = removePunctuation(str);
        if (skillsAliases.includes(word)) {
          return (
            <span key={i}>
              <button
                className="bg-amber-100 hover:cursor-pointer"
                onMouseEnter={() => setPopover(i)}
                onMouseLeave={() => setPopover(null)}
                onClick={() => addSkill(word)}
              >
                {word}
                {popover === i && (
                  <div className="w-32 bg-white border-1 rounded-md absolute p-1">
                    <b>Add to resume</b>
                    <ul>
                      {skills.map(({ label, value }) => (
                        <li key={value}>{label}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>{" "}
            </span>
          );
        } else {
          return `${str} `;
        }
      })}
    </p>
  );
}

export default JobDescription;
