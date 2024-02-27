import { Box } from "@mui/material";
import { TabPanelProps } from "src/commons/types";

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    // hidden={value !== index}
    id={`simple-tabpanel-${value}`}
    aria-labelledby={`simple-tab-${value}`}
    {...other}
  >
    {/* {value === index && (
      <Box sx={{ padding: "30px 0 0" }}>
        <Box>{children}</Box>
      </Box>
    )} */}
    <Box sx={{ padding: "30px 0 0" }}>
      <Box>{children}</Box>
    </Box>
  </div>
);

export default TabPanel;
