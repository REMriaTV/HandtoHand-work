// Google Sheets API設定
const SHEETS_CONFIG = {
    API_KEY: SHEETS_API_KEY, // config.jsから読み込み
    SPREADSHEET_ID: '18A-ES-yQ0GplCfk9SWHneYpsPNbVBNNLEEK0b4ioi48',
    DISCOVERY_DOC: 'https://sheets.googleapis.com/$discovery/rest?version=v4'
};

// Google Sheets API初期化フラグ
let gapiInitialized = false;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    setupTabNavigation();
    
    // Google Sheets API初期化
    if (typeof SHEETS_API_KEY !== 'undefined') {
        initializeGoogleSheetsAPI();
    } else {
        console.error('APIキーが設定されていません。config.jsを確認してください。');
    }
});

// タブ切り替え機能
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // ボタンのアクティブ状態を切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // コンテンツの表示を切り替え
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Google Sheets API初期化
function initializeGoogleSheetsAPI() {
    gapi.load('client', initializeGapiClient);
}

// GAPIクライアント初期化
async function initializeGapiClient() {
    try {
        await gapi.client.init({
            apiKey: SHEETS_CONFIG.API_KEY,
            discoveryDocs: [SHEETS_CONFIG.DISCOVERY_DOC],
        });
        gapiInitialized = true;
        console.log('Google Sheets API初期化完了');
        
        // 初期化完了後、スプレッドシートからデータを読み込む
        loadFromGoogleSheets();
    } catch (error) {
        console.error('Google Sheets API初期化エラー:', error);
    }
}

// スプレッドシートからデータ読み込み
async function loadFromGoogleSheets() {
    try {
        // 概要タブ
        const overviewResponse = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
            range: '0_概要!A:B',
        });
        displayOverview(overviewResponse.result.values || []);

        // プロットタブ
        const plotResponse = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
            range: '1_プロット!A:C',
        });
        displayPlot(plotResponse.result.values || []);

        // お題タブ
        const themeResponse = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
            range: '2_お題!A:D',  // A列(章)、B列(お題)、C列(イメージ)、D列(補足)
        });
        displayTheme(themeResponse.result.values || []);

        // キャラタブ
        const charactersResponse = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
            range: '3_キャラ!B:H',  // B列から開始（A列は番号）
        });
        displayCharacters(charactersResponse.result.values || []);

        // 場所タブ
        const locationsResponse = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_CONFIG.SPREADSHEET_ID,
            range: '4_場所!A:C',
        });
        displayLocations(locationsResponse.result.values || []);

        // 管理タブは非公開のため読み込まない

        // 最終更新時刻を更新
        updateLastUpdatedTime();

    } catch (error) {
        console.error('スプレッドシートデータ読み込みエラー:', error);
        alert('スプレッドシートからのデータ読み込みに失敗しました。');
    }
}

// 概要データ表示
function displayOverview(data) {
    const tbody = document.querySelector('#overview-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(row => {
        if (row.length >= 2 && row[0]) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row[0]}</td>
                <td>${row[1] || ''}</td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// プロットデータ表示
function displayPlot(data) {
    const tbody = document.querySelector('#plot-table tbody');
    tbody.innerHTML = '';
    
    // ヘッダー行をスキップ
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length >= 1) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatCellContent(row[0])}</td>
                <td>${formatCellContent(row[1])}</td>
                <td>${formatCellContent(row[2])}</td>
            `;
            tbody.appendChild(tr);
        }
    }
}

// お題データ表示
function displayTheme(data) {
    const tbody = document.querySelector('#theme-table tbody');
    tbody.innerHTML = '';
    
    // ヘッダー行をスキップ
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row && row.length >= 1) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatCellContent(row[0])}</td>
                <td>${formatCellContent(row[1])}</td>
                <td>${formatCellContent(row[2])}</td>
                <td>${formatCellContent(row[3])}</td>
            `;
            tbody.appendChild(tr);
        }
    }
}

// キャラクターデータ表示
function displayCharacters(data) {
    const tbody = document.querySelector('#characters-table tbody');
    tbody.innerHTML = '';
    
    // ヘッダー行をスキップ
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length >= 1 && row[0]) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatCellContent(row[0])}</td>
                <td>${formatCellContent(row[1])}
                <td>${formatCellContent(row[2])}</td>
                <td>${formatCellContent(row[3])}</td>
                <td>${formatCellContent(row[4])}</td>
                <td>${formatCellContent(row[5])}</td>
            `;
            tbody.appendChild(tr);
        }
    }
}

// 場所データ表示
function displayLocations(data) {
    const tbody = document.querySelector('#locations-table tbody');
    if (!tbody) {
        console.error('場所テーブルのtbodyが見つかりません');
        return;
    }
    tbody.innerHTML = '';
    
    // ヘッダー行をスキップ
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row && row.length >= 1) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatCellContent(row[0])}</td>
                <td>${formatCellContent(row[1])}
                <td>${row[2] || ''}</td>
            `;
            tbody.appendChild(tr);
        }
    }
}


// セル内容の改行と太字を保持してフォーマット
function formatCellContent(content) {
    if (!content) return '';
    // 改行を<br>タグに変換
    let formatted = content.replace(/\n/g, '<br>');
    // **テキスト** を <strong>テキスト</strong> に変換
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return formatted;
}

// 最終更新時刻更新
function updateLastUpdatedTime() {
    const now = new Date().toLocaleString('ja-JP');
    document.getElementById('last-updated-time').textContent = now;
}

// スプレッドシートからデータを再読み込み（手動更新用）
function refreshFromGoogleSheets() {
    if (gapiInitialized) {
        loadFromGoogleSheets();
    } else {
        console.log('APIが初期化されていません。初期化を開始します...');
        initializeGoogleSheetsAPI();
        setTimeout(() => {
            if (gapiInitialized) {
                loadFromGoogleSheets();
            } else {
                alert('Google Sheets APIの初期化に失敗しました。ページを再読み込みしてください。');
            }
        }, 2000);
    }
}