import { Alert, Box, Container, Grid } from '@mui/material';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import FormElement from '@/components/UI/Form/FormElement';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setUsername } from '@/features/userSlice';
import Loading from '@/components/UI/Loading/Loading';

// Страница для добавления имени пользователя
interface IRegisterState {
    username: string;
}

const UsernameRegistration = () => {
    const { registerError, loading } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IRegisterState>({
        username: ""
    });
    
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
            <Grid display="flex" justifyContent="center" margin={'150px 0 50px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
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
                    label="Имя проверяющего"
                    name="username"
                    onChange={inputChangeHandler}
                    value={state.username}
                    color="success"
                    error={getErrorsBy('username')}
                    margin="dense"
                    type="text"
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
        </Container>
    )
}

export default UsernameRegistration;