import { FINTECH_APP_DATABASE, getDbAppById, getDbAppsByCategory } from './apps-db.js'

export const APP_CATEGORIES = {
  upi: 'UPI & Payments',
  banking: 'Neobanks & Banking',
  investment: 'Investing & Trading',
  credit: 'Credit Cards',
  travel: 'Travel & Forex',
  budgeting: 'Budget & Expense Tracking',
}

export const FINTECH_APPS = FINTECH_APP_DATABASE.map((app) => ({
  id: app.id,
  name: app.name,
  category: app.category,
  domain: app.domain,
  brandColor: app.brandColor,
  website: app.website,
  status: app.status,
  verified_at: app.last_verified_at,
}))

export function getAppById(id) {
  return getDbAppById(id) || FINTECH_APPS.find((a) => a.id === id)
}

const NAME_ALIASES = {
  gpay: 'gpay',
  'google pay': 'gpay',
  fyers: 'fyers',
  'niyo savings': 'niyoglobal',
  'niyo global': 'niyoglobal',
  'sbi cashback': 'sbicashback',
  'sbi cashback card': 'sbicashback',
  'hdfc regalia': 'hdfcregalia',
  'hdfc regalia gold': 'hdfcregalia',
  'axis atlas': 'axisatlas',
  'hdfc cards': 'hdfcregalia',
  'amazon pay icici': 'iciciamazon',
}

export function getAppByName(name) {
  if (!name) return null
  const normalized = name?.toLowerCase().trim()
  const aliasId = NAME_ALIASES[normalized]
  if (aliasId) return getAppById(aliasId)
  return (
    FINTECH_APPS.find(
      (a) =>
        a.name.toLowerCase() === normalized ||
        a.id === normalized ||
        a.name.toLowerCase().replace(/\s/g, '') === normalized?.replace(/\s/g, '')
    ) || null
  )
}

export function getAppsByCategory(category) {
  return getDbAppsByCategory(category)
}

export const LOCAL_LOGOS = {
  gpay: '/logos/gpay.svg',
  phonepe: '/logos/phonepe.svg',
  paytm: '/logos/paytm.svg',
  amazonpay: '/logos/amazonpay.svg',
  bhim: '/logos/bhim.png',
  cred: '/logos/cred.png',
  fi: '/logos/fi.png',
  jupiter: '/logos/jupiter.png',
  niyo: '/logos/niyo.png',
  hdfc: '/logos/hdfc.svg',
  icici: '/logos/icici.svg',
  sbi: '/logos/sbi.png',
  kotak811: '/logos/kotak811.png',
  axis: '/logos/axis.svg',
  zerodha: '/logos/zerodha.svg',
  groww: '/logos/groww.png',
  upstox: '/logos/upstox.png',
  fyers: '/logos/fyers.png',
  indmoney: '/logos/indmoney.png',
  smallcase: '/logos/smallcase.png',
  sbicashback: '/logos/sbi.png',
  hdfcregalia: '/logos/hdfc.svg',
  iciciamazon: '/logos/icici.svg',
  onecard: '/logos/onecard.png',
  slice: '/logos/slice.png',
  niyoglobal: '/logos/niyoglobal.png',
  axisatlas: '/logos/axis.svg',
  walnut: '/logos/walnut.png',
  fold: '/logos/fold.png',
}

export function getLogoUrl(appOrDomain) {
  if (!appOrDomain) return '/logos/gpay.svg'
  if (typeof appOrDomain === 'object') {
    const id = appOrDomain.id?.toLowerCase()
    if (LOCAL_LOGOS[id]) return LOCAL_LOGOS[id]
    if (appOrDomain.domain) {
      const match = Object.entries(LOCAL_LOGOS).find(([k]) => appOrDomain.domain.includes(k))
      if (match) return match[1]
      return `https://logo.clearbit.com/${appOrDomain.domain}`
    }
  }
  const str = String(appOrDomain).toLowerCase()
  if (LOCAL_LOGOS[str]) return LOCAL_LOGOS[str]
  return `https://logo.clearbit.com/${str}`
}

export const FEATURED_APP_IDS = [
  'zerodha', 'groww', 'fyers', 'cred', 'fi', 'jupiter', 'sbicashback', 'onecard', 'niyoglobal', 'gpay', 'phonepe', 'hdfc'
]
