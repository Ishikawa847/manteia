import type {Philosopher} from "../types.ts";
import { Typography, Stack } from '@mui/material'

type Props = {
    philosopher: Philosopher
}
export default function ResultScreen({ philosopher }: Props){
    return(
        <Stack spacing={1} sx={{alignItems: "center", textAlign: 'center'}}>
        <Typography variant="h4">{philosopher.name}</Typography>
        {philosopher.school && <Typography variant="subtitle1">{philosopher.school}</Typography> }
        <Typography variant="body1">{philosopher.description}</Typography>
        </Stack>
    )
}
