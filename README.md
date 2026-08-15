# manteia

古代ギリシャ哲学者の診断アプリ。

複数の質問に答えると、思想的に**最も近い哲学者**を6人のリストから判定して返す。
哲学的立場を4本の軸で座標化し、回答から得たユーザー座標との距離が最小の人物を選ぶ。

回答データの保存は行わず、判定から結果表示までをすべてブラウザ内で完結させる。

> **仕様の詳細は [REQUIREMENTS.md](./REQUIREMENTS.md) を参照。**
> 軸の定義、哲学者6人の座標、設問の方針、未確定事項はそちらに記載している。

## 技術構成

| 項目 | 選定 |
|---|---|
| ビルドツール | Vite 8 |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 6 |
| Linter | Oxlint |
| Node | v24 (LTS) — `.nvmrc` で固定 |

### なぜ Next.js ではなく Vite なのか

Next.js は SSR・API Routes・DB 連携といった「サーバーが必要な機能」のためのフレームワーク。
本アプリはそのいずれも使わないため、App Router や Server Components の学習コストがそのまま負債になる。

Vite ならビルド成果物が `dist/` の静的ファイル一式になるので、どの無料ホスティングにも置ける。
将来 SNS シェア用の OGP 画像を結果ごとに動的生成したくなった時点で Next.js への移行を検討すればよく、
その際もコンポーネントとスコア計算ロジックはほぼそのまま流用できる。

## セットアップ

Node のバージョンを合わせてから依存関係をインストールする。

```bash
nvm use          # .nvmrc の v24 に切り替え
npm install
```

## 開発

```bash
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 型チェック + 本番ビルド → dist/
npm run preview  # 本番ビルドをローカルで確認
npm run lint     # Oxlint
```

型チェックだけを単独で走らせたい場合：

```bash
npx tsc -b
```

## 設計方針

実装を進める際は以下の 3 点を軸にする。TypeScript の型を「動くドキュメント」として使うための土台。

**1. 質問データと哲学者データは `as const satisfies` で定義する**

リテラル型に絞り込まれるため、軸や哲学者との対応漏れがコンパイル時に検出できる。

**2. 距離計算は React から独立した純粋関数にする**

`(answers) => PhilosopherId` という形にしておけば UI に依存せず、
ユニットテストが書ける。診断アプリはロジックの正しさが成果物の価値そのものなので、
ここだけはテストを置く価値がある。

**3. 画面遷移は判別可能なユニオン型で表す**

```ts
type State =
  | { phase: 'start' }
  | { phase: 'answering'; index: number; answers: number[] }
  | { phase: 'result'; philosopher: PhilosopherId }
```

`phase` で分岐すれば、その分岐内でのみ存在するプロパティに安全にアクセスできる。
「型で不正な状態を作れなくする」という考え方を、この規模で体感できる。

なお `tsconfig.app.json` では `strict: true` を有効にしている。

## 想定ディレクトリ構成

```
src/
  types.ts            … Axis / Question / Choice / Philosopher の型定義
  data/
    axes.ts           … 4本の軸の定義
    questions.ts      … 質問データ（選択肢ごとの軸への加点）
    philosophers.ts   … 哲学者6人の座標と解説文
  logic/
    vector.ts         … 回答 → ユーザー座標（正規化を含む）
    distance.ts       … ユークリッド距離、最近傍の哲学者を返す
  hooks/
    useDiagnosis.ts   … useReducer による状態遷移
  components/         … StartScreen / QuestionCard / ProgressBar / ResultScreen
  App.tsx
```

## デプロイ

**Vercel**（Hobby プラン）を使用する。GitHub リポジトリを連携すると、
`main` への push で本番デプロイ、それ以外のブランチはプレビューデプロイが自動で走る。

Vercel は Vite を自動検出するため、インポート時の設定入力は不要（下記が自動で入る）。

| 項目 | 自動設定される値 |
|---|---|
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

> **Hobby プランは規約上、商用利用が不可。**
> 本プロジェクトは個人学習用途のため問題ないが、業務案件に転用する場合は
> Cloudflare Pages（無料枠で商用利用可）などへの移行が必要になる。

Vercel のデフォルト Node は 22 系。ローカルの `.nvmrc`（24）と揃えたい場合は
Project Settings → General → Node.js Version で変更する。Vite 8 は 22 でも動くため必須ではない。

### SPA ルーティングを入れた場合

react-router などを導入すると、`/result` のような URL への直接アクセスが 404 になる。
その場合はプロジェクトルートに `vercel.json` を置く。

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

現状はルーターを使っていないため不要。

## 学習リソース

### TypeScript

- [サバイバルTypeScript](https://typescriptbook.jp/) — 日本語の TS 入門書。全編無料・OSS。
  「読んで学ぶTypeScript」章の *値・型・変数* → *型の絞り込み* → *ユーティリティ型* から読むとよい
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/) — 逆引きリファレンスとして
- [TypeScript Playground](https://www.typescriptlang.org/play) — 型の推論結果をその場で確認する

### React

- [React 公式ドキュメント 日本語版](https://ja.react.dev/learn) —
  クイックスタート → Describing the UI → Adding Interactivity → Managing State の順。
  **Managing State** の章が上記「設計方針 3」に直結する
- [React 公式チュートリアル（三目並べ）](https://ja.react.dev/learn/tutorial-tic-tac-toe) —
  「状態を持つ小さな SPA」という点で本アプリとほぼ同じ構造。着手前に一度通すと実装が速い

### Vite

- [Vite 公式ドキュメント 日本語版](https://ja.vite.dev/guide/) —
  「はじめに」と「静的アセットの取り扱い」だけで足りる

### 距離計算

- [ユークリッド距離 (Wikipedia)](https://ja.wikipedia.org/wiki/ユークリッド距離) — 本アプリが採用する距離
- [コサイン類似度 (Wikipedia)](https://ja.wikipedia.org/wiki/コサイン類似度) — 採用しなかった選択肢。
  強度を無視して方向だけを見るため、穏健な人と極端な人が同じ結果になる
- 正規化は「min-max normalization」で検索。式は `(x - min) / (max - min)`

`Math.sqrt()` と `reduce()` で書ける。数学的には難しくない。

### 基礎の補強

- [MDN Web Docs 日本語 (JavaScript)](https://developer.mozilla.org/ja/docs/Web/JavaScript) —
  座標計算で `reduce` を多用するため、配列メソッドの確認用に

### 哲学者の典拠

座標値を決める際の参照先は [REQUIREMENTS.md](./REQUIREMENTS.md) の「調べどころ」章にまとめている。
