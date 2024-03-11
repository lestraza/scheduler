import { Button, IconButton as MUIIconButton, Stack } from "@mui/material";
import { Header } from "../../shared/components/header/Header";
import { ReactComponent as MenuIcon } from "../../shared/icons/menu.svg";
import { ReactComponent as ChevronLeftIcon } from "../../shared/icons/chevron_left.svg";
import { ReactComponent as ChevronRightIcon } from "../../shared/icons/chevron_right.svg";
import { colors } from "../../shared/styles";
import styled from "@emotion/styled";

const StyledMenuIcon = styled(MenuIcon)`
  fill: ${colors.grey.main};
`;

const IconButton = styled(MUIIconButton)`
  min-width: 48px;
`;

export const MainHeader = () => {
  return (
    <Header>
      <Stack direction="row" gap="8px">
        <IconButton>
          <StyledMenuIcon />
        </IconButton>
        <Stack alignSelf="center" fontSize="1.2rem">
          Calendar
        </Stack>
      </Stack>
      <Stack direction="row">
        <Button variant="text">Today</Button>
        <Stack direction="row" minWidth="80px">
          <IconButton>
            <ChevronLeftIcon fill={colors.grey.main} />
          </IconButton>
          <IconButton>
            <ChevronRightIcon fill={colors.grey.main} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack alignSelf="center">2024</Stack>
    </Header>
  );
};
