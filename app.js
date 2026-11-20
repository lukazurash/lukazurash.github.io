// Fill these in before publishing. Empty ones are hidden.
const CONTACT = {
  whatsapp: "995597060888", // country code, no +
  messenger: "",
  email: "lukazurashvili9@gmail.com",
};

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
document.documentElement.classList.remove("no-js");

/* ---------- Language (Georgian text lives in the HTML, English here) ---------- */
const EN = {
  skip: "Skip to work", brand: "Luka",
  nWork: "Work", nFeat: "What you get", nProc: "Process", nCta: "Get in touch",
  eyebrow: "Cafés · Flower shops · Salons",
  h1: "A website that brings you customers.",
  lead: "I'm Luka. I build fast, beautiful websites for small businesses in Georgia: menus, prices, online booking, and orders that land straight in your WhatsApp.",
  ctaWork: "See my work", ctaTalk: "Get in touch",
  wTitle: "Work", wSub: "Three live sites. Open one and try it the way your customers would.",
  k1: "Café & restaurant", d1: "Menu, events and online table booking. Every booking goes straight to the owner's phone.",
  k2: "Flower shop", d2: "A bouquet catalogue with prices, a build-your-own bouquet, and WhatsApp orders. The owner changes prices, photos and every text from an admin panel.",
  k3: "Salon & barbershop", d3: "Online booking that only offers free times: the site keeps each master's diary and never books one slot twice. In the admin panel the owner sees the bookings and changes prices, the team and every text.",
  c_menu: "Menu", c_book: "Table booking", c_cat: "Catalogue", c_deliv: "Delivery", c_wa: "WhatsApp orders", c_admin: "Admin panel",
  c_price: "Prices", c_masters: "Team", c_online: "Online booking", open: "Open the live site",
  fTitle: "What you get", fSub: "Everything a small business needs. Nothing it doesn't.",
  f1t: "Perfect on phones", f1: "Most customers arrive on their phone. Your site loads fast on every screen.",
  f2t: "Georgian & English", f2: "For locals and tourists alike. One tap to switch language.",
  f3t: "Bookings to WhatsApp", f3: "Nothing new to learn: orders arrive in the WhatsApp you already use.",
  f4t: "Found on Google", f4: "Map, opening hours and the right details so Google, and customers, find you easily.",
  f5t: "Your own domain", f5: "Something like yourname.ge. I take care of hosting and the domain.",
  f6t: "Changes anytime", f6: "New price, photo or hours? Message me and I'll update the site.",
  pTitle: "How it works", pSub: "Three simple steps, in about a week.",
  s1t: "Write to me", s1: "Tell me about your business and send your photos and prices.",
  s2t: "I build it", s2: "In about a week you see a ready version, and we polish it together.",
  s3t: "Launch", s3: "It goes live on your domain, and I keep it up to date after that.",
  cTitle: "Let's build yours.", cSub: "Write to me and I'll gladly walk you through the price and details.",
  foot: "Luka · Tbilisi, Georgia",
  wa: "WhatsApp", ms: "Messenger", em: "Email", empty: "Contact details coming soon.",
  title: "Luka — Websites for cafés, flower shops & salons",
};
const KA = { wa: "WhatsApp", ms: "Messenger", em: "ელფოსტა", empty: "საკონტაქტო ინფორმაცია მალე დაემატება.", title: document.title };
$$("[data-i18n]").forEach(el => KA[el.dataset.i18n] ??= el.textContent);

let lang = "ka";
try { lang = localStorage.getItem("lk-lang") || "ka"; } catch {}
const t = k => (lang === "en" ? EN : KA)[k] ?? KA[k];

const icons = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4.1-4.8-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.2 1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
  ms: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.4 2 2 6.1 2 11.7c0 2.9 1.2 5.5 3.2 7.3v3.5l3-1.7c1.2.3 2.4.5 3.8.5 5.6 0 10-4.1 10-9.6S17.6 2 12 2zm1 12.9-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.5 5.8z"/></svg>',
  em: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
};

// "995597060888" -> "597 06 08 88"
const waNumber = CONTACT.whatsapp.slice(3).replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
// the "Get in touch" buttons open WhatsApp directly (without JS they still scroll to #contact)
if (CONTACT.whatsapp) $$('a[href="#contact"]').forEach(a => { a.href = `https://wa.me/${CONTACT.whatsapp}`; a.target = "_blank"; a.rel = "noopener"; });

function renderContact() {
  const items = [
    CONTACT.whatsapp && { k: "wa", cls: "btn btn-accent", href: `https://wa.me/${CONTACT.whatsapp}` },
    CONTACT.messenger && { k: "ms", cls: "btn", href: CONTACT.messenger },
    CONTACT.email && { k: "em", cls: "btn btn-ghost", href: `mailto:${CONTACT.email}` },
  ].filter(Boolean);
  $("#contactBtns").innerHTML = items.length
    ? items.map(i => `<a class="${i.cls}" href="${i.href}" target="_blank" rel="noopener">${icons[i.k]}<span>${i.k === "wa" ? t(i.k) + " · " + waNumber : i.k === "em" ? CONTACT.email : t(i.k)}</span></a>`).join("")
    : `<p class="empty">${t("empty")}</p>`;
}

function applyLang() {
  document.documentElement.lang = lang;
  document.title = t("title");
  $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  $("#lang").textContent = lang === "ka" ? "EN" : "ქარ";
  $("#lang").setAttribute("aria-label", lang === "ka" ? "Switch to English" : "ქართულზე გადართვა");
  renderContact();
}
$("#lang").addEventListener("click", () => {
  lang = lang === "ka" ? "en" : "ka";
  try { localStorage.setItem("lk-lang", lang); } catch {}
  applyLang();
});
applyLang();

/* ---------- Nav edge only once content scrolls beneath it ---------- */
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 4);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });

/* ---------- Hero parallax: follows the pointer with a critically damped spring ---------- */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const stack = $("#stack");
if (stack && !calm && finePointer) {
  const layers = [...stack.querySelectorAll(".frame")].map(el => ({ el, d: +el.dataset.depth, x: 0, y: 0, vx: 0, vy: 0 }));
  let tx = 0, ty = 0, raf = 0, last = 0;
  // Spring with damping ratio 1.0, response 0.4s: always starts from the current value, so it can be interrupted any time.
  const w = 2 * Math.PI / .4;
  const step = now => {
    const dt = Math.min((now - (last || now)) / 1000, 1 / 30); last = now;
    let moving = false;
    for (const L of layers) {
      for (const [p, v, target] of [["x", "vx", tx * L.d], ["y", "vy", ty * L.d]]) {
        const a = -w * w * (L[p] - target) - 2 * w * L[v];
        L[v] += a * dt; L[p] += L[v] * dt;
        if (Math.abs(L[p] - target) > .05 || Math.abs(L[v]) > .05) moving = true;
      }
      L.el.style.setProperty("--x", `${L.x.toFixed(2)}px`);
      L.el.style.setProperty("--y", `${L.y.toFixed(2)}px`);
    }
    raf = moving ? requestAnimationFrame(step) : 0;
    if (!raf) last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
  addEventListener("pointermove", e => {
    tx = (e.clientX / innerWidth - .5) * 2;   // -1..1
    ty = (e.clientY / innerHeight - .5) * 2;
    kick();
  }, { passive: true });
  document.addEventListener("pointerleave", () => { tx = ty = 0; kick(); });
}
