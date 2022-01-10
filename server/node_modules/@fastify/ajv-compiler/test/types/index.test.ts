import { expectType } from "tsd";
import ValidatorSelector, { ValidatorCompiler } from "../..";

const compiler = ValidatorSelector();

expectType<ValidatorCompiler>(compiler);
