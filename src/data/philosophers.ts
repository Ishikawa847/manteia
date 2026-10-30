import type { Philosopher } from '../types'

export const PHILOSOPHERS = [
    {
        id: "plato",
        name: "プラトン",
        school: "アカデメイア派",
        coordinate: {good: -2, knowledge: -3, society: 1, stance: -1},
        description: "イデアを善とするプラトン学派の祖",
    },
    {
        id: "epicurus",
        name: "エピクロス",
        school: "エピクロス派",
        coordinate: {good: 3, knowledge: 1, society: -3, stance: -1},
        description: "心の平穏を善とする学派の祖",
    }
] as const satisfies readonly Philosopher[]