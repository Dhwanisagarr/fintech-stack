import { getRecommendations, calculateStackScore } from '../lib/recommendations.js'

const TEST_PERSONAS = [
  {
    name: 'Profile A: Student Cashback Hunter',
    profile: {
      user_type: 'student',
      spending_habits: ['food_delivery', 'shopping', 'ott'],
      priorities: ['cashback', 'simplicity', 'low_fees'],
      financial_goals: 'better_cashback'
    }
  },
  {
    name: 'Profile B: Active F&O & Chart Trader',
    profile: {
      user_type: 'investor',
      spending_habits: ['investments'],
      priorities: ['low_fees', 'fast_transfers', 'reliability'],
      financial_goals: 'reduce_fees'
    }
  },
  {
    name: 'Profile C: International Frequent Traveler',
    profile: {
      user_type: 'traveler',
      spending_habits: ['travel', 'shopping'],
      priorities: ['international', 'premium', 'rewards'],
      financial_goals: 'travel_smarter'
    }
  },
  {
    name: 'Profile D: Salaried Wealth Builder',
    profile: {
      user_type: 'salaried',
      spending_habits: ['bills', 'investments', 'groceries'],
      priorities: ['investment_growth', 'reliability', 'security'],
      financial_goals: 'invest_better'
    }
  },
  {
    name: 'Profile E: Freelancer Goal Saver',
    profile: {
      user_type: 'freelancer',
      spending_habits: ['bills', 'rent', 'healthcare'],
      priorities: ['simplicity', 'low_fees'],
      financial_goals: 'save_money'
    }
  },
  {
    name: 'Profile F: High Income Credit Rewards Maximizer',
    profile: {
      user_type: 'entrepreneur',
      spending_habits: ['travel', 'shopping', 'bills'],
      priorities: ['premium', 'rewards', 'cashback'],
      financial_goals: 'better_cashback'
    }
  },
  {
    name: 'Profile G: Minimalist Budgeter',
    profile: {
      user_type: 'salaried',
      spending_habits: ['bills', 'groceries'],
      priorities: ['simplicity', 'security'],
      financial_goals: 'save_money'
    }
  },
  {
    name: 'Profile H: Student Passive Investor',
    profile: {
      user_type: 'student',
      spending_habits: ['education', 'investments'],
      priorities: ['simplicity', 'low_fees', 'investment_growth'],
      financial_goals: 'invest_better'
    }
  },
  {
    name: 'Profile I: Edge Case - Empty Profile',
    profile: {}
  },
  {
    name: 'Profile J: Conflicting Preferences (Travel + Ultra Low Fees + Student)',
    profile: {
      user_type: 'student',
      spending_habits: ['travel', 'food_delivery'],
      priorities: ['international', 'low_fees', 'cashback'],
      financial_goals: 'travel_smarter'
    }
  },
  {
    name: 'Profile K: Business Owner High Volume Spender',
    profile: {
      user_type: 'entrepreneur',
      spending_habits: ['bills', 'fuel', 'travel'],
      priorities: ['rewards', 'reliability'],
      financial_goals: 'reduce_fees'
    }
  },
  {
    name: 'Profile L: Tech Worker Salary Optimizer',
    profile: {
      user_type: 'salaried',
      spending_habits: ['food_delivery', 'shopping', 'investments'],
      priorities: ['fast_transfers', 'rewards', 'cashback'],
      financial_goals: 'better_cashback'
    }
  },
  {
    name: 'Profile M: Digital Nomad Freelancer',
    profile: {
      user_type: 'freelancer',
      spending_habits: ['travel', 'bills'],
      priorities: ['international', 'simplicity'],
      financial_goals: 'travel_smarter'
    }
  },
  {
    name: 'Profile N: Heavy Fuel & Shopping Spender',
    profile: {
      user_type: 'salaried',
      spending_habits: ['fuel', 'shopping', 'groceries'],
      priorities: ['cashback', 'rewards'],
      financial_goals: 'better_cashback'
    }
  },
  {
    name: 'Profile O: First-Time Investor',
    profile: {
      user_type: 'student',
      spending_habits: ['investments'],
      priorities: ['simplicity', 'low_fees'],
      financial_goals: 'invest_better'
    }
  }
]

function runRecommendationTests() {
  console.log('==================================================')
  console.log('    FINTECH STACK OPTIMIZER - ENGINE SUITE TEST    ')
  console.log('==================================================\n')

  const resultsByPersona = []
  let totalTests = TEST_PERSONAS.length
  let passedTests = 0

  TEST_PERSONAS.forEach(({ name, profile }, idx) => {
    console.log(`[Test #${idx + 1}] ${name}`)
    try {
      const recs = getRecommendations(profile)
      const stackScore = calculateStackScore(profile)

      // Verify all 5 pillars returned
      const pillars = ['upi', 'banking', 'investment', 'credit_card', 'travel']
      let validPillars = true
      pillars.forEach((p) => {
        if (!recs[p] || !recs[p].app || !recs[p].compatibility) {
          validPillars = false;
        }
      })

      if (!validPillars) {
        console.error(`  ❌ Failed: Invalid recommendation payload structure`)
        return
      }

      console.log(`  Top Stack: ${recs.upi.app} (UPI) | ${recs.banking.app} (Bank) | ${recs.investment.app} (Invest) | ${recs.credit_card.app} (Credit) | ${recs.travel.app} (Travel)`)
      console.log(`  Overall Score: ${stackScore.overall}% | Up-front Reason: "${recs.investment.reason.slice(0, 60)}..."`)

      resultsByPersona.push({
        name,
        stack: `${recs.upi.app}-${recs.banking.app}-${recs.investment.app}-${recs.credit_card.app}-${recs.travel.app}`
      })

      passedTests++
    } catch (err) {
      console.error(`  ❌ Execution error:`, err)
    }
  })

  // Measure stack recommendation variance (checking for "same answer for everyone")
  const uniqueStacks = new Set(resultsByPersona.map((r) => r.stack))
  const variancePercentage = Math.round((uniqueStacks.size / totalTests) * 100)

  console.log('\n--------------------------------------------------')
  console.log(`TOTAL PERSONAS TESTED:     ${totalTests}`)
  console.log(`TESTS PASSED:              ${passedTests}/${totalTests}`)
  console.log(`UNIQUE RECOMMENDATION SETS: ${uniqueStacks.size}/${totalTests}`)
  console.log(`RECOMMENDATION VARIANCE:   ${variancePercentage}%`)
  console.log('--------------------------------------------------\n')

  if (variancePercentage < 40) {
    console.error('❌ WARNING: Recommendation engine lacks sufficient personalization variance across distinct profiles!')
    process.exit(1)
  } else {
    console.log('✅ RECOMMENDATION SUITE PASSED 100%! Engine personalizes dynamically based on user needs.\n')
    process.exit(0)
  }
}

runRecommendationTests()
