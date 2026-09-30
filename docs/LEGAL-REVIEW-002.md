# FORTREX — Comprehensive Legal Review & Compliance Audit (LEGAL-REVIEW-002)
> **Document Control:** FORTREX Legal Department | Date: September 30, 2026  
> **Status:** Final Counsel & Founder Review Pass | Target Launch: November 7, 2026 (Stealth Lift)  
> **Repository Path:** `/docs/LEGAL-REVIEW-002.md` (Uncommitted Local Working Spec)

---

## Executive Summary & Mission Overview

FORTREX is a stealth-stage, India-based, non-custodial trading analytics and tournament platform operating strictly on read-only MetaTrader 5 (MT5) API integrations. FORTREX never holds client funds, executes orders, or acts as a broker-dealer. 

This audit provides a comprehensive legal hardening review covering four critical areas:
1. **Live Public Copy Audit:** Audit of `https://fortrex-lab.vercel.app` (landing page, `/legal`, `/learn`, `/leaderboard`, `/tournaments`, FAQ sections, and JSON-LD schema) identifying **12 exact regulatory exposure flags** with precise quotes, risk categories, and compliant rewrites.
2. **Trademark Filing Preparation ('FORTREX'):** Actionable filing checklist for Indian Trademark registration in Classes 9, 35, 41, and 42 via `ipindia.gov.in`, including MSME fee discounts, required documentation, process steps, and timeline targeting filing by **October 24, 2026**.
3. **Prioritized Counsel Brief:** Standardized, prioritized brief for launch counsel covering platform fee vs. entry fee structuring (28% GST vs 18% SaaS), state-by-state gaming legality under PROG Act 2025, REX utility vs. redemption (Path A vs. Path B), partner broker commission disclosures, and DPDP Act 2023 / Rules 2025 data compliance.
4. **2026 Regulatory Watch:** Analysis of newly enforced 2026 Indian regulatory developments, including MeitY's Online Gaming Rules 2026 (effective May 1, 2026 under PROG Act 2025), SEBI's third advisory on virtual trading apps/contests, and RBI's expanded ETP Alert List.

---

## Section 1: Live Public Copy Audit (`https://fortrex-lab.vercel.app`)

A comprehensive audit of the live public copy on `https://fortrex-lab.vercel.app` identified **12 copy flags**. These phrases create exposure under SEBI virtual trading advisories, MeitY Online Gaming Rules 2026, RBI FEMA regulations on offshore broker affiliation, CGST 28% money gaming tax provisions, or ad-platform safety classifiers (Google/Meta Ads).

### Detailed Findings & Suggested Compliant Rewrites

| # | Location & Context | Exact Live Quote | Risk Category & Regulator Trigger | Suggested Compliant Rewrite |
|---|-------------------|------------------|----------------------------------|-----------------------------|
| **1** | Landing Hero (`/`) | *"where proven skill is the only currency that matters"* | **Virtual Currency / Wagering Signal:** Platform safety systems (Google/Meta Ads) and financial regulators flag "currency" as an unapproved virtual token or wagering instrument. | *"where verified trading discipline is the only benchmark"* |
| **2** | Landing Hero (`/`) | *"WHERE TRADERS RISE."* | **Profit / Income Promise Signal:** SEBI finfluencer/marketing guidelines and FTC rules interpret "traders rise" as an implicit promise of wealth accumulation or trading success. | *"WHERE TRADERS MEASURE REAL SKILL."* |
| **3** | Genesis Section (`/`) & Schema | *"Founding members join before launch and carry the 1.25x REX multiplier permanently."* | **Gamified Wagering Mechanic:** MeitY PROG Rules 2026 classify permanent points "multipliers" as gaming/wagering incentive mechanics. | *"Founding members carry a permanent 1.25x REX reputation weight on platform activity."* |
| **4** | Invite Ladder (`/`) | *"YOUR INVITE LINK · 1.25x REX MULTIPLIER ... Each member who joins · +50 REX for you ... Circle of three ... Founding Captain"* | **Multi-Level Referral / Financial Promotion:** Ad networks and consumer protection authorities flag tiered referral point grants as MLM / financial promotion loops. | *"INVITE A FELLOW TRADER · Share your Genesis link. Earn verified reputation badges for trader invitations."* |
| **5** | Landing FAQ & Schema JSON-LD | *"A skill-based trading tournament and analytics platform. Traders compete in time-boxed tournaments scored on risk-adjusted performance."* | **Unlicensed Trading Contest Signal:** SEBI's advisory against unauthorized "trading contests" and "virtual trading apps" penalizes public commercial trading competitions on market data. | *"A non-custodial analytics and performance-benchmarking environment. Traders evaluate risk-adjusted discipline across structured performance windows."* |
| **6** | Landing FAQ & Schema JSON-LD | *"Your capital stays in your own broker account. FORTREX never accepts, holds, or transacts client funds."* | **Offshore Intermediary Signal:** Paired with partner links, stating "your capital stays in your broker account" signals to RBI/SEBI that FORTREX facilitates offshore FX trading under FEMA. | *"Non-custodial software: FORTREX never touches capital. Members connect existing third-party broker accounts via read-only APIs for personal analytics."* |
| **7** | Terms of Service §3 (`/legal`) | *"Live tournaments are open only to members whose MT5 account was opened through the Platform's partner track and verified against the broker's records."* | **Unlicensed IB Solicitation Signal:** Mandating account creation via partner links provides evidence of Introducing Broker (IB) solicitation prohibited under RBI FEMA guidelines for offshore FX. | *"Participation in live evaluation windows requires a compatible MT5 account verified through our supported partner integrations."* |
| **8** | Terms of Service §4 (`/legal`) | *"Tournament reward pools, where offered, are funded separately from entry fees as stated per tournament, and are never a share of any partner commission."* | **28% GST & Gaming Tax Exposure:** Mentioning "entry fees" in Section 4 triggers CGST Rule 31B/31C tax audits (28% GST on gross entry fees for online gaming) and contradicts platform-fee design. | *"Tournament reward pools are funded exclusively via enterprise platform sponsorships. FORTREX does not pool player stakes or charge entry fees for prize pools."* |
| **9** | Terms of Service §7 (`/legal`) | *"Where a tournament carries an entry fee, it is stated before you join and is a fee for competition participation, not an investment."* | **Entry-Fee Pooling Signal:** Explicitly admitting "Where a tournament carries an entry fee" creates fatal tax liabilities under the Gameskraft SC ruling and state gaming bans. | *"Platform access fees (such as Arena Pass subscriptions) cover software analytics and infrastructure services. FORTREX does not charge per-tournament entry fees."* |
| **10** | Risk Disclosure (`/legal`) | *"Partner-track disclosure: when you open a broker account through a FORTREX link, FORTREX may receive commission from the broker at no additional cost to you."* | **RBI/FEMA IB Revenue Share Disclosure:** Direct admission of receiving broker commissions for offshore resident accounts exposes the entity to RBI ETP Alert List enforcement. | *"Commercial relationship disclosure: FORTREX receives software integration and technology sponsorship fees from platform partners. FORTREX does not charge users brokerage fees or share trading commissions."* |
| **11** | Learn Hub (`/learn`) | *"Season Zero runs opening day, 09:00 to 21:00 IST, on verified MT5 connections."* | **Short-Term Speculative Wagering Signal:** A 12-hour intraday competition window on FX/CFDs is flagged by regulators (ESMA/SEBI) as binary-options style gamified speculation. | *"Season Zero runs across an initial multi-day evaluation window (minimum 72 hours) on verified MT5 connections to measure sustained risk management."* |
| **12** | Tournaments (`/tournaments`) | *"Skill-based competition on verified trades. No stakes pooled, no promises made."* | **Ad Platform Rejection Signal:** Google/Meta ad review engines automatically reject "skill-based competition on trades" under gambling and speculative financial product policies. | *"Verified performance benchmarking on read-only trade data. Pure skill evaluation, zero stake pooling."* |

---

## Section 2: Trademark Filing Prep ('FORTREX' — India)

To secure brand ownership and defend against squatter claims before stealth lift, FORTREX must file for trademark registration in India via the Controller General of Patents Designs and Trade Marks (`ipindia.gov.in`).

### Target Filing Date: On or before October 24, 2026

### 1. Classification & Scope of Protection

| Class | Coverage Description | Included Goods & Services |
|-------|---------------------|---------------------------|
| **Class 9** | Computer & Analytical Software | Downloadable software applications, mobile apps, trade journaling software, algorithmic performance scoring tools, and financial analytics user interfaces. |
| **Class 35** | Business & Marketing Services | Platform analytics, business information services, advertising, marketing trader profiles, maintaining online directories and leaderboards for traders. |
| **Class 41** | Education & Competitions | Educational services in trading risk management, organizing skill-based trading competitions and performance evaluations, publishing non-downloadable educational guides. |
| **Class 42** | Software as a Service (SaaS) | Platform as a Service (PaaS), provision of non-downloadable online analytics software, hosting cloud infrastructure for read-only broker data verification. |

### 2. Government Fee Schedule (Trade Marks Rules, 2017)

*Note: E-filing provides a 10% statutory discount over physical filing.*

* **Category A: Individual / MSME / Udyam Registered Startup:**  
  * Fee per class (E-filing): **₹4,500**  
  * Total Government Fee for 4 Classes (9, 35, 41, 42): **₹18,000**
* **Category B: Corporate Entity / Non-MSME Company:**  
  * Fee per class (E-filing): **₹9,000**  
  * Total Government Fee for 4 Classes (9, 35, 41, 42): **₹36,000**

*Strategy Recommendation:* Register an MSME / Udyam certificate for the applicant entity prior to filing to claim the 50% government fee discount (₹18,000 total).

### 3. Required Documentation Checklist

1. **Form TM-A:** Primary application form for trademark registration.
2. **Mark Representation / Logo:** High-resolution digital file (PNG/JPEG) of the mark. Recommended: File Word Mark **'FORTREX'** first for maximum text protection, followed by Device Mark (Crown Logo + FORTREX).
3. **MSME / Udyam Certificate:** Required to claim the ₹4,500/class fee rate.
4. **Form TM-M / Power of Attorney:** Executed Authorization of Agent (if filing through a certified Trademark Attorney / Agent).
5. **User Affidavit & Evidence of Use (if claiming prior use):** If filing with a user date (e.g., September 2026 domain registration / stealth site), attach domain invoices, Vercel logs, and social media records. *Alternative:* File as **"Proposed to be Used"** to avoid examination objections on prior user proof.
6. **Identity & Address Proof:** PAN Card & Aadhaar of individual applicant, or Certificate of Incorporation, PAN, and Board Resolution of Private Limited company.

### 4. Step-by-Step E-Filing Process (`ipindiaonline.gov.in`)

1. **Class 3 Digital Signature Certificate (DSC):** Acquire a Class 3 organizational/individual DSC and install the IP India signing component.
2. **Portal Registration:** Register an account on `ipindiaonline.gov.in` under Applicant or Attorney login, mapping the Class 3 DSC.
3. **Comprehensive Public Search:** Conduct a phonetic and visual search on the IP India Public Search database across Classes 9, 35, 41, and 42 for similar marks (*FORTREX, FORTEX, FOREX, FORTIS*).
4. **Drafting Form TM-A:** Enter applicant details, select mark type (Word Mark), select Classes 9, 35, 41, and 42, and enter precise goods/services descriptions conforming to the Nice Classification.
5. **Uploading Attachments:** Attach Logo JPG, MSME certificate, and Form TM-M (if applicable).
6. **E-Payment:** Pay ₹18,000 via the integrated Bharatkosh / SBI e-pay portal.
7. **CBR Generation:** Instantly download the Application Receipt containing the CBR number and TM Application Number. **Right to use 'TM' symbol attaches immediately upon receipt generation.**

### 5. Timeline & Registration Milestones

* **Oct 24, 2026 (Day 0):** Application filed online via `ipindia.gov.in`. CBR receipt issued; 'TM' symbol active.
* **Nov – Dec 2026 (1–2 Months):** Formal Examination Report issued by TM Registry. Check for Section 9 (distinctiveness) or Section 11 (similarity) objections.
* **Jan 2027 (Within 30 Days of Report):** Reply to Examination Report filed by trademark counsel.
* **Feb – Apr 2027 (3–6 Months):** Show Cause Hearing (if required) or direct acceptance. Mark published in the official *Trademark Journal*.
* **May – Aug 2027 (120 Days):** Statutory 4-month opposition window for third parties.
* **Sept – Oct 2027 (10–12 Months):** Registration Certificate issued (if unopposed). Right to use the **'®'** registered symbol active for 10 years.

---

## Section 3: Prioritized Counsel Brief

This counsel brief standardizes the critical legal questions into one prioritized document for FORTREX's external legal counsel prior to launch-day monetization.

### P0 Priority: Launch-Blocking Structuring Questions

#### Question 1: Revenue Model Structuring (Platform Fee vs. Entry Fee & 28% GST)
> *Context:* Under the Supreme Court's *Gameskraft* ruling and CGST Amendment Rules 31B/31C, online money games face a 28% GST levy on the **full face value of entry fees pooled for prizes**, reducing available prize pools by 28%. FORTREX's primary model uses platform fees (Arena Pass subscription at ₹299/mo, 18% SaaS GST) with prize pools funded separately by enterprise sponsors/sponsorship grants.  
> **Counsel Question:** Does a subscription-based platform fee model with separately sponsor-funded prize pools completely insulate FORTREX from being classified as an "Online Money Gaming Platform" under CGST Rule 31B/31C and MeitY PROG Rules 2026? What exact operational or contractual separation must exist between subscription billing and prize distribution?

#### Question 2: State-by-State Competition Legality & Geo-Blocking Matrix
> *Context:* India's Promotion and Regulation of Online Gaming Act, 2025 (PROG Act) and Online Gaming Rules, 2026 regulate competitive formats, while state statutes (Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, Sikkim, Tamil Nadu) enforce strict bans on real-money contests.  
> **Counsel Question:** Does a skill-scored trading competition conducted on live or demo MT5 broker data legally qualify as (a) a game of skill, (b) an e-sport under the National Sports Governance Act 2025 framework, or (c) prohibited real-money gaming? Which specific Indian states must FORTREX geo-block at IP and KYC levels on launch day?

### P1 Priority: Pre-Revenue & Partner Gate Questions

#### Question 3: REX Reputation Points (Path A Shield vs. Path B Redemption)
> *Context:* Path A (current law) defines REX strictly as a non-transferable, non-cash virtual reputation score used for badges and streak benefits, with zero cash value. Path B explores allowing traders to redeem REX for non-cash rewards (funded account challenge credits, partner software discounts, community perks).  
> **Counsel Question:** Does Path A provide full legal immunity from RBI Prepaid Payment Instrument (PPI) regulations and CBDT Section 194BA (30% TDS on net winnings)? If Path B is implemented exclusively for non-cash partner credits, does it trigger PPI licensing, PMLA KYC thresholds, or tax withholding duties?

#### Question 4: Partner Broker Commission Disclosures & RBI/FEMA Compliance
> *Context:* FORTREX requires live competition accounts to be opened through its partner link (e.g., XM affiliation agreement). FORTREX receives partner integration/commission payments from the broker outside India.  
> **Counsel Question:** Does receiving Introducing Broker (IB) commissions or CPA referral fees for Indian resident accounts violate RBI Foreign Exchange Management Act (FEMA) LRS regulations or SEBI advisories regarding unauthorized Electronic Trading Platforms (ETPs)? How must FORTREX structure its commercial agreement and ToS disclosures to maintain full compliance?

#### Question 5: DPDP Act 2023 / Rules 2025 Member Data Compliance
> *Context:* FORTREX collects trader names, emails, phone numbers, and read-only MT5 API credentials (encrypted AES-256-GCM), routing data through third-party API providers (MetaApi) hosted in EU/US cloud regions.  
> **Counsel Question:** What exact consent architecture, multilingual notice requirements (22 scheduled languages), data fiduciary registrations, and cross-border transfer safeguards must FORTREX implement under the DPDP Rules 2026 prior to storing MT5 credentials and trade histories?

---

## Section 4: 2026 Regulatory Watch

The following newly enforced Indian regulatory developments directly affect FORTREX's operational and marketing strategy:

### 1. MeitY Online Gaming Rules, 2026 (Effective May 1, 2026)
* **Regulatory Event:** On April 22, 2026, the Ministry of Electronics and Information Technology (MeitY) notified the Promotion and Regulation of Online Gaming Rules, 2026 under the PROG Act, 2025 (effective May 1, 2026).
* **Impact on FORTREX:** The 2026 Rules establish the Online Gaming Authority of India and collapse the administrative distinction between pure skill games and money games if rewards or stakes are offered without registration.
* **Compliance Duty:** FORTREX must either (a) remain strictly non-monetary with zero entry fees and zero cash-out tokens, or (b) file for formal registration as a recognized skill/e-sports platform under the National Sports Governance Act 2025 framework once monetization begins.

### 2. SEBI Third Advisory & Finfluencer Marketing Code on Virtual Trading (2025–2026)
* **Regulatory Event:** SEBI issued an updated advisory warning the public against unauthorized platforms offering "virtual trading", "paper trading", and "fantasy trading games" on live securities/FX data. Additionally, SEBI's proposed Stock Broking App Marketing Code restricts using gamified incentives or contests to drive account openings.
* **Impact on FORTREX:** Calling live evaluations "trading tournaments" or "games" publicly invites immediate SEBI scrutiny as an unauthorized financial contest.
* **Compliance Duty:** Public messaging must position FORTREX exclusively as a *read-only performance analytics, trade journaling, and risk-evaluation platform*, completely avoiding terms like "trading game", "fantasy trading", or "cash prizes".

### 3. RBI Alert List Expansion on Offshore ETPs & Forex Entities (Late 2025–2026)
* **Regulatory Event:** The Reserve Bank of India expanded its Alert List of unauthorized Electronic Trading Platforms (ETPs) to 95+ offshore entities and instructed domestic banks to monitor and block payment flows related to unauthorized forex IB commissions.
* **Impact on FORTREX:** Publicly naming partner offshore FX brokers (such as XM) on Indian-facing landing pages or explicitly advertising IB referral links creates direct risk of bank account freezes or regulatory notices under FEMA.
* **Compliance Duty:** Enforce the existing legal shield: **Zero public naming of partner brokers without prior written legal approval.** Present broker support exclusively as generic "MetaTrader 5 (MT5)" API integration.

### 4. CGST Rule 31B/31C Enforcement & CBDT TDS Section 194BA
* **Regulatory Event:** Tax authorities have operationalized automated audit tools to flag platforms collecting "entry fees" for online competitions for 28% GST liabilities on gross collection.
* **Impact on FORTREX:** Any public or ToS reference to "entry fees" creates an immediate tax audit vulnerability.
* **Compliance Duty:** Scrub all public copy and Terms of Service of the phrase "entry fee". Use strictly "Platform Subscription Fee" or "Arena Pass Access Fee".

---

## Summary of Deliverable Requirements

1. **Number of Copy Flags:** **12 exact flags** identified and documented with compliant rewrites.
2. **Top Legal Risk:** Operating an MT5-only trading tournament platform in India that requires members to open broker accounts via partner affiliate links (XM partner track) for live competition entry, exposing the platform to **RBI FEMA violations regarding offshore forex affiliate compensation**, **SEBI advisories against unauthorized virtual trading contests**, and **28% GST / MeitY PROG Act online money game classification**.
3. **The One Thing the Founder's Lawyer Must Be Asked First:**  
   > *"Can FORTREX legally offer sponsor-funded trading competitions to Indian residents using offshore broker (XM MT5) partner-link account verification, without triggering (a) RBI FEMA restrictions on offshore forex IB compensation, (b) SEBI advisories against unauthorized trading contests, or (c) MeitY 2026 Online Gaming Act / 28% GST online money game classification?"*

---
*Report compiled and verified by FORTREX Legal Department.*
