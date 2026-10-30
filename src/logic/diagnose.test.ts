import {expect, test} from 'vitest'
import type {Answer} from "../types.ts";
import {QUESTIONS} from "../data/questions.ts";
import {diagnose} from "./diagnose.ts";

// 実データで回答から結果までが通しで動くことを確認する
const answersOf = (choiceIndexes: readonly number[]): Answer[] =>
    QUESTIONS.map((question, i) => ({ questionId: question.id, choice: question.choices[choiceIndexes[i]] }))

test('快楽寄り・隠遁寄りに答えるとエピクロス', () => {
    expect(diagnose(answersOf([0, 1]))).toBe('epicurus')
})

test('禁欲寄り・参与寄りに答えるとプラトン', () => {
    expect(diagnose(answersOf([1, 0]))).toBe('plato')
})
