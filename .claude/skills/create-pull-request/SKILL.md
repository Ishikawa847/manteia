---
name: create-pull-request
description: 変更をブランチに切ってコミットし、PRを作成する。「PR作成して」「コミットしてPR出して」「push & PR」等の依頼時に読み込む。
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git checkout:*), Bash(git switch:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*), Bash(npm run:*), Bash(npx tsc:*), Read
---

## Context

- git status: !`git status --short`
- 現在のブランチ: !`git branch --show-current`
- 直近のコミット: !`git log --oneline -3`

## 前提

- base ブランチは `main`
- Node は `.nvmrc` の v24。コマンド実行前に `source ~/.nvm/nvm.sh && nvm use` を通す

## 手順

### Step 1: 変更内容の確認

`git status --short` と `git diff --stat` で差分を把握する。

- 変更がなければここで終了し、その旨を報告する
- 意図しないファイル（`dist/`、`node_modules/`、`.DS_Store` 等）が混ざっていないか確認する。
  混ざっていれば `.gitignore` への追加を提案し、コミットには含めない

### Step 2: ブランチ

`main` にいる場合は新しいブランチを作る。既にトピックブランチにいればそのまま使う。

```bash
git checkout -b <type>/<短い英語の要約>
```

`<type>` は Step 3 のコミット type と揃える。例: `docs/requirements`、`feat/distance-logic`

### Step 3: コミット

**Conventional Commits の type prefix + 日本語の要約。**

| type | 用途 |
|---|---|
| `feat` | 機能追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみ |
| `refactor` | 挙動を変えない内部改善 |
| `test` | テストの追加・修正 |
| `chore` | ビルド・依存・設定 |

```bash
git add <対象ファイル>
git commit -F - <<'EOF'
<type>: <日本語の要約>

<なぜこの変更が必要かを1〜3行>

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

`git add -A` は使わず、対象ファイルを明示する。

### Step 4: 動作確認

**PR本文を書く前に実行する。** 確認していないことを動作確認欄に書かない。

変更内容に応じて、必要なものだけ走らせる。

| 変更対象 | 実行するもの |
|---|---|
| `src/` 配下（コード） | `npm run build`（`tsc -b` + `vite build` が走る）、`npm run lint` |
| `*.md` のみ | ビルド不要。リンク切れの確認のみ |
| `package.json` / `tsconfig*` / `vite.config.ts` | `npm run build` |

失敗した場合は PR を作らず、結果を報告して指示を仰ぐ。

### Step 5: push と PR 作成

```bash
git push -u origin <ブランチ名>

gh pr create --base main --head <ブランチ名> \
  --title "<コミットの要約と同じ>" --body-file - <<'EOF'
## 概要

<何を決めた／作ったかを1〜2文>

## 実装内容

- <箇条書き>

## 動作確認

- <Step 4 で実際に確認した内容と結果>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
```

作成された PR の URL を報告する。

## PR 本文の方針

**概要・実装内容・動作確認の3項目を基本構成とし、記述は可能な限りシンプルにする。**

- 3項目以外の見出し（背景、参考リンク、スクリーンショット等）は必要なときだけ足す
- 各項目は箇条書き中心。1項目あたり数行に収める
- 「動作確認」には実際に実行して確認したものだけを書く。
  コード変更がない場合は「コード変更はなし。」と明記する
- 絵文字での装飾や、丁寧すぎる前置きは入れない

## 注意事項

- PR本文は `--body` ではなく `--body-file -` で渡す（改行とマークダウンが崩れない）
- force push はしない。履歴の書き換えが必要な場合は理由を説明して指示を仰ぐ
- 差分が大きい、または変更の意図が読み取れない場合は、コミット前に要約を提示して確認を取る
- `REQUIREMENTS.md` の仕様に関わる変更をした場合、同ファイルの更新漏れがないか確認する
