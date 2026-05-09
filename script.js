/* ===== EDITORIAL SCRIPT – Kelompok 4 (Multi-Page) ===== */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Active nav highlight (URL Based) ──
function updateActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
updateActiveNav();

// ── Scroll reveal (Editorial Style) ──
const revealEls = document.querySelectorAll(
  '.member-card, .mentor-block, .materi-item, .section-header, .hero-text, .hero-visual'
);
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Stat counter animation ──
function animateCount(el, target, duration = 2000) {
  if (!el) return;
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(document.getElementById('stat-anggota'), 11);
      animateCount(document.getElementById('stat-mentor'), 2);
      animateCount(document.getElementById('stat-materi'), 8);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) statsObserver.observe(statsStrip);
