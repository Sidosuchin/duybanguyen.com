"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
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
 * Screen A opens with a short muted video — the orange cat orbits a
 * hand-drawn globe and lands on top of it — layered over its poster
 * still inside a framed stage. When the video ends (or is skipped, or
 * fails, or a safety timeout fires) the screen settles and the welcome
 * panel fades in below the stage.
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
  // The video failed to load/play: drop it entirely, keep the still.
  const [videoFailed, setVideoFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot,
  );

  const showVideo = !reducedMotion && !videoFailed;
  // Reduced-motion visitors start settled: still + panel, no video.
  const settled = phase === "settled" || reducedMotion;

  // Safety net: if `ended` never fires (stalled network, odd codec),
  // settle anyway so the panel — and the way in — always appears.
  useEffect(() => {
    if (phase !== "intro" || reducedMotion) return;
    const id = window.setTimeout(() => setPhase("settled"), 7000);
    return () => window.clearTimeout(id);
  }, [phase, reducedMotion]);

  // Move focus to the active screen's heading whenever the screen
  // changes — but only while the gate is actually shown, so a returning
  // (already unlocked) visitor's page is never disturbed. On Screen A
  // the heading only exists once the intro settles; when it appears,
  // focus it unless the visitor is already using the language switcher.
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
    rootRef.current
      ?.querySelector<HTMLElement>("[data-gate-heading]")
      ?.focus();
  }, [screen, settled]);

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

  /** Skip the intro: pause, crossfade to the poster still, settle. */
  const skipIntro = () => {
    videoRef.current?.pause();
    setVideoFaded(true);
    setPhase("settled");
  };

  /** Back from the game: settled poster still — never replay the video. */
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
      role="dialog"
      aria-modal="true"
      aria-label={w.dialogLabel}
      onKeyDown={trapTab}
      className="welcome-gate fixed inset-0 z-[80] overflow-y-auto bg-paper text-charcoal"
    >
      {/* The VI|EN switcher stays reachable while the gate is up, so the
          whole gate (like the rest of the site) switches instantly. */}
      <div className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="flex min-h-full items-center justify-center px-5 py-12 sm:px-8">
        {screen === "welcome" && (
          <div
            className={`flex w-full flex-col items-center ${
              settled
                ? "lg:mx-auto lg:max-w-[1100px] lg:flex-row lg:gap-12"
                : ""
            }`}
          >
            {/* Intro stage — a framed square artwork: the poster still
                underneath, the intro video layered on top of it. The
                illustration's cream background is baked in, so in dark
                mode the stage simply reads as a framed picture. When
                the video ends naturally it stays visible, holding its
                last frame (the cat on top of the globe). While the
                intro runs, the stage sits centered on its own; once
                settled, desktop (≥lg) reflows into one unified hero —
                stage left (~52%), welcome panel right (~48%) — while
                mobile keeps a single column with a compact stage so
                the panel and its CTA stay close at hand. */}
            <div
              className={`relative aspect-square overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_18px_50px_rgba(22,18,15,0.1)] ${
                settled ? "w-[min(78vw,340px)] lg:w-[52%]" : "w-[min(88vw,520px)]"
              }`}
            >
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
                  onEnded={() => setPhase("settled")}
                  onError={() => {
                    setVideoFailed(true);
                    setPhase("settled");
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
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

            {/* Welcome panel — appears once the intro settles, as the
                right column of the desktop hero (below the compact
                stage on mobile). Storyboard frames 4–5: the sitting
                cat tucks into the panel's bottom-left corner, faded
                in with a soft radial mask and kept clear of the text
                by the panel padding. The heading carries no border or
                outline of any kind — the panel's only border is its
                hairline neutral border-line. */}
            {settled && (
              <div className="gate-panel-in relative mt-6 w-full max-w-[600px] rounded-2xl border border-line bg-panel px-6 pt-10 pb-16 text-center shadow-[0_18px_50px_rgba(22,18,15,0.08)] sm:px-12 sm:pt-12 sm:pb-[4.5rem] lg:mt-0 lg:w-[48%] lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element -- static decorative asset, same pattern as the other gate artwork */}
                <img
                  src="/images/panel-cat.webp"
                  alt=""
                  width={480}
                  height={480}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  aria-hidden="true"
                  className="gate-decor-mask pointer-events-none absolute -bottom-9 left-2 w-[92px] select-none sm:w-[120px] lg:-left-8 lg:w-[132px]"
                />
                <div className="relative">
                  <p className="text-xs font-semibold tracking-[0.24em] text-terracotta uppercase">
                    {w.label}
                  </p>
                  <h2
                    data-gate-heading
                    tabIndex={-1}
                    className="mt-4 font-display text-4xl font-bold tracking-tight outline-none sm:text-5xl"
                  >
                    {w.heading}
                  </h2>
                  <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                    {w.description}
                  </p>
                  <button
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
              tabIndex={-1}
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

      {/* Without JS the pre-paint script cannot run either, but keep the
          gate out of the way regardless — it must never trap a visitor. */}
      <noscript>
        <style>{`.welcome-gate{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
