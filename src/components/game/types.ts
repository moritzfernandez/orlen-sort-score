export interface Product {
  id: string;
  name: string;
  image?: string;
  isOrlen: boolean;
  points: number;
}

export interface FallingProduct extends Product {
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

export interface PlayerInfo {
  name: string;
  email: string;
  totalScore: number;
}

export interface GameState {
  score: number;
  lives: number;
  isPlaying: boolean;
  isGameOver: boolean;
  products: FallingProduct[];
}

// ORLEN/Star branded products (collect these!) - +10 points
export const ORLEN_PRODUCTS: Product[] = [
  { id: 'pizza', name: 'Star Pizza', image: '/src/assets/products/pizza.png', isOrlen: true, points: 10 },
  { id: 'cafe', name: 'Star Café', image: '/src/assets/products/cafe.png', isOrlen: true, points: 10 },
  { id: 'chips-meersalz', name: 'Kessel Chips Meersalz', image: '/src/assets/products/chips-meersalz.png', isOrlen: true, points: 10 },
  { id: 'chips-paprika', name: 'Kessel Chips Paprika', image: '/src/assets/products/chips-paprika.png', isOrlen: true, points: 10 },
  { id: 'cola', name: 'Coca Cola', image: '/src/assets/products/cola.png', isOrlen: true, points: 10 },
  { id: 'mezzomix', name: 'Mezzo Mix', image: '/src/assets/products/mezzomix.png', isOrlen: true, points: 10 },
  { id: 'colazero', name: 'Cola Zero', image: '/src/assets/products/colazero.png', isOrlen: true, points: 10 },
];

// Bonus Logo (rare!) - +20 points
export const BONUS_LOGO: Product = { 
  id: 'orlen-star-logo', 
  name: 'ORLEN Star Logo', 
  image: '/src/assets/products/orlen-star-logo.png', 
  isOrlen: true, 
  points: 20 
};

// Wrong products (avoid these!) - -5 points
export const WRONG_PRODUCTS: Product[] = [
  { id: 'wrong-tree', name: 'Baum', image: '/src/assets/products/wrong-tree.png', isOrlen: false, points: -5 },
  { id: 'wrong-chair', name: 'Stuhl', image: '/src/assets/products/wrong-chair.png', isOrlen: false, points: -5 },
  { id: 'wrong-pliers', name: 'Zange', image: '/src/assets/products/wrong-pliers.png', isOrlen: false, points: -5 },
  { id: 'wrong-puppy', name: 'Welpe', image: '/src/assets/products/wrong-puppy.png', isOrlen: false, points: -5 },
  { id: 'wrong-dog', name: 'Hund', image: '/src/assets/products/wrong-dog.png', isOrlen: false, points: -5 },
  { id: 'wrong-football', name: 'Fußball', image: '/src/assets/products/wrong-football.png', isOrlen: false, points: -5 },
  { id: 'wrong-pumpkin', name: 'Kürbis', image: '/src/assets/products/wrong-pumpkin.png', isOrlen: false, points: -5 },
  { id: 'wrong-lamp', name: 'Lampe', image: '/src/assets/products/wrong-lamp.png', isOrlen: false, points: -5 },
  { id: 'wrong-horseshoe', name: 'Hufeisen', image: '/src/assets/products/wrong-horseshoe.png', isOrlen: false, points: -5 },
  { id: 'wrong-cat', name: 'Katze', image: '/src/assets/products/wrong-cat.png', isOrlen: false, points: -5 },
];

export const ALL_PRODUCTS = [...ORLEN_PRODUCTS, ...WRONG_PRODUCTS];

// Storage key for player data
export const PLAYER_STORAGE_KEY = 'orlen-game-player';

// Save player to localStorage
export const savePlayer = (player: PlayerInfo) => {
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player));
};

// Load player from localStorage
export const loadPlayer = (): PlayerInfo | null => {
  const stored = localStorage.getItem(PLAYER_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

// Update player total score
export const updatePlayerScore = (additionalScore: number): PlayerInfo | null => {
  const player = loadPlayer();
  if (player) {
    player.totalScore = (player.totalScore || 0) + additionalScore;
    savePlayer(player);
    return player;
  }
  return null;
};
