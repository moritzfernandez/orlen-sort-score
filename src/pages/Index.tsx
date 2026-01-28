import { useState, useRef, useEffect } from "react";
import StartScreen from "@/components/game/StartScreen";
import RegistrationForm from "@/components/game/RegistrationForm";
import GameCanvas from "@/components/game/GameCanvas";
import GameOver from "@/components/game/GameOver";
import type { PlayerInfo } from "@/components/game/types";
import { savePlayer, loadPlayer, updatePlayerScore } from "@/components/game/types";

type GamePhase = "start" | "register" | "playing" | "gameover";

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const registerRef = useRef<HTMLDivElement>(null);

  // Load player from localStorage on mount
  useEffect(() => {
    const savedPlayer = loadPlayer();
    if (savedPlayer) {
      setPlayer(savedPlayer);
    }
  }, []);

  const handleStartClick = () => {
    if (player) {
      // Player already registered, start game directly
      setPhase("playing");
    } else {
      // New player, show registration
      setPhase("register");
    }
  };

  useEffect(() => {
    if (phase === "register" && registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [phase]);

  const handleRegistration = (playerInfo: PlayerInfo) => {
    savePlayer(playerInfo);
    setPlayer(playerInfo);
    setPhase("playing");
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    // Update total score
    const updatedPlayer = updatePlayerScore(score);
    if (updatedPlayer) {
      setPlayer(updatedPlayer);
    }
    setPhase("gameover");
  };

  const handleRestart = () => {
    setFinalScore(0);
    setPhase("playing");
  };

  const handleBackToStart = () => {
    setFinalScore(0);
    setPhase("start");
  };

  return (
    <div className="min-h-screen bg-background">
      {phase === "start" && (
        <StartScreen onStart={handleStartClick} player={player} />
      )}

      {phase === "register" && (
        <>
          <StartScreen onStart={handleStartClick} player={player} isRegistering={true} />
          <div ref={registerRef} className="relative z-20">
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
