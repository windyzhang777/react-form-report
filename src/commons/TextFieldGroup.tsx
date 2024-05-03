import { FormHelperText } from "@mui/material";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { get } from "lodash";
import { ChangeEventHandler, FocusEventHandler, Fragment } from "react";
import { FlexColumn, FlexRow } from "src/commons/Box";
import TextField, { ICommonTextFieldProps } from "src/commons/TextField";
import { ISaveSfrValues } from "src/commons/types";
import { removeNonAlphaNumeric } from "src/validationSchema";

export interface ITextFieldGroupProps extends Partial<ICommonTextFieldProps> {
  count: number;
  disables?: boolean[];
  errors?: FormikErrors<ISaveSfrValues> & { [key: string]: any };
  maxAllowed: number[];
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  path?: string;
  touched?: FormikTouched<ISaveSfrValues> & { [key: string]: any };
  values: ISaveSfrValues & { [key: string]: any };
}

const TextFieldGroup = ({
  count,
  disables,
  errors,
  maxAllowed,
  name,
  onChange,
  path,
  touched,
  values,
  ...props
}: ITextFieldGroupProps) => {
  const { setFieldValue } = useFormikContext<ISaveSfrValues>();

  const error = Array.from({ length: count }, (_, i) => i + 1).some(
    (i) =>
      touched?.[`${name}${i}`] && (errors?.[`${name}${i}`] || (path && errors && get(errors, path)))
  );
  const helperText = path && errors && get(errors, path);

  return (
    <FlexColumn>
      <FlexRow className="mb-[5px] relative">
        {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
          <Fragment key={i}>
            <TextField
              className="1 1 25%"
              disabled={disables?.[i - 1] || false}
              name={`${name}${i}`}
              placeholder={"x".repeat(maxAllowed?.[i - 1] || 4)}
              value={values?.[`${name}${i}`] || ""}
              onChange={(e) => setFieldValue(`${name}${i}`, removeNonAlphaNumeric(e.target.value))}
              // error={
              //   values?.[`${name}${i}`].length < maxAllowed?.[i - 1] &&
              //   path &&
              //   errors &&
              //   get(errors, path)
              // }
              inputProps={{
                maxLength: maxAllowed?.[i - 1] || "unset",
              }}
              {...props}
            />
            {i !== count && <span className="w-5 text-center">-</span>}
          </Fragment>
        ))}
      </FlexRow>
      {error && (
        <FormHelperText className="absolute bottom-[-18px]" error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FlexColumn>
  );
};

export default TextFieldGroup;
