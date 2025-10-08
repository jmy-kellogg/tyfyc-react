const Changelog = require("generate-changelog");
const Fs = require("fs");

/*
  Commits message format is: "type(category): description [flags]"
  - Where 'type' is one of the following:
    - breaking
    - build
    - ci
    - chore
    - docs
    - feat
    - fix
    - other
    - perf
    - refactor
    - revert
    - style
    - test
  - Where 'flags' is an optional comma-separated list of one or more of the following (must be surrounded in square brackets)
  - And category can be anything of your choice. If you use a type not found in the list (but it still follows the same 
    format of the message), it'll be grouped under other
*/

// Get version type from command line args (patch, minor, major)
const versionType = process.argv[2] || "patch";

const options = {
  patch: versionType === "patch",
  minor: versionType === "minor",
  major: versionType === "major",
};

Changelog.generate(options)
  .then(function (changelog) {
    Fs.writeFileSync("../CHANGELOG.md", changelog);
    console.log("CHANGELOG.md generated successfully!");
  })
  .catch(function (error) {
    console.error("Error generating changelog:", error);
    process.exit(1);
  });
