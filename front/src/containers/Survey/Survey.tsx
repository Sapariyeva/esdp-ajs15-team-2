import { Container, Grid, useMediaQuery, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import friends from '@/assets/images/find/friends.jpg';
import google from '@/assets/images/find/google.jpg';
import social from '@/assets/images/find/social.jpg';
import { ISurvey } from '@/interfaces/ISurvey';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createSurvey } from '@/features/surveySlice';
import { CardSurvey } from '@/components/UI/CardSurvey/CardSurvey';

// Страница с выбором варианта "Как вы узнали о ИгроВУЗ?"
const Survey = () => {
    const { t } = useTranslation();

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<ISurvey>({
        userId: "", source: ""
    });
    const [clickedCard, setClickedCard] = useState<number | null>(null);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            userId: String(user!.id)
        }));
    }, [user]);

    const handleClick = (index: number, title: string) => {
        setClickedCard(index);
        setState((prevState) => ({
            ...prevState,
            source: title,
        }));
    };

    const surveyCreate = (survey: ISurvey) => {
        dispatch(createSurvey(survey)).unwrap().then(() => {
            navigate("/main");
            setState({ userId: "", source: "" });
            setClickedCard(null);
        });
    };

    const isTabletOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const isDesktopOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const gridDirection = isTabletOrLarger ? 'row' : 'column';
    const marginTop = isTabletOrLarger ? '20px' : '10px';

    return (
        <Container disableGutters sx={{ margin: 0 }} maxWidth="xl">
            <Grid display="flex" justifyContent="flex-end" alignItems={"end"} marginBottom={isDesktopOrLarger ? "100px" : "50px"}>
                {isDesktopOrLarger && (
                    <Button
                        className='Support_btn'
                        title={t("support")}
                        type="default"
                        style={{borderRadius: 8, fontSize: 20}}
                    />
                )}
            </Grid>
            <Grid display="flex" alignItems="center" flexDirection={"column"}>
                <Title
                    text={t("how_did_you_know")}
                />
            </Grid>
            <Grid
                display="flex"
                alignItems="center"
                flexDirection={gridDirection}
                justifyContent={isTabletOrLarger ? "space-evenly" : "center"}
                gap={isTabletOrLarger ? "20px" : "10px"}
            >
                <CardSurvey
                    title={t("from_friends")}
                    image={friends}
                    onClick={() => handleClick(0, "От друзей, родных или знакомых")}
                    isClicked={clickedCard === 0}
                />
                <CardSurvey
                    title={t("from_social_media")}
                    image={social}
                    onClick={() => handleClick(1, "Из социальных сетей")}
                    isClicked={clickedCard === 1}
                />
                <CardSurvey
                    title={t("from_search")}
                    image={google}
                    onClick={() => handleClick(2, "Из поиска Google/Yandex")}
                    isClicked={clickedCard === 2}
                />
            </Grid>
            <Grid display="flex" justifyContent="center" marginTop={marginTop}>
                <Button
                    className={`Continue_btn ${clickedCard === null ? 'Disabled' : ''}`}
                    title={t("continue")}
                    onClick={() => surveyCreate(state)}
                    size={buttonSize}
                    type="primary"
                />
            </Grid>
        </Container>
    );
}

export default Survey;
