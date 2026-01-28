import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import type { PlayerInfo } from "./types";
import bgGame from "@/assets/bg-game.png";
import logo from "@/assets/logo.png";
import progressIcon from "@/assets/progress-icon.png";
import visualNeu from "@/assets/visual-neu.png";

interface GameOverProps {
  score: number;
  player: PlayerInfo;
  onRestart: () => void;
  onBackToStart: () => void;
}

const GameOver = ({ score, player, onRestart, onBackToStart }: GameOverProps) => {
  const [copied, setCopied] = useState(false);
  
  const getMessage = () => {
    if (score >= 200) return { text: "Fantastic!" };
    if (score >= 100) return { text: "Great job!" };
    if (score >= 50) return { text: "Well played!" };
    return { text: "Try again!" };
  };

  // Generate a unique 6-digit discount code
  const discountCode = useMemo(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const { text } = getMessage();
  const progressPercent = Math.min((score / 200) * 100, 100);
  const hasWon = score >= 200;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgGame})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo top-left - 100px from left, at top edge */}
      <div className="absolute top-0 z-20" style={{ left: '100px' }}>
        <img 
          src={logo} 
          alt="ORLEN Star" 
          className="w-[250px] h-auto"
        />
      </div>
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-full max-w-md overflow-hidden bg-card/95 backdrop-blur-sm shadow-2xl rounded-lg"
      >
        {/* Header */}
        <div className="bg-primary p-6 text-center">
          {/* Visual with shadow - larger */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-3 flex justify-center"
          >
            <img 
              src={visualNeu} 
              alt="Shop, Score & Win!" 
              className="w-2/3 h-auto object-contain drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-primary-foreground">
            {hasWon ? "You Won!" : "Game Over!"}
          </h1>
          
          {/* Discount Code - only shown if won */}
          {hasWon && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <p className="text-sm text-primary-foreground/80 mb-2">
                Copy and use for discount!
              </p>
              <motion.button
                onClick={handleCopyCode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-white/40 hover:bg-white/30 transition-colors"
              >
                <span className="font-display text-3xl font-bold tracking-widest text-primary-foreground">
                  {discountCode}
                </span>
                {copied ? (
                  <Check className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Copy className="w-6 h-6 text-primary-foreground" />
                )}
              </motion.button>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-primary-foreground"
                >
                  ✓ Copied!
                </motion.p>
              )}
            </motion.div>
          )}
          
          {!hasWon && (
            <p className="mt-2 text-xl text-primary-foreground/90">{text}</p>
          )}
        </div>

        {/* Score */}
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Player: {player.name}</p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-6"
          >
            <p className="text-lg text-muted-foreground">Your Score</p>
            <p className="font-display text-6xl font-bold text-primary">
              {score}
            </p>
          </motion.div>

          {/* Custom Progress Bar with Icon */}
          <div className="mb-4 space-y-3">
            <div className="relative flex items-center gap-2">
              {/* Progress Bar Container */}
              <div className="relative flex-1 h-4 bg-muted rounded-full overflow-visible">
                {/* Progress Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                />
                
                {/* Progress Icon at the tip */}
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: `${progressPercent}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 z-10"
                >
                  <img src={progressIcon} alt="Progress" className="w-full h-full object-contain" />
                  <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white text-xs">
                    {score}
                  </span>
                </motion.div>
              </div>
              
              {/* Target */}
              <span className="flex-shrink-0 font-display font-bold text-muted-foreground ml-4">200</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {score >= 200 
                ? "🎉 Reward unlocked!" 
                : `${200 - score} points missing to get the next reward`}
            </p>
            
            <p className="text-sm font-medium text-primary">
              Keep playing and secure great prizes!
            </p>
          </div>

          <div className="mb-6 bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              🏆 High Score: <span className="font-bold">{player.highScore || 0}</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="w-full bg-primary py-4 font-display text-xl font-bold uppercase tracking-wide text-primary-foreground shadow-lg rounded-lg"
            >
              Play Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToStart}
              className="w-full border-2 border-primary bg-transparent py-3 font-display text-lg font-bold uppercase tracking-wide text-primary rounded-lg"
            >
              Back to Start
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🛢️ ORLEN & Star - Your Basket to Happiness!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
