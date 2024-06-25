import styled from "@emotion/styled";
import {
  Stack as MUIStack,
  StackProps,
  TableCell,
  colors,
} from "@mui/material";
import { PropsWithChildren, SyntheticEvent } from "react";
import { Day } from "../../types";
export type OnSelectDayProps = {
  type: Event["type"];
  day: Day;
  position?: {
    top: number;
    left: number;
  };
};

type DayContainerProps = {
  day?: Day;
  isColumn?: boolean;
  isSelecting?: boolean;
  onClick?: (day: Day) => void;
  onSelectDay?: (props: OnSelectDayProps) => void;
} & PropsWithChildren &
  StackProps;

const CustomStack = styled(MUIStack)`
  cursor: pointer;
  font-size: 0.725rem;
  align-items: center;
  color: ${colors.grey[600]};
  gap: 8px;
  font-weight: 300;
  position: relative;
  &.year {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    &:hover {
      background-color: rgb(241, 243, 244);
    }
  }
  &.month {
    min-height: 5rem;
    font-size: 0.825rem;
  }
`;

const CustomTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<Pick<Day, "isSelected">>(({ isSelected }) => ({
  padding: "8px",
  border: " 1px solid rgba(224, 224, 224, 1)",
  width: "14%",
  zIndex: "2",
  "&:hover": {
    backgroundColor: colors.blueGrey[50],
  },
  "&.column": {
    border: "none",
    "& .MuiStack-root": {
      fontSize: "0.8rem",
      fontWeight: "bold",
      cursor: "unset",
    },
  },
  backgroundColor: isSelected ? colors.blue[100] : "transparent",
}));

export const DayContainer = ({
  children,
  day,
  isColumn = false,
  isSelecting = false,
  onClick,
  onSelectDay,
  ...rest
}: DayContainerProps) => {
  const onHandleSelectDay = (event: SyntheticEvent) => {
    event.stopPropagation();
    //console.log("🚀 ~ onHandleSelectDay ~ event:", (event.target as any).querySelector('div').innerText);
    if (day && (event.type === "mousedown" || isSelecting)) {
      onSelectDay?.({
        day,
        type: event.type,
      });
    }
  };

  return (
    <CustomTableCell
      className={isColumn ? "column" : ""}
      onClick={onHandleSelectDay}
      onMouseEnter={onHandleSelectDay}
      onMouseUp={onHandleSelectDay}
      isSelected={day?.isSelected}
      onMouseDown={onHandleSelectDay}
    >
      <CustomStack {...rest}>{children}</CustomStack>
    </CustomTableCell>
  );
};
