/**
 * STACK ADVISOR - PERSONAL FINANCE CALCULATOR
 * 
 * Pure mathematical engine for financial surplus, savings rate, EMI burden,
 * and emergency fund gap analysis. Displays explicit inputs for every output.
 */

export function calculateFinancialMetrics(profile) {
  const income = profile.income || 0
  const expenses = profile.monthly_expenses || 0
  const emi = profile.emi || 0
  const emergencyFund = profile.emergency_fund || 0

  if (income <= 0) {
    return {
      has_income: false,
      message: 'Provide your monthly income to perform financial calculations.'
    }
  }

  const totalOutflow = expenses + emi
  const monthlySurplus = income - totalOutflow
  const savingsRate = Math.round((monthlySurplus / income) * 100)
  const expenseRatio = Math.round((expenses / income) * 100)
  const emiBurdenRatio = Math.round((emi / income) * 100)

  // Emergency Fund Analysis (Target = 6 months of total expenses + EMI)
  const monthlyFixedCost = expenses + emi
  const targetEmergencyFund = monthlyFixedCost * 6
  const currentCoverageMonths = monthlyFixedCost > 0 ? (emergencyFund / monthlyFixedCost).toFixed(1) : 0
  const emergencyFundGap = Math.max(0, targetEmergencyFund - emergencyFund)

  return {
    has_income: true,
    inputs: {
      income,
      expenses,
      emi,
      emergency_fund: emergencyFund
    },
    outputs: {
      total_outflow: totalOutflow,
      monthly_surplus: monthlySurplus,
      savings_rate_pct: Math.max(0, savingsRate),
      expense_ratio_pct: expenseRatio,
      emi_burden_pct: emiBurdenRatio,
      target_emergency_fund: targetEmergencyFund,
      current_coverage_months: parseFloat(currentCoverageMonths),
      emergency_fund_gap: emergencyFundGap,
      is_emergency_fund_adequate: emergencyFund >= targetEmergencyFund
    },
    guidance: {
      surplus_note: monthlySurplus > 0
        ? `You have a monthly surplus of ₹${monthlySurplus.toLocaleString('en-IN')} (${savingsRate}% savings rate).`
        : `Your expenses & EMIs (₹${totalOutflow.toLocaleString('en-IN')}) exceed or equal your income.`,
      emergency_note: emergencyFund >= targetEmergencyFund
        ? `Your emergency fund covers ${currentCoverageMonths} months of expenses (Target: 6 months). Fully funded!`
        : `Your emergency fund currently covers ${currentCoverageMonths} months. Gap to 6-month target: ₹${emergencyFundGap.toLocaleString('en-IN')}.`
    }
  }
}
