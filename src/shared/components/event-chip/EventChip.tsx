import styled from "@emotion/styled";
import { Chip, ChipProps } from "@mui/material";
import { EventType } from "../../types";

type Props = {
  type?: EventType;
} & ChipProps;

const EventChipComponent = styled(Chip)`
  max-width: 14px;
  height: 14px;
  border-radius: 4px;
`;

export const EventChip = ({ type = EventType.Event }: Props) => {
  return <EventChipComponent color={type} />;
};
