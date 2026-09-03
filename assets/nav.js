// Shared header + countdown strip, injected into every page.
const API_URL = "https://miro-77d5beab.base44.app/functions/commandCenterApi";
const LAUNCH_TARGET = new Date("2026-11-07T00:00:00+05:30").getTime();

function renderNav(active) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", href: "index.html" },
    { id: "brand", label: "Brand Kit", href: "brand-kit.html" },
    { id: "integrations", label: "Integrations", href: "integrations.html" },
  ];
  const tabsHtml = tabs.map(t =>
    `<a class="ghost-btn${t.id === active ? " active" : ""}" href="${t.href}">${t.label}</a>`
  ).join("");

  document.getElementById("app-nav").innerHTML = `
    <header class="nav glass">
      <div class="nav-brand">
        <img src="brand-kit/fortrex-crown.png" alt="FORTREX crown" class="crown">
        <div>
          <div class="nav-wordmark">FORTREX <span>FX</span></div>
          <div class="nav-sub">Command Center / 001</div>
        </div>
      </div>
      <div class="nav-tabs">
        ${tabsHtml}
        <a class="ghost-btn" href="https://somilsharma2000.github.io/fortrexfxmanusgold/">Public Site ↗</a>
      </div>
    </header>
    <div class="glass count-strip" style="margin-top:14px">
      <span class="label" style="margin-right:6px">DOORS OPEN 11.07</span>
      <span class="tile" id="cd-d">--<span class="unit">D</span></span>
      <span class="tile" id="cd-h">--<span class="unit">H</span></span>
      <span class="tile" id="cd-m">--<span class="unit">M</span></span>
      <span class="tile" id="cd-s">--<span class="unit">S</span></span>
    </div>
  `;
  tickCountdown();
  setInterval(tickCountdown, 1000);
}

function tickCountdown() {
  const d = LAUNCH_TARGET - Date.now();
  const pad = n => (n < 10 ? "0" + n : n);
  const dEl = document.getElementById("cd-d");
  if (!dEl) return;
  if (d < 0) {
    dEl.parentElement.innerHTML = '<span class="tile">The doors are open</span>';
    return;
  }
  document.getElementById("cd-d").innerHTML = pad(Math.floor(d / 86400000)) + '<span class="unit">D</span>';
  document.getElementById("cd-h").innerHTML = pad(Math.floor((d % 86400000) / 3600000)) + '<span class="unit">H</span>';
  document.getElementById("cd-m").innerHTML = pad(Math.floor((d % 3600000) / 60000)) + '<span class="unit">M</span>';
  document.getElementById("cd-s").innerHTML = pad(Math.floor((d % 60000) / 1000)) + '<span class="unit">S</span>';
}

async function callApi(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  return res.json();
}

function sparkline(values, w = 160, h = 28) {
  if (!values || values.length < 2) return `<svg class="spark" viewBox="0 0 ${w} ${h}"></svg>`;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <polyline points="${pts}" fill="none" stroke="#C9973E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
  </svg>`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  return Math.floor(hrs / 24) + "d ago";
}
