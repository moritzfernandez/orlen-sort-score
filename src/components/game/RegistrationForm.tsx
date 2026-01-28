import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gameBackground from "@/assets/game-background.png";
import type { PlayerInfo } from "./types";
import { loadPlayer } from "./types";

interface RegistrationFormProps {
  onSubmit: (playerInfo: PlayerInfo) => void;
}

const RegistrationForm = ({
  onSubmit
}: RegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
    } = {};

    if (!isLogin && !name.trim()) {
      newErrors.name = "Please enter your name";
    } else if (!isLogin && name.length > 100) {
      newErrors.name = "Name is too long (max. 100 characters)";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Try to find existing player
        const existingPlayer = loadPlayer();
        if (existingPlayer && existingPlayer.email === email.trim()) {
          onSubmit(existingPlayer);
        } else {
          setErrors({ email: "No account found with this email" });
        }
      } else {
        onSubmit({
          name: name.trim(),
          email: email.trim(),
          highScore: 0
        });
      }
    }
  };

  return (
    <section 
      className="flex min-h-screen items-center justify-center p-4"
      style={{ 
        backgroundImage: `url(${gameBackground})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="w-full max-w-md"
      >
        <div className="overflow-hidden bg-card shadow-2xl">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              {isLogin ? "Welcome Back" : "Registration"}
            </h2>
            <p className="mt-2 text-primary-foreground/90">
              {isLogin ? "Login with your email" : "Sign up and collect points!"}
            </p>
          </div>
          
          {/* Toggle Login/Register */}
          <div className="flex border-b border-border">
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                !isLogin ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              New Player
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                isLogin ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Existing Player
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Name
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
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
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
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
              className="w-full bg-primary py-4 font-display text-xl font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
            >
              {isLogin ? "Login" : "Play Now"}
            </motion.button>
          </form>
          
          {/* Rules hint */}
          {!isLogin && (
            <div className="border-t border-border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold">Game Rules:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ Catch ORLEN & Star products</li>
                <li>❌ Avoid foreign brands & trash</li>
                <li>❤️ You have 3 lives</li>
                <li>🏆 Collect points for rewards!</li>
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationForm;
