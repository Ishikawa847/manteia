import {describe, expect, test} from 'vitest'
import type {Coordinate, Philosopher, PhilosopherId} from "../types.ts";
import {distance, nearestPhilosopher} from "./distance.ts";

const origin: Coordinate = { good: 0, knowledge: 0, society: 0, stance: 0 }

const philosopher = (id: PhilosopherId, coordinate: Coordinate): Philosopher => ({
    id,
    name: id,
    coordinate,
    description: '',
})

describe('distance', () => {
    test('同じ座標なら 0', () => {
        expect(distance(origin, origin)).toBe(0)
    })

    test('各軸の差の2乗を合計する', () => {
        expect(distance(origin, { good: 1, knowledge: 2, society: -2, stance: 0 })).toBe(9)
    })
})

describe('nearestPhilosopher', () => {
    test('最も近い哲学者を返す', () => {
        const philosophers = [
            philosopher('plato', { good: 3, knowledge: 3, society: 3, stance: 3 }),
            philosopher('epicurus', { good: 1, knowledge: 0, society: 0, stance: 0 }),
            philosopher('zeno', { good: -3, knowledge: 0, society: 0, stance: 0 }),
        ]
        expect(nearestPhilosopher(origin, philosophers)).toBe('epicurus')
    })

    test('同距離ならリスト定義順で先の哲学者を返す', () => {
        const philosophers = [
            philosopher('plato', { good: 1, knowledge: 0, society: 0, stance: 0 }),
            philosopher('epicurus', { good: -1, knowledge: 0, society: 0, stance: 0 }),
        ]
        expect(nearestPhilosopher(origin, philosophers)).toBe('plato')
    })
})
