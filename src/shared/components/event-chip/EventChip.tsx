import styled from "@emotion/styled";
import { Chip, ChipProps } from "@mui/material";
import { EventVariant } from "../../types";

type Props = {
  type?: EventVariant;
} & ChipProps;

const EventChipComponent = styled(Chip)`
  max-width: 14px;
  height: 14px;
  border-radius: 4px;
`;

export const EventChip = ({ type = EventVariant.Event }: Props) => {
  return <EventChipComponent color={type} />;
};
