import { useMemo } from "react";
import { DayContainer } from "../../../shared/components/day-container";
import React from "react";

type Props = {
  weekdays: string[];
};

export const SchedulerMonthColumns = React.memo(({ weekdays, }: Props) => {
  const columns = useMemo(() => {
    return weekdays.map((key) => {
      return (
        <DayContainer isColumn key={key} id={key}>
          {String(key).charAt(0)}
        </DayContainer>
      );
    });
  }, [weekdays]);

  return <>{columns}</>;
});
