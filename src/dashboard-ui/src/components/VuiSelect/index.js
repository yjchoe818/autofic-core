import React from "react";
import PropTypes from "prop-types";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiSelectRoot from "./VuiSelectRoot";

function VuiSelect({ label, value, onChange, options, color = "info" }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <InputLabel
        sx={{
          color: "#fff",
          marginBottom: "4px",
          fontSize: "0.875rem",
        }}
      >
        {label}
      </InputLabel>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <VuiSelectRoot
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ "aria-label": label }}
          ownerState={{ color }}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </VuiSelectRoot>
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
