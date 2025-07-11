import React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function AnalysisCard({ selectedRepo }) {
  if (!selectedRepo) return null;

  return (
    <Card
      sx={{
        borderRadius: "20px",
        p: 3,
        background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc) !important",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4) !important",
      }}
    >

      <VuiBox>

        {/* Section Title */}
        <VuiTypography
          fontWeight="bold"
          color="white"
          mb={1}
          sx={{ fontSize: "1.4rem" }}  // 약 22px
        >
          Repository Analysis Overview
        </VuiTypography>

        <Divider sx={{ my: 2, borderColor: "#555" }} />

        {/* Each field with label and value */}
        <VuiTypography color="white" mb={1} sx={{ fontSize: "1rem" }}>
          🔗 <strong style={{ fontSize: "1rem" }}>Repository : </strong>{" "}
          <a
            href={selectedRepo.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#42a5f5", fontSize: "1rem", fontWeight: 500 }}
          >
            {selectedRepo.name}
          </a>
        </VuiTypography>

        <VuiTypography color="white" mb={1} sx={{ fontSize: "1rem" }}>
          ⚠️ <strong>Detected Vulnerabilities : </strong> {selectedRepo.vulnerabilities}
        </VuiTypography>

        <VuiTypography color="white" mb={1} sx={{ fontSize: "1rem" }}>
          🛠️ <strong>SAST Tool : </strong> {selectedRepo.sastTool}
        </VuiTypography>

        <VuiTypography color="white" mb={1} sx={{ fontSize: "1rem" }}>
          🔄 <strong>Reanalyzed : </strong> {selectedRepo.rerun ? "Yes" : "No"}
        </VuiTypography>

        {/* Detail Section */}
        {selectedRepo.analysis && (
          <>
            <Divider sx={{ my: 2, borderColor: "#555" }} />
            <VuiTypography
              fontWeight="bold"
              color="white"
              mb={1}
              sx={{ fontSize: "1.1rem" }} // 약 17.6px
            >
              📄 Details
            </VuiTypography>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                color: "#cfd8dc",
                background: "#0b1437",
                padding: "1em",
                borderRadius: "10px",
                overflowX: "auto",
                fontFamily: "'Fira Code', 'Noto Sans KR', monospace",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              {selectedRepo.analysis}
            </pre>
          </>
        )}
      </VuiBox>
    </Card>
  );
}

export default AnalysisCard;
