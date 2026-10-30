import {describe, expect, test} from 'vitest'
import type {Answer, Question} from "../types.ts";
import {normalizeCoordinate, normalizeScores, scoreRange, sumScores} from "./vector.ts";

// 軸ごとの幅が違う設問セット（good: 2問で ±3、society: 1問で ±1、knowledge/stance: 設問なし）
const questions: readonly Question[] = [
    {
        id: 1,
        text: 'q1',
        choices: [
            { label: 'a', scores: { good: 2, society: 1 } },
            { label: 'b', scores: { good: -1 } },
            { label: 'c', scores: { society: -1 } },
        ],
    },
    {
        id: 2,
        text: 'q2',
        choices: [
            { label: 'a', scores: { good: 1 } },
            { label: 'b', scores: { good: -2 } },
        ],
    },
]

const answer = (questionId: number, choiceIndex: number): Answer => ({
    questionId,
    choice: questions[questionId - 1].choices[choiceIndex],
})

describe('sumScores', () => {
    test('回答の点数を軸ごとに合計する', () => {
        expect(sumScores([answer(1, 0), answer(2, 1)]))
            .toEqual({ good: 0, knowledge: 0, society: 1, stance: 0 })
    })

    test('回答がなければすべて 0', () => {
        expect(sumScores([])).toEqual({ good: 0, knowledge: 0, society: 0, stance: 0 })
    })
})

describe('scoreRange', () => {
    test('設問ごとの選択肢の最小・最大を軸ごとに合計する', () => {
        expect(scoreRange(questions)).toEqual({
            min: { good: -3, knowledge: 0, society: -1, stance: 0 },
            max: { good: 3, knowledge: 0, society: 1, stance: 0 },
        })
    })
})

describe('normalizeScores', () => {
    test('最大点は +1、最小点は -1 になる', () => {
        expect(normalizeScores({ good: 3, knowledge: 0, society: 1, stance: 0 }, questions))
            .toEqual({ good: 1, knowledge: 0, society: 1, stance: 0 })
        expect(normalizeScores({ good: -3, knowledge: 0, society: -1, stance: 0 }, questions))
            .toEqual({ good: -1, knowledge: 0, society: -1, stance: 0 })
    })

    test('幅の違う軸も同じスケールにそろう', () => {
        const result = normalizeScores({ good: 1.5, knowledge: 0, society: 0.5, stance: 0 }, questions)
        expect(result.good).toBeCloseTo(0.5)
        expect(result.society).toBeCloseTo(0.5)
    })

    test('設問のない軸は NaN にならず 0', () => {
        const result = normalizeScores({ good: 0, knowledge: 0, society: 0, stance: 0 }, questions)
        expect(result.knowledge).toBe(0)
        expect(result.stance).toBe(0)
    })
})

describe('normalizeCoordinate', () => {
    test('-3 〜 +3 を -1 〜 +1 に写す', () => {
        expect(normalizeCoordinate({ good: 3, knowledge: -3, society: 0, stance: 1.5 }))
            .toEqual({ good: 1, knowledge: -1, society: 0, stance: 0.5 })
    })
})
