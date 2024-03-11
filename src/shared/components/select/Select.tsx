import {
  Select as MUISelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

export type CustomSelectProps = {
  onSelectOption?: (value: string) => void;
} & SelectProps;
export const Select = ({
  children,
  label,
  value,
  onSelectOption,
}: CustomSelectProps) => {
  const handleOnChange = (event: SelectChangeEvent<unknown>) => {
    onSelectOption?.(event.target.value as string);
  };
  return (
    <MUISelect
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={handleOnChange}
    >
      {children}
    </MUISelect>
  );
};
