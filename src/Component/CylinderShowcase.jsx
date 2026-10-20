import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./CylinderShowcase.css";


const FLEET = [
  {
    title: "Mercedes-Benz S-Class", cat: "Luxury Sedan", trans: "Automatic", seats: "5",
    rent: "PKR 90,000", img: "https://i.pinimg.com/736x/ff/33/24/ff3324a6a6510985133ef6d9526f31a8.jpg",
    desc: "The executive standard — chauffeur-driven comfort for VIP transfers, corporate movement and red-carpet arrivals.",
    lede: "The back seat that ends every argument about status.",
    body: "The S-Class is what companies book when the guest matters. Chauffeur-driven with chilled water and a quiet cabin, it is our most requested car for airport VIP transfers and board-level corporate movement. Massaging rear seats, ambient lighting and near-silent cruising mean the passenger steps out exactly as composed as they stepped in. Available with uniformed driver on hourly and daily protocol.",
  },
  {
    title: "BMW 7 Series", cat: "Luxury Sedan", trans: "Automatic", seats: "5",
    rent: "PKR 85,000", img: "https://i.pinimg.com/736x/35/d5/b2/35d5b28e54ce5277da445265f99ebf49.jpg",
    desc: "Driver's luxury — the 7 Series pairs chauffeur comfort with genuine performance for the long highway spell.",
    lede: "Luxury that still loves the road.",
    body: "The 7 Series is for clients who want the chauffeur option but appreciate the drive. Adaptive suspension flattens the motorway, the executive rear cabin keeps working hours productive, and the presence at a hotel porch announces arrival without a word. A frequent booking for outstation executive trips and wedding family movement where comfort across three hundred kilometres is non-negotiable.",
  },
  {
    title: "Audi A8 L", cat: "Luxury Sedan", trans: "Automatic", seats: "5",
    rent: "PKR 80,000", img: "https://i.pinimg.com/1200x/ac/b9/30/acb930ac2e6878e81449a74be0ae1604.jpg",
    desc: "Understated flagship — quattro confidence and a whisper-quiet cabin for discreet, high-profile movement.",
    lede: "Quiet money, quattro feet.",
    body: "The A8 L is the choice of clients who prefer their luxury quiet. Long-wheelbase rear legroom, acoustic glazing that reduces the outside world to a murmur, and quattro traction that holds the road through northern trips in any season. Popular with diplomats, senior executives and families who want first-class travel without drawing the street's attention. Chauffeur included, day or protocol.",
  },
  {
    title: "Range Rover Vogue", cat: "Luxury SUV", trans: "Automatic", seats: "5",
    rent: "PKR 100,000", img: "https://i.pinimg.com/736x/e4/c5/3a/e4c53a641a7f5bbe0323c2ef29913174.jpg",
    desc: "The statement SUV — commanding presence for weddings, film shoots and upcountry trips in one silhouette.",
    lede: "One car that fits the wedding and the mountains.",
    body: "The Vogue is the most photographed vehicle we own, and rightly so. It carries a baraat entrance, a film unit's star, or a family to Swat with equal authority — the commanding seating position, air suspension and a cabin trimmed like a private lounge. Essential Pakistan, the Vogue handles broken roads and protocol duties without breaking stride. Book early; it rarely sits in the garage.",
  },
  {
    title: "Porsche Cayenne", cat: "Performance SUV", trans: "Automatic", seats: "5",
    rent: "PKR 110,000", img: "https://i.pinimg.com/1200x/d2/e4/65/d2e465ea1373c64980f6ce95f9fa0729.jpg",
    desc: "Sports-car soul in an SUV body — for clients who want the drive to be the event, not just the destination.",
    lede: "An SUV that behaves like a Porsche.",
    body: "The Cayenne exists for the customer who tested everything else and found it sensible rather than exciting. It accelerates like the sports cars it grew up with, holds the road like one, and still carries five people and their luggage to Naran for the weekend. A strong pick for groom arrivals, self-drive enthusiasts and clients who want the journey filmed as happily as the event.",
  },
  {
    title: "Lamborghini Urus", cat: "Super SUV", trans: "Automatic", seats: "5",
    rent: "PKR 300,000", img: "https://i.pinimg.com/1200x/2e/7d/76/2e7d7638708d7006b2bf45a45b22d48c.jpg",
    desc: "The headliner — a super-SUV that turns every arrival into an event. Weddings, launches and shoots book it months ahead.",
    lede: "The arrival people will talk about for a year.",
    body: "The Urus is the car people stop filming. Six hundred and fifty horsepower wrapped in a body that needs no introduction, it is booked for groom entries, brand launches and music-video shoots where the vehicle is part of the production design. Delivered with a professional chauffeur who knows exactly how slowly to bring it to a porch. If the brief says unforgettable, this is the line item.",
  },
  {
    title: "Bentley Continental GT", cat: "Grand Tourer", trans: "Automatic", seats: "4",
    rent: "PKR 275,000", img: "https://i.pinimg.com/736x/cd/0d/89/cd0d89aac00fbda47373bf33c795091c.jpg",
    desc: "Hand-built British grand touring — the couple's choice for walima entrances and once-in-a-lifetime portraits.",
    lede: "For the entrance that gets framed.",
    body: "The Continental GT is hand-built around a twelve-cylinder heart and finished to a standard cameras love — which is why it headlines our wedding fleet. Diamond-quilted leather, a rotating dashboard display and a silhouette that photographs beautifully from every angle. Couples book it for the walima entrance; brands book it for flagship campaigns. Delivered detailed, chauffeured and ribbon-ready.",
  },
  {
    title: "Rolls-Royce Ghost", cat: "Ultra Luxury", trans: "Automatic", seats: "5",
    rent: "PKR 400,000", img: "https://i.pinimg.com/736x/37/1b/eb/371beb8fe7535d0e8e75e9583f3e2666.jpg",
    desc: "The top of the fleet — a Ghost at the gate ends every conversation about arrival. Our most exclusive booking.",
    lede: "The final word in arrival.",
    body: "The Ghost is the most expensive car in our garage and it behaves like it. The Magic Carpet Ride suspension makes broken roads a rumour, the Starlight Headliner recreates the night sky indoors, and the rear doors close at the touch of one button. Booked for the weddings that make the news, the executives who cannot be named, and the shoots where nothing less than the best is the brief. Chauffeur, route planning and protocol handling included.",
  },
];

const N = FLEET.length;
const STEP = 360 / N;
const RAD = Math.PI / 180;
const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


const mod = (n, m) => ((n % m) + m) % m;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, "0");

const SVG_PREV = (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
    <path d="M15 5H1m0 0 4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);
const SVG_NEXT = (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
    <path d="M1 5h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);
const SVG_X = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M1.5 1.5l12 12m0-12-12 12" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export default function CylinderShowcase() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const spinnerRef = useRef(null);
  const shadowRef = useRef(null);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const dimRefs = useRef([]);
  const ioRef = useRef(null);

  const S = useRef({
    rot: RM ? 0 : -165,
    vel: 0,
    radM: RM ? 1 : 2.35,
    tilt: RM ? -7 : -14,
    tiltT: RM ? -7 : -14,
    sway: 0,
    swayT: 0,
    pop: new Array(N).fill(0),
  }).current;

  const R = useRef(420);
  const dragging = useRef(false);
  const tweenRef = useRef(null);
  const doneRef = useRef(false);
  const inViewRef = useRef(false);
  const activeRef = useRef(0);
  const lastX = useRef(0);
  const moved = useRef(0);
  const dragCard = useRef(null);
  const samples = useRef([]);

  const [active, setActive] = useState(0);
  const [modalIdx, setModalIdx] = useState(null);
  const [modalClosing, setModalClosing] = useState(false);

  const stateRef = useRef({});
  stateRef.current = { modalIdx };

  const goTo = useCallback(
    (i, dur = 1.05) => {
      if (tweenRef.current) { tweenRef.current.kill(); tweenRef.current = null; }
      const cur = mod(S.rot, 360);
      const tgt = mod(-i * STEP, 360);
      let d = tgt - cur;
      if (d > 180) d -= 360;
      else if (d < -180) d += 360;
      S.vel = 0;
      tweenRef.current = gsap.to(S, {
        rot: S.rot + d,
        duration: dur,
        ease: "power3.inOut",
        onComplete: () => { tweenRef.current = null; S.rot = mod(S.rot, 360); S.vel = 0; },
      });
    },
    [S]
  );

  const layout = useCallback(() => {
    const root = rootRef.current;
    const card = cardRefs.current[0];
    if (!root || !card) return;
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    R.current = (cw / 2) / Math.tan(Math.PI / N) + 28;
    root.style.setProperty("--rr", R.current.toFixed(1) + "px");
    const cs = getComputedStyle(root);
    const rect = root.getBoundingClientRect();
    const ax = (parseFloat(cs.getPropertyValue("--anchorX")) / 100) * rect.width;
    const ay = (parseFloat(cs.getPropertyValue("--anchorY")) / 100) * rect.height;
    const sw = 2 * (R.current + 46);
    if (shadowRef.current) {
      shadowRef.current.style.width = sw + "px";
      shadowRef.current.style.height = sw * 0.3 + "px";
      shadowRef.current.style.left = ax + "px";
      shadowRef.current.style.top = ay + ch / 2 + 30 + "px";
    }
  }, []);

  const stepRef = useRef(() => {});
  const modalStep = (dir) => {
    const mi = stateRef.current.modalIdx;
    if (mi === null) return;
    const ni = mod(mi + dir, N);
    goTo(ni, 1.15);
    setModalIdx(ni);
  };
  stepRef.current = modalStep;

  const closeModal = useCallback(() => setModalClosing(true), []);

  const onModalAnimEnd = (e) => {
    if (modalClosing && e.animationName === "panelDown") {
      setModalIdx(null);
      setModalClosing(false);
    }
  };


  useLayoutEffect(() => {
    const root = rootRef.current;
    layout();

    const applyTransforms = () => {
      tiltRef.current.style.transform =
        "rotateX(" + S.tilt.toFixed(3) + "deg) rotateY(" + S.sway.toFixed(3) + "deg)";
      spinnerRef.current.style.transform = "rotateY(" + S.rot.toFixed(3) + "deg)";
      const rr = R.current * S.radM;
      const fi = mod(Math.round(-S.rot / STEP), N);
      for (let i = 0; i < N; i++) {
        const c = Math.cos((i * STEP + S.rot) * RAD);
        const popT = i === fi && doneRef.current ? 30 : 0;
        S.pop[i] += (popT - S.pop[i]) * 0.14;
        const sc = (0.94 + 0.06 * Math.max(0, c)).toFixed(4);
        const el = cardRefs.current[i];
        if (el) {
          el.style.transform =
            "translate(-50%,-50%) rotateY(" + i * STEP + "deg) translateZ(" +
            (rr + S.pop[i]).toFixed(2) + "px) scale(" + sc + ")";
        }
        const d = dimRefs.current[i];
        if (d) d.style.opacity = i === fi ? 0 : (((1 - c) / 2) * 0.78).toFixed(3);
      }
    };

    const frame = () => {
      if (doneRef.current && !tweenRef.current && !dragging.current) {
        S.rot += S.vel;
        S.vel *= 0.93;
        const snap = Math.round(S.rot / STEP) * STEP;
        if (Math.abs(S.vel) < 1.4) {
          S.rot += (snap - S.rot) * 0.07;
          if (Math.abs(S.vel) < 0.05 && Math.abs(snap - S.rot) < 0.05) {
            S.rot = mod(snap, 360);
            S.vel = 0;
          }
        }
      }
      S.tilt += (S.tiltT - S.tilt) * 0.06;
      S.sway += (S.swayT - S.sway) * 0.06;
      applyTransforms();

      const vm = Math.abs(S.vel);
      if (shadowRef.current) {
        shadowRef.current.style.transform =
          "translate(-50%,-50%) scaleX(" + (1 + Math.min(vm * 0.02, 0.3)).toFixed(3) + ")";
        shadowRef.current.style.opacity = (0.22 + Math.min(vm * 0.018, 0.14)).toFixed(3);
      }

      const fi = mod(Math.round(-S.rot / STEP), N);
      if (doneRef.current && fi !== activeRef.current) {
        activeRef.current = fi;
        setActive(fi);
      }
    };
    gsap.ticker.add(frame);

    const ctx = gsap.context(() => {
      if (RM) {
        doneRef.current = true;
        inViewRef.current = true;
        return;
      }

      const q = gsap.utils.selector(root);
      gsap.set(q(".fx"), { y: 18, autoAlpha: 0 });
      gsap.set(q(".rail-item"), { autoAlpha: 0 });
      gsap.set(q(".card"), { autoAlpha: 0 });
      gsap.set(q(".numeral"), { yPercent: 60, autoAlpha: 0 });

      const playEntrance = () => {
        gsap
          .timeline({ onComplete: () => { doneRef.current = true; } })
          .to(S, { radM: 1, rot: 0, duration: 2, ease: "expo.out" })
          .to(S, { tiltT: -7, duration: 1.6, ease: "power3.out" }, "<")
          .fromTo(q(".card"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: "power2.out" }, "<0.2")
          .fromTo(q(".numeral"), { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }, "-=1.2")
          .fromTo(q(".fx"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05 }, "-=0.9")
          .fromTo(q(".rail-item"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.045 }, "-=0.7");
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting)) {
            io.disconnect();
            ioRef.current = null;
            inViewRef.current = true;
            playEntrance();
          }
        },
        { threshold: 0.35 }
      );
      io.observe(root);
      ioRef.current = io;
    }, root);

    return () => {
      if (ioRef.current) ioRef.current.disconnect();
      ctx.revert();
      gsap.ticker.remove(frame);
    };

  }, []);

  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(layout, 120); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [layout]);

  useEffect(() => {
    const onKey = (e) => {
      const st = stateRef.current;
      if (e.key === "Escape") {
        if (st.modalIdx !== null) closeModal();
        return;
      }
      if (st.modalIdx !== null) {
        if (e.key === "ArrowRight") stepRef.current(1);
        if (e.key === "ArrowLeft") stepRef.current(-1);
        return;
      }
      if (!inViewRef.current || !doneRef.current) return;
      if (e.key === "ArrowRight") goTo(mod(activeRef.current + 1, N));
      if (e.key === "ArrowLeft") goTo(mod(activeRef.current - 1, N));
      if (e.key === "Enter" && !e.target.closest("input,textarea,select,button,a")) {
        setModalIdx(activeRef.current);
      }
    };

    const onMove = (e) => {
      if (!inViewRef.current || dragging.current) return;
      const rect = rootRef.current ? rootRef.current.getBoundingClientRect() : null;
      if (!rect) return;
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      S.swayT = clamp(mx * 5, -4, 4);
      S.tiltT = clamp(-7 + my * 8, -12, -3);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
    };
  }, [S, goTo, closeModal]);

  useEffect(() => {
    const locked = modalIdx !== null || modalClosing;
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [modalIdx, modalClosing]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [modalIdx]);

  const onPointerDown = (e) => {
    if (!doneRef.current || stateRef.current.modalIdx !== null) return;
    if (e.button && e.button !== 0) return;
    if (tweenRef.current) { tweenRef.current.kill(); tweenRef.current = null; }
    dragging.current = true;
    moved.current = 0;
    dragCard.current = e.target.closest ? e.target.closest(".card") : null;
    lastX.current = e.clientX;
    samples.current = [[performance.now(), 0]];
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    moved.current += Math.abs(dx);
    S.rot += dx * 0.32;
    samples.current.push([performance.now(), dx]);
    if (samples.current.length > 7) samples.current.shift();
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const now = performance.now();
    const rec = samples.current.filter((s) => now - s[0] < 120);
    let v = 0;
    if (rec.length > 1) {
      const dx = rec.reduce((a, s) => a + s[1], 0);
      const dt = Math.max(16, now - rec[0][0]);
      v = clamp((dx / dt) * 16 * 0.32, -16, 16);
    }
    S.vel = v;
    if (moved.current < 6 && dragCard.current) {
      setModalIdx(+dragCard.current.dataset.i);
    }
  };

  const w = modalIdx !== null ? FLEET[modalIdx] : null;

  return (
    <section className="showcase" aria-label="Rental fleet — rotating showcase" ref={rootRef}>
      <div className="grain" aria-hidden="true" />

      <div className="numeral-mask" aria-hidden="true">
        <div className="numeral" key={active}>{pad(active + 1)}</div>
      </div>

      <div className="floor-shadow" ref={shadowRef} aria-hidden="true" />

      <div
        className="scene"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="tilt" ref={tiltRef}>
          <div className="spinner" ref={spinnerRef}>
            {FLEET.map((car, i) => (
              <article
                key={car.title}
                className={"card" + (i === active ? " active" : "")}
                data-i={i}
                ref={(el) => { cardRefs.current[i] = el; }}
              >
                <div className="card-front">
                  <div className="card-media">
                    {car.img ? (
                      <img src={car.img} alt={car.title + " — " + car.cat} draggable="false" />
                    ) : (
                      <div className="media-ph" aria-hidden="true" />
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-row">
                      <span className="card-idx">{pad(i + 1)}</span>
                      <span className="card-cat">{car.cat}</span>
                    </div>
                    <h3 className="card-title">{car.title}</h3>
                    <div className="card-foot">
                      <span className="card-tags">{car.rent} / day</span>
                    </div>
                  </div>
                  <div className="card-dim" ref={(el) => { dimRefs.current[i] = el; }} />
                </div>
                <div className="card-back">
                  <div className="cb-top">RentRide — Fleet</div>
                  <div className="cb-num">{pad(i + 1)}</div>
                  <div className="cb-bottom">Vehicle {pad(i + 1)} / {pad(N)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <aside className="info">
        <div className="info-inner" key={active}>
          <div className="info-index fx">
            {pad(active + 1)}<span className="sep">/</span><span className="tot">{pad(N)}</span>
          </div>
          <h1 className="info-title fx">{FLEET[active].title}</h1>
          <div className="info-meta fx">
            <span className="acc-sq" />
            <span>{FLEET[active].cat}</span>
            <span>—</span>
            <span>{FLEET[active].trans}</span>
          </div>
          <p className="info-desc fx">{FLEET[active].desc}</p>
          <button className="info-open fx" type="button" onClick={() => setModalIdx(active)}>
            {FLEET[active].rent} / day — View details
          </button>
        </div>
      </aside>

      <nav className="rail" aria-label="Fleet index">
        {FLEET.map((car, i) => (
          <button
            key={car.title}
            className={"rail-item" + (i === active ? " active" : "")}
            type="button"
            aria-label={"Go to " + car.title}
            onClick={() => { if (doneRef.current) goTo(i); }}
          >
            <span className="rail-num">{pad(i + 1)}</span>
            <span className="rail-tick" />
          </button>
        ))}
      </nav>

   
      {modalIdx !== null && (
        <div className={"modal" + (modalClosing ? " closing" : "")} role="dialog" aria-modal="true">
          <div className="modal-panel" onAnimationEnd={onModalAnimEnd}>
            <button className="overlay-close" type="button" aria-label="Close details" onClick={closeModal}>
              {SVG_X}
            </button>
            <div className="modal-scroll" ref={scrollRef} key={modalIdx}>
              <div className="m-idx modal-reveal r1">{pad(modalIdx + 1)} / {pad(N)} — Fleet</div>
              <h2 className="m-title modal-reveal r2">{w.title}</h2>
              <div className="m-meta modal-reveal r3">
                <div><span className="k">Seats</span><span className="v">{w.seats}</span></div>
                <div><span className="k">Transmission</span><span className="v">{w.trans}</span></div>
                <div><span className="k">Daily Rent</span><span className="v">{w.rent} / day</span></div>
              </div>
              <figure className="m-hero modal-reveal r4">
                {w.img ? (
                  <img src={w.img} alt={w.title} />
                ) : (
                  <div className="media-ph" aria-hidden="true" />
                )}
              </figure>
              <p className="m-lede modal-reveal r5">{w.lede}</p>
              <p className="m-body modal-reveal r6">{w.body}</p>
              <div className="m-nav modal-reveal r7">
                <button type="button" onClick={() => modalStep(-1)}>{SVG_PREV} Previous</button>
                <button type="button" onClick={() => modalStep(1)}>Next {SVG_NEXT}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}