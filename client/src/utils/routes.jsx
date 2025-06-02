import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register/index.jsx";
import { ApplicationCreate } from "../pages/Application/ApplicationCreate/index.jsx";
import { ApplicationList } from "../pages/Application/ApplicationList/index.jsx";

const routes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/applications/create", element: <ApplicationCreate /> },
  { path: "/applications/list", element: <ApplicationList /> },
];

export default routes;
