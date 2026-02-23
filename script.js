/* ============================================
   Property Inspection — script.js
   ============================================ */

var EJ_KEY  = '_yAz4PMpNoZOAzlbu';
var EJ_SVC  = 'service_9ouz7yj';
var EJ_TPL  = 'template_n1sh6jm';

/* ── CURSOR ── */
var cur = document.getElementById('cursor');
var fol = document.getElementById('cursorFollower');
var mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cur.style.transform = 'translate(' + (mx-4) + 'px,' + (my-4) + 'px)';
});
(function tick() {
  fx += (mx-fx)*0.12; fy += (my-fy)*0.12;
  fol.style.transform = 'translate(' + (fx-18) + 'px,' + (fy-18) + 'px)';
  requestAnimationFrame(tick);
})();

/* ── HEADER SCROLL ── */
var hdr = document.getElementById('header');
window.addEventListener('scroll', function() {
  hdr.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE NAV ── */
var burger = document.getElementById('hamburger');
var mnav = document.getElementById('mobileNav');
burger.addEventListener('click', function() {
  burger.classList.toggle('open');
  mnav.classList.toggle('open');
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var h = this.getAttribute('href');
    if (h.length > 1) {
      e.preventDefault();
      // Close mobile nav if open
      burger.classList.remove('open');
      mnav.classList.remove('open');
      var t = document.querySelector(h);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── KEYFRAMES ── */
var ks = document.createElement('style');
ks.textContent = '@keyframes spin{to{transform:rotate(360deg);}}@keyframes ezFadeIn{from{opacity:0}to{opacity:1}}@keyframes ezSlideUp{from{opacity:0;transform:translateY(44px) scale(0.94)}to{opacity:1;transform:translateY(0) scale(1)}}';
document.head.appendChild(ks);

/* ── REVEAL ANIMATIONS ── */
var co = new IntersectionObserver(function(es) {
  es.forEach(function(e) {
    if (e.isIntersecting) {
      setTimeout(function(){ e.target.classList.add('visible'); }, parseInt(e.target.dataset.delay || 0));
      co.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.service-card').forEach(function(c) { co.observe(c); });

function setupReveal(sel) {
  var o = new IntersectionObserver(function(es) {
    es.forEach(function(e, i) {
      if (e.isIntersecting) {
        setTimeout(function(){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }, i * 90);
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(sel).forEach(function(el) {
    el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
    o.observe(el);
  });
}
setupReveal('.price-card');
setupReveal('.contact-card');

/* ── MIN DATE ── */
var di = document.getElementById('fdate');
if (di) {
  var tm = new Date(); tm.setDate(tm.getDate() + 1);
  di.min = tm.toISOString().split('T')[0];
}

/* ── TOAST ── */
function toast(msg, type) {
  var prev = document.querySelector('.ez-toast');
  if (prev) prev.remove();
  var t = document.createElement('div');
  t.className = 'ez-toast'; t.textContent = msg;
  var c = ({ error: ['#e74c3c','#fff'], success: ['#27ae60','#fff'], info: ['#F5C518','#000'] })[type || 'info'] || ['#F5C518','#000'];
  Object.assign(t.style, {
    position: 'fixed', bottom: '100px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: c[0], color: c[1], padding: '14px 28px',
    borderRadius: '12px', fontFamily: "'Outfit',sans-serif",
    fontWeight: '600', fontSize: '0.9rem', zIndex: '99998',
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)', opacity: '0',
    transition: 'all 0.3s ease', maxWidth: '440px',
    textAlign: 'center', pointerEvents: 'none', lineHeight: '1.5'
  });
  document.body.appendChild(t);
  requestAnimationFrame(function() {
    t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(function() {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(function() { t.remove(); }, 350);
  }, 4500);
}

/* ── SUCCESS MODAL ── */
function showSuccess() {
  var prev = document.getElementById('ezSuccess');
  if (prev) prev.remove();

  var ov = document.createElement('div');
  ov.id = 'ezSuccess';
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:20px;animation:ezFadeIn 0.25s ease;';

  var card = document.createElement('div');
  card.style.cssText = 'background:#1a2033;border:1px solid rgba(245,197,24,0.35);border-radius:24px;padding:52px 40px 44px;max-width:460px;width:100%;text-align:center;position:relative;box-shadow:0 40px 100px rgba(0,0,0,0.7);animation:ezSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1);';

  var xBtn = document.createElement('button');
  xBtn.innerHTML = '&times;';
  xBtn.style.cssText = 'position:absolute;top:16px;right:20px;background:none;border:none;cursor:pointer;color:#7a8399;font-size:2rem;line-height:1;transition:color 0.2s;';
  xBtn.onmouseover = function() { xBtn.style.color = '#F5C518'; };
  xBtn.onmouseout  = function() { xBtn.style.color = '#7a8399'; };

  var ic = document.createElement('div');
  ic.style.cssText = 'width:80px;height:80px;margin:0 auto 24px;background:rgba(245,197,24,0.12);border:2px solid rgba(245,197,24,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;';
  ic.innerHTML = '<svg width="36" height="54" viewBox="0 0 40 60" fill="none"><polygon points="22,0 6,34 18,34 14,60 36,22 24,22" fill="#F5C518"/></svg>';

  var h2 = document.createElement('h2');
  h2.textContent = 'Booking Sent!';
  h2.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:2.4rem;letter-spacing:0.05em;color:#F5C518;margin-bottom:12px;";

  var msg = document.createElement('p');
  msg.innerHTML = 'Your booking request has been received.<br>We will contact you shortly to confirm your appointment.';
  msg.style.cssText = 'color:#a0aabe;font-size:0.95rem;line-height:1.7;margin-bottom:28px;';

  var divEl = document.createElement('div');
  divEl.style.cssText = 'height:1px;background:rgba(245,197,24,0.12);margin-bottom:24px;';

  var ql = document.createElement('p');
  ql.textContent = "Need to reach us sooner? We're always available:";
  ql.style.cssText = 'color:#7a8399;font-size:0.82rem;margin-bottom:18px;';

  var cr = document.createElement('div');
  cr.style.cssText = 'display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;';

  var callA = document.createElement('a');
  callA.href = 'tel:0754320577'; callA.textContent = 'Call Us';
  callA.style.cssText = "display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:rgba(245,197,24,0.1);border:1px solid rgba(245,197,24,0.25);border-radius:10px;color:#F5C518;font-family:'Outfit',sans-serif;font-weight:600;font-size:0.85rem;text-decoration:none;transition:all 0.2s;";
  callA.onmouseover = function() { callA.style.background = 'rgba(245,197,24,0.2)'; };
  callA.onmouseout  = function() { callA.style.background = 'rgba(245,197,24,0.1)'; };

  var waA = document.createElement('a');
  waA.href = 'https://wa.me/27754320577'; waA.target = '_blank'; waA.rel = 'noopener noreferrer';
  waA.textContent = 'WhatsApp';
  waA.style.cssText = "display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.25);border-radius:10px;color:#25D366;font-family:'Outfit',sans-serif;font-weight:600;font-size:0.85rem;text-decoration:none;transition:all 0.2s;";
  waA.onmouseover = function() { waA.style.background = 'rgba(37,211,102,0.2)'; };
  waA.onmouseout  = function() { waA.style.background = 'rgba(37,211,102,0.1)'; };
  cr.appendChild(callA); cr.appendChild(waA);

  var closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.cssText = "width:100%;padding:16px;background:#F5C518;color:#000;font-family:'Outfit',sans-serif;font-weight:700;font-size:0.95rem;border:none;border-radius:12px;cursor:pointer;letter-spacing:0.03em;transition:all 0.2s;";
  closeBtn.onmouseover = function() { closeBtn.style.background = '#FFE066'; closeBtn.style.transform = 'translateY(-2px)'; };
  closeBtn.onmouseout  = function() { closeBtn.style.background = '#F5C518'; closeBtn.style.transform = 'translateY(0)'; };

  card.appendChild(xBtn); card.appendChild(ic); card.appendChild(h2);
  card.appendChild(msg); card.appendChild(divEl); card.appendChild(ql);
  card.appendChild(cr); card.appendChild(closeBtn);
  ov.appendChild(card);
  document.body.appendChild(ov);
  document.getElementById('bookingForm').reset();

  function closeModal() { ov.remove(); }
  xBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  ov.addEventListener('click', function(e) { if (e.target === ov) closeModal(); });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); }
  });
}

/* ── SUBMIT ── */
document.getElementById('submitBtn').addEventListener('click', function() {
  var name     = document.getElementById('fname').value.trim();
  var phone    = document.getElementById('fphone').value.trim();
  var email    = document.getElementById('femail').value.trim();
  var address  = document.getElementById('faddress').value.trim();
  var date     = document.getElementById('fdate').value;
  var time     = document.getElementById('ftime').value;
  var notes    = document.getElementById('fnotes').value.trim();
  var services = Array.from(document.querySelectorAll('.svc-check:checked')).map(function(c) { return c.value; }).join(', ');

  if (!name || !phone || !email || !address || !date || !services) {
    toast('Please fill in all required fields and select at least one service.', 'error'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast('Please enter a valid email address.', 'error'); return;
  }

  var btn   = document.getElementById('submitBtn');
  var lbl   = document.getElementById('btnLabel');
  var iSend = document.getElementById('iconSend');
  var iSpin = document.getElementById('iconSpin');
  btn.disabled = true; lbl.textContent = 'Sending…';
  iSend.style.display = 'none'; iSpin.style.display = 'inline-block'; btn.style.opacity = '0.75';

  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  EJ_SVC,
      template_id: EJ_TPL,
      user_id:     EJ_KEY,
      template_params: {
        from_name:  name,
        from_email: email,
        phone:      phone,
        address:    address,
        services:   services,
        date:       date,
        time:       time || 'Flexible',
        notes:      notes || 'None',
        reply_to:   email
      }
    })
  }).then(function(res) {
    btn.disabled = false; lbl.textContent = 'Send Booking Request';
    iSend.style.display = 'inline-block'; iSpin.style.display = 'none'; btn.style.opacity = '1';
    if (res.ok) {
      showSuccess();
    } else {
      return res.text().then(function(t) { throw new Error(t); });
    }
  }).catch(function(err) {
    btn.disabled = false; lbl.textContent = 'Send Booking Request';
    iSend.style.display = 'inline-block'; iSpin.style.display = 'none'; btn.style.opacity = '1';
    console.error('Send error:', err);
    toast('Could not send email. Opening WhatsApp instead…', 'info');
    var waMsg = encodeURIComponent('*BOOKING REQUEST - Property Inspection*\n\n*Name:* '+name+'\n*Phone:* '+phone+'\n*Email:* '+email+'\n*Address:* '+address+'\n\n*Services:* '+services+'\n*Date:* '+date+'\n*Time:* '+(time||'Flexible')+'\n\n*Notes:* '+(notes||'None'));
    setTimeout(function() { window.open('https://wa.me/27754320577?text='+waMsg, '_blank'); }, 1200);
  });
});

/* ── WHATSAPP FORM BUTTON ── */
document.getElementById('waFormBtn').addEventListener('click', function(e) {
  var name     = document.getElementById('fname').value.trim();
  var phone    = document.getElementById('fphone').value.trim();
  var address  = document.getElementById('faddress').value.trim();
  var date     = document.getElementById('fdate').value;
  var time     = document.getElementById('ftime').value;
  var services = Array.from(document.querySelectorAll('.svc-check:checked')).map(function(c) { return c.value; }).join(', ');
  var notes    = document.getElementById('fnotes').value.trim();
  if (name || address || services) {
    e.preventDefault();
    var waText = encodeURIComponent('*BOOKING REQUEST - Property Inspection*\n\n*Name:* '+(name||'--')+'\n*Phone:* '+(phone||'--')+'\n*Address:* '+(address||'--')+'\n\n*Services:* '+(services||'--')+'\n*Date:* '+(date||'--')+'\n*Time:* '+(time||'Flexible')+'\n\n*Notes:* '+(notes||'None'));
    window.open('https://wa.me/27754320577?text='+waText, '_blank');
  }
});