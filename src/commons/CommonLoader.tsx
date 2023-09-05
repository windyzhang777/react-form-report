import { Backdrop, CircularProgress } from "@mui/material";

const CommonLoader = () => {
  return (
    <Backdrop
      sx={{ color: "#6244bb", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CommonLoader;
