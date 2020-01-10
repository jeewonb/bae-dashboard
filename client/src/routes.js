/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Logs from "views/Logs/Logs.js";
import Typography from "views/Typography/Typography.js";
import Systems from "views/Systems/Systems.js";
import Servers from "views/Servers/Servers.js";
import Processes from "views/Processes/Processes.js";
import Users from "views/Users/Users.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "대시보드",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "통합 관리",
    icon: Person,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/systems",
    name: "통합 - 시스템 관리",
    icon: BubbleChart,
    component: Systems,
    layout: "/admin"
  },
  {
    path: "/servers",
    name: "통합 - 서버 관리",
    icon: LocationOn,
    component: Servers,
    layout: "/admin"
  },
  {
    path: "/processes",
    name: "통합 - 프로세스 관리",
    icon: Notifications,
    component: Processes,
    layout: "/admin"
  },
  {
    path: "/logs",
    name: "로그 관리",
    icon: "content_paste",
    component: Logs,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "성능 관리",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  }
];

export default dashboardRoutes;
