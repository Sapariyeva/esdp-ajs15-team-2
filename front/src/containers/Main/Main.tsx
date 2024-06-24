import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/UI/Button/Button";
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
            <Button
                title="Выйти"
                onClick={() => logout()}
                size="lg"
            />
        </>
    )
}

export default Main;