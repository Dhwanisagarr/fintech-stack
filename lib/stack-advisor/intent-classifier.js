/**
 * STACK ADVISOR - INTENT CLASSIFIER & ROUTER
 * 
 * Classifies input into explicit intent types to route to deterministic handlers.
 */

export const INTENT_TYPES = {
  FINTECH_RECOMMENDATION: 'FINTECH_RECOMMENDATION',
  STACK_AUDIT: 'STACK_AUDIT',
  FINTECH_COMPARISON: 'FINTECH_COMPARISON',
  PERSONAL_FINANCE_CALCULATION: 'PERSONAL_FINANCE_CALCULATION',
  FINANCIAL_EDUCATION: 'FINANCIAL_EDUCATION',
  STOCK_RESEARCH: 'STOCK_RESEARCH',
  STOCK_COMPARISON: 'STOCK_COMPARISON',
  CURRENT_MARKET_QUERY: 'CURRENT_MARKET_QUERY',
  FOLLOW_UP: 'FOLLOW_UP',
  UNKNOWN: 'UNKNOWN'
}

export function classifyIntent(messageText) {
  const text = messageText.trim().toLowerCase()

  // 1. Check Slash Commands
  if (text.startsWith('/recommend')) {
    return { type: INTENT_TYPES.FINTECH_RECOMMENDATION, raw: messageText }
  }
  if (text.startsWith('/optimize') || text.startsWith('/audit')) {
    return { type: INTENT_TYPES.STACK_AUDIT, raw: messageText }
  }
  if (text.startsWith('/compare')) {
    if (text.includes('hdfc') && text.includes('icici') && !text.includes('app')) {
      return { type: INTENT_TYPES.STOCK_COMPARISON, raw: messageText }
    }
    return { type: INTENT_TYPES.FINTECH_COMPARISON, raw: messageText }
  }
  if (text.startsWith('/research')) {
    return { type: INTENT_TYPES.STOCK_RESEARCH, raw: messageText }
  }
  if (text.startsWith('/explain')) {
    return { type: INTENT_TYPES.FINANCIAL_EDUCATION, raw: messageText }
  }

  // 2. Financial Term Education (e.g. "what is p/e", "explain etf", "what is mutual fund")
  if (text.includes('what is') || text.includes('explain') || text.includes('meaning of') || text.includes('p/e ratio')) {
    if (text.includes('p/e') || text.includes('etf') || text.includes('mutual fund') || text.includes('cibil') || text.includes('forex') || text.includes('demat') || text.includes('sip')) {
      return { type: INTENT_TYPES.FINANCIAL_EDUCATION, raw: messageText }
    }
  }

  // 3. Stock Research & Comparison (e.g. "tell me about hdfc bank", "research tcs", "compare hdfc and icici")
  const knownStockKeywords = ['hdfc bank', 'icici bank', 'tcs', 'infosys', 'reliance', 'tata motors', 'sbi bank', 'stock']
  const isStockQuery = knownStockKeywords.some((k) => text.includes(k))

  if (isStockQuery && (text.includes('compare') || text.includes('vs'))) {
    return { type: INTENT_TYPES.STOCK_COMPARISON, raw: messageText }
  }
  if (isStockQuery && (text.includes('tell me about') || text.includes('research') || text.includes('financials') || text.includes('analysis'))) {
    return { type: INTENT_TYPES.STOCK_RESEARCH, raw: messageText }
  }

  // 4. Fintech Comparison (e.g. "compare zerodha and groww", "zerodha vs groww")
  if ((text.includes('compare') || text.includes('vs')) && (text.includes('zerodha') || text.includes('groww') || text.includes('cred') || text.includes('phonepe') || text.includes('paytm'))) {
    return { type: INTENT_TYPES.FINTECH_COMPARISON, raw: messageText }
  }

  // 5. Stack Audit / Overlap Query (e.g. "i use phonepe, cred and groww", "am i using the right apps", "do i need both")
  if (text.includes('i use') || text.includes('my stack') || text.includes('overlap') || text.includes('do i need both') || text.includes('optimize my')) {
    return { type: INTENT_TYPES.STACK_AUDIT, raw: messageText }
  }

  // 6. Personal Finance Calculation (e.g. "i earn 70k and spend 40k", "my salary is 80k")
  if ((text.includes('earn') || text.includes('make') || text.includes('salary')) && (text.includes('spend') || text.includes('expense') || text.includes('surplus'))) {
    return { type: INTENT_TYPES.PERSONAL_FINANCE_CALCULATION, raw: messageText }
  }

  // 7. General Recommendation & Needs Request
  const recommendationKeywords = [
    'which app', 'recommend', 'best app', 'should i use', 'want to start',
    'rewards', 'cashback', 'invest', 'trading', 'broker', 'savings', 'upi',
    'credit card', 'low fee', 'travel', 'budget', 'lounge'
  ]
  if (recommendationKeywords.some(k => text.includes(k))) {
    return { type: INTENT_TYPES.FINTECH_RECOMMENDATION, raw: messageText }
  }

  // Default fallback
  return { type: INTENT_TYPES.UNKNOWN, raw: messageText }
}
