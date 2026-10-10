"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import MemoryGame from "./MemoryGame";

/** sessionStorage flag — set once the visitor finishes the game. */
const UNLOCK_KEY = "dbn-welcome-unlocked";

type Screen = "welcome" | "game" | "done";

/** Screen A runs in two beats: the intro video plays, then it settles. */
type IntroPhase = "intro" | "settled";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * prefers-reduced-motion, read the React-sanctioned way (same pattern
 * as ThemeProvider): the server snapshot is `false`, so the server
 * render and the hydration pass agree, and the real client value takes
 * over immediately after with no hydration mismatch. Reduced-motion
 * visitors never get the intro video at all — just the poster still
 * and the panel, ready to use.
 */
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void): () => void {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMotionSnapshot(): boolean {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionSnapshot(): boolean {
  return false;
}

/**
 * Welcome gate — a playful first-visit-per-session overlay (welcome →
 * memory game → completion), NOT a login. Whether it is visible is
 * decided before first paint: the inline script in the root layout sets
 * `data-welcome="locked"` on <html> when this session has no unlock
 * flag, and CSS (globals.css `.welcome-gate`) shows the overlay only
 * while that attribute is present. This component therefore renders the
 * exact same DOM on the server and the client — no hydration mismatch,
 * no flash of the site — and React only manages the three screens and
 * dismissal. If sessionStorage is unavailable (private mode), the
 * script fails open: the attribute is never set and the gate never
 * appears. Unlocking simply stores the flag and removes the attribute;
 * there are no redirects — the visitor is already on the route they
 * asked for, on whichever page the gate was mounted over.
 *
 * Screen A (v3) is ONE unified hero scene. A single hero painting
 * (desktop or mobile variant, chosen by <picture>) is rendered
 * beneath everything from the start — its outer band is graded to
 * the exact page cream, so it needs no frame, mask or matte — and
 * the intro plays as an overlay layer above it: the familiar poster
 * still + silhouette-masked orbit video in a centered square stage.
 * When the intro settles (video end, skip, failure, or the safety
 * timeout) the overlay fades out and unmounts, revealing the hero:
 * the welcome text over the painting's calm right zone (below it on
 * mobile) and the two-layer greeter cat registered over the
 * painting's lower-left, present on EVERY settled path (video,
 * skip, error, reduced motion, back-from-game) — the painting
 * itself carries no sitting cat, so the live layers are the only
 * one. The gate also always renders its light editorial palette
 * (see the cream-lock token scope on `.welcome-gate` in
 * globals.css), whatever theme the page behind it uses.
 */

export default function WelcomeGate() {
  const { t } = useLanguage();
  const w = t.welcome;
  const [screen, setScreen] = useState<Screen>("welcome");
  const [finalMoves, setFinalMoves] = useState<number | null>(null);
  const [gone, setGone] = useState(false);
  // Intro state machine (Screen A). `phase` flips to "settled" when
  // the video ends, is skipped, errors, or the safety timeout fires.
  const [phase, setPhase] = useState<IntroPhase>("intro");
  // Crossfade the video out so the poster still shows instead — used
  // by Skip and when coming back from the game (never replay).
  const [videoFaded, setVideoFaded] = useState(false);
  // The intro overlay unmounts once its settle fade has finished, so
  // it never lingers (invisible) above the hero intercepting clicks.
  const [overlayGone, setOverlayGone] = useState(false);
  // The video failed to load/play: drop it entirely, keep the still.
  const [videoFailed, setVideoFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Greeter cat stack + the Start CTA — the two ends of the tail-wag
  // proximity system below.
  const catRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot,
  );

  const showVideo = !reducedMotion && !videoFailed;
  // Reduced-motion visitors start settled: still + panel, no video.
  const settled = phase === "settled" || reducedMotion;
  // The greeter cat stack is mounted whenever the settled hero is on
  // screen (welcome screen only) — every settle path shows the same
  // hero, so the proximity system below keys off this, not off how
  // the intro happened to end.
  const catMounted = settled && screen === "welcome";

  // Safety net: if `ended` never fires (stalled network, odd codec),
  // settle anyway so the panel — and the way in — always appears.
  useEffect(() => {
    if (phase !== "intro" || reducedMotion) return;
    const id = window.setTimeout(() => setPhase("settled"), 7000);
    return () => window.clearTimeout(id);
  }, [phase, reducedMotion]);

  // Once settled, the intro overlay fades out over 500ms; unmount it
  // just after the fade so it leaves the hero fully interactive.
  // Reduced-motion visitors never render the overlay at all.
  useEffect(() => {
    if (!settled || reducedMotion) return;
    const id = window.setTimeout(() => setOverlayGone(true), 550);
    return () => window.clearTimeout(id);
  }, [settled, reducedMotion]);

  // Move focus to the gate root whenever the screen changes — but
  // only while the gate is actually shown, so a returning (already
  // unlocked) visitor's page is never disturbed. The root — never a
  // heading — is the focus target: headings are not focusable
  // anymore, because the auto-focused heading picked up the global
  // :focus-visible terracotta ring, which read as a "border" drawn
  // around it. Keep the existing exception: don't steal focus from a
  // visitor who is already interacting (e.g. the language switcher).
  useEffect(() => {
    if (document.documentElement.getAttribute("data-welcome") !== "locked") {
      return;
    }
    const active = document.activeElement;
    if (
      active &&
      active !== document.body &&
      !active.hasAttribute("data-skip-intro")
    ) {
      return;
    }
    rootRef.current?.focus({ preventScroll: true });
  }, [screen, settled]);

  // Tail-wag proximity system. While the greeter cat is mounted (the
  // settled hero), ease its wag speed/amplitude (the --tail-dur /
  // --tail-amp variables on the cat stack) toward a target driven by
  // how close the pointer is
  // to the Start button: far away the wag idles (1.35s, ±3.2°); at
  // the button it is excited (0.5s, ±4.6°). Everything runs in refs
  // and a requestAnimationFrame loop — pointermove only records
  // coordinates, never setState — and the per-frame lerp (0.08) is
  // the hysteresis: excitement builds and decays smoothly instead of
  // snapping at a threshold. Devices without a hover-capable pointer
  // get no pointer listener at all; there, focusing or pressing Start
  // excites the cat directly (keyboard focus included) and
  // blur/release calms it back down. Pressing Start unmounts Screen A
  // as usual, which cleans the whole system up.
  useEffect(() => {
    if (!catMounted || reducedMotion) return;
    const cat = catRef.current;
    const btn = startBtnRef.current;
    if (!cat || !btn) return;

    const IDLE = { dur: 1.35, amp: 3.2 };
    const EXCITED = { dur: 0.5, amp: 4.6 };
    const NEAR_PX = 60; // at or inside this distance: fully excited
    const FAR_PX = 420; // at or beyond this distance: fully idle
    const current = { ...IDLE };
    const pointer = { x: 0, y: 0, seen: false };
    let boost = false; // Start is focused or pressed (any device)
    let raf = 0;

    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.seen = true;
    };
    const boostOn = () => {
      boost = true;
    };
    const boostOff = () => {
      boost = false;
    };

    if (hoverCapable) {
      window.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
    }
    btn.addEventListener("focus", boostOn);
    btn.addEventListener("blur", boostOff);
    btn.addEventListener("pointerdown", boostOn);
    btn.addEventListener("pointerup", boostOff);
    btn.addEventListener("pointercancel", boostOff);

    const tick = () => {
      let target: { dur: number; amp: number } = IDLE;
      if (boost) {
        target = EXCITED;
      } else if (hoverCapable && pointer.seen) {
        // Distance from the pointer to the button's rect — 0 inside,
        // otherwise the gap to the nearest edge — mapped through a
        // smoothstep so excitement fades in across NEAR..FAR.
        const rect = btn.getBoundingClientRect();
        const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
        const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
        const d = Math.hypot(dx, dy);
        if (d <= NEAR_PX) {
          target = EXCITED;
        } else if (d < FAR_PX) {
          const x = (FAR_PX - d) / (FAR_PX - NEAR_PX);
          const s = x * x * (3 - 2 * x);
          target = {
            dur: IDLE.dur + (EXCITED.dur - IDLE.dur) * s,
            amp: IDLE.amp + (EXCITED.amp - IDLE.amp) * s,
          };
        }
      }
      current.dur += (target.dur - current.dur) * 0.08;
      current.amp += (target.amp - current.amp) * 0.08;
      cat.style.setProperty("--tail-dur", `${current.dur.toFixed(3)}s`);
      cat.style.setProperty("--tail-amp", `${current.amp.toFixed(3)}deg`);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      if (hoverCapable) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      btn.removeEventListener("focus", boostOn);
      btn.removeEventListener("blur", boostOff);
      btn.removeEventListener("pointerdown", boostOn);
      btn.removeEventListener("pointerup", boostOff);
      btn.removeEventListener("pointercancel", boostOff);
    };
  }, [catMounted, reducedMotion]);

  if (gone) return null;

  const enterSite = () => {
    try {
      window.sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      // storage unavailable — still dismiss for this page view
    }
    document.documentElement.removeAttribute("data-welcome");
    // Unmount once the CSS fade-out has finished.
    window.setTimeout(() => setGone(true), 400);
  };

  /** Skip the intro: pause the video and settle onto the hero. */
  const skipIntro = () => {
    videoRef.current?.pause();
    setVideoFaded(true);
    setPhase("settled");
  };

  /** Back from the game: the settled hero — never replay the video. */
  const backToWelcome = () => {
    videoRef.current?.pause();
    setVideoFaded(true);
    setPhase("settled");
    setScreen("welcome");
  };

  /** Keep Tab cycling inside the gate while it is up (aria-modal). */
  const trapTab = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={w.dialogLabel}
      onKeyDown={trapTab}
      className="welcome-gate fixed inset-0 z-[80] overflow-y-auto bg-paper text-charcoal"
    >
      {/* The VI|EN switcher stays reachable while the gate is up, so the
          whole gate (like the rest of the site) switches instantly. It
          sits above the intro overlay (z-10), hence z-20. */}
      <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="flex min-h-full items-center justify-center px-5 py-12 sm:px-8">
        {screen === "welcome" && (
          <div className="relative mx-auto w-full max-w-[1360px]">
            {/* Hero painting — one unified scene, rendered beneath
                everything from the start (no flash, no reflow when
                the intro settles): a painted environment plate with
                the approved globe artwork composited in, its outer
                band graded to the exact page cream, so it needs no
                frame, mask or matte. <picture> picks the desktop
                variant at lg; below that the square mobile painting
                fills a min(96vw, 560px) box. The plate is sized so a
                900px-tall desktop viewport shows it whole: width
                capped at 114vh with a 4/3 aspect. The painting itself
                contains NO sitting cat — the live two-layer cat stack
                below is registered over its lower-left. */}
            <div
              className={`relative mx-auto aspect-square w-[min(96vw,560px)] transition-opacity duration-700 motion-reduce:transition-none lg:aspect-[4/3] lg:w-[min(100%,114vh)] ${
                settled ? "opacity-100" : "opacity-0"
              }`}
            >
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="/images/hero-desktop.webp"
                />
                <img
                  src="/images/hero-mobile.webp"
                  alt=""
                  width={1400}
                  height={1400}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover select-none"
                />
              </picture>
              {/* Greeter cat — mounted whenever the hero is settled,
                  on EVERY path (video, skip, error, reduced motion,
                  back-from-game): the same scene always greets the
                  visitor. It is registered over the painting's
                  lower-left (percentages of the plate, measured from
                  the artwork) and is a two-layer stack of one 595×595
                  frame — tail curl below, tail-less body above — so
                  the tail can wag around its root (see .gate-tail):
                  idly on its own, faster and wider as the pointer
                  nears the Start button (proximity effect above). */}
              {settled && (
                <div
                  ref={catRef}
                  aria-hidden="true"
                  style={
                    {
                      "--tail-dur": "1.35s",
                      "--tail-amp": "3.2deg",
                    } as CSSProperties
                  }
                  className="gate-panel-in pointer-events-none absolute top-[51.54%] left-0 z-10 aspect-square w-[36.56%] select-none lg:top-[56.2%] lg:left-[-0.62%] lg:w-[29.16%]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static decorative asset, same pattern as the other gate artwork */}
                  <img
                    src="/images/panel-cat-tail.webp"
                    alt=""
                    width={595}
                    height={595}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="gate-tail absolute inset-0 h-full w-full"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- static decorative asset, same pattern as the other gate artwork */}
                  <img
                    src="/images/panel-cat-body.webp"
                    alt=""
                    width={595}
                    height={595}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              )}
            </div>

            {/* Welcome text — appears once the intro settles. On
                mobile it flows below the painting, centered; on
                desktop it is absolutely placed over the painting's
                calm right zone, vertically centered on the scene.
                The entrance animation lives on an inner wrapper so
                its keyframe transform never fights the desktop
                -translate-y-1/2 centering on this block. The heading
                is deliberately NOT focusable (see the focus effect):
                it carries no border or outline of any kind. */}
            {settled && (
              <div className="relative mx-auto mt-2 w-full max-w-[600px] text-center lg:absolute lg:top-1/2 lg:right-[4.5%] lg:mt-0 lg:w-[35%] lg:max-w-none lg:-translate-y-1/2 lg:text-left">
                <div className="gate-panel-in">
                  <p className="text-xs font-semibold tracking-[0.24em] text-terracotta uppercase">
                    {w.label}
                  </p>
                  <h2
                    data-gate-heading
                    className="mt-4 font-display text-4xl font-bold tracking-tight outline-none sm:text-5xl lg:text-[56px] lg:leading-[1.05]"
                  >
                    {w.heading}
                  </h2>
                  <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                    {w.description}
                  </p>
                  <button
                    ref={startBtnRef}
                    type="button"
                    onClick={() => setScreen("game")}
                    className="group mt-9 inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-[15px] font-semibold text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-terracotta motion-reduce:hover:translate-y-0"
                  >
                    {w.start}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      <path d="M4 12h16m-6-6 6 6-6 6" />
                    </svg>
                  </button>
                  <p className="mt-5 text-sm text-muted">{w.supporting}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {screen === "game" && (
          <div className="gate-screen-in w-full max-w-xl">
            {/* The game renders its own frame-6 header (back button,
                title, counters) — see MemoryGame. */}
            <MemoryGame
              onWin={(moves) => {
                setFinalMoves(moves);
                setScreen("done");
              }}
              onBack={backToWelcome}
            />
          </div>
        )}

        {screen === "done" && (
          <div className="gate-screen-in w-full max-w-xl text-center">
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-line shadow-[0_10px_30px_rgba(22,18,15,0.12)] sm:h-36 sm:w-36">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static UI asset, same pattern as CatToggle */}
              <img
                src="/images/cat-night.webp"
                alt=""
                width={512}
                height={512}
                loading="eager"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover select-none"
              />
            </div>
            <p className="mt-8 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.24em] text-terracotta uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-terracotta" />
              {w.doneEyebrow}
              <span aria-hidden="true" className="h-px w-10 bg-terracotta" />
            </p>
            <h2
              data-gate-heading
              className="mt-5 font-display text-4xl font-extrabold tracking-tight outline-none sm:text-5xl"
            >
              {w.doneTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {w.doneBody}
            </p>
            {finalMoves !== null && (
              <p className="mt-3 text-sm font-medium text-terracotta">
                {w.doneMoves.replace("{moves}", String(finalMoves))}
              </p>
            )}
            <button
              type="button"
              onClick={enterSite}
              className="mt-9 rounded-lg bg-charcoal px-8 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
            >
              {w.enter}
            </button>
          </div>
        )}
      </div>

      {/* Intro overlay — the orbit intro as its own layer above the
          hero (which is already rendered beneath it): the poster
          still with the silhouette-masked video on top and the Skip
          button, in the centered square stage the intro has always
          had. On settle it fades out over 500ms and then unmounts
          (see the overlayGone effect), dissolving into the hero.
          Reduced-motion visitors never see it; back-from-game lands
          on the hero directly because the overlay is long gone. */}
      {screen === "welcome" && !reducedMotion && !overlayGone && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${
            settled ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative aspect-square w-[min(88vw,520px)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static poster asset, same pattern as the other gate artwork */}
            <img
              src="/images/cat-globe-poster.webp"
              alt=""
              width={960}
              height={960}
              loading="eager"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover select-none"
            />
            {showVideo && (
              <video
                ref={(el) => {
                  videoRef.current = el;
                  // React's `muted` prop alone is not always applied
                  // as the property autoplay policies check — set it
                  // directly so the muted autoplay reliably starts.
                  if (el) el.muted = true;
                }}
                src="/video/cat-orbit-intro.mp4"
                poster="/images/cat-globe-poster.webp"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                onEnded={() => {
                  setPhase("settled");
                }}
                onError={() => {
                  setVideoFailed(true);
                  setPhase("settled");
                }}
                className={`gate-video-mask absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                  videoFaded ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {!settled && showVideo && (
              <button
                type="button"
                data-skip-intro
                onClick={skipIntro}
                className="absolute right-3 bottom-3 rounded-full border border-line bg-paper/90 px-3.5 py-1.5 text-xs font-medium text-charcoal shadow-[0_4px_14px_rgba(22,18,15,0.12)] backdrop-blur-sm transition-colors hover:bg-paper sm:right-4 sm:bottom-4"
              >
                {w.skipIntro}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Without JS the pre-paint script cannot run either, but keep the
          gate out of the way regardless — it must never trap a visitor. */}
      <noscript>
        <style>{`.welcome-gate{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
