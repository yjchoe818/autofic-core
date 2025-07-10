import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

export default styled(Select)(({ theme, ownerState }) => {
  const { palette, borders, functions } = theme;
  const { color } = ownerState;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  const backgroundColor = palette[color]?.main || palette.info.main;
  const textColor = "#fff";

  return {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius.lg,
    padding: pxToRem(8),
    fontSize: pxToRem(14),
    border: "none !important", 
    boxShadow: "none !important", 
    outline: "none !important",          

    '& .MuiSelect-select': {
      padding: `${pxToRem(10)} ${pxToRem(14)}`,
      color: textColor,
      backgroundColor,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },

    '& .MuiSvgIcon-root': {
      color: textColor,
    },
  };
});
