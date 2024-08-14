import { Container, Grid, useMediaQuery, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeUserEmail, getUserFindByEmail, resendConfirmEmail } from '@/features/userSlice';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';

const EmailLink = () => {
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
        if (user?.isEmailConfirmed) {
            dispatch(changeUserEmail(''));
            navigate('/username_registration');
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
                        title={t('support')}
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
                    text={t('email_link_sent')}
                    style={{ marginBottom: isTabletOrLarger ? '10px' : '5px', fontSize: isLargeScreen ? '25px' : '32px' }}
                />
                <Title
                    text={t('complete_registration_via_link')}
                    style={{ marginTop: 0, fontSize: isLargeScreen ? '25px' : '32px' }}
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop="20px">
                <Button
                    className='Registr_btn'
                    title={t('resend_email')}
                    onClick={() => dispatch(resendConfirmEmail(userEmail))}
                    size={buttonSize}
                    type="primary"
                />
            </Grid>
        </Container>
    );
};

export default EmailLink;
