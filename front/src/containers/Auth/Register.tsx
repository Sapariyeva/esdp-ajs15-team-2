import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container,
    Grid, styled
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeRegisterData, clearRegisterError, registerUser } from "@/features/userSlice";
import FormElement from "@/components/UI/Form/FormElement";
import mainImage from '@/assets/images/main_img.svg';
import logo from '@/assets/images/logo.svg';
import './Register.css';
import { Button } from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Input/Input";


const ImageContainer = styled(Box)({
    width: '720px',
    height: '1024px',
    backgroundImage: `url(${mainImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

interface IRegisterState {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    // const { registerError } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IRegisterState>({
        email: "", password: "", confirmPassword: ""
    });

    console.log(state);


    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    useEffect(() => {
        dispatch(clearRegisterError());
        dispatch(changeRegisterData({ email: '', password: '' }));
    }, [dispatch]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
            setPasswordError("Пароли не совпадают");
            return;
        }
        setPasswordError(undefined);
        dispatch(changeRegisterData({ email: state.email, password: state.password }));
        // dispatch(registerUser({ email: state.email, password: state.password })).unwrap().then(() => {
        //     navigate("/email-link");
        // });
    };

    const getErrorsBy = (name: string) => {
        // if (Array.isArray(registerError)) {
        //     const error = registerError.find(({ type }) => type === name);
        //     return error?.messages.join(",");
        // }
    };

    return (
        <Container disableGutters sx={{ margin: 0 }}>
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                        {/* <button className="Back_btn" onClick={() => navigate('/')}></button> */}
                        <Button
                            className="Back_btn"
                            title=""
                            onClick={() => navigate('/')}
                            size="md"
                            type="primary"
                            style={{}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={'150px 0 50px'} onClick={() => navigate('/')}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <p className="Auth_title">Регистрация</p>
                    </Grid>
                    <Box
                        component="form"
                        onSubmit={submitFormHandler}
                        noValidate
                        sx={{ mb: 2, width: "100%" }}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                    >
                        {/* <FormElement
                            required
                            label="exampe@gmail.com"
                            name="email"
                            onChange={inputChangeHandler}
                            value={state.email}
                            color="success"
                            // error={getErrorsBy('email')}
                            margin="dense"
                            type="email"
                            width="300px"
                        /> */}
                        <Input
                            type="email"
                            placeholder="exampe@gmail.com"
                            value={state.email}
                            onChange={inputChangeHandler}
                            required
                            style={{ width: '290px' }}
                        />
                        {/* <FormElement
                            required
                            name="password"
                            label="Пароль"
                            type="password"
                            onChange={inputChangeHandler}
                            value={state.password}
                            color="success"
                            // error={getErrorsBy('password')}
                            margin="dense"
                            width="300px"
                        /> */}
                        <Input
                            type="password"
                            placeholder="Пароль"
                            value={state.password}
                            onChange={inputChangeHandler}
                            required
                            style={{ width: '290px' }}
                        />
                        {/* <FormElement
                            required
                            name="confirmPassword"
                            label="Повторите пароль"
                            type="password"
                            onChange={inputChangeHandler}
                            value={state.confirmPassword}
                            color="success"
                            error={passwordError}
                            margin="dense"
                            width="300px"
                        /> */}
                        <Input
                            type="password"
                            placeholder="Повторите пароль"
                            value={state.confirmPassword}
                            onChange={inputChangeHandler}
                            required
                            style={{ width: '290px' }}
                        />
                        <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                            {/* <button className='Registr_btn'>Продолжить</button> */}
                            <Button
                                className='Registr_btn'
                                title="Регистрация"
                                onClick={() => navigate('/register')}
                                size="lg"
                                type="primary"
                                style={{}}>
                            </Button>
                        </Grid>
                        {/* {registerError && !Array.isArray(registerError) ? <Alert severity="error">{registerError}</Alert> : null} */}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Register;