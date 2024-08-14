import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';

// Страница "С вами поделились статистикой студента"
const Statistic = () => {
    const { t } = useTranslation();

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"}>
                <Button
                    className='Support_btn'
                    title={t('support')}
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
                <Title
                    text={t('shared_student_statistics')}
                />
                <Title
                    text={t('login_or_register_to_view')}
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"} flexDirection={"column"} alignItems={"center"}>
                <Button
                    className='Registr_btn'
                    title={t('registration')}
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="primary"
                    style={{}}>
                </Button>
                <Button
                    className='Login_btn'
                    title={t('login')}
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="default"
                    style={{}}>
                </Button>
            </Grid>
        </Container>
    )
}

export default Statistic;