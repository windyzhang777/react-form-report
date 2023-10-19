import { Box } from "@mui/material";
import { TabPanelProps } from "./types";


const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${value}`}
            aria-labelledby={`simple-tab-${value}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: "30px 0 0" }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
};

export default TabPanel;