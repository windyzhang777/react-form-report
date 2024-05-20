import { ReactNode } from "react";
import { FlexRow } from "src/commons/Box";

export interface ITabPanelProps {
  children?: ReactNode;
  className?: string;
  index?: number;
  value: number;
}

const CommonTabPanel = ({ children, className, value, index, ...other }: ITabPanelProps) => (
  <div
    className={`${value !== index && "hidden"} pt-[30px] h-[90%] grow flex flex-col ${className}`}
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && children}
  </div>
);

export const a11yProps = (name: string, index: number) => {
  return {
    id: `esfr-${name}-tabs-${index}`,
    "aria-controls": `esfr-${name}-tabpanels-${index}`,
    sx: {
      color: "#666666",
      fontWeight: 500,
      fontSize: "16px",
      textTransform: "capitalize",
      minWidth: "33%",
      width: "25%",
      // whiteSpace: "nowrap",
    },
  };
};

export interface ITabLabelProps {
  label: string;
  hasError?: boolean;
}

export const TabLabel = ({ label, hasError = false }: ITabLabelProps) => (
  <FlexRow className="gap-1">
    {label}
    {hasError && <p className="required">*</p>}
  </FlexRow>
);

export default CommonTabPanel;
