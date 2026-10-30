import {AXIS_IDS, type Answer, type Coordinate, type Question} from "../types.ts";

// 哲学者座標の値域（-3 〜 +3）
const PHILOSOPHER_SCALE = 3

export const sumScores = (answers: readonly Answer[]) => {
    let result = { good: 0, knowledge: 0, society: 0, stance: 0}
    answers.forEach( (answer) =>
        AXIS_IDS.forEach((axis) => result[axis] += answer.choice.scores[axis] ?? 0)
    )
    return result
}

// 設問ごとに選択肢の最小・最大を取り、軸ごとに合計点がとりうる幅を求める
export const scoreRange = (questions: readonly Question[]) => {
    let min = { good: 0, knowledge: 0, society: 0, stance: 0}
    let max = { good: 0, knowledge: 0, society: 0, stance: 0}
    questions.forEach((question) =>
        AXIS_IDS.forEach((axis) => {
            const scores = question.choices.map((choice) => choice.scores[axis] ?? 0)
            min[axis] += Math.min(...scores)
            max[axis] += Math.max(...scores)
        })
    )
    return { min, max }
}

// ユーザーの合計点を軸ごとに -1 〜 +1 へ写す（Min-Max 正規化を -1 〜 +1 に拡張）
export const normalizeScores = (scores: Coordinate, questions: readonly Question[]): Coordinate => {
    const { min, max } = scoreRange(questions)
    let result = { good: 0, knowledge: 0, society: 0, stance: 0}
    AXIS_IDS.forEach((axis) => {
        const width = max[axis] - min[axis]
        // 設問のない軸は幅 0 になるので中央扱い（0 除算で NaN になるのを防ぐ）
        result[axis] = width === 0 ? 0 : ((scores[axis] - min[axis]) / width) * 2 - 1
    })
    return result
}

// 哲学者座標（-3 〜 +3）を -1 〜 +1 へ写す
export const normalizeCoordinate = (coordinate: Coordinate): Coordinate => {
    let result = { good: 0, knowledge: 0, society: 0, stance: 0}
    AXIS_IDS.forEach((axis) => result[axis] = coordinate[axis] / PHILOSOPHER_SCALE)
    return result
}