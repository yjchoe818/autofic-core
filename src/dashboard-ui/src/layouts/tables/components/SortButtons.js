// SortButtons.js
import React from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

function SortButtons({ handleSort, sortKey, sortOrder }) {
  const getArrow = (key) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <VuiBox display="flex" gap={2} flexWrap="wrap" px={3} py={1}>
      <VuiButton color="info" size="small" onClick={() => handleSort("vulnerabilities")}> 
        Sort by Vulnerabilities{getArrow("vulnerabilities")}
      </VuiButton>
      <VuiButton color="primary" size="small" onClick={() => handleSort("changes")}> 
        Sort by Changes{getArrow("changes")}
      </VuiButton>
    </VuiBox>
  );
}

SortButtons.propTypes = {
  handleSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string,
  sortOrder: PropTypes.string,
};

export default SortButtons;