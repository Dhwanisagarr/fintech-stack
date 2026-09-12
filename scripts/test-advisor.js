import { processAdvisorQuery } from '../lib/stack-advisor/advisor-core.js';
import { validateAdvisorOutput } from '../lib/stack-advisor/hallucination-validator.js';

const TEST_PERSONAS = [
  { id: 1, name: "Heavy UPI user", query: "I transfer money every day via UPI and want max cashback, using PhonePe and Google Pay." },
  { id: 2, name: "Beginner investor", query: "I earn 50000 and spend 30000. I want to start investing in simple SIP mutual funds." },
  { id: 3, name: "Experienced investor", query: "I trade direct stocks and index ETFs, looking for lowest fees and detailed charting." },
  { id: 4, name: "Frequent trader", query: "I do F&O trading and intraday trading daily." },
  { id: 5, name: "Rewards-focused user", query: "I spend 40000 on credit cards and want maximum credit card rewards." },
  { id: 6, name: "Budget-focused user", query: "I make 60000, spend 45000, have 10000 EMI, and need strict expense tracking." },
  { id: 7, name: "Banking-focused user", query: "I want high interest rate savings accounts and zero balance salary banking." },
  { id: 8, name: "Credit-focused user", query: "I want to check my CIBIL score and pay bill payments." },
  { id: 9, name: "Travel-rewards user", query: "I spend heavily on flights and hotels and want lounge access cards." },
  { id: 10, name: "Low-fee user", query: "I want zero AMC zero brokerage direct mutual fund investments." },
  { id: 11, name: "Simplicity-focused user", query: "I want one single simple app for payments and mutual funds." },
  { id: 12, name: "Multiple overlapping apps user", query: "I currently use HDFC Bank, PhonePe, Paytm, CRED, Groww, and Zerodha." },
  { id: 13, name: "No fintech apps user", query: "I only have a SBI savings account and no fintech apps." },
  { id: 14, name: "User with debt", query: "I earn 70000, spend 40000, and have 25000 monthly loan EMI." },
  { id: 15, name: "User with emergency savings", query: "I earn 100000, spend 50000, and have 400000 in emergency fixed deposits." },
  { id: 16, name: "User without emergency savings", query: "I earn 80000, spend 60000, and have zero savings in bank." },
  { id: 17, name: "User saving for short-term goal", query: "I need to save 2 lakhs in 1 year for a car down payment." },
  { id: 18, name: "User investing long-term", query: "I want to build a retirement corpus over 20 years in equity mutual funds." },
  { id: 19, name: "User asking stock-research questions", query: "Tell me about HDFC Bank stock financial metrics and risks." },
  { id: 20, name: "User asking ambiguous/conflicting questions", query: "I want high guaranteed 30% returns with zero risk." }
];

async function runTestSuite() {
  console.log("==========================================");
  console.log("      STACK ADVISOR 20-PERSONA SUITE      ");
  console.log("==========================================\n");

  let passed = 0;
  let failed = 0;

  for (const persona of TEST_PERSONAS) {
    try {
      const res = await processAdvisorQuery(persona.query);
      
      // Basic health assertions
      const hasResponse = !!res.responseText && res.responseText.length > 50;
      const isValid = res.isValid;
      const hasDisclaimer = res.responseText.includes("Disclaimer: Stack Advisor");

      if (hasResponse && isValid && hasDisclaimer) {
        console.log(`[PASS] Persona ${persona.id}: ${persona.name}`);
        console.log(`       Intent: ${res.intent} | Recommendations: ${res.recommendations.length} | Follow-ups: ${res.followUpQuestions.length}`);
        passed++;
      } else {
        console.log(`[FAIL] Persona ${persona.id}: ${persona.name}`);
        console.log(`       Validation Flags:`, res.validationFlags);
        failed++;
      }
    } catch (err) {
      console.log(`[ERROR] Persona ${persona.id}: ${persona.name} -> ${err.message}`);
      failed++;
    }
  }

  // Test Hallucination Protection Engine
  console.log("\n--- Testing Hallucination Safety Filter ---");
  const dangerousClaim = "This stock will give guaranteed 50% returns with zero risk! Buy this now!";
  const validation = validateAdvisorOutput(dangerousClaim);
  if (!validation.isValid && validation.flags.length > 0) {
    console.log("[PASS] Hallucination Safety Filter correctly flagged forbidden hype claims.");
    passed++;
  } else {
    console.log("[FAIL] Hallucination Safety Filter failed to block forbidden hype claims.");
    failed++;
  }

  console.log("\n==========================================");
  console.log(` RESULTS: ${passed} Passed, ${failed} Failed out of ${TEST_PERSONAS.length + 1} Total Tests`);
  console.log("==========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite();
