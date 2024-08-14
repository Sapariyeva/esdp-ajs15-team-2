import { Container, Grid, useMediaQuery, Theme } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeUserEmail, getUserFindByEmail, resendResetPassword } from '@/features/userSlice';

const ForgotPasswordEmailLink = () => {
    const { t } = useTranslation();
    const { user, userEmail } = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getUserFindByEmail(userEmail));
        }, 5000);

        return () => clearInterval(interval);
    }, [userEmail, dispatch]);

    useEffect(() => {
        if (user?.resetPasswordToken === "") {
            dispatch(changeUserEmail(''));
            navigate('/');
        }
    }, [user, navigate, dispatch]);

    const isTabletOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth="xl">
            <Grid container display="flex" justifyContent="space-between" alignItems="end">
                <Button
                    className="Back_btn"
                    onClick={() => navigate('/')}
                    type="default"
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
            <Grid display="flex" justifyContent="center" margin={isTabletOrLarger ? '150px 0 30px' : '100px 0 20px'}>
                <img src={logo} alt="Логотип" width={isDesktopOrLarger ? "40%" : "60%"} />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection="column">
                <Title
                    text={t('password_reset_email_sent')}
                    style={{ marginBottom: isTabletOrLarger ? '10px' : '5px', fontSize: isLargeScreen ? '25px' : '32px' }}
                />
                <Title
                    text={t('follow_link_to_reset_password')}
                    style={{ marginTop: 0, fontSize: isLargeScreen ? '25px' : '32px' }}
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop="20px">
                <Button
                    className='Retry_btn'
                    title={t('resend_email')}
                    size={buttonSize}
                    type="primary"
                    onClick={() => dispatch(resendResetPassword(userEmail))}
                />
            </Grid>
        </Container>
    );
};

export default ForgotPasswordEmailLink;
