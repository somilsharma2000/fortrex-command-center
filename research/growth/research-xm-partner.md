# XM Group (xm.com) Partner/Affiliate Program Research Report
**Target Platform Integration:** FORTREX Competition Platform  
**Date:** September 2026  
**Status:** Comprehensive Analysis Completed  

---

## Executive Summary
This report analyzes the XM Group (`xm.com` / `partners.xm.com`) Partner/Affiliate Program to evaluate feasibility, commission models, API/reporting capabilities, compliance restrictions, and contest infrastructure for integration with the FORTREX competition platform.

---

## 1. Tracking Links & Partner/Affiliate ID Generation
* **How Partners Register & Get ID:**  
  To become an XM Partner, an applicant submits the online *Affiliates Application Form* along with compliance identity/business verification documents (Proof of Identity, Proof of Residence, Corporate Registration/UBO if applicable). Upon approval, XM assigns a primary **Affiliate Account** and unique **Partner/Affiliate ID**.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 1, 2.1) — [XM Affiliation Agreement PDF](https://cloud.xm-cdn.com/static/pdf/System-PDFs/XM-Affiliation-Agreement.pdf) | [XM Partner Types](https://partners.xm.com/partner-types)

* **Tracking Link Infrastructure:**  
  Inside the XM Partner Section ("Affiliate Section"), partners can generate custom **Tracker IDs** and construct unique **Tracking URLs** (Tracker URLs), graphics banners, text links, and QR codes. When a prospective trader clicks a Tracker URL, XM sets tracking identifiers connecting all subsequent trading accounts opened by that client to the partner's Tracker ID.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 1, 3.9) | [XM Partner Advantages](https://partners.xm.com/advantages)

---

## 2. API & Reporting Capabilities for MT5 Account Verification
* **Dashboard Analytics & Sub-Affiliate Reporting:**  
  XM provides a real-time partner dashboard (*Report*) detailing campaign statistics, impressions, registered clients, qualification milestones (minimum deposit and round-lot trading progress), commission calculations, and second-tier sub-affiliate earnings.
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans) | XM Affiliation Agreement (Sec. 1, 3.9)

* **API, Webhooks, Postbacks & AppsFlyer:**  
  XM officially advertises integration support for campaign and mobile attribution including **AppsFlyer**, **APIs**, and **Webhooks** in its partner program materials.
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Partner Advantages](https://partners.xm.com/advantages)

* **Verification of MT5 Accounts Registered Under Partner Code:**  
  * **Default Dashboard Reports:** Standard partner reports show client registration dates, country, qualification status, traded lot volumes, and commission earned. Due to privacy and financial regulatory obligations (GDPR, MiFID II, FSC regulations), standard affiliate reports anonymize or group client data rather than exposing unmasked personal client details or raw MT5 login credentials to external third parties.
  * *Status:* **[VERIFIED/INFERRED]** (Dashboard tracking verified; privacy constraints on raw client PII inferred from privacy policies and Affiliation Agreement Sec. 1, 3.9, 8.6).
  * **Enterprise / Custom IB API Postbacks:** To automatically map and verify whether a specific MT5 account number registered under a FORTREX partner code, FORTREX must request a custom API/postback setup or institutional Introducing Broker (IB) reporting integration through a dedicated XM Partner Relations Manager (`ib@xm.com`).

---

## 3. Commission Structure Types & Official Figures
XM offers multiple competitive commission models tailored to partner traffic types:

1. **CPA (Cost Per Acquisition) Plan:**  
   * **Figures:** Up to **$1,000 CPA per active client** globally (up to **$650 CPA** for clients residing in regulated regions like the UK, EU, and Australia).  
   * **Qualification Criteria:** A client becomes a "Qualified Introduced Client" when they deposit at least **$150** (or currency equivalent) and trade at least **3 standard round lots** (or 300 micro lots) within 12 months of registration.
   * *Status:* **[VERIFIED]**  
   * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans) | XM Affiliation Agreement (Appendix 1)

2. **Lot Rebates / Revenue Share (Spread Share / Profit Share):**  
   * **Figures:** Up to **$90 per lot** instant profit share / spread rebate on trades executed by referred clients across MT4/MT5 accounts.  
   * **Payouts:** Paid daily into the partner E-wallet with instant 24/7 withdrawal support (online bank transfer, Skrill, Neteller, USDT).
   * *Status:* **[VERIFIED]**  
   * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans) | [XM Partner Advantages](https://partners.xm.com/advantages)

3. **CPL (Cost Per Lead):**  
   * Available for select digital marketing specialists and high-volume media partners upon customized agreement with XM.
   * *Status:* **[VERIFIED]**  
   * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans)

4. **Sub-Affiliate Program:**  
   * **Figures:** **10% commission** earned on all earnings generated by second-tier sub-affiliates, with no upper cap.
   * *Status:* **[VERIFIED]**  
   * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans)

5. **Partners Rewards Program:**  
   * Tiered rewards system where referral trading activity accumulates redeemable points for up to **$150,000** in extra cash bonuses.
   * *Status:* **[VERIFIED]**  
   * *Source:* [XM Payment Plans](https://partners.xm.com/paymentplans)

---

## 4. Restrictions & Compliance Rules
* **Restricted Jurisdictions (Country Blacklist):**  
  * **Core Non-Serviced Regions:** XM Group **does not offer services to residents or citizens of the United States of America, Canada, Israel, and the Islamic Republic of Iran** (and UN/OFAC sanctioned countries). XM cannot accept client account registrations from these jurisdictions.
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Regulation & Disclosures](https://www.xm.com/regulation)
  * **India Status:** India is **not** on XM's global restricted country blacklist (XM Global Limited accepts Indian traders under FSC Belize regulation). However, promotions targeting Indian residents must comply with local currency/cross-border regulations (e.g., RBI guidelines).
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Regulation](https://www.xm.com/regulation)

* **Regional Marketing Prohibitions for Affiliates:**  
  * Affiliates are strictly prohibited from soliciting or directing electronic marketing/telephone communications to residents of **Belgium, Poland, France, Spain, and Portugal**.  
  * German-language affiliate websites must display a standardized, updated CFD risk warning with dynamic 12-month loss percentages.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Appendix 1)

* **Rules on Contests, Incentives & Bonus-Sharing:**  
  * **Prohibition on Rebate/Commission Sharing (Kickbacks):** Under XM's *Fraud Traffic* terms, "offers to share the Affiliate’s Commission (i.e. rebates)" directly with referred clients are explicitly banned. Partners cannot use direct commission-sharing or monetary kickbacks to bribe or entice traders to open accounts.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 1 - Fraud Traffic)
  * **No Investment Advice or Portfolio Management:** Affiliates must not offer investment advice, influence trading decisions, manage client accounts, or transmit client funds.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 8.1e, h, i, j)

* **Marketing Compliance & Brand Protection:**  
  * **PPC Bidding Restrictions:** Bidding on XM brand names, trademarks, variations, or terms such as "XM login" on search engines (Google, Bing) or social media advertising is strictly prohibited. Violation leads to immediate termination and commission forfeiture.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 7)
  * **Prior Approval:** All promotional materials, landing pages, and content referencing XM must receive prior written approval from XM.
  * *Status:* **[VERIFIED]**  
  * *Source:* XM Affiliation Agreement (Sec. 4.2)

---

## 5. XM Official Demo & Real Contests
* **XM Native Competitions:**  
  XM operates its own official trading competitions ecosystem hosted on the XM platform, featuring **over $100,000 in cash prizes every month**.
  * **Demo Weekly Competitions:** Free to enter for demo account holders, virtual trading funds, **$25,000 withdrawable cash prize pool**.
  * **$5,000 Daily Arena:** Paid entry ($5 fee), **$1,000 to $5,000 withdrawable cash prize pool**.
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Social Competitions](https://partners.xm.com/social-competitions)

* **Partner Private Competitions:**  
  XM enables partners to set up **customized private competitions** specifically for their referred client network through the XM partner platform.
  * *Status:* **[VERIFIED]**  
  * *Source:* [XM Social Competitions](https://partners.xm.com/social-competitions)

---

## 6. Recommended Verification Method for FORTREX (Automatic vs. Manual)

To verify that FORTREX platform users have registered an MT5 account under FORTREX’s XM Partner Code, two implementation paths exist:

### Option A: Automatic Verification (Recommended for Scale)
* **Mechanism:** Integrate via custom XM Webhook/Postback API or custom IB server reporting feed provided by XM's Partner Relations Manager.
* **Flow:**  
  1. FORTREX app appends the partner tracker parameter (`?gclid=` or `tracker_id`) to XM registration links.  
  2. Upon successful MT5 registration and initial trade/deposit event, XM fires an automated postback/webhook payload to FORTREX containing `tracker_id`, `client_id` (or hashed identifier), and qualification timestamp.  
  3. FORTREX automatically validates and unlocks the competition entry for the user.
* **Prerequisites:** Requires signing an IB/Partner enterprise agreement with XM (`ib@xm.com`) and securing custom API postback endpoints from XM engineering.

### Option B: Manual / Hybrid Verification (Fallback / Instant Launch)
* **Mechanism:** User self-reporting + CSV Export Reconciliation.
* **Flow:**  
  1. User registers at XM via FORTREX tracking link and inputs their MT5 Account ID into FORTREX.  
  2. FORTREX admin exports daily/weekly performance CSV reports from the XM Partner Dashboard (*Report* section).  
  3. FORTREX admin reconciles registered MT5 account numbers/Tracker IDs against user submissions to confirm qualification status before awarding competition prizes.
* **Recommendation:** Start with **Hybrid/Manual Verification** for initial pilot competitions, while simultaneously establishing a formal IB relationship with XM (`ib@xm.com`) to enable **Automatic Postback API Verification** for full automation.

---

## Reference URLs
1. XM Partner Types & Portal: `https://partners.xm.com/partner-types`
2. XM Payment Plans & Commission Figures: `https://partners.xm.com/paymentplans`
3. XM Partner Advantages & API/Webhook Mentions: `https://partners.xm.com/advantages`
4. XM Social Competitions Hub: `https://partners.xm.com/social-competitions`
5. XM Group Regulation & Restricted Regions: `https://www.xm.com/regulation`
6. XM Official Affiliation Agreement Legal PDF: `https://cloud.xm-cdn.com/static/pdf/System-PDFs/XM-Affiliation-Agreement.pdf`
