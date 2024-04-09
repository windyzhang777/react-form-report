import { ChangeEventHandler, FocusEventHandler, Fragment } from "react";
import { FlexRow } from "src/commons/Box";
import TextField, { ICommonTextFieldProps } from "src/commons/TextField";
import { ISaveSfrValues } from "./types";

export interface ITextFieldGroupProps extends Partial<ICommonTextFieldProps> {
  count: number;
  name: string;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  values: ISaveSfrValues;
}

const TextFieldGroup = ({ count, name, values, ...props }: ITextFieldGroupProps) => {
  return (
    <FlexRow className="mb-[5px]">
      {Array.from({ length: count }, (_, i) => i + 1).map((a, i) => (
        <Fragment key={i}>
          <TextField
            className=""
            name={name + a}
            placeholder="xx"
            value={(values as any)[name + a] || ""}
            {...props}
          />
          {i + 1 !== count && <>&nbsp;-&nbsp;</>}
        </Fragment>
      ))}
    </FlexRow>
  );
};

export default TextFieldGroup;
