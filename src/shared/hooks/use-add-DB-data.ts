import { addData } from "../../features/scheduler/indexedDB";
import { EventType } from "../types";

export const useAddDBData = () => {
  const addDBData = async <T>(type: EventType, data: T) => {
    try {
      await addData(type, data);
      return true
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
