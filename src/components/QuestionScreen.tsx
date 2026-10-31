import type {Question, Choice} from "../types.ts";
import { Button, Typography, Stack } from '@mui/material'

type Props = {
    question: Question
    index: number
    total: number
    onAnswer: (choice: Choice) => void
}

export default function QuestionScreen({question, index, total, onAnswer}:Props) {
    return(
    <>
        <Typography variant="body1">{index + 1}問目/全{total}問</Typography>
        <Typography variant="h5">{question.text}</Typography>
        <Stack spacing={2}>
        {question.choices.map((choice) =>
            <Button variant="contained" key={choice.label} onClick={()=>onAnswer(choice)}>{choice.label}</Button>
        )}
        </Stack>
    </>
    )
}