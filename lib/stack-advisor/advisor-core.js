import { classifyIntent } from './intent-classifier.js';
import { extractProfile, generateFollowUpQuestion } from './profile-extractor.js';
import { calculateFinancialMetrics } from './finance-calculator.js';
import { auditCurrentStack } from './stack-auditor.js';
import { getCompanyProfile, compareCompanies } from './market-data-provider.js';
import { getRecommendations } from '../recommendations.js';
import { getDbAppById } from '../apps-db.js';
import { validateAdvisorOutput } from './hallucination-validator.js';

/**
 * Master orchestrator for the grounded Stack Advisor engine.
 */
export async function processAdvisorQuery(userQuery, previousProfile = null) {
  // 1. Classify Intent
  const intentResult = classifyIntent(userQuery);
  const intent = intentResult.type || intentResult.intent;

  // 2. Extract/Merge User Profile with Confidence Tracking
  const updatedProfile = extractProfile(userQuery, previousProfile || {});
  const followUpQuestion = generateFollowUpQuestion(updatedProfile);
  const followUpQuestions = followUpQuestion ? [followUpQuestion] : [];

  // 3. Process according to intent
  let responseBlocks = [];
  let sources = [];
  let verificationDate = 'September 2026';
  let calculations = null;
  let currentStackAudit = null;
  let recommendations = [];

  // Route processing
  if (intent === 'FINTECH_RECOMMENDATION' || intent === 'STACK_AUDIT') {
    // Perform Stack Audit if apps mentioned
    if (updatedProfile.existing_apps && updatedProfile.existing_apps.length > 0) {
      currentStackAudit = auditCurrentStack(updatedProfile.existing_apps, updatedProfile);
    }

    // Perform Personal Finance Calculations if financial figures present
    if (updatedProfile.income || updatedProfile.monthly_expenses) {
      calculations = calculateFinancialMetrics(updatedProfile);
    }

    // Run Deterministic Recommendation Engine
    const recMap = getRecommendations(updatedProfile);
    recommendations = Object.values(recMap);

    // Extract sources from top recommended apps
    recommendations.forEach(rec => {
      const dbApp = getDbAppById(rec.appId);
      if (dbApp && dbApp.sources) {
        sources.push(...dbApp.sources.map(s => typeof s === 'string' ? s : s.url));
      }
    });

    // Format Structured Output
    if (currentStackAudit && currentStackAudit.has_apps) {
      responseBlocks.push(`### 📊 Current Stack Audit`);
      responseBlocks.push(`* **Declared Apps:** ${updatedProfile.existing_apps.map(id => getDbAppById(id)?.name || id).join(', ')}`);
      if (currentStackAudit.overlaps.length > 0) {
        responseBlocks.push(`\n**⚠️ Overlaps & Inefficiencies Detected:**`);
        currentStackAudit.overlaps.forEach(o => {
          responseBlocks.push(`- **${o.apps.join(' & ')}**: ${o.issue}`);
        });
      }
      if (currentStackAudit.gaps.length > 0) {
        responseBlocks.push(`\n**📌 Coverage Gaps:**`);
        currentStackAudit.gaps.forEach(g => {
          responseBlocks.push(`- **${g.category}**: ${g.issue} ${g.recommendation || ''}`);
        });
      }
    }

    if (calculations && calculations.has_income) {
      responseBlocks.push(`\n### 💡 Monthly Surplus & Finance Summary`);
      responseBlocks.push(`- **Monthly Income:** ₹${calculations.inputs.income.toLocaleString('en-IN')}`);
      responseBlocks.push(`- **Monthly Expenses:** ₹${calculations.inputs.expenses.toLocaleString('en-IN')}`);
      responseBlocks.push(`- **Monthly Surplus:** ₹${calculations.outputs.monthly_surplus.toLocaleString('en-IN')} (${calculations.outputs.savings_rate_pct}% savings rate)`);
      if (calculations.outputs.emi_burden_pct) {
        responseBlocks.push(`- **EMI Burden:** ${calculations.outputs.emi_burden_pct}% of income`);
      }
    }

    responseBlocks.push(`\n### 🎯 Recommended Stack Optimization`);
    recommendations.slice(0, 3).forEach((rec, idx) => {
      responseBlocks.push(`\n#### ${idx + 1}. ${rec.app} (${rec.category}) - Score: ${rec.compatibility}/100`);
      responseBlocks.push(`- **Why it fits:** ${rec.reason}`);
      if (rec.evidence) {
        responseBlocks.push(`- **Evidence Citation:** ${rec.evidence.claim} (Source: [${rec.evidence.source_title}](${rec.evidence.source_url}))`);
      }
      if (rec.pros && rec.pros.length > 0) {
        responseBlocks.push(`- **Key Pros:** ${rec.pros.join('; ')}`);
      }
    });

  } else if (intent === 'FINTECH_COMPARISON') {
    const appsToCompare = intentResult.entities?.apps || ['zerodha', 'groww'];
    responseBlocks.push(`### ⚔️ Verified Fintech Comparison: ${appsToCompare.map(id => getDbAppById(id)?.name || id).join(' vs ')}`);

    appsToCompare.forEach(appId => {
      const app = getDbAppById(appId);
      if (app) {
        responseBlocks.push(`\n#### ${app.name} (${app.category.toUpperCase()})`);
        responseBlocks.push(`- **Key Capabilities:** ${app.capabilities.join(', ')}`);
        responseBlocks.push(`- **Pricing / Fees:** ${JSON.stringify(app.fees)}`);
        responseBlocks.push(`- **Limitations:** ${app.limitations.join(', ')}`);
        if (app.sources) sources.push(...app.sources);
      }
    });

  } else if (intent === 'STOCK_RESEARCH') {
    const symbol = intentResult.entities?.symbol || 'HDFCBANK';
    const data = getCompanyProfile(symbol) || getCompanyProfile('HDFCBANK');
    responseBlocks.push(`### 📈 Stock Research: ${data.name} (${data.symbol})`);
    responseBlocks.push(`- **Sector:** ${data.sector}`);
    responseBlocks.push(`- **Business Overview:** ${data.overview}`);
    responseBlocks.push(`\n**Key Financial Metrics (Verified):**`);
    responseBlocks.push(`- **Market Cap:** ${data.key_metrics.market_cap}`);
    responseBlocks.push(`- **P/E Ratio:** ${data.key_metrics.pe_ratio} | **P/B Ratio:** ${data.key_metrics.pb_ratio}`);
    responseBlocks.push(`- **ROE:** ${data.key_metrics.roe_pct} | **Net NPA:** ${data.key_metrics.net_npa_pct || 'N/A'}`);
    responseBlocks.push(`\n**Key Risks:** ${data.key_risks.join('; ')}`);
    if (data.sources) sources.push(...data.sources.map(s => s.url));

  } else if (intent === 'STOCK_COMPARISON') {
    const symbols = intentResult.entities?.symbols || ['HDFCBANK', 'ICICIBANK'];
    const comp = compareCompanies(symbols[0], symbols[1]);
    responseBlocks.push(`### ⚖️ Stock Comparison: ${comp.companyA.symbol} vs ${comp.companyB.symbol}`);
    responseBlocks.push(`\n| Metric | ${comp.companyA.symbol} | ${comp.companyB.symbol} |`);
    responseBlocks.push(`|---|---|---|`);
    comp.comparisonTable.forEach(row => {
      responseBlocks.push(`| **${row.metric}** | ${row.valueA} | ${row.valueB} |`);
    });

  } else if (intent === 'PERSONAL_FINANCE_CALCULATION') {
    calculations = calculateFinancialMetrics(updatedProfile);
    if (calculations.has_income) {
      responseBlocks.push(`### 🔢 Personal Finance Calculation`);
      responseBlocks.push(`- **Monthly Income:** ₹${calculations.inputs.income.toLocaleString('en-IN')}`);
      responseBlocks.push(`- **Monthly Expenses:** ₹${calculations.inputs.expenses.toLocaleString('en-IN')}`);
      responseBlocks.push(`- **Net Monthly Surplus:** ₹${calculations.outputs.monthly_surplus.toLocaleString('en-IN')}`);
      responseBlocks.push(`- **Savings Rate:** ${calculations.outputs.savings_rate_pct}%`);
      if (calculations.outputs.emergency_fund_gap !== undefined) {
        responseBlocks.push(`- **Emergency Fund Status:** Current: ₹${(calculations.inputs.emergency_fund || 0).toLocaleString('en-IN')} | 6-Mo Target: ₹${calculations.outputs.target_emergency_fund.toLocaleString('en-IN')} | Shortfall: ₹${calculations.outputs.emergency_fund_gap.toLocaleString('en-IN')}`);
      }
    } else {
      responseBlocks.push(`Please provide your monthly income and expenses so I can calculate your surplus and emergency fund target.`);
    }

  } else if (intent === 'FINANCIAL_EDUCATION') {
    responseBlocks.push(`### 📚 Financial Concept Breakdown`);
    if (userQuery.toLowerCase().includes('p/e') || userQuery.toLowerCase().includes('pe ratio')) {
      responseBlocks.push(`**Price-to-Earnings (P/E) Ratio** measures how much investors pay per ₹1 of company profit.`);
      responseBlocks.push(`- **Formula:** Market Price per Share ÷ Earnings per Share (EPS)`);
      responseBlocks.push(`- **Interpretation:** A high P/E implies expectations of high future growth, while a lower P/E may indicate value or market caution.`);
    } else if (userQuery.toLowerCase().includes('etf')) {
      responseBlocks.push(`**Exchange Traded Funds (ETFs)** are index-tracking funds traded directly on stock exchanges like individual stocks.`);
      responseBlocks.push(`- **Key Benefits:** Low expense ratios, real-time liquidity during trading hours, instant diversification.`);
    } else {
      responseBlocks.push(`Financial education concepts provide foundational decision support for evaluating products and asset allocation.`);
    }
  } else {
    responseBlocks.push(`I can help you audit your fintech apps, optimize your monthly budget, compare stock/broker metrics, or calculate emergency fund targets.`);
  }

  // Add Follow-up Questions if missing key info
  if (followUpQuestions.length > 0) {
    responseBlocks.push(`\n### ❓ Clarifying Follow-ups`);
    followUpQuestions.forEach((q, idx) => {
      responseBlocks.push(`${idx + 1}. ${q}`);
    });
  }

  // Unique Sources
  const uniqueSources = [...new Set(sources)];
  if (uniqueSources.length > 0) {
    responseBlocks.push(`\n**Verified Sources:** ${uniqueSources.join(' | ')}`);
  }
  responseBlocks.push(`**Data Last Verified:** ${verificationDate}`);

  // Draft raw response text
  const rawText = responseBlocks.join('\n');

  // Validate output through Hallucination Protection Layer
  const validationResult = validateAdvisorOutput(rawText);

  return {
    query: userQuery,
    intent,
    profile: updatedProfile,
    calculations,
    currentStackAudit,
    recommendations,
    sources: uniqueSources,
    verificationDate,
    followUpQuestions,
    responseText: validationResult.validatedText,
    isValid: validationResult.isValid,
    validationFlags: validationResult.flags
  };
}
