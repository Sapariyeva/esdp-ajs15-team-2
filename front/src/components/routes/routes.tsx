import EmailLink from "@/containers/Auth/EmailLink";
import Login from "@/containers/Auth/Login";
import Logout from "@/containers/Auth/Logout";
import Register from "@/containers/Auth/Register";
import Main from "@/containers/Main/Main";
import { Route, Routes as RouterRoutes } from "react-router-dom";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-link" element={<EmailLink />} />
      <Route path="/logout" element={<Logout />} />
    </RouterRoutes>
  );
};