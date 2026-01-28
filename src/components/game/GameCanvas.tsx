import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gameBackground from "@/assets/game-background.png";
import pizzaImg from "@/assets/products/pizza.png";
import cafeImg from "@/assets/products/cafe.png";
import colaImg from "@/assets/products/cola.png";
import mezzomixImg from "@/assets/products/mezzomix.png";
import colazeroImg from "@/assets/products/colazero.png";
import type { FallingProduct, PlayerInfo } from "./types";
import { ORLEN_PRODUCTS, WRONG_PRODUCTS } from "./types";

interface GameCanvasProps {
  player: PlayerInfo;
  onGameOver: (score: number) => void;
}

const CART_WIDTH = 120;
const PRODUCT_SIZE = 72; // 20% larger than 60
const GAME_DURATION = 60000; // 1 minute
const INITIAL_SPAWN_RATE = 1200;

// Image mapping
const productImages: Record<string, string> = {
  'pizza': pizzaImg,
  'cafe': cafeImg,
  'cola': colaImg,
  'mezzomix': mezzomixImg,
  'colazero': colazeroImg,
};

const GameCanvas = ({ player, onGameOver }: GameCanvasProps) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [products, setProducts] = useState<FallingProduct[]>([]);
  const [cartX, setCartX] = useState(50);
  const [showFeedback, setShowFeedback] = useState<{ text: string; isPositive: boolean; x: number } | null>(null);
  const [missedProducts, setMissedProducts] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const livesRef = useRef(lives);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameStartTimeRef = useRef(Date.now());
  const scoreRef = useRef(0);

  // Keep score ref in sync
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  // Game timer - 1 minute
  useEffect(() => {
    if (lives <= 0) return;

    const timer = setInterval(() => {
      const elapsed = Date.now() - gameStartTimeRef.current;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        onGameOver(scoreRef.current);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [lives, onGameOver]);

  // Spawn new products
  useEffect(() => {
    if (lives <= 0) return;

    let timeoutId: number | undefined;
    let cancelled = false;

    const spawnProduct = () => {
      if (cancelled) return;
      if (livesRef.current <= 0) return;

      const elapsed = Date.now() - gameStartTimeRef.current;
      if (elapsed >= GAME_DURATION) return;

      // 60% chance ORLEN, 40% chance wrong product
      const isOrlen = Math.random() < 0.6;
      const productPool = isOrlen ? ORLEN_PRODUCTS : WRONG_PRODUCTS;
      const randomProduct = productPool[Math.floor(Math.random() * productPool.length)];

      const newProduct: FallingProduct = {
        ...randomProduct,
        id: `${randomProduct.id}-${Date.now()}-${Math.random()}`,
        x: Math.random() * 80 + 10, // 10-90% of screen width
        y: -10,
        // constant difficulty (no 10s speed steps)
        speed: 2.6 + Math.random() * 1.6,
        rotation: Math.random() * 360,
      };

      setProducts(prev => [...prev, newProduct]);
      
      timeoutId = window.setTimeout(spawnProduct, INITIAL_SPAWN_RATE);
    };

    // Start spawning
    timeoutId = window.setTimeout(spawnProduct, 500);
    
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [lives]);

  // Game loop - move products
  useEffect(() => {
    if (lives <= 0 || timeLeft <= 0) return;

    const gameLoop = setInterval(() => {
      setProducts(prev => {
        const updated = prev.map(p => ({
          ...p,
          y: p.y + p.speed,
          rotation: p.rotation + 2,
        }));

        // Check for missed ORLEN products
        const missed = updated.filter(p => p.y > 100 && p.isOrlen && !missedProducts.includes(p.id));
        if (missed.length > 0) {
          setMissedProducts(prevMissed => [...prevMissed, ...missed.map(m => m.id)]);
          missed.forEach(() => {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                onGameOver(scoreRef.current);
              }
              return newLives;
            });
            setShowFeedback({ text: "Verpasst! ❌", isPositive: false, x: 50 });
            setTimeout(() => setShowFeedback(null), 800);
          });
        }

        // Remove products that are off screen
        return updated.filter(p => p.y < 110);
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [lives, timeLeft, onGameOver, missedProducts]);

  // Handle cart movement
  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    setCartX(Math.max(10, Math.min(90, x)));
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        setCartX(prev => Math.max(10, prev - 5));
      } else if (e.key === "ArrowRight" || e.key === "d") {
        setCartX(prev => Math.min(90, prev + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Collision detection
  useEffect(() => {
    if (lives <= 0 || timeLeft <= 0) return;

    setProducts(prev => {
      const remaining: FallingProduct[] = [];
      
      prev.forEach(product => {
        const productCenterX = product.x;
        const productBottomY = product.y + (PRODUCT_SIZE / window.innerHeight) * 100;
        
        const cartLeft = cartX - (CART_WIDTH / window.innerWidth) * 50;
        const cartRight = cartX + (CART_WIDTH / window.innerWidth) * 50;
        const cartTop = 85;

        // Check collision
        if (
          productBottomY >= cartTop &&
          productBottomY <= cartTop + 10 &&
          productCenterX >= cartLeft - 5 &&
          productCenterX <= cartRight + 5
        ) {
          // Caught!
          if (product.isOrlen) {
            setScore(s => s + product.points);
            setShowFeedback({ text: `+${product.points} ⭐`, isPositive: true, x: product.x });
          } else {
            setScore(s => Math.max(0, s + product.points));
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                onGameOver(scoreRef.current);
              }
              return newLives;
            });
            setShowFeedback({ text: `${product.points} ❌`, isPositive: false, x: product.x });
          }
          setTimeout(() => setShowFeedback(null), 800);
        } else {
          remaining.push(product);
        }
      });
      
      return remaining;
    });
  }, [cartX, lives, timeLeft, onGameOver]);

  // Format time display
  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <div 
      ref={gameAreaRef}
      className="relative h-screen w-full cursor-none overflow-hidden select-none"
      style={{ backgroundImage: `url(${gameBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* HUD */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
        {/* Lives */}
        <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              animate={i >= lives ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              className={`text-2xl ${i >= lives ? 'grayscale' : ''}`}
            >
              ❤️
            </motion.span>
          ))}
        </div>
        
        {/* Timer */}
        <div className="rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
          <span className={`font-display text-xl font-bold ${timeLeft <= 10000 ? 'text-destructive' : 'text-white'}`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>
        
        {/* Score */}
        <motion.div 
          key={score}
          animate={{ scale: [1, 1.1, 1] }}
          className="rounded-full bg-black/60 px-6 py-2 backdrop-blur-sm"
        >
          <span className="font-display text-2xl font-bold text-score-gold">
            {score} Punkte
          </span>
        </motion.div>
      </div>

      {/* Player name */}
      <div className="absolute left-4 top-16 z-20 rounded-lg bg-primary/90 px-3 py-1">
        <span className="font-semibold text-primary-foreground">{player.name}</span>
      </div>

      {/* Falling products */}
      <AnimatePresence>
        {products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'absolute',
              left: `${product.x}%`,
              top: `${product.y}%`,
              transform: `translate(-50%, -50%)`,
              width: PRODUCT_SIZE,
              height: PRODUCT_SIZE,
            }}
            className="flex items-center justify-center"
          >
            {product.isOrlen ? (
              <img 
                src={productImages[product.id.split('-')[0]]} 
                alt={product.name}
                className="h-full w-full object-contain drop-shadow-lg"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-destructive shadow-lg">
                <span className="text-3xl">❌</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Feedback popup */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            exit={{ opacity: 0, y: -100 }}
            style={{ left: `${showFeedback.x}%` }}
            className={`absolute top-1/2 z-30 -translate-x-1/2 font-display text-3xl font-bold ${
              showFeedback.isPositive ? 'text-success' : 'text-destructive'
            }`}
          >
            {showFeedback.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart */}
      <motion.div
        animate={{ x: '-50%' }}
        style={{ left: `${cartX}%` }}
        className="absolute bottom-4 z-10 flex flex-col items-center"
      >
        <div className="relative">
          {/* Cart body */}
          <div className="flex h-20 w-28 items-end justify-center rounded-b-2xl rounded-t-lg bg-gradient-to-b from-primary to-primary/80 shadow-2xl">
            <div className="mb-2 text-4xl">🛒</div>
          </div>
          {/* Cart wheels */}
          <div className="absolute -bottom-2 left-2 h-4 w-4 rounded-full bg-gray-800" />
          <div className="absolute -bottom-2 right-2 h-4 w-4 rounded-full bg-gray-800" />
        </div>
        <p className="mt-1 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
          ← → oder Maus
        </p>
      </motion.div>

      {/* Instructions overlay at start */}
      <div className="pointer-events-none absolute bottom-32 left-0 right-0 text-center">
        <p className="text-shadow-game text-lg font-semibold text-white">
          Fange nur ORLEN & Star Produkte! 🌟
        </p>
      </div>
    </div>
  );
};

export default GameCanvas;
