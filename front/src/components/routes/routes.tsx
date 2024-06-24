import Auth from "@/containers/Auth/Auth";
import EmailLink from "@/containers/Auth/EmailLink";
import Login from "@/containers/Auth/Login";
import Register from "@/containers/Auth/Register";
import UsernameRegistration from "@/containers/Auth/UsernameRegistration";
import Main from "@/containers/Main/Main";
import Info from "@/containers/Survey/Info";
import { Route, Routes as RouterRoutes } from "react-router-dom";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email_link" element={<EmailLink />} />
      <Route path="/username_registration" element={<UsernameRegistration />} />
      <Route path="/main" element={<Main />} />
      <Route path="/survey" element={<Info />} />
    </RouterRoutes>
  );
};
