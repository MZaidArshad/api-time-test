import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// import { Navigate, Route } from "react-router-dom";
import Login from "./pages/login/Login";

export default function PrivateRoute({ Component }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Login />;
  }
}
