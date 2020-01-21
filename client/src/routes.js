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
import AssessmentIcon from "@material-ui/icons/Assessment";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import StorageIcon from "@material-ui/icons/Storage";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Log from "views/Log/Log.js";
import Performance from "views/Performance/Performance.js";
import System from "views/System/System.js";
import Servers from "views/Server/Servers.js";
import Process from "views/Process/Process.js";
import User from "views/User/User.js";

const dashboardRoutes = [
  {
    id: 0,
    path: "/dashboard",
    name: "대시보드",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    submenu: []
  },
  {
    id: 1,
    path: "/userProfile",
    name: "통합 관리",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    submenu: [
      {
        id: 2,
        path: "/userProfile/system",
        name: "시스템 관리",
        icon: DesktopMacIcon,
        component: System,
        layout: "/admin"
      },
      {
        id: 3,
        path: "/userProfile/server",
        name: "서버 관리",
        icon: DesktopMacIcon,
        component: Servers,
        layout: "/admin"
      },
      {
        id: 4,
        path: "/userProfile/process",
        name: "프로세스 관리",
        icon: DesktopMacIcon,
        component: Process,
        layout: "/admin"
      }
    ]
  },
  {
    id: 5,
    path: "/log",
    name: "로그 관리",
    icon: StorageIcon,
    component: Log,
    layout: "/admin",
    submenu: []
  },
  {
    id: 6,
    path: "/performance",
    name: "성능 관리",
    icon: AssessmentIcon,
    component: Performance,
    layout: "/admin",
    submenu: []
  },
  {
    id: 7,
    path: "/user",
    name: "사용자 관리",
    icon: Person,
    component: User,
    layout: "/admin",
    submenu: []
  }
];

export default dashboardRoutes;
