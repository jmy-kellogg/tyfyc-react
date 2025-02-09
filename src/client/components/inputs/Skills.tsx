import Select, { ActionMeta } from "react-select";
import { useSelector, useDispatch } from "react-redux";

import { updateSkills } from "../../store/reducers/skillsSlice";

import type { State, Skill, SkillsList } from "../../types";

const options: SkillsList = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Vue.js", value: "vue" },
  { label: "React", value: "react" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Cypress", value: "cypress" },
  { label: "Jest", value: "jest" },
  { label: "Chai", value: "chai" },
  { label: "Mocha", value: "mocha" },
  { label: "Selenium", value: "selenium" },
  { label: "ES6", value: "es6" },
  { label: "HTML", value: "html" },
  { label: "CSS / Sass", value: "css_sass" },
  { label: "Bootstrap", value: "bootstrap" },
  { label: "Material UI", value: "material_ui" },
  { label: "Figma", value: "figma" },
  { label: "PO Editor", value: "po_editor" },
  { label: "Node.js", value: "node" },
  { label: "NPM", value: "npm" },
  { label: "WebPack", value: "webpack" },
  { label: "ESBuild", value: "esbuild" },
  { label: "ElasticSearch", value: "elasticsearch" },
  { label: "Redux", value: "redux" },
  { label: "VueX", value: "vuex" },
  { label: "Git", value: "git" },
  { label: "REST", value: "rest" },
  { label: "API", value: "api" },
  { label: "SDK", value: "sdk" },
  { label: "UI / UX", value: "ui_ux" },
  { label: "Prototyping", value: "prototyping" },
  { label: "Microservices", value: "microservices" },
  { label: "Feature Flags", value: "feature_flags" },
  { label: "Vite", value: "vite" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Angular", value: "angular" },
  { label: "Ruby on Rails", value: "rails" },
  { label: "SQL", value: "sql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "NoSQL", value: "nosql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Google Cloud", value: "gcp" },
  { label: "CI/CD", value: "ci_cd" },
  { label: "Agile Methodologies", value: "agile" },
  { label: "Scrum", value: "scrum" },
  { label: "DevOps", value: "devops" },
  { label: "Open Source", value: "open_source" },
  { label: "GraphQL", value: "graphql" },
  { label: "Machine Learning", value: "machine_learning" },
  { label: "Data Science", value: "data_science" },
  { label: "Cybersecurity", value: "cybersecurity" },
];

function Skills() {
  const skills: SkillsList = useSelector((state: State) => state.skills.list);
  const dispatch = useDispatch();

  const onChange = (newValue: SkillsList, actionMeta: ActionMeta<Skill>) => {
    if (
      actionMeta.action == "select-option" ||
      actionMeta.action == "remove-value"
    ) {
      dispatch(updateSkills(newValue));
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
          defaultValue={options[0]}
          options={options}
          value={skills}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default Skills;
