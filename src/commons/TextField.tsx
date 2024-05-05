import { InputBaseComponentProps, TextField } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  ReactNode,
} from "react";

export interface ICommonTextFieldProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  inputProps?: InputBaseComponentProps;
  maxRows?: number;
  multiline?: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  placeholder?: string;
  rows?: number;
  type?: HTMLInputTypeAttribute;
  value: unknown;
}

const CommonTextField = ({ placeholder, type, ...props }: ICommonTextFieldProps) => {
  let placeholderText = "Enter text here";
  switch (type) {
    case "number":
      placeholderText = "Enter number here";
      break;
    case "text":
    default:
      placeholderText = "Enter text here";
      break;
  }
  return (
    <TextField
      placeholder={props.disabled ? "" : placeholder || placeholderText}
      size={"small"}
      type={type || "text"}
      {...props}
    />
  );
};

export interface IClickableTextFieldProps extends Partial<ICommonTextFieldProps> {
  onClick: () => void;
}

export const ClickableTextField = ({ className, ...props }: IClickableTextFieldProps) => {
  return <TextField className={`cursor-pointer ${className}`} size={"small"} {...props} />;
};

export default CommonTextField;
