# Exchange Rate Alert System

Build a full-stack application that lets users set alerts for currency exchange rates and get notified when their target is hit.

**Time:** 4-5 hours

## Background

Blaze users send money internationally and care about getting good exchange rates. They want to be notified when rates reach their target so they can make transfers at optimal times.

## What You'll Build

A web application with:

1. **Rate Dashboard** - View current and historical exchange rates
2. **Alert Configuration** - Set up alerts for target rates
3. **Alert Management** - View, enable/disable, and delete alerts
4. **Notification History** - See which alerts have triggered

## Blaze Exchange Rate API

We're giving you access to our live exchange rate API. Use this for current rates:

### Get All Rates (from USD)
```
GET https://api.blazemoney.com/currency/rates
```

**Response:**
```json
{
  "MXN": 17.25,
  "EUR": 0.92,
  "BRL": 4.89,
  "GBP": 0.79,
  ...
}
```

### Convert Amount
```
GET https://api.blazemoney.com/currency/convert/:to/:amount
```

**Example:** `GET https://api.blazemoney.com/currency/convert/MXN/100`

**Response:**
```json
{
  "from": "USD",
  "to": "MXN",
  "amount": 100,
  "result": 1725.00,
  "rate": 17.25
}
```

### Rate Limits
- These are public endpoints, no authentication required
- Please don't poll more than once per second
- For historical data, use the provided `mock-rates.json`

## Requirements

### Backend

#### Data Model
- Users (simplified - can hardcode a single user)
- Alerts: currency pair, target rate, direction (above/below), enabled status
- Notification history: when alerts triggered

#### API Endpoints
```
GET  /api/rates                    # Proxy to Blaze API or return cached rates
GET  /api/rates/:pair/history      # Historical rates (use mock data)
GET  /api/alerts                   # User's alerts
POST /api/alerts                   # Create new alert
PATCH /api/alerts/:id              # Update alert (enable/disable)
DELETE /api/alerts/:id             # Delete alert
GET  /api/notifications            # Notification history
```

#### Rate Checking
- Poll Blaze API periodically (every 30-60 seconds is fine)
- Check alerts against current rates
- Create notification when alert triggers
- Auto-disable alert after it triggers (optional: make configurable)

### Frontend

#### Rate Dashboard
- Display current rates for common pairs (USD→MXN, USD→EUR, USD→BRL, USD→GBP)
- Simple chart showing 7-day history for selected pair
- Auto-refresh indicator showing when rates were last fetched

#### Alert Form
- Select target currency (converting from USD)
- Enter target rate
- Choose direction: "Alert when rate goes above X" or "below X"
- Show current rate for reference

#### Alert List
- Show all alerts with status (active, triggered, disabled)
- Toggle enable/disable
- Delete alert
- Show how far current rate is from target (e.g., "2.3% away")

#### Notifications
- List of triggered alerts with timestamp
- Which alert triggered and at what rate

## Supported Currencies

Focus on these USD conversions:
- USD → MXN (Mexican Peso)
- USD → EUR (Euro)
- USD → BRL (Brazilian Real)
- USD → GBP (British Pound)

## Edge Cases to Consider

1. **Rate volatility** - Rate crosses threshold multiple times quickly
2. **Invalid targets** - User sets impossible rate (e.g., USD/MXN = 0.5)
3. **Duplicate alerts** - Same currency/direction/target already exists
4. **Disabled alerts** - Shouldn't trigger notifications
5. **Rate gaps** - Rate jumps past target without hitting it exactly
6. **API failures** - What happens if the Blaze API is temporarily unavailable?

## Tech Stack

Use whatever you're comfortable with. Suggestions:
- **Frontend:** React, Vue, or vanilla JS
- **Backend:** Node.js/Express, Python/Flask, or similar
- **Database:** SQLite, PostgreSQL, or in-memory store
- **Charts:** Chart.js, Recharts, or similar

## Evaluation Criteria

| Area | Weight | What We're Looking For |
|------|--------|----------------------|
| Functionality | 30% | Core features work correctly |
| Code Quality | 25% | Clean, readable, maintainable |
| UI/UX | 20% | Intuitive, looks reasonable |
| Edge Cases | 15% | Handles unusual scenarios |
| Testing | 10% | Key paths are tested |

## Deliverables

1. **Working application** - We should be able to run it locally
2. **README** - Setup instructions and architecture notes
3. **SOLUTION.md** - Your approach, decisions, and tradeoffs
4. **AI_USAGE.md** - How you used AI tools (if applicable)

## Getting Started

```bash
# Clone and setup
git clone <your-fork>
cd exchange-rate-alerts

# Install dependencies (your choice of tooling)
npm install  # or yarn, pnpm, pip, etc.

# Start development
npm run dev
```

## Time Management Tips

Suggested allocation:
- **30 min** - Planning and setup
- **90 min** - Backend (API, data model, rate checking)
- **90 min** - Frontend (dashboard, forms, lists)
- **30 min** - Polish and edge cases
- **30 min** - Documentation and cleanup

Don't over-engineer. A working simple solution beats an incomplete complex one.

## Questions?

Reach out to your recruiting contact if anything is unclear. Good luck!