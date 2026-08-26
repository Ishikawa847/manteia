import type {PhilosopherId, Answer} from "../types.ts";

export type DiagnosisStatus = Start | Answering | Result;
type Start  = {
    phase: "start";
};
type Answering  = {
    phase: "answering";
    currentIndex: number;
    answers: readonly Answer[];
};
type Result  = {
    phase: "result";
    philosopherId: PhilosopherId;
};
