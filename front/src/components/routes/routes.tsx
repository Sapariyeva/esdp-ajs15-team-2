import EmailLink from "@/containers/Auth/EmailLink";
import ForgotPassword from "@/containers/Auth/ForgotPassword";
import Info from "@/containers/Auth/Info";
import Loading from "@/containers/Auth/Loading";
import Login from "@/containers/Auth/Login";
import Logout from "@/containers/Auth/Logout";
import NewPassword from "@/containers/Auth/NewPassword";
import NotActive from "@/containers/Auth/NotActive";
import PanrentName from "@/containers/Auth/PanrentName";
import Register from "@/containers/Auth/Register";
import Sorry from "@/containers/Auth/Sorry";
import Statistic from "@/containers/Auth/Statistic";
import Main from "@/containers/Main/Main";
import { Route, Routes as RouterRoutes } from "react-router-dom";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-link" element={<EmailLink />} />
      <Route path="/info" element={<Info />} />
      <Route path="/panrent-name" element={<PanrentName />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/not-active" element={<NotActive />} />
      <Route path="/sorry" element={<Sorry />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
    </RouterRoutes>
  );
};