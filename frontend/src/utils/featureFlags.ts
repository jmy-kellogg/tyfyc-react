// legacy
type FeatureFlagNames = "OPENAI_FEATURE_FLAG" | "FULL_EXPORT_FEATURE";

const getFlag = (flagName: FeatureFlagNames): boolean => {
  if (process.env[flagName] === "true") {
    return true;
  } else if (process.env[flagName] === "false") {
    return false;
  }
  return false;
};

export default getFlag;
