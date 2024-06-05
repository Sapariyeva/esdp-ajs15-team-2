import Login from "@/containers/Auth/Login";
import Register from "@/containers/Auth/Register";
import Main from "@/containers/Main/Main";
import { Route, Routes as RouterRoutes } from "react-router-dom";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </RouterRoutes>
  );
};
