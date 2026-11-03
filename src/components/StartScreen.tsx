import { Button, Typography, Stack } from '@mui/material'

type Props = {
    onStart: () => void
}

export default function StartScreen({ onStart }:Props) {
    return (
      <Stack spacing={1} sx={{alignItems: "center", textAlign: 'center'}}>
            <Typography variant="h3">manteia</Typography>
            <Typography variant="body1">いくつかの質問に答えると、あなたの考え方に一番近い古代ギリシャの哲学者がわかります。</Typography>
            <Button variant="contained" onClick={onStart}>はじめる</Button>
        </Stack>
    );
}
