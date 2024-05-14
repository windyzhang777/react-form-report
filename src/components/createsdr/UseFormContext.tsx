import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ISaveSdrValues, ISaveSfrValues } from "src/commons/types";

export interface IUseFormContextProps {
  setFormTouched: Dispatch<SetStateAction<boolean>>;
}

export const UseFormContext = ({ setFormTouched }: IUseFormContextProps) => {
  const { initialValues, values } = useFormikContext<ISaveSdrValues | ISaveSfrValues>();

  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      setFormTouched(true);
    }
  }, [values]);

  return null;
};
