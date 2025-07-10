import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import VuiSelect from "components/VuiSelect";

function Tables() {
  const [repoColumns, setRepoColumns] = useState([]);
  const [repoRows, setRepoRows] = useState([]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // 정렬 상태
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // 필터 상태
  const [selectedTool, setSelectedTool] = useState("All");
  const [selectedRerun, setSelectedRerun] = useState("All");
  const toolOptions = ["All", "Semgrep", "Snyk Code", "CodeQL", "ESLint"];
  const rerunOptions = ["All", "Yes", "No"];

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboard_data.json`)
      .then((res) => res.json())
      .then((data) => {
        setRepoColumns([
          { name: "name", align: "left", width: "15%" },
          { name: "vulnerabilities", align: "center", width: "10%" },
          { name: "changes", align: "center", width: "10%" },
          { name: "sastTool", align: "center", width: "15%" },
          { name: "rerun", align: "center", width: "10%" },
          { name: "url", align: "left", width: "40%" },
        ]);

        setRepoRows(
          data.repos.map((repo) => ({
            name: repo.name,
            vulnerabilities: repo.vulnerabilities,
            changes: repo.changes,
            sastTool: repo.sastTool || "N/A",
            rerun: repo.rerun ? "Yes" : "No",
            url: (
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#5e72e4", wordBreak: "break-all" }}
              >
                {repo.url}
              </a>
            ),
          }))
        );
      })
      .catch((err) => console.error("dashboard_data.json 로딩 실패:", err));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredRows = repoRows.filter((row) => {
    const sastToolMatch =
      selectedTool === "All" ? true : row.sastTool === selectedTool;
    const rerunMatch =
      selectedRerun === "All" ? true : row.rerun === selectedRerun;
    return sastToolMatch && rerunMatch;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = Number(a[sortKey]);
    const valB = Number(b[sortKey]);
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
              <VuiTypography variant="lg" color="white">
                Repositories Table
              </VuiTypography>
            </VuiBox>

            {/* ✅ 정렬 버튼 + 필터 드롭다운 레이아웃 */}
            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
              px={3}
            >
              {/* Sort Buttons */}
              <VuiBox display="flex" gap={2} flexWrap="wrap">
                <VuiButton
                  color="info"
                  size="small"
                  onClick={() => handleSort("vulnerabilities")}
                >
                  Sort by Vulnerabilities
                  {sortKey === "vulnerabilities" ? ` (${sortOrder})` : ""}
                </VuiButton>

                <VuiButton
                  color="primary"
                  size="small"
                  onClick={() => handleSort("changes")}
                >
                  Sort by Changes
                  {sortKey === "changes" ? ` (${sortOrder})` : ""}
                </VuiButton>
              </VuiBox>

              {/* Filters */}
              <VuiBox display="flex" gap={2} flexWrap="wrap">
                <VuiSelect
                  label="SAST Tool"
                  value={selectedTool}
                  onChange={(e) => {
                    setSelectedTool(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={toolOptions}
                  color="info"
                />
                <VuiSelect
                  label="Rerun"
                  value={selectedRerun}
                  onChange={(e) => {
                    setSelectedRerun(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={rerunOptions}
                  color="primary"
                />
              </VuiBox>
            </VuiBox>

            {/* ✅ 테이블 */}
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={repoColumns} rows={paginatedRows} />
            </VuiBox>

            {/* ✅ 페이지네이션 */}
            <VuiBox display="flex" justifyContent="center" mt={2} pb={2} gap={1}>
              {Array.from({ length: totalPages }, (_, i) => (
                <VuiButton
                  key={i}
                  variant={i + 1 === currentPage ? "contained" : "gradient"}
                  color={i + 1 === currentPage ? "info" : "dark"}
                  size="small"
                  onClick={() => setCurrentPage(i + 1)}
                  sx={{ minWidth: "36px", height: "36px", padding: "0" }}
                >
                  {i + 1}
                </VuiButton>
              ))}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;