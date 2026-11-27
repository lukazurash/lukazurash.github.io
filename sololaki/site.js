// Sololaki 1907: the booking form (room or table, sent to WhatsApp), the GSAP scroll layer and the 3D key.
// The scroll layer and the key are client exceptions from the brief; both rest under reduced motion.

// ?motion in the URL plays the motion on a machine set to reduce it (for demos on such a laptop)
const forced = new URLSearchParams(location.search).has('motion');
const reduce = !forced && (matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off');
const ka = document.documentElement.lang === 'ka';

// ---- booking: system.js validates first and prevents a bad submit; a valid form is sent natively as
// GET https://wa.me/<number>?text=..., the only named field the hidden "text".
// shortcut: wa.me without a number opens the visitor's chat picker; put the hotel's number in data-whatsapp="995..." when it exists
const form = document.querySelector('form[data-whatsapp]');
if (form) {
  form.action = `https://wa.me/${(form.dataset.whatsapp || '').replace(/\D/g, '')}`;
  const submit = form.querySelector('button[type="submit"]');
  const btnText = { room: submit.firstChild.textContent, table: ka ? 'მაგიდის დაჯავშნა' : 'Book a table' };
  const setKind = kind => {
    form.dataset.kind = kind;
    form.querySelectorAll('[data-label-room]').forEach(l => { l.textContent = l.dataset[kind === 'table' ? 'labelTable' : 'labelRoom']; });
    const leave = form.querySelector('#f-leave'), arrive = form.querySelector('#f-arrive');
    leave.placeholder = kind === 'table' ? '20:00' : (ka ? '15 მაისი' : '15 May');
    arrive.placeholder = ka ? '12 მაისი' : '12 May';
    submit.firstChild.textContent = btnText[kind];
    form.querySelector(`input[name="kind"][value="${kind}"]`).checked = true;
  };
  form.addEventListener('change', e => { if (e.target.name === 'kind') setKind(e.target.value); });
  form.addEventListener('submit', e => {
    if (e.defaultPrevented) return;
    const v = n => (form.querySelector(`[data-name="${n}"]`)?.value || '').trim();
    const table = form.dataset.kind === 'table';
    form.elements.text.value = table
      ? (ka ? `გამარჯობა, მინდა მაგიდის დაჯავშნა Fig & Ember-ში.\nთარიღი: ${v('arrive')}\nდრო: ${v('leave')}\nხალხი: ${v('guests')}\nსახელი: ${v('name')}`
            : `Hello, I'd like a table at Fig & Ember.\nDate: ${v('arrive')}\nTime: ${v('leave')}\nPeople: ${v('guests')}\nName: ${v('name')}`)
      : (ka ? `გამარჯობა, მინდა ოთახის დაჯავშნა.\nოთახი: ${v('room')}\nჩამოსვლა: ${v('arrive')}\nწასვლა: ${v('leave')}\nსტუმრები: ${v('guests')}\nსახელი: ${v('name')}`
            : `Hello, I'd like to book a room.\nRoom: ${v('room')}\nArrival: ${v('arrive')}\nDeparture: ${v('leave')}\nGuests: ${v('guests')}\nName: ${v('name')}`);
  });
  // "Book this room" preselects the room; "Book a table" switches the form to a table
  document.querySelectorAll('[data-room]').forEach(a => a.addEventListener('click', () => {
    setKind('room');
    const sel = form.querySelector('#f-room');
    const opt = [...sel.options].find(o => o.text === a.dataset.room);
    if (opt) sel.value = opt.value;
  }));
  document.querySelectorAll('[data-book="table"]').forEach(a => a.addEventListener('click', () => setKind('table')));
  setKind('room');
}

// ---- GSAP scroll layer (loaded deferred from cdnjs; the page is whole without it)
function scrollLayer() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // hero: the photograph slowly zooms and darkens, the headline lifts away as the hero leaves
  const hero = document.querySelector('.hero--place');
  if (hero) {
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .to(hero.querySelector('.hero__bg'), { scale: 1.12, filter: 'brightness(.62)', ease: 'none' }, 0)
      .to(hero.querySelector('h1'), { yPercent: -40, opacity: 0.2, ease: 'none' }, 0);
  }

  // rooms: on a desktop the four rooms become a sideways track, pinned with sticky inside a two-screen section
  mm.add('(min-width: 1024px) and (min-height: 640px)', () => {
    const sec = document.querySelector('#rooms'), track = sec?.querySelector('.rooms__track');
    if (!track) return;
    sec.classList.add('is-track');
    const dist = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    const tw = gsap.to(track, { x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true } });
    ScrollTrigger.refresh();
    return () => { tw.scrollTrigger?.kill(); tw.kill(); gsap.set(track, { clearProps: 'transform' }); sec.classList.remove('is-track'); };
  });
}
if (document.readyState === 'complete') scrollLayer(); else addEventListener('load', scrollLayer);

// ---- the 3D brass key (three.js from jsdelivr, only on a desktop; a still frame under reduced motion)
const canvas = document.querySelector('.key3d');
if (canvas && matchMedia('(min-width: 1024px)').matches) {
  import('./key.js').then(m => m.mountKey(canvas, { still: reduce })).catch(() => { canvas.parentElement.hidden = true; });
}
