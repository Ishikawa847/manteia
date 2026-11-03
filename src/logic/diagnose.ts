import type {Answer, Philosopher, PhilosopherId, Question} from "../types.ts";
import {PHILOSOPHERS} from "../data/philosophers.ts";
import {QUESTIONS} from "../data/questions.ts";
import {normalizeCoordinate, normalizeScores, sumScores} from "./vector.ts";
import {nearestPhilosopher} from "./distance.ts";

// 回答 → 合計点 → 正規化 → 最近傍の哲学者
// 設問・哲学者は引数で差し替えられる（テストではダミーデータを渡す）
export const diagnose = (
    answers: readonly Answer[],
    questions: readonly Question[] = QUESTIONS,
    philosophers: readonly Philosopher[] = PHILOSOPHERS,
): PhilosopherId => {
    const target = normalizeScores(sumScores(answers), questions)
    const normalized = philosophers.map((philosopher) => (
        {...philosopher, coordinate: normalizeCoordinate(philosopher.coordinate)}
    ))
    return nearestPhilosopher(target, normalized)
}
