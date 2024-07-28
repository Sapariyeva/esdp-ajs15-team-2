import { Container, Grid } from '@mui/material';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import friends from '@/assets/images/find/friends.jpg';
import google from '@/assets/images/find/google.jpg';
import social from '@/assets/images/find/social.jpg';
import { useNavigate } from 'react-router-dom';
import { ISurvey } from '@/interfaces/ISurvey';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createSurvey } from '@/features/surveySlice';
import { CardSurvey } from '@/components/UI/CardSurvey/CardSurvey';

// Страница с выбором варианта "Как вы узнали о ИгроВУЗ?"
const Survey = () => {
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<ISurvey>({
        userId: "", source: ""
    });
    const [clickedCard, setClickedCard] = useState<number | null>(null)

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            userId: String(user!.id,)
        }))
    }, [])
    const handleClick = (index: number, title: string) => {
        setClickedCard(index);
        setState((prevState) => ({
            ...prevState,
            source: title,
        }))
    }

    const surveyCreate = (survey: ISurvey) => {
        dispatch(createSurvey(survey)).unwrap().then(() => {
            navigate("/main");
            setState({ userId: "", source: "" });
            setClickedCard(null);
        });
    };

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
                <CardSurvey
                    title="От друзей, родных или знакомых"
                    image={friends}
                    onClick={() => handleClick(0, "От друзей, родных или знакомых")}
                    isClicked={clickedCard === 0}
                ></CardSurvey>
                <CardSurvey
                    title="Из социальных сетей"
                    image={social}
                    onClick={() => handleClick(1, "Из социальных сетей")}
                    isClicked={clickedCard === 1}
                ></CardSurvey>
                <CardSurvey
                    title="Из поиска Google/Yandex"
                    image={google}
                    onClick={() => handleClick(2, "Из поиска Google/Yandex")}
                    isClicked={clickedCard === 2}
                ></CardSurvey>
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={"20px"}>
                <Button
                    className={`Continue_btn ${clickedCard === null ? 'Disabled' : ''}`}
                    title="Продолжить"
                    onClick={() => surveyCreate(state)}
                    size="lg"
                    type="primary"
                >
                </Button>
            </Grid>
        </Container>
    )
}

export default Survey;