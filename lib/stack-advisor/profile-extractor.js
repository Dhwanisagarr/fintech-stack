/**
 * STACK ADVISOR - CONVERSATIONAL PROFILE EXTRACTOR
 * 
 * Parses user message history to extract structured financial parameters
 * with explicit confidence states (confirmed, inferred, unknown).
 */

import { FINTECH_APP_DATABASE } from '../apps-db.js'

export function extractProfile(messageText, existingProfile = {}) {
  const text = messageText.toLowerCase()
  const profile = {
    income: existingProfile.income || null,
    income_confidence: existingProfile.income_confidence || 'unknown',
    
    monthly_expenses: existingProfile.monthly_expenses || null,
    expenses_confidence: existingProfile.expenses_confidence || 'unknown',
    
    emi: existingProfile.emi || null,
    emi_confidence: existingProfile.emi_confidence || 'unknown',
    
    emergency_fund: existingProfile.emergency_fund || null,
    emergency_fund_confidence: existingProfile.emergency_fund_confidence || 'unknown',
    
    user_type: existingProfile.user_type || null,
    user_type_confidence: existingProfile.user_type_confidence || 'unknown',
    
    existing_apps: new Set(existingProfile.existing_apps || []),
    goals: new Set(existingProfile.goals || []),
    priorities: new Set(existingProfile.priorities || []),
    spending_habits: new Set(existingProfile.spending_habits || [])
  }

  // 1. Extract Income (e.g., "earn 70000", "make 80k", "salary 1.2 lakh", "income 70k")
  const incomePatterns = [
    /(?:earn|salary|income|make|making|gets?)\s*(?:of|around|about)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?/i,
    /₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?\s*(?:salary|income|per month|\/month|a month)/i
  ]
  for (const pat of incomePatterns) {
    const match = messageText.match(pat)
    if (match) {
      let val = parseFloat(match[1])
      const unit = (match[2] || '').toLowerCase()
      if (unit === 'k') val *= 1000
      else if (unit === 'lakh' || unit === 'l') val *= 100000
      profile.income = val
      profile.income_confidence = 'confirmed'
      break
    }
  }

  // 2. Extract Monthly Expenses (e.g., "spend 40000", "expenses 35k", "spend around 50k")
  const expensePatterns = [
    /(?:spend|expenses|spending|outflow)\s*(?:around|about|of)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?/i,
    /₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?\s*(?:expenses|spends|\/month|a month)/i
  ]
  for (const pat of expensePatterns) {
    const match = messageText.match(pat)
    if (match) {
      let val = parseFloat(match[1])
      const unit = (match[2] || '').toLowerCase()
      if (unit === 'k') val *= 1000
      else if (unit === 'lakh' || unit === 'l') val *= 100000
      profile.monthly_expenses = val
      profile.expenses_confidence = 'confirmed'
      break
    }
  }

  // 3. Extract EMI / Debt (e.g., "10k emi", "emi of 15000", "loan 12k")
  const emiPatterns = [
    /(?:emi|loan|debt)\s*(?:of|around|is)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?/i,
    /₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?\s*(?:emi|loan)/i
  ]
  for (const pat of emiPatterns) {
    const match = messageText.match(pat)
    if (match) {
      let val = parseFloat(match[1])
      const unit = (match[2] || '').toLowerCase()
      if (unit === 'k') val *= 1000
      else if (unit === 'lakh' || unit === 'l') val *= 100000
      profile.emi = val
      profile.emi_confidence = 'confirmed'
      break
    }
  }

  // 4. Extract Emergency Fund (e.g., "1 lakh emergency fund", "emergency fund of 2L", "saved 50k emergency")
  const efPatterns = [
    /(?:emergency fund|emergency savings|rainy day fund)\s*(?:of|around|is|about)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?/i,
    /₹?\s*(\d+(?:\.\d+)?)\s*(k|lakh|l)?\s*(?:emergency fund|emergency savings)/i
  ]
  for (const pat of efPatterns) {
    const match = messageText.match(pat)
    if (match) {
      let val = parseFloat(match[1])
      const unit = (match[2] || '').toLowerCase()
      if (unit === 'k') val *= 1000
      else if (unit === 'lakh' || unit === 'l') val *= 100000
      profile.emergency_fund = val
      profile.emergency_fund_confidence = 'confirmed'
      break
    }
  }

  // 5. Extract Mentioned Fintech Apps
  FINTECH_APP_DATABASE.forEach((app) => {
    const appName = app.name.toLowerCase()
    const appId = app.id.toLowerCase()
    if (text.includes(appName) || text.includes(`@${appId}`) || text.includes(`@${appName}`)) {
      profile.existing_apps.add(app.name)
    }
  })

  // Check alias matches (e.g. "gpay", "phonepe", "zerodha", "groww", "hdfc", "cred")
  const AppAliases = {
    gpay: 'Google Pay',
    phonepe: 'PhonePe',
    paytm: 'Paytm',
    cred: 'CRED',
    zerodha: 'Zerodha',
    groww: 'Groww',
    fyers: 'Fyers',
    fi: 'Fi Money',
    jupiter: 'Jupiter',
    hdfc: 'HDFC Bank',
    icici: 'ICICI Bank',
    sbi: 'SBI',
    onecard: 'OneCard',
    niyo: 'Niyo Global'
  }
  Object.entries(AppAliases).forEach(([alias, fullName]) => {
    if (text.includes(alias) || text.includes(`@${alias}`)) {
      profile.existing_apps.add(fullName)
    }
  })

  // 6. Extract User Type Persona
  if (text.includes('student') || text.includes('college') || text.includes('campus')) {
    profile.user_type = 'student'
    profile.user_type_confidence = 'confirmed'
  } else if (text.includes('freelancer') || text.includes('gig') || text.includes('consultant')) {
    profile.user_type = 'freelancer'
    profile.user_type_confidence = 'confirmed'
  } else if (text.includes('trader') || text.includes('f&o') || text.includes('intraday')) {
    profile.user_type = 'investor'
    profile.user_type_confidence = 'confirmed'
  } else if (text.includes('traveler') || text.includes('flights') || text.includes('forex')) {
    profile.user_type = 'traveler'
    profile.user_type_confidence = 'confirmed'
  } else if (text.includes('business') || text.includes('founder') || text.includes('entrepreneur')) {
    profile.user_type = 'entrepreneur'
    profile.user_type_confidence = 'confirmed'
  } else if (text.includes('salaried') || text.includes('salary') || text.includes('job') || text.includes('employed')) {
    profile.user_type = 'salaried'
    profile.user_type_confidence = 'confirmed'
  }

  // 7. Extract Goals & Priorities
  if (text.includes('save') || text.includes('savings') || text.includes('emergency')) profile.goals.add('save_money')
  if (text.includes('invest') || text.includes('sip') || text.includes('stocks') || text.includes('mutual fund')) profile.goals.add('invest_better')
  if (text.includes('cashback') || text.includes('reward')) profile.priorities.add('cashback')
  if (text.includes('low fee') || text.includes('brokerage') || text.includes('charge')) profile.priorities.add('low_fees')
  if (text.includes('forex') || text.includes('international') || text.includes('abroad')) profile.priorities.add('international')

  return {
    income: profile.income,
    income_confidence: profile.income_confidence,
    monthly_expenses: profile.monthly_expenses,
    expenses_confidence: profile.expenses_confidence,
    emi: profile.emi || 0,
    emi_confidence: profile.emi_confidence,
    emergency_fund: profile.emergency_fund || 0,
    emergency_fund_confidence: profile.emergency_fund_confidence,
    user_type: profile.user_type || 'salaried',
    user_type_confidence: profile.user_type_confidence,
    existing_apps: Array.from(profile.existing_apps),
    goals: Array.from(profile.goals),
    priorities: Array.from(profile.priorities),
    spending_habits: Array.from(profile.spending_habits)
  }
}

/**
 * Generate targeted follow-up question if essential info is missing for optimization
 */
export function generateFollowUpQuestion(profile) {
  if (profile.emergency_fund_confidence === 'unknown' && profile.income && profile.monthly_expenses) {
    return 'Do you currently have an emergency fund set aside (e.g. 3 to 6 months of expenses)?'
  }
  if (profile.emi_confidence === 'unknown' && profile.income) {
    return 'Do you have any active monthly EMIs or loans?'
  }
  if (profile.existing_apps.length === 0) {
    return 'Which financial or payment apps do you currently use (e.g. PhonePe, HDFC, Groww, Zerodha, CRED)?'
  }
  if (profile.goals.length === 0) {
    return 'What is your primary goal right now: saving more, investing for long-term growth, maximizing rewards, or reducing fees?'
  }
  return null
}
