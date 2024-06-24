import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container,
    Grid, Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormElement from "@/components/UI/Form/FormElement";
import { clearRegisterError, loginUser, resetPassword } from "@/features/userSlice";
import logo from '../../../public/images/logo/igrovuz-logo-lg.svg';
import { Button } from "@/components/UI/Button/Button";
import { ImageContainer } from "@/components/UI/ImageContainer/ImageContainer";
import { Title } from "@/components/UI/Title/Title";
import Loading from "@/components/UI/Loading/Loading";

// Страница авторизации
interface ILoginState {
    email: string;
    password: string;
}

const Login = () => {
    const { loginError, loading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<ILoginState>({
        email: "", password: ""
    });

    useEffect(() => {
        dispatch(clearRegisterError());
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

        dispatch(loginUser({ ...state })).unwrap().then(() => {
            navigate("/main");
        });
    };

    if(loading) return <Loading/>

    return (
        <Container disableGutters maxWidth="xl">
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                        <Button
                            className="Back_btn"
                            onClick={() => navigate('/')}
                            style={{border: "none", background: "none"}}
                        >
                        </Button>
                        <Button
                            className='Support_btn'
                            title="Поддержка"
                            type="default"
                            style={{borderRadius: 8, fontSize: 20}}
                        >
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={'150px 0 30px'} onClick={() => navigate('/')}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Title
                            text="Вход"
                        />
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
                        <FormElement
                            required
                            label="exampe@gmail.com"
                            name="email"
                            onChange={inputChangeHandler}
                            value={state.email}
                            color="success"
                            margin="dense"
                            type="email"
                            width="300px"
                        />
                        <FormElement
                            required
                            name="password"
                            label="Пароль"
                            type="password"
                            onChange={inputChangeHandler}
                            value={state.password}
                            color="success"
                            margin="dense"
                            width="300px"
                        />
                        {loginError && !Array.isArray(loginError) ? <Alert severity="error">{loginError}</Alert> : null}
                        <Grid display="flex" justifyContent="center" marginTop={"20px"} marginBottom={"8px"}>
                            <Button
                                className='Registr_btn'
                                title="Продолжить"
                                size="lg"
                                type="primary"
                            >
                            </Button>
                        </Grid>
                        <Grid display="flex" justifyContent="center">
                            <Link href="#" variant="body1" color={"#9069CD"} onClick={() => dispatch(resetPassword(state.email))}>
                                {"Забыли пароль?"}
                            </Link>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Login;