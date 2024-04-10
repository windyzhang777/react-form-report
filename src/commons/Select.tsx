import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  MenuProps as MenuPropsType,
  OutlinedInput,
  Radio,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FocusEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import { OptionDocument } from "src/types/GetSfrMasterDataRes";

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 8;
const MenuProps: Partial<MenuPropsType> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
      display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
    },
  },
  MenuListProps: {
    style: {
      flexGrow: 1,
    },
  },
};

export interface ICommonSelectProps {
  className?: string;
  error?: boolean;
  helperText?: ReactNode;
  id: string;
  name: string;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}

export interface ISimpleSingleSelectProps extends ICommonSelectProps {
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[] | undefined;
  value: string;
}

export const SimpleSingleSelect = ({
  className,
  id,
  options,
  helperText,
  value,
  ...props
}: ISimpleSingleSelectProps) => (
  <Box className={className} sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel
        variant="outlined"
        shrink={false}
        sx={{
          color: value ? "transparent !important" : "rgba(0, 0, 0, 0.6) !important",
          marginTop: "-8px",
        }}
      >
        All
      </InputLabel>
      <Select displayEmpty id={id && id + "-simple-single-select"} value={value} {...props}>
        {!options ? (
          <Box>No options available</Box>
        ) : (
          options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        )}
      </Select>
      {props.error && <FormHelperText error={props.error}>{helperText}</FormHelperText>}
    </FormControl>
  </Box>
);

export interface ISingleSelectProps extends ICommonSelectProps {
  defaultValue?: string;
  onChange: (event: SelectChangeEvent<number | string>) => void;
  options: OptionDocument[] | undefined;
  value: string | number;
}

export const SingleSelect = ({
  className,
  defaultValue,
  helperText,
  id,
  options,
  value,
  ...props
}: ISingleSelectProps) => (
  <Box className={className} sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      {!value && value !== 0 && (
        <InputLabel
          variant="outlined"
          shrink={false}
          sx={{
            color: value ? "transparent !important" : "rgba(0, 0, 0, 0.6) !important",
            marginTop: "-8px",
          }}
        >
          {defaultValue ? defaultValue : "Select One"}
        </InputLabel>
      )}
      <Select
        {...props}
        displayEmpty
        id={id && id + "-single-select"}
        MenuProps={MenuProps}
        renderValue={(selected) => options?.find((option) => option.Id == selected)?.Description}
        value={value}
      >
        {!options ? (
          <Box>No options available</Box>
        ) : (
          options.map((option) => (
            <MenuItem key={option.Id} value={option.Id}>
              <FormControlLabel
                value={option.Id}
                control={<Radio className="!py-1 !pr-1" checked={option.Id === value} />}
                label={option.Description}
              />
            </MenuItem>
          ))
        )}
      </Select>
      {props.error && <FormHelperText error={props.error}>{helperText}</FormHelperText>}
    </FormControl>
  </Box>
);

export interface ISimpleMultipleSelectProps extends ICommonSelectProps {
  maxAllowed?: number;
  onChange: (value: string | string[]) => void;
  options: OptionDocument[] | undefined;
  value: string[];
}

export const SimpleMultipleSelect = ({
  className,
  helperText,
  id,
  onChange,
  options,
  maxAllowed = options?.length || 0,
  value,
  ...props
}: ISimpleMultipleSelectProps) => (
  <Box className={className} sx={{ minWidth: 120 }}>
    <FormControl sx={{ width: "100%" }}>
      {maxAllowed && (
        <InputLabel
          variant="outlined"
          shrink={false}
          sx={{
            color: value.length > 0 ? "transparent !important" : "rgba(0, 0, 0, 0.6) !important",
            marginTop: "-8px",
          }}
        >
          Select up to {maxAllowed} options
        </InputLabel>
      )}
      <Select
        displayEmpty
        id={id && id + "-multiple-select"}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        multiple
        onChange={(e) => {
          if (value.length < maxAllowed) {
            onChange(e.target.value);
          } else {
            onChange(e.target.value.slice(0, maxAllowed));
          }
        }}
        renderValue={(selected) => selected.join(", ")}
        value={value}
        {...props}
      >
        {!options ? (
          <Box>No options available</Box>
        ) : (
          options.map((option) => (
            <MenuItem className="!pl-0 !pr-5" key={option.Description} value={option.Description}>
              <Checkbox className="!py-1 !pr-1" checked={value.indexOf(option.Description) > -1} />
              <ListItemText primary={option.Description} />
            </MenuItem>
          ))
        )}
      </Select>
      {props.error && <FormHelperText error={props.error}>{helperText}</FormHelperText>}
    </FormControl>
  </Box>
);

export interface IMultipleSelectProps extends ICommonSelectProps {
  maxAllowed?: number;
  onChange: (value: string | number[]) => void;
  options: OptionDocument[] | undefined;
  value: number[];
}

export const MultipleSelect = ({
  className,
  helperText,
  id,
  onChange,
  options,
  maxAllowed = options?.length || 0,
  value,
  ...props
}: IMultipleSelectProps) => (
  <Box className={className} sx={{ minWidth: 120 }}>
    <FormControl sx={{ width: "100%" }}>
      {maxAllowed && (
        <InputLabel
          variant="outlined"
          shrink={false}
          sx={{
            color: value.length > 0 ? "transparent !important" : "rgba(0, 0, 0, 0.6) !important",
            marginTop: "-8px",
          }}
        >
          Select up to {maxAllowed} options
        </InputLabel>
      )}
      <Select
        displayEmpty
        id={id && id + "-multiple-select"}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        multiple
        onChange={(e) => {
          if (value.length < maxAllowed) {
            onChange(e.target.value);
          } else {
            onChange(e.target.value.slice(0, maxAllowed));
          }
        }}
        renderValue={(selected) =>
          selected.map((v) => options?.find((option) => option.Id === v)?.Description).join(", ")
        }
        value={value}
        {...props}
      >
        {!options ? (
          <Box>No options available</Box>
        ) : (
          options.map((option) => (
            <MenuItem className="!pl-0 !pr-5" key={option.Id} value={option.Id}>
              <Checkbox className="!py-1 !pr-1" checked={value.indexOf(option.Id) > -1} />
              <ListItemText primary={option.Description} />
            </MenuItem>
          ))
        )}
      </Select>
      {props.error && <FormHelperText error={props.error}>{helperText}</FormHelperText>}
    </FormControl>
  </Box>
);
