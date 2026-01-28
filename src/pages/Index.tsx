import { useState, useRef, useEffect } from "react";
import StartScreen from "@/components/game/StartScreen";
import RegistrationForm from "@/components/game/RegistrationForm";
import GameCanvas from "@/components/game/GameCanvas";
import GameOver from "@/components/game/GameOver";
import type { PlayerInfo } from "@/components/game/types";

type GamePhase = "start" | "register" | "playing" | "gameover";

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const registerRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    setPhase("register");
  };

  useEffect(() => {
    if (phase === "register" && registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [phase]);

  const handleRegistration = (playerInfo: PlayerInfo) => {
    setPlayer(playerInfo);
    setPhase("playing");
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setPhase("gameover");
  };

  const handleRestart = () => {
    setFinalScore(0);
    setPhase("playing");
  };

  const handleBackToStart = () => {
    setPlayer(null);
    setFinalScore(0);
    setPhase("start");
  };

  return (
    <div className="min-h-screen bg-background">
      {phase === "start" && (
        <>
          <StartScreen onStart={handleStartClick} />
        </>
      )}

      {phase === "register" && (
        <>
          <StartScreen onStart={handleStartClick} />
          <div ref={registerRef}>
            <RegistrationForm onSubmit={handleRegistration} />
          </div>
        </>
      )}

      {phase === "playing" && player && (
        <GameCanvas player={player} onGameOver={handleGameOver} />
      )}

      {phase === "gameover" && player && (
        <GameOver
          score={finalScore}
          player={player}
          onRestart={handleRestart}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
};

export default Index;
