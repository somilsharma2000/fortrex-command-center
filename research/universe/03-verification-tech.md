# FORTREX Verification Technology & Broker Read-Only Data Architecture

> **Document Status:** Complete Strategy & Technical Architecture Report  
> **Prepared For:** FORTREX Founder & Technical Architecture Team  
> **Brand & Platform Context:** Non-Custodial Skill-Based Trading Tournament Platform  
> **Target Launch:** November 7, 2026 | **Build Target:** October 2026 (Adapter #1)  
> **Primary Audience:** Indian Retail Traders (NSE/BSE/MCX) + Global Forex Traders (MT4/MT5/cTrader)  
> **Evidence Grading Standards:**  
> - **Grade A:** Official Broker / Vendor API Documentation  
> - **Grade B:** Credible Secondary Industry Reports & Tech Analysis  
> - **Grade C:** Verified Community / Developer Forum Benchmark Data  
> - **Grade D:** Engineering Hypothesis / Analytical Projection  

---

## Executive Summary

* **The Single Hardest Technical Problem Is Also The Ultimate Moat:** Retail trading competitions historically fail due to trust issues—fake P&L screenshots, photoshopped trading statements, and paper-trading accounts that ignore real slippage and liquidity. FORTREX solves this by connecting directly to trader broker accounts in read-only mode, creating an un-cheatable, automated leaderboard.
* **Non-Custodial Guarantee:** FORTREX never holds client funds, never takes trade execution authority, and never requests withdrawal access or master trading passwords. Read-only broker credentials and OAuth tokens strictly permit read access to historical orders, executed trades, open positions, and account balances.
* **India-First Reality Check (NSE / BSE / MCX):** Indian retail traders represent >70% of FORTREX’s initial launch audience. Indian brokers (Dhan, Upstox, Zerodha, Fyers, Angel One) provide official REST APIs with 100% free read-only trade endpoints or low-cost access.
* **Zerodha’s Game-Changing Policy:** Zerodha revised its Kite Connect API pricing model—making order, portfolio, tradebook, and account read endpoints **100% free** for personal and third-party read applications (down from ₹2,000/month), with historical tick market data reduced to ₹500/month.
* **Dhan HQ API as the Premier First Adapter:** Dhan provides the cleanest, most developer-friendly API architecture with zero API fees, permanent/long-lived access tokens, instant OAuth onboarding, native F&O position tracking, and zero rate-limit friction for read-only trade syncing.
* **Global Forex Architecture (MT4 / MT5 / cTrader):** For global forex traders, MetaTrader 4/5 investor passwords provide read-only protocol access. Rather than spending 6 months building a custom fleet of headless MetaTrader terminals, FORTREX can integrate **MetaApi.cloud** (or Api2Trade) in under 2 weeks for ~$0.50–$1.50 per active account/month.
* **Fallback Verification for Unsupported Brokers:** Statement PDF parsing combined with **PKCS#7 / X.509 Digital Signature Validation** (for Indian broker contract notes) and direct email forwarding verification (`verify@fortrex.io` with DKIM/SPF checks) provides a tamper-proof backup mechanism for unsupported brokers.
* **October Build Recommendation:** Build the **Dhan HQ API Adapter FIRST** as the flagship integration for October 2026, followed immediately by **Zerodha Kite Connect** and **Upstox API v2**. Concurrently, plug in **MetaApi.cloud** for global MT4/MT5 forex traders.

---

## 1. MetaTrader 4/5 Read-Only Access

### What It Is
MetaTrader 4 (MT4) and MetaTrader 5 (MT5) are the dominant trading terminals for global forex, index CFDs, and commodities. MetaTrader accounts feature a dual-password architecture:
1. **Master (Trader) Password:** Full read-write permission (place, modify, close trades, adjust leverage).
2. **Investor (Read-Only) Password:** Strict read-only permission allowing viewing of open trades, historical deal logs, account balance, equity, margin, and live quotes. It **cannot** create, modify, or execute orders.

To ingest MT4/MT5 data programmatically, three primary approaches exist:
* **Investor Password via Cloud API Wrappers (MetaApi.cloud / Api2Trade):** Server-side background connections using investor credentials that expose REST / WebSocket endpoints.
* **MT5 Manager / Server API:** MetaQuotes native C++ DLL interface for broker server operators. Requires official broker server licenses and broker partnership agreements.
* **Publisher / Web EA (MQL Script):** An Expert Advisor installed inside the user's desktop terminal that pushes trade logs to FORTREX endpoints via HTTP POST.

```
+---------------------------------------------------------------------------------+
|                          MT4 / MT5 Integration Paths                            |
+---------------------------------------------------------------------------------+
|  [Trader's MT4/MT5 Account]                                                     |
|          |                                                                      |
|          +---> (1) Investor Password ---> MetaApi.cloud REST API ---> FORTREX   |
|          |                                (Recommended / Fast)                  |
|          |                                                                      |
|          +---> (2) MQL Publisher EA  ---> HTTP POST Webhook     ---> FORTREX   |
|          |                                (User Desktop Dependent)              |
|          |                                                                      |
|          +---> (3) MT5 Manager API   ---> Direct Server Sync    ---> FORTREX   |
|                                           (Requires Broker Partnership)         |
+---------------------------------------------------------------------------------+
```

### Data Exposed
* **Account Financials:** Balance, Equity, Free Margin, Margin Level, Margin Used, Floating P&L, Leverage.
* **Trade Details:** Order Ticket ID, Symbol, Direction (Buy/Sell), Lot Size (Volume), Open Price, Close Price, Stop Loss, Take Profit, Commission, Financing Swap, Net Closed Profit, Execution Timestamps (millisecond level in MT5).

### How Myfxbook & FXBlue Implement Verification
* **Myfxbook:** Uses a dual-step verification model:
  1. *Track Record Verification:* Trader provides Broker Server Name, Account Number, and Investor Password. Myfxbook background workers connect to the broker server via MT network protocol, pulling equity and trade history every 5–60 minutes.
  2. *Trading Privileges Verification:* Trader must change their investor password to a temporary key generated by Myfxbook (or place a pending order with a specified hash in the comment field) to prove they possess master access to that specific account.
* **FXBlue:** Uses the **FXBlue Publisher EA** or **FXBlue Personal Trade Copier** app installed in the terminal to push trade data, alongside an investor-password background sync engine (**FXBlue Account Monitor**).

### Security Implications & Attack Vectors
* **Security Strengths:** The investor password cannot place trades or withdraw capital. The master password is never submitted to FORTREX.
* **Attack Vector 1 — Password Revocation:** A trader can change or reset their investor password at any time, which halts automatic leaderboard updates.
* **Attack Vector 2 — Fake Server / Local Proxy Spoofing:** Malicious actors can set up a local private MT4/MT5 demo server, inject fake historical trades with massive profits, name the server identically to a real broker (e.g., `XM-Real 14`), and submit credentials.  
  * *FORTREX Mitigation:* Maintain an IP/DNS whitelist of verified broker server access points. Disallow connections to unverified or private IP addresses.
* **Attack Vector 3 — EA Intervention / Local Hooking:** Modifying local terminal memory buffers before local EAs push data.  
  * *FORTREX Mitigation:* Perform server-side trade tick cross-validation against exchange price history.

### Costs & Build Effort
* **MetaApi.cloud Integration:**
  * **Build Effort:** 1–2 weeks (Node.js / Python SDK).
  * **Cost:** ~$0.50 to $1.50 per active connected account/month (tiered usage).
* **MetaTrader API PRO / Api2Trade (Flat License):**
  * **Build Effort:** 2–3 weeks.
  * **Cost:** ~$599/month flat for unlimited connected accounts.
* **In-House Headless Terminal Fleet (Dockerized MT Terminals):**
  * **Build Effort:** 8–12 weeks of complex system engineering (managing Wine, Docker containers, MT terminal auto-login scripts, memory leaks, MT updates).
  * **Cost:** $300–$1,000/month in cloud infrastructure + high developer maintenance.

### Sources
* MetaApi Cloud Documentation & API Reference — [metaapi.cloud](https://metaapi.cloud/) (Grade A, Sept 2026)
* MetaQuotes MT5 Manager API Specification — [metaquotes.net](https://www.metaquotes.net/en/metatrader5/api) (Grade A, Aug 2026)
* Myfxbook Verification System Architecture — [myfxbook.com/help](https://www.myfxbook.com/help) (Grade B, Jul 2026)
* ShowMyTrades Read-Only MT Verification Checklist — [showmytrades.com](https://showmytrades.com/best-track-record-verification) (Grade B, Jun 2026)

---

## 2. Third-Party Verification Services

### What It Is
Existing market services provide trade verification and performance auditing engines. Evaluating whether FORTREX should build its own verification adapters or license/integrate third-party services is crucial for launch velocity.

```
+----------------------------------------------------------------------------------+
|               Third-Party Verification Architecture Evaluation                    |
+----------------------------------------------------------------------------------+
| Service     | Target Market    | B2B REST API Availability | Commercial Fit       |
+-------------+------------------+---------------------------+----------------------+
| MetaApi     | Forex / MT4 / MT5| Excellent (Native REST)   | PERFECT (Infrastructure)|
| Myfxbook    | Consumer FX      | Restricted Community API  | POOR (No Webhooks)   |
| FXBlue      | Consumer FX      | Custom Enterprise Only    | MODERATE (Limited)   |
| TradesViz   | Retail Multi-Asset| Direct Consumer SaaS     | POOR (No B2B Engine) |
+----------------------------------------------------------------------------------+
```

### Detailed Provider Breakdown

#### A. MetaApi.cloud (Developer Infrastructure Leader)
* **Data Provided:** Full MT4/MT5 account state, position snapshots, trade history, tick history, real-time WebSocket execution streams.
* **API Availability:** Built specifically as a developer REST & WebSocket API.
* **Cost:** $0.50–$1.50 per account/month (Pay-as-you-go) or enterprise custom volume pricing.
* **Verdict:** **INTEGRATE FOR FOREX.** MetaApi handles complex server-level MT protocols, server IP resolution, and terminal session maintenance.

#### B. Myfxbook Verification API
* **Data Provided:** Account performance summary, monthly ROI, max drawdown, historical trades list.
* **API Availability:** Public Community API exists (`/api/login.xml`, `/api/get-my-accounts.xml`), but usage terms prohibit commercial white-label leaderboard scraping or building competing apps without explicit corporate agreements.
* **Cost:** Free for personal user widgets; Enterprise B2B agreements require custom negotiations.
* **Verdict:** **DO NOT INTEGRATE.** Lacks real-time Webhook pushes, rate limits are strict, and scraping risks domain/IP blocks.

#### C. FXBlue (Live & Personal Trade Copier)
* **Data Provided:** Detailed trade analysis, risk stats, win rates, execution logs.
* **API Availability:** Offers embeddable web widgets, Publisher EAs, and custom FXBlue Live setups. Does not expose a self-serve B2B REST API for external tournament platforms.
* **Cost:** Free consumer app; enterprise white-label pricing upon contact.
* **Verdict:** **DO NOT INTEGRATE.** High integration friction and lack of modern JSON REST webhooks.

#### D. TradesViz / TraderSync / QuantData
* **Data Provided:** Multi-broker sync, behavioral analytics, execution charts.
* **API Availability:** Direct-to-consumer SaaS platforms designed for individual trader journaling. No B2B multi-tenant tournament verification API.
* **Cost:** $15–$30/user/month consumer pricing.
* **Verdict:** **DO NOT INTEGRATE.** Wrong business model (consumer SaaS vs. B2B infrastructure).

### Build Effort Estimate (Build vs. Integrate Verdict)
* **Indian Equity / F&O Brokers:** **BUILD DIRECT ADAPTERS.** Indian brokers expose free, high-speed, well-documented REST APIs with OAuth/TOTP. Third-party aggregators add unnecessary latency, fee overhead, and security risks.
* **Global MT4/MT5 Forex Brokers:** **INTEGRATE METAAPI.** Building custom MT server connectors requires massive operational overhead; MetaApi provides instant plug-and-play capability.

### Sources
* MetaApi Pricing & Technical Docs — [metaapi.cloud/pricing](https://metaapi.cloud/pricing) (Grade A, Sept 2026)
* Myfxbook Developer API Terms — [myfxbook.com/api](https://www.myfxbook.com/api) (Grade A, May 2026)
* SignalDeck Journal Integration Benchmark — [sgnldk.com](https://sgnldk.com/blog/trading-journal-platform-support/) (Grade B, Aug 2026)

---

## 3. Indian Broker APIs (Critical for India Launch Audience)

### Overview
The Indian retail market is governed by SEBI-regulated exchanges (NSE, BSE, MCX). Indian brokers provide high-performance REST APIs. Unlike global brokers, Indian broker APIs operate under strict regulatory standards, making direct broker-API verification exceptionally clean and reliable.

```
+-----------------------------------------------------------------------------------+
|                        Indian Broker API Connectivity                             |
+-----------------------------------------------------------------------------------+
| Trader (OAuth / TOTP)  ---> Broker Login Portal (Zerodha / Dhan / Upstox / etc.) |
|                                       |                                           |
| FORTREX Backend        <--- Authorization Code / Access Token                      |
|                                       |                                           |
| FORTREX Polling Engine ---> GET /trades & GET /positions (Read-Only Endpoints)    |
|                                       |                                           |
| Leaderboard Engine     <--- JSON Trade Records (Fill Price, Quantity, Time)       |
+-----------------------------------------------------------------------------------+
```

---

### Detailed Indian Broker Matrix

#### 1. Dhan HQ API (Flagship October Target)
* **What It Is:** Dhan’s dedicated developer API suite built for algorithmic traders and fintech applications.
* **Data Provided:** Complete trade history (`GET /trades`), orderbook (`GET /orders`), open/closed positions (`GET /positions`), demat holdings (`GET /holdings`), and ledger balance (`GET /ledger`).
* **Cost & Fees:** **100% FREE.** Zero API subscription fees, zero order execution surcharges.
* **Authentication & OAuth Flow:** Generates access tokens directly from the Dhan web/mobile app or via standard OAuth redirect. Access tokens can be configured for long-term validity (up to 30 days), eliminating daily re-login friction.
* **Security Notes:** Read-only API tokens restrict access to data retrieval. Dhan provides explicit IP-binding options for developer endpoints.
* **Build Effort Estimate:** **3 to 5 Days.** Clean REST JSON schemas, comprehensive Python/Node.js SDKs.

#### 2. Zerodha Kite Connect API
* **What It Is:** The market-leading API platform from India’s premier retail discount broker.
* **Data Provided:** Executed tradebook (`GET /trades`), order details (`GET /orders`), position matrix (`GET /portfolio/positions`), demat holdings (`GET /portfolio/holdings`), user profile (`GET /user/profile`).
* **Cost & Fees (2025–2026 Update):** **100% FREE for Order & Read-Only APIs.** Zerodha eliminated the ₹2,000/month fee for order placement, portfolio, and tradebook endpoints. Historical tick market data is priced at ₹500/month.
* **Authentication & OAuth Flow:** OAuth 2.0 redirect flow:
  1. Redirect user to `https://kite.zerodha.com/connect/login?v=3&api_key={api_key}`.
  2. Exchange `request_token` + `api_secret` (SHA-256 hash) for `access_token`.
  3. Token expires daily at 6:00 AM IST (requires daily user authentication or automated TOTP token refresh).
* **Security Notes:** Robust token authorization; tokens are tied strictly to developer API key parameters.
* **Build Effort Estimate:** **4 to 6 Days.** Industry-standard client libraries across Python, Node.js, Java, Go, and Rust.

#### 3. Upstox API v2
* **What It Is:** Upstox's high-speed REST and WebSocket API platform for retail equity and F&O trading.
* **Data Provided:** Day executed trades (`GET /v2/order/trades/get-trades-for-day`), historical trade logs (`GET /v2/charges/historical-trades`), short-term positions (`GET /v2/portfolio/short-term-positions`), holdings (`GET /v2/portfolio/long-term-holdings`).
* **Cost & Fees:** **100% FREE.**
* **Authentication & OAuth Flow:** Standard OAuth 2.0 Authorization Code Grant (`/v2/login/authorization/dialog` -> callback code -> `/v2/login/authorization/token`). Access token valid for 24 hours.
* **Security Notes:** Encrypted HTTPS requests, rigid token lifetime enforcement.
* **Build Effort Estimate:** **4 to 5 Days.** Clean OpenAPI specifications.

#### 4. Fyers API v3
* **What It Is:** Fyers' developer API, popular among Indian intraday and options traders.
* **Data Provided:** Complete tradebook (`GET /v3/tradebook`), orderbook (`GET /v3/orders`), positions (`GET /v3/positions`), demat holdings (`GET /v3/holdings`).
* **Cost & Fees:** **100% FREE.**
* **Authentication & OAuth Flow:** OAuth 2.0 with PKCE support (`app_id` + `secret_key`). Token valid for 24 hours.
* **Security Notes:** Requires daily access token renewal.
* **Build Effort Estimate:** **4 to 5 Days.**

#### 5. Angel One SmartAPI
* **What It Is:** Angel One’s public API suite for retail trading apps.
* **Data Provided:** Executed tradebook (`POST /rest/secure/angelbroking/order/v1/getTradeBook`), orderbook (`POST /rest/secure/angelbroking/order/v1/getOrderBook`), positions (`POST /rest/secure/angelbroking/portfolio/v1/getPosition`), holdings (`POST /rest/secure/angelbroking/portfolio/v1/getHolding`).
* **Cost & Fees:** **100% FREE.**
* **Authentication & OAuth Flow:** Uses a unique JWT + TOTP flow:
  * Client ID + Password + Time-based OTP (TOTP) submitted to `POST /rest/auth/angelbroking/user/v1/loginByPassword`.
  * Returns `jwtToken` + `refreshToken`. JWT valid for 24 hours.
* **Security Notes:** Strong multi-factor authentication requirement (TOTP seed handling).
* **Build Effort Estimate:** **5 to 7 Days** (due to TOTP handling and JWT lifecycle management).

#### 6. Fintool / Smallcase Gateway & Account Aggregator (AA) Patterns
* **Smallcase Gateway:** A B2B middleware SDK connecting 14+ Indian brokers in a single UI workflow.
  * *Pros:* One integration reaches Zerodha, Upstox, Angel One, Groww, ICICI Direct, HDFC Sec, etc.
  * *Cons:* Built for portfolio order execution and demat holdings sync; high enterprise setup cost ($5,000+ setup fee); adds latency for real-time intraday trade verification.
  * *Verdict:* Unsuitable for high-frequency intraday trading tournaments.
* **Account Aggregator (AA) Ecosystem (Finvu, OneMoney, CAMS, Sahmati):** RBI/SEBI regulated read-only financial data network.
  * *Pros:* 100% consent-based, fetch verified demat portfolio statements via OTP.
  * *Cons:* Designed for periodic financial summaries (end-of-day balances, mutual fund holdings), not real-time intraday trade polling.
  * *Verdict:* Excellent for long-term equity portfolio tournaments, but inadequate for intraday options/futures scalping competitions.

---

### Sources
* Dhan HQ API Documentation — [dhanhq.co/docs/v2](https://dhanhq.co/docs/v2/) (Grade A, Sept 2026)
* Zerodha Kite Connect API Documentation & Pricing Policy — [kite.trade/docs/connect/v3](https://kite.trade/docs/connect/v3/) (Grade A, Aug 2026)
* Upstox Developer API Reference — [upstox.com/developer/api-documentation](https://upstox.com/developer/api-documentation/) (Grade A, Jul 2026)
* Angel One SmartAPI Documentation — [smartapi.angelone.in/docs](https://smartapi.angelone.in/docs) (Grade A, Aug 2026)
* Fyers API v3 Documentation — [fyers.in/api-docs](https://fyers.in/api-docs/) (Grade A, Jun 2026)
* Sahmati Account Aggregator Framework Specifications — [sahmati.org.in](https://sahmati.org.in/) (Grade B, Jul 2026)

---

## 4. cTrader Open API & TradingView Integrations

### cTrader Open API v2 (Spotware)
* **What It Is:** Spotware’s open API platform allowing third-party developers to interact directly with cTrader accounts across all cTrader brokers (e.g., IC Markets, Pepperstone, FxPro).
* **Protocol & Architecture:** Protobuf (Protocol Buffers) over TCP/WebSockets and REST wrapper.
* **Data Provided:** Complete deal/trade history (`ProtoOADealListReq`), account details, open positions (`ProtoOAReconcileReq`), balance, leverage, margin.
* **Cost & Fees:** **100% FREE.**
* **Authentication:** Standard OAuth 2.0 authentication. Traders authorize FORTREX via Spotware’s central ID portal.
* **Security Notes:** Highly secure OAuth 2.0 framework; token access can be restricted to read-only capabilities.
* **Build Effort Estimate:** **2 to 3 Weeks** (due to Protobuf schema compiling and WebSocket event processing).
* **Verdict:** **EXCELLENT SECOND-STAGE GLOBAL ADAPTER.** Superior to MT4/MT5 in terms of native API cleanliness.

```
+---------------------------------------------------------------------------------+
|                       cTrader Open API Architecture                             |
+---------------------------------------------------------------------------------+
| Trader ---> cTrader OAuth Portal ---> Grant Read-Only Permission                 |
|                                                    |                            |
| FORTREX Backend <--- OAuth Token <-----------------+                            |
|       |                                                                         |
| WebSocket/Protobuf Engine ---> ProtoOADealListReq ---> Retrieve Executed Deals |
+---------------------------------------------------------------------------------+
```

### TradingView Broker Integrations
* **What It Is:** TradingView provides a REST API spec for *brokers* to implement, allowing TradingView users to trade through the TradingView chart interface.
* **Data Accessibility for 3rd Parties:** **ZERO.** TradingView does **NOT** expose a public API for third-party platforms to read trade execution data from a user’s TradingView session.
* **Key Misconception:** Non-technical founders often ask, "Can we just connect to TradingView to verify trades?"  
  * *Technical Reality:* TradingView acts as a frontend consumer of broker APIs. FORTREX cannot extract trade data from TradingView. FORTREX must connect to the underlying broker (e.g., Dhan, Zerodha, Interactive Brokers) directly.
* **Build Effort / Verdict:** **NOT APPLICABLE.** Direct integration with TradingView for trade ingestion is technically impossible.

### Sources
* Spotware cTrader Open API Documentation — [help.ctrader.com/open-api](https://help.ctrader.com/open-api/) (Grade A, Sept 2026)
* TradingView Broker Integration Guide — [tradingview.com/rest-api-spec](https://www.tradingview.com/rest-api-spec/) (Grade A, May 2026)

---

## 5. Statement & File-Based Verification (Fallback Strategy)

### What It Is
For unsupported brokers or regional brokers without public REST APIs, FORTREX can ingest official PDF contract notes, CSV trade exports, or MT4/MT5 HTML detailed statements as a secondary fallback.

```
+----------------------------------------------------------------------------------+
|                  Fallback Statement Verification Pipeline                        |
+----------------------------------------------------------------------------------+
| User Uploads PDF / HTML  ---> Step 1: Digital Signature Check (PKCS#7 X.509)     |
|                               |                                                  |
| Direct Email Forwarding  ---> Step 2: Email Header Auth (SPF / DKIM / DMARC)    |
|                               |                                                  |
| FORTREX Parser Engine    ---> Step 3: Tick Data Cross-Validation (NSE/BSE/FX)   |
|                               |                                                  |
| Leaderboard Updated      <--- Verified / Flagged as Forged                      |
+----------------------------------------------------------------------------------+
```

### Tamper Risks & Counterfeit Methods
* **HTML Statements (MT4/MT5):** Easily manipulated using plain text editors or browser inspect element prior to upload.
* **CSV Files:** Zero security or verification markers; fully editable in Excel or Python.
* **PDF Statements:** Unsigned PDFs can be edited using Adobe Acrobat, PDF editors, or specialized Python scripts.

### Cryptographic Forgery Detection Protocols

#### 1. PKCS#7 / X.509 Digital Signature Validation (Indian Contract Notes)
* **How It Works:** SEBI mandates that Indian brokers digitally sign official daily PDF contract notes using corporate X.509 digital certificates (e.g., eMudhra, Digicert).
* **Verification Engine:** Using Python libraries like `pyHanko` or `endroid`, FORTREX extracts the cryptographic signature block from uploaded PDFs.
* **Tamper Proof:** If even a single character, price decimal, or order number is altered after the broker signs the file, the cryptographic hash check fails instantly.

#### 2. Direct Broker Email Forwarding Parsing
* **How It Works:** Traders configure auto-forwarding of daily broker contract emails to `verify@fortrex.io`.
* **Verification Engine:** FORTREX inspects email headers for **SPF (Sender Policy Framework)**, **DKIM (DomainKeys Identified Mail)**, and **DMARC** authentication.
* **Tamper Proof:** Proves that the email and attachment originated directly from `@zerodha.com`, `@dhan.co`, or `@upstox.com` mail servers without user tampering.

#### 3. Market Price Tick Data Cross-Validation
* **How It Works:** Extracts execution timestamps, symbols, order directions, and execution prices from the statement.
* **Verification Engine:** Cross-checks each trade against historical exchange tick data (NSE/BSE/MCX OHLC tick archives).
* **Tamper Proof:** Flags any trade where the claimed fill price lies outside the high-low market boundary for that exact millisecond.

### Cost & Build Effort
* **Build Effort:** 2 to 3 weeks for parser development, PDF signature verifier, and email header validator.
* **Cost:** Minimal ($10–$50/month for cloud storage and OCR parsing libraries).

### Sources
* pyHanko Cryptographic PDF Signature Verification Docs — [pyhanko.readthedocs.io](https://pyhanko.readthedocs.io/) (Grade A, Jun 2026)
* SEBI Master Circular for Stock Brokers — [sebi.gov.in](https://www.sebi.gov.in/) (Grade A, Jul 2025/2026)
* Indian Broker Contract Note Signature Architecture — [digio.in/tech](https://www.digio.in/) (Grade B, May 2026)

---

## 6. Competitor Verification Landscape & The Moat Analysis

### How Competitors Handle Verification
* **Prop Trading Firms (FTMO, Topstep, FundedNext):** Force traders onto their internal white-label demo servers (MetaTrader, Rithmic, Tradovate). They control the server database directly.  
  * *Core Conflict:* Conflict of interest—the prop firm acts as both counterparty and execution server.
* **Trading Journal Platforms (TradesViz, TraderSync, JournalLab):** Rely primarily on manual CSV uploads and optional API syncs.  
  * *Core Difference:* Built for post-trade analytical reflection, not anti-cheat competitive leaderboards. They do not enforce strict cryptographic anti-tamper validation.
* **Fantasy / Social Trading Platforms (TradingLeagues, StockGro):** Use paper trading or fantasy stock picking.  
  * *Core Weakness:* Paper execution ignores market depth, slippage, and emotional stakes. In India, real-money gaming (RMG) apps face severe tax friction (30% TDS).

### What Makes Broker-Direct Verification Hard to Fake
1. **Server-to-Server Authentication:** Data is pulled directly from official broker API servers into FORTREX databases via encrypted REST/WebSocket connections.
2. **Elimination of Client-Side Attack Vectors:** Inspect Element, Photoshop, fake browser extensions, and tampered CSV files are rendered ineffective.
3. **Automated Orderbook Cross-Verification:** Order IDs, exchange trade IDs, fill timestamps, and transaction fees are validated against exchange records.
4. **Real-Money Skin in the Game:** Proves that performance occurred on live, funded broker accounts under real market spread, slippage, and execution constraints.

---

## 7. Comprehensive Verification Technology Comparison Table

| Integration / Adapter | Target Market | Read Data Depth | Unit Cost | API Setup / Friction | Build Effort | Security / Anti-Cheat Level | Recommendation & Build Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Dhan HQ API** | Indian Equity / F&O | Full Trades, Orders, Positions, Holdings | **FREE** | Zero Fee; Long-Lived Token / OAuth | 3–5 Days | **Grade A+** (Broker Direct API) | **BUILD FIRST (Flagship Adapter #1)** |
| **Zerodha Kite Connect** | Indian Equity / F&O | Full Trades, Orders, Positions, Holdings | **FREE** (Read API); ₹500/mo (Tick) | Free Read API; OAuth Redirect | 4–6 Days | **Grade A+** (Broker Direct API) | **BUILD SECOND (Essential for India)** |
| **Upstox API v2** | Indian Equity / F&O | Full Trades, Orders, Positions, Holdings | **FREE** | OAuth 2.0 Authorization Code | 4–5 Days | **Grade A+** (Broker Direct API) | **BUILD THIRD (High Volume Audience)** |
| **Angel One SmartAPI** | Indian Equity / F&O | Full Trades, Orders, Positions, Holdings | **FREE** | JWT + TOTP Authentication | 5–7 Days | **Grade A+** (Broker Direct API) | **BUILD FOURTH (Mass Audience)** |
| **Fyers API v3** | Indian Equity / F&O | Full Trades, Orders, Positions, Holdings | **FREE** | OAuth 2.0 PKCE | 4–5 Days | **Grade A+** (Broker Direct API) | **BUILD FIFTH (Active F&O Traders)** |
| **MetaApi.cloud (MT4/MT5)** | Global Forex / CFDs | Full Account, Trades, Positions, Equity | ~$0.50–$1.50 / account / mo | Investor Password REST Engine | 1–2 Weeks | **Grade A** (Server-Validated MT Sync) | **INTEGRATE FOR FOREX (Avoid Reinventing)** |
| **cTrader Open API** | Global Forex / CFDs | Full Deals, Orders, Reconcile State | **FREE** | OAuth 2.0 / Protobuf WebSockets | 2–3 Weeks | **Grade A+** (Official Open API) | **BUILD STAGE 2 (Global Forex Expansion)** |
| **Smallcase Gateway** | Indian Multi-Broker | Demat Holdings & Order Placement | High Enterprise B2B Fees | Unified B2B Gateway SDK | 2 Weeks | **Grade B+** (Focused on Execution/Holdings) | **SKIP FOR LAUNCH (High Overhead)** |
| **Account Aggregator (AA)** | Indian Banking / Demat| Demat Holdings & End-of-Day Statements | Free / Low API Fee | RBI/SEBI Consent Flow | 2–3 Weeks | **Grade A** (Cryptographic SEBI Sync) | **POST-LAUNCH (For Portfolio Leagues)** |
| **PDF Contract Notes (Parser)**| Unsupported Indian | Trades, Brokerage, STT, Charges | **FREE** | User Upload / Email Auto-Forward | 2–3 Weeks | **Grade A** (via PKCS#7 X.509 Signature) | **BUILD FALLBACK (For Unsupported Brokers)**|

---

## 8. Final Recommendation & Action Plan for October 2026

### The ONE Adapter to Build First: **Dhan HQ API**

```
+---------------------------------------------------------------------------------+
|                         October Build Roadmap                                  |
+---------------------------------------------------------------------------------+
| Week 1 (Oct 1–7):   Dhan HQ API Adapter (Flagship Indian Adapter #1)            |
| Week 2 (Oct 8–14):  Zerodha Kite Connect + Upstox API v2 Adapters              |
| Week 3 (Oct 15–21): MetaApi.cloud Integration (Global MT4/MT5 Forex Connector)  |
| Week 4 (Oct 22–31): PDF Digital Signature Verifier + End-to-End Testing         |
+---------------------------------------------------------------------------------+
```

#### Why Dhan HQ API First?
1. **Zero Financial Friction:** 100% free with zero API keys or monthly subscription fees.
2. **Superior Onboarding & Token Lifetime:** Unlike Zerodha (which expires tokens daily at 6:00 AM IST), Dhan supports long-lived access tokens (up to 30 days). Traders connect once and remain seamlessly synced throughout multi-day tournaments.
3. **Ideal Target Audience:** Dhan is heavily favored by active Indian F&O (Futures & Options) and intraday traders—the core viral demographic for FORTREX launch tournaments.
4. **Developer Efficiency:** Clean JSON schemas and Python/Node.js SDKs allow FORTREX to build, test, and deploy a fully functional Dhan read-only sync engine in just 3 to 5 days.

### Build-vs-Integrate Verdict per Category

* **Indian Retail Brokers (Dhan, Zerodha, Upstox, Angel One, Fyers):**  
  * **VERDICT: BUILD DIRECT ADAPTERS.**  
  * *Reason:* REST APIs are free, robust, and well-documented. Building direct adapters ensures zero monthly vendor fee, sub-second leaderboard updates, and complete data ownership.
* **Global Forex / Index Brokers (MT4 / MT5):**  
  * *VERDICT: INTEGRATE METAAPI.CLOUD.*  
  * *Reason:* Building an in-house fleet of headless MetaTrader terminals creates severe maintenance burden. MetaApi handles complex server protocols for ~$0.50–$1.50/account/month, allowing FORTREX to deploy global MT4/MT5 support in under 2 weeks.
* **Global Forex / Index Brokers (cTrader):**  
  * **VERDICT: BUILD DIRECT IN STAGE 2.**  
  * *Reason:* Spotware’s cTrader Open API is 100% free and native Protobuf/REST, making it a high-value direct build for international expansion post-launch.
* **Fallback Verification Engine:**  
  * **VERDICT: BUILD IN-HOUSE PKCS#7 SIGNATURE PARSER.**  
  * *Reason:* Open-source Python libraries (`pyHanko`) allow cryptographic validation of digitally signed Indian broker PDF contract notes with zero third-party software cost.

---
*Report Compiled for FORTREX Engineering Command Center — October 2026 Implementation.*
