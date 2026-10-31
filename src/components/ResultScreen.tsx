import type {Philosopher} from "../types.ts";
import { Typography } from '@mui/material'

type Props = {
    philosopher: Philosopher
}
export default function ResultScreen({ philosopher }: Props){
    return(
        <>
        <Typography variant="h4">{philosopher.name}</Typography>
        {philosopher.school && <Typography variant="subtitle1">{philosopher.school}</Typography> }
        <Typography variant="body1">{philosopher.description}</Typography>
        </>
    )
}