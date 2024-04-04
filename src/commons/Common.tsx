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
