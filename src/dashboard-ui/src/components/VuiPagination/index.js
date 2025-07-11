import React from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

function VuiPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <VuiBox display="flex" justifyContent="center" mt={2} pb={2} gap={1}>
      {Array.from({ length: totalPages }, (_, i) => (
        <VuiButton
          key={i}
          variant={i + 1 === currentPage ? "contained" : "gradient"}
          color={i + 1 === currentPage ? "info" : "dark"}
          size="small"
          onClick={() => onPageChange(i + 1)}
          sx={{ minWidth: "36px", height: "36px", padding: "0" }}
        >
          {i + 1}
        </VuiButton>
      ))}
    </VuiBox>
  );
}

VuiPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default VuiPagination;
