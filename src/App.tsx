import {useDiagnosis} from "./hooks/useDiagnosis.ts";
import {QUESTIONS} from "./data/questions.ts";

export default function App() {
  const [state, dispatch] = useDiagnosis()
  if (state.phase === "start") {
    return (<>
          <p>start</p>
          <button onClick={() => dispatch({type: 'START'})}>はじめる</button>
        </>
    )
  }
  if (state.phase === "answering") {
    return (
        <>
        <p>answering</p>
        <p>{state.currentIndex + 1}問目</p>
        <button onClick={() => dispatch({type: "ANSWER", choice: QUESTIONS[state.currentIndex].choices[0]})}>次へ</button>
        </>
    )
  }
  return (<p>{state.philosopherId}</p>)
}
