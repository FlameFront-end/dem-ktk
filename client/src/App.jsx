import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import routes from "./router/routes.jsx";
import { useEffect } from "react";
import { Button } from "antd";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("userId");
  const isAdmin = user?.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    navigate("/auth/login");
  };

  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register";

  // useEffect(() => {
  //   if (!isLoggedIn && !isAuthPage) {
  //     navigate("/auth/login");
  //   } else if (isLoggedIn && isAuthPage) {
  //     navigate(isAdmin ? "/admin" : "/applications/list");
  //   }
  // }, [isLoggedIn, isAdmin, isAuthPage, location.pathname, navigate]);

  return (
    <div className="app">
      {!isAuthPage && isLoggedIn && (
        <Button
          onClick={handleLogout}
          variant="solid"
          className="logoutButton"
          color="danger"
        >
          Выйти
        </Button>
      )}

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route
          path="*"
          element={
            !isLoggedIn ? (
              <Navigate to="/auth/login" />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/applications/list" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
