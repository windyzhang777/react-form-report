import { ListItem } from "@mui/material";
import { ReactNode } from "react";

export interface ICommonListItemProps {
  children: string | ReactNode;
  className?: string;
  required?: boolean;
}

const CommonListItem = ({ children, required, ...props }: ICommonListItemProps) => (
  <ListItem {...props}>
    {children}
    {required && <span className="required">&nbsp;&#42;</span>}
  </ListItem>
);

export default CommonListItem;
