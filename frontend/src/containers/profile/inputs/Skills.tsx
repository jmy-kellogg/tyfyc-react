import { useState, useCallback, useEffect } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

import DndSort from "@/components/Sortable/DndSort";
import Divider from "src/components/Divider";

import {
  getSkills,
  addSkill,
  deleteSkill,
  getSkillOptions,
} from "@/api/skills";
import type { SortableList } from "@/types";
import type { Skill } from "@/types/skills";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

// ToDo: update the skill mapping
interface SkillSelect {
  label: string;
  value: string;
  id: string;
}

function Skills({ editAll, lockEdit }: Props) {
  const [skills, setSkills] = useState<SkillSelect[]>([]);
  const [skillOptions, setSkillOptions] = useState<SkillSelect[]>([]);
  const [hover, setHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

  const onChange = async (
    _newValue: MultiValue<SkillSelect>,
    actionMeta: ActionMeta<SkillSelect>
  ) => {
    try {
      if (actionMeta.action === "select-option" && actionMeta?.option?.value) {
        const skill: Skill | undefined = await addSkill({
          skillOptionsId: actionMeta.option.value,
          category: "",
        });

        if (skill) {
          setSkills([
            ...skills,
            { label: skill.name, value: skill.skillOptionsId, id: skill.id },
          ]);
        }
        setHover(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeSkill = async (id: string) => {
    if (!id) return;

    const updatedSkills: SkillSelect[] = skills.filter(
      (skill) => skill.id !== id
    );

    try {
      await deleteSkill(id);
      setSkills(updatedSkills);
    } catch (err) {
      console.error(err);
    }
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

  useEffect(() => {
    fetchSkillOptions();
  }, [fetchSkillOptions]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

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
            options={skillOptions}
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
