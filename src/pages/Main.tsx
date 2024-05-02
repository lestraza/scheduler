import { Box } from "@mui/material";
import { MainHeader } from "../features/main-header/components/MainHeader";
import { Scheduler } from "../features/scheduler/components";

export const Main = () => {
 
  return (
    <Box>
      <MainHeader />
      <Scheduler />
    </Box>
  );
};
