import styled from "@emotion/styled";
import { Dialog, DialogContent, DialogProps, IconButton } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../../shared/icons/close.svg";
import { ReactComponent as EditIcon } from "../../../shared/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../shared/icons/delete.svg";

type ModalProps = {
  onClose: () => void;
  isEdit?: boolean;
} & DialogProps;

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
}: ModalProps) => {
  return (
    <ModalComponent open={open}>
      {isEdit ? (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => onClose}
            sx={{
              position: "absolute",
              right: 128,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 64,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : null}

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ minHeight: "250px", minWidth: "300px" }}>
        {children}
      </DialogContent>
    </ModalComponent>
  );
};
