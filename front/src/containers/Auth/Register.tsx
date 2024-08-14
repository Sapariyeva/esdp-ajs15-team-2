import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container,
    Grid, useMediaQuery, Theme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeInitialState, changeUserEmail, registerUser } from "@/features/userSlice";
import FormElement from "@/components/UI/Form/FormElement";
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from "@/components/UI/Button/Button";
import { ImageContainer } from "@/components/UI/ImageContainer/ImageContainer";
import { ButtonSocial } from "@/components/UI/ButtonSosial/ButtonSocial";
import { Title } from "@/components/UI/Title/Title";
import Loading from "@/components/UI/Loading/Loading";


// Страница регистрации
interface IRegisterState {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const { t } = useTranslation();
    const { registerError, loading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IRegisterState>({
        email: "", password: "", confirmPassword: ""
    });

    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const inputSize = isLargeScreen ? '200px' : '300px';
    const titleSize = isLargeScreen ? 3 : 1;


    useEffect(() => {
        dispatch(changeInitialState());
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
        dispatch(registerUser({ email: state.email, password: state.password })).unwrap().then(() => {
            navigate("/email_link");
            dispatch(changeUserEmail(state.email));
        });
    };

    const getErrorsBy = (name: string) => {
        if (Array.isArray(registerError)) {
            const error = registerError.find(({ type }) => type === name);
            return error?.messages.join(",");
        }
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
                    <Grid display="flex" justifyContent="space-between">
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
                    <Grid display="flex" justifyContent="center" margin={isDesktopOrLarger ? '40px 0 30px' : '100px 0 20px'}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Title
                            text={t('registration')}
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
                            error={getErrorsBy('email')}
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
                            error={getErrorsBy('password')}
                            margin="dense"
                            width={inputSize}
                        />
                        <FormElement
                            required
                            name="confirmPassword"
                            label={t('repeat_password')}
                            type="password"
                            onChange={inputChangeHandler}
                            value={state.confirmPassword}
                            color="success"
                            error={passwordError}
                            margin="dense"
                            width={inputSize}
                        />
                        <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                            <Button
                                className='Registr_btn'
                                title={t('continue')}
                                size={buttonSize}
                                type="primary"
                            />
                        </Grid>
                        {registerError && !Array.isArray(registerError) ? <Alert severity="error">{registerError}</Alert> : null}
                    </Box>
                    <Grid display="flex" justifyContent="center">
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="facebook"
                        />
                        <ButtonSocial
                            onClick={() => console.log("click")}
                            size={buttonSize}
                            type="google"
                        />
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

export default Register;
