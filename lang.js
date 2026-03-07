// 1. 定義語言字典檔
const messages = {
    'zh-Hant': {
        appTitle: '政大歷史系圖書資料庫',
        sysAdmin: '系統管理',
        loggedInStatus: '已登入 (權限測試)',
        logout: '登出',
        searchPlaceholder: '請輸入書名或作者關鍵字...',
        loadingText: '資料載入中... 請稍候',
        noDataText: '目前沒有資料',
        noResultsText: '查無符合條件的圖書',
        itemsPerPageText: '每頁顯示筆數：',
        allText: '全部',
        totalText: '共',
        syncingText: '正在同步圖書資料...',
        detailTitle: '書籍詳細資料',
        close: '關閉',
        confirmLogout: '您確定要登出系統管理嗎？',
        adminMenu: '管理選單',
        menu: {
            borrowRegistration: '借書登記',
            returnRegistration: '還書登記',
            newBook: '新書入庫',
            unreturnedStats: '未還統計',
            blacklist: '禁借清單',
            collectionList: '館藏清單',
            openingDays: '開館日設定',
            borrowHistory: '借閱歷史查詢'
        },
        // 資料表欄位名稱
        fields: {
            tno: '索書號',
            book_name: '書名',
            author: '作者',
            room: '館藏位置',
            publish: '出版社',
            year: '出版年份',
            isbn: 'ISBN',
            series: '叢書名',
            cat: '分類號'
        }
    },
    'en': {
        appTitle: 'NCCU History Dept. Library',
        sysAdmin: 'Admin Login',
        loggedInStatus: 'Logged In (Testing)',
        logout: 'Logout',
        searchPlaceholder: 'Search by title or author...',
        loadingText: 'Loading data... Please wait',
        noDataText: 'No data available',
        noResultsText: 'No matching books found',
        itemsPerPageText: 'Rows per page:',
        allText: 'All',
        totalText: 'Total',
        syncingText: 'Syncing library data...',
        detailTitle: 'Book Details',
        close: 'Close',
        confirmLogout: 'Are you sure you want to log out?',
        adminMenu: 'Management',
        menu: {
            borrowRegistration: 'Borrow Registration',
            returnRegistration: 'Return Registration',
            newBook: 'New Book Entry',
            unreturnedStats: 'Unreturned Stats',
            blacklist: 'Blacklist',
            collectionList: 'Collection List',
            openingDays: 'Set Opening Days',
            borrowHistory: 'Borrowing History'
        },
        fields: {
            tno: 'Call No.',
            book_name: 'Title',
            author: 'Author',
            room: 'Location',
            publish: 'Publisher',
            year: 'Year',
            isbn: 'ISBN',
            series: 'Series',
            cat: 'Category'
        }
    },
    'ja': {
        appTitle: '政大歴史学科図書データベース',
        sysAdmin: 'システム管理',
        loggedInStatus: 'ログイン中 (権限テスト)',
        logout: 'ログアウト',
        searchPlaceholder: '書名や著者のキーワードを入力してください...',
        loadingText: 'データを読み込んでいます... お待ちください',
        noDataText: 'データがありません',
        noResultsText: '条件に一致する図書が見つかりません',
        itemsPerPageText: '1ページあたりの表示件数：',
        allText: 'すべて',
        totalText: '全',
        syncingText: '図書データを同期しています...',
        detailTitle: '書籍詳細',
        close: '閉じる',
        confirmLogout: 'システムからログアウトしてもよろしいですか？',
        adminMenu: '管理メニュー',
        menu: {
            borrowRegistration: '貸出登録',
            returnRegistration: '返却登録',
            newBook: '新刊登録',
            unreturnedStats: '未返却統計',
            blacklist: '利用禁止リスト',
            collectionList: '蔵書リスト',
            openingDays: '開館日設定',
            borrowHistory: '貸出履歴照会'
        },
        fields: {
            tno: '請求記号',
            book_name: '書名',
            author: '著者',
            room: '配架場所',
            publish: '出版社',
            year: '出版年',
            isbn: 'ISBN',
            series: 'シリーズ名',
            cat: '分類番号'
        }
    }
};

// 2. 建立 i18n 實體
const i18n = new VueI18n({
    locale: localStorage.getItem('lib_lang') || 'zh-Hant', // 預設語言或從 localStorage 讀取
    fallbackLocale: 'zh-Hant',
    messages,
});
