(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  document.querySelectorAll('video[data-desktop-src]').forEach((video) => {
    const src = mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    const poster = mobile ? video.dataset.mobilePoster : video.dataset.desktopPoster;
    if (poster) video.poster = poster;
    if (src) { video.src = src; video.load(); }
  });

  const story = document.querySelector('.film-story');
  const video = document.querySelector('.scrub-video');
  if (!story || !video) return;
  const chapters = [...document.querySelectorAll('.film-chapter')];
  const progress = document.querySelector('.film-progress span');
  let duration = 0;
  let raf = 0;

  video.addEventListener('loadedmetadata', () => {
    duration = Number.isFinite(video.duration) ? video.duration : 0;
    update();
  }, { once: true });

  function update() {
    raf = 0;
    const rect = story.getBoundingClientRect();
    const range = Math.max(1, story.offsetHeight - window.innerHeight);
    const amount = Math.max(0, Math.min(1, -rect.top / range));
    if (!reduced && duration > 0) {
      const target = Math.min(duration - 0.04, amount * duration);
      if (Math.abs(video.currentTime - target) > 0.06) {
        try { video.currentTime = target; } catch (_) {}
      }
    }
    const active = Math.min(chapters.length - 1, Math.floor(amount * chapters.length));
    chapters.forEach((chapter, index) => chapter.classList.toggle('is-active', index === active));
    if (progress) progress.style.width = (amount * 100).toFixed(2) + '%';
  }

  function schedule() {
    if (!raf) raf = window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
})();