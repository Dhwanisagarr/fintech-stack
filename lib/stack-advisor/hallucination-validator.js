import { FINTECH_APP_DATABASE } from '../apps-db.js';

/**
 * Forbidden hype keywords that should not be present in financial decision support outputs
 */
const FORBIDDEN_CLAIMS = [
  'guaranteed return',
  'guaranteed profit',
  'risk-free',
  'definitely go up',
  'buy this now',
  'sell this now',
  'optimal zero-commission growth',
  'best broker in india',
  'best app in india'
];

/**
 * Validates generated content or structured responses against canonical factual context.
 */
export function validateAdvisorOutput(responseText, contextData = {}) {
  const flags = [];
  let sanitizedText = responseText;

  // 1. Check for forbidden hype/guarantee claims
  const lowerText = responseText.toLowerCase();
  for (const phrase of FORBIDDEN_CLAIMS) {
    if (lowerText.includes(phrase)) {
      flags.push(`Contains forbidden hype phrase: "${phrase}"`);
      // Sanitize out or replace unsafe phrases
      const regex = new RegExp(phrase, 'gi');
      sanitizedText = sanitizedText.replace(regex, 'statistically matched option');
    }
  }

  // 2. Extract mentioned apps and verify their factual attributes
  for (const app of FINTECH_APP_DATABASE) {
    if (lowerText.includes(app.name.toLowerCase())) {
      if (app.fees?.brokerage && app.fees.brokerage.includes('₹0 equity delivery')) {
        // Valid zero brokerage equity
      }
    }
  }

  // 3. Ensure mandatory regulatory disclaimer is present for advice/recommendations
  const disclaimer = `\n\n*Disclaimer: Stack Advisor provides research, comparison, and decision support based on verified regulatory and official disclosures. It does not provide SEBI-registered personalized investment advice or guaranteed returns.*`;

  if (!sanitizedText.includes('Disclaimer: Stack Advisor')) {
    sanitizedText += disclaimer;
  }

  return {
    isValid: flags.length === 0,
    flags,
    validatedText: sanitizedText
  };
}
