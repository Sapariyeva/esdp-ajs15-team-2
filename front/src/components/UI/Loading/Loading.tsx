import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';

const Loading = () => {
    const { t } = useTranslation();

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="center" margin={'150px 0 30px'}>
                <img src={logo} alt="Логотип" width={"40%"} />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Typography variant="h5" fontFamily={'Blue Curve'}>{t("loading")}</Typography>
            </Grid>
        </Container>
    )
}

export default Loading;