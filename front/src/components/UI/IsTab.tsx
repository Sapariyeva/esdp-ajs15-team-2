import { Container, Grid, Typography } from '@mui/material';
// import logo from '@/assets/images/logo.svg';

const IsTab = () => {

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>

            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                {/* <img src={logo} alt="Логотип" width={"40%"} /> */}
            </Grid>
            <Grid display="flex" justifyContent="center">
                <Typography variant="h5">Приложение уже открыто в другой вкладке</Typography>
            </Grid>
        </Container>
    )
}

export default IsTab;