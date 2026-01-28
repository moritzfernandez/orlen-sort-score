import { motion } from "framer-motion";
import startBg from "@/assets/start-bg.png";
import desktopVisual from "@/assets/desktop-visual.png";
import type { PlayerInfo } from "./types";

interface StartScreenProps {
  onStart: () => void;
  player: PlayerInfo | null;
}

const StartScreen = ({ onStart, player }: StartScreenProps) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${startBg})` }}
      />
      
      {/* Score Badge - shown if player exists */}
      {player && (
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Desktop Visual - clickable */}
          <motion.img
            src={desktopVisual}
            alt="Dein Korb zum Glück"
            className="max-w-full cursor-pointer md:max-w-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StartScreen;
