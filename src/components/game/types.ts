export interface Product {
  id: string;
  name: string;
  emoji: string;
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
}

export interface GameState {
  score: number;
  lives: number;
  isPlaying: boolean;
  isGameOver: boolean;
  products: FallingProduct[];
}

// ORLEN/Star branded products (collect these!)
export const ORLEN_PRODUCTS: Product[] = [
  { id: 'star-energy-mango', name: 'Star Energy Mango Peach', emoji: '🥤', isOrlen: true, points: 10 },
  { id: 'star-eis', name: 'STAR EIS', emoji: '🍦', isOrlen: true, points: 10 },
  { id: 'star-kesselchip', name: 'Star Kesselchip', emoji: '🥔', isOrlen: true, points: 15 },
  { id: 'star-peanut-bar', name: 'STAR PEANUT CARAMEL BAR', emoji: '🍫', isOrlen: true, points: 10 },
  { id: 'star-energy-acai', name: 'STAR ENERGY ACAI', emoji: '🫐', isOrlen: true, points: 10 },
  { id: 'star-energy-drink', name: 'STAR ENERGY DRINK', emoji: '⚡', isOrlen: true, points: 10 },
  { id: 'star-curry-ketchup', name: 'STAR CURRY-KETCHUP', emoji: '🍅', isOrlen: true, points: 15 },
  { id: 'star-apfelschorle', name: 'STAR APFELSCHORLE', emoji: '🍎', isOrlen: true, points: 10 },
  { id: 'star-mineralwasser', name: 'STAR MINERALWASSER', emoji: '💧', isOrlen: true, points: 10 },
  { id: 'star-salami', name: 'STAR Salami', emoji: '🥩', isOrlen: true, points: 15 },
  { id: 'star-kaffee', name: 'STAR KAFFEE', emoji: '☕', isOrlen: true, points: 10 },
  { id: 'petrol-canister', name: 'Benzinkanister', emoji: '⛽', isOrlen: true, points: 20 },
  { id: 'petrol-pump', name: 'Zapfsäule', emoji: '🛢️', isOrlen: true, points: 20 },
  { id: 'baked-goods', name: 'Backwaren', emoji: '🥐', isOrlen: true, points: 10 },
  { id: 'car-wash', name: 'Waschanlage', emoji: '🚿', isOrlen: true, points: 25 },
  { id: 'gift-card', name: 'Geschenkkarte', emoji: '🎁', isOrlen: true, points: 15 },
];

// Non-ORLEN products (avoid these!)
export const WRONG_PRODUCTS: Product[] = [
  { id: 'coca-cola', name: 'Coca Cola', emoji: '🥤', isOrlen: false, points: -15 },
  { id: 'pepsi', name: 'Pepsi', emoji: '🥤', isOrlen: false, points: -15 },
  { id: 'red-bull', name: 'Red Bull', emoji: '🐂', isOrlen: false, points: -15 },
  { id: 'trash', name: 'Müll', emoji: '🗑️', isOrlen: false, points: -20 },
  { id: 'banana-peel', name: 'Bananenschale', emoji: '🍌', isOrlen: false, points: -10 },
  { id: 'old-tire', name: 'Alter Reifen', emoji: '⭕', isOrlen: false, points: -15 },
  { id: 'shell-logo', name: 'Shell', emoji: '🐚', isOrlen: false, points: -25 },
  { id: 'aral-logo', name: 'Aral', emoji: '🔵', isOrlen: false, points: -25 },
  { id: 'broken-bottle', name: 'Kaputte Flasche', emoji: '🍾', isOrlen: false, points: -10 },
  { id: 'cigarette-butt', name: 'Zigarettenstummel', emoji: '🚬', isOrlen: false, points: -20 },
];

export const ALL_PRODUCTS = [...ORLEN_PRODUCTS, ...WRONG_PRODUCTS];
