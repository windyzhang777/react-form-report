import { Button, FormHelperText } from "@mui/material";
import { FlexRow } from "src/commons/Box";

export interface ICommonButtonGroupProps {
  className?: string;
  errorMessage?: string;
  primaryDisabled?: boolean;
  primaryLabel?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
}

const CommonButtonGroup = ({
  className,
  errorMessage,
  primaryDisabled,
  primaryLabel,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
}: ICommonButtonGroupProps) =>
  primaryLabel || secondaryLabel ? (
    <FlexRow className={`p-2 gap-2 ${className}`}>
      {errorMessage && (
        <FormHelperText className="max-w-xs break-all" error={!!errorMessage}>
          *&nbsp;{errorMessage}
        </FormHelperText>
      )}
      {secondaryLabel && (
        <Button
          className={`${secondaryLabel.toLowerCase().split(" ").join("-")}-button`}
          color="secondary"
          onClick={secondaryOnClick}
          type="button"
        >
          {secondaryLabel}
        </Button>
      )}
      {primaryLabel && (
        <Button
          className={`${primaryLabel.toLocaleLowerCase().split(" ").join("-")}-button`}
          disabled={primaryDisabled}
          onClick={primaryOnClick}
          type="submit"
        >
          {primaryLabel}
        </Button>
      )}
    </FlexRow>
  ) : null;

export default CommonButtonGroup;
