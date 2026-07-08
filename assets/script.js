const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

const reveals = document.querySelectorAll('.reveal, .card, .feature, .news-item, .company-table, .form, .recruit-box, .cta');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const stage = document.querySelector('.motion-stage');
if (stage && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('pointermove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  stage.addEventListener('pointerleave', () => {
    stage.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}
