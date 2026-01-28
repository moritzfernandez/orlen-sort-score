import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import startBg from "@/assets/start-bg.png";
import desktopVisual from "@/assets/desktop-visual.png";
import type { PlayerInfo } from "./types";

interface StartScreenProps {
  onStart: () => void;
  player: PlayerInfo | null;
  isRegistering?: boolean;
}

const StartScreen = ({ onStart, player, isRegistering = false }: StartScreenProps) => {
  return (
    <section className="relative min-h-screen w-full">
      {/* Fixed Background Image */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${startBg})` }}
      />
      
      {/* Score Badge - shown if player exists */}
      {player && !isRegistering && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed right-0 top-4 z-30 flex flex-col bg-primary px-6 py-3 shadow-lg"
        >
          <p className="text-sm font-semibold text-primary-foreground">{player.name}</p>
          <p className="font-display text-2xl font-bold text-primary-foreground">🏆 {player.highScore || 0}</p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'ORLEN Star Game',
                  text: `My high score is ${player.highScore || 0} points in the ORLEN Star Game! Can you beat me?`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="mt-1 text-xs text-primary-foreground/80 underline hover:text-primary-foreground"
          >
            Share with Friends
          </button>
        </motion.div>
      )}
      
      {/* Content with Desktop Visual */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRegistering ? { opacity: 1, y: -100 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Desktop Visual - 15% larger */}
          <img
            src={desktopVisual}
            alt="Your Basket to Happiness"
            className="max-w-full md:max-w-3xl"
            style={{ transform: 'scale(1.15)' }}
          />
          
          {/* Play Button - only when not registering */}
          {!isRegistering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6"
            >
              <Button
                onClick={onStart}
                size="lg"
                className="h-16 px-12 text-2xl font-bold uppercase tracking-wide shadow-2xl"
              >
                Let's Go!
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StartScreen;
