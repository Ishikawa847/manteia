import type {Philosopher} from "../types.ts";
import { Typography, Stack, Box } from '@mui/material'

type Props = {
    philosopher: Philosopher
}
export default function ResultScreen({ philosopher }: Props){
    return(
        <Stack spacing={1} sx={{ alignItems: "center", textAlign: 'center' }}>
            <Box
                component="img"
                src={philosopher.image}
                alt={philosopher.name}
                sx={{ height: 300, width: 'auto', maxWidth: '100%' }}
            />
            <Typography variant="h4">{philosopher.name}</Typography>
            {philosopher.school && <Typography variant="subtitle1">{philosopher.school}</Typography> }
            <Typography variant="body1">{philosopher.description}</Typography>
        </Stack>
    )
}
