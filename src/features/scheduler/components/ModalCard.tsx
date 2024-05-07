import { Popover, PopoverProps } from "@mui/material";
import { EventCard, TaskCard, TaskCardProps } from "../../../shared/components";
import { Day, EventType, UserEvent } from "../../../shared/types";
import styled from "@emotion/styled";

type ModalCardProps = {
  type: EventType;
  day: Day;
  onClose: () => void;
  onHandleEdit: () => void;
  onHandleDelete: () => void;
  userEvent?: UserEvent;
} & Partial<TaskCardProps> &
  PopoverProps;

const CardPopover = styled(Popover)`
  top: 30%;
  left: 37%;
  & .MuiPopover-paper {
    padding: 24px;
  }
`;

export const ModalCard = ({
  day,
  type,
  isEdit,
  userEvent,
  open,
  onClose,
  onSaveData,
  onHandleEdit,
  onHandleDelete,
}: ModalCardProps) => {
  return (
    <CardPopover open={open} onClose={() => onClose()}>
      {type === EventType.Holiday || (userEvent && !isEdit) ? (
        <EventCard
          day={day}
          date={day?.date ? new Date(day?.date) : new Date()}
          userEvent={userEvent}
          onHandleEdit={onHandleEdit}
          onHandleDelete={onHandleDelete}
        />
      ) : !userEvent || isEdit ? (
        <TaskCard
          isEdit={isEdit}
          isNew={!!userEvent}
          onSaveData={onSaveData!}
          userEvent={userEvent}
        />
      ) : null}
    </CardPopover>
  );
};
