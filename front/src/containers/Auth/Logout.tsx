import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/UI/Button/Button";
import { logoutUser } from "@/features/userSlice";

const Logout = () => {
    const dispatch = useAppDispatch();

    return (
        // <button onClick={() => dispatch(logoutUser())}>Выйти</button>
        <Button
            className='Registr_btn'
            title="Регистрация"
            // onClick={() => dispatch(logoutUser())}
            onClick={() => console.log('clicked')}
            size="lg"
            type="primary"
            style={{}}>
        </Button >
    )
}

export default Logout;