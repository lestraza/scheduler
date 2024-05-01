import styled from "@mui/styled-engine";
import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  colors,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../../shared/icons/close.svg";
import { ReactComponent as EditIcon } from "../../../shared/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../shared/icons/delete.svg";

export type CustomModalProps = {
  onClose: () => void;
  isEdit?: boolean;
} & DialogProps;

const IconBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  color: colors.grey[500],
}));

const ModalComponent = styled(Dialog)(() => ({
  "& .MuiPaper-root.MuiDialog-paper": {
    paddingTop: "50px",
  },
  "& .MuiDialogContent-root": {
    padding: "16px",
  },
  "& .MuiDialogActions-root": {
    padding: "8px",
  },
  minWidth: "200px",
}));

export const Modal = ({
  open,
  isEdit = false,
  onClose,
  children,
}: CustomModalProps) => {
  return (
    <ModalComponent open={open} onClose={onClose}>
      {isEdit ? (
        <>
          <IconBtn
            aria-label="edit"
            onClick={() => onClose}
            sx={{
              right: 128,
            }}
          >
            <EditIcon fill={colors.grey[400]} />
          </IconBtn>
          <IconBtn
            aria-label="delete"
            onClick={onClose}
            sx={{
              right: 64,
            }}
          >
            <DeleteIcon fill={colors.grey[400]} />
          </IconBtn>
        </>
      ) : null}

      <IconBtn
        aria-label="close"
        onClick={onClose}
        sx={{
          right: 8,
        }}
      >
        <CloseIcon fill={colors.grey[400]} />
      </IconBtn>
      <DialogContent dividers sx={{ minHeight: "250px", minWidth: "300px" }}>
        {children}
      </DialogContent>
    </ModalComponent>
  );
};
