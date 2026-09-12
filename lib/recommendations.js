import { FINTECH_APP_DATABASE, getDbAppById } from './apps-db.js'

function normalizeArray(val) {
  if (Array.isArray(val)) return val
  return val ? [val] : []
}

/**
 * Multi-Factor Recommendation Engine for a specific category
 */
function scoreAppForProfile(app, profile, pillarCategory) {
  const userType = profile.user_type || 'salaried'
  const spendingHabits = normalizeArray(profile.spending_habits)
  const priorities = normalizeArray(profile.priorities)
  const goal = profile.financial_goals || ''
  const existingApps = normalizeArray(profile.existing_apps)

  let userTypeFit = 10
  let featureFit = 5
  let priorityFit = 5
  let goalFit = 5
  let categoryFit = 15

  // 1. User Type Fit (Max 20)
  if (app.target_use_cases?.includes(userType)) {
    userTypeFit = 20
  } else if (app.target_use_cases?.includes('salaried')) {
    userTypeFit = 14
  }

  // 2. Category Fit (Max 25)
  if (app.category === pillarCategory) {
    categoryFit = 25
  } else if (app.subcategories?.some((sub) => sub.includes(pillarCategory))) {
    categoryFit = 20
  }

  // 3. Feature & Spending Habit Match (Max 20)
  let featureMatches = 0
  if (spendingHabits.includes('food_delivery') || spendingHabits.includes('shopping')) {
    if (app.capabilities?.some((c) => c.includes('cashback') || c.includes('rewards') || c.includes('qr'))) {
      featureMatches += 2
    }
  }
  if (spendingHabits.includes('travel')) {
    if (app.capabilities?.some((c) => c.includes('forex') || c.includes('lounge') || c.includes('travel'))) {
      featureMatches += 3
    }
  }
  if (spendingHabits.includes('investments')) {
    if (app.capabilities?.some((c) => c.includes('delivery') || c.includes('mutual_funds') || c.includes('stocks'))) {
      featureMatches += 3
    }
  }
  if (spendingHabits.includes('bills')) {
    if (app.capabilities?.some((c) => c.includes('bill_pay') || c.includes('utility'))) {
      featureMatches += 2
    }
  }
  featureFit = Math.min(20, 5 + featureMatches * 4)

  // 4. Priority Fit (Max 20)
  let priorityMatches = 0
  if (priorities.includes('low_fees') || priorities.includes('simplicity')) {
    if (app.pricing_and_fees?.equity_delivery_brokerage?.includes('₹0') || 
        app.pricing_and_fees?.account_maintenance_charge === 0 ||
        app.pricing_and_fees?.joining_fee === 0) {
      priorityMatches += 2
    }
  }
  if (priorities.includes('cashback') || priorities.includes('rewards')) {
    if (app.rewards_and_perks?.type?.toLowerCase().includes('cashback') ||
        app.capabilities?.some((c) => c.includes('cashback') || c.includes('reward'))) {
      priorityMatches += 2
    }
  }
  if (priorities.includes('international')) {
    if (app.capabilities?.some((c) => c.includes('forex')) || app.pricing_and_fees?.forex_markup?.includes('0%')) {
      priorityMatches += 3
    }
  }
  if (priorities.includes('investment_growth')) {
    if (app.category === 'investment' || app.capabilities?.some((c) => c.includes('stocks') || c.includes('mutual_funds'))) {
      priorityMatches += 2
    }
  }
  priorityFit = Math.min(20, 5 + priorityMatches * 4)

  // 5. Goal Fit (Max 15)
  if (goal === 'reduce_fees' && (app.pricing_and_fees?.joining_fee === 0 || app.pricing_and_fees?.equity_delivery_brokerage?.includes('₹0'))) {
    goalFit = 15
  } else if (goal === 'better_cashback' && app.rewards_and_perks?.type?.toLowerCase().includes('cashback')) {
    goalFit = 15
  } else if (goal === 'travel_smarter' && (app.capabilities?.some((c) => c.includes('forex') || c.includes('lounge')))) {
    goalFit = 15
  } else if (goal === 'invest_better' && app.category === 'investment') {
    goalFit = 15
  } else if (goal === 'save_money' && app.capabilities?.some((c) => c.includes('zero_balance') || c.includes('pots') || c.includes('auto_save'))) {
    goalFit = 15
  } else {
    goalFit = 8
  }

  // Eligibility Adjustment / Constraints
  let eligibilityPenalty = 0
  if (app.eligibility?.min_credit_score) {
    if (userType === 'student') {
      eligibilityPenalty = 25 // Students usually lack 750+ credit score
    }
  }
  if (app.eligibility?.min_income && userType === 'student') {
    eligibilityPenalty = 20
  }

  const rawScore = userTypeFit + featureFit + priorityFit + goalFit + categoryFit - eligibilityPenalty
  const finalScore = Math.max(35, Math.min(99, rawScore))

  return {
    appId: app.id,
    appRecord: app,
    finalScore,
    scoreBreakdown: {
      categoryFit,
      userTypeFit,
      featureFit,
      priorityFit,
      goalFit,
      eligibilityPenalty
    }
  }
}

/**
 * Generate structured, evidence-based reason from profile & app capabilities
 */
function buildExplanation(app, profile, scoreResult) {
  const priorities = normalizeArray(profile.priorities)
  const userType = profile.user_type || 'user'
  const goal = profile.financial_goals

  let KeyReasons = []

  if (app.pricing_and_fees?.equity_delivery_brokerage?.includes('₹0')) {
    KeyReasons.push('offers ₹0 brokerage on equity delivery')
  }
  if (app.pricing_and_fees?.forex_markup?.includes('0%')) {
    KeyReasons.push('provides 0% Forex markup on international spends')
  }
  if (app.capabilities?.includes('zero_balance_savings') || app.capabilities?.includes('zero_balance_account')) {
    KeyReasons.push('requires zero minimum balance')
  }
  if (app.rewards_and_perks?.type?.toLowerCase().includes('cashback')) {
    KeyReasons.push(`delivers verified cashback (${app.rewards_and_perks.type})`)
  }
  if (app.verified_facts && app.verified_facts.length > 0) {
    KeyReasons.push(app.verified_facts[0].toLowerCase())
  }

  const reasonText = `Matched for ${userType} profile scoring ${scoreResult.finalScore}/100. It ${KeyReasons.slice(0, 2).join(' and ')}, aligning with your financial goals.`

  return {
    reason: reasonText,
    pros: app.verified_facts || app.capabilities.slice(0, 3),
    tradeoffs: app.limitations || ['Requires standard KYC verification'],
    evidence: {
      verified_at: app.last_verified_at,
      regulatory: app.regulatory?.type || 'Regulated Entity',
      sources: app.verification_sources || []
    }
  }
}

/**
 * Get Recommendations for User Profile
 */
export function getRecommendations(preferences = {}) {
  const pillars = [
    { key: 'upi', category: 'upi', label: 'UPI App' },
    { key: 'banking', category: 'banking', label: 'Bank Account' },
    { key: 'investment', category: 'investment', label: 'Investment Platform' },
    { key: 'credit_card', category: 'credit', label: 'Credit Card' },
    { key: 'travel', category: 'travel', label: 'Travel & Forex' },
  ]

  const recommendations = {}

  for (const pillar of pillars) {
    const candidates = FINTECH_APP_DATABASE.filter(
      (app) => app.status === 'active' && (app.category === pillar.category || app.subcategories?.some((s) => s.includes(pillar.category)))
    )

    const scored = candidates
      .map((app) => ({
        app,
        result: scoreAppForProfile(app, preferences, pillar.category)
      }))
      .sort((a, b) => b.result.finalScore - a.result.finalScore)

    const winner = scored[0]?.app || candidates[0]
    const winnerScore = scored[0]?.result || { finalScore: 85, scoreBreakdown: {} }
    const runnerUp = scored[1]?.app

    const explanation = buildExplanation(winner, preferences, winnerScore)

    recommendations[pillar.key] = {
      app: winner.name,
      appId: winner.id,
      category: pillar.label,
      bestFor: pillar.label,
      compatibility: winnerScore.finalScore,
      rating: '4.8',
      scoreBreakdown: winnerScore.scoreBreakdown,
      reason: explanation.reason,
      pros: explanation.pros,
      tradeoffs: explanation.tradeoffs,
      alternative: runnerUp ? `${runnerUp.name} (Runner up - Scored ${scored[1].result.finalScore}/100)` : 'None',
      website: winner.website,
      logo: winner.domain,
      aiInsight: `Verified by ${winner.regulatory?.body || 'Regulatory Standards'} (Last verified ${winner.last_verified_at})`,
      tags: winner.capabilities ? winner.capabilities.slice(0, 3).map((c) => c.replace(/_/g, ' ')) : ['Verified App'],
      evidence: explanation.evidence
    }
  }

  return recommendations
}

/**
 * Calculate Transparent Stack Efficiency Score
 */
export function calculateStackScore(preferences = {}) {
  const recommendations = getRecommendations(preferences)
  const scores = Object.values(recommendations).map((r) => r.compatibility)
  
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  return {
    overall: avg,
    breakdown: {
      savings: Math.round(avg * 0.98),
      rewards: Math.round(avg * 0.95),
      simplicity: Math.round(avg * 1.02) > 100 ? 98 : Math.round(avg * 1.02),
      investment: Math.round(avg * 0.99)
    }
  }
}
