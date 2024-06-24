import { Container, Grid } from '@mui/material';
import logo from '../../../public/images/logo/igrovuz-logo-lg.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeRegisterEmail, getUserFindByEmail, resendConfirmEmail } from '@/features/userSlice';
import { Button } from '@/components/UI/Button/Button';
import { useEffect } from 'react';
import { Title } from '@/components/UI/Title/Title';

// Страница подтверждения почты
const EmailLink = () => {
    const { user, registerEmail } = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getUserFindByEmail(registerEmail));
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearInterval(interval); // Интервал очистки при отключении компонента
    }, [registerEmail, dispatch]);

    useEffect(() => {
        if (user?.isEmailConfirmed) {
            console.log(user);
            
            dispatch(changeRegisterEmail(''));
            navigate('/username_registration');
        }
    }, [user, navigate, dispatch]);

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                <Button
                    className="Back_btn"
                    onClick={() => navigate('/')}
                    type="default"
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
            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Title
                    text="Ссылка отправлена на почту."
                />
                <Title
                    text="Перейдите по ссылке для завершения регистрации"
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Registr_btn'
                    title="Отправить ещё раз"
                    onClick={() => dispatch(resendConfirmEmail(registerEmail))}
                    size="lg"
                    type="primary"
                >
                </Button>
            </Grid>
        </Container>
    )
}

export default EmailLink;