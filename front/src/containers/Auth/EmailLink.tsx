import { Container, Grid, Typography } from '@mui/material';
import logo from '@/assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { resendConfirmEmail } from '@/features/userSlice';
import { Button } from '@/components/UI/Button/Button';

const EmailLink = () => {
    // const {registerData} = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="space-between" alignItems={"end"}>
                {/* <button className="Back_btn" onClick={() => navigate('/')}></button> */}
                <Button
                    className="Back_btn"
                    title=""
                    onClick={() => navigate('/')}
                    size="md"
                    type="primary"
                    style={{}}>
                </Button>
                {/* <button className='Support_btn'>Поддержка</button> */}
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
                <Typography variant="h5">Ссылка отправлена на почту. </Typography>
                <Typography variant="h5">Перейдите по ссылке для завершения регистрации</Typography>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                {/* <button className='Registr_btn' onClick={() => dispatch(resendConfirmEmail(registerData))}>Отправить ещё раз</button> */}
                <Button
                    className='Registr_btn'
                    title="Отправить ещё раз"
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="primary"
                    style={{}}>
                </Button>
            </Grid>
        </Container>
    )
}

export default EmailLink;