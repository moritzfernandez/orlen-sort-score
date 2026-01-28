import { motion } from "framer-motion";
import type { PlayerInfo } from "./types";

interface GameOverProps {
  score: number;
  player: PlayerInfo;
  onRestart: () => void;
  onBackToStart: () => void;
}

const GameOver = ({ score, player, onRestart, onBackToStart }: GameOverProps) => {
  const getMessage = () => {
    if (score >= 200) return { emoji: "🏆", text: "Fantastisch!" };
    if (score >= 100) return { emoji: "🌟", text: "Super gemacht!" };
    if (score >= 50) return { emoji: "👍", text: "Gut gespielt!" };
    return { emoji: "💪", text: "Versuch's nochmal!" };
  };

  const { emoji, text } = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-muted p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="bg-primary p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-4 text-7xl"
          >
            {emoji}
          </motion.div>
          <h1 className="game-title text-4xl text-primary-foreground">
            Spiel vorbei!
          </h1>
          <p className="mt-2 text-xl text-primary-foreground/90">{text}</p>
        </div>

        {/* Score */}
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Spieler: {player.name}</p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-6"
          >
            <p className="text-lg text-muted-foreground">Deine Punkte</p>
            <p className="font-display text-6xl font-bold text-primary">
              {score}
            </p>
          </motion.div>

          <div className="mb-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              💡 Tipp: Diese Punkte kannst du an der Tankstelle einlösen!
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="w-full rounded-lg bg-primary py-4 font-display text-xl font-bold uppercase tracking-wide text-primary-foreground shadow-lg"
            >
              Nochmal spielen 🎮
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToStart}
              className="w-full rounded-lg border-2 border-primary bg-transparent py-3 font-display text-lg font-bold uppercase tracking-wide text-primary"
            >
              Zum Startbildschirm
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🛢️ ORLEN & Star - Dein Korb zum Glück!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
