import { Container, Grid, Typography } from '@mui/material';
import logo from '@/assets/images/logo.svg';
import { Button } from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Input/Input';


const PanrentName = () => {

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
            <Grid display="flex" justifyContent="center" marginTop={"20px"} flexDirection={"column"} alignItems={"center"}>
                <Input
                    type="email"
                    placeholder="exampe@gmail.com"
                    value={""}
                    onChange={() => {}}
                    required
                    style={{ width: '290px' }}
                />
                <Button
                    className='Registr_btn'
                    title="Продолжить"
                    onClick={() => console.log('clicked')}
                    size="lg"
                    type="primary"
                    style={{}}>
                </Button>
            </Grid>
        </Container>
    )
}

export default PanrentName;