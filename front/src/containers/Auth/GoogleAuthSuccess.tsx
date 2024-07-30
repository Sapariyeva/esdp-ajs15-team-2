import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/userSlice";

export function GoogleAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        dispatch(setUser(parsedUser));

        const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
        i18n.changeLanguage(savedLanguage).then(() => {
          navigate("/main");
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, i18n]);

  return null;
}
