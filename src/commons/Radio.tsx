import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";
import { ReactNode } from "react";

export interface ICommonRadioProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  name: string;
  onChange: (value: string) => void;
  options: string[];
  value: unknown;
}

const CommonRadio = ({
  error,
  helperText,
  name,
  onChange,
  options,
  value,
  ...props
}: ICommonRadioProps) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={`${name}-radio-buttons-group`}
        onChange={(e) => onChange(e.target.value)}
        row
        value={value ? value : options[0]}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export interface ISimpleRadioProps extends Omit<ICommonRadioProps, "options"> {}

export const SimpleRadio = ({
  disabled,
  error,
  helperText,
  name,
  onChange,
  ...props
}: ISimpleRadioProps) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={`${name}-radio-buttons-group`}
        onChange={(e) => onChange(e.target.value)}
        row
        {...props}
      >
        {[true, false].map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option ? "Yes" : "No"}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CommonRadio;
