import { ReactNode } from "react";

export interface ITabPanelProps {
  children?: ReactNode;
  className?: string;
  index?: number;
  value: number;
}

const CommonTabPanel = ({ children, value, index, ...other }: ITabPanelProps) => (
  <div
    className={`${value !== index && "hidden"} pt-[30px] h-[90%] grow flex flex-col`}
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
      minWidth: "20%",
      width: "25%",
      // whiteSpace: "nowrap",
    },
  };
};

export default CommonTabPanel;
