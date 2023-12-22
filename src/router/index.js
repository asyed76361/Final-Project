// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../components/LoginPage";
import ForgotPage from "../components/ForgotPage";
import JobForm from "../views/JobForm";
import DashboardView from "../views/DashboardView";
import ActivityLogs from "../components/ActivityLogs";
import ApplicantsList from "../components/ApplicantsList";
import CreateUser from "../components/CreateUser";
import UserList from "../components/UserList";
import ChangePassword from "../components/ChangePassword"
import CreatePassword from "../components/CreatePassword";
import ChatComponent from "../components/ChatComponent"
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/ForgotPage",
    name: "ForgotPage",
    component: ForgotPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/JobForm",
    name: "JobForm",
    component: JobForm,
    meta: { requiresAuth: false },
  },
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/DashboardView",
    name: "DashboardView",
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "CreateUser",
        name: "CreateUser",
        component: CreateUser,
        meta: { requiresAuth: true },
      },
      {
        path: "UserList",
        name: "UserList",
        component: UserList,
        meta: { requiresAuth: true },
      },
      {
        path: "ActivityLogs",
        name: "ActivityLogs",
        component: ActivityLogs,
        meta: { requiresAuth: true },
      },
      {
        path: "ApplicantsList",
        name: "ApplicantsList",
        component: ApplicantsList,
        meta: { requiresAuth: true },
      },
      {
        path: "/ChatComponent",
        name: "ChatComponent",
        component: ChatComponent,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/CreatePassword",
    name: "CreatePassword",
    component: CreatePassword,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === "LoginPage" && authStore.isAuthenticated) {
    next({ name: "DashboardView" });
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "LoginPage" });
  } else if (!to.meta.requiresAuth && authStore.isAuthenticated) {
    next({ name: "DashboardView" });
  } else {
    next();
  }
});

export default router;
