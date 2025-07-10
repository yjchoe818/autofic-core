// components/VuiSelect/index.js

import React from "react";
import PropTypes from "prop-types";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import VuiBox from "components/VuiBox";

function VuiSelect({ label, value, onChange, options, color = "info" }) {
  const backgroundColors = {
    info: "#1e78ff",     // 파란 계열
    success: "#00b894",  // 에메랄드 계열
    dark: "#2c2c2c",
  };

  const bgColor = backgroundColors[color] || "#1e78ff";

  return (
    <VuiBox display="flex" flexDirection="column">
      <InputLabel sx={{ color: "#fff", marginBottom: "4px", fontSize: "0.875rem" }}>
        {label}
      </InputLabel>
      <FormControl
        sx={{
          minWidth: 120,
          borderRadius: "12px",
          backgroundColor: bgColor,
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "& .MuiSelect-select": {
            padding: "10px 14px",
            color: "#fff",
          },
          "& svg": {
            color: "#fff",
          },
        }}
        size="small"
      >
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ "aria-label": label }}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </VuiBox>
  );
}

VuiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
};

export default VuiSelect;
