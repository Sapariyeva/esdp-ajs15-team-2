import { Container, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import { ImageContainer } from '@/components/UI/ImageContainer/ImageContainer';

// Страница аутентификации
const Auth = () => {
    const navigate = useNavigate();

    return (
        <Container disableGutters maxWidth="xl">
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="flex-end">
                        <Button
                            className='Support_btn'
                            title="Поддержка"
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
                            title="Регистрация"
                            onClick={() => navigate('/register')}
                            size="lg"
                            type="primary"
                            style={{marginBottom: 15, borderRadius: 8}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Button
                            className='Login_btn'
                            title="Войти"
                            onClick={() => navigate('/login')}
                            size="lg"
                            type="default"
                            style={{borderRadius: 8, marginBottom: 8}}>
                        </Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Link href="#" variant="body1" color={"#9069CD"}>
                            {"Забыли пароль?"}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Auth;