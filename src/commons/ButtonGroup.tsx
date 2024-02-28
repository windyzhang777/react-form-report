import { FlexRow } from "./Box";
import StyledButton from "./Button";

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
  <FlexRow placeEnd={placeEnd}>
    <StyledButton
      className={`${labelSecondary.toLowerCase()}-button`}
      onClick={onClickSecondary}
      secondary={true}
    >
      {labelSecondary}
    </StyledButton>
    <StyledButton
      className={`${labelPrimary.toLocaleLowerCase()}-button`}
      onClick={onClickPrimary}
    >
      {labelPrimary}
    </StyledButton>
  </FlexRow>
);

export default CommonButtonGroup;
