import { Button, Stack, Typography, colors } from "@mui/material";
import { Modal } from "../modal";
import styled from "@emotion/styled";

export type ConfirmAlertProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  text: string;
  onConfirm: () => void;
};

const CancelButton = styled(Button)`
  color: ${colors.pink[200]};
  border-color: ${colors.pink[200]};
  &:hover {
    color: ${colors.pink[200]};
    border-color: ${colors.pink[200]};
  }
`;

export const ConfirmAlert = ({
  open,
  setOpen,
  text,
  onConfirm,
}: ConfirmAlertProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "&&& .MuiDialogContent-root": { minHeight: "unset", padding: "24px" },
      }}
    >
      <Typography sx={{ marginBottom: "24px" }}>{text}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ gap: "48px" }}
      >
        <CancelButton variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </CancelButton>
        <Button variant="outlined" onClick={() => onConfirm()}>
          Confirm
        </Button>
      </Stack>
    </Modal>
  );
};
