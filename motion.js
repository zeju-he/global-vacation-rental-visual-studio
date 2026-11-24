(() => {
  const VIDEO_DESKTOP = "https://d2ol7oe51mr4n9.cloudfront.net/user_3MT2M2itpgET4gDypCBXSwRu0ZT/512b1e6a-c5b8-488d-a245-2c29dca7c19b.mp4";
  const VIDEO_MOBILE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3MT2M2itpgET4gDypCBXSwRu0ZT/c8822702-c766-4387-a4ad-a0a2fd73b1b3.mp4";
  const POSTER = "https://d2ol7oe51mr4n9.cloudfront.net/user_3MT2M2itpgET4gDypCBXSwRu0ZT/105c1429-362d-4ab5-bd52-1bf80ad03399.png";
  const css = `
    .hero-scroll{position:relative;height:260vh;width:100vw;margin-left:calc(50% - 50vw);background:#172635}
    .hero-scroll__stage{height:100svh;min-height:560px;position:sticky;top:0;overflow:hidden;isolation:isolate}
    .hero-scroll__video,.hero-scroll__poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .hero-scroll__poster{z-index:-1}
    .hero-scroll__video{z-index:-1}
    .hero-scroll__shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(243,246,248,.94) 0%,rgba(243,246,248,.78) 36%,rgba(19,34,56,.04) 78%),linear-gradient(0deg,rgba(15,31,43,.24),transparent 44%)}
    .hero-scroll__copy{position:absolute;left:max(6vw,calc((100vw - 1160px)/2));top:50%;transform:translateY(-50%);width:min(560px,78vw);z-index:2}
    .hero-scroll__eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#3159bd;font-weight:700}
    .hero-scroll__copy h1{font-size:clamp(48px,6vw,82px);line-height:.98;letter-spacing:-.055em;font-weight:500;margin:22px 0;color:#132238}
    .hero-scroll__copy h1 em{font-family:Georgia,'Times New Roman',serif;font-weight:400}
    .hero-scroll__copy p{font-size:16px;color:#526071;max-width:440px}
    .hero-scroll__actions{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
    .hero-scroll__hint{position:absolute;right:28px;bottom:24px;color:#fff;font-size:9px;letter-spacing:.18em;text-transform:uppercase;z-index:3}
    .hero-scroll__progress{position:absolute;bottom:0;left:0;height:3px;width:100%;background:#ffffff44;z-index:3}
    .hero-scroll__progress span{display:block;height:100%;width:0;background:#3159bd}
    @media(max-width:760px){.hero-scroll{height:220vh;margin:0 -22px}.hero-scroll__stage{min-height:620px}.hero-scroll__shade{background:linear-gradient(90deg,rgba(243,246,248,.94),rgba(243,246,248,.66) 72%,rgba(19,34,56,.08)),linear-gradient(0deg,rgba(15,31,43,.25),transparent 48%)}.hero-scroll__copy{left:24px;top:42%;width:calc(100% - 48px)}.hero-scroll__copy h1{font-size:clamp(46px,12vw,68px)}.hero-scroll__copy p{font-size:14px;max-width:330px}.hero-scroll__hint{right:18px;bottom:18px;font-size:8px}}
    @media(prefers-reduced-motion:reduce){.hero-scroll{height:100svh}.hero-scroll__progress{display:none}}
  `;
  const style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
  const install = () => {
    const oldHero = document.querySelector("main .hero");
    if (!oldHero) return;
    const section = document.createElement("section");
    section.className = "hero-scroll";
    section.setAttribute("aria-label", "Studio introduction");
    section.innerHTML = `
      <div class="hero-scroll__stage">
        <img class="hero-scroll__poster" src="${POSTER}" alt="" aria-hidden="true">
        <video class="hero-scroll__video" muted playsinline preload="auto" poster="${POSTER}" aria-label="Cinematic apartment interior visual">
        </video>
        <div class="hero-scroll__shade"></div>
        <div class="hero-scroll__copy">
          <div class="hero-scroll__eyebrow">Remote visual content · Worldwide</div>
          <h1>Make every stay <em>look its best.</em></h1>
          <p>Thoughtful photo enhancement and short-form video editing for vacation rental hosts, property managers and hospitality teams.</p>
          <div class="hero-scroll__actions"><a class="btn" href="#contact">Discuss a project ↗</a><a class="btn alt" href="#work">Explore the work</a></div>
        </div>
        <div class="hero-scroll__hint">Scroll to explore · 01 / 01</div>
        <div class="hero-scroll__progress"><span></span></div>
      </div>`;
    oldHero.replaceWith(section);
    const video = section.querySelector("video");
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    video.src = mobile ? VIDEO_MOBILE : VIDEO_DESKTOP;
    video.load();
    const bar = section.querySelector(".hero-scroll__progress span");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let duration = 15, raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      bar.style.width = (progress * 100) + "%";
      if (!reduced && Number.isFinite(video.duration) && video.duration > 0) {
        const target = Math.min(video.duration - 0.04, Math.max(0, progress * video.duration));
        if (Math.abs(video.currentTime - target) > 0.12) {
          try { video.currentTime = target; } catch (_) {}
        }
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    video.addEventListener("loadedmetadata", () => { duration = video.duration || duration; update(); });
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", onScroll, {passive:true});
    update();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, {once:true});
  else install();
})();