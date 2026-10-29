// Shared script for every page. Each part only runs when its elements are on the page.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const random = (min, max) => min + Math.random() * (max - min);

// ---------- Sound (piano + hero tiles) ----------
const NOTES = [
  { name: "C",  freq: 261.63, key: "a" },
  { name: "C#", freq: 277.18, key: "w", black: true },
  { name: "D",  freq: 293.66, key: "s" },
  { name: "D#", freq: 311.13, key: "e", black: true },
  { name: "E",  freq: 329.63, key: "d" },
  { name: "F",  freq: 349.23, key: "f" },
  { name: "F#", freq: 369.99, key: "t", black: true },
  { name: "G",  freq: 392.0,  key: "g" },
  { name: "G#", freq: 415.3,  key: "y", black: true },
  { name: "A",  freq: 440.0,  key: "h" },
  { name: "A#", freq: 466.16, key: "u", black: true },
  { name: "B",  freq: 493.88, key: "j" },
  { name: "C",  freq: 523.25, key: "k" },
];

let audioCtx;
function playNote(freq, duration = 1.2) {
  audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  gain.connect(audioCtx.destination);

  // two detuned oscillators for a soft, warm tone
  [["triangle", 0], ["sine", 2]].forEach(([type, detune]) => {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + duration);
  });
}

// ---------- Hero tiles (after the 1923 Ausstellung poster) ----------
const tiles = document.getElementById("tiles");
if (tiles) {
  const COLORS = ["var(--blue)", "var(--yellow)", "var(--red)"];
  const SVG_NS = "http://www.w3.org/2000/svg";
  // colour order per row, as on the original poster
  const pattern = [
    [0, 1, 2],
    [1, 2, 0],
    [2, 0, 1],
    [0, 1, 2],
  ];

  pattern.forEach((row, r) => {
    row.forEach((colorIndex, c) => {
      const x = c * 2;
      const y = r * 2;
      const g = document.createElementNS(SVG_NS, "g");
      g.classList.add("tile");
      g.dataset.color = colorIndex;

      // black "shadow" that runs diagonally down-left from the square
      const shadow = document.createElementNS(SVG_NS, "polygon");
      shadow.classList.add("tile__shadow");
      shadow.setAttribute(
        "points",
        `${x + 1},${y} ${x + 1},${y + 1} ${x + 2},${y + 1} ${x + 1},${y + 2} ${x},${y + 2} ${x},${y + 1}`
      );

      const face = document.createElementNS(SVG_NS, "rect");
      face.classList.add("tile__face");
      face.setAttribute("x", x + 1);
      face.setAttribute("y", y);
      face.setAttribute("width", 1);
      face.setAttribute("height", 1);
      face.style.fill = COLORS[colorIndex];

      g.append(shadow, face);
      g.addEventListener("click", () => {
        const next = (Number(g.dataset.color) + 1) % COLORS.length;
        g.dataset.color = next;
        face.style.fill = COLORS[next];
        playNote(NOTES[(r * 3 + c) % NOTES.length].freq, 0.5);
      });
      tiles.appendChild(g);
    });
  });

  // tiles animate on their own, each on its own random rhythm
  const animateTile = (tile) => {
    setTimeout(() => {
      tile.classList.add("is-auto");
      setTimeout(() => {
        tile.classList.remove("is-auto");
        animateTile(tile);
      }, random(600, 1600));
    }, random(1200, 6000));
  };
  if (!reduceMotion) tiles.querySelectorAll(".tile").forEach(animateTile);
}

// ---------- Hero name: GSAP intro + letter hover ----------
const title = document.querySelector(".hero__title");
if (title) {
  const BAUHAUS = ["#d8322b", "#e9a12a", "#3b5bb5", "#3e8a8c"];
  title.setAttribute("aria-label", title.textContent.trim().replace(/\s+/g, " "));

  const lines = [...title.querySelectorAll(".line")].map((line) => {
    const text = line.textContent.trim();
    line.setAttribute("aria-hidden", "true");
    line.innerHTML = [...text]
      .map((ch) => `<span class="char"><span class="char__block"></span><span class="char__glyph">${ch}</span></span>`)
      .join("");
    return [...line.querySelectorAll(".char")];
  });

  if (window.gsap && !reduceMotion) {
    const [first, last] = lines;
    const glyphs = (chars) => chars.map((c) => c.querySelector(".char__glyph"));
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set([".hero__bar", ".eyebrow", ".hero__lead", ".hero__actions", ".hero__foot", ".hero__hint"], { autoAlpha: 0 });
    gsap.set(glyphs(last), { autoAlpha: 0 });

    // BRANDON: letters jump up from below, spinning into place
    intro.from(glyphs(first), {
      yPercent: 140,
      rotation: () => gsap.utils.random(-50, 50),
      scale: 0.3,
      autoAlpha: 0,
      duration: 0.9,
      ease: "back.out(2)",
      stagger: 0.06,
    }, 0.2);

    // WIJNGAARDE: each letter is revealed by a coloured Bauhaus block
    last.forEach((char, i) => {
      const block = char.querySelector(".char__block");
      const glyph = char.querySelector(".char__glyph");
      const at = 0.55 + i * 0.07;
      block.style.background = BAUHAUS[i % 3];
      intro
        .fromTo(block, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, ease: "power3.in" }, at)
        .set(glyph, { autoAlpha: 1 }, at + 0.3)
        .to(block, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.35 }, at + 0.32);
    });

    // the rest of the poster follows
    intro
      .from(".tile", {
        scale: 0,
        rotation: -90,
        transformOrigin: "50% 50%",
        duration: 0.7,
        ease: "back.out(1.6)",
        stagger: { each: 0.06, from: "random" },
      }, 0.3)
      .to(".hero__bar", { autoAlpha: 1, duration: 0.6 }, 0.1)
      .fromTo(".eyebrow", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 1.2)
      .fromTo([".hero__lead", ".hero__actions"], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 1.35)
      .to([".hero__foot", ".hero__hint"], { autoAlpha: 1, duration: 0.8 }, 1.6);

    // hover: only the hovered letter jumps and takes a new colour, then fades back
    const bounce = (glyph) => {
      glyph.dataset.base ??= getComputedStyle(glyph).color;
      const colors = BAUHAUS.filter((c) => c !== glyph.dataset.last);
      const color = gsap.utils.random(colors);
      glyph.dataset.last = color;

      gsap.killTweensOf(glyph);
      gsap.set(glyph, { color });
      gsap.timeline()
        .to(glyph, {
          yPercent: -25,
          rotation: gsap.utils.random([-12, -8, 8, 12]),
          scale: 1.12,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(glyph, { yPercent: 0, rotation: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.35)" })
        .to(glyph, { color: glyph.dataset.base, duration: 0.5, ease: "power1.inOut" }, "-=0.2");
    };

    lines.flat().forEach((char) => {
      const glyph = char.querySelector(".char__glyph");
      char.addEventListener("pointerenter", () => bounce(glyph));
      char.addEventListener("pointerdown", (e) => e.pointerType !== "mouse" && bounce(glyph));
    });
  }
}

// ---------- Piano ----------
const piano = document.getElementById("piano");
if (piano) {
  const KEY_COLORS = ["c-red", "c-yellow", "c-blue"];
  const keyMap = {};
  const whiteCount = NOTES.filter((n) => !n.black).length;
  let whiteIndex = 0;

  const press = (btn, note) => {
    playNote(note.freq);
    btn.classList.add("is-down");
    clearTimeout(btn._t);
    btn._t = setTimeout(() => btn.classList.remove("is-down"), 220);
  };

  NOTES.forEach((note, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `key ${note.black ? "key--black" : "key--white"} ${KEY_COLORS[i % 3]}`;
    btn.setAttribute("aria-label", `${note.name} (toets ${note.key.toUpperCase()})`);
    btn.innerHTML = `<span>${note.key.toUpperCase()}</span>`;
    if (note.black) {
      btn.style.left = `${(whiteIndex / whiteCount) * 100}%`;
    } else {
      whiteIndex++;
    }
    btn.addEventListener("pointerdown", () => press(btn, note));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") press(btn, note);
    });
    piano.appendChild(btn);
    keyMap[note.key] = { btn, note };
  });

  document.addEventListener("keydown", (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest?.("input, textarea")) return;
    const hit = keyMap[e.key.toLowerCase()];
    if (hit) press(hit.btn, hit.note);
  });
}

// ---------- Project filters (module × type) ----------
const works = document.querySelector(".works");
if (works) {
  const emptyNote = document.querySelector(".works__empty");
  const activeFilter = { module: "alles", type: "alles" };

  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { group, filter } = btn.dataset;
      activeFilter[group] = filter;
      document
        .querySelectorAll(`.filter[data-group="${group}"]`)
        .forEach((b) => b.classList.toggle("is-active", b === btn));

      let shown = 0;
      works.querySelectorAll(".work").forEach((work) => {
        const match =
          (activeFilter.module === "alles" || work.dataset.module === activeFilter.module) &&
          (activeFilter.type === "alles" || work.dataset.cat.split(" ").includes(activeFilter.type));
        work.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      works.classList.toggle("is-filtered", activeFilter.module !== "alles" || activeFilter.type !== "alles");
      emptyNote.hidden = shown > 0;
    });
  });
}

// ---------- Project page (project.html?id=...) ----------
const detail = document.getElementById("project-detail");
// (PROJECTS is a top-level const from projects.js, so it is not on window)
if (detail && typeof PROJECTS !== "undefined") {
  // "TODO:" text shows as a dashed placeholder so it is obvious what still needs filling in
  const textEl = (tag, value) => {
    const el = document.createElement(tag);
    const todo = value.startsWith("TODO:");
    el.textContent = todo ? value.slice(5).trim() : value;
    if (todo) el.classList.add("is-todo");
    return el;
  };

  const linkEl = (href, text, newTab) => {
    const a = Object.assign(document.createElement("a"), { href, textContent: text });
    a.className = "project-detail__link";
    if (newTab) Object.assign(a, { target: "_blank", rel: "noopener" });
    return a;
  };

  const renderMedia = (media) => {
    const box = document.getElementById("pd-media");
    let el;
    if (media.src && media.kind === "image") {
      el = Object.assign(document.createElement("img"), { src: media.src, alt: media.alt || "" });
    } else if (media.src && media.kind === "video") {
      el = Object.assign(document.createElement("video"), { src: media.src, controls: true, preload: "metadata" });
      if (media.poster) el.poster = media.poster;
    } else if (media.src && media.kind === "audio") {
      el = Object.assign(document.createElement("audio"), { src: media.src, controls: true });
    } else if (media.src && media.kind === "embed") {
      el = Object.assign(document.createElement("iframe"), { src: media.src, loading: "lazy", allowFullscreen: true });
      el.title = "Mediaproduct";
    } else {
      el = document.createElement("div");
      el.className = "project-detail__placeholder";
      el.textContent = "Mediaproduct volgt";
    }
    // video and audio get the Bauhaus player (player.js) instead of the browser default
    if ((el.tagName === "VIDEO" || el.tagName === "AUDIO") && typeof createPlayer === "function") {
      box.append(createPlayer(el));
    } else {
      el.classList.add("project-detail__asset");
      box.append(el);
    }

    if (media.kind === "link" && media.src) box.append(linkEl(media.src, "Bekijk het product →"));
    if (media.download) box.append(linkEl(media.download, `${media.downloadLabel || "Download"} →`, true));
    if (media.caption) box.append(textEl("p", media.caption));
  };

  const ids = Object.keys(PROJECTS);
  const id = new URLSearchParams(location.search).get("id");
  const p = PROJECTS[id];

  if (!p) {
    detail.hidden = true;
    document.getElementById("project-missing").hidden = false;
  } else {
    document.title = `${p.title} — Brandon Wijngaarde`;
    document.getElementById("pd-title").textContent = p.kop || p.title;
    document.getElementById("pd-product").textContent = p.title;
    document.getElementById("pd-meta").textContent = `${p.module} · ${p.year}`;
    renderMedia(p.media);

    // the story: one paragraph per entry, then the credits
    const story = document.getElementById("pd-story");
    (p.verhaal || []).forEach((text) => story.append(textEl("p", text)));
    const credits = document.getElementById("pd-credits");
    (p.bronnen || []).forEach((text) => credits.append(textEl("li", text)));

    // previous / next project, looping around
    const i = ids.indexOf(id);
    const prevId = ids.at(i - 1);
    const nextId = ids.at((i + 1) % ids.length);
    const prev = document.getElementById("pd-prev");
    const next = document.getElementById("pd-next");
    prev.href = `project.html?id=${prevId}`;
    prev.innerHTML = `<small>← Vorig project</small>`;
    prev.append(PROJECTS[prevId].kop || PROJECTS[prevId].title);
    next.href = `project.html?id=${nextId}`;
    next.innerHTML = `<small>Volgend project →</small>`;
    next.append(PROJECTS[nextId].kop || PROJECTS[nextId].title);
  }
}

// ---------- Contact form → mail ----------
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = `Bericht via portfolio van ${data.get("naam")}`;
    const body = `${data.get("bericht")}\n\n— ${data.get("naam")} (${data.get("email")})`;
    window.location.href =
      `mailto:brandonwijngaarde9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
const revealEls = [...document.querySelectorAll(".reveal")];
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

// safety net: whatever is already on screen when a page opens is shown straight away
const revealInView = () =>
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
  });
requestAnimationFrame(revealInView);
window.addEventListener("load", revealInView);

// ---------- Mobile menu ----------
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
