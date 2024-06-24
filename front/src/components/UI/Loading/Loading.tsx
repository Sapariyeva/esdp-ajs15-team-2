import { Container, Grid, Typography } from '@mui/material';
import logo from '../../../../public/images/logo/igrovuz-logo-lg.svg';

const Loading = () => {

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Typography variant="h5" fontFamily={'Blue Curve'}>Загружаем...</Typography>
            </Grid>
        </Container>
    )
}

export default Loading;