// Bauhaus-styled controls for <video> and <audio>, replacing the browser's default player.
// Usage: const wrapper = createPlayer(mediaElement); container.append(wrapper);

const PLAYER_ICONS = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="5" height="16"/><rect x="14" y="4" width="5" height="16"/></svg>',
  sound:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-5v16l-5-5H3z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  muted:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-5v16l-5-5H3z"/><path d="M16 9l6 6M22 9l-6 6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>',
};

function createPlayer(media) {
  const isVideo = media.tagName === "VIDEO";
  media.controls = false;
  media.removeAttribute("controls");
  media.playsInline = true;

  const make = (tag, className, html = "") => {
    const el = document.createElement(tag);
    el.className = className;
    el.innerHTML = html;
    return el;
  };
  const button = (className, label, icon) => {
    const b = make("button", `player__btn ${className}`, PLAYER_ICONS[icon]);
    b.type = "button";
    b.setAttribute("aria-label", label);
    return b;
  };
  const time = (s) => {
    if (!Number.isFinite(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  const wrap = make("div", `player player--${isVideo ? "video" : "audio"}`);

  // ---- stage: the video itself, or a row of Bauhaus bars for audio
  const stage = make("div", "player__stage");
  if (isVideo) {
    stage.append(media);
  } else {
    const viz = make("div", "player__viz");
    viz.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 24; i++) viz.append(document.createElement("span"));
    stage.append(media, viz);
  }
  const big = button("player__big", "Afspelen", "play");
  stage.append(big);

  // ---- control bar
  const bar = make("div", "player__bar");
  const play = button("player__play", "Afspelen", "play");
  const current = make("span", "player__time", "0:00");
  const seek = Object.assign(document.createElement("input"), {
    type: "range", min: 0, max: 1000, step: 1, value: 0, className: "player__seek",
  });
  seek.setAttribute("aria-label", "Afspeelpositie");
  const total = make("span", "player__time player__time--total", "0:00");
  const mute = button("player__mute", "Geluid uit", "sound");
  const volume = Object.assign(document.createElement("input"), {
    type: "range", min: 0, max: 1, step: 0.05, value: 1, className: "player__volume",
  });
  volume.setAttribute("aria-label", "Volume");
  volume.style.setProperty("--v", "100%");
  const sound = make("div", "player__sound");
  sound.append(mute, volume);
  bar.append(play, current, seek, total, sound);

  let full;
  if (isVideo) {
    full = button("player__full", "Volledig scherm", "full");
    bar.append(full);
  }
  wrap.append(stage, bar);

  // ---- behaviour
  const toggle = () => (media.paused ? media.play() : media.pause());
  [big, play].forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); toggle(); }));
  if (isVideo) stage.addEventListener("click", toggle);

  const setPlaying = (playing) => {
    wrap.classList.toggle("is-playing", playing);
    play.innerHTML = PLAYER_ICONS[playing ? "pause" : "play"];
    play.setAttribute("aria-label", playing ? "Pauzeren" : "Afspelen");
  };
  media.addEventListener("play", () => setPlaying(true));
  media.addEventListener("pause", () => setPlaying(false));
  media.addEventListener("ended", () => setPlaying(false));

  const update = () => {
    const p = media.duration ? media.currentTime / media.duration : 0;
    seek.value = Math.round(p * 1000);
    seek.style.setProperty("--p", `${p * 100}%`);
    current.textContent = time(media.currentTime);
  };
  media.addEventListener("timeupdate", update);
  media.addEventListener("loadedmetadata", () => {
    total.textContent = time(media.duration);
    update();
  });
  seek.addEventListener("input", () => {
    if (media.duration) media.currentTime = (seek.value / 1000) * media.duration;
    update();
  });

  mute.addEventListener("click", () => {
    // unmuting at volume 0 would stay silent, so bring the volume back up
    if (media.muted || media.volume === 0) {
      media.muted = false;
      if (media.volume === 0) media.volume = 0.5;
    } else {
      media.muted = true;
    }
  });
  volume.addEventListener("input", () => {
    media.volume = Number(volume.value);
    media.muted = media.volume === 0;
  });
  media.addEventListener("volumechange", () => {
    const silent = media.muted || media.volume === 0;
    mute.innerHTML = PLAYER_ICONS[silent ? "muted" : "sound"];
    mute.setAttribute("aria-label", silent ? "Geluid aan" : "Geluid uit");
    wrap.classList.toggle("is-muted", silent);
    const level = media.muted ? 0 : media.volume;
    volume.value = level;
    volume.style.setProperty("--v", `${level * 100}%`);
  });

  if (full) {
    full.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (wrap.requestFullscreen) wrap.requestFullscreen();
      else if (media.webkitEnterFullscreen) media.webkitEnterFullscreen(); // iPhone
    });
  }

  return wrap;
}
