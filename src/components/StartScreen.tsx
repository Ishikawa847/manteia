import { Button, Typography, Stack, Box } from '@mui/material'
import logoImage from '../assets/logo.png'

type Props = {
    onStart: () => void
}

export default function StartScreen({ onStart }:Props) {
    return (
        <Stack spacing={1} sx={{ alignItems: "center", textAlign: 'center' }}>
            <Box
                component="img"
                src={logoImage}
                alt="manteia"
                sx={{ height: 300, width: 'auto', maxWidth: '100%' }}
            />
            <Typography variant="body1">いくつかの質問に答えると、あなたの考え方に一番近い古代ギリシャの哲学者がわかります。</Typography>
            <Button variant="contained" onClick={onStart}>はじめる</Button>
        </Stack>
    );
}
