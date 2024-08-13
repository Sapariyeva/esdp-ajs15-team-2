import { Container, Grid, useMediaQuery, Theme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import { ImageContainer } from '@/components/UI/ImageContainer/ImageContainer';
import { useAppDispatch } from '@/app/hooks';
import { changeInitialState } from '@/features/userSlice';

// Страница аутентификации
const Auth = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeInitialState());
    }, [navigate]);

    const isTabletOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';

    return (
        <Container disableGutters maxWidth="xl">
            <Grid container display="flex">
                <ImageContainer style={{ flex: 1 }} />
                <Grid
                    container
                    direction="column"
                    width={isDesktopOrLarger ? '50%' : '100%'}
                    style={{ flex: 1 }}
                >
                    {isDesktopOrLarger && (
                        <Grid item display="flex" justifyContent="flex-end" width="100%">
                            <Button
                                className='Support_btn'
                                title={t("support")}
                                type="default"
                                style={{borderRadius: 8, fontSize: 20}}
                            />
                        </Grid>
                    )}
                    <Grid item display="flex" justifyContent="center" margin={isTabletOrLarger ? '150px 0 100px' : '100px 0 60px'}>
                        <img src={logo} alt="Логотип" />
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                        <Button
                            className='Registr_btn'
                            title={t('registration')}
                            onClick={() => navigate('/register')}
                            size={buttonSize} 
                            type="primary"
                            style={{marginBottom: 15, borderRadius: 8}}
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                        <Button
                            className='Login_btn'
                            title={t('login')}
                            onClick={() => navigate('/login')}
                            size={buttonSize} 
                            type="default"
                            style={{borderRadius: 8, marginBottom: 8}}
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                        <Link to="/reset_password" style={{ color: '#9069CD' }}>
                            {t('forgot_password')}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Auth;
