(() => {
  const story = document.querySelector('.film-story');
  if (!story) return;
  const chapters = [...story.querySelectorAll('.film-chapter')];
  const progress = story.querySelector('.film-progress span');
  const scenes = [...story.querySelectorAll('.scene-layer')];
  let raf = 0;

  function update() {
    raf = 0;
    const rect = story.getBoundingClientRect();
    const range = Math.max(1, story.offsetHeight - window.innerHeight);
    const amount = Math.max(0, Math.min(1, -rect.top / range));
    const active = Math.min(chapters.length - 1, Math.floor(amount * chapters.length));
    chapters.forEach((chapter, index) => {
      chapter.classList.toggle('is-active', index === active);
    });
    scenes.forEach((scene, index) => {
      scene.classList.toggle('is-active', index === active);
    });
    if (progress) progress.style.width = (amount * 100).toFixed(2) + '%';
  }

  function schedule() {
    if (!raf) raf = window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  update();
})();