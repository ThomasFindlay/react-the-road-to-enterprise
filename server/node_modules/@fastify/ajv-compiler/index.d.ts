import { Ajv, Options } from "ajv";

export type ValidatorCompiler = (
  externalSchemas: unknown,
  options: Options,
  cache: Options["cache"]
) => Ajv;

export declare function ValidatorSelector(): ValidatorCompiler;

export type { Ajv, Options } from "ajv";

export default ValidatorSelector;
