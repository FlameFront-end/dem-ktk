import { Route, Routes } from "react-router-dom";
import routes from "./utils/routes.jsx";

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default App;
