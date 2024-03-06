import { Button } from "@mui/material";
import { FlexRow } from "./Box";

export interface ICommonButtonGroupProps {
  labelPrimary: string;
  labelSecondary: string;
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  placeEnd?: boolean;
}

const CommonButtonGroup = ({
  labelPrimary,
  labelSecondary,
  onClickPrimary,
  onClickSecondary,
  placeEnd,
}: ICommonButtonGroupProps) => (
  <FlexRow placeEnd={placeEnd} mx={2} my={2}>
    <Button
      className={`${labelSecondary.toLowerCase()}-button`}
      color="secondary"
      onClick={onClickSecondary}
    >
      {labelSecondary}
    </Button>
    <Button
      className={`${labelPrimary.toLocaleLowerCase()}-button`}
      onClick={onClickPrimary}
    >
      {labelPrimary}
    </Button>
  </FlexRow>
);

export default CommonButtonGroup;
