/*!
=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Vision UI Dashboard React are added here.
  You can add, customize, or delete routes in this file.

  Routes with `type: "collapse"` will appear in the sidebar menu.
*/

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import AnalysisDetails from "layouts/analysis";

import { IoHome, IoStatsChart, IoAnalytics } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Analysis",
    key: "analysis",
    route: "/analysis",
    icon: <IoAnalytics size="15px" color="inherit" />,
    component: AnalysisDetails,
    noCollapse: true,
  },
];

export default routes;
