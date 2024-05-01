import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuProps,
} from "@mui/material";
import { Icon, IconName } from "../icon";

export type MenuOption = {
  icon: IconName;
} & Option;

type CustomMenuProps = {
  options: MenuOption[];
  top?: number;
  left?: number;
} & MenuProps;

export const Menu = ({ options, top, left }: CustomMenuProps) => {
  return (
    <Card sx={{ zIndex: 5, position: "absolute", top, left }}>
      <List>
        {options.map((option) => (
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: "4px" }}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <Icon icon={option.icon} />
              </ListItemIcon>
              <ListItemText primary={String(option.label)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
