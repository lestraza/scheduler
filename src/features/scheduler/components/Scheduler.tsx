import { useContext, useEffect } from "react";
import { CalendarView } from "../../../shared/types";
import { getUserEvents, yearsSlice } from "../store";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
// import { useGetDBData } from "../../../shared/hooks";
// import { initDB } from "../indexedDB";
import { AuthContext } from "../../authorization/components";
import { useAppDispatch, useAppSelector } from "../../../store";

export const Scheduler = () => {
  //const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const { shouldUpdateData, userEvents } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );
  const { setShouldUpdateData, clearUserEvents } = yearsSlice.actions;
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext);
  const action = dispatch();
  useEffect(() => {
    return () => {
      action(setShouldUpdateData(true));
      action(clearUserEvents());
    };
  }, [action, clearUserEvents, setShouldUpdateData]);

  //** indexedDB init and retrieving events */

  // useLayoutEffect(() => {
  //   if (!isDBReady) {
  //     let userEvents: UserEvent[] = [];
  //     const handleInitDB = async () => {
  //       const status = await initDB();
  //       setIsDBReady(status);
  //     };
  //     handleInitDB().then(async () => {
  //       if (isDBReady && shouldUpdateData) {
  //         userEvents = (await getDBData(StoreName.Events)) as UserEvent[];
  //         dispatch(setShouldUpdateData(false));
  //         setUserEvents(userEvents);
  //       }
  //     });
  //   }
  // }, [dispatch, getDBData, isDBReady, setShouldUpdateData, shouldUpdateData]);

  useEffect(() => {
    if (shouldUpdateData && user) {
      (async () => {
        if (user.id) {
          await action(getUserEvents(user.id));
          action(setShouldUpdateData(false));
        }
      })();
    }
  }, [
    dispatch,
    action,
    setShouldUpdateData,
    shouldUpdateData,
    user,
  ]);

  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);
  return tab === CalendarView.Month ? (
    <MonthView userEvents={userEvents} />
  ) : (
    <YearView />
  );
};
