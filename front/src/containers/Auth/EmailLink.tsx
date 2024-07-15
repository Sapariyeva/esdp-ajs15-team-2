import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeUserEmail, getUserFindByEmail, resendConfirmEmail } from '@/features/userSlice';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';

// Страница подтверждения почты
const EmailLink = () => {
    const { t } = useTranslation();
    const { user, userEmail } = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getUserFindByEmail(userEmail));
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearInterval(interval); // Интервал очистки при отключении компонента
    }, [userEmail, dispatch]);

    useEffect(() => {
        if (user?.isEmailConfirmed) {
            dispatch(changeUserEmail(''));
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
                    title={t('support')}
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
                    text={t('email_link_sent')}
                    style={{marginBottom: 0}}
                />
                <Title
                    text={t('complete_registration_via_link')}
                    style={{marginTop: 0}}
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Registr_btn'
                    title={t('resend_email')}
                    onClick={() => dispatch(resendConfirmEmail(userEmail))}
                    size="lg"
                    type="primary"
                >
                </Button>
            </Grid>
        </Container>
    )
}

export default EmailLink;