import { motion } from "framer-motion";
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
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${startBg})` }}
      />
      
      {/* Score Badge - shown if player exists */}
      {player && !isRegistering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-4 top-4 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-2 shadow-lg"
        >
          <span className="text-2xl">⭐</span>
          <div className="text-primary-foreground">
            <p className="text-xs font-medium opacity-80">Gesamtpunkte</p>
            <p className="font-display text-xl font-bold">{player.totalScore}</p>
          </div>
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
          {/* Desktop Visual - clickable only when not registering */}
          <motion.img
            src={desktopVisual}
            alt="Dein Korb zum Glück"
            className={`max-w-full md:max-w-2xl ${!isRegistering ? 'cursor-pointer' : ''}`}
            whileHover={!isRegistering ? { scale: 1.02 } : {}}
            whileTap={!isRegistering ? { scale: 0.98 } : {}}
            onClick={!isRegistering ? onStart : undefined}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StartScreen;
