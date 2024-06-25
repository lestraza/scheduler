import { CalendarView, UserEvent, Year } from "../../../shared/types";

export interface YearsState {
  year: Year;
  currentYear: number;
  displayedYear: number;
  currentMonth: number;
  displayedMonth: number;
  calendarViewTab: CalendarView;
  shouldUpdateData: boolean
  userEvents: UserEvent[]
}
