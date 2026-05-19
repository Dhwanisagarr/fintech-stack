import {
  GraduationCap,
  Briefcase,
  Laptop,
  TrendingUp,
  Plane,
  Rocket,
  UtensilsCrossed,
  ShoppingBag,
  Fuel,
  FileText,
  LineChart,
  Tv,
  Gamepad2,
  BookOpen,
  HeartPulse,
  Home,
  ShoppingCart,
  BadgePercent,
  Sparkles,
  Crown,
  Receipt,
  Shield,
  Gift,
  Lock,
  ArrowUpRight,
  Zap,
  Globe,
  PiggyBank,
  Target,
  Wallet,
  MapPin,
} from 'lucide-react'

export const USER_TYPES = [
  { value: 'student', label: 'Student', description: 'Campus life, tight budgets, first card', icon: GraduationCap },
  { value: 'salaried', label: 'Salaried', description: 'Stable income, bills, savings goals', icon: Briefcase },
  { value: 'freelancer', label: 'Freelancer', description: 'Variable income, invoicing, taxes', icon: Laptop },
  { value: 'investor', label: 'Investor', description: 'Markets, portfolios, active trading', icon: TrendingUp },
  { value: 'traveler', label: 'Traveler', description: 'Forex, flights, global spending', icon: Plane },
  { value: 'entrepreneur', label: 'Entrepreneur', description: 'Business spends, growth, scale', icon: Rocket },
]

export const SPENDING_HABITS = [
  { value: 'food_delivery', label: 'Food Delivery', icon: UtensilsCrossed },
  { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { value: 'fuel', label: 'Fuel', icon: Fuel },
  { value: 'travel', label: 'Travel', icon: Plane },
  { value: 'bills', label: 'Bills', icon: FileText },
  { value: 'investments', label: 'Investments', icon: LineChart },
  { value: 'ott', label: 'OTT Subscriptions', icon: Tv },
  { value: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { value: 'education', label: 'Education', icon: BookOpen },
  { value: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { value: 'rent', label: 'Rent', icon: Home },
  { value: 'groceries', label: 'Groceries', icon: ShoppingCart },
]

export const PRIORITIES = [
  { value: 'cashback', label: 'Cashback', icon: BadgePercent },
  { value: 'simplicity', label: 'Simplicity', icon: Sparkles },
  { value: 'premium', label: 'Premium Features', icon: Crown },
  { value: 'low_fees', label: 'Lowest Fees', icon: Receipt },
  { value: 'reliability', label: 'Reliability', icon: Shield },
  { value: 'rewards', label: 'Rewards', icon: Gift },
  { value: 'security', label: 'Security', icon: Lock },
  { value: 'investment_growth', label: 'Investment Growth', icon: ArrowUpRight },
  { value: 'fast_transfers', label: 'Fast Transfers', icon: Zap },
  { value: 'international', label: 'International Usage', icon: Globe },
]

export const FINANCIAL_GOALS = [
  { value: 'save_money', label: 'Save Money', description: 'Cut waste, grow emergency fund', icon: PiggyBank },
  { value: 'invest_better', label: 'Invest Better', description: 'Smarter portfolios & trading', icon: TrendingUp },
  { value: 'better_cashback', label: 'Better Cashback', description: 'Maximize rewards on spends', icon: Target },
  { value: 'reduce_fees', label: 'Reduce Fees', description: 'Lower brokerage & charges', icon: Wallet },
  { value: 'travel_smarter', label: 'Travel Smarter', description: 'Forex savings & travel perks', icon: MapPin },
]

export const ONBOARDING_APP_CATEGORIES = ['upi', 'banking', 'investment', 'credit', 'travel']
