import { dbName } from "../constants";

export const useGetDBData = () => {
  const getDBData = <T>(storeName: string): Promise<T[]> => {
    return new Promise((resolve) => {
      let request = indexedDB.open(dbName);

      request.onsuccess = () => {
        console.log("request.onsuccess - getAllData");
        let db = request.result;
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const res = store.getAll();
        res.onsuccess = () => {
          resolve(res.result);
        };
      };
    });
  };
  return {
    getDBData,
  };
};
