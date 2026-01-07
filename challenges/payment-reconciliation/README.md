# Payment Reconciliation Service

Build a service that reconciles payment transactions across multiple providers. This is a real problem we solve at Blaze - processing webhooks from different payment providers and ensuring our transaction records stay accurate.

**Time:** 3-4 hours

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

## Requirements

### Core Functionality
- Parse webhooks from 3 different provider formats
- Match webhooks to transactions using external IDs
- Handle duplicate webhooks (idempotency)
- Detect amount discrepancies > 0.01%
- Track webhook sequence for each transaction
- Update transaction status based on webhooks

### Edge Cases to Handle

1. **Duplicate webhooks** - Same webhook sent multiple times
2. **Out-of-order delivery** - "completed" arrives before "processing"
3. **Currency discrepancies** - FX rate differences up to 0.01%
4. **Missing webhooks** - No webhook received within 24 hours
5. **Invalid signatures** - Webhook authentication failure

## Evaluation Criteria

| Area | Weight | What We're Looking For |
|------|--------|----------------------|
| Correctness | 35% | Handles all scenarios correctly |
| Code Quality | 25% | Clean, readable, maintainable |
| Testing | 20% | Edge cases covered |
| Financial Accuracy | 15% | Money calculations are precise |
| Documentation | 5% | Clear explanation of approach |

## Deliverables

1. **Working code** - Your reconciliation service
2. **Tests** - Covering happy paths and edge cases
3. **SOLUTION.md** - Your approach and decisions
4. **AI_USAGE.md** - How you used AI tools

## Tech Stack

Use whatever you're comfortable with. We prefer TypeScript/Node.js but accept any language.

Good luck!