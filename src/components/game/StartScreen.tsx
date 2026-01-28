import { motion } from "framer-motion";
import startScreenBg from "@/assets/start-screen.png";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const scrollToForm = () => {
    onStart();
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${startScreenBg})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-16">
        <motion.button
          onClick={scrollToForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pulse-glow rounded-lg bg-primary px-12 py-4 font-display text-2xl font-bold uppercase tracking-wide text-primary-foreground shadow-2xl transition-all hover:bg-primary/90"
        >
          Jetzt loslegen!
        </motion.button>
      </div>
    </section>
  );
};

export default StartScreen;
