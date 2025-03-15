type FeatureFlagNames = "OPENAI_FEATURE_FLAG";

const getFlag = (flagName: FeatureFlagNames) => {
  if (process.env[flagName] === "true") {
    return true;
  } else if (process.env[flagName] === "false") {
    return false;
  }
};

export default getFlag;
