import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";

import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [weeklyChartData, setWeeklyChartData] = useState([]);
  const [dailyChartData, setDailyChartData] = useState([]);
  const [prCount, setPrCount] = useState(null);

  const weeklyChartOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: {
      type: "category",
      labels: { style: { colors: "#fff", fontSize: "12px" } },
    },
    yaxis: {
      tickAmount: 5,
      forceNiceScale: true,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        formatter: (val) => (Number.isInteger(val) ? val : ""),
      },
    },
    tooltip: { theme: "dark" },
    stroke: { curve: "smooth" },
  };

  const dailyChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      type: "category",
      labels: { style: { colors: "#fff", fontSize: "12px" } },
    },
    yaxis: {
      tickAmount: 5,
      forceNiceScale: true,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        formatter: (val) => (Number.isInteger(val) ? val : ""),
      },
    },
    tooltip: { theme: "dark" },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "50%" },
    },
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboard_data.json`)
      .then((res) => res.json())
      .then((data) => {
        setPrCount(data.prCount);

        setWeeklyChartData([
          {
            name: "Weekly PRs",
            data: data.charts.weeklyPRs,
          },
        ]);

        setDailyChartData([
          {
            name: "Daily PRs",
            data: data.charts.dailyPRs.map((d) => ({ x: d.x, y: d.y })),
          },
        ]);
      })
      .catch((err) => console.error("dashboard_data.json 로딩 실패:", err));
  }, []);

  if (!prCount) return null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        {/* PR 통계 카드 3개 */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            {[
              {
                title: "Total PRs",
                count: prCount.total,
                icon: <span>📦</span>,
              },
              {
                title: "Daily PRs",
                count: prCount.daily,
                icon: <span>📅</span>,
              },
              {
                title: "Weekly PRs",
                count: prCount.weekly,
                icon: <span>📈</span>,
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%", minHeight: "110px" }}>
                  <MiniStatisticsCard
                    title={{ text: item.title }}
                    count={item.count}
                    percentage={{ color: "success", text: "+0%" }}
                    icon={{ color: "info", component: item.icon }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </VuiBox>

        {/* 그래프 2개 */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            {/* LineChart - Weekly */}
            <Grid item xs={12} md={7}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Weekly PR Overview
                </VuiTypography>
                <VuiTypography variant="button" color="success" fontWeight="bold" mb="20px">
                  +0%{" "}
                  <VuiTypography variant="button" color="text" fontWeight="regular">
                    compared to last week
                  </VuiTypography>
                </VuiTypography>
                <VuiBox sx={{ height: "220px" }}>
                  <LineChart
                    lineChartData={weeklyChartData}
                    lineChartOptions={weeklyChartOptions}
                  />
                </VuiBox>
              </Card>
            </Grid>

            {/* BarChart - Daily */}
            <Grid item xs={12} md={5}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Daily PR Overview
                </VuiTypography>
                <VuiTypography variant="button" color="success" fontWeight="bold" mb="20px">
                  +0%{" "}
                  <VuiTypography variant="button" color="text" fontWeight="regular">
                    compared to yesterday
                  </VuiTypography>
                </VuiTypography>

                <VuiBox
                  sx={{
                    height: "220px",
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    borderRadius: "20px",
                    overflow: "visible",
                  }}
                >
                  <BarChart
                    barChartData={dailyChartData}
                    barChartOptions={dailyChartOptions}
                  />
                </VuiBox>
              </Card>
            </Grid>

          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
