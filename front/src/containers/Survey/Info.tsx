import { Container, Grid } from '@mui/material';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import { Card } from '@/components/UI/Card/Card';
import friends from '@/assets/images/find/friends.jpg';
import google from '@/assets/images/find/google.jpg';
import social from '@/assets/images/find/social.jpg';
import { useNavigate } from 'react-router-dom';

// Страница с выбором варианта "Как вы узнали о ИгроВУЗ?"
const Info = () => {
    const navigate = useNavigate();

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
                <Card
                    title="От друзей, родных или знакомых"
                    image={friends}
                ></Card>
                <Card
                    title="Из социальных сетей"
                    image={social}
                ></Card>
                <Card
                    title="Из поиска Google/Yandex"
                    image={google}
                ></Card>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className='Continue_btn'
                    title="Продолжить"
                    onClick={() => navigate('/main')}
                    size="lg"
                    type="primary"
                >
                </Button>
            </Grid>
        </Container>
    )
}

export default Info;