const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

const revealTargets = document.querySelectorAll('.reveal, .process-card, .visual-card, .service-poster, .glass-panel, .stack-card, .company-table, .form, .recruit-box, .news-item, .cta, .feature-board-item');
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
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const canvas = document.querySelector('.future-canvas');
if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let particles = [];
  const resizeCanvas = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.min(32, Math.max(20, Math.floor(w / 22))) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45,
      a: 0.35 + Math.random() * 0.45
    }));
  };
  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w * 0.55, h * 0.42, 20, w * 0.55, h * 0.42, w * 0.62);
    grad.addColorStop(0, 'rgba(34,133,255,0.22)');
    grad.addColorStop(0.5, 'rgba(19,65,135,0.12)');
    grad.addColorStop(1, 'rgba(8,20,40,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,214,255,${p.a})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(108,214,255,${(1 - dist / 120) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    const rings = [0.18, 0.28, 0.38];
    rings.forEach((scale, index) => {
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.43, (w * scale) + Math.sin(t / 1200 + index) * 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(108,214,255,${0.18 - index * 0.04})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    ctx.fillStyle = 'rgba(108,214,255,0.12)';
    for (let i = 0; i < 7; i += 1) {
      const barH = 60 + Math.sin(t / 550 + i * 0.7) * 26;
      const barW = 12;
      const x = w * 0.12 + i * 22;
      const y = h * 0.74 - barH;
      ctx.fillRect(x, y, barW, barH);
    }

    requestAnimationFrame(draw);
  };

  resizeCanvas();
  requestAnimationFrame(draw);
  window.addEventListener('resize', resizeCanvas);
}
