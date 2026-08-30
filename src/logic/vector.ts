import {AXIS_IDS, type Answer} from "../types.ts";

export const sumScores = (answers: readonly Answer[]) => {
    let result = { good: 0, knowledge: 0, society: 0, stance: 0}
    answers.forEach( (answer) =>
        AXIS_IDS.forEach((axis) => result[axis] += answer.choice.scores[axis] ?? 0)
    )
    return result
}

export const normalize()