import styled from "@emotion/styled";
import {
  FormControl,
  Select as MUISelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

export type CustomSelectProps = {
  onSelectOption?: (value: string) => void;
  variant?: SelectProps["variant"];
  minWidth?: number;
} & Omit<SelectProps, "variant">;

const SelectComponent = styled(MUISelect)`
  & > .MuiMenu-list {
    min-width: 150px;
  }
`;

export const Select = ({
  children,
  label,
  value,
  variant = "standard",
  minWidth = 120,
  onSelectOption,
}: CustomSelectProps) => {
  const handleOnChange = (event: SelectChangeEvent<unknown>) => {
    onSelectOption?.(event.target.value as string);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: minWidth }}>
      <SelectComponent
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        variant={variant}
        onChange={handleOnChange}
      >
        {children}
      </SelectComponent>
    </FormControl>
  );
};
