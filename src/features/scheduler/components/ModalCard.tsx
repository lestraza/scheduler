import {
  CustomModalProps,
  HolidayCard,
  Modal,
  TaskCard,
} from "../../../shared/components";
import { Day, EventType, Task } from "../../../shared/types";

type ModalCardProps = {
  open: boolean;
  type: EventType;
  isEdit?: boolean;
  day: Day;
  task?: Task;
  onClose: () => void;
  onSave: (data: Task | Event) => void;
} & CustomModalProps;

export const ModalCard = ({
  open,
  day,
  type,
  isEdit,
  task,
  onClose,
  onSave,
}: ModalCardProps) => {
  return (
    <Modal open={open} onClose={() => onClose()} sx={{ minWidth: "450px" }}>
      {type === EventType.Holiday && (
        <HolidayCard
          day={day as Day}
          date={day?.date ? new Date(day?.date) : new Date()}
        />
      )}
      {type === EventType.Task && !task && (
        <TaskCard date={new Date(day?.date)} onSaveData={onSave} />
      )}
    </Modal>
  );
};
