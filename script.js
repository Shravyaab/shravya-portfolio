// ===================================================
// SHRAVYA A B – PORTFOLIO JAVASCRIPT
// ===================================================

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});
// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ===== TYPING ANIMATION ===== */
const roles = [
  'intelligent solutions.',
  'AI-powered products.',
  'data-driven insights.',
  'responsive interfaces.',
  'impactful experiences.'
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  let delay = isDeleting ? 60 : 110;
  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
setTimeout(type, 1200);

/* ===== PARTICLE CANVAS ===== */
(function particles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  const COLORS = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(168,85,247,'];

  function createPoints(n) {
    return Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: randBetween(1, 2.5),
      vx: randBetween(-0.3, 0.3),
      vy: randBetween(-0.3, 0.3),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: randBetween(0.3, 0.8)
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });
    // Connect nearby points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  pts = createPoints(60);
  draw();
  window.addEventListener('resize', () => { resize(); pts = createPoints(60); });
})();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.glass-card, .section-header, .timeline-item, .achievement-item, .contact-card, .cert-card, .project-card, .skill-category'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* ===== SMOOTH TILT ON PROJECT CARDS ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = parseFloat((progress * target).toFixed(1));
    el.textContent = val % 1 === 0 ? val : val.toFixed(1);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const raw = num.textContent.replace(/[^0-9.]/g, '');
        const suffix = num.textContent.replace(/[0-9.]/g, '');
        const target = parseFloat(raw);
        if (!isNaN(target)) {
          num.dataset.suffix = suffix;
          animateCounter({ textContent: '', set textContent(v) { num.textContent = v + suffix; } }, target);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) statObserver.observe(heroSection);

/* ===== METRIC BADGES ANIMATION ===== */
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.metric-val').forEach(el => {
        const raw = parseFloat(el.textContent);
        if (!isNaN(raw)) {
          const suffix = el.textContent.replace(/[0-9]/g, '');
          animateCounter({
            textContent: '',
            set textContent(v) { el.textContent = Math.round(v) + suffix; }
          }, raw, 1200);
        }
      });
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.project-metrics').forEach(m => metricObserver.observe(m));

/* ===== ACTIVE NAV STYLE ===== */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--text-primary) !important; }`;
document.head.appendChild(style);

console.log('%c Shravya A B – Portfolio ', 'background: #7c3aed; color: #fff; font-size: 16px; padding: 8px 16px; border-radius: 6px; font-weight: bold;');
console.log('%c Built with 💜 and lots of ☕', 'color: #a855f7; font-size: 12px;');
