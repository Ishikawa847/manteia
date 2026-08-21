import type { Axis } from '../types'

export const AXES = [
    {
        id: 'good',
        name: '善の所在',
        negative: '禁欲・徳',
        positive: '快楽・平静',
    },
    {
        id: 'knowledge',
        name: '知の源泉',
        negative: '観想・理論',
        positive: '経験・実践',
    },
    {
        id: 'society',
        name: '社会との距離',
        negative: '隠遁・自足',
        positive: '参与・義務',
    },
    {
        id: 'stance',
        name: '世界への構え',
        negative: '秩序への信頼',
        positive: '懐疑・吟味',
    },
] as const satisfies readonly Axis[]