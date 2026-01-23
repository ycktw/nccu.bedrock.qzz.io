const DB_NAME = 'lib';
const DB_VERSION = 3;
const STORE_NAME = 'books';
const VERSION_URL = './data/version.js'; 
const DATA_URL = './data/library.json';

// 初始化資料庫 (加入 onProgress 參數)
async function initLibraryDB(onProgress) {
	// 為了避免數字與字串比對錯誤，將 DB_VERSION 轉為字串
	const remoteVersion = DB_VERSION.toString();
	const localVersion = localStorage.getItem('lib_version');

	if (remoteVersion !== localVersion) {
		console.log(`發現新資料庫版本(${remoteVersion})，開始更新...`);
		await refreshData(remoteVersion, onProgress);
	} else {
		console.log(`資料已是最新: ${localVersion}`);
	}
}

// 下載並寫入資料 (加入 onProgress 參數)
async function refreshData(version, onProgress) {
	console.log("開始獲取遠端資料...");
	const response = await fetch(DATA_URL);
	const books = await response.json();

	const db = await openDB();
	console.log("檢查 Store 是否存在:", db.objectStoreNames.contains(STORE_NAME));
	
	const tx = db.transaction(STORE_NAME, 'readwrite');
	const store = tx.objectStore(STORE_NAME);

	store.clear(); // 清空舊資料
	books.forEach((book, index) => {
		store.put(book);
		// 透過 callback 將進度傳回給 Vue
		if (index % 500 === 0 && onProgress) {
			onProgress(index);
		}
	});

	// 【關鍵修改】：必須用 Promise 把 transaction 包起來
	// 這樣外部的 await refreshData() 才會真的等到資料全寫入完成
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => {
			localStorage.setItem('lib_version', version);
			console.log("資料庫更新完成！");
			resolve();
		};
		tx.onerror = (err) => {
			console.error("寫入資料庫失敗:", err);
			reject(err);
		};
	});
}

// 開啟 IndexedDB
function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = (e) => {
			const db = e.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: 'tno' });
				store.createIndex('tno', 'tno', { unique: true });
				console.log("資料表與索引建立成功:", STORE_NAME);
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
