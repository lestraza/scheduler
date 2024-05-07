import {
  Button,
  Popover,
  PopoverProps,
  Stack,
  Typography,
} from "@mui/material";
import {
  EventCard,
  Modal,
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
  onEditHandle: () => void;
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
  onEditHandle,
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
            onEditHandle={onEditHandle}
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
      <Modal
        open={isOpenConfirm}
        onClose={() => setOpenConfirm((prev) => !prev)}
        sx={{
          "&&& .MuiDialogContent-root": { minHeight: "unset", padding: "24px" },
        }}
      >
        <Typography sx={{ marginBottom: "24px" }}>
          Are you sure you want to delete this event?
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ gap: "48px" }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setOpenConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => onHandleDelete()}>
            Confirm
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
