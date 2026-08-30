import type {PhilosopherId, Answer, Choice} from "../types.ts";
import {PHILOSOPHERS} from "../data/philosophers.ts";
import {nearestPhilosopher} from "../logic/distance.ts";

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

const initialState :DiagnosisStatus = { phase: 'start' }
function reducer(state: DiagnosisStatus, action: Action): DiagnosisStatus {
    switch (action.type) {
        case 'START':
            return { phase: "answering", currentIndex: 0, answers: [] }
        case 'ANSWER':
            if (state.phase === "answering") {
                return {phase: "answering", currentIndex: state.currentIndex+1, answers: [...state.answers, {questionId: state.currentIndex+1, choice: action.choice}]}
            }
        case 'RESULT':
            return {phase: "result", philosopherId: nearestPhilosopher(target: target, philosphers: philosphers)};
    }
}