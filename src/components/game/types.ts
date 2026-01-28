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
];

// Non-ORLEN products (avoid these!) - -5 points
export const WRONG_PRODUCTS: Product[] = [
  { id: 'cola', name: 'Coca Cola', image: '/src/assets/products/cola.png', isOrlen: false, points: -5 },
  { id: 'mezzomix', name: 'Mezzo Mix', image: '/src/assets/products/mezzomix.png', isOrlen: false, points: -5 },
  { id: 'colazero', name: 'Cola Zero', image: '/src/assets/products/colazero.png', isOrlen: false, points: -5 },
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
