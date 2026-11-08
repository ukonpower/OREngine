# uipower

OREngine のエディタを組むための React の UI 部品とデザイントークン。依存は `react` / `react-dom` だけで、エンジン（`maxpower` など）にも editor にも依存しない。

今は OREngine のリポジトリの中にあり、npm には公開していない。

## 使い方

```tsx
import 'uipower/styles/style.scss';
import { useState } from 'react';
import { Block, Button, InputNumber, InputWindow, InputWindowProvider, Panel, Popover, PopoverProvider } from 'uipower';

export const App = () => {

	const [ value, setValue ] = useState( 0 );

	return (
		<PopoverProvider>
			<InputWindowProvider>
				<Panel>
					<Block label="Transform">
						<InputNumber value={value} onChange={setValue} step={0.1} />
						<Button onClick={() => setValue( 0 )}>Reset</Button>
					</Block>
				</Panel>
				<InputWindow />
				<Popover />
			</InputWindowProvider>
		</PopoverProvider>
	);

};
```

- `uipower/styles/style.scss` はアプリの入口で1回だけ読む。トークン（CSS 変数 `--or-*`）と、ページ全体へのスタイル（後述）が入っている
- `InputNumber` / `InputText` は `InputWindowProvider` の中、`Popover` を開く部品は `PopoverProvider` の中に置く（無いと例外になる）。`<InputWindow />` / `<Popover />` は各 Provider の中に1つずつ置く。SP の入力窓とメニュー類はそこに描かれる

## 部品

| 分類 | 部品 |
|---|---|
| 入力 | `InputNumber` / `InputText` / `InputSelect` / `InputSlider` / `InputCheckBox` / `InputColor` / `Vector` / `SegmentedControl` / `Button` |
| レイアウト | `Panel` / `PanelContainer` / `LayoutSplit` / `Block` / `Label` |
| リスト | `ListItem` / `Menu` |
| 重なるもの | `Modal` / `Popover` / `InputWindow` |
| アイコン | `Icons`（`ArrowIcon` / `PlusIcon` / `CrossIcon` など） |
| フック | `usePopover` / `useInputWindow` / `useAnchoredPosition` / `useMobileDevice` |
| ポインタ | `trackPointerDrag`（ドラッグの移動量の追跡と Pointer Lock） |

見た目と状態ごとの例は Storybook（`npm run storybook:dev`、配信は GitHub Pages の `/storybook/`）で見られる。

## トークン

色・文字サイズ・余白・角丸・寸法・重なり順は、すべて `styles/_globals.scss` の CSS 変数 `--or-*` で決めている。各部品は `var(--or-*)` で参照するので、利用側で同じ変数を上書きすれば見た目が変わる。

SP（幅 900px 以下）では、寸法のトークンが指で触れる大きさへ切り替わる。scss から使う場合は、`@use '<uipower へのパス>/styles' as *` で `sp` / `pc` のメディアクエリと `input-frame` の mixin が使える。

## ページ全体へのスタイル

`style.scss` は、トークンのほかに次のスタイルをページ全体へ当てる。uipower を既存のページへ組み込むと、そのページの見た目も変わる。

- `*` の margin を 0、`box-sizing: border-box`、`user-select: none`、スクロールバーの見た目
- `html` / `body` の背景色・文字色・文字サイズ・フォント
- `button` のリセット、`input` / `select` のフォーカス枠

## ビルド

```bash
npm run uipower:build   # 単独の型チェック + ライブラリビルド（packages/uipower/dist）
```

このパッケージの中の設定（`tsconfig.json` / `vite.config.ts`）だけで通るかを確かめるためのビルド。ルートの tsconfig の `paths` や host の vite 設定（エイリアス・sass の `loadPaths`）を使わないので、uipower がリポジトリの他の場所へ依存すると落ちる。CI でも走らせている。

リポジトリの中の利用側（editor / Storybook）は `dist` を使わず、ソースをそのまま読む。

## 依存のルール

- uipower から import してよいのは `react` / `react-dom` と uipower の中だけ（ESLint の `eslint-plugin-boundaries` と、上の単独ビルドで守る）
- エディタやエンジンの関心事（キーフレーム・シーン・コンポーネントなど）は uipower に入れず、editor 側に置く
