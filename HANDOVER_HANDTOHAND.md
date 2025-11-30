# Hand to Hand Work - 引き継ぎメモ

## プロジェクト概要
- **名称**: 「道程」執筆管理サイト HandtoHand-work（公開閲覧用）
- **目的**: Google スプレッドシート上の管理データ（概要/プロット/お題/キャラ/場所/原稿）を閲覧用に整形して公開する。
- **データソース**: Google Sheets `5_原稿` を含む 0〜5 の各タブ。読み込みはすべて読み取り専用。
- **公開先**: GitHub Pages （REMriaTV/HandtoHand-work → https://remriatv.github.io/HandtoHand-work/）

## 作業ディレクトリ
- ローカル: `/Users/ootsukaumihei/HandtoHand-work`
- サイト構成: `index.html`, `style.css`, `script.js`, `config.js`（APIキーを格納）, 他補助HTML。

## 再開手順（PC再起動後）
1. ターミナルで作業ディレクトリへ: `cd /Users/ootsukaumihei/HandtoHand-work`
2. ローカルサーバー起動（必要に応じて）: `python3 -m http.server 8000`
3. ブラウザで `http://localhost:8000` を開き、Command+Shift+数字でタブ切替を確認。
4. スプレッドシートとの連携には `config.js` に有効な `SHEETS_API_KEY` が必要。
   - キーはGoogle Cloud Consoleから取得
   - HTTPリファラーを `https://remriatv.github.io/*` と `http://localhost:8000/*` に制限済みであることを確認。

## Git/GitHub 取り扱い
- リモート: `https://github.com/REMriaTV/HandtoHand-work.git`
- 通常のワークフロー:
  ```bash
  git status
  git add <変更ファイル>
  git commit -m "メッセージ"
  git push origin main
  ```
- Pages デプロイは main に push すると自動で実行。Actions → "pages build and deployment" が success になるまで待つ。
- `config.js` に実 API キーを入れた状態で GitHub へ push しないよう注意（現在は公開リポジトリに含まれているので、必要に応じて読み取り専用キーを使用）。

## 注意事項
- シートの列名を変更した場合は `script.js` の `PLOT_DISPLAY_HEADERS` などでヘッダ一致を更新。
- エラーが出た場合はブラウザコンソールで `gapi.client` まわりのログを確認。`updateLastUpdatedTime` が例外を投げるとデータ読み込みも失敗扱いになるのでDOM要素の存在チェックが必要。
- 原稿タブは `5_原稿!A:G` を読み込む。列順変更時は `displayManuscripts` で調整。
- キーボードショートカット: `Command + Shift + 1~6` で 概要/プロット/お題/キャラ/場所/原稿 の切替。

## 次にやるかもしれないこと
- 各タブのヘッダー固定（現状 thead sticky のみ）
- GitHub Secrets を使った API キー管理（Pages用ビルドでの差し込み）
- 追加タブ（管理など）を公開する場合は `index.html` と `script.js` の追加が必要。
