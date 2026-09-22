/**
 * Client demo screenshot set -> demoImages/  (zero-dependency CDP driver)
 *
 * Launches headless Edge with remote debugging and captures the key pages at
 * desktop (1440x900), mobile portrait (390x844) and mobile landscape
 * (844x390), at deviceScaleFactor 2 for crisp client viewing.
 *
 * Usage: node scripts/capture-demo.mjs   (dev server must run on :3000)
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

const EDGE =
  process.env.EDGE_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9333;
const BASE = process.env.DEMO_BASE_URL || "http://127.0.0.1:3000";
const OUT = "demoImages";
const PROFILE = path.join(process.env.TEMP || "/tmp", `edge-demo-cdp-${Date.now()}`);

const DESKTOP = { width: 1440, height: 900 };
const PORTRAIT = { width: 390, height: 844 };
const LANDSCAPE = { width: 844, height: 390 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shots = [
  // ---- Desktop ----
  { name: "01-desktop-home.png", vp: DESKTOP, url: "/", prep: "top" },
  { name: "02-desktop-services.png", vp: DESKTOP, url: "/services", prep: "top" },
  { name: "03-desktop-gallery.png", vp: DESKTOP, url: "/", prep: "scroll:#gallery, #menu" },
  { name: "04-desktop-reviews.png", vp: DESKTOP, url: "/", prep: "scroll:#reviews" },
  { name: "05-desktop-service-detail.png", vp: DESKTOP, url: "/services/hair-cut", prep: "top" },
  { name: "06-desktop-booking-modal.png", vp: DESKTOP, url: "/", prep: "modal" },
  { name: "07-desktop-blog.png", vp: DESKTOP, url: "/blog", prep: "top" },

  // ---- Mobile portrait ----
  { name: "08-mobile-portrait-home.png", vp: PORTRAIT, url: "/", prep: "top" },
  { name: "09-mobile-portrait-services.png", vp: PORTRAIT, url: "/services", prep: "top" },
  { name: "10-mobile-portrait-service-detail.png", vp: PORTRAIT, url: "/services/hair-cut", prep: "top" },
  { name: "11-mobile-portrait-booking-modal.png", vp: PORTRAIT, url: "/", prep: "modal" },
  { name: "12-mobile-portrait-reviews.png", vp: PORTRAIT, url: "/", prep: "scroll:#reviews" },

  // ---- Mobile landscape ----
  { name: "13-mobile-landscape-home.png", vp: LANDSCAPE, url: "/", prep: "top" },
  { name: "14-mobile-landscape-services.png", vp: LANDSCAPE, url: "/services", prep: "top" },
  { name: "15-mobile-landscape-service-detail.png", vp: LANDSCAPE, url: "/services/hair-cut", prep: "top" },
];

mkdirSync(OUT, { recursive: true });

// --- launch headless Edge with CDP ---
const proc = spawn(
  EDGE,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--disable-extensions",
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true }
);

async function browserWsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const j = await r.json();
      return j.webSocketDebuggerUrl;
    } catch {
      await sleep(300);
    }
  }
  throw new Error("CDP endpoint never came up");
}

const ws = new WebSocket(await browserWsUrl());
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = (e) => rej(new Error("ws error"));
});

let nextId = 1;
const pending = new Map();
ws.onmessage = (ev) => {
  let m;
  try { m = JSON.parse(ev.data); } catch { return; }
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) rej(new Error(m.error.message));
    else res(m.result);
  }
};
function send(method, params = {}, sessionId) {
  return new Promise((res, rej) => {
    const id = nextId++;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);

async function evalJs(expr) {
  const r = await send(
    "Runtime.evaluate",
    { expression: expr, awaitPromise: true, returnByValue: true },
    sessionId
  );
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text || "eval failed");
  return r.result && r.result.value;
}

async function waitReady(timeoutMs = 20000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const state = await evalJs("document.readyState").catch(() => null);
    if (state === "complete") return;
    await sleep(250);
  }
}

async function prep(kind) {
  if (kind === "top") {
    await evalJs("window.scrollTo({top:0,behavior:'instant'}); true");
    return;
  }
  if (kind.startsWith("scroll:")) {
    const sel = kind.slice(7);
    await evalJs(
      `(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (el) el.scrollIntoView({block:'start',behavior:'instant'}); return true; })()`
    );
    return;
  }
  if (kind === "modal") {
    await evalJs(
      "(() => { const b=[...document.querySelectorAll('button')].find(x=>/Book Appointment/i.test(x.textContent||'')); if(b) b.click(); return true; })()"
    );
    const t0 = Date.now();
    let open = false;
    while (Date.now() - t0 < 8000) {
      open = await evalJs("!!document.querySelector('#modal-name, #modal-service')").catch(() => false);
      if (open) break;
      await sleep(250);
    }
    if (!open) throw new Error("booking modal did not open — refusing to capture a wrong shot");
    await sleep(500);
  }
}

let ok = 0;
let failed = 0;
const only=process.env.SHOTS;
const list=only?shots.filter(x=>x.prep===only):shots;
for (const shot of list) {
  try {
    await send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: shot.vp.width,
        height: shot.vp.height,
        deviceScaleFactor: 2,
        mobile: shot.vp.width < 768,
        screenWidth: shot.vp.width,
        screenHeight: shot.vp.height,
      },
      sessionId
    );
    await send("Page.navigate", { url: BASE + shot.url }, sessionId);
    await waitReady();
    await sleep(1500); // fonts + hero image + hydration
    await prep(shot.prep);
    await sleep(500);
    const shotRes = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync(path.join(OUT, shot.name), Buffer.from(shotRes.data, "base64"));
    console.log(`OK   ${shot.name}`);
    ok++;
  } catch (err) {
    console.error(`FAIL ${shot.name}: ${err.message}`);
    failed++;
  }
  await sleep(1500); // stay under the API rate limit (30 req/min/IP)
}

try { await send("Browser.close"); } catch { /* ignore */ }
try { proc.kill(); } catch { /* ignore */ }
try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* ignore */ }

console.log(`\nDone: ${ok} captured, ${failed} failed -> ${OUT}/`);
if (failed > 0) process.exit(1);
