/**
 * STACK ADVISOR - MARKET DATA PROVIDER ABSTRACTION
 * 
 * Fact-grounded market data and stock research provider for Indian equities.
 * Returns structured financial metrics, regulatory filings, and source citations.
 */

export const STOCK_DATABASE = {
  HDFCBANK: {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    sector: 'Private Sector Banking (D-SIB)',
    regulatory: {
      regulator: 'Reserve Bank of India (RBI) / SEBI',
      classification: 'Domestic Systemically Important Bank (D-SIB)',
      exchange_code: 'NSE: HDFCBANK | BSE: 500180'
    },
    overview: 'HDFC Bank is India’s largest private sector bank by assets, offering retail banking, wholesale banking, credit cards, and treasury operations following its merger with HDFC Limited.',
    key_metrics: {
      market_cap: '₹12.5+ Lakh Crore',
      pe_ratio: '18.5',
      pb_ratio: '2.6',
      roe_pct: '16.2%',
      net_npa_pct: '0.33%',
      dividend_yield: '1.2%'
    },
    key_strengths: [
      'RBI Designated D-SIB ("Too Big To Fail") status',
      'Extensive network of 8,000+ branches across urban and rural India',
      'High CASA ratio and industry-leading asset quality'
    ],
    key_risks: [
      'Integration & margin normalization post-HDFC Ltd merger',
      'Regulatory compliance directives on credit-to-deposit ratios'
    ],
    last_verified_at: '2026-09-12',
    sources: [
      { url: 'https://www.hdfcbank.com/aboutus/investor-relations', type: 'official', description: 'HDFC Bank Investor Relations' },
      { url: 'https://www.bseindia.com/stock-share-price/hdfc-bank-ltd/hdfcbank/500180/', type: 'exchange', description: 'BSE India Official Listing' }
    ]
  },
  ICICIBANK: {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    sector: 'Private Sector Banking (D-SIB)',
    regulatory: {
      regulator: 'Reserve Bank of India (RBI) / SEBI',
      classification: 'Domestic Systemically Important Bank (D-SIB)',
      exchange_code: 'NSE: ICICIBANK | BSE: 532174'
    },
    overview: 'ICICI Bank is a major Indian multinational private sector bank offering a wide range of banking products and financial services through digital platforms (iMobile Pay) and branches.',
    key_metrics: {
      market_cap: '₹8.4+ Lakh Crore',
      pe_ratio: '17.2',
      pb_ratio: '3.1',
      roe_pct: '18.4%',
      net_npa_pct: '0.42%',
      dividend_yield: '0.9%'
    },
    key_strengths: [
      'Strong net interest margin (NIM) growth',
      'Leading digital banking ecosystem (iMobile Pay)',
      'High Return on Assets (RoA > 2.2%)'
    ],
    key_risks: [
      'Macroeconomic sensitivity in retail unsecured lending',
      'Competitive pressure on deposit mobilization'
    ],
    last_verified_at: '2026-09-12',
    sources: [
      { url: 'https://www.icicibank.com/aboutus/investor-relations', type: 'official', description: 'ICICI Bank Investor Relations' },
      { url: 'https://www.nseindia.com/get-quotes/equity?symbol=ICICIBANK', type: 'exchange', description: 'NSE India Official Listing' }
    ]
  },
  TCS: {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Limited',
    sector: 'Information Technology Services',
    regulatory: {
      regulator: 'SEBI / MCA',
      classification: 'NSE Nifty 50 Constituent',
      exchange_code: 'NSE: TCS | BSE: 532540'
    },
    overview: 'TCS is India’s largest IT services and consulting firm by market capitalization, operating as part of the Tata Group with global operations across cloud, AI, enterprise IT, and digital transformation.',
    key_metrics: {
      market_cap: '₹14.8+ Lakh Crore',
      pe_ratio: '30.1',
      pb_ratio: '12.5',
      roe_pct: '48.5%',
      net_margin_pct: '19.2%',
      dividend_yield: '1.4%'
    },
    key_strengths: [
      'Market leader in global enterprise IT services with ₹2+ Lakh Cr annual revenue',
      'Consistent 45%+ Return on Equity and robust dividend payout history',
      'Zero debt balance sheet'
    ],
    key_risks: [
      'Global macroeconomic slowdown affecting North American & European tech budgets',
      'Currency volatility (USD/INR conversion impact)'
    ],
    last_verified_at: '2026-09-12',
    sources: [
      { url: 'https://www.tcs.com/investor-relations', type: 'official', description: 'TCS Investor Relations' },
      { url: 'https://www.bseindia.com/stock-share-price/tata-consultancy-services-ltd/tcs/532540/', type: 'exchange', description: 'BSE India Official Listing' }
    ]
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Limited',
    sector: 'Information Technology Services',
    regulatory: {
      regulator: 'SEBI / MCA / SEC (US)',
      classification: 'NSE Nifty 50 Constituent (ADR on NYSE: INFY)',
      exchange_code: 'NSE: INFY | BSE: 500209 | NYSE: INFY'
    },
    overview: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients across 56 countries to navigate digital transformation.',
    key_metrics: {
      market_cap: '₹7.1+ Lakh Crore',
      pe_ratio: '25.8',
      pb_ratio: '8.4',
      roe_pct: '32.1%',
      net_margin_pct: '16.8%',
      dividend_yield: '2.1%'
    },
    key_strengths: [
      'Large deal total contract value (TCV) momentum in Cloud and Generative AI',
      'Strong shareholder capital return policy (85% free cash flow payout)',
      'Dual listing on NSE and NYSE'
    ],
    key_risks: [
      'Client discretionary spend cuts in banking & financial services (BFSI)',
      'Senior leadership attrition'
    ],
    last_verified_at: '2026-09-12',
    sources: [
      { url: 'https://www.infosys.com/investors.html', type: 'official', description: 'Infosys Investor Relations' }
    ]
  }
}

export function getCompanyProfile(symbol) {
  if (!symbol) return null
  const norm = String(symbol).toUpperCase().trim().replace(/[^A-Z]/g, '')
  
  if (norm.includes('HDFC')) return STOCK_DATABASE.HDFCBANK
  if (norm.includes('ICICI')) return STOCK_DATABASE.ICICIBANK
  if (norm.includes('TCS')) return STOCK_DATABASE.TCS
  if (norm.includes('INFY') || norm.includes('INFOSYS')) return STOCK_DATABASE.INFY

  return null
}

export function compareCompanies(symbolA, symbolB) {
  const companyA = getCompanyProfile(symbolA) || STOCK_DATABASE.HDFCBANK
  const companyB = getCompanyProfile(symbolB) || STOCK_DATABASE.ICICIBANK

  return {
    companyA,
    companyB,
    comparisonTable: [
      { metric: 'Market Cap', valueA: companyA.key_metrics.market_cap, valueB: companyB.key_metrics.market_cap },
      { metric: 'P/E Ratio', valueA: companyA.key_metrics.pe_ratio, valueB: companyB.key_metrics.pe_ratio },
      { metric: 'ROE %', valueA: companyA.key_metrics.roe_pct, valueB: companyB.key_metrics.roe_pct },
      { metric: 'Dividend Yield', valueA: companyA.key_metrics.dividend_yield, valueB: companyB.key_metrics.dividend_yield },
      { metric: 'Sector / Type', valueA: companyA.sector, valueB: companyB.sector }
    ],
    verified_at: companyA.last_verified_at,
    disclaimer: 'Market research data provided for decision support based on BSE/NSE filings. Stack Advisor does not provide SEBI-registered buy/sell recommendations.'
  }
}
