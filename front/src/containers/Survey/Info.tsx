import { Container, Grid } from '@mui/material';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';

// Страница с выбором варианта "Как вы узнали о ИгроВУЗ?"
const Info = () => {

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth={false}>
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"} marginBottom={"100px"}>
                <Button
                    className='Support_btn'
                    title="Поддержка"
                    type="default"
                    style={{borderRadius: 8, fontSize: 20}}
                >
                </Button>
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Title
                    text="Как вы узнали о ИгроВУЗ?"
                />
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"row"} justifyContent={"space-evenly"} >
                <Button
                    className='card_btn'
                    title=""
                    onClick={() => console.log('clicked')}
                    size="md"
                    type="primary"
                    style={{}}>
                </Button>
                <Button
                    className='card_btn_social'
                    title=""
                    onClick={() => console.log('clicked')}
                    size="md"
                    type="primary"
                    style={{}}>
                </Button>
                <Button
                    className='card_btn_google'
                    title=""
                    onClick={() => console.log('clicked')}
                    size="md"
                    type="primary"
                    style={{}}>
                </Button>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Continue_btn'
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

export default Info;