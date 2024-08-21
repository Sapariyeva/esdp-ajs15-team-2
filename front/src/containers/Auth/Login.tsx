import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Alert, Box, Container, Grid, useMediaQuery, Theme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormElement from "@/components/UI/Form/FormElement";
import { changeInitialState, loginUser } from "@/features/userSlice";
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from "@/components/UI/Button/Button";
import { ImageContainer } from "@/components/UI/ImageContainer/ImageContainer";
import { Title } from "@/components/UI/Title/Title";
import Loading from "@/components/UI/Loading/Loading";
import { ButtonSocial } from "@/components/UI/ButtonSosial/ButtonSocial";

// Страница авторизации
interface ILoginState {
    email: string;
    password: string;
}

const Login = () => {
    const { t } = useTranslation();
    const { loginError, loading, user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<ILoginState>({
        email: "", password: ""
    });

    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const inputSize = isLargeScreen ? '200px' : '300px';
    const titleSize = isLargeScreen ? 3 : 1;

    useEffect(() => {
        dispatch(changeInitialState());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin_page');
            } else {
                navigate('/main');
            }
        }
    }, [user, navigate]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginUser({ ...state })).unwrap();
    };

    if (loading) return <Loading />

    return (
        <Container disableGutters maxWidth="xl">
            <Grid container display="flex">
                <ImageContainer style={{ flex: 1 }} />
                <Grid
                    container
                    direction="column"
                    width={isDesktopOrLarger ? '50%' : '100%'}
                    style={{ flex: 1 }}
                >
                    <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                        <Button
                            className="Back_btn"
                            onClick={() => navigate('/')}
                            style={{ border: "none", background: "none" }}
                        >
                        </Button>
                        {isDesktopOrLarger && (
                            <Button
                                className='Support_btn'
                                title={t("support")}
                                type="default"
                                style={{ borderRadius: 8, fontSize: 20 }}
                            />
                        )}
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={isDesktopOrLarger ? '40px 0 30px' : '100px 0 20px'} onClick={() => navigate('/')}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Title
                            text={t('login')}
                            level={titleSize}
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
                            width={inputSize}
                        />
                        <FormElement
                            required
                            name="password"
                            label={t('password')}
                            type="password"
                            onChange={inputChangeHandler}
                            value={state.password}
                            color="success"
                            margin="dense"
                            width={inputSize}
                        />
                        {loginError && !Array.isArray(loginError) ? <Alert severity="error">{loginError}</Alert> : null}
                        <Grid display="flex" justifyContent="center" marginTop={"20px"} marginBottom={"8px"}>
                            <Button
                                className='Registr_btn'
                                title={t('continue')}
                                size={buttonSize}
                                type="primary"
                            />
                        </Grid>
                        <Grid display="flex" justifyContent="center">
                            <Link to="/reset_password" color='#9069CD'>
                                {t('forgot_password')}
                            </Link>
                        </Grid>
                    </Box>
                    <Grid display="flex" justifyContent="center">
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="facebook"
                        />
                        <ButtonSocial
                            onClick={() => window.location.href = 'http://localhost:8000/users/auth/google'}
                            size={buttonSize}
                            type="google"
                        ></ButtonSocial>
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="apple"
                        />
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="vk"
                        />
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="yandex"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Login;
