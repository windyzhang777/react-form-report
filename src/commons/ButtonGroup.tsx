import { Button } from "@mui/material";
import { FlexRow } from "./Box";

export interface ICommonButtonGroupProps {
  className?: string;
  primarydisabled?: boolean;
  primaryLabel?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
}

const CommonButtonGroup = ({
  className,
  primarydisabled,
  primaryLabel,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
}: ICommonButtonGroupProps) => (
  <FlexRow className={`mx-2 my-2 gap-2 ${className}`}>
    {secondaryLabel && (
      <Button
        className={`${secondaryLabel.toLowerCase()}-button`}
        color="secondary"
        disabled={primarydisabled}
        onClick={secondaryOnClick}
        type="button"
      >
        {secondaryLabel}
      </Button>
    )}
    {primaryLabel && (
      <Button
        className={`${primaryLabel.toLocaleLowerCase()}-button`}
        onClick={primaryOnClick}
        type="submit"
      >
        {primaryLabel}
      </Button>
    )}
  </FlexRow>
);

export default CommonButtonGroup;
