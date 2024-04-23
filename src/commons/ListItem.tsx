import { ListItem } from "@mui/material";
import { ReactNode } from "react";

export interface ICommonListItemProps {
  children: string | ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const CommonListItem = ({
  className,
  children,
  disabled,
  required,
  ...props
}: ICommonListItemProps) => (
  <ListItem className={`${disabled && "text-[#00000061]"} ${className}`} {...props}>
    {children}
    {required && <span className="required">&nbsp;&#42;</span>}
  </ListItem>
);

export default CommonListItem;
