import { Link } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface ICommonLinkProps {
  children: ReactNode;
  onClick?: () => void;
  to: string;
}

const CommonLink = ({ children, ...props }: ICommonLinkProps) => {
  return (
    <Link component={RouterLink} {...props}>
      {children}
    </Link>
  );
};

export default CommonLink;
