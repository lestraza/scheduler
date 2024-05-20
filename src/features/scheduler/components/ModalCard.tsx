import { Popover, PopoverProps } from "@mui/material";
import {
  ConfirmAlert,
  EventCard,
  TaskCard,
  TaskCardProps,
} from "../../../shared/components";
import { Day, EventType, UserEvent } from "../../../shared/types";
import styled from "@emotion/styled";
import { useToggle } from "../../../shared/hooks";

type ModalCardProps = {
  type: EventType;
  day: Day;
  isEdit: boolean;
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
  const { open: isOpenConfirm, setOpen: setOpenConfirm } = useToggle();

  return (
    <>
      <CardPopover open={open} onClose={() => onClose()}>
        {type === EventType.Holiday || (userEvent && !isEdit) ? (
          <EventCard
            day={day as Day}
            date={day?.date ? new Date(day?.date) : new Date()}
            userEvent={userEvent}
            onHandleEdit={onHandleEdit}
            onHandleDelete={() => setOpenConfirm(true)}
          />
        ) : !userEvent || isEdit ? (
          <TaskCard
            onSaveData={onSaveData!}
            userEvent={userEvent}
            onClose={onClose}
          />
        ) : null}
      </CardPopover>
      <ConfirmAlert
        open={isOpenConfirm}
        setOpen={setOpenConfirm}
        text="Are you sure you want to delete this event?"
        onConfirm={onHandleDelete}
      />
    </>
  );
};
