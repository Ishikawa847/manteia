import {expect, test} from 'vitest'
import type {Answer, Coordinate, Philosopher, PhilosopherId, Question} from "../types.ts";
import {diagnose} from "./diagnose.ts";

// 実データに依存させず、ダミーの設問・哲学者でロジックだけを確認する

const philosopher = (id: PhilosopherId, coordinate: Partial<Coordinate>): Philosopher => ({
    id,
    name: id,
    coordinate: { good: 0, knowledge: 0, society: 0, stance: 0, ...coordinate },
    description: '',
})

const answersOf = (questions: readonly Question[], choiceIndexes: readonly number[]): Answer[] =>
    questions.map((question, i) => ({ questionId: question.id, choice: question.choices[choiceIndexes[i]] }))

const questions: Question[] = [
    {
        id: 1,
        text: 'good の設問',
        choices: [
            { label: '快楽', scores: { good: 1 } },
            { label: '禁欲', scores: { good: -1 } },
        ],
    },
    {
        id: 2,
        text: 'society の設問',
        choices: [
            { label: '参与', scores: { society: 1 } },
            { label: '隠遁', scores: { society: -1 } },
        ],
    },
]

const philosophers = [
    philosopher('epicurus', { good: 3, society: -3 }),
    philosopher('zeno', { good: -3, society: 3 }),
]

test('回答の座標にいちばん近い哲学者を返す', () => {
    expect(diagnose(answersOf(questions, [0, 1]), questions, philosophers)).toBe('epicurus')
    expect(diagnose(answersOf(questions, [1, 0]), questions, philosophers)).toBe('zeno')
})

test('配点の大きい軸だけが結果を支配しないよう、軸ごとに正規化してから比べる', () => {
    // society は ±10 点の設問なので、正規化しないと society の差だけで結果が決まってしまう
    const unevenQuestions: Question[] = [
        {
            id: 1,
            text: 'good の設問',
            choices: [
                { label: '快楽', scores: { good: 1 } },
                { label: '禁欲', scores: { good: -1 } },
            ],
        },
        {
            id: 2,
            text: 'society の設問（配点が大きい）',
            choices: [
                { label: '強く参与', scores: { society: 10 } },
                { label: '少し参与', scores: { society: 2 } },
                { label: '隠遁', scores: { society: -10 } },
            ],
        },
    ]
    const candidates = [
        philosopher('epicurus', { good: 3 }),
        philosopher('aristotle', { society: 3 }),
    ]
    // 正規化後のユーザー座標は good +1 / society +0.2 なので、good の極にいる epicurus が近い
    // （正規化しない場合は good 1 / society 2 となり、aristotle が選ばれる）
    expect(diagnose(answersOf(unevenQuestions, [0, 1]), unevenQuestions, candidates)).toBe('epicurus')
})
