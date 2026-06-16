// Tiny promise-based IndexedDB key/value store for caching classifier vectors.
const IDB_NAME = 'jh-agent';
const IDB_STORE = 'kv';

const idbOpen = (): Promise<IDBDatabase> =>
	new Promise((resolve, reject) => {
		const req = indexedDB.open(IDB_NAME, 1);
		req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});

export const idbGet = <T>(key: string): Promise<T | null> =>
	idbOpen()
		.then(
			(db) =>
				new Promise<T | null>((resolve, reject) => {
					const req = db.transaction(IDB_STORE, 'readonly').objectStore(IDB_STORE).get(key);
					req.onsuccess = () => resolve((req.result as T) ?? null);
					req.onerror = () => reject(req.error);
				}),
		)
		.catch(() => null);

export const idbSet = (key: string, val: unknown): Promise<boolean> =>
	idbOpen()
		.then(
			(db) =>
				new Promise<boolean>((resolve, reject) => {
					const req = db.transaction(IDB_STORE, 'readwrite').objectStore(IDB_STORE).put(val, key);
					req.onsuccess = () => resolve(true);
					req.onerror = () => reject(req.error);
				}),
		)
		.catch(() => false);
