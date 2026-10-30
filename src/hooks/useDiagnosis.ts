import {useReducer} from "react";
import type {PhilosopherId, Answer, Choice} from "../types.ts";
import {QUESTIONS} from "../data/questions.ts";
import {diagnose} from "../logic/diagnose.ts";

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

type Action = { type: 'START' } | { type: 'ANSWER', choice: Choice }

const initialState :DiagnosisStatus = { phase: 'start' }
function reducer(state: DiagnosisStatus, action: Action): DiagnosisStatus {
    switch (action.type) {
        case 'START':
            return { phase: "answering", currentIndex: 0, answers: [] }
        case 'ANSWER': {
            if (state.phase !== "answering") {
                return state
            }
            const answers = [...state.answers, {questionId: state.currentIndex+1, choice: action.choice}]
            // 最後の設問に答えたら結果へ
            if (answers.length === QUESTIONS.length) {
                return {phase: "result", philosopherId: diagnose(answers)}
            }
            return {phase: "answering", currentIndex: state.currentIndex+1, answers}
        }
    }
}

export const useDiagnosis = () => useReducer(reducer, initialState)
