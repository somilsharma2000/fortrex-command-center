# FORTREX Research: Corporate Infrastructure, Intellectual Property, Geo-Fencing & Global Continuity Framework

> **Document ID:** `12-corporate-international`  
> **Target Path:** `fortrex-command-center-git/research/universe/12-corporate-international.md`  
> **Classification:** Operational, Legal, Corporate & International Continuity Playbook  
> **Context Date:** September 26, 2026 | **Target Launch:** November 7, 2026 (Stealth Phase: 10,000 Founding Seats)  
> **Brand Identity:** Non-Custodial Skill-Based Trading Tournament Platform  
> **Evidence Grading:**  
> - **Grade A:** Primary / Official (MCA, IP India, statutory texts, regulator guidance publications)  
> - **Grade B:** Credible Secondary (Law firm briefings: Cyril Amarchand Mangaldas, Nishith Desai Associates, Khaitan & Co; major fintech guides)  
> - **Grade C:** Community Evidence (Founder post-mortems, developer forums, tech community playbooks)  
> - **Grade D:** Analytical Hypothesis / Deduction  
> **Legal Notice:** All legal, regulatory, tax, and intellectual property analyses contained herein require formal review and execution by qualified legal counsel (*counsel-review-required*).

---

## Executive Summary

*Plain-language briefing for non-technical founders and strategic stakeholders:*

* **Corporate Incorporation Strategy:** Deferring Private Limited incorporation until 3–4 weeks prior to public launch is a valid stealth tactic, but execution must be swift. The Ministry of Corporate Affairs (MCA) SPICe+ process integrates company registration, Director Identification Numbers (DIN), PAN, TAN, GSTIN, and corporate bank account opening into a single filing, taking **5 to 8 working days** for **₹10,000–₹22,000** total cash outlay (Grade A).
* **IP Protection Prior to November 7 Public Launch:** India operates on a hybrid "first-to-file" and prior-user trademark regime. Filing "FORTREX" under **Classes 9, 35, 41, and 42** via Form TM-A on IP India's portal **prior to public launch** is critical to establish priority, prevent cybersquatting, and defend brand identity. Cost: **₹4,500 per class** for DPIIT-recognized startups/individuals (Grade A).
* **Multi-Layered Geo-Blocking Infrastructure:** Restricting non-eligible Indian states (Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, Sikkim) and foreign blocked jurisdictions requires a 3-tier defense: edge CDN geolocation (Cloudflare/AWS), active VPN/Proxy/ASN intelligence filtering (MaxMind/IPQualityScore/WebRTC leak checks), and mandatory KYC document address verification before prize distribution (Grade B).
* **Global Regulator Expansion Skeleton:** Entering international markets involves distinct "single-gatekeeper" hurdles: UK (UKGC skill contest exemption vs Gambling Act 2005), EU (27 fragmented national gambling regimes + ESMA CFD rules), US (CFTC off-exchange retail commodity rules + 50-state contest law matrix), UAE (GCERA licensing & Sharia rules), Singapore (GRA class license + MAS financial promotion rules), and Australia (ASIC retail CFD promo bans + ACMA Interactive Gambling Act) (Grade A/B). All entries are skeleton-grade starting maps requiring local legal counsel (*counsel-review-required*).
* **Founder Key-Man Continuity System:** As a solo founder, operational redundancy is vital. A complete key-man continuity stack requires a password manager master vault (1Password/Bitwarden), physical printed emergency recovery kits in a fireproof safe, platform successor designation (Google Inactive Account Manager, GitHub Successor, Bitwarden Emergency Access), and a dead-man-switch / Shamir’s Secret Sharing key distribution protocol (Grade B).
* **Indian Seed Fundraising Realities:** US-style SAFEs fail under Indian Companies Act 2013 (Sections 42 & 62) and RBI FEMA rules due to strict valuation and conversion mandates. Indian seed rounds use **CCPS (Compulsorily Convertible Preference Shares)** or **iSAFE** (India Simple Agreement for Future Equity, legally structured as CCPS). Institutional seed investors require a data room featuring cap table, founder IP assignment, and a Tier-1 law firm "Game of Skill" legal opinion (Grade A/B).
* **Sequential Banking & Money-Movement Pipeline:** Collecting fees and paying out prize pools requires strict sequential execution: **Entity Incorporation → Corporate Current Account → Payment Gateway Merchant Onboarding (Razorpay/Cashfree under correct MCC) → Automated Payout Engine (IMPS/UPI API)** (Grade B).

---

## 1. India Private Limited Incorporation (SPICe+ Architecture)

### 1.1 SPICe+ Process Breakdown

Company incorporation in India is administered by the **Ministry of Corporate Affairs (MCA)** under the Companies Act, 2013. In 2020, MCA introduced the integrated web application **SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus)** on the MCA v3 Portal [Grade A].

```
+-----------------------------------------------------------------------------------+
|                           SPICe+ INTEGRATED FILING ARCHITECTURE                   |
+-----------------------------------------------------------------------------------+
|  SPICe+ PART A: Name Reservation (RUN / SPICe+ Part A)                            |
|  - Up to 2 proposed names checked against MCA Database & IP India TM Registry     |
|  - Validity upon approval: 20 calendar days                                       |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  SPICe+ PART B: Integrated Incorporation & Compliance Forms                       |
|  ├── Form INC-32 (SPICe+ Main Application): Company Details & Capital Structure   |
|  ├── Form DIN Application: Allotment of Director Identification Numbers (up to 3)|
|  ├── Form INC-33 (e-MOA): Electronic Memorandum of Association                    |
|  ├── Form INC-34 (e-AOA): Electronic Articles of Association                      |
|  ├── Form AGILE-PRO-S (INC-35): Integrated Registration Application               |
|  │    ├── GSTIN (Goods & Services Tax Identification Number)                      |
|  │    ├── EPFO (Employees' Provident Fund Organisation)                           |
|  │    ├── ESIC (Employees' State Insurance Corporation)                           |
|  │    ├── Professional Tax Registration (State specific: MH, KA, WB, etc.)        |
|  │    └── Bank Current Account Opening (Partner banks: ICICI, HDFC, Axis, SBI)   |
|  └── Form INC-9: Electronic Declaration by First Directors & Subscribers          |
+-----------------------------------------------------------------------------------+
```

### 1.2 Digital Signature Certificate (DSC) Requirements

* **DSC Class:** Under MCA v3 guidelines, all forms filed on the MCA portal require a **Class 3 Digital Signature Certificate** with encryption and signing capabilities [Grade A].
* **Mandate:** At least one director (preferably both directors in a 2-director Private Limited company) must obtain a Class 3 DSC from a licensed Certifying Authority (CA) in India (e.g., eMudhra, Capricorn, VSign, Pantagon) [Grade A].
* **Verification:** Obtaining a Class 3 DSC requires video verification and mobile OTP verification linked to the director's PAN and Aadhaar.

### 1.3 Name Approval Strategy (RUN / SPICe+ Part A)

* **Naming Rules:** Governed by Companies (Incorporation) Rules, 2014. The name must consist of: `[Unique Prefix] + [Activity Word] + "Private Limited"` [Grade A].
* **Red Flags & Restrictions:**
  * Words like "Bank", "Exchange", "Stock", "Bourse", "Insurance", "Mutual Fund", or "Asset Management" trigger immediate rejection unless pre-approved by SEBI or RBI [Grade A].
  * Words implying government patronage (e.g., "National", "India", "Federal") are restricted without specific threshold capital and approvals [Grade A].
* **Recommended Naming Format for FORTREX:**
  * Proposed Name 1: **FORTREX Interactive Technologies Private Limited**
  * Proposed Name 2: **FORTREX Tournament Platforms Private Limited**
  * Proposed Name 3: **FORTREX Financial Software Private Limited**
* **Trade Mark Cross-Check:** MCA auto-runs the proposed name against the IP India Trade Mark database during Part A screening. If "FORTREX" is registered under Class 9, 35, 41, or 42 by a third party, Part A will be rejected [Grade A].

### 1.4 Cost Breakdown Matrix

```
+-----------------------------------------------------------------------------------+
|                        PRIVATE LIMITED INCORPORATION COST MATRIX                  |
+--------------------------------------+---------------------+----------------------+
| Item Description                     | Govt / Statutory Fee| Professional / Admin |
+--------------------------------------+---------------------+----------------------+
| Class 3 DSC (2 Directors)            | ₹0                  | ₹2,000 – ₹4,000      |
| SPICe+ Part A (Name Reservation)     | ₹1,000              | ₹0 (if bundled)      |
| SPICe+ Part B Incorporation Fee      | ₹0 (up to ₹15L cap)| ₹0                   |
| PAN & TAN Generation                 | ₹131                | ₹0                   |
| State Stamp Duty (e-MOA/e-AOA)*      | ₹1,000 – ₹3,000     | ₹0                   |
| Professional Fees (CA/CS/Lawyer)     | ₹0                  | ₹5,000 – ₹15,000     |
| Incidentals / Document Notarization  | ₹0                  | ₹1,000 – ₹2,000      |
+--------------------------------------+---------------------+----------------------+
| TOTAL ESTIMATED CASH OUTLAY          | ₹2,131 – ₹4,131     | ₹8,000 – ₹21,000     |
| COMBINED TOTAL COST RANGE            |         ₹10,131 – ₹25,131                  |
+--------------------------------------+---------------------+----------------------+
*Stamp duty varies by state (e.g., Maharashtra: ₹1,000; Delhi: ₹1,000; Karnataka: ₹2,000+).
```
*Source: MCA Fees Structure & Industry CA Benchmarks (Grade A/B, 2026).*

### 1.5 Realistic Timeline

```
+-----------------------------------------------------------------------------------+
|                             INCORPORATION TIMELINE                                |
+-------------------------------+--------------------+------------------------------+
| Phase                         | Time Required      | Dependency / Responsible     |
+-------------------------------+--------------------+------------------------------+
| 1. DSC Procurement & KYC      | 1 – 2 Working Days | Director PAN/Aadhaar Video   |
| 2. Name Approval (Part A)     | 1 – 2 Working Days | MCA Central Processing Centre|
| 3. SPICe+ Part B & MOA/AOA    | 2 – 3 Working Days | Professional CS/CA Drafting  |
| 4. MCA Approval & COI Issue   | 2 – 3 Working Days | MCA Registrar of Companies   |
+-------------------------------+--------------------+------------------------------+
| TOTAL ELAPSED TIME            | 5 – 8 WORKING DAYS | (Excludes client delays)     |
+-------------------------------+--------------------+------------------------------+
```

### 1.6 Post-Incorporation Statutory Compliance Calendar

Once the Certificate of Incorporation (COI) is issued, the company enters active regulatory status under the Companies Act, 2013 [Grade A].

```
+-----------------------------------------------------------------------------------+
|                     POST-INCORPORATION STATUTORY DUTIES & CALENDAR                |
+------------------------+-------------------+--------------------------------------+
| Action / Filing        | Statutory Deadline| Consequence of Non-Compliance        |
+------------------------+-------------------+--------------------------------------+
| 1. PAN & TAN Receipt   | Day 0 (With COI)  | None (Auto-allotted with SPICe+)     |
| 2. First Board Meeting | Within 30 Days    | Penalty under Sec 173 of Co Act      |
| 3. First Auditor (ADT-1)| Within 30 Days    | Fine of ₹300/day; invalid audit      |
| 4. Bank Account Opening| Within 30 Days    | Delay in Share Capital Inflow        |
| 5. Deposit Share Capital| Within 60 Days    | Unable to file Form INC-20A          |
| 6. Form INC-20A        | Within 180 Days   | Cannot commence business; company    |
|    (Commencement Biz)  |                   | registration may be struck off       |
| 7. Form DIR-3 KYC      | Annually Sept 30  | DIN Deactivation; ₹5,000 penalty     |
| 8. Form AOC-4 (Finances)| 30 Days from AGM  | ₹100/day persistent penalty          |
| 9. Form MGT-7 (Return) | 60 Days from AGM  | ₹100/day persistent penalty          |
+------------------------+-------------------+--------------------------------------+
```

### 1.7 Current Account Options & Integration

Form AGILE-PRO-S forces the selection of a bank current account during SPICe+ filing. MCA partners include:
* **ICICI Bank (iStartup Account):** Fast verification, digital API integration, built-in payout portal.
* **HDFC Bank (SmartUp Account):** Custom startup offerings, foreign outward/inward remittance support.
* **Axis Bank & State Bank of India:** Solid traditional banking, suitable for institutional credibility.
* **Neo-Banking Overlay:** Once the primary current account is opened at ICICI/HDFC, modern financial operations (automated payouts, API banking) can be connected via **RazorpayX** or **Open Financial Technologies** [Grade B].

### Sources (Section 1)
* MCA SPICe+ Portal Guide & Version 3 Services, Ministry of Corporate Affairs, Govt of India (`https://www.mca.gov.in`), Grade A, Updated 2026.
* Companies Act, 2013 Section 7, 139, 173, 10A statutory mandates, Grade A.
* ICICI Bank iStartup Current Account Specifications (`https://www.icicibank.com`), Grade B, 2026.

---

## 2. Trademark Protection for FORTREX

### 2.1 India TM Registration Process

Intellectual property protection in India is governed by the **Trade Marks Act, 1999** and **Trade Marks Rules, 2017**, administered by the **Controller General of Patents, Designs and Trade Marks (IP India)** [Grade A].

```
+-----------------------------------------------------------------------------------+
|                        TRADEMARK REGISTRATION LIFECYCLE                           |
+-----------------------------------------------------------------------------------+
|  1. FORMAL SEARCH: Preliminary availability check on IP India public database     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  2. FILING (Form TM-A): E-filing on ipindiaservices.gov.in                        |
|     --> Allotment of Application Number & immediate right to use ™ symbol        |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  3. EXAMINATION (1 – 3 Months): Examiner checks Sec 9 (Absolute) & Sec 11 (Relative)|
|     --> Result: Examination Report Issued (Accepted OR Objected)                  |
|     --> If Objected: File written response within 30 days & attend hearing        |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  4. JOURNAL PUBLICATION: Advertised in Trade Marks Journal                        |
|     --> 4-Month Public Opposition Window (Third-party opposition filings)          |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  5. REGISTRATION CERTIFICATE: Certificate issued if no opposition filed/cleared   |
|     --> Exclusive right to use ® symbol (Valid 10 years, renewable indefinitely)  |
+-----------------------------------------------------------------------------------+
```

### 2.2 Relevant Trademark Classes for FORTREX

To establish bulletproof IP protection for a non-custodial skill-based trading tournament platform, FORTREX must file across **four core trademark classes** [Grade B]:

```
+-----------------------------------------------------------------------------------+
|                         RECOMMENDED TRADEMARK CLASSES                             |
+-------+----------------------------------+----------------------------------------+
| Class | Formal Classification Title      | Specific FORTREX Platform Coverage     |
+-------+----------------------------------+----------------------------------------+
| 9     | Computer & Software Apparatus    | Downloadable mobile apps, web platform |
|       |                                  | software, trade signal rendering tools |
+-------+----------------------------------+----------------------------------------+
| 35    | Business & Advertising Services  | Organizing trading competitions, market|
|       |                                  | platform administration, contest ops   |
+-------+----------------------------------+----------------------------------------+
| 41    | Gaming, Contests & Education     | Skill-based competitive tournaments,   |
|       |                                  | trading challenges, sports/gaming rules|
+-------+----------------------------------+----------------------------------------+
| 42    | SaaS & Technological Services    | Non-downloadable cloud platform hosting|
|       |                                  | API analytics, non-custodial trade audit|
+-------+----------------------------------+----------------------------------------+
```

### 2.3 Costs Breakdown (Govt Fee vs Attorney)

```
+-----------------------------------------------------------------------------------+
|                          TRADEMARK FILING COST STRUCTURE                          |
+--------------------------------------+---------------------+----------------------+
| Filing Entity Category               | Govt Fee (Per Class)| Attorney Fee Range   |
+--------------------------------------+---------------------+----------------------+
| Individual / DPIIT Startup / MSME    | ₹4,500              | ₹3,000 – ₹8,000      |
| Standard Corporate Entity (No MSME)  | ₹9,000              | ₹3,000 – ₹8,000      |
+--------------------------------------+---------------------+----------------------+
| 4-CLASS TOTAL (Startup Rate)         | ₹18,000             | ₹12,000 – ₹32,000    |
| 4-CLASS TOTAL OUTLAY RANGE           |         ₹30,000 – ₹50,000                  |
+--------------------------------------+---------------------+----------------------+
```
*Note: DPIIT recognition provides a 50% discount on government trademark fees [Grade A].*

### 2.4 Timeline & Milestone Expectations

* **Filing & TM Use:** Day 1 (TM application number issued immediately; ™ symbol can be attached to the brand name).
* **Examination Report:** 1 to 3 months.
* **Journal Advertisement:** 4 to 6 months post-filing.
* **Opposition Period:** 4 months from journal publication date.
* **Final Registration Certificate:** 6 to 18 months (assuming no third-party opposition). The ® symbol can only be used after the formal registration certificate is granted [Grade A].

### 2.5 Strategic Necessity of Filing BEFORE Nov 7 Public Launch

1. **First-to-File & Priority Date:** India follows a first-to-file priority system (qualified by prior adoption under Section 34 of Trade Marks Act 1999). Filing prior to the November 7 public launch secures an unassailable priority filing date [Grade A].
2. **Preventing Cybersquatting & Copycat Filings:** Public launches attract domain squatters and opportunistic TM registrants. If a bad-faith actor files "FORTREX" under Class 41 or 42 right after public launch, resolving the conflict requires expensive legal opposition or rectification proceedings before the IPAB / High Court [Grade B].
3. **Investor & Platform Valuation Moat:** Venture capital investors in seed rounds require clean, registered (or pending) IP assignment agreements tied to the entity [Grade B].

### 2.6 TM Availability Check Protocol

* The founder must instruct trademark counsel to execute a comprehensive search on the official portal (`https://ipindiaservices.gov.in/tmrpublicsearch`) for wordmark "FORTREX" (Exact, Contains, and Phonetic match types) across Classes 9, 35, 41, and 42 [Grade A].
* International screening should be conducted on the **WIPO Global Brand Database** (`https://www.wipo.int/branddb`) (*counsel-review-required*).

### Sources (Section 2)
* Trade Marks Act, 1999 and Trade Marks Rules, 2017, Intellectual Property India (`https://ipindia.gov.in`), Grade A.
* Comprehensive IP Search Portal (`https://ipindiaservices.gov.in/tmrpublicsearch`), Grade A.
* "Trademark Registration Fees Comparison & DPIIT Startup Exemptions," Compliance Calendar & LegalSuvidha Briefings, Grade B, 2026.

---

## 3. Geo-Blocking Implementation & State-Level Compliance

### 3.1 IP-Geolocation Technological Infrastructure

A skill-based contest platform operating from India must geofence users at both international borders (to comply with foreign local financial/gambling laws) and state borders inside India [Grade B].

```
+-----------------------------------------------------------------------------------+
|                        TRI-LAYER GEO-BLOCKING ARCHITECTURE                        |
+-----------------------------------------------------------------------------------+
|  LAYER 1: EDGE CDN FILTERING (Cloudflare Workers / AWS CloudFront Headers)         |
|  - Drops traffic from banned countries & banned Indian states at DNS / Edge level |
|  - Latency: <5ms; Cost: Low ($0 – $20/mo)                                         |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  LAYER 2: ACTIVE VPN / PROXY / DATACENTER ASN INSPECTION                           |
|  - Real-time API query (MaxMind GeoIP2 / IPinfo Privacy / IPQualityScore)          |
|  - WebRTC STUN/TURN Leak Check & ISP Residential ASN verification                 |
|  - Latency: ~50ms; Cost: Moderate ($50 – $200/mo)                                 |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  LAYER 3: MANDATORY HARD-KYC DOCUMENT MATCHING (Pre-Payout Gate)                  |
|  - Aadhaar / PAN OCR verification matching identity to permitted states            |
|  - Latency: Asynchronous; Cost: Per-verification (₹5 – ₹15 per user via DigiLocker)|
+-----------------------------------------------------------------------------------+
```

### 3.2 Indian State-Level Skill Gaming Legality Landscape

In India, betting and gambling are state subjects under Entry 34, List II of the Seventh Schedule of the Constitution of India [Grade A]. While the Supreme Court of India has repeatedly held that games of skill are protected commercial activities under Article 19(1)(g) (*State of Andhra Pradesh v. K. Satyanarayana*, *K.R. Lakshmanan v. State of Tamil Nadu*) [Grade A], several state statutes explicitly prohibit online money games regardless of skill [Grade B].

```
+-----------------------------------------------------------------------------------+
|                       INDIAN RESTRICTED STATES MATRIX                             |
+------------------+--------------------------------------+-------------------------+
| Restricted State | Governing Statute / Statutory Basis  | Platform Action Required|
+------------------+--------------------------------------+-------------------------+
| Telangana        | Telangana Gaming Act, 1974 (2017 Am.)| Mandatory Hard Block    |
| Andhra Pradesh   | AP Gaming Act, 1974 (2020 Amendment) | Mandatory Hard Block    |
| Assam            | Assam Game and Betting Act, 1970     | Mandatory Hard Block    |
| Odisha           | Odisha Prevention of Gambling Act    | Mandatory Hard Block    |
| Nagaland         | Nagaland Online Games of Skill Act   | Block (unless licensed) |
| Sikkim           | Sikkim Online Gaming Regulation Act  | Block (unless licensed) |
+------------------+--------------------------------------+-------------------------+
```
*Note: The Central Government introduced the Promotion and Regulation of Online Gaming Bill / Act (2025/2026) to establish a unified central framework for online games, but state-level enforcement remains active [Grade B]. All geofencing logic must be marked counsel-review-required.*

### 3.3 VPN Detection Reality & Technical Defenses

Simple IP checks are easily bypassed by residential VPNs, commercial proxy tools, or TOR networks. Leading Indian gaming platforms (Dream11, MPL, Games24x7) employ advanced technical measures [Grade C]:

1. **Datacenter ASN Filtering:** Automatically reject connections originating from known hosting and VPN Autonomous System Numbers (ASNs) such as AWS, DigitalOcean, ExpressVPN, NordVPN, M247, and Leaseweb [Grade B].
2. **WebRTC STUN Server Leak Checks:** Client-side JavaScript pings WebRTC STUN/TURN endpoints to detect the actual local network interface IP address, exposing users who enable browser VPN extensions over local network adapters [Grade C].
3. **TCP/IP Fingerprinting & Canvas Fingerprinting:** Analyzing TCP packet TTL (Time to Live) values and browser Canvas/WebGL signatures to detect virtual network adapters [Grade C].
4. **Mobile Native Location API:** On iOS and Android native wrappers, query OS-level GPS / Wi-Fi cell tower triangulation via Apple CoreLocation / Google Fused Location Provider. Mobile OS location cannot be spoofed by standard network VPNs [Grade B].

### 3.4 Declared-Residence vs IP Verification Dual-Gate

* **Registration Stage:** User signs terms declaring residence outside restricted states.
* **Session Launch Gate:** Server queries IP intelligence API. If IP belongs to Telangana, AP, Assam, Odisha, Nagaland, Sikkim, or a banned country, display error modal: *"Access Restricted: Platform services are unavailable in your region."*
* **Payout Gate:** Before releasing tournament prizes or payouts, the user must undergo DigiLocker / Aadhaar KYC. If the address on the verified official ID belongs to a restricted state, payout is frozen pending legal review (*counsel-review-required*).

### Sources (Section 3)
* Supreme Court of India Precedents: *K.R. Lakshmanan v. State of Tamil Nadu* (1996 2 SCR 1098); *State of Andhra Pradesh v. K. Satyanarayana* (1968 2 SCR 387), Grade A.
* MaxMind GeoIP2 City & Precision Web Service Specs (`https://www.maxmind.com`), Grade B, 2026.
* Cloudflare Geolocation Workers & IP Intelligence Documentation (`https://developers.cloudflare.com`), Grade B, 2026.

---

## 4. Country-by-Country International Expansion Skeleton

This section provides a preliminary regulatory map for future global expansion. **Every entry is skeleton-grade and marked *counsel-review-required*.**

```
+--------------------------------------------------------------------------------------------------------------------+
|                                    GLOBAL REGULATORY MATRIX (SKELETON MAP)                                         |
+-----------+-------------------------------+------------------------------------------------------------------------+
| Country   | Key Regulator(s)              | Single Biggest Regulatory Gate / Strategic Barrier                     |
+-----------+-------------------------------+------------------------------------------------------------------------+
| UK        | UK Gambling Commission (UKGC);| **UKGC Skill Contest Exemption vs Gambling License:**                  |
|           | Financial Conduct Authority   | Must prove tournament is a genuine prize competition under Gambling    |
|           | (FCA)                         | Act 2005 (Sec 14) with sufficient skill barrier, avoiding lottery/betting|
|           |                               | rules. FCA financial promo rules apply if trade syntax is used.        |
+-----------+-------------------------------+------------------------------------------------------------------------+
| EU        | Fragmented National Bodies    | **27-Nation Framework Fragmentation & ESMA Restrictions:**             |
|           | (ANJ-France, GGL-Germany,     | No unified EU skill gaming license. Must comply with ESMA MiFID II    |
|           | DGOJ-Spain) & ESMA            | CFD/FX promotional distribution limits plus separate national laws.    |
+-----------+-------------------------------+------------------------------------------------------------------------+
| US        | CFTC, SEC, FTC,               | **Dual Barrier: CFTC Retail Off-Exchange Rules + 50-State Contest Laws:|
|           | State Attorneys General       | Commodity Exchange Act (CEA) restricts off-exchange retail commodity   |
|           |                               | trading models. State contest laws vary widely (AZ, MD, TN restriction)|
+-----------+-------------------------------+------------------------------------------------------------------------+
| Canada    | Provincial Bodies (iGaming    | **Competition Act Sec 74.06 & Skill Testing Question:**                |
|           | Ontario / AGCO, Loto-Québec)  | Promotional contests require a mandatory skill-testing question and    |
|           | & Competition Bureau Canada   | compliance with provincial gambling monopolies.                        |
+-----------+-------------------------------+------------------------------------------------------------------------+
| UAE       | General Commercial Gaming     | **GCERA Commercial Gaming License & Sharia Prohibition:**              |
|           | Regulatory Authority (GCERA); | Strict prohibition on unapproved prize draws and commercial gambling.  |
|           | VARA (Dubai); DFSA; ADGM FSRA | Must obtain GCERA license or operate under pure non-wagering B2B SaaS. |
+-----------+-------------------------------+------------------------------------------------------------------------+
| Singapore | Gambling Regulatory Authority | **GRA Class Licensing & MAS Financial Promotion Rules:**               |
|           | (GRA); Monetary Authority     | Gambling Control Act 2022 mandates GRA class licensing for games of    |
|           | of Singapore (MAS)            | chance/skill with prizes. MAS strictly limits retail CFD marketing.    |
+-----------+-------------------------------+------------------------------------------------------------------------+
| Australia | Australian Securities & Investment| **ASIC Retail Product Intervention Orders & ACMA Interactive Gambling:**|
|           | Commission (ASIC); ACMA       | ASIC strictly bans CFD promotional incentives / referral rakes. ACMA  |
|           |                               | enforces Interactive Gambling Act 2001 against unauthorized wagering.  |
+-----------+-------------------------------+------------------------------------------------------------------------+
```

### Deep-Dive Summaries per Target Jurisdiction

#### 4.1 United Kingdom (UK)
* **Regulator:** UK Gambling Commission (UKGC) & Financial Conduct Authority (FCA) [Grade A].
* **Biggest Gate:** To avoid requiring an expensive UKGC Betting/Gaming License under the Gambling Act 2005, FORTREX must structure tournaments strictly as "Prize Competitions" under Section 14 of the Act. This requires demonstrating that skill, judgment, or knowledge deters a significant proportion of potential entrants from participating or prevents them from winning [Grade A]. FCA financial promotion rules apply if platform terminology resembles retail derivative/CFD marketing (*counsel-review-required*).

#### 4.2 European Union (EU)
* **Regulator:** Fragmented national regulators (ANJ - France, GGL - Germany, DGOJ - Spain, DGA - Denmark) + ESMA (European Securities and Markets Authority) [Grade A].
* **Biggest Gate:** Lack of passporting for skill gaming. Each EU member state maintains sovereign jurisdiction over promotional contests and commercial gaming. Furthermore, ESMA MiFID II product intervention measures strictly regulate retail CFD/FX marketing [Grade B] (*counsel-review-required*).

#### 4.3 United States (US)
* **Regulator:** Commodity Futures Trading Commission (CFTC), Securities and Exchange Commission (SEC), Federal Trade Commission (FTC), State AGs [Grade A].
* **Biggest Gate:** High regulatory risk. The CFTC strictly enforces Section 2(c)(2) of the Commodity Exchange Act (CEA) against off-exchange retail commodity transactions and proprietary trading evaluation models [Grade A]. Simultaneously, state contest laws create a patchwork of compliance requirements (e.g., prohibition of entry fees for prize contests in Arizona, Maryland, Tennessee without specific registrations) [Grade B] (*counsel-review-required*).

#### 4.4 Canada
* **Regulator:** Provincial Gaming Authorities (AGCO/iGaming Ontario, Loto-Québec) & Competition Bureau Canada [Grade A].
* **Biggest Gate:** Section 74.06 of the federal Competition Act makes illegal any promotional contest that does not disclose material facts or requires a purchase without a mathematical skill-testing question [Grade A]. Provincial gaming monopolies maintain exclusive rights over betting (*counsel-review-required*).

#### 4.5 United Arab Emirates (UAE)
* **Regulator:** General Commercial Gaming Regulatory Authority (GCERA - established 2023/2024), VARA (Dubai), DFSA (DIFC), ADGM FSRA [Grade A/B].
* **Biggest Gate:** Federal penal codes traditionally criminalize gambling and unapproved prize competitions under Sharia principles. The establishment of GCERA introduces commercial gaming licensing, but operating without explicit GCERA authorization or financial free-zone regulatory approval poses severe compliance risks [Grade B] (*counsel-review-required*).

#### 4.6 Singapore
* **Regulator:** Gambling Regulatory Authority (GRA) & Monetary Authority of Singapore (MAS) [Grade A].
* **Biggest Gate:** The Gambling Control Act 2022 empowers GRA to regulate all physical and online gambling, including trade promotion competitions under Class Licenses [Grade A]. MAS enforces strict guidelines against soliciting retail clients for leveraged financial instruments [Grade B] (*counsel-review-required*).

#### 4.7 Australia
* **Regulator:** Australian Securities and Investments Commission (ASIC), Australian Communications and Media Authority (ACMA), State Trade Fair Regulators [Grade A].
* **Biggest Gate:** ASIC’s Product Intervention Order strictly prohibits issuing, marketing, or distributing retail CFDs and FX derivatives with promotional incentives or rebates [Grade A]. ACMA actively blocks offshore wagering and gaming sites under the Interactive Gambling Act 2001 [Grade A] (*counsel-review-required*).

### Sources (Section 4)
* UK Gambling Commission Guidance on Prize Competitions and Lotteries, Gambling Act 2005 (`https://www.gamblingcommission.gov.uk`), Grade A.
* US Commodity Futures Trading Commission (CFTC) Enforcement Actions & CEA Regulations (`https://www.cftc.gov`), Grade A.
* Competition Bureau Canada Promotional Contests Guidelines (`https://competition-bureau.canada.ca`), Grade A.
* Singapore Gambling Control Act 2022, Gambling Regulatory Authority (`https://www.gra.gov.sg`), Grade A.
* ASIC Product Intervention Order on Retail OTC Derivatives, Australian Securities and Investments Commission (`https://asic.gov.au`), Grade A.

---

## 5. Founder Key-Man Continuity & Dead-Man-Switch System

For a solo founder operating in stealth, key-man dependency poses existential risk. Platform access, source code repositories, domain controls, and bank accounts must survive incapacitation or emergency [Grade B].

```
+-----------------------------------------------------------------------------------+
|                        FOUNDER continuity STACK ARCHITECTURE                     |
+-----------------------------------------------------------------------------------+
|  1. MASTER PASSWORDS & VAULT: 1Password / Bitwarden Premium                       |
|  - Protected by Hardware Security Key (YubiKey 5 Series)                          |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  2. PHYSICAL RECOVERY KIT: Locked Fireproof & Waterproof Safe                      |
|  - Printed Emergency Sheet (Master Key, 2FA Seeds, Hardware PINs, COI copies)     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  3. AUTOMATED PLATFORM SUCCESSOR CHANNELS                                         |
|  ├── Google Inactive Account Manager (3-Month Inactivity Trigger)                 |
|  ├── GitHub Account Successor Designation (Repository Access Delegation)           |
|  └── Bitwarden Emergency Access (7-Day Waiting Period Grant)                      |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  4. DEAD-MAN-SWITCH & KEY SPLITTING (Shamir's Secret Sharing)                     |
|  - Automated heartbeat pinging founder via SMS/Email                              |
|  - 3-of-5 threshold key split distributed to trusted family / legal trustee      |
+-----------------------------------------------------------------------------------+
```

### 5.1 Password Manager Architecture

* **Selected Platform:** Bitwarden (Open-source, self-hostable option) or 1Password [Grade B].
* **Master Vault Controls:** Protected by a 24+ character passphrase and physical YubiKey 5 NFC hardware security keys [Grade B].
* **Emergency Access Feature:** Configured via Bitwarden Emergency Access or 1Password Family/Emergency Kit. A designated trustee (e.g., trusted relative or legal proxy) can request access. The system pings the founder; if the request is not rejected within **7 calendar days**, vault access is granted automatically [Grade B].

### 5.2 Printed Physical Recovery Kit Specification

The founder must maintain a sealed physical recovery envelope inside a code-locked, fireproof/waterproof safe [Grade C]:

```
+-----------------------------------------------------------------------------------+
|                       PHYSICAL RECOVERY KIT CONTENTS LIST                         |
+---+----------------------------------+--------------------------------------------+
| # | Document / Item                  | Purpose & Details                          |
+---+----------------------------------+--------------------------------------------+
| 1 | Master Password Document         | Written Bitwarden/1Password Master Key     |
| 2 | Hardware Security Keys           | Secondary YubiKey 5 NFC (Backup Token)     |
| 3 | 2FA Backup Seed Codes            | Paper printouts of TOTP secret seeds       |
| 4 | Domain Registrar Recovery        | Cloudflare & Namecheap Account Auth Keys   |
| 5 | Cloud & Infrastructure Keys      | AWS Root MFA recovery code & SSH Key Backup|
| 6 | Corporate Incorporation Folder   | Original COI, PAN, TAN, e-MOA/AOA copies   |
| 7 | Bank Account & Payment Gateway   | Current Account Details & PG Admin Logins  |
| 8 | GitHub / Source Code Credentials | Organization Admin Recovery Passkeys       |
+---+----------------------------------+--------------------------------------------+
```

### 5.3 Automated Account Continuity Protocols

1. **Google Inactive Account Manager:** Configured with a **3-month inactivity period**. If the founder does not log into their primary Google account for 90 days, Google automatically sends an alert and shares designated account data (Drive, Gmail, GCP access instructions) with the nominated successor [Grade A].
2. **GitHub Successor:** Designated under `GitHub Settings → Account → Successor`. Permits the successor to manage repositories, transfer domain names, and maintain open-source assets upon verification of legal incapacitation [Grade A].

### 5.4 Offline Cold Storage & Dead-Man-Switch System

* **Offline Encrypted Storage:** Infrastructure SSH keys, database encryption seeds, and cold wallet private keys must be stored on a **LUKS-encrypted USB drive** inside the physical safe [Grade B].
* **Shamir's Secret Sharing (SSS) Protocol:** To prevent single point of failure or extortion, the master vault decryption key is split using Shamir's 3-of-5 threshold scheme [Grade C]:
  * Share 1: Founder’s physical safe.
  * Share 2: Nominated family member.
  * Share 3: Company legal counsel / CS.
  * Share 4: Encrypted cloud backup key.
  * Share 5: Trusted technical advisor.
  *(Any 3 shares combined reconstruct the master key).*
* **Dead-Man-Switch Ping Automation:** An automated cron service (e.g., via DeadManSwitch.net or custom AWS Lambda script) pings the founder weekly via email/SMS. If pings remain unacknowledged for 30 consecutive days, an encrypted payload containing Share 4 and access instructions is dispatched to the designated trustee [Grade C].

### Sources (Section 5)
* Bitwarden Emergency Access Architecture Documentation (`https://bitwarden.com/help`), Grade B, 2026.
* Google Inactive Account Manager Specifications (`https://support.google.com/accounts`), Grade A.
* GitHub Repository Successor Settings & Policies (`https://docs.github.com`), Grade A.

---

## 6. Indian Seed Fundraising Basics

### 6.1 Equity Instruments: CCPS vs SAFE / iSAFE

In early-stage Indian fundraising, selecting the correct investment instrument is essential for tax and regulatory compliance under the Companies Act, 2013 and Foreign Exchange Management Act (FEMA) [Grade A].

```
+-----------------------------------------------------------------------------------+
|                        INDIAN SEED INSTRUMENTS COMPARISON                         |
+-----------------------+----------------------------------+------------------------+
| Feature / Mandate     | Compulsorily Convertible         | US-Style SAFE          |
|                       | Preference Shares (CCPS)         | (Unadapted)            |
+-----------------------+----------------------------------+------------------------+
| Legality in India     | **100% Fully Compliant**         | **Non-Compliant**      |
| Statutory Basis       | Companies Act 2013 Sec 42, 55, 62| Contracts Act (Unbound)|
| FEMA FDI Compliance   | Eligible for Foreign Direct Inv. | Triggers Foreign Debt  |
| Valuation Certificate | Required from Registered Valuer | Missing valuation cap  |
| Conversion Mandate    | Mandatory conversion within 20 yrs| Ambiguous equity status|
+-----------------------+----------------------------------+------------------------+
```

#### Why US-Style SAFEs Fail in India
* **Companies Act 2013 Restrictions:** Private companies in India cannot issue non-equity "contractual rights to future equity" without following strict private placement rules (Section 42) and preferential share allotment rules (Section 62) [Grade A].
* **Valuation & Tax Rules:** Under Rule 11UA of the Income Tax Rules and FEMA Non-Debt Instruments Rules 2019, any share issuance or convertible instrument must be backed by a Valuation Report from a Registered Valuer (IBBI registered) or Merchant Banker [Grade A].
* **The Indian Solution (iSAFE):** Pioneered by 100X.VC and adopted across the Indian angel ecosystem, the **iSAFE (India Simple Agreement for Future Equity)** is legally structured as a **CCPS carrying a nominal 0.0001% coupon rate** [Grade B]. It satisfies all Companies Act private placement mandates while functioning like a YC SAFE for founders.

### 6.2 Major Indian Angel Networks & Syndicate Platforms

```
+-----------------------------------------------------------------------------------+
|                            INDIAN ANGEL NETWORKS MATRIX                           |
+------------------------+---------------------------------+------------------------+
| Network / Platform     | Target Check Size Range         | Typical Focus Area     |
+------------------------+---------------------------------+------------------------+
| LetsVenture            | ₹25 Lakhs – ₹2 Crore ($30k-$250k)| Tech, Fintech, SaaS    |
| AngelList India        | ₹50 Lakhs – ₹3 Crore ($60k-$350k)| Web3, Tech, Consumer   |
| Indian Angel Network   | ₹1 Crore – ₹5 Crore ($120k-$600k)| B2B, Fintech, Enterprise|
| Inflection Point (IPV) | ₹50 Lakhs – ₹3 Crore ($60k-$350k)| Early-Stage Consumer   |
| Mumbai Angels Network  | ₹1 Crore – ₹4 Crore ($120k-$500k)| Seed Tech Platforms    |
+------------------------+---------------------------------+------------------------+
```

### 6.3 Investor Data Room Checklist for Consumer Fintech / Gaming

Institutional seed investors in Indian consumer fintech and skill platforms conduct rigorous due diligence [Grade B]:

```
+-----------------------------------------------------------------------------------+
|                             INVESTOR DATA ROOM CHECKLIST                          |
+------------------+----------------------------------------------------------------+
| Folder Category  | Required Documents & Artifacts                                 |
+------------------+----------------------------------------------------------------+
| 1. Corporate     | Certificate of Incorporation, MOA, AOA, Cap Table (Capdesk/ |
|    Governance    | Qapita format), Founder Agreements with 100% IP Assignment     |
+------------------+----------------------------------------------------------------+
| 2. Legal Opinion | Formal "Game of Skill" legal opinion issued by a Tier-1 Indian|
|    & Compliance  | Law Firm (Cyril Amarchand Mangaldas / NDA / Khaitan)           |
+------------------+----------------------------------------------------------------+
| 3. Technology    | Platform architecture blueprint, non-custodial read-only API   |
|    & Security    | flow, third-party security penetration test certificates       |
+------------------+----------------------------------------------------------------+
| 4. Traction &    | Cohort retention metrics (D1, D7, D30), Net Take Rate (rake),  |
|    Financials    | Monthly Active Tournament Participants, CAC/LTV audit sheet    |
+------------------+----------------------------------------------------------------+
| 5. Regulatory    | Privacy Policy, Terms of Service, DPDP Act compliance audit    |
+------------------+----------------------------------------------------------------+
```

### 6.4 Realistic Stage Gates & Traction Milestones

```
+-----------------------------------------------------------------------------------+
|                             SEED STAGE TRACTION GATES                             |
+------------------+-----------------------------------+----------------------------+
| Round Stage      | Target Capital / Check Size       | Required Traction Milestone|
+------------------+-----------------------------------+----------------------------+
| Pre-Seed         | $50,000 – $200,000                | Functional MVP, 1,000+     |
| (Angel / Friends)|                                   | waitlist users, legal skill|
|                  |                                   | opinion drafted            |
+------------------+-----------------------------------+----------------------------+
| Seed Round       | $500,000 – $1,500,000             | $15k – $50k MRR OR 5,000+  |
| (Institutional VC|                                   | active monthly paid contest|
| / Top Syndicates)|                                   | traders, >30% D30 retention|
+------------------+-----------------------------------+----------------------------+
```

### Sources (Section 6)
* Companies Act 2013, Sections 42, 55, 62 & Income Tax Rule 11UA, Grade A.
* FEMA (Non-Debt Instruments) Rules 2019, Reserve Bank of India (`https://www.rbi.org.in`), Grade A.
* 100X.VC iSAFE Legal Framework & Documentation (`https://www.100x.vc/isafe`), Grade B, 2026.

---

## 7. Banking and Money-Movement Prerequisites

### 7.1 Startup Current Account Requirements

To open a corporate current account in India following incorporation, the founder must submit [Grade A/B]:

1. Certificate of Incorporation (COI) issued by MCA.
2. Company PAN Card and TAN allotment letter.
3. Certified copies of e-MOA and e-AOA.
4. Board Resolution passed by the Board of Directors authorizing account opening and nominating operational signatories.
5. Director Identity Proofs (PAN, Aadhaar, Passport) and Director Photographs.
6. Registered Office Address Proof (Utility bill not older than 2 months, Rent Agreement, NOC from property owner).

### 7.2 UPI & Payment Aggregator (PG) Integration Mechanics

Collecting tournament entry fees via UPI, credit cards, or net banking requires onboarding with an RBI-licensed **Payment Aggregator (PG)** such as **Razorpay, Cashfree, PayU, or PhonePe PG** [Grade B].

```
+-----------------------------------------------------------------------------------+
|                        PAYMENT AGGREGATOR MCC SELECTION                           |
+-------------------+-----------------------------------+---------------------------+
| Merchant Code     | Category Description              | PG Approval Status        |
+-------------------+-----------------------------------+---------------------------+
| **MCC 7995**      | Betting, Gambling, Casino Wagering| **STRICTLY BLOCKED** by   |
|                   |                                   | standard Indian PGs       |
+-------------------+-----------------------------------+---------------------------+
| **MCC 7999**      | Recreational Services / Contest   | Requires Tier-1 Legal     |
|                   | Platforms                         | Skill Gaming Opinion      |
+-------------------+-----------------------------------+---------------------------+
| **MCC 5734/7372** | SaaS / Software Subscription      | Standard Fast-Track       |
|                   | Services                          | Onboarding                |
+-------------------+-----------------------------------+---------------------------+
```

* **The Skill-Gaming PG Hurdle:** Payment aggregators categorize money flows meticulously under RBI's Payment Aggregator Guidelines [Grade A]. Attempting to onboard a contest platform under standard software MCC codes without disclosing entry fee models leads to account freezes. PGs mandate an official **Legal Skill Opinion** certifying that the platform operates a "Game of Skill" under Indian Supreme Court jurisprudence before enabling MCC 7999 / gaming merchant accounts [Grade B].

### 7.3 End-to-End Money-Movement Sequence

```
+-----------------------------------------------------------------------------------+
|                          MONEY-MOVEMENT EXECUTION SEQUENCE                        |
+-----------------------------------------------------------------------------------+
|  STEP 1: SPICe+ Private Limited Entity Incorporation                             |
|  - Generates legal persona, PAN, TAN, and statutory legitimacy                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  STEP 2: Corporate Bank Current Account Activation (ICICI / HDFC / Axis)          |
|  - Share capital deposited; Form INC-20A filed with MCA                           |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  STEP 3: Payment Gateway Onboarding (Razorpay / Cashfree)                         |
|  - Submit COI, Legal Skill Opinion, DPDP Privacy Audit                            |
|  - Merchant account approved for fee collection via UPI / Cards / NetBanking      |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  STEP 4: Automated Payout API Integration (RazorpayX / Cashfree Payouts)          |
|  - Automated IMPS / UPI payouts for tournament winner prize disbursals            |
|  - Automated 30% TDS deduction (Section 194BA of Income Tax Act for net winnings) |
+-----------------------------------------------------------------------------------+
```

### Sources (Section 7)
* RBI Guidelines on Regulation of Payment Aggregators and Payment Gateways, Reserve Bank of India (`https://www.rbi.org.in`), Grade A.
* Income Tax Act, 1961 Section 194BA (TDS on Net Winnings from Online Games), Grade A.
* Razorpay & Cashfree Merchant Onboarding Guidelines for Contests (`https://razorpay.com`), Grade B, 2026.

---

## 8. Actionable Implementation Frameworks

### 8.1 Step-by-Step Private Limited Incorporation Protocol
*(Hand this section to your CA / CS when green-lighting incorporation)*

```
+-----------------------------------------------------------------------------------+
|                  INCORPORATION EXECUTION CHECKLIST FOR CA / CS                    |
+----+---------------------------------------------------------------+--------------+
| Step| Action Item                                                   | Target Date  |
+----+---------------------------------------------------------------+--------------+
| 01 | Obtain Class 3 DSC for proposed directors (video KYC)         | Launch -25 Days|
| 02 | File SPICe+ Part A for Name Approval ("FORTREX Interactive")  | Launch -22 Days|
| 03 | Draft e-MOA (INC-33) & e-AOA (INC-34) with main objects:       | Launch -20 Days|
|    | "Software platform, competitive trading tournament hosting"   |              |
| 04 | Execute SPICe+ Part B, AGILE-PRO-S (ICICI Bank), INC-9 declarations| Launch -18 Days|
| 05 | Receive Certificate of Incorporation (COI), PAN, TAN from MCA | Launch -12 Days|
| 06 | Hold First Board Meeting; appoint Auditor (Form ADT-1)        | Launch -10 Days|
| 07 | Deposit Share Capital into ICICI Current Account              | Launch -7 Days |
| 08 | File Form INC-20A (Commencement of Business) on MCA Portal    | Launch -5 Days |
+----+---------------------------------------------------------------+--------------+
```

### 8.2 Pre-Launch Intellectual Property Protection Checklist
*(Execute before the November 7 public launch)*

```
+-----------------------------------------------------------------------------------+
|                     PRE-LAUNCH IP EXECUTION CHECKLIST                             |
+----+---------------------------------------------------------------+--------------+
| Step| Action Item                                                   | Target Date  |
+----+---------------------------------------------------------------+--------------+
| 01 | Instruct TM Counsel to run formal search on IP India Portal   | IMMEDIATE    |
|    | for "FORTREX" across Classes 9, 35, 41, and 42                 |              |
| 02 | File Form TM-A for wordmark "FORTREX" in Classes 9, 35, 41, 42 | At Entity Inc|
| 03 | Secure trademark application numbers & attach ™ symbol to app | Day of Filing|
| 04 | Register core domain names (.com, .io, .in, .ai) & social handles| Day of Filing|
| 05 | Draft and execute Founder IP Assignment Agreement transferring    | Prior to Launch|
|    | all code, designs, and brand IP to the incorporated entity    |              |
+----+---------------------------------------------------------------+--------------+
```

### 8.3 Founder Key-Man Vault & Continuity Specification

```
+-----------------------------------------------------------------------------------+
|                     KEY-MAN CONTINUITY EXECUTION LIST                             |
+----+---------------------------------------------------------------+--------------+
| Step| Action Item                                                   | Target Date  |
+----+---------------------------------------------------------------+--------------+
| 01 | Setup Bitwarden/1Password Master Vault with YubiKey 5 2FA     | Week 1       |
| 02 | Print Physical Recovery Sheet (Master key, 2FA seeds, auths)  | Week 1       |
| 03 | Place Recovery Sheet in fireproof/waterproof safe             | Week 1       |
| 04 | Configure Bitwarden Emergency Access (7-day waiting period)   | Week 2       |
| 05 | Configure Google Inactive Account Manager (3-month threshold) | Week 2       |
| 06 | Designate GitHub Account Successor                            | Week 2       |
| 07 | Implement Shamir's Secret Sharing (3-of-5 split) for master key| Week 3       |
+----+---------------------------------------------------------------+--------------+
```

### 8.4 Global Expansion Regulatory Skeleton Matrix
*(Reference starting map for international counsel review)*

```
+--------------------------------------------------------------------------------------------------+
|                              INTERNATIONAL EXPANSION MAP                                         |
+-----------+-----------------------+----------------------------------+---------------------------+
| Country   | Target Regulator      | Primary Skill Gate               | Legal Review Status       |
+-----------+-----------------------+----------------------------------+---------------------------+
| UK        | UKGC / FCA            | Prize Competition Exemption Sec 14| *counsel-review-required* |
| EU        | National Bodies / ESMA| 27-State Laws + MiFID II CFD rules| *counsel-review-required* |
| US        | CFTC / SEC / State AGs| CEA Off-Exchange Rules + State Law| *counsel-review-required* |
| Canada    | Provincial / Comp Bur | Sec 74.06 Skill-Testing Question | *counsel-review-required* |
| UAE       | GCERA / VARA          | GCERA Gaming License & Sharia    | *counsel-review-required* |
| Singapore | GRA / MAS             | GRA Class License + MAS CFD Rules| *counsel-review-required* |
| Australia | ASIC / ACMA           | ASIC Retail CFD Incentives Ban   | *counsel-review-required* |
+-----------+-----------------------+----------------------------------+---------------------------+
```
