import { addData } from "../../features/scheduler/indexedDB";
import { EventType } from "../types";

export const useAddDBData = () => {
  const addDBData = async <T>(data: T) => {
    try {
      await addData(EventType.Task, data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Something went wrong");
      }
    }
  };

  return { addDBData };
};
