import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlayerInfo } from "./types";

interface RegistrationFormProps {
  onSubmit: (playerInfo: PlayerInfo) => void;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein";
    } else if (name.length > 100) {
      newErrors.name = "Name ist zu lang (max. 100 Zeichen)";
    }
    
    if (!email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail ein";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail ein";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name: name.trim(), email: email.trim(), totalScore: 0 });
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <h2 className="game-title text-3xl text-primary-foreground md:text-4xl">
              Registrierung
            </h2>
            <p className="mt-2 text-primary-foreground/90">
              Melde dich an und sammle Punkte!
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
                maxLength={100}
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                maxLength={255}
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-primary py-4 font-display text-xl font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
            >
              Spiel starten! 🎮
            </motion.button>
          </form>
          
          {/* Rules hint */}
          <div className="border-t border-border bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold">Spielregeln:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✅ Fange ORLEN & Star Produkte</li>
              <li>❌ Vermeide fremde Marken & Müll</li>
              <li>❤️ Du hast 3 Leben</li>
              <li>🏆 Sammle Punkte für Prämien!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationForm;
