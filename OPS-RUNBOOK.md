# FORTREX — Ops Runbook (Making the Service Survive)
> "The risk of the service is ours — it has to survive." This is the manual for that.
> Written for the founder (non-technical) + any agent on duty. Everything here is either
> free or a config toggle. Domain + company registration are parked for later; this
> document assumes the platform deploys at `fortrex.vercel.app` first.

## 1. The survival layers (defense in depth)

```
Layer 1  GitHub           — code survives anything (all repos, private)
Layer 2  Neon            — data survives anything (PITR restore to any second, last 7 days)
Layer 3  Vercel          — deploys are instant-rollback; a bad deploy never kills the site
Layer 4  CI (GitHub Actions) — broken code is stopped BEFORE it deploys
Layer 5  Secrets hygiene — token leaks are the #1 killer; see §3
```

**The rule that matters most:** the database is the only thing that cannot be regenerated.
Neon's point-in-time restore (dashboard → Restore) is the insurance policy. It is on by
default — do not disable it.

## 2. Uptime monitoring (10 minutes, free)

1. Go to **uptimerobot.com** (or betterstack.com) → free account.
2. Add monitor: `https://<site>/api/health` every 5 minutes.
3. Alert to: the founder's email + WhatsApp if supported.
4. `/api/health` already returns 503 when the database is unreachable — so this single
   monitor watches BOTH the site and the DB.

**When it alarms:** don't panic-first, diagnose-first — Vercel dashboard → Deployments
(rollback is instant), Neon dashboard → status. 90% of incidents are a bad deploy; the
rollback button is the fix.

## 3. Secrets hygiene (the realistic threat model)

- The GitHub personal access token: NEVER in chat text, documents, or code. Agents get it
  only through their secrets store. If it ever appears anywhere public: revoke
  (GitHub → Settings → Developer settings → Tokens) and issue a new one. Revoking is
  instant and total — this is the one breach that is fully recoverable.
- DATABASE_URL: same rule. It lives in Vercel env vars and Neon only.
- Founder checklist (do once): enable **2FA on GitHub** (Settings → Password and
  authentication), and save the recovery codes on paper. One account = the whole company.

## 4. Incident levels + response (who does what)

| Level | What it looks like | Response | Who |
|---|---|---|---|
| **SEV-3** | One user reports an error | Reproduce → fix → deploy; no urgency | Agent |
| **SEV-2** | Uptime alarm, site down | Rollback last deploy → diagnose → fix | Agent (founder informed) |
| **SEV-1** | Signups failing at launch-scale / data issue | Freeze: tell founder plainly FIRST, then fix. Neon PITR restore if data corrupted | Agent + founder |
| **SEV-0** | Token/DB secret leaked | Revoke instantly (§3), rotate, audit access log | Founder + agent, immediately |

**Law of launch day:** if something is broken, say so plainly first, fix second. Never
hide a failure. Never claim "all good" without testing the actual user path.

## 5. The 60-second recovery drills (know these by heart)

- **Bad deploy:** Vercel → Deployments → last green → ⋯ → *Promote to Production*. Done.
- **Bad data:** Neon → branch → restore point → promote. Data back to any second, last 7 days.
- **Bot storm / spam flood:** rate limiter already holds (5/IP/10min). If a human wave of
  junk arrives, the Monday report flags records for purge.
- **Agent credits exhausted mid-crisis:** the repos contain everything (HANDOVER.md,
  DEPLOYMENT.md, this file) — any successor continues cold. That's why docs live in /docs.

## 6. Support (tiny but real, from day one)

- Public support address: `fortrex.official@gmail.com` (or any Gmail the founder creates —
  2 minutes). Put it in the site footer at launch.
- Reply SLA: 24h pre-launch, 12h post-launch.
- The 5 answers that cover 90% of early questions (agent keeps these drafted in the FAQ):
  "when does it open" / "is my money safe" (yes — it never touches us) / "is it free"
  (at launch, yes) / "how does REX work" / "I didn't get my referral code".

## 7. Weekly ops rhythm (already automated — do not add work)

The **Monday 9am IST funnel report** IS the ops heartbeat: members, velocity, referrers,
countries, spam flags, health. If a Monday report fails to arrive, that itself is a SEV-2
(the automation layer is broken — check workflow status).

## 8. What "survives" does not include (honest limits)

- Neon free-tier PITR covers 7 days. Older data loss = permanent. Export a monthly CSV of
  the waitlist table (agent can do this every first Monday) into the command-center repo —
  a belt under the suspenders.
- Uptime is only as good as the monitor: if the alarm email goes to a dead inbox, there is
  no monitor.
- No amount of automation replaces the founder's private invites — the machine fills the
  seats, but the founder lights the match.
