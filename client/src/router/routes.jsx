import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { ApplicationCreate } from "../pages/Application/ApplicationCreate";
import { ApplicationList } from "../pages/Application/ApplicationList";
import { AdminDashboard } from "../pages/Admin/AdminDashboard.jsx";

const routes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/applications/create", element: <ApplicationCreate /> },
  { path: "/applications/list", element: <ApplicationList /> },
  { path: "/admin", element: <AdminDashboard /> },
];

export default routes;
