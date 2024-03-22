import { Button } from "@mui/material";
import { FlexRow } from "./Box";

export interface ICommonButtonGroupProps {
  className?: string;
  primaryDisabled?: boolean;
  primaryLabel?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
}

const CommonButtonGroup = ({
  className,
  primaryDisabled,
  primaryLabel,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
}: ICommonButtonGroupProps) => (
  <FlexRow className={`p-2 gap-2 ${className}`}>
    {secondaryLabel && (
      <Button
        className={`${secondaryLabel.toLowerCase().split(" ").join("-")}-button`}
        color="secondary"
        disabled={primaryDisabled}
        onClick={secondaryOnClick}
        type="button"
      >
        {secondaryLabel}
      </Button>
    )}
    {primaryLabel && (
      <Button
        className={`${primaryLabel.toLocaleLowerCase().split(" ").join("-")}-button`}
        onClick={primaryOnClick}
        type="submit"
      >
        {primaryLabel}
      </Button>
    )}
  </FlexRow>
);

export default CommonButtonGroup;
