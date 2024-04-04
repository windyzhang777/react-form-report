import { ReactNode } from "react";

export interface ITabPanelProps {
  children?: ReactNode;
  className?: string;
  index?: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: ITabPanelProps) => (
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

export default TabPanel;
