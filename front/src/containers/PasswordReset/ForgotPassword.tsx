import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container,
    Grid, useMediaQuery, Theme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormElement from "@/components/UI/Form/FormElement";
import { changeUserEmail, clearRegisterError, resetPasswordEmail } from "@/features/userSlice";
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from "@/components/UI/Button/Button";
import { ImageContainer } from "@/components/UI/ImageContainer/ImageContainer";
import { Title } from "@/components/UI/Title/Title";
import Loading from "@/components/UI/Loading/Loading";

// Страница для ввода почты для сброса пароля
interface IForgotPasswordState {
    email: string;
}

const ForgotPassword = () => {
    const { t } = useTranslation();
    const { loginError, loading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IForgotPasswordState>({
        email: ""
    });

    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const inputSize = isLargeScreen ? '200px' : '300px';
    const titleSize = isLargeScreen ? 3 : 1;

    useEffect(() => {
        dispatch(clearRegisterError());
        dispatch(changeUserEmail(''));
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
        
        dispatch(resetPasswordEmail(state.email)).unwrap().then(() => {
            dispatch(changeUserEmail(state.email));
            navigate("/reset_password_email_link");
        });
    };

    if(loading) return <Loading/>

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
                    <Grid display="flex" justifyContent="space-between" alignItems="end">
                        <Button
                            className="Back_btn"
                            onClick={() => navigate('/')}
                            style={{border: "none", background: "none"}}
                        />
                        {isDesktopOrLarger && (
                            <Button
                                className='Support_btn'
                                title={t("support")}
                                type="default"
                                style={{borderRadius: 8, fontSize: 20}}
                            />
                        )}
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={isDesktopOrLarger ? '150px 0 30px' : '100px 0 20px'} onClick={() => navigate('/')}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Title
                            text={t("reset_password")}
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
                        {loginError && !Array.isArray(loginError) ? <Alert severity="error">{loginError}</Alert> : null}
                        <Grid display="flex" justifyContent="center" marginTop={"20px"} marginBottom={"8px"}>
                            <Button
                                className='Registr_btn'
                                title={t('continue')}
                                size={buttonSize}
                                type="primary"
                            />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default ForgotPassword;
