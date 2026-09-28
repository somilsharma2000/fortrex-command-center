# FORTREX: Compliance, Geo-Restriction & Discoverability Brief

**Document Status:** Confidential & Internal Planning  
**Legal Notice:** **FOR COUNSEL REVIEW — NOT FINAL LEGAL ADVICE.** All regulatory analyses, terms, disclosures, and risk recommendations contained herein are provided for operational preparation and must be formally reviewed, revised, and approved by qualified legal counsel prior to public deployment.  
**Target Launch Date:** November 7, 2026 (Stealth Mode Active; All SEO pages set to `noindex`).

---

## Executive Summary & Core Constraints

FORTREX is a non-custodial global skill-based trading competition platform. To participate, users are required to open a MetaTrader 5 (MT5) account with XM via FORTREX's affiliate/Introducing Broker (IB) tracking link. FORTREX earns affiliate/IB commissions on accounts opened via this link.

**Key Operating Constraints:**
1. **REX Points:** Earned through competition performance; **REX points have no cash value** and cannot be redeemed for legal tender, cryptocurrencies, or direct monetary equivalent.
2. **India Residents Constraint:** Pursuant to Reserve Bank of India (RBI) circulars and Foreign Exchange Management Act (FEMA) guidelines regarding unauthorized foreign exchange platforms, offshore broker links must **NOT** be displayed to users in India.
3. **Stealth Mode (Pre-Launch):** The website remains in stealth until **November 7, 2026**. All public SEO assets and pages are deployed with strict `noindex, nofollow` headers/tags until official launch.

---

## 1. Affiliate Disclosure Requirements

Because FORTREX receives compensation from XM for user account creations via tracked referral links, global financial and advertising regulations require clear, prominent, and unambiguous disclosures.

### 1.1 Multi-Jurisdictional Regulatory Analysis (For Counsel Review)

* **FTC (United States - 16 CFR Part 255):**
  * Requires "clear and conspicuous" disclosure of any material connection between an endorser/referrer and a seller.
  * Disclosures must appear *above the fold*, prior to any action link, and cannot be buried in Terms of Service or long privacy policies.
* **ASA / CAP Code (United Kingdom):**
  * Marketing communications must be obviously identifiable as advertisements.
  * Links generating revenue must explicitly use labels such as `#Ad`, `Paid Partnership`, or `Commission-Based Link` in close proximity to the call-to-action (CTA).
* **ESMA / FCA Financial Promotion Rules (EU & UK):**
  * Introducers and affiliates promoting financial service providers (such as CFD/forex brokers) are subject to Financial Promotion rules (e.g., FCA COBS 4 / Consumer Duty regime).
  * Affiliates must clearly state their commercial introducing status, ensure claims are fair, clear, and non-misleading, and present affiliate disclosures alongside mandatory CFD risk warnings.
* **ASIC (Australia - RG 234 / RG 271):**
  * Prohibits misleading or deceptive conduct in promoting OTC derivatives.
  * Affiliates receiving Introducing Broker (IB) or cost-per-acquisition (CPA) remuneration must disclose the nature of the compensation to clients before referral.

### 1.2 Ready-to-Use Disclosure Text (For Counsel Review)

#### Option A: Persistent Header / CTA Banner Disclosure (Short Form)
> **Affiliate Disclosure:** FORTREX is an independent skill competition platform and acts as an Introducing Broker/Affiliate for XM. When you open an MT5 trading account using our referral links, FORTREX receives financial compensation from XM. Participation in competitions requires an account created via our link. *[Learn More / Full Risk Disclosure]*

#### Option B: On-Page & Modal Disclosure (Full Form)
> **Ad & Affiliate Disclosure (For Counsel Review):** FORTREX operates as an affiliate and Introducing Broker (IB) for XM (Trading Point Group). Links to open MetaTrader 5 (MT5) accounts on this platform are tracking links. If you click on an XM link and open a live or demo trading account, FORTREX will earn a commission or referral fee from XM.  
> 
> Competition entry requires opening an MT5 account via our referral link. FORTREX does not execute trades, hold client funds, or act as a broker. All broker services, execution, and account custody are provided solely by XM subject to XM's terms and client agreements. REX points awarded on FORTREX are virtual engagement markers with no cash value and cannot be exchanged for currency.

---

## 2. Geo-Blocking List Logic & Implementation

To comply with foreign exchange laws, broker licensing boundaries, and international sanctions, FORTREX must dynamically filter and block offshore broker referral links based on user location.

### 2.1 Prohibited & Restricted Jurisdiction List (For Counsel Review)

The following categories must be blocked from viewing or clicking XM broker affiliate links:

1. **India (FEMA / RBI Restriction):**
   * *Rationale:* RBI and FEMA prohibit Indian residents from remitting funds abroad for margin trading in foreign exchange/CFDs via unauthorized offshore platforms (refer to RBI Alert List). Promoting offshore forex links to Indian residents carries severe regulatory exposure.
2. **United States:**
   * *Rationale:* XM does not accept US residents due to CFTC/SEC regulatory prohibitions on off-exchange retail foreign exchange and non-CFTC registered CFD providers.
3. **XM Global's Restricted Countries List:**
   * *Restricted Regions:* United States, Canada, Israel, Islamic Republic of Iran, Democratic People's Republic of Korea (North Korea), Myanmar, Syria, Sudan, Cuba, and FATF blacklisted jurisdictions.
4. **EU / UK / Australian Resident Cross-Border Solicitation Safeguards:**
   * *Rationale:* Offshore entities (e.g., FSC Belize or FSA Seychelles entities of XM) must not be solicited to retail clients residing in jurisdictions governed by ESMA, FCA, or ASIC unless routed to the locally regulated XM entity (e.g., Trading Point of Financial Instruments UK Ltd / CySEC entity).

### 2.2 Technical Implementation Architecture

```
[ Incoming User Request ] 
          │
          ▼
┌────────────────────────────────────────────────────────┐
│ Edge Country Detection (Cloudflare CF-IPCountry Header) │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
             Is Country in Restricted List?
             (India, US, Canada, Iran, etc.)
            ┌─────────────┴─────────────┐
            │ YES                       │ NO
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────────────────┐
│ Hide/Disable Broker   │   │ Display XM Referral Link +        │
│ Referral Links; Show  │   │ Affiliate & Risk Disclosures      │
│ Restricted Geo Notice │   └─────────────────┬─────────────────┘
└───────────────────────┘                     │
                                              ▼
                                ┌───────────────────────────┐
                                │ User Requests Manual      │
                                │ Jurisdiction Override     │
                                └─────────────┬─────────────┘
                                              │
                                              ▼
                                ┌───────────────────────────┐
                                │ Geo Self-Declaration      │
                                │ Modal & Verification      │
                                └───────────────────────────┘
```

#### Code Logic Rules:
1. **Primary Geo Detection:** Cloudflare Worker / Vercel Edge request headers (`CF-IPCountry` / `x-real-ip`) with server-side MaxMind GeoIP2 fallback.
2. **UI Link Behavior for Blocked Jurisdictions (e.g., India):**
   * The referral button/card state changes from `Open XM Account` to a disabled or educational state: *"Broker registration is unavailable in your jurisdiction."*
   * Absolute suppression: The tracking URL is omitted entirely from the server-rendered HTML/JSON response for blocked IPs to prevent web scraping or link extraction.
3. **Manual Override & Self-Declaration Modal:**
   * If a user triggers a location change (e.g., user is traveling or using a VPN), they must complete a **Jurisdiction Self-Declaration Form**.
   * *Override Safeguard:* If the user's detected IP originates from strict high-risk regulatory zones (India or US), manual override to enable broker link access is **disabled** unless two-factor/document tax residency attestation is provided (for counsel evaluation).
   * *Audit Logging:* Store IP, detected country, user declared country, timestamp, and decision output for compliance auditing.

---

## 3. Risk Warning Text for CFD Promotion

Regulators including the FCA, ESMA, and ASIC require prominent, standardized CFD risk warnings whenever retail derivative platforms or affiliates market CFDs.

### 3.1 Mandatory Broker Figures

* **Broker Published Retail Loss Percentage:** Based on published regulatory disclosures from XM's operating entities, **74.3% of retail investor accounts lose money when trading CFDs with this provider**.
* **Leverage Warning:** CFDs are complex, highly leveraged financial instruments carrying rapid capital loss exposure.

### 3.2 Standardized Risk Warning Text Block (For Counsel Review)

#### Prominent Component / Footer Warning (Ready to Deploy):

> **HIGH RISK INVESTMENT WARNING (For Counsel Review):**  
> Trade Responsibly: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. **74.3% of retail investor accounts lose money when trading CFDs with this provider.** You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.  
> 
> FORTREX provides non-custodial skill competition scoring and performance tracking only. FORTREX is not a registered broker-dealer, financial advisor, or asset manager, and does not provide investment, financial, or tax advice. REX points have no cash value.

---

## 4. Contest-Law Considerations for Skill Contests

Requiring users to open a broker account via a specific affiliate link as a prerequisite to enter a skill competition raises key legal considerations regarding contest, lottery, gambling, and inducement regulations across global jurisdictions.

### 4.1 Legal Risk Framework (For Counsel Review)

```
Illegal Lottery / Gambling Triad:
[ Prize ] + [ Chance ] + [ Consideration ]
```

1. **Element 1: Chance vs. Skill:**
   * FORTREX competitions evaluate trading metrics (e.g., ROI, risk-adjusted returns, drawdown management) over specified trading periods.
   * *Assessment:* Trading competitions are predominantly skill-based. However, certain jurisdictions (e.g., US state laws, Germany, Australia) apply strict tests on whether financial market volatility introduces sufficient "chance" to trigger gambling or sweepstakes laws.
2. **Element 2: Consideration (Account Creation Requirement):**
   * Requiring a user to open an account with a third-party broker (XM) and potentially deposit funds to trade can be construed as direct or indirect **consideration**.
   * *REX Points Impact:* The fact that FORTREX rewards users with **REX points (which have no cash value)** helps mitigate classic illegal gambling claims (no cash prize). However, if REX points are later tied to leaderboards with monetary grants, token drops, or physical rewards, the consideration-prize link re-emerges.
3. **Element 3: Financial Promotion & Inducement Rules (FCA / ESMA / ASIC):**
   * European (FCA/ESMA) and Australian (ASIC) regulators strictly restrict trading bonuses and promotional inducements that encourage retail clients to open CFD accounts or trade excessively.
   * Linking competition entry directly to account opening must be evaluated under FCA Conduct of Business Sourcebook (COBS) inducement rules.

### 4.2 Flags & Action Items for Counsel Review
* **Alternative Method of Entry (AMOE):** Determine if a free, non-broker AMOE (e.g., paper/demo account entry option) is legally necessary in jurisdictions like the US, UK, or EU to eliminate the "consideration" element.
* **Terms of Service Protections:** Explicitly state in the Contest Rules that REX points are non-transferable, non-redeemable for cash, and carry zero monetary value.
* **Jurisdictional Licensing Check:** Confirm whether hosting skill competitions based on live broker trading accounts requires local gaming/contest permits in key operating territories (e.g., UK, Singapore, UAE, Brazil).

---

## 5. Post-Launch SEO & GEO Plan (Post-Nov 7, 2026)

Until **November 7, 2026**, all web pages must retain `<meta name="robots" content="noindex, nofollow">` directives. Below is the post-launch discoverability roadmap for traditional Search Engine Optimization (SEO) and Generative Engine Optimization (GEO).

### 5.1 Site Architecture & Page List

| URL Path | Page Purpose | Indexing Status |
| :--- | :--- | :--- |
| `/` | Brand Homepage & Global Overview | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/competitions` | Live & Upcoming Skill Contests Hub | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/competitions/[id]` | Individual Contest Rules & Leaderboard | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/how-it-works` | Non-Custodial Scoring & REX Points Explained | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/learn/mt5-skill-trading` | Educational Guide: MT5 Competition Metrics | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/brokers/xm-mt5-setup` | Guide: Linking XM MT5 to FORTREX | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/legal/terms` | Terms of Service & Contest Rules | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |
| `/legal/affiliate-disclosure` | Dedicated FTC/FCA Affiliate & Risk Page | `noindex` (Pre-Nov 7) ➔ `index` (Post-Nov 7) |

### 5.2 Schema Types (JSON-LD Structured Data)

Post-launch pages will inject schema markup to maximize rich snippets in Google and AI answer engines:

1. **`Organization` Schema (Homepage):**
   * Defines FORTREX as a non-custodial trading competition technology platform.
2. **`Event` / `SportsEvent` Schema (`/competitions/[id]`):**
   * Represents skill-based trading competitions with start/end dates, entry conditions, and non-cash point awards.
3. **`FAQPage` Schema (`/how-it-works`, `/brokers/xm-mt5-setup`):**
   * Answers queries regarding REX points value (0 cash value), MT5 integration, and eligibility.
4. **`WebPage` / `AboutPage` Schema:**
   * Includes explicit `publishingPrinciples` linking to Risk and Affiliate Disclosures.

### 5.3 Target Keyword Strategy

* **Primary High-Intent Queries:**
  * *"MT5 skill trading competition"*
  * *"non-custodial forex trading contest"*
  * *"global MT5 trading tournament"*
  * *"skill based trading leaderboard"*
* **Secondary / Informational Queries:**
  * *"how to link MT5 account to trading competition"*
  * *"REX points trading leaderboard rules"*
  * *"XM MT5 trading contest entry"*

### 5.4 GEO (Generative Engine Optimization) & `llms.txt` Strategy

To ensure AI search engines (Perplexity, ChatGPT Search, Claude, Gemini) accurately describe FORTREX post-launch without hallucinating financial advice or custodial claims:

* **File Deployment:** Create `/llms.txt` and `/llms-full.txt` at the root directory upon launch.
* **`llms.txt` Content Specifications:**
  * Define FORTREX explicitly as a *non-custodial skill competition platform*.
  * Clarify that FORTREX does not hold funds, manage portfolios, or execute trades.
  * State clearly: *"REX points are non-monetary gamification tokens with no cash value."*
  * Provide structured summaries of risk warnings and affiliate relationships with XM.

### 5.5 Hreflang & Internationalization Setup

To serve localized content while respecting geo-blocking rules:

* **Locales Supported:** `en-US` (Global English / Default non-restricted), `en-GB`, `es-ES`, `pt-BR`, `id-ID`, `vi-VN`, `th-TH`, `ar-AE`.
* **Restricted Locales (e.g., India `en-IN`):**
  * Omit `en-IN` hreflang tags for broker setup pages, or route `x-default` to a compliant educational page that strips all broker referral links.
* **Example Hreflang Tag Set:**
  ```html
  <link rel="alternate" hreflang="en" href="https://fortrex.com/how-it-works" />
  <link rel="alternate" hreflang="es" href="https://fortrex.com/es/how-it-works" />
  <link rel="alternate" hreflang="pt" href="https://fortrex.com/pt/how-it-works" />
  <link rel="alternate" hreflang="x-default" href="https://fortrex.com/how-it-works" />
  ```

---

## 6. Summary Checklist for Counsel Review

- [ ] Approve Affiliate Disclosure wording for FTC, ASA, FCA/ESMA, and ASIC compliance.
- [ ] Review India (FEMA/RBI) and US geo-blocking logic and manual override attestation framework.
- [ ] Confirm CFD risk warning percentage (74.3%) and placement on referral touchpoints.
- [ ] Evaluate contest-law classification (Skill vs Chance vs Consideration) and requirement for Alternative Method of Entry (AMOE).
- [ ] Authorize removal of `noindex` directives prior to Nov 7, 2026 launch.

*End of Brief — For Legal Counsel Review.*
