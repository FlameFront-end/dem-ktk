import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register/index.jsx";

const routes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
];

export default routes;
