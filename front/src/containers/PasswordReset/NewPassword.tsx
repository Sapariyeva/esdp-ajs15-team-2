import { Alert, Box, Container, Grid } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import FormElement from '@/components/UI/Form/FormElement';
import Loading from '@/components/UI/Loading/Loading';
import { clearRegisterError, getUserFindByResetPasswordToken, resetPassword } from '@/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

// Страница для изменения пароля
interface IPasswordResetState {
    password: string;
    confirmPassword: string;
}
const NewPassword = () => {
    const { t } = useTranslation();
    const { registerError, loading, user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { token } = useParams<{ token: string }>(); // Извлекаем токен из URL

    const [state, setState] = useState<IPasswordResetState>({
        password: "", confirmPassword: ""
    });
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [showInvalidLinkMessage, setShowInvalidLinkMessage] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false); // Состояние для отслеживания успешного изменения пароля
    
    useEffect(() => {
        setShowInvalidLinkMessage(false);
        dispatch(clearRegisterError());
        dispatch(getUserFindByResetPasswordToken(token!));
        if (user?.resetPasswordToken) {
            setShowInvalidLinkMessage(false);
        } else {
            setShowInvalidLinkMessage(true);
        }
    }, [dispatch, token, user?.resetPasswordToken]);

    useEffect(() => {
        if (showInvalidLinkMessage) {
            const timer = setTimeout(() => {
                window.close();
            }, 5000);
            return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
        }
    }, [showInvalidLinkMessage]);
    
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
            setPasswordError(t("passwords_not_match"));
            return;
        }
        setPasswordError(undefined);
        dispatch(resetPassword({ password: state.password, resetPasswordToken: token! })).unwrap().then(() => {
            setShowInvalidLinkMessage(false);
            setPasswordChanged(true); // Устанавливаем флаг успешного изменения пароля
            const timer = setTimeout(() => {
                window.close();
            }, 5000);
            return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
        }).catch(error => {
            // Обработка ошибок при сбросе пароля
            console.error('Ошибка при сбросе пароля:', error);
        });        
    };

    const getErrorsBy = (name: string) => {
        if (Array.isArray(registerError)) {
            const error = registerError.find(({ type }) => type === name);
            return error?.messages.join(",");
        }
    };

    if(loading) return <Loading/>
    if(showInvalidLinkMessage) return <>
        <h1 style={{textAlign: 'center', marginTop: "20%", color: "#9069cd"}}>Ссылка недействительна</h1>
    </>
    if(passwordChanged) return <>
        <h1 style={{textAlign: 'center', marginTop: "20%", color: "#9069cd"}}>Пароль успешно изменен!</h1>
    </>

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"}>
                <Button
                    className='Support_btn'
                    title={t("support")}
                    type="default"
                    style={{borderRadius: 8, fontSize: 20}}
                >
                </Button>
            </Grid>
            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"} flexDirection={"column"} alignItems={"center"}>
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
                        name="password"
                        label={t("password")}
                        type="password"
                        onChange={inputChangeHandler}
                        value={state.password}
                        color="success"
                        error={getErrorsBy('password')}
                        margin="dense"
                        width="300px"
                    />
                    <FormElement
                        required
                        name="confirmPassword"
                        label={t("repeat_password")}
                        type="password"
                        onChange={inputChangeHandler}
                        value={state.confirmPassword}
                        color="success"
                        error={passwordError}
                        margin="dense"
                        width="300px"
                    />
                    <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                        <Button
                            className='Registr_btn'
                            title={t("continue")}
                            size="lg"
                            type="primary"
                        >
                        </Button>
                    </Grid>
                    {registerError && !Array.isArray(registerError) ? <Alert severity="error">{registerError}</Alert> : null}
                </Box>
            </Grid>
        </Container>
    )
}

export default NewPassword;