import styled from "@emotion/styled";
import { Chip } from "@mui/material";

type Props = {
  color?: string;
};

const EventChipComponent = styled(Chip)`
  max-width: 14px;
  height: 14px;
  border-radius: 4px;
`;

export const EventChip = ({ color }: Props) => {
  return <EventChipComponent sx={{ backgroundColor: color }} />;
};
