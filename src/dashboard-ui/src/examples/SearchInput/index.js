import React from "react";
import PropTypes from "prop-types";
import VuiInput from "components/VuiInput";

function SearchInput({ value, onChange, onSearch, placeholder }) {
  return (
    <VuiInput
      placeholder={placeholder}
      icon={{ component: "search", direction: "left" }}
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch();
      }}
      sx={({ breakpoints }) => ({
        [breakpoints.down("sm")]: {
          maxWidth: "100%",
        },
        backgroundColor: "#1E2A58",
        color: "#ffffff",
        "& input": {
          color: "#ffffff",
        },
      })}
    />
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: "Search...",
};

export default SearchInput;
