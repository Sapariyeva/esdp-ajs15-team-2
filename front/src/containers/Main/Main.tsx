import { Container, Grid, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import mainImage from '@/assets/images/main_img.svg';
import logo from '@/assets/images/logo.svg';
import './Main.css'
import { useNavigate } from 'react-router-dom';

const ImageContainer = styled(Box)({
    width: '720px',
    height: '1024px',
    backgroundImage: `url(${mainImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});
  
const Main = () => {
    const navigate = useNavigate();


    return (
        <Container disableGutters sx={{ margin: 0}}>
            <Grid display="flex">
                <ImageContainer />
                <Grid container direction="column" width={'50%'}>
                    <Grid display="flex" justifyContent="flex-end">
                        <button className='Support_btn'>Поддержка</button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" margin={'150px 0 100px'}>
                        <img className='Logo' src={logo} alt="Логотип" />
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <button className='Registr_btn' onClick={() => navigate('/register')}>Регистрация</button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <button className='Login_btn'>Войти</button>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <Link href="#" variant="body1" color={"#9069CD"}>
                            {"Забыли пароль?"}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Main;