import { useState, useCallback, useEffect } from "react";
import { getSkills, getSkillOptions } from "@/api/skills";
import Divider from "src/components/Divider";
import SkillsGroup from "./SkillGroup";
import type { SkillSelect, SkillGroup, Skill, SkillOption } from "@/types";

interface Props {
  lockEdit: boolean;
}

function Skills({ lockEdit }: Props) {
  const [allSkills, setAllSkills] = useState<SkillSelect[]>([]);
  const [skillOptions, setSkillOptions] = useState<SkillSelect[]>([]);
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  const skillGroups: SkillGroup["id"][] = [
    "frontend",
    "backend",
    "database",
    "general",
  ];

  const fetchSkillOptions = useCallback(async (): Promise<void> => {
    try {
      const dbSkillOptions: SkillOption[] = await getSkillOptions();
      setSkillOptions(
        dbSkillOptions.map(
          ({ id, name }): SkillSelect => ({
            label: name,
            value: id,
            id: "",
            category: "",
            rank: null,
          })
        )
      );
    } catch (err: unknown) {
      console.error("Failed to fetch skill options:", err);
    }
  }, []);

  const fetchSkills = useCallback(async (): Promise<void> => {
    try {
      const dbSkills: Skill[] = await getSkills();
      const formattedList: SkillSelect[] = dbSkills.map(
        ({ id, name, skillOptionsId, category, rank }): SkillSelect => ({
          label: name,
          value: skillOptionsId,
          id,
          category,
          rank,
        })
      );
      setAllSkills(formattedList);
    } catch (err: unknown) {
      console.error("Failed to fetch skills:", err);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
    fetchSkillOptions();
  }, [fetchSkills, fetchSkillOptions]);

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
            onClick={() => setToggleSort(false)}
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
            onClick={() => setToggleSort(true)}
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
      {skillGroups.map((group) => (
        <SkillsGroup
          key={group || "general"}
          lockEdit={lockEdit}
          toggleSort={toggleSort}
          allSkills={allSkills}
          setAllSkills={setAllSkills}
          skillOptions={skillOptions}
          groupId={group}
        />
      ))}

      <Divider />
    </>
  );
}

export default Skills;
