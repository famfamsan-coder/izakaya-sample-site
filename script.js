// ===========================
// ハンバーガーメニュー
// ===========================
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');

function openDrawer() {
  hamburger.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);

// ナビリンクをクリックで閉じる
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ===========================
// スクロールでヘッダー変化
// ===========================
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// ヒーロースライドショー
// ===========================
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 5000);
}

// ===========================
// スクロールアニメーション
// ===========================
const animTargets = document.querySelectorAll(
  '.menu-card, .menu-list-item, .course-card, .feature-section, .concept-body, .room-gallery, .reserve-option, .access-row'
);

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animTargets.forEach(el => {
  el.classList.add('anim-target');
  observer.observe(el);
});

// ===========================
// スムーススクロール（ハッシュリンク）
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerOffset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h')) || 60;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
