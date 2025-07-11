import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SearchInput from "examples/SearchInput";

import AnalysisCard from "./components/AnalysisCard";

function Analysis() {
  const [url, setUrl] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);

  // dashboard_data.json 불러오기
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboard_data.json`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
      })
      .catch((err) => {
        console.error("JSON fetch 에러:", err);
      });
  }, []);

  // 검색 실행
  const handleSearch = () => {
    const cleanedUrl = url.trim();
    if (!dashboardData || !dashboardData.repos) return;

    const match = dashboardData.repos.find((repo) => repo.url === cleanedUrl);
    setSelectedRepo(match || null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container spacing={3} direction="column">
          {/* 입력 영역 */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{
            borderRadius: "20px",
            p: 3,
            background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc) !important",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4) !important",
            }}
            >
              <VuiTypography variant="lg" fontWeight="bold" color="white" mb={2}>
                Enter GitHub Repository URL
              </VuiTypography>
              <VuiBox>
                <SearchInput
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onSearch={handleSearch}
                placeholder="https://github.com/..."
              />
              </VuiBox>
            </Card>
          </Grid>

          {/* 결과 영역 */}
          <Grid item xs={12} md={10} lg={8}>
            <AnalysisCard selectedRepo={selectedRepo} />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analysis;
