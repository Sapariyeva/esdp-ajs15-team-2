import { Alert, Box, Container, Grid, Theme, useMediaQuery } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import FormElement from '@/components/UI/Form/FormElement';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearRegisterError, setUsername } from '@/features/userSlice';
import Loading from '@/components/UI/Loading/Loading';

// Страница для добавления имени пользователя
interface IRegisterState {
    username: string;
}

const UsernameRegistration = () => {
    const { t } = useTranslation();
    const { registerError, loading } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IRegisterState>({
        username: ""
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

        dispatch(setUsername({username: state.username})).unwrap().then(() => {
            navigate("/survey");
        });
    };

    const getErrorsBy = (name: string) => {
        if (Array.isArray(registerError)) {
            const error = registerError.find(({ type }) => type === name);
            return error?.messages.join(",");
        }
    };

    if (loading) return <Loading />

    const isTabletOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const inputSize = isLargeScreen ? '200px' : '300px';
    const logoWidth = isDesktopOrLarger ? '40%' : '60%';
    const marginTop = isTabletOrLarger ? '150px' : '100px';
    const marginBottom = isTabletOrLarger ? '50px' : '30px';

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth="xl">
            <Grid display="flex" justifyContent="flex-end" alignItems="end">
                {isDesktopOrLarger && (
                    <Button
                        className='Support_btn'
                        title={t('support')}
                        type="default"
                        style={{ borderRadius: 8, fontSize: 20 }}
                    />
                )}
            </Grid>
            <Grid display="flex" justifyContent="center" margin={`${marginTop} 0 ${marginBottom}`}>
                <img src={logo} alt="Логотип" width={logoWidth} />
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
                    label={t('reviewer_name')}
                    name="username"
                    onChange={inputChangeHandler}
                    value={state.username}
                    color="success"
                    error={getErrorsBy('username')}
                    margin="dense"
                    type="text"
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
        </Container>
    );
}

export default UsernameRegistration;
