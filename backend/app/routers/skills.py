from fastapi import APIRouter
from app.schema.skills import Skills

router = APIRouter()

options =  [
    {
      "label": "JavaScript",
      "value": "javascript",
      "alias": [
        "Javascript"
      ]
    },
    {
      "label": "TypeScript",
      "value": "typescript",
      "alias": [
        "Typescript"
      ]
    },
    {
      "label": "Python",
      "value": "python"
    },
    {
      "label": "Vue",
      "value": "vue",
      "alias": [
        "Vue.js"
      ]
    },
    {
      "label": "React",
      "value": "react",
      "alias": [
        "React.js"
      ]
    },
    {
      "label": "Django",
      "value": "django"
    },
    {
      "label": "Flask",
      "value": "flask"
    },
    {
      "label": "Cypress",
      "value": "cypress"
    },
    {
      "label": "Jest",
      "value": "jest"
    },
    {
      "label": "Chai",
      "value": "chai"
    },
    {
      "label": "Mocha",
      "value": "mocha"
    },
    {
      "label": "Selenium",
      "value": "selenium"
    },
    {
      "label": "ES6",
      "value": "es6"
    },
    {
      "label": "HTML",
      "value": "html"
    },
    {
      "label": "CSS",
      "value": "css"
    },
    {
      "label": "Bootstrap",
      "value": "bootstrap"
    },
    {
      "label": "Material UI",
      "value": "material_ui"
    },
    {
      "label": "Figma",
      "value": "figma"
    },
    {
      "label": "PO Editor",
      "value": "po_editor"
    },
    {
      "label": "Node",
      "value": "node",
      "alias": [
        "Node.js"
      ]
    },
    {
      "label": "NPM",
      "value": "npm"
    },
    {
      "label": "WebPack",
      "value": "webpack"
    },
    {
      "label": "ESBuild",
      "value": "esbuild"
    },
    {
      "label": "ElasticSearch",
      "value": "elasticsearch"
    },
    {
      "label": "Redux",
      "value": "redux"
    },
    {
      "label": "VueX",
      "value": "vuex"
    },
    {
      "label": "Git",
      "value": "git"
    },
    {
      "label": "REST",
      "value": "rest"
    },
    {
      "label": "API",
      "value": "api"
    },
    {
      "label": "SDK",
      "value": "sdk"
    },
    {
      "label": "UI/UX",
      "value": "ui/ux"
    },
    {
      "label": "Prototyping",
      "value": "prototyping"
    },
    {
      "label": "Microservices",
      "value": "microservices"
    },
    {
      "label": "Feature Flags",
      "value": "feature_flags"
    },
    {
      "label": "Vite",
      "value": "vite"
    },
    {
      "label": "Java",
      "value": "java"
    },
    {
      "label": "C++",
      "value": "cpp"
    },
    {
      "label": "C#",
      "value": "csharp"
    },
    {
      "label": "Angular",
      "value": "angular",
      "alias": [
        "Angular.js"
      ]
    },
    {
      "label": "Ruby on Rails",
      "value": "rails"
    },
    {
      "label": "Ruby",
      "value": "ruby"
    },
    {
      "label": "SQL",
      "value": "sql"
    },
    {
      "label": "PostgreSQL",
      "value": "postgresql"
    },
    {
      "label": "NoSQL",
      "value": "nosql"
    },
    {
      "label": "MongoDB",
      "value": "mongodb"
    },
    {
      "label": "Docker",
      "value": "docker"
    },
    {
      "label": "Kubernetes",
      "value": "kubernetes"
    },
    {
      "label": "AWS",
      "value": "aws"
    },
    {
      "label": "Azure",
      "value": "azure"
    },
    {
      "label": "Google Cloud",
      "value": "gcp"
    },
    {
      "label": "CI/CD",
      "value": "ci_cd"
    },
    {
      "label": "Agile Methodologies",
      "value": "agile"
    },
    {
      "label": "Scrum",
      "value": "scrum"
    },
    {
      "label": "DevOps",
      "value": "devops"
    },
    {
      "label": "Open Source",
      "value": "open_source"
    },
    {
      "label": "GraphQL",
      "value": "graphql"
    },
    {
      "label": "Machine Learning",
      "value": "machine_learning"
    },
    {
      "label": "Data Science",
      "value": "data_science"
    },
    {
      "label": "Cybersecurity",
      "value": "cybersecurity"
    },
    {
      "label": "Flutter",
      "value": "flutter"
    }
  ]


@router.get("/skills", response_model=Skills)
def get_skills_options():
    return Skills(options=options)

