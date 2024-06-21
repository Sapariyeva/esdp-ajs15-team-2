import { Container, Grid, Typography } from '@mui/material';
import logo from '@/assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { resendConfirmEmail } from '@/features/userSlice';
import { Button } from '@/components/UI/Button/Button';

const ForgotPassword = () => {
    // const {registerData} = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
                <Typography variant="h5" fontFamily={'Blue Curve'}>Ссылка отправлена на почту. </Typography>
                <Typography variant="h5" fontFamily={'Blue Curve'}>Перейдите по ссылке для сброса пароля</Typography>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Retry_btn'
                    title="Отправить еще раз"
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="primary"
                    style={{}}>
                </Button>
            </Grid>
        </Container>
    )
}

export default ForgotPassword;