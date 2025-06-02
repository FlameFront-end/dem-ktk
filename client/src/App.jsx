import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import routes from "./utils/routes.jsx";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register";

  return (
    <div className="app">
      {!isAuthPage && (
        <button onClick={handleLogout} className="logoutButton">
          Выйти
        </button>
      )}

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
