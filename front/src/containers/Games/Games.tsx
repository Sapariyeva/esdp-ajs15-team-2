import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { GameSort } from "@/containers/Games/GameSort/GameSort";
import { Configure } from "@/containers/Games/Configure/Configure";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { GameShow } from "./GameShow/GameShow";
import { GameNameIt } from "./GameNameIt/GameNameIt";

function Games() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isConfigureVisible, setIsConfigureVisible] = useState(true);
    const sessionFormat = useAppSelector((state) => state.configure.sessionFormat);

    const startGame = () => {
        setIsGameStarted(true);
        setIsConfigureVisible(false);
    };

    const endGame = () => {
        setIsGameStarted(false);
        navigate('/main')
    };

    const restartGame = () => {
        setIsGameStarted(false);
        setTimeout(() => {
            setIsGameStarted(true);
        }, 0);
    };

    const closeConfigure = () => {
        setIsConfigureVisible(false);
        navigate('/main')
    };

    return (
        <div>
            {isGameStarted ? (
                sessionFormat === t('sorting') ? (
                    <GameSort endGame={endGame} restartGame={restartGame} />
                  ) : sessionFormat === t('show') ? (
                    <GameShow endGame={endGame} restartGame={restartGame}/>
                  ) : sessionFormat === t('name') ? (
                    <GameNameIt />
                  ): null
            ) : (
                <Configure 
                    startGame={startGame}
                    visible={isConfigureVisible}
                    onClose={closeConfigure}
                ></Configure>
            )}
        </div>
    );
}

export default Games;