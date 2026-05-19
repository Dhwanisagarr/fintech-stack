export const APP_CATEGORIES = {
  upi: 'UPI & Payments',
  banking: 'Neobanks & Banking',
  investment: 'Investing & Trading',
  credit: 'Credit Cards',
  travel: 'Travel & Forex',
}

export const FINTECH_APPS = [
  // UPI
  { id: 'gpay', name: 'Google Pay', category: 'upi', domain: 'google.com', brandColor: '#4285F4', website: 'https://pay.google.com' },
  { id: 'phonepe', name: 'PhonePe', category: 'upi', domain: 'phonepe.com', brandColor: '#5F259F', website: 'https://phonepe.com' },
  { id: 'paytm', name: 'Paytm', category: 'upi', domain: 'paytm.com', brandColor: '#00BAF2', website: 'https://paytm.com' },
  { id: 'amazonpay', name: 'Amazon Pay', category: 'upi', domain: 'amazon.in', brandColor: '#FF9900', website: 'https://amazon.in/amazonpay' },
  { id: 'bhim', name: 'BHIM', category: 'upi', domain: 'npci.org.in', brandColor: '#008C44', website: 'https://bhimupi.org.in' },
  { id: 'cred', name: 'CRED', category: 'upi', domain: 'cred.club', brandColor: '#1A1A1A', website: 'https://cred.club' },
  { id: 'whatsapppay', name: 'WhatsApp Pay', category: 'upi', domain: 'whatsapp.com', brandColor: '#25D366', website: 'https://www.whatsapp.com' },
  { id: 'mobikwik', name: 'Mobikwik', category: 'upi', domain: 'mobikwik.com', brandColor: '#0C4DA2', website: 'https://mobikwik.com' },
  { id: 'freecharge', name: 'Freecharge', category: 'upi', domain: 'freecharge.in', brandColor: '#6B2D99', website: 'https://freecharge.in' },
  { id: 'navi', name: 'Navi', category: 'upi', domain: 'navi.com', brandColor: '#6C3CE9', website: 'https://navi.com' },
  // Banking
  { id: 'fi', name: 'Fi', category: 'banking', domain: 'fi.money', brandColor: '#00D09C', website: 'https://fi.money' },
  { id: 'jupiter', name: 'Jupiter', category: 'banking', domain: 'jupiter.money', brandColor: '#F97316', website: 'https://jupiter.money' },
  { id: 'niyo', name: 'Niyo', category: 'banking', domain: 'goniyo.com', brandColor: '#7C3AED', website: 'https://goniyo.com' },
  { id: 'hdfc', name: 'HDFC', category: 'banking', domain: 'hdfcbank.com', brandColor: '#004C8F', website: 'https://hdfcbank.com' },
  { id: 'icici', name: 'ICICI', category: 'banking', domain: 'icicibank.com', brandColor: '#F58220', website: 'https://icicibank.com' },
  { id: 'sbi', name: 'SBI', category: 'banking', domain: 'sbi.co.in', brandColor: '#22409A', website: 'https://sbi.co.in' },
  { id: 'kotak811', name: 'Kotak811', category: 'banking', domain: 'kotak.com', brandColor: '#ED1C24', website: 'https://kotak811.com' },
  { id: 'axis', name: 'Axis Bank', category: 'banking', domain: 'axisbank.com', brandColor: '#971237', website: 'https://axisbank.com' },
  { id: 'idfc', name: 'IDFC First', category: 'banking', domain: 'idfcfirstbank.com', brandColor: '#9D2235', website: 'https://idfcfirstbank.com' },
  { id: 'aubank', name: 'AU Bank', category: 'banking', domain: 'aubank.in', brandColor: '#6B2C91', website: 'https://aubank.in' },
  // Investment
  { id: 'zerodha', name: 'Zerodha', category: 'investment', domain: 'zerodha.com', brandColor: '#387ED1', website: 'https://zerodha.com' },
  { id: 'groww', name: 'Groww', category: 'investment', domain: 'groww.in', brandColor: '#00D09C', website: 'https://groww.in' },
  { id: 'upstox', name: 'Upstox', category: 'investment', domain: 'upstox.com', brandColor: '#5A2D8C', website: 'https://upstox.com' },
  { id: 'fyers', name: 'Fyers', category: 'investment', domain: 'fyers.in', brandColor: '#4361EE', website: 'https://fyers.in' },
  { id: 'angelone', name: 'Angel One', category: 'investment', domain: 'angelone.in', brandColor: '#F26F21', website: 'https://angelone.in' },
  { id: 'indmoney', name: 'INDmoney', category: 'investment', domain: 'indmoney.com', brandColor: '#1E3A8A', website: 'https://indmoney.com' },
  { id: 'paytmmoney', name: 'Paytm Money', category: 'investment', domain: 'paytmmoney.com', brandColor: '#00BAF2', website: 'https://paytmmoney.com' },
  { id: 'etmoney', name: 'ET Money', category: 'investment', domain: 'etmoney.com', brandColor: '#E11D48', website: 'https://etmoney.com' },
  { id: 'dhan', name: 'Dhan', category: 'investment', domain: 'dhan.co', brandColor: '#F59E0B', website: 'https://dhan.co' },
  { id: '5paisa', name: '5paisa', category: 'investment', domain: '5paisa.com', brandColor: '#DC2626', website: 'https://5paisa.com' },
  // Credit
  { id: 'slice', name: 'Slice', category: 'credit', domain: 'sliceit.com', brandColor: '#8B5CF6', website: 'https://sliceit.com' },
  { id: 'onecard', name: 'OneCard', category: 'credit', domain: 'getonecard.app', brandColor: '#111827', website: 'https://getonecard.app' },
  { id: 'sbicashback', name: 'SBI Cashback', category: 'credit', domain: 'sbi.co.in', brandColor: '#22409A', website: 'https://sbi.co.in' },
  { id: 'hdfcregalia', name: 'HDFC Regalia', category: 'credit', domain: 'hdfcbank.com', brandColor: '#004C8F', website: 'https://hdfcbank.com' },
  { id: 'axisace', name: 'Axis Ace', category: 'credit', domain: 'axisbank.com', brandColor: '#971237', website: 'https://axisbank.com' },
  { id: 'iciciamazon', name: 'ICICI Amazon Pay', category: 'credit', domain: 'icicibank.com', brandColor: '#F58220', website: 'https://icicibank.com' },
  { id: 'idfcwow', name: 'IDFC Wow', category: 'credit', domain: 'idfcfirstbank.com', brandColor: '#9D2235', website: 'https://idfcfirstbank.com' },
  { id: 'scapia', name: 'Scapia', category: 'credit', domain: 'scapia.cards', brandColor: '#0F766E', website: 'https://scapia.cards' },
  { id: 'unicard', name: 'Uni Card', category: 'credit', domain: 'uni.club', brandColor: '#6366F1', website: 'https://uni.club' },
  // Travel
  { id: 'niyoglobal', name: 'Niyo Global', category: 'travel', domain: 'goniyo.com', brandColor: '#7C3AED', website: 'https://goniyo.com' },
  { id: 'ixigo', name: 'Ixigo AU', category: 'travel', domain: 'ixigo.com', brandColor: '#EF4444', website: 'https://ixigo.com' },
  { id: 'makemytrip', name: 'MakeMyTrip', category: 'travel', domain: 'makemytrip.com', brandColor: '#E11D48', website: 'https://makemytrip.com' },
  { id: 'yatra', name: 'Yatra', category: 'travel', domain: 'yatra.com', brandColor: '#DC2626', website: 'https://yatra.com' },
  { id: 'easemytrip', name: 'EaseMyTrip', category: 'travel', domain: 'easemytrip.com', brandColor: '#2563EB', website: 'https://easemytrip.com' },
  { id: 'axisatlas', name: 'Axis Atlas', category: 'travel', domain: 'axisbank.com', brandColor: '#971237', website: 'https://axisbank.com' },
  { id: 'airindia', name: 'Air India Card', category: 'travel', domain: 'airindia.in', brandColor: '#DC2626', website: 'https://airindia.in' },
]

export function getAppById(id) {
  return FINTECH_APPS.find((a) => a.id === id)
}

const NAME_ALIASES = {
  gpay: 'gpay',
  'google pay': 'gpay',
  fyers: 'fyers',
  'niyo savings': 'niyoglobal',
  'niyo global': 'niyoglobal',
  'sbi cashback': 'sbicashback',
  'hdfc regalia': 'hdfcregalia',
  'axis atlas': 'axisatlas',
  'hdfc cards': 'hdfcregalia',
}

export function getAppByName(name) {
  const normalized = name?.toLowerCase().trim()
  const aliasId = NAME_ALIASES[normalized]
  if (aliasId) return getAppById(aliasId)
  return FINTECH_APPS.find(
    (a) =>
      a.name.toLowerCase() === normalized ||
      a.id === normalized ||
      a.name.toLowerCase().replace(/\s/g, '') === normalized?.replace(/\s/g, '')
  )
}

export function getAppsByCategory(category) {
  return FINTECH_APPS.filter((a) => a.category === category)
}

export function getLogoUrl(domain) {
  return `https://logo.clearbit.com/${domain}`
}

export const FEATURED_APP_IDS = [
  'fyers', 'phonepe', 'gpay', 'fi', 'zerodha', 'groww', 'cred', 'niyo', 'jupiter', 'slice', 'hdfc', 'sbi',
]
