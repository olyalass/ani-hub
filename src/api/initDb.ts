function initDb(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const request = indexedDB.open('animeUniverse', 1)

    request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('lists')) {
        db.createObjectStore('lists')
      }
    }

    request.onsuccess = function (event) {
      res((event.target as IDBOpenDBRequest).result)
    }

    request.onerror = function (event) {
      rej((event.target as IDBOpenDBRequest).error)
    }
  })
}

export default initDb
