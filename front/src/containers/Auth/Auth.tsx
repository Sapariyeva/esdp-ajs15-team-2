import { Container, Grid } from '@mui/material';
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

    return (
        <Container disableGutters maxWidth="xl">
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="flex-end">
                        <Button
                            className='Support_btn'
                            title={t("support")}
                            type="default"
                            style={{borderRadius: 8, fontSize: 20}}
                        >
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={'150px 0 100px'}>
                        <img src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Button
                            className='Registr_btn'
                            title={t('registration')}
                            onClick={() => navigate('/register')}
                            size="lg"
                            type="primary"
                            style={{marginBottom: 15, borderRadius: 8}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Button
                            className='Login_btn'
                            title={t('login')}
                            onClick={() => navigate('/login')}
                            size="lg"
                            type="default"
                            style={{borderRadius: 8, marginBottom: 8}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Link to="/reset_password" color='#9069CD'>
                            {t('forgot_password')}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Auth;