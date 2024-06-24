import { useAppDispatch } from "@/app/hooks";
import { Sidebar } from "@/components/UI/Sidebar/Sidebar";
import { logoutUser } from "@/features/userSlice";
import { useNavigate } from "react-router-dom";

// Главная страница приложения
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutUser()).unwrap().then(() => {
            navigate('/');
        });
    };

    return (
        <>
            <Sidebar
                onClick={() => logout()}
            ></Sidebar>
        </>
    )
}

export default Main;