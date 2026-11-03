import {describe, expect, test} from 'vitest'
import {AXIS_IDS, type Answer, type PhilosopherId} from "../types.ts";
import {QUESTIONS} from "./questions.ts";
import {PHILOSOPHERS} from "./philosophers.ts";
import {diagnose} from "../logic/diagnose.ts";

// 設問データが REQUIREMENTS.md 4章のルールを満たしているかを確認する。
// 問題数や回答パターンは書かず、ルールだけを確かめる（設問を増減しても壊れないように）

// 全回答パターンを列挙する（問題数に対して指数的に増えるので、遅くなったらサンプリングに切り替える）
const allAnswerPatterns = function* (index = 0, acc: Answer[] = []): Generator<Answer[]> {
    if (index === QUESTIONS.length) {
        yield acc
        return
    }
    const question = QUESTIONS[index]
    for (const choice of question.choices) {
        yield* allAnswerPatterns(index + 1, [...acc, { questionId: question.id, choice }])
    }
}

describe('設問データ', () => {
    test.each(AXIS_IDS)('軸 %s に関わる設問が2問以上ある', (axis) => {
        const count = QUESTIONS.filter((question) =>
            question.choices.some((choice) => ((choice.scores as Partial<Record<string, number>>)[axis] ?? 0) !== 0)
        ).length
        expect(count).toBeGreaterThanOrEqual(2)
    })

    test('すべての設問が3〜4択になっている', () => {
        QUESTIONS.forEach((question) => {
            expect(question.choices.length).toBeGreaterThanOrEqual(3)
            expect(question.choices.length).toBeLessThanOrEqual(4)
        })
    })

    test('すべての哲学者が、いずれかの回答パターンで診断結果になる', () => {
        const reached = new Set<PhilosopherId>()
        for (const answers of allAnswerPatterns()) {
            reached.add(diagnose(answers))
            if (reached.size === PHILOSOPHERS.length) break
        }
        expect([...reached].sort()).toEqual(PHILOSOPHERS.map((p) => p.id).sort())
    })
})
