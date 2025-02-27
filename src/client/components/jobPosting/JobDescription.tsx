import { skillsOptions } from "../../../utils/options";
import type { Skill } from "../../../types";

interface Props {
  description: string | null;
}

function JobDescription({ description }: Props) {
  const skills = skillsOptions.reduce((acc: Array<string>, curr: Skill) => {
    let newList: Array<string> = [...acc, curr.label];
    if (curr.alias) {
      newList = [...newList, ...curr.alias];
    }
    return newList;
  }, []);

  return (
    <p className="whitespace-pre-wrap">
      {description?.split(" ").map((word, i) => {
        if (skills.includes(word.replace(/[.,!?;:]$/g, ""))) {
          return (
            <span key={i}>
              <button className="bg-amber-100 hover:cursor-pointer">
                {word}
              </button>{" "}
            </span>
          );
        } else {
          return `${word} `;
        }
      })}
    </p>
  );
}

export default JobDescription;
