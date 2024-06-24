import { Container, Grid, Typography } from '@mui/material';
import logo from '@/assets/images/logo.svg';
import { Button } from '@/components/UI/Button/Button';

// Страница с сообщением о том, что активные сессии заняты
const Sorry = () => {

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"}>
                <Button
                    className='Support_btn'
                    title="Поддержка"
                    onClick={() => console.log('clicked')}
                    size="md"
                    type="default"
                    style={{}}>
                </Button>
            </Grid>
            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Typography variant="h5" fontFamily={'Blue Curve'}>Извините, все активные сессии заняты</Typography>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Registr_btn'
                    title="На главную"
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="primary"
                    style={{}}>
                </Button>
            </Grid>
        </Container>
    )
}

export default Sorry;