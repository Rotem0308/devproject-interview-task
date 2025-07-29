import dotenv from "dotenv";

dotenv.config();

interface EnvSettings {
  PORT: number;
  ALLOWED_CORS_ORIGIN: string;
}

const validateEnvVariableExist = (
  name: keyof EnvSettings,
  fallback?: string
): string => {
  const envVariable = process.env[name];
  if (!envVariable) {
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing env variable ${name}`);
  }
  return envVariable;
};

const envConfig: EnvSettings = {
  PORT: Number(validateEnvVariableExist("PORT", "8080")),
  ALLOWED_CORS_ORIGIN: validateEnvVariableExist(
    "ALLOWED_CORS_ORIGIN",
    "http://localhost:3000"
  ),
};

export default envConfig;
