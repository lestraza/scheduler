import { useEffect, useLayoutEffect, useState } from "react";
import { CalendarView, StoreName, UserEvent } from "../../../shared/types";
import { useAppSelector, yearsSlice } from "../store";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import { useGetDBData } from "../../../shared/hooks";
import { initDB } from "../indexedDB";
import { useDispatch } from "react-redux";

export const Scheduler = () => {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const { shouldUpdateData } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );
  const { setShouldUpdateData } = yearsSlice.actions;
  const dispatch = useDispatch();
  const { getDBData } = useGetDBData();

  useLayoutEffect(() => {
    if (!isDBReady) {
      let userEvents: UserEvent[] = [];
      const handleInitDB = async () => {
        const status = await initDB();
        setIsDBReady(status);
      };
      handleInitDB().then(async () => {
        if (isDBReady && shouldUpdateData) {
          userEvents = (await getDBData(StoreName.Events)) as UserEvent[];
          dispatch(setShouldUpdateData(false));
          setUserEvents(userEvents);
        }
      });
    }
  }, [dispatch, getDBData, isDBReady, setShouldUpdateData, shouldUpdateData]);

  useEffect(() => {
    if (isDBReady && shouldUpdateData) {
      (async () => {
        const tasks = (await getDBData(StoreName.Events)) as UserEvent[];
        dispatch(setShouldUpdateData(false));
        setUserEvents(tasks);
      })();
    }
  }, [dispatch, getDBData, isDBReady, setShouldUpdateData, shouldUpdateData]);

  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);
  return tab === CalendarView.Month ? (
    <MonthView userEvents={userEvents} />
  ) : (
    <YearView />
  );
};
