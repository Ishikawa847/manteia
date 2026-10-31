import {useDiagnosis} from "./hooks/useDiagnosis.ts";
import {QUESTIONS} from "./data/questions.ts";
import StartScreen from "./components/StartScreen.tsx";
import QuestionScreen from "./components/QuestionScreen.tsx";
import ResultScreen from "./components/ResultScreen.tsx";
import {PHILOSOPHERS} from "./data/philosophers.ts";

export default function App() {
  const [state, dispatch] = useDiagnosis()
  if (state.phase === "start") {
    return (
        <StartScreen onStart={() => dispatch({type: 'START'})} />
    )
  }
  if (state.phase === "answering") {
    return (
        <QuestionScreen question={QUESTIONS[state.currentIndex]} index={state.currentIndex} total={QUESTIONS.length} onAnswer={(choice) => dispatch({ type: "ANSWER", choice })}/>
    )
  }
  const philosopher = PHILOSOPHERS.find((p) => p.id === state.philosopherId)
  if (!philosopher) {
    return <p>結果が見つかりませんでした</p>
  }
  return (
      <ResultScreen philosopher={philosopher}/>
  )
}
