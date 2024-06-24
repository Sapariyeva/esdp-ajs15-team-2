import { useState } from "react";
import { SortingGame } from "@/containers/Games/SortingGame/SortingGame";
import { Configure } from "@/containers/Games/Configure/Configure";
import { useNavigate } from "react-router-dom";

function Games() {
    const navigate = useNavigate();
    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const endGame = () => {
        setIsGameStarted(false);
    };

    const restartGame = () => {
        setIsGameStarted(false);
        setTimeout(() => {
            setIsGameStarted(true);
        }, 0);
    };

  return (
        <div>
            {isGameStarted ? (
                <SortingGame endGame={endGame} restartGame={restartGame} />
            ) : (
                <Configure 
                    startGame={startGame}
                    visible={true}
                    onClose={() => navigate('/main')}
                ></Configure>
            )}
        </div>
    );
}

export default Games;