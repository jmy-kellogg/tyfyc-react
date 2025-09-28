import React, { useState, useEffect } from "react";
import { getSkills, createSkill, getSkillOptions } from "@/api/skills";
import type { SkillOption, Skill } from "@/types";

interface SkillsSectionProps {
  posting: string;
}

const SkillSection: React.FC<SkillsSectionProps> = ({ posting }) => {
  const [postingSkills, setPostingSkills] = useState<SkillOption[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const addSkillToProfile = async (skill: SkillOption): Promise<void> => {
    await createSkill({
      skillOptionsId: skill.id,
      category: "",
    });
    setSkills([...skills, skill.id]);
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const dbSkills: Skill[] = await getSkills();
      setSkills(dbSkills.map(({ skillOptionsId }) => skillOptionsId));
    };
    fetchData();
  }, []);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const dbSkillOptions: SkillOption[] = await getSkillOptions();
      const postingSkills: SkillOption[] = dbSkillOptions.filter((skill: SkillOption): boolean => {
        // ToDo: properly handle irregular regex characters
        if (skill.name.includes("+")) {
          return false;
        }
        return `/${posting}/i`.match(skill.name) !== null;
      });

      setPostingSkills(postingSkills);
    };
    fetchData();
  }, [posting]);

  return (
    <>
      <h2 className="block text-sm/6 font-medium">Skills:</h2>
      {postingSkills.map((skill: SkillOption) => (
        <button
          className={`rounded-sm border-1 border-indigo-600 text-indigo-600 m-1 px-2 shadow-md ${skills.includes(skill.id) ? "bg-yellow-100" : "hover:bg-indigo-100"}`}
          key={skill.id}
          disabled={skills.includes(skill.id)}
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
            e.stopPropagation();
            addSkillToProfile(skill);
          }}
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
    </>
  );
};

export default SkillSection;
