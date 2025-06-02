import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import routes from "./utils/routes.jsx";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = user?.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register";

  useEffect(() => {
    if (!isLoggedIn && !isAuthPage) {
      navigate("/auth/login");
    } else if (isLoggedIn && isAuthPage) {
      navigate(isAdmin ? "/admin" : "/applications/list");
    } else if (isLoggedIn && !isAuthPage) {
      if (location.pathname.startsWith("/admin") && !isAdmin) {
        navigate("/applications/list");
      } else if (location.pathname.startsWith("/applications") && isAdmin) {
        navigate("/admin");
      }
    }
  }, [isLoggedIn, isAdmin, isAuthPage, location.pathname, navigate]);

  return (
    <div className="app">
      {!isAuthPage && isLoggedIn && (
        <button onClick={handleLogout} className="logoutButton">
          Выйти
        </button>
      )}

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
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
