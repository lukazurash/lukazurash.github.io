// Booking requests go to the guesthouse's WhatsApp with the dates written in.
// system.js validates first and calls preventDefault on a bad form; a valid form is sent natively as
// GET https://wa.me/<number>?text=..., the only named field being the hidden "text" this fills in.
// shortcut: wa.me without a number opens the visitor's chat picker; put the client's number in data-whatsapp="995..." when it exists
document.querySelectorAll('form[data-whatsapp]').forEach(form => {
  const num = (form.dataset.whatsapp || '').replace(/\D/g, '');
  form.action = `https://wa.me/${num}`;
  form.addEventListener('submit', e => {
    if (e.defaultPrevented) return;
    const v = n => (form.querySelector(`[data-name="${n}"]`)?.value || '').trim();
    const ka = document.documentElement.lang === 'ka';
    form.elements.text.value = ka
      ? `გამარჯობა, მინდა ოთახის დაჯავშნა.\nოთახი: ${v('room')}\nჩამოსვლა: ${v('arrive')}\nწასვლა: ${v('leave')}\nსტუმრები: ${v('guests')}\nსახელი: ${v('name')}`
      : `Hello, I'd like to book a room.\nRoom: ${v('room')}\nArrival: ${v('arrive')}\nDeparture: ${v('leave')}\nGuests: ${v('guests')}\nName: ${v('name')}`;
  });
});

// "Book this room" preselects that room in the form
document.querySelectorAll('[data-room]').forEach(a => a.addEventListener('click', () => {
  const sel = document.getElementById('f-room');
  const opt = sel && [...sel.options].find(o => o.text === a.dataset.room);
  if (opt) sel.value = opt.value;
}));
