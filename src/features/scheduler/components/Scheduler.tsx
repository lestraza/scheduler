import { useLayoutEffect, useState } from "react";
import { CalendarView, EventType, Task } from "../../../shared/types";
import { useAppSelector } from "../store";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import { useGetDBData } from "../../../shared/hooks";
import { initDB } from "../indexedDB";

export const Scheduler = () => {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { getDBData } = useGetDBData();
  useLayoutEffect(() => {
    let tasks: Task[] = [];
    const handleInitDB = async () => {
      const status = await initDB();
      setIsDBReady(status);
    };
    handleInitDB().then(async () => {
      if (isDBReady && !isLoadedData) {
        tasks = (await getDBData(EventType.Task)) as Task[];
        setIsLoadedData((prev) => !prev);
        setTasks(tasks);
      }
    });
  }, [getDBData, isDBReady, isLoadedData]);
  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);
  return tab === CalendarView.Month ? (
    <MonthView tasks={tasks} />
  ) : (
    <YearView />
  );
};
