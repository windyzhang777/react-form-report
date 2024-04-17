import { ChangeEventHandler, Fragment } from "react";
import { FlexRow } from "src/commons/Box";
import TextField, { ICommonTextFieldProps } from "src/commons/TextField";
import { ISaveSfrValues } from "src/commons/types";

export interface ITextFieldGroupProps extends Partial<ICommonTextFieldProps> {
  count: number;
  maxAllowed?: number[];
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  values: ISaveSfrValues;
}

const TextFieldGroup = ({
  count,
  maxAllowed,
  name,
  values,
  onChange,
  ...props
}: ITextFieldGroupProps) => {
  return (
    <FlexRow className="mb-[5px]">
      {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
        <Fragment key={i}>
          <TextField
            className="1 1 25%"
            name={`${name}${i}`}
            placeholder={"x".repeat(maxAllowed?.[i - 1] || 4)}
            value={(values as any)[`${name}${i}`] || ""}
            onChange={onChange}
            inputProps={{
              maxLength: maxAllowed?.[i - 1] || "unset",
            }}
            {...props}
          />
          {i !== count && <span className="w-5 text-center">-</span>}
        </Fragment>
      ))}
    </FlexRow>
  );
};

export default TextFieldGroup;
