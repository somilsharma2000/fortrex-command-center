// Password gate. The page body is only ever returned to a request that carries a valid signed cookie.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PW = process.env.REVIEW_PASSWORD || "";
const SECRET = process.env.REVIEW_COOKIE_SECRET || "";
const COOKIE = "fx_review";

function sign(v) { return crypto.createHmac("sha256", SECRET).update(v).digest("hex"); }
function ok(cookieHeader) {
  const m = /(?:^|;\s*)fx_review=([^;]+)/.exec(cookieHeader || "");
  if (!m || !SECRET) return false;
  const [exp, sig] = decodeURIComponent(m[1]).split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
function eq(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">';
const HEAD = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Private</title>' + FONTS;
function loginPage(err) {
  return HEAD + '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#050506;color:#FFF7E6;font:16px Inter,sans-serif}form{width:min(340px,88vw);border:1px solid rgba(216,166,77,.25);border-radius:14px;padding:26px;background:#111114}h1{font:700 20px "Space Grotesk";margin:0 0 4px}p{color:#9b9482;font-size:13px;margin:0 0 16px}input{width:100%;padding:12px;border-radius:8px;border:1px solid rgba(216,166,77,.3);background:#050506;color:#FFF7E6;font-size:16px}button{width:100%;margin-top:12px;padding:12px;border:0;border-radius:8px;background:#D8A64D;color:#050506;font-weight:600;font-size:15px}.e{color:#ef7c7c;font-size:13px;margin-top:10px}</style></head><body><form method="POST"><h1>FORTREX</h1><p>Private review. Enter the password.</p><input type="password" name="pw" autocomplete="current-password" autofocus><button type="submit">Open</button>' + (err ? '<div class="e">Incorrect password.</div>' : '') + '</form></body></html>';
}
const fails = new Map();
module.exports = async (req, res) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  res.setHeader("Cache-Control", "no-store");
  if (!PW || !SECRET) { res.statusCode = 503; res.setHeader("Content-Type", "text/plain"); return res.end("Not configured"); }
  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || "x";
    const f = fails.get(ip) || { n: 0, t: Date.now() };
    if (Date.now() - f.t > 600000) { f.n = 0; f.t = Date.now(); }
    if (f.n >= 8) { res.statusCode = 429; res.setHeader("Content-Type", "text/plain"); return res.end("Too many attempts. Try later."); }
    let body = ""; for await (const c of req) body += c;
    const pw = new URLSearchParams(body).get("pw") || "";
    if (eq(pw, PW)) {
      const exp = String(Date.now() + 7 * 864e5);
      res.setHeader("Set-Cookie", COOKIE + "=" + encodeURIComponent(exp + "." + sign(exp)) + "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800");
      res.statusCode = 303; res.setHeader("Location", "/"); return res.end();
    }
    f.n++; fails.set(ip, f);
    res.statusCode = 401; res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.end(loginPage(true));
  }
  if (!ok(req.headers.cookie)) { res.statusCode = 401; res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.end(loginPage(false)); }
  const body = fs.readFileSync(path.join(__dirname, "_content.html"), "utf8");
  res.statusCode = 200; res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(HEAD.replace("<title>Private</title>", "<title>FORTREX Review</title>") + "</head><body>" + body + "</body></html>");
};
