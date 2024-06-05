import { useState } from "react";
import { Configure } from "./components/Configure";
import { Game } from "./components/Game";

function App() {
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
        <Game endGame={endGame} restartGame={restartGame} />
    ) : (
        <Configure startGame={startGame} />
    )}
</div>
  );
}

export default App;
