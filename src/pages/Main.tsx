import { Box } from "@mui/material";
import { MainHeader } from "../features/main-header/components/MainHeader";
import { useDispatch } from "react-redux";
import { createYear } from "../features/scheduler/store/slice";

export const Main = () => {
  const dispatch = useDispatch();
  dispatch(createYear(5));
  return (
    <Box>
      <MainHeader />
    </Box>
  );
};
