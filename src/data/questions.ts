import type { Question } from '../types'

export const QUESTIONS = [
    {
        id: 1,
        text: '欲望を満たすことと、欲望を律することの、どちらがより良い生き方だと思う？',
        choices: [
            { label: '欲望を満たし、快く生きること', scores: { good: 1 } },
            { label: '欲望を律し、慎ましく生きること', scores: { good: -1 } },
        ],
    },
    {
        id: 2,
        text: '政治に参加するのは重要だと思う？',
        choices: [
            { label: '重要であると思う', scores: { society: 1 } },
            { label: '重要とはあまり思わない', scores: { society: -1 } },
        ]
    }
] as const satisfies readonly Question[]