import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container, Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormElement from "@/components/UI/Form/FormElement";
import { changeUserEmail, clearRegisterError, resetPasswordEmail } from "@/features/userSlice";
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from "@/components/UI/Button/Button";
import { ImageContainer } from "@/components/UI/ImageContainer/ImageContainer";
import { Title } from "@/components/UI/Title/Title";
import Loading from "@/components/UI/Loading/Loading";

// Страница авторизации
interface IForgotPasswordState {
    email: string;
}

const ForgotPassword = () => {
    const { loginError, loading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<IForgotPasswordState>({
        email: ""
    });

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
                            text="Сбросить пароль"
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
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default ForgotPassword;