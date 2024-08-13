import { Route, Routes as RouterRoutes } from "react-router-dom";
import Admin from "@/containers/Admin/Admin";
import Auth from "@/containers/Auth/Auth";
import EmailLink from "@/containers/Auth/EmailLink";
import Login from "@/containers/Auth/Login";
import Register from "@/containers/Auth/Register";
import UsernameRegistration from "@/containers/Auth/UsernameRegistration";
import Games from "@/containers/Games/Games";
import { Help } from "@/containers/Help/Help";
import Main from "@/containers/Main/Main";
import ForgotPassword from "@/containers/PasswordReset/ForgotPassword";
import ForgotPasswordEmailLink from "@/containers/PasswordReset/ForgotPasswordEmailLink";
import NewPassword from "@/containers/PasswordReset/NewPassword";
import { Profile } from "@/containers/Profile/Profile";
import Survey from "@/containers/Survey/Survey";
import Users from "../AdminComponents/Users/Users";
import Students from "@/containers/Student/Student";
import { GoogleAuthSuccess } from "@/containers/Auth/GoogleAuthSuccess";
import GameSettings from "@/containers/GameSettings/GamesSettings";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email_link" element={<EmailLink />} />
      <Route path="/reset_password" element={<ForgotPassword />} />
      <Route path="/reset_password_email_link" element={<ForgotPasswordEmailLink />} />
      <Route path="/new_password/:token" element={<NewPassword />} />
      <Route path="/username_registration" element={<UsernameRegistration />} />
      <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
      <Route path="/main" element={<Main />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/games" element={<Games />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/admin_page" element={<Admin />} />
      <Route path="/admin_page/users" element={<Users/>} />
      <Route path="/students" element={<Students />} />
      <Route path="/admin_page/settings" element={<GameSettings/>} />
    </RouterRoutes>
  );
};