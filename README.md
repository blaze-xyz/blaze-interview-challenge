# Blaze Engineering Take-Home Challenge

Welcome! This challenge is designed to evaluate your problem-solving skills, technical judgment, and ability to build reliable financial systems.

## The Challenge: Payment Reconciliation Service

Build a service that reconciles payment transactions across multiple providers. This is a real problem we solve at Blaze - processing webhooks from different payment providers and ensuring our transaction records stay accurate.

**Time:** 3-4 hours (please don't spend more than this)

## What You'll Build

A reconciliation service that:

1. **Processes webhooks** from three different payment providers (Bridge, Bitso, DLocal)
2. **Matches webhooks** to internal transaction records
3. **Handles edge cases** like duplicates, out-of-order delivery, and amount discrepancies
4. **Updates transaction status** based on reconciliation results

## Getting Started

1. Review the webhook formats in `starter-code/types.ts`
2. Examine the test data in `test-data/`
3. Implement your solution
4. Write tests for edge cases
5. Document your approach in `SOLUTION.md`

## What We're Looking For

- **Correctness** - Does it handle all the edge cases?
- **Code quality** - Is it readable and maintainable?
- **Testing** - Are important scenarios covered?
- **Financial accuracy** - Are money calculations precise?
- **Documentation** - Can we understand your approach?

## Tools & AI Usage

**Use whatever tools you normally use** - including AI assistants like ChatGPT, Claude, or Copilot. We want to see how you work in a real environment.

**Important:** Please document your AI usage in `AI_USAGE.md`:
- What prompts worked well?
- What did you accept, modify, or reject from AI suggestions?
- What issues did you catch in AI-generated code?

This helps us understand your problem-solving approach and judgment.

## Edge Cases to Handle

Your service should handle:

- **Duplicate webhooks** - Same webhook sent multiple times
- **Out-of-order delivery** - "completed" webhook arrives before "processing"
- **Amount discrepancies** - Small differences (< 0.01%) due to FX rates
- **Missing webhooks** - No webhook received within expected timeframe
- **Invalid signatures** - Webhook authentication failures

## Deliverables

1. **Working code** - Your reconciliation service implementation
2. **Tests** - Covering happy paths and edge cases
3. **SOLUTION.md** - Brief explanation of your approach, architecture decisions, and tradeoffs
4. **AI_USAGE.md** - Documentation of how you used AI tools (if applicable)

## Submission

- Fork this repository
- Implement your solution
- Submit via pull request or send us a zip file

## Questions?

If anything is unclear, please reach out to your recruiting contact. We're happy to clarify requirements.

Good luck! We're excited to see your approach.