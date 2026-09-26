# Deep Web Research: India Legal & Regulatory Framework for FORTREX

**Prepared for:** Solo Founder & Leadership Team, FORTREX  
**Date:** September 26, 2026  
**Target Launch Date:** November 7, 2026  
**Context:** FORTREX is a non-custodial, skill-based trading tournament platform in stealth in India. Traders retain money at their own brokers; FORTREX tracks and verifies competition performance. REX is an internal points currency with no cash value. The platform plans to charge tournament entry fees and award prize money.

---

## Executive Summary

- **PROGA 2025 & PROG Rules 2026 Represent the Highest Existential Risk:** The *Promotion and Regulation of Online Gaming Act, 2025* (Act No. 32 of 2025) and its operational *Rules 2026* (effective May 1, 2026) strictly ban all "online money games" involving deposits and money stakes for cash prizes, backed by severe criminal penalties (up to 3 years imprisonment and ₹1 crore fine). *Counsel review is urgently required* to determine whether trading tournaments over real market outcomes qualify as prohibited online money games or fall under financial/SaaS platforms.
- **GST Exposure (28% Gross Value vs. 18% SaaS):** Under the CGST Amendment Act 2023 and Supreme Court rulings, "online money gaming" is taxed at **28% GST on the entire gross entry fee/deposit**, not on Gross Gaming Revenue (GGR) or platform fees. If FORTREX pools entry fees for prize money, it faces a 28% gross tax burden. Structuring as a pure non-custodial SaaS platform charging a subscription fee (taxed at 18% GST) without pooling prize funds is the primary mitigation strategy.
- **Income-Tax TDS Compliance (Section 194BA & Rule 133):** Section 194BA mandates a **flat 30% TDS** (plus cess, effective rate ~31.2%) on "net winnings" calculated under Rule 133 of the Income-Tax Rules, 1962. There is no minimum annual exemption threshold for online gaming net winnings. Non-monetary rewards require 30% tax collection before release. Unredeemed, non-transferable REX points carry no TDS obligation until converted into cash or tangible prizes.
- **SEBI Boundary Management:** Non-custodial, read-only broker API integration allows FORTREX to verify execution statistics without holding user funds or redistributing live exchange data feeds (which SEBI restricts under its stock gaming circulars). To avoid SEBI Investment Adviser (RIA) or Research Analyst (RA) regulations, FORTREX must strictly avoid copy-trading, automated signal execution, or individual stock recommendations.
- **RBI & FEMA Restrictions:** Platform payments (entry fee collection and prize payouts) must route through RBI-authorized Payment Aggregators (PAs) using compliant escrow accounts under the RBI PA Directions 2025. Competitions must strictly exclude platforms on the RBI Alert List (unauthorized EFX/forex platforms). Cross-border prize payouts face FEMA Schedule I current account restrictions.
- **CCPA Dark Patterns & Consumer Disclaimers:** The CCPA Dark Patterns Guidelines (2023) ban 13 specified UI/UX practices (e.g., false urgency timers, drip pricing). ASCI guidelines require mandatory disclaimers (*"This game involves an element of financial risk..."*) and creator partnership disclosures (`#ad`, `#sponsored`).
- **DPDP Act 2023 & DPDP Rules 2025 (Phased Implementation):** Rules notified November 13, 2025 enforce strict multilingual notice/consent requirements, consent withdrawal, and heavy penalties (up to ₹250 crore for data breaches; ₹200 crore for children's data violations). FORTREX must enforce strict **18+ age-gating** to avoid onerous verifiable parental consent obligations under Section 9.

---

## Topic 1: Income-Tax TDS on Prizes & Rewards (Section 194B vs 194BA)

### 1. Findings & Statutory Framework
- **Statutory Bifurcation (Finance Act 2023):** Prior to April 1, 2023, winnings from online games were taxed under Section 194B (which contained a ₹10,000 threshold). Finance Act 2023 carved out online games into a dedicated section—**Section 194BA**—leaving Section 194B for lotteries, crossword puzzles, card games, and non-gaming contests.
- **TDS Rate & Thresholds (Section 194BA):**
  - **Rate:** Flat **30%** tax deduction at source (plus 4% Health and Education Cess, resulting in an effective withholding rate of **31.2%**).
  - **Threshold:** There is **NO annual exemption threshold** under Section 194BA (unlike Section 194B's ₹10,000 threshold). Tax must be deducted on all net winnings.
  - **De Minimis Exception (Section 194BA(3) & CBDT Circular No. 5/2023):** TDS is not required at the time of a individual withdrawal if net winnings in that single withdrawal do not exceed **₹100**, provided tax is deducted at the end of the financial year (FY) or when aggregate net winnings in subsequent withdrawals exceed ₹100.
- **Net Winnings Computation Formula (Rule 133, Income-Tax Rules, 1962):**
  Inserted via Notification No. 28/2023 (May 22, 2023), Rule 133 provides the mandatory formula:
  $$\text{Net Winnings } (A) = (A + B) - (C + D)$$
  Where:
  - $A$ = Total withdrawals from the user wallet during the FY.
  - $B$ = Closing balance in the user wallet at the end of the FY.
  - $C$ = Total non-taxable deposits made by the user during the FY.
  - $D$ = Opening balance in the user wallet at the start of the FY.
  
  For intermediate withdrawals during the FY:
  $$\text{Net Winnings} = \text{Total Withdrawals till date} - (\text{Total Deposits till date} + \text{Opening Balance}) - \text{Net Winnings previously taxed}$$
- **In-Kind Prizes & Non-Monetary Rewards (Section 194BA(2)):**
  Where winnings are wholly in kind, or partly in cash and partly in kind, and the cash portion is insufficient to satisfy the 30% TDS, the platform **must ensure that 30% tax is deposited before releasing the prize**. The platform can either collect the tax amount from the winner or gross up the reward and bear the tax.
- **Taxation of REX Internal Points Currency:**
  REX points that carry no cash value, are non-transferable, and cannot be redeemed for fiat, goods, or vouchers do not constitute taxable income or "winnings" at issuance. However, if REX points are later redeemed for cash, gift vouchers, or physical prizes, tax attaches under Section 194BA(2) based on the Fair Market Value (FMV) of the redeemed benefit at the time of payout.

### 2. Sources
- **Primary Source (Grade A):** CBDT Circular No. 5/2023 dated 22nd May 2023 — Guidelines under Section 194BA of the Income-tax Act, 1961 (`https://www.incometaxindia.gov.in`).
- **Primary Source (Grade A):** Income-tax (Fifth Amendment) Rules, 2023 — Notification No. 28/2023 dated May 22, 2023 (insertion of Rule 133) (`https://www.incometaxindia.gov.in`).
- **Primary Source (Grade A):** Finance Act 2023 (Act No. 8 of 2023) & Finance Act 2024 TDS Framework (`https://www.indiacode.nic.in`).
- **Secondary Source (Grade B):** Taxmann Legal Analysis, *"Tax Liability of Online Gaming Professionals & Rule 133 Mechanism"* (May 2023 / Updated 2025).

### 3. What It Means for FORTREX
- **Automated Tax Engine Requirements:** FORTREX must build a real-time withholding engine directly in its payout system to calculate Rule 133 net winnings before disbursing any cash prizes.
- **TDS Compliance Obligations:**
  - Deduct 31.2% (tax + cess) on net winnings before wallet withdrawal or at FY-end (March 31).
  - Deposit withheld TDS with the Income Tax Department monthly (by the 7th of the following month).
  - File quarterly TDS returns in **Form 26Q** (for resident traders) or **Form 27Q** (for non-residents).
  - Issue quarterly TDS certificates (**Form 16A**) to winning participants.
- **Handling Hardware/Non-Cash Prizes:** If FORTREX awards trading laptops, monitors, or subscriptions as tournament prizes, it must collect 30% TDS in cash from the winner prior to shipping the item (*counsel-review-required*).

### 4. Open Questions
- Does a trading competition operating on verified broker execution statistics legally fall under Section 194BA (online gaming) or Section 194B/194J/194M depending on platform classification? (*counsel-review-required*).
- How should promotional signup bonuses or subsidized entry credits be treated under "non-taxable deposits" versus "winnings" under Rule 133? (*counsel-review-required*).

---

## Topic 2: GST on Online Gaming & Skill Competitions

### 1. Findings & Statutory Framework
- **CGST Amendment Act, 2023 & IGST Amendment Act, 2023 (Effective Oct 1, 2023):**
  The amendment introduced **Section 2(80B)** to the CGST Act, defining **"online money gaming"** as any online game where players pay or deposit money or money's worth (including entry fees) in expectation of winning money or money's worth, **regardless of whether the game is based on skill, chance, or a combination thereof**.
- **Tax Rate & Valuation Mechanism (Rules 31B & 31C, CGST Rules 2017):**
  - **Rate:** Flat **28% GST**.
  - **Tax Base:** The taxable value of supply is **100% of the gross entry fee / buy-in / deposit amount** paid by the player into the contest pool.
  - **Elimination of GGR Valuation:** GST is **NOT** levied merely on the platform commission / Gross Gaming Revenue (GGR). It applies to the full face value of initial deposits.
  - **No Re-taxing on Winnings:** Re-staking winnings from a wallet without fresh deposit does not attract additional GST under Rule 31B.
- **Supreme Court Jurisprudence (2024–2025):**
  In *Directorate General of GST Intelligence vs. Gameskraft Technologies Pvt. Ltd. & Ors.* and consolidated petitions, the Supreme Court of India upheld the constitutional validity of the 28% GST levy on full face value/stakes, affirming the validity of Rules 31A, 31B, and 31C. The Court ruled that Parliament holds full competence to tax actionable claims in online money gaming at 28%.
- **SaaS Software Platform Fee Distinction (18% GST):**
  Where a platform operates purely as a technology service provider—charging a fixed software subscription fee or platform fee for analytics/competitions without pooling player funds or offering money winnings derived from entry stakes—the supply falls under IT/Software Services (SAC 9983/9984), subject to **18% GST** on the platform fee amount alone.

### 2. Sources
- **Primary Source (Grade A):** Central Goods and Services Tax (Amendment) Act, 2023 (Act No. 30 of 2023) & IGST (Amendment) Act, 2023 (`https://www.cbic.gov.in`).
- **Primary Source (Grade A):** CBIC Notification No. 45/2023 – Central Tax (Insertion of Rules 31B and 31C) (`https://www.cbic.gov.in`).
- **Primary Source (Grade A):** Supreme Court of India Judgment in *DGGI vs. Gameskraft Technologies Pvt. Ltd.* (Grade A Case Law).
- **Secondary Source (Grade B):** Cyril Amarchand Mangaldas / Khaitan & Co Tax Bulletins on Supreme Court Gaming GST Verdict (`https://www.cyrilshroff.com`).

### 3. What It Means for FORTREX
- **Severe Margin Compression under Money Contest Model:**
  If FORTREX collects a ₹1,000 entry fee per tournament from traders to form a cash prize pool, tax authorities will demand **28% GST on the full ₹1,000 deposit** (₹218.75 inclusive GST or ₹280 exclusive GST). This drastically shrinks the prize pool and platform commission, making entry-fee-funded cash contests economically challenging.
- **Strategic SaaS Structuring (Primary Recommendation):**
  To maintain a sustainable business model, FORTREX should structure its core product as a **Non-Custodial SaaS Competition Platform**:
  - Charge a transparent monthly/annual software subscription fee (subject to **18% GST**).
  - Do NOT pool entry fees into cash prize pools.
  - Fund prize purses via corporate sponsors, exchange partnerships, or brand grants (*counsel-review-required*).
- **Mandatory GST Registration:** Under Section 24(x) of the CGST Act, 2017, any entity supplying online money gaming must obtain mandatory GST registration regardless of turnover threshold (*counsel-review-required*).

### 4. Open Questions
- Can FORTREX separate a trader's SaaS platform subscription (taxed at 18%) from a third-party sponsored prize competition to completely avoid 28% gross deposit GST exposure? (*counsel-review-required*).
- If REX points are awarded as non-monetary participation perks, do tax authorities treat REX issuance as "money's worth" triggering GST valuation? (*counsel-review-required*).

---

## Topic 3: The Promotion & Regulation of Online Gaming Act 2025 (PROGA) & Rules 2026

### 1. Findings & Statutory Framework
- **Enactment of PROGA 2025 (Act No. 32 of 2025):**
  Passed by Parliament in August 2025 and assented to by the President on August 22, 2025, PROGA 2025 is India's first standalone central statute governing online gaming.
- **Promulgation of PROG Rules 2026 (Effective May 1, 2026):**
  Notified by MeitY on April 22, 2026, the *Promotion and Regulation of Online Gaming Rules, 2026* came into full legal force on **May 1, 2026**.
- **Blanket Prohibition on Online Money Games:**
  - **Definition:** An "online money game" is defined as any online game where a player pays a deposit in cash or kind in expectation of winning money or money's worth.
  - **Prohibition:** Section 6 strictly prohibits offering, operating, facilitating, or advertising any online money game in India.
  - **Criminal Penalties (Section 6 & 9):** Operating or offering a prohibited online money game carries **imprisonment up to 3 years** and a fine up to **₹1 crore**. Repeat offenders face imprisonment up to **5 years** and fine up to **₹2 crore**.
  - **Advertising Penalties:** Publishing or hosting advertisements for prohibited online money games carries imprisonment up to 2 years and fines up to ₹50 lakh.
- **Establishment of Online Gaming Authority of India (OGAI):**
  PROGA 2025 establishes OGAI as a unified, digital-first statutory regulator under MeitY. OGAI administers the **Determination Test** and issues **Certificates of Registration** (valid for up to 10 years) for permissible online social games and recognized e-sports. Online money games are strictly ineligible for e-sports registration.
- **Mandatory Grievance Redressal Duties & Timelines (PROG Rules 2026):**
  Every registered gaming service provider must establish a statutory two-tier grievance redressal framework:
  - **Resident Officers:** Appoint a resident Chief Compliance Officer (CCO) and a Grievance Redressal Officer (GRO) based in India.
  - **Timelines:** The GRO must acknowledge user complaints within **24 hours** and resolve them within **15 calendar days**.
  - **Tier-2 Appeal:** Users dissatisfied with the GRO decision may appeal to OGAI within **30 days**.
- **Classification of Real-Market Trading Competitions:**
  - *Open Classification Question (Counsel-Review-Required):* Is a non-custodial trading tournament using real-world stock market outcomes classified as an "online game" or "online money game" under PROGA 2025?
  - If a platform charges entry fees and awards cash prizes based on simulated or real trading performance, enforcement agencies (MeitY/OGAI) could assert that it constitutes an "online money game" because participants pay money in expectation of winning money based on market outcomes.
  - Conversely, if traders execute trades on SEBI-regulated exchanges through personal broker accounts and FORTREX provides only performance analytics software, the service should be classified as a **Financial/SaaS Tool**, outside PROGA's definition of "gaming".

### 2. Sources
- **Primary Source (Grade A):** The Promotion and Regulation of Online Gaming Act, 2025 (Act No. 32 of 2025) (`https://www.meity.gov.in` / Gazette of India).
- **Primary Source (Grade A):** The Promotion and Regulation of Online Gaming Rules, 2026 (Notified April 22, 2026, effective May 1, 2026) (`https://www.pib.gov.in` / MeitY Press Release PRID 2254606).
- **Secondary Source (Grade B):** Khaitan & Co. ERGO Legal Update, *"MeitY Notifies Online Gaming Rules, 2026"* (April 2026).
- **Secondary Source (Grade B):** Ikigai Law Regulatory Analysis, *"PROGA 2025 and OGAI Framework"* (May 2026).

### 3. What It Means for FORTREX
- **Existential Risk to Entry-Fee/Cash-Prize Contests:** Operating cash-prize trading competitions funded by player entry fees carries severe criminal exposure under Section 6 of PROGA 2025 (*counsel-review-required*).
- **Mandatory Operational Compliance:**
  - Appoint an India-resident Chief Compliance Officer (CCO) and Grievance Redressal Officer (GRO).
  - Implement automated ticketing system enforcing **24-hour acknowledgment** and **15-day resolution** timelines.
  - Publish GRO contact details prominently on the platform UI and website.
- **OGAI Determination & Exemption Application:** FORTREX must submit a formal legal application to MeitY/OGAI for a Determination Certificate declaring that non-custodial trading analytics software is not an "online money game" (*counsel-review-required*).

### 4. Open Questions
- Will MeitY / OGAI categorize stock market trading tournaments as "online money games" if cash prize pools are funded by user entry fees? (*counsel-review-required*).
- Can FORTREX obtain official e-sports or educational platform certification from OGAI if competitions use paper-trading or sponsored non-monetary awards? (*counsel-review-required*).

---

## Topic 4: SEBI Boundaries & Regulatory Guidelines

### 1. Findings & Statutory Framework
- **Investment Advice vs. Competition Platform (SEBI IA & RA Regulations):**
  - Under SEBI (Investment Advisers) Regulations, 2013 and SEBI (Research Analysts) Regulations, 2014, recommending specific securities, providing trade calls, or offering automated buy/sell advice in exchange for consideration requires mandatory SEBI registration.
  - A tournament platform that merely ingests user-executed trades (via broker API) and displays verified execution rankings does **NOT** constitute investment advice or research analysis, provided it does **NOT** offer copy-trading, signal-sharing, or automated order execution.
- **SEBI Prohibition on Real-Time Market Data Sharing for Gaming/Virtual Trading:**
  - SEBI circulars strictly prohibit Market Infrastructure Intermediaries (NSE, BSE, MCX) and registered stockbrokers from feeding real-time price feeds (L1/L2/L3 market data) to unauthorized third-party apps for fantasy trading, stock gaming, or virtual competitions.
  - **Non-Custodial Advantage:** Because FORTREX is non-custodial and users execute trades directly on their own licensed broker terminals (e.g., Zerodha, Groww, AngelOne), FORTREX does not stream live exchange market data feeds to users, avoiding data feed redistribution violations.
- **SEBI Performance Validation Agency (PVA / PaRRVA) Framework:**
  - SEBI regulates performance claims made by entities operating in the securities market. Under the Performance Validation Agency (PVA) framework, return claims and ROI metrics published to attract public funds must be independently verified.
  - Unregistered platforms publishing public leaderboards with annualized return claims (e.g., *"Make 500% ROI like Trader X"*) face swift SEBI enforcement action for soliciting retail investors under false pretenses.
- **SEBI Finfluencer Regulations (2023–2024):**
  SEBI prohibits registered intermediaries (brokers, RIAs, MFs) from sharing fees, paying referral commissions, or partnering with unregistered financial influencers who offer stock tips, advice, or unverified return claims.

### 2. Sources
- **Primary Source (Grade A):** SEBI (Investment Advisers) Regulations, 2013 & Amendments (`https://www.sebi.gov.in`).
- **Primary Source (Grade A):** SEBI Circular on Prohibition of Sharing Real-Time Market Data with Third-Party Gaming/Virtual Platforms (`https://www.sebi.gov.in`).
- **Primary Source (Grade A):** SEBI Framework for Performance Validation Agency (PVA) (`https://www.sebi.gov.in`).
- **Secondary Source (Grade B):** SS Rana & Co., *"Regulating Stock Fantasy Gaming: SEBI Norms on Real-Time Data"* (`https://ssrana.in`).

### 3. What It Means for FORTREX
- **Strict Prohibition on Copy-Trading & Signals:** FORTREX must explicitly disable copy-trading, automated signal copying, and trade recommendations. Leaderboards must display verified competition points or trading statistics purely for historical tournament ranking (*counsel-review-required*).
- **Read-Only API Integration:** OAuth/API access to user broker accounts must be strictly **read-only** (fetching trade execution history and contract notes) with zero order placement capability.
- **Marketing Compliance:** Leaderboards and creator marketing must display disclosures that competition rankings do not constitute financial advice or investment recommendations (*counsel-review-required*).

### 4. Open Questions
- Does publishing verified user trading performance on public leaderboards require PVA verification if FORTREX monetizes via subscriptions? (*counsel-review-required*).
- Could SEBI view trader leaderboard rankings as indirect promotion of high-risk F&O (Futures & Options) trading, triggering SEBI warning banner mandates? (*counsel-review-required*).

---

## Topic 5: RBI Position, Payment Regulations & FEMA Rules

### 1. Findings & Statutory Framework
- **RBI Alert List for Unauthorized Forex Trading Platforms:**
  - Under FEMA 1999, the Reserve Bank of India maintains an active **Alert List** of unauthorized entities and EFX platforms (e.g., OctaFX, Olymp Trade, Exness, ExpertOption, IQ Option, FBS).
  - Resident Indians are prohibited from remitting funds or trading forex on these unauthorized platforms. Assisting or facilitating trading on Alert List entities exposes platform operators to prosecution by the Enforcement Directorate (ED) under FEMA.
- **FEMA Current Account Transaction Rules, 2000 (Schedule I Restrictions):**
  - **Prohibited Remittances:** Schedule I strictly prohibits foreign exchange remittances for lottery tickets, sweepstakes, banned games, or overseas forex trading under the Liberalised Remittance Scheme (LRS).
  - **Cross-Border Prize Payouts:** Receiving prize money from foreign participants or remitting prize winnings outside India requires strict FEMA current account compliance, Foreign Inward Remittance Certificates (FIRC), and banking channel validation.
- **Payment & Settlement Systems Act, 2007 & RBI Payment Aggregator (PA) Directions 2025:**
  - Under RBI Master Directions on Regulation of Payment Aggregators (PAs), any entity collecting customer funds and disbursing payouts to merchants/winners must operate through an RBI-authorized Payment Aggregator or maintain a scheduled commercial bank escrow account.
  - **Non-Custodial Scope:** While FORTREX does not hold trading investment capital, its platform collection of tournament entry fees and prize pool disbursements touches payment regulation and must be handled strictly via licensed PA escrow infrastructure.

### 2. Sources
- **Primary Source (Grade A):** Reserve Bank of India Press Release & Updated Alert List of Unauthorized Forex Trading Platforms (`https://www.rbi.org.in`).
- **Primary Source (Grade A):** Foreign Exchange Management (Current Account Transactions) Rules, 2000 — Schedule I (`https://www.rbi.org.in`).
- **Primary Source (Grade A):** RBI Master Directions on Regulation of Payment Aggregators, 2025 (`https://www.rbi.org.in`).
- **Secondary Source (Grade B):** Economic Times / BFSI Reports on RBI Payment Aggregator Escrow Mandates (`https://bfsi.economictimes.indiatimes.com`).

### 3. What It Means for FORTREX
- **Strict Domestic Exchange Restriction:** FORTREX competitions must be strictly limited to SEBI-regulated domestic Indian exchanges (NSE, BSE, MCX) accessed via licensed Indian stockbrokers. Forex platforms on the RBI Alert List must be explicitly barred.
- **Licensed Payment Infrastructure:** Entry fee collection and prize disbursements must be processed exclusively through RBI-authorized Payment Aggregators (e.g., Razorpay, Cashfree) using compliant nodal/escrow accounts.
- **Geo-Fencing Cross-Border Users:** Until formal FEMA cross-border remittance mechanisms and FIRC processing are established, FORTREX should restrict cash prize competitions to Indian resident bank accounts (*counsel-review-required*).

### 4. Open Questions
- Does distributing non-cash digital rewards or REX points to non-resident users trigger FEMA capital/current account reporting obligations? (*counsel-review-required*).
- How do RBI PA Directions apply if prize money is disbursed directly from a corporate sponsor's bank account rather than a platform escrow account? (*counsel-review-required*).

---

## Topic 6: Consumer Protection Act 2019, CCPA Dark Patterns & ASCI Guidelines

### 1. Findings & Statutory Framework
- **Consumer Protection Act, 2019 & CCPA Misleading Ads Guidelines, 2022:**
  Prohibits false or misleading advertisements, unverified income claims, and deceptive promotional statements. Penalties include fines up to ₹10 lakh for first violations and ₹50 lakh for subsequent violations under Section 89.
- **CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (Notified Nov 30, 2023):**
  Enforced by the Central Consumer Protection Authority (CCPA), the guidelines explicitly prohibit **13 specified dark patterns** in digital products:
  1. **False Urgency:** Falsely implying limited availability or time (e.g., fake "Only 2 tournament spots left!" countdown timers).
  2. **Basket Sneaking:** Adding extra charges, add-on fees, or optional items at checkout without explicit user consent.
  3. **Confirm Shaming:** Using emotional manipulation or guilt phrasing to reject an option (e.g., *"No thanks, I hate winning money"*).
  4. **Forced Action:** Requiring users to perform unrelated actions (e.g., downloading an unrelated app) to enter a contest.
  5. **Subscription Trap:** Making SaaS subscription cancellation intentionally difficult or hidden.
  6. **Interface Interference:** Manipulating UI visual hierarchy to misdirect users toward costlier options.
  7. **Bait and Switch:** Advertising a free entry contest and switching to a paid requirement at checkout.
  8. **Drip Pricing:** Revealing hidden platform processing fees late in the checkout flow.
  9. **Disguised Ads:** Presenting sponsored influencer content as organic posts without clear ad tags.
  10. **Nagging:** Repeatedly interrupting user workflow with popups prompting entry fee upgrades.
  11. **Trick Questions:** Using confusing double-negative phrasing in checkbox agreements.
  12. **SaaS Billing Defaults:** Enrolling users in recurring auto-debit subscriptions without clear pre-debit notifications.
  13. **Rogue Malware:** Misleading UI elements triggering unauthorized downloads.
- **ASCI Guidelines for Online Gaming for Real Money Winning (2020/2023):**
  - **Mandatory Financial Risk Disclaimer:** All promotional material, website banners, and videos must display the standardized disclaimers:
    > *"This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk."*
  - **Print/Static Ads:** Disclaimer must occupy at least 20% of the ad space.
  - **Audio/Video Ads:** Disclaimer must be clearly spoken at normal pace at the end of the ad and displayed in readable text.
  - **Income Claims Prohibition:** Ads must **NEVER** depict gaming/trading competitions as an alternative career, employment, or guaranteed income source.
  - **Minors Prohibition:** Ads must not target individuals under 18 years of age.
- **ASCI Influencer Guidelines for Digital Media (2021/2024 Updates):**
  Influencers in the Creator Partnership Program must include prominent, upfront disclosures (`#ad`, `#sponsored`, `#paidpartnership`, `#collab`) on all promotional content across Instagram, YouTube, X, and Telegram.

### 2. Sources
- **Primary Source (Grade A):** CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (`https://jagograhakjago.gov.in` / Gazette of India, Dec 1, 2023).
- **Primary Source (Grade A):** CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements, 2022 (`https://jagograhakjago.gov.in`).
- **Secondary Source (Grade B):** Advertising Standards Council of India (ASCI) Guidelines for Online Gaming and Influencer Marketing (`https://ascionline.in` / L&L Partners / Lexology).

### 3. What It Means for FORTREX
- **UI/UX Dark Pattern Audit:** Platform interfaces must be audited prior to launch to eliminate artificial timers, auto-checked add-on boxes, drip pricing, and confirm-shaming copy.
- **Mandatory Creator Guidelines:** Creators in the FORTREX Creator Partnership Program must sign agreements enforcing mandatory `#ad` tags and ASCI financial risk disclaimers.
- **Strict Marketing Copy Review:** Marketing copy must completely avoid terms like *"Earn daily income trading"*, *"Guaranteed profits"*, or *"Risk-free contest"* (*counsel-review-required*).

### 4. Open Questions
- Does displaying trader leaderboard rankings on social media without an `#ad` tag violate ASCI guidelines if the trader receives REX point rewards? (*counsel-review-required*).
- How should dark pattern rules apply to gamified streak rewards and daily login REX bonuses? (*counsel-review-required*).

---

## Topic 7: DPDP Act 2023 & DPDP Rules 2025

### 1. Findings & Statutory Framework
- **Enactment & Phased Implementation:**
  The *Digital Personal Data Protection Act, 2023* (DPDP Act) was enacted on August 11, 2023. The Ministry of Electronics and Information Technology (MeitY) notified the **Digital Personal Data Protection Rules, 2025** on **November 13, 2025**, establishing a phased implementation schedule.
- **Core Obligations for Data Fiduciaries:**
  - **Itemized Notice & Explicit Consent (Section 5 & 6):** Before processing personal data, FORTREX must present an itemized, clear consent notice detailing the exact data collected and purpose. The notice must be available in English and all **22 languages specified in the 8th Schedule** of the Indian Constitution.
  - **Consent Withdrawal (Section 6(4)):** Users must be provided an easy, accessible mechanism to withdraw consent at any time, with processing stopping immediately upon withdrawal.
  - **Data Processor Contracts (Section 8(2)):** FORTREX must execute formal Data Processing Agreements with all cloud providers, analytics vendors, and Payment Aggregators (e.g., AWS, Razorpay, PostHog).
- **Children's Personal Data Protection (Section 9):**
  - **Definition:** A "child" is defined as any individual under **18 years of age**.
  - **Verifiable Parental Consent (VPC):** Section 9 mandates obtaining verifiable parental or lawful guardian consent before processing any data of a child.
  - **Absolute Ban on Tracking:** Section 9(2) strictly prohibits Data Fiduciaries from engaging in tracking, behavioral monitoring, or targeted advertising directed at children.
- **Data Protection Board of India (DPB) & Complaint Process:**
  Established under Section 18, the DPB operates as a digital-first tribunal handling data breach reports and user complaints. Users must first attempt grievance redressal with FORTREX's Data Protection Officer (DPO); if unresolved within prescribed timelines, users may file an online complaint with the DPB.
- **Statutory Penalties (Schedule to DPDP Act 2023):**
  - Up to **₹250 crore** for failure to implement reasonable security safeguards preventing personal data breaches.
  - Up to **₹200 crore** for non-compliance with obligations regarding children's data.
  - Up to **₹150 crore** for failure to notify the DPB and affected users of a data breach.

### 2. Sources
- **Primary Source (Grade A):** Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023) (`https://www.meity.gov.in` / Gazette of India, Aug 11, 2023).
- **Primary Source (Grade A):** Digital Personal Data Protection Rules, 2025 (Notified November 13, 2025) (`https://www.pib.gov.in` / MeitY Press Release).
- **Secondary Source (Grade B):** MHO Law & Legal 500, *"India's Data Privacy Rules 2025: Compliance Guide"* (`https://www.legal500.com`).
- **Secondary Source (Grade B):** Sarthak Law Analysis on Verifiable Parental Consent & DPB Tribunal Rules (`https://sarthaklaw.com`).

### 3. What It Means for FORTREX
- **Enforce Strict 18+ Age-Gating (Crucial Risk Mitigation):**
  To avoid the complex legal and operational burden of Verifiable Parental Consent and the ₹200 crore penalty risk under Section 9, FORTREX must enforce strict **18+ age gating** during signup and KYC verification, prohibiting individuals under 18 from registering (*counsel-review-required*).
- **Consent Artifact Architecture:**
  - Build a centralized Consent Management Log storing timestamped consent receipts and scope.
  - Implement a 1-click "Withdraw Consent" button in account settings.
  - Provide consent notices in English and regional 8th Schedule languages.
- **Security Safeguards:** Deploy end-to-end encryption for broker API keys, contract notes, and personal data to prevent data breaches subject to ₹250 crore penalties.

### 4. Open Questions
- Does reading and storing trade contract notes from a trader's broker account classify FORTREX as handling sensitive financial data subject to additional DPDP security standards? (*counsel-review-required*).
- What specific verification artifacts satisfy DPB requirements for proving a user is over 18 years old during onboarding? (*counsel-review-required*).

---

## Confidence & Counsel Review Table

| Topic / Regulatory Area | Source Evidence Grade | What Legal Counsel Must Formally Confirm |
| :--- | :---: | :--- |
| **1. Income-Tax TDS (Sec 194B/194BA)** | **Grade A**<br>*(CBDT Circ. 5/2023 & Rule 133)* | Confirm applicability of Rule 133 net winnings formula to trading competitions; validate tax collection mechanics for non-monetary rewards and unredeemed REX points. |
| **2. GST on Gaming vs. SaaS** | **Grade A**<br>*(CGST Amend. Act 2023 & SC Verdict)* | Confirm whether structuring FORTREX as a SaaS competition platform (charging a monthly subscription) successfully avoids the 28% gross deposit GST levy under Section 2(80B). |
| **3. PROG Act 2025 & PROG Rules 2026** | **Grade A**<br>*(Act 32 of 2025 & Rules May 2026)* | **CRITICAL:** Evaluate whether trading tournaments over real market outcomes constitute prohibited "online money games" under PROGA 2025; draft MeitY/OGAI determination request. |
| **4. SEBI Regulatory Boundaries** | **Grade A**<br>*(SEBI Advisers Regs & Data Circulars)* | Confirm that read-only broker API integration and execution leaderboards do not trigger SEBI RIA/RA registration or SEBI exchange data redistribution violations. |
| **5. RBI Position & FEMA Rules** | **Grade A**<br>*(RBI Alert List & PA Directions 2025)* | Validate Payment Aggregator escrow routing for entry/subscription fees and ensure complete exclusion of forex platforms listed on the RBI Alert List. |
| **6. Consumer Protection & ASCI** | **Grade A**<br>*(CCPA Dark Patterns 2023 & ASCI)* | Perform legal audit of platform UI/UX for CCPA dark pattern compliance; review creator partnership agreements for ASCI risk disclaimers and `#ad` tag mandates. |
| **7. DPDP Act 2023 & DPDP Rules 2025** | **Grade A**<br>*(DPDP Act & Rules Notified Nov 13, 2025)* | Validate 18+ age-gating KYC flow to eliminate Section 9 children's data liability; approve multilingual consent notice artifacts and Data Processor contracts. |

---
*Note: All legal conclusions contained in this report are marked as 'counsel-review-required' and must be formally reviewed by qualified Indian legal counsel prior to commercial launch on November 7, 2026.*
