import { useAppDispatch } from "@/app/hooks";
import { logoutUser } from "@/features/userSlice";

const Logout = () => {
    const dispatch = useAppDispatch();

    return (
        <button onClick={() => dispatch(logoutUser())}>Выйти</button>
    )
}

export default Logout;