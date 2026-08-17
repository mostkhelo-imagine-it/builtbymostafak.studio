# The Clarity Snapshot — Web App

A paid, gated web tool for **builtbymostafaK© Creative Studio**.

Flow: a button on your site → **Paddle** checkout (choose $20 / $50 / $100) → after payment, the buyer lands on a private chat page on your domain that runs the **Clarity Companion** (powered by Claude). No buyer account needed. The AI key stays on the server, and each purchase unlocks a capped number of messages so a shared link can't run up your bill.

Payment uses **Paddle**, a merchant of record: Paddle sells to your customers worldwide in USD, collects and remits all sales tax/VAT for you, and pays you out — and Egypt is supported as a seller country.

You don't need to be a developer to launch this. Follow the steps in order.

---

## What you'll need (all have free tiers)

| Service | Why | Cost |
|---|---|---|
| **Paddle** | Takes the payment, handles tax | Per-transaction fee only |
| **Anthropic** | Powers the conversation | ~a few cents per completed Snapshot; you set a spend limit |
| **Vercel** | Hosts the app | Free |
| **Upstash** | Caps usage per purchase (protects your bill) | Free |

---

## Step 1 — Set up Paddle and create your price tiers

1. Sign up at **paddle.com** and complete seller verification (Paddle reviews new accounts before you can sell live — do this early; sandbox works meanwhile).
2. Start in the **sandbox** (sandbox-vendors.paddle.com) so you can test without real money.
3. Create a **Product** called `The Clarity Snapshot`.
4. Add **three one-time Prices** to it: **$10**, **$15**, **$20** (USD, "one-time", not recurring).
5. Copy each **Price ID** (`pri_...`). These, plus your client-side token, are non-secret and are already filled into `api/config.js` — so you only need to update that file if you change your prices later.
6. Go to **Paddle → Developer tools → Authentication** and copy your **API key** (`pdl_live_...`) → this is the one secret you set in Vercel as `PADDLE_API_KEY`. Treat it like a password; never commit it or paste it anywhere public.
7. Go to **Paddle → Checkout → Checkout settings → Default payment link** and set it to your app's domain (e.g. `https://clarity.builtbymostafak.studio`). Also add that domain under **approved domains**. Paddle requires this before checkout will open on your site.

## Step 2 — Get your Anthropic key

1. Go to **console.anthropic.com → API keys** → create one → `ANTHROPIC_API_KEY`.
2. Under **Billing → Limits**, set a monthly spend cap (e.g. $20).

## Step 3 — Create the Upstash usage store

1. Go to **console.upstash.com → Create database** → Redis.
2. Open it → **REST API** → copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## Step 4 — Make an app secret

Generate a random string (signs the access tokens). In a terminal:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output → `APP_SECRET`.

## Step 5 — Deploy to Vercel

1. Create a free account at **vercel.com**.
2. Deploy this folder (easiest: `npm i -g vercel`, then run `vercel` in this folder, and `vercel --prod` for the live version).
3. In Vercel → your project → **Settings → Environment Variables**, add:

```
PADDLE_ENVIRONMENT        = production
PADDLE_API_KEY            = (your rolled live key — the only Paddle secret)
ANTHROPIC_API_KEY
ANTHROPIC_MODEL           = claude-sonnet-5
APP_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
SESSION_MESSAGE_BUDGET    = 60
SESSION_TTL_SECONDS       = 86400
```

(Client token and price IDs are pre-filled in `api/config.js`, so they're not in this list.)

4. **Redeploy** after adding the variables so they take effect.

## Step 6 — Point your domain

In Vercel → **Settings → Domains**, add `clarity.builtbymostafak.studio` and follow the DNS steps. Make sure this exact domain is the one you approved in Paddle (Step 1.7).

## Step 7 — The website button

Your site's Services page already has a "Begin your Clarity Snapshot" button pointing to `https://clarity.builtbymostafak.studio`. Once the domain is live, the flow works end to end. (If you use a different domain, update `toolUrl` in `site/src/content.en.js` and `content.ar.js`.)

---

## Test it before going live

1. Keep `PADDLE_ENVIRONMENT=sandbox`. Use Paddle's [test card](https://developer.paddle.com/concepts/payment-methods/credit-debit-card) (e.g. `4242 4242 4242 4242`, any future expiry, any CVC).
2. Visit your site button → pick a tier → pay in the Paddle overlay → you should land on the chat page and the Companion should greet you.
3. Have a full conversation and confirm you receive a Snapshot.
4. When happy: create live Prices in the Paddle production dashboard, swap all `PADDLE_*` values to live ones, set `PADDLE_ENVIRONMENT=production`, and redeploy.

---

## Tuning it to sound like you

Open `api/_lib/prompt.js` and adjust the Clarity Companion's questions and voice until they sound exactly like you. Run the tool on 2–3 of your own real projects first. That edit is what makes this a paid product rather than a generic prompt.

Other dials: `SESSION_MESSAGE_BUDGET` (messages per purchase), `ANTHROPIC_MODEL` (`claude-sonnet-5` recommended), `max_tokens` in `api/chat.js` (reply length).

---

## How the paid gate works (plain English)

1. The landing page loads Paddle.js and opens a checkout for the tier the buyer picks.
2. After payment, Paddle redirects to `/tool` and appends a transaction id (`_ptxn`).
3. `/api/session` asks Paddle "was this transaction actually paid?" — only if yes does it hand back a signed access pass and open a message budget in Upstash.
4. Every message passes through `/api/chat`, which checks the pass and spends one from the budget before calling Claude. When the budget is gone, the session closes.

Your Anthropic key and the Companion's instructions live only on the server — buyers never see them.

---

## Files

```
index.html            Landing + Paddle checkout (tier buttons)
tool.html             The gated chat page (loads after payment)
api/config.js         Serves public Paddle settings to the landing page
api/session.js        Verifies the Paddle transaction, issues access pass
api/chat.js           Runs the Clarity Companion via Claude (capped)
api/checkout.js       Deprecated (Stripe leftover) — unused, redirects to /
api/_lib/prompt.js    The Companion's voice — edit this
api/_lib/token.js     Signs / verifies access passes
api/_lib/usage.js     Per-purchase message cap (Upstash)
.env.example          The full list of settings
```
