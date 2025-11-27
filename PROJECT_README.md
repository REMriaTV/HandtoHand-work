# Hand to Hand (道程) 制作管理・公開サイト

## プロジェクト概要
小説「Hand to Hand」の原稿と制作情報を統合して公開するウェブサイトプロジェクト

### 作成日
2025-11-27

### 作者情報
- 親アカウント: REMriaTV
- メール: remuriatv@gmail.com
- リポジトリ: HantoHand

### プロジェクトの目的
1. 原稿と制作過程を一体化させて公開
2. 読者により深い作品体験を提供
3. 創作モチベーションの向上

## 現在の状況

### 完了済み
- ✅ 基本的な管理サイトのプロトタイプ作成
  - `/novel-management/index.html` - メインページ
  - `/novel-management/style.css` - スタイルシート  
  - `/novel-management/script.js` - JavaScript機能
- ✅ タブ構造（プロット、キャラクター、原稿、メモ）
- ✅ ローカルストレージでのデータ保存機能
- ✅ エクスポート/インポート機能

### データソース
- **Googleスプレッドシート**: https://docs.google.com/spreadsheets/d/1Nh1yDXMdR6Z-Hoyua6T76hdtmO5g5x7Prt1-SpRGoKc/
- **公開URL**: https://docs.google.com/spreadsheets/d/e/2PACX-1vT0Eda3cX0Ll_zm3DAKxeSmyKhyRQ3DABfHzZc2MB8VDeZeSHMBXx3Y6v4zitOqur42qcr0jFfCv9fa/pubhtml

### スプレッドシート構造
- **概要タブ**: 作品の基本情報
- **プロットタブ**: 物語の構成
- **お題タブ**: 創作のきっかけやテーマ
- **キャラタブ**: 登場人物の詳細
- **場所タブ**: 舞台設定
- **管理タブ**: 執筆進捗など

## Google Sheets API設定方法

### 1. APIキーの設定
```bash
# config.js.exampleをconfig.jsとしてコピー
cp config.js.example config.js
```

### 2. config.jsを編集
```javascript
const SHEETS_API_KEY = 'ここに取得したAPIキーを貼り付け';
```

### 3. index.htmlを修正
```html
<!-- script.jsの前にconfig.jsを読み込む -->
<script src="config.js"></script>
<script src="script.js"></script>
```

### 4. script.jsのAPI_KEY設定を修正
```javascript
API_KEY: SHEETS_API_KEY, // config.jsから読み込み
```

## 使い方
1. ブラウザでindex.htmlを開く
2. 「スプレッドシートから更新」ボタンをクリックしてデータを読み込む
3. ローカルで編集した内容は「すべて保存」で保存される

## 実装済み機能
- ✅ Google Sheets API連携（読み取り専用）
- ✅ スプレッドシートからのデータ自動読み込み
- ✅ 概要、プロット、キャラクターデータの同期
- ✅ 手動更新ボタン

## 次の作業
1. デザインのカスタマイズ（小説公開サイト風に）
2. GitHub Pagesへの公開
3. 読者向けビューの作成（編集機能を隠す）

## 技術スタック
- HTML/CSS/JavaScript（バニラJS）
- Google Sheets API v4
- ローカルストレージ（現在）→ Sheets API（移行予定）

## ファイル構成
```
/Users/ootsukaumihei/novel-management/
├── index.html          # メインページ
├── style.css          # スタイルシート
├── script.js          # 現在のJavaScript（ローカルストレージ版）
├── PROJECT_README.md  # このファイル（引き継ぎ用）
└── (予定) api-config.js  # Google Sheets API設定
```

## 開発メモ
- スプレッドシートの「ウェブに公開」では行間やセルの折りたたみは反映されない
- キャッシュの影響で更新が遅れることがある（シークレットモードで確認推奨）
- API連携により、スプレッドシート更新→サイト自動反映を実現予定

## コマンド
```bash
# プロジェクトディレクトリへ移動
cd /Users/ootsukaumihei/novel-management/

# ブラウザで開く
open index.html

# ファイル一覧
ls -la
```

## 参考リンク
- [Google Sheets API v4 Documentation](https://developers.google.com/sheets/api/reference/rest)
- [スプレッドシート（編集用）](https://docs.google.com/spreadsheets/d/1Nh1yDXMdR6Z-Hoyua6T76hdtmO5g5x7Prt1-SpRGoKc/)

---
最終更新: 2025-11-27