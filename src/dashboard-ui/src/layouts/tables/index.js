import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import VuiPagination from "components/VuiPagination";
import SortButtons from "layouts/tables/components/SortButtons";
import FilterDropdown from "layouts/tables/components/FilterDropdown";

function Tables() {
  const [repoColumns, setRepoColumns] = useState([]);
  const [repoRows, setRepoRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedTool, setSelectedTool] = useState("All");
  const [selectedRerun, setSelectedRerun] = useState("All");

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
      .catch((err) => console.error("dashboard_data.json 로드 실패:", err));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const filteredRows = repoRows.filter((row) => {
    const matchTool = selectedTool === "All" || row.sastTool === selectedTool;
    const matchRerun = selectedRerun === "All" || row.rerun === selectedRerun;
    return matchTool && matchRerun;
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
          <Card
            sx={{
              background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc) !important",
              borderRadius: "20px !important",
              padding: "24px !important",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3) !important",
              overflow: "hidden !important",
            }}
          >
            {/* 타이틀 */}
            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={2}
              sx={{ backgroundColor: "transparent !important" }}
            >
              <VuiTypography variant="lg" color="white">
                Repositories Table
              </VuiTypography>
            </VuiBox>

            {/* 정렬 및 필터 */}
            <VuiBox
              display="flex"
              gap={2}
              flexWrap="wrap"
              px={3}
              py={1}
              sx={{ backgroundColor: "transparent !important" }}
            >
              <SortButtons handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
              <FilterDropdown
                label="SAST Tool"
                value={selectedTool}
                options={["All", "Semgrep", "CodeQL", "Snyk Code", "ESLint"]}
                onChange={(e) => setSelectedTool(e.target.value)}
              
              />
              <FilterDropdown
                label="Rerun"
                value={selectedRerun}
                options={["All", "Yes", "No"]}
                onChange={(e) => setSelectedRerun(e.target.value)}
              />
            </VuiBox>

            {/* 테이블 */}
            <VuiBox
              sx={{
                backgroundColor: "transparent !important",
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child) td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              }}
            >
              <Table columns={repoColumns} rows={paginatedRows} />
            </VuiBox>

            {/* 페이지네이션 */}
            <VuiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
