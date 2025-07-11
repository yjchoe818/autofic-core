import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

function FilterDropdown({ label, value, onChange, options, bgColor = "#1e88e5" }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        marginRight: "16px",
        minWidth: "180px",
      }}
    >
      <Box
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
          marginRight: "8px",
        }}
      >
        {label}:
      </Box>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{
            sx: {
              backgroundColor: `${bgColor} !important`,
              color: "#fff !important",
              fontWeight: "bold",
              borderRadius: "10px",
              height: "36px",
              padding: "0 12px",
              "& .MuiSelect-icon": {
                color: "#fff !important",
              },
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#0d1c3f",
                color: "#fff",
                fontWeight: "bold",
              },
            },
          }}
          sx={{
            backgroundColor: `${bgColor} !important`,
            color: "#fff !important",
            borderRadius: "10px",
            fontWeight: "bold",
            height: "36px",
            "& .MuiSelect-icon": {
              color: "#fff !important",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}
            sx={{
            py: 1.2, // 상하 padding
            px: 2,   // 좌우 padding
            minHeight: "36px", // 클릭 영역 보장
        }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterDropdown;
