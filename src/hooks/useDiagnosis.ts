import type {PhilosopherId, Answer, Choice} from "../types.ts";

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

type Action = { type: 'START' } | { type: 'ANSWER', choice: Choice } | { type: 'RESULT' }
