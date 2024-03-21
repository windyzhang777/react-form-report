import { ReactNode } from "react";

export interface ITabPanelProps {
  children?: ReactNode;
  className?: string;
  index?: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: ITabPanelProps) => (
  <div
    role="tabpanel"
    // hidden={value !== index}
    id={`simple-tabpanel-${value}`}
    aria-labelledby={`simple-tab-${value}`}
    {...other}
  >
    {children}
  </div>
);

export default TabPanel;
