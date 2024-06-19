import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Alert, Box, Container,
    Grid, Link, styled
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormElement from "@/components/UI/Form/FormElement";
import { clearRegisterError, loginUser, resetPassword } from "@/features/userSlice";
import mainImage from '@/assets/images/main_img.svg';
import logo from '@/assets/images/logo.svg';
import './Register.css';
import { Button } from "@/components/UI/Button/Button";

const ImageContainer = styled(Box)({
    width: '720px',
    height: '1024px',
    backgroundImage: `url(${mainImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

interface ILoginState {
    email: string;
    password: string;
}

const Login = () => {
    // const { loginError } = useAppSelector(state => state.user);
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

        // dispatch(loginUser({ ...state })).unwrap().then(() => {
        //     navigate("/logout");
        // });
    };

    return (
        <Container disableGutters sx={{ margin: 0 }}>
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                        {/* <button className="Back_btn" onClick={() => navigate('/')}></button> */}
                        <Button
                            className='Back_btn'
                            title=""
                            onClick={() => navigate('/')}
                            size="lg"
                            type="primary"
                            style={{}}>
                        </Button>
                        {/* <button className='Support_btn'>Поддержка</button> */}
                        <Button
                            className='Support_btn_login'
                            title="Поддержка"
                            onClick={() => console.log('clicked')}
                            size="md"
                            type="primary"
                            style={{}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={'150px 0 50px'} onClick={() => navigate('/')}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <p className="Auth_title">Вход</p>
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
                        {/* {loginError && !Array.isArray(loginError) ? <Alert severity="error">{loginError}</Alert> : null} */}
                        <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                            {/* <button className='Registr_btn'>Продолжить</button> */}
                            <Button
                                className='Registr_btn'
                                title="Продолжить"
                                onClick={() => console.log('clicked')}
                                size="lg"
                                type="primary"
                                style={{}}>
                            </Button>
                        </Grid>
                        <Grid display="flex" justifyContent="center">
                            {/* <Link href="#" variant="body1" color={"#9069CD"} onClick={() => dispatch(resetPassword(state.email))}>
                                {"Забыли пароль?"}
                            </Link> */}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Login;