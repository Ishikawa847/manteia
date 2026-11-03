import type { Question } from '../types'

export const QUESTIONS = [
    {
        id: 1,
        text: '人生でいちばん大切にしたいものは？',
        choices: [
            { label: '心穏やかに、楽しく過ごすこと', scores: { good: 2 } },
            { label: '正しく、恥じない生き方をすること', scores: { good: -1, society: 1 } },
            { label: '欲を減らし、何にも縛られずにいること', scores: { good: -2, society: -1 } },
        ],
    },
    {
        id: 2,
        text: 'ぜいたくな食事や持ち物について、近い考えは？',
        choices: [
            { label: '楽しめるときは素直に楽しめばいい', scores: { good: 2 } },
            { label: '質素でも、親しい人と穏やかに過ごせれば満足', scores: { good: 1, society: -1 } },
            { label: '欲に流されないよう、意識して控える', scores: { good: -1 } },
            { label: 'なくても生きていける。むしろ人をだめにする', scores: { good: -2 } },
        ],
    },
    {
        id: 3,
        text: '新しいことを学ぶとき、どう進める？',
        choices: [
            { label: 'まず原理や理屈を理解してから', scores: { knowledge: -2 } },
            { label: 'たくさんの例を観察・比較して、法則を見つける', scores: { knowledge: 2 } },
            { label: '実際にやってみて、体で覚える', scores: { knowledge: 1 } },
            { label: '人と議論しながら考えを固める', scores: { stance: 1 } },
        ],
    },
    {
        id: 4,
        text: '本当に確かなものは、どこにあると思う？',
        choices: [
            { label: '目に見えない理想や本質の中', scores: { knowledge: -2 } },
            { label: '自分の目で見て確かめたものの中', scores: { knowledge: 2 } },
            { label: '世界全体を貫く理屈や法則の中', scores: { knowledge: -1, stance: -1 } },
            { label: '確かなものはない。だから問い続ける', scores: { stance: 2 } },
        ],
    },
    {
        id: 5,
        text: '社会や政治との関わり方で、近いものは？',
        choices: [
            { label: '積極的に関わり、より良い社会をつくる責任がある', scores: { society: 2 } },
            { label: '自分の役割として、求められたら果たす', scores: { society: 1, stance: -1 } },
            { label: '表に出ず、親しい人との時間を大切にしたい', scores: { society: -2, good: 1 } },
            { label: '世間のしきたりには縛られたくない', scores: { society: -2, stance: 1 } },
        ],
    },
    {
        id: 6,
        text: '友人や仲間について、近い考えは？',
        choices: [
            { label: '共同体の中で支え合ってこそ人間らしい', scores: { society: 2 } },
            { label: '気の合う少数の友人がいれば十分', scores: { society: -1, good: 1 } },
            { label: '人に頼らず、ひとりで満ち足りていたい', scores: { society: -2, good: -1 } },
        ],
    },
    {
        id: 7,
        text: '思いどおりにいかない出来事が起きたら？',
        choices: [
            { label: 'すべてには理由がある。大きな流れとして受け入れる', scores: { stance: -2 } },
            { label: '受け入れつつ、自分にできることに集中する', scores: { stance: -1, good: -1 } },
            { label: 'なぜ起きたのか、納得いくまで考える', scores: { stance: 2 } },
        ],
    },
    {
        id: 8,
        text: '人から「それが常識だ」と言われたら？',
        choices: [
            { label: '本当にそうか、相手と一緒に確かめたくなる', scores: { stance: 2, society: 1 } },
            { label: '常識なんて気にせず、自分のやり方を通す', scores: { stance: 1, society: -1 } },
            { label: '筋が通っていれば受け入れる', scores: { stance: -1, knowledge: -1 } },
            { label: '長く続いてきたものには理由があると考えて従う', scores: { stance: -1 } },
        ],
    },
] as const satisfies readonly Question[]
