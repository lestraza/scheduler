import { Popover, PopoverProps } from "@mui/material";
import {
  HolidayCard,
  TaskCard,
  TaskCardProps,
} from "../../../shared/components";
import { Day, EventType, UserEvent } from "../../../shared/types";
import styled from "@emotion/styled";

type ModalCardProps = {
  type: EventType;
  day: Day;
  onClose: () => void;
  userEvent?: UserEvent;
} & Partial<TaskCardProps> &
  PopoverProps;

const CardPopover = styled(Popover)`
  top: 30%;
  left: 37%;
  & .MuiPopover-paper {
    padding: 16px;
  }
`;

export const ModalCard = ({
  day,
  type,
  isEdit,
  isNew,
  userEvent,
  open,
  onClose,
  onSaveData,
}: ModalCardProps) => {
  return (
    <CardPopover open={open} onClose={() => onClose()}>
      {type === EventType.Holiday || userEvent ? (
        <HolidayCard
          day={day as Day}
          date={day?.date ? new Date(day?.date) : new Date()}
          userEvent={userEvent}
        />
      ) : !userEvent ? (
        <TaskCard isEdit={isEdit} isNew={isNew} onSaveData={onSaveData!} />
      ) : null}
    </CardPopover>
  );
};
