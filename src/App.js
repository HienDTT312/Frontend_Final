import "./App.css";
import GlobalStyle from "./component/globalStyle/GlobalStyle";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import { isLogin } from "./helpers/isLogin";
import ResetPassword from "./modules/user/resetPassword/ResetPassword";

function App() {
  return (
    <GlobalStyle>
      <Routes>
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </GlobalStyle>
  );
}

function PrivateRoute({ children }) {
  // let location = useLocation();
  return isLogin() ? children : <Navigate to="/login" replace />;
}

export default App;
