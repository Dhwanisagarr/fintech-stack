import { getAppByName } from './apps'

function normalizePriorities(priorities) {
  if (Array.isArray(priorities)) return priorities
  return priorities ? [priorities] : []
}

function enrich(rec) {
  const app = getAppByName(rec.app)
  const compat = 88 + (rec.app.length % 10)
  return {
    ...rec,
    appId: app?.id,
    website: app?.website || 'https://google.com',
    rating: (4.2 + (rec.app.length % 8) * 0.1).toFixed(1),
    compatibility: compat,
    bestFor: rec.category,
    tags: rec.pros.slice(0, 3),
    aiInsight: 'AI matched this for you based on your profile',
  }
}

export function getRecommendations(preferences) {
  const { user_type, spending_habits = [] } = preferences;
  const priorities = normalizePriorities(preferences.priorities);
  
  let recommendations = {
    upi: null,
    banking: null,
    credit_card: null,
    investment: null,
    travel: null
  };
  
  // === UPI LOGIC ===
  if (user_type === 'student' && priorities.includes('cashback')) {
    recommendations.upi = {
      app: 'PhonePe',
      category: 'UPI App',
      reason: 'You prioritize cashback and online shopping as a student',
      pros: ['9% cashback on food delivery', 'Fast UPI transfers', 'Accepts everywhere'],
      tradeoffs: ['Occasional server downtime'],
      alternative: 'GPay (more reliable but only 1% cashback)',
      logo: '📱'
    };
  } else if (user_type === 'salaried' && priorities.includes('simplicity')) {
    recommendations.upi = {
      app: 'GPay',
      category: 'UPI App',
      reason: 'You value reliability over cashback as a salaried professional',
      pros: ['100% uptime', 'Google integration', 'Super simple UI'],
      tradeoffs: ['Lower cashback rewards'],
      alternative: 'PhonePe (higher cashback but less reliable)',
      logo: '📱'
    };
  } else if (spending_habits.includes('shopping')) {
    recommendations.upi = {
      app: 'CRED',
      category: 'UPI App',
      reason: 'Perfect for high spenders who want premium rewards',
      pros: ['Exclusive rewards', 'Bill payments', 'Premium experience'],
      tradeoffs: ['Invite only', 'Requires ₹50k+ monthly spend'],
      alternative: 'PhonePe (easier to get)',
      logo: '🏆'
    };
  } else {
    recommendations.upi = {
      app: 'PhonePe',
      category: 'UPI App',
      reason: 'Best overall balance of cashback and reliability',
      pros: ['9% food cashback', 'Fast UPI', 'Wide acceptance'],
      tradeoffs: ['Occasional downtime'],
      alternative: 'GPay',
      logo: '📱'
    };
  }
  
  // === BANKING LOGIC ===
  if (user_type === 'student' || user_type === 'freelancer' || user_type === 'entrepreneur') {
    recommendations.banking = {
      app: 'Fi',
      category: 'Bank Account',
      reason: 'Perfect for students/freelancers with no fees and great features',
      pros: ['No maintenance fees', '3% interest on savings', 'Beautiful app'],
      tradeoffs: ['New bank', 'No physical branches'],
      alternative: 'Jupiter (better for freelancers)',
      logo: '🏦'
    };
  } else if (user_type === 'salaried') {
    recommendations.banking = {
      app: 'Jupiter',
      category: 'Bank Account',
      reason: 'Great for salaried professionals with goals feature',
      pros: ['No fees', '4% interest', 'Savings goals'],
      tradeoffs: ['New bank', 'Limited features'],
      alternative: 'Fi (better UI)',
      logo: '🏦'
    };
  } else {
    recommendations.banking = {
      app: 'Fi',
      category: 'Bank Account',
      reason: 'Best digital bank for most users',
      pros: ['No fees', 'Great app', '3% interest'],
      tradeoffs: ['No branches'],
      alternative: 'Jupiter',
      logo: '🏦'
    };
  }
  
  // === INVESTMENT/TRADING LOGIC - FYRES ADDED HERE ===
  if (user_type === 'investor' && priorities.includes('low_fees')) {
    recommendations.investment = {
      app: 'Fyers',
      category: 'Trading & Investment Platform',
      reason: 'Best for active traders with lowest brokerage and stop-loss market orders',
      pros: ['Lowest brokerage from ₹20/order', 'Advanced trading features', 'Stop-loss market orders', 'Real-time data', 'API access for algo trading'],
      tradeoffs: ['Learning curve for beginners', 'Interface is trading-focused'],
      alternative: 'Zerodha (more beginner-friendly)',
      logo: '📊'
    };
  } else if (user_type === 'investor' || spending_habits.includes('investments')) {
    recommendations.investment = {
      app: 'Zerodha',
      category: 'Investment Platform',
      reason: 'Best for serious investors who want lowest fees and reliability',
      pros: ['₹20/order brokerage', 'Advanced charts', 'Most reliable', 'Largest user base'],
      tradeoffs: ['Learning curve', 'No mutual fund SIP in stock app'],
      alternative: 'Fyers (better for active trading) or Groww (beginner-friendly)',
      logo: '📈'
    };
  } else if (user_type === 'student') {
    recommendations.investment = {
      app: 'Groww',
      category: 'Investment Platform',
      reason: 'Perfect for beginners with simple UI and mutual funds',
      pros: ['Beginner-friendly', 'Mutual funds + stocks', 'Free SIP', 'Simple interface'],
      tradeoffs: ['₹20 brokerage', 'Basic charts'],
      alternative: 'Zerodha (lower long-term fees) or Fyers (better for trading)',
      logo: '📈'
    };
  } else {
    recommendations.investment = {
      app: 'Fyers',
      category: 'Trading & Investment Platform',
      reason: 'Best overall for trading with advanced features and lowest costs',
      pros: ['Lowest brokerage from ₹20/order', 'Advanced trading tools', 'Stop-loss market orders', 'Fast execution'],
      tradeoffs: ['Learning curve'],
      alternative: 'Zerodha (more popular) or Groww (simpler)',
      logo: '📊'
    };
  }
  
  // === CREDIT CARD LOGIC ===
  if (priorities.includes('cashback') && spending_habits.includes('shopping')) {
    recommendations.credit_card = {
      app: 'SBI Cashback',
      category: 'Credit Card',
      reason: 'Highest cashback for online shoppers',
      pros: ['5% cashback on Amazon/Flipkart', 'No annual fee'],
      tradeoffs: ['Takes 2–3 weeks to approve'],
      alternative: 'HDFC Regalia (more benefits but ₹2500 fee)',
      logo: '💳'
    };
  } else if (user_type === 'salaried' && priorities.includes('premium')) {
    recommendations.credit_card = {
      app: 'HDFC Regalia',
      category: 'Credit Card',
      reason: 'Best premium card for salaried professionals',
      pros: ['Airport lounge', '4x reward points', 'Travel insurance'],
      tradeoffs: ['₹2500 annual fee'],
      alternative: 'SBI Cashback (free but fewer benefits)',
      logo: '💳'
    };
  } else if (user_type === 'student') {
    recommendations.credit_card = {
      app: 'Slice',
      category: 'Credit Card',
      reason: 'Instant approval for students with no credit check',
      pros: ['Instant approval', 'No credit check', '5% cashback'],
      tradeoffs: ['Limited features', 'New company'],
      alternative: 'SBI Cashback (better long-term)',
      logo: '💳'
    };
  } else {
    recommendations.credit_card = {
      app: 'SBI Cashback',
      category: 'Credit Card',
      reason: 'Best overall cashback card',
      pros: ['5% e-commerce cashback', 'No annual fee'],
      tradeoffs: ['Long approval time'],
      alternative: 'HDFC Regalia',
      logo: '💳'
    };
  }
  
  // === TRAVEL LOGIC ===
  if (user_type === 'traveler' || spending_habits.includes('travel')) {
    recommendations.travel = {
      app: 'Niyo Savings',
      category: 'Travel Card',
      reason: 'Best for travelers with 0% forex markup',
      pros: ['0% forex markup', 'Global ATM withdrawals', 'No foreign fees'],
      tradeoffs: ['₹10k minimum balance'],
      alternative: 'Axis Atlas (premium but ₹10k annual fee)',
      logo: '✈️'
    };
  } else if (user_type === 'student') {
    recommendations.travel = {
      app: 'OneCard',
      category: 'Travel Card',
      reason: 'Student-friendly travel card',
      pros: ['Student-focused', '3% rewards', 'No forex fees on domestic'],
      tradeoffs: ['Limited international acceptance'],
      alternative: 'Niyo (better for international)',
      logo: '✈️'
    };
  } else {
    recommendations.travel = {
      app: 'Niyo Savings',
      category: 'Travel Card',
      reason: 'Best for occasional international travel',
      pros: ['0% forex markup', 'Global ATM'],
      tradeoffs: ['₹10k min balance'],
      alternative: 'OneCard',
      logo: '✈️'
    };
  }
  
  return {
    upi: enrich(recommendations.upi),
    banking: enrich(recommendations.banking),
    credit_card: enrich(recommendations.credit_card),
    investment: enrich(recommendations.investment),
    travel: enrich(recommendations.travel),
  };
}

export function calculateStackScore(preferences) {
  const { user_type } = preferences;
  
  let savingsScore = 85;
  let rewardsScore = 80;
  let simplicityScore = 90;
  let investmentScore = 82;
  
  if (user_type === 'student') {
    simplicityScore = 95;
    rewardsScore = 88;
  } else if (user_type === 'investor') {
    investmentScore = 95;
    savingsScore = 90;
  } else if (user_type === 'traveler') {
    rewardsScore = 92;
  } else if (user_type === 'entrepreneur') {
    investmentScore = 90;
    savingsScore = 88;
  }
  
  const overallScore = Math.round(
    (savingsScore + rewardsScore + simplicityScore + investmentScore) / 4
  );
  
  return {
    overall: overallScore,
    breakdown: {
      savings: savingsScore,
      rewards: rewardsScore,
      simplicity: simplicityScore,
      investment: investmentScore
    }
  };
}
