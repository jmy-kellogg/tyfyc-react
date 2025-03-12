import "./ResumeDoc.css";

import Title from "./inputs/Title";
import Contact from "./inputs/Contact";
import Summary from "./inputs/Summary";
import Skills from "./inputs/Skills";
import JobsHistory from "./inputs/JobsHistory";
import Education from "./inputs/Education";
import Projects from "./inputs/Projects";

function Profile() {
  return (
    <>
      <div id="resume-content">
        <div className="personal-section">
          <Title />
          <Contact />
        </div>

        <div className="body-section">
          <Summary />
          <Skills />
          <JobsHistory />
          <Education />
          <Projects />
        </div>
      </div>
    </>
  );
}

export default Profile;
