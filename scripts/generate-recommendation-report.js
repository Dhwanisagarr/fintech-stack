import { getRecommendations, calculateStackScore } from '../lib/recommendations.js'

const SAMPLE_PROFILE = {
  user_type: 'investor',
  spending_habits: ['investments', 'travel', 'shopping'],
  priorities: ['low_fees', 'international', 'cashback'],
  financial_goals: 'reduce_fees'
}

function generateReport() {
  console.log('========================================================================')
  console.log('      FINTECH STACK OPTIMIZER - TRANSPARENT RECOMMENDATION REPORT       ')
  console.log('========================================================================\n')

  console.log('USER PROFILE INPUTS:')
  console.log(JSON.stringify(SAMPLE_PROFILE, null, 2))
  console.log('\n------------------------------------------------------------------------')

  const recs = getRecommendations(SAMPLE_PROFILE)
  const score = calculateStackScore(SAMPLE_PROFILE)

  console.log(`OVERALL STACK SCORE: ${score.overall}%`)
  console.log(`SCORE BREAKDOWN: Savings: ${score.breakdown.savings}% | Rewards: ${score.breakdown.rewards}% | Simplicity: ${score.breakdown.simplicity}% | Investment: ${score.breakdown.investment}%\n`)

  Object.entries(recs).forEach(([key, rec]) => {
    console.log(`>>> PILLAR: ${rec.category.toUpperCase()} <<<`)
    console.log(`App Selected:     ${rec.app}`)
    console.log(`Compatibility:    ${rec.compatibility}%`)
    console.log(`Score Breakdown:  ${JSON.stringify(rec.scoreBreakdown)}`)
    console.log(`Match Explanation: ${rec.reason}`)
    console.log(`Verified Pros:     ${rec.pros.join(' | ')}`)
    console.log(`Limitations:      ${rec.tradeoffs.join(' | ')}`)
    console.log(`Runner-Up App:    ${rec.alternative}`)
    console.log(`Verified Source:  ${rec.evidence?.sources[0]?.url || 'N/A'}`)
    console.log('------------------------------------------------------------------------\n')
  })

  console.log('========================================================================')
  console.log('                 END OF RECOMMENDATION ENGINE REPORT                    ')
  console.log('========================================================================\n')
}

generateReport()
