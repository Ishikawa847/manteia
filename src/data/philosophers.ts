import type { Philosopher } from '../types'
import socratesImage from '../assets/socrates.png'
import platoImage from '../assets/plato.png'
import aristotleImage from '../assets/aristotle.png'
import epicurusImage from '../assets/epicurus.png'
import diogenesImage from '../assets/diogenes.png'
import zenoImage from '../assets/zeno.png'

export const PHILOSOPHERS = [
    {
        id: "socrates",
        name: "ソクラテス",
        coordinate: {good: -1, knowledge: 0, society: 1, stance: 3},
        description: "無知の知を自覚し、問答によって吟味し続けた哲学者",
        image: socratesImage,
        quote: "単に生きることではなく、善く生きることが大切である",
    },
    {
        id: "plato",
        name: "プラトン",
        school: "アカデメイア派",
        coordinate: {good: -2, knowledge: -3, society: 1, stance: -1},
        description: "イデアを善とするプラトン学派の祖",
        image: platoImage,
        quote: "自分自身に打ち勝つことは、最高で、最も崇高な勝利である",
    },
    {
        id: "aristotle",
        name: "アリストテレス",
        school: "逍遙学派",
        coordinate: {good: 0, knowledge: 3, society: 3, stance: -1},
        description: "観察と経験をもとに学問を体系化した逍遙学派の祖",
        image: aristotleImage,
        quote: "プラトンは私の友である。しかし、彼よりも真実を私は友とする",
    },
    {
        id: "diogenes",
        name: "ディオゲネス",
        school: "キュニコス派",
        coordinate: {good: -3, knowledge: 1, society: -2, stance: 2},
        description: "慣習を捨て、自然に従う簡素な生き方を実践したキュニコス派の哲学者",
        image: diogenesImage,
        quote: "そこに立たれると日が当たらないから、どいてくれ",
    },
    {
        id: "epicurus",
        name: "エピクロス",
        school: "エピクロス派",
        coordinate: {good: 3, knowledge: 1, society: -3, stance: -1},
        description: "心の平穏を善とする学派の祖",
        image: epicurusImage,
        quote: "私にパンと水さえあれば、ゼウスと幸福を競うことができる",
    },
    {
        id: "zeno",
        name: "ゼノン（キティオン）",
        school: "ストア派",
        coordinate: {good: -2, knowledge: 0, society: 2, stance: -3},
        description: "理性に従って生きることを善とするストア派の祖",
        image: zenoImage,
        quote: "自然（理性）に従って生きよ",
    },
] as const satisfies readonly Philosopher[]
