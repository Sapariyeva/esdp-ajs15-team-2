import { Alert, Box, Container, Grid } from '@mui/material';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import FormElement from '@/components/UI/Form/FormElement';
import Loading from '@/components/UI/Loading/Loading';
import { clearRegisterError } from '@/features/userSlice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

// Страница для изменения пароля
interface IPasswordResetState {
    password: string;
    confirmPassword: string;
}
const NewPassword = () => {
    const { registerError, loading } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    const [state, setState] = useState<IPasswordResetState>({
        password: "", confirmPassword: ""
    });

    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    
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
        if (state.password !== state.confirmPassword) {
            setPasswordError("Пароли не совпадают");
            return;
        }
        setPasswordError(undefined);
    };

    const getErrorsBy = (name: string) => {
        if (Array.isArray(registerError)) {
            const error = registerError.find(({ type }) => type === name);
            return error?.messages.join(",");
        }
    };

    if(loading) return <Loading/>
    
    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"}>
                <Button
                    className='Support_btn'
                    title="Поддержка"
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
                        label="Пароль"
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
                        label="Повторите пароль"
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
                            title="Продолжить"
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