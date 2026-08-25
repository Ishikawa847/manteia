import type {PhilosopherId} from "../types.ts";

export type DiagnosisStatus = Start | Answering | Result;
type Start  = {
    phase: "start";
};
type Answering  = {
    phase: "answering";
};
type Result  = {
    phase: "result";
    philosopher_id: PhilosopherId;
};
