/**
 * STACK ADVISOR - CURRENT STACK AUDITOR
 * 
 * Audits a user's existing fintech apps for functional overlaps, duplication,
 * coverage gaps, fee inefficiencies, and goal alignment.
 */

import { FINTECH_APP_DATABASE, getDbAppById } from '../apps-db.js'

export function auditCurrentStack(existingAppNames = [], profile = {}) {
  const recognizedApps = existingAppNames
    .map((name) => {
      const normalized = name.toLowerCase().trim()
      return FINTECH_APP_DATABASE.find(
        (app) => app.name.toLowerCase() === normalized || app.id.toLowerCase() === normalized
      )
    })
    .filter(Boolean)

  if (recognizedApps.length === 0) {
    return {
      has_apps: false,
      message: 'No active fintech apps declared in profile.',
      recommendation: 'Build your initial 5-pillar stack starting with UPI, Banking, and Direct Mutual Fund investing.'
    }
  }

  // Categorize apps into pillars
  const categorised = {
    upi: [],
    banking: [],
    investment: [],
    credit: [],
    travel: [],
    budgeting: []
  }

  recognizedApps.forEach((app) => {
    if (categorised[app.category]) {
      categorised[app.category].push(app)
    }
  })

  const workingPoints = []
  const overlaps = []
  const gaps = []
  const optimizations = []

  // 1. Check UPI Overlap & Usage
  if (categorised.upi.length > 2) {
    overlaps.push({
      category: 'UPI & Payments',
      apps: categorised.upi.map((a) => a.name),
      issue: `You have ${categorised.upi.length} UPI apps (${categorised.upi.map((a) => a.name).join(', ')}). Multiple UPI apps cause fragmented transaction histories.`,
      recommendation: 'Keep 1 primary UPI app for daily transfers (e.g., PhonePe or GPay) and 1 secondary backup.'
    })
  } else if (categorised.upi.length >= 1) {
    workingPoints.push(`UPI covered by ${categorised.upi.map((a) => a.name).join(', ')}.`)
  } else {
    gaps.push({ category: 'UPI', issue: 'Missing dedicated UPI payment app.' })
  }

  // 2. Check Banking & Neobank Setup
  if (categorised.banking.length >= 1) {
    workingPoints.push(`Banking managed via ${categorised.banking.map((a) => a.name).join(', ')}.`)
  } else {
    gaps.push({
      category: 'Banking',
      issue: 'No high-yield or zero-fee neobank account specified.',
      recommendation: 'Consider pairing your primary bank with a zero-fee neobank (e.g. Fi or Jupiter) for automated savings pots.'
    })
  }

  // 3. Check Investment Platforms Overlap (e.g., Zerodha + Groww)
  if (categorised.investment.length > 1) {
    const appNames = categorised.investment.map((a) => a.name)
    if (appNames.includes('Zerodha') && appNames.includes('Groww')) {
      overlaps.push({
        category: 'Investing & Trading',
        apps: ['Zerodha', 'Groww'],
        issue: 'Using both Zerodha and Groww for domestic equities/mutual funds leads to duplicate AMC fees and split Demat portfolios.',
        recommendation: 'Consolidate stock trading on Zerodha (₹0 equity delivery) or direct SIPs on Groww for simpler management.'
      })
    } else {
      overlaps.push({
        category: 'Investing & Trading',
        apps: appNames,
        issue: `Multiple investment platforms (${appNames.join(', ')}) in use.`,
        recommendation: 'Consolidate investments to minimize annual account maintenance charges (AMC).'
      })
    }
  } else if (categorised.investment.length === 1) {
    workingPoints.push(`Investing managed via ${categorised.investment[0].name}.`)
  } else {
    gaps.push({
      category: 'Investing & Wealth',
      issue: 'No direct mutual fund or stock investment platform in your stack.',
      recommendation: 'Start long-term SIPs via zero-commission platforms like Zerodha (Coin) or Groww.'
    })
  }

  // 4. Check Credit & Rewards Setup
  if (categorised.credit.length >= 1) {
    workingPoints.push(`Credit & card rewards handled via ${categorised.credit.map((a) => a.name).join(', ')}.`)
  }

  // 5. Travel & Forex Gaps
  if (profile.priorities?.includes('international') || profile.user_type === 'traveler') {
    if (!categorised.travel.length && !categorised.banking.some((b) => b.id === 'fi')) {
      gaps.push({
        category: 'Travel & Forex',
        issue: 'No 0% Forex markup card identified for international travel.',
        recommendation: 'Add Niyo Global or Fi Money to save 3.5%-5% on foreign currency conversion markup fees.'
      })
    }
  }

  return {
    has_apps: true,
    total_apps: recognizedApps.length,
    categorised_stack: {
      upi: categorised.upi.map((a) => a.name),
      banking: categorised.banking.map((a) => a.name),
      investment: categorised.investment.map((a) => a.name),
      credit: categorised.credit.map((a) => a.name),
      travel: categorised.travel.map((a) => a.name)
    },
    working_points: workingPoints,
    overlaps,
    gaps,
    summary: `Audited ${recognizedApps.length} declared apps. Found ${overlaps.length} duplication overlaps and ${gaps.length} coverage gaps.`
  }
}
