import type {Answer, PhilosopherId} from "../types.ts";
import {PHILOSOPHERS} from "../data/philosophers.ts";
import {QUESTIONS} from "../data/questions.ts";
import {normalizeCoordinate, normalizeScores, sumScores} from "./vector.ts";
import {nearestPhilosopher} from "./distance.ts";

// 回答 → 合計点 → 正規化 → 最近傍の哲学者
export const diagnose = (answers: readonly Answer[]): PhilosopherId => {
    const target = normalizeScores(sumScores(answers), QUESTIONS)
    const philosophers = PHILOSOPHERS.map((philosopher) => (
        {...philosopher, coordinate: normalizeCoordinate(philosopher.coordinate)}
    ))
    return nearestPhilosopher(target, philosophers)
}
