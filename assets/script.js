const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

const revealTargets = document.querySelectorAll('.reveal, .process-card, .visual-card, .service-poster, .glass-panel, .stack-card, .company-table, .form, .recruit-box, .news-item, .cta');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 28, 180)}ms`;
  revealObserver.observe(el);
});

const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  if (!progress) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${value}%`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  const heroShell = document.querySelector('.video-shell');
  const resetVideoShell = () => {
    if (!heroShell) return;
    if (window.innerWidth > 1100) {
      heroShell.style.transform = 'perspective(900px) rotateY(-6deg) rotateX(4deg)';
    } else {
      heroShell.style.transform = 'none';
    }
  };

  if (heroShell) {
    heroShell.addEventListener('pointermove', (e) => {
      const rect = heroShell.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroShell.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    heroShell.addEventListener('pointerleave', resetVideoShell);
    resetVideoShell();
    window.addEventListener('resize', resetVideoShell);
  }
}
