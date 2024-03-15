import { CalendarView } from "../../../shared/types";
import { useAppSelector } from "../store";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";

export const Scheduler = () => {
  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);
  return tab === CalendarView.Month ? <MonthView /> : <YearView />;
};
