import { deleteData } from "../../features/scheduler/indexedDB";

export const useDeleteDBData = () => {
  const deleteDBData = async (storeName: string, id: string) => {
    try {
      await deleteData(storeName, id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Something went wrong deleting the user");
      }
    }
  };
  return { deleteDBData };
};
