import { Box } from "@mui/material";
import { MainHeader } from "../features/main-header/components/MainHeader";
import { useDispatch } from "react-redux";
import { createYear } from "../features/scheduler/store/slice";
import { Scheduler } from "../features/scheduler/components";

export const Main = () => {
  const dispatch = useDispatch();
  dispatch(createYear(5));
  return (
    <Box>
      <MainHeader />
      <Scheduler />
    </Box>
  );
};
