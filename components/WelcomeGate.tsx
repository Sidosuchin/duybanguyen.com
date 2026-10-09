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
 * Screen A is ONE integrated editorial scene, not two boxes: the
 * artwork's paper background has been matted out of the assets
 * themselves, so the poster still is genuinely transparent and sits
 * directly on the gate's page background, and the intro video is
 * clipped by a silhouette mask of its own animation — no framed
 * rectangle in any state. Once the intro settles (video end, skip,
 * failure, or the safety timeout) the welcome text fades in beside
 * it as a plain block floating on the same background — no stage
 * frame, no panel card. When the video ends naturally, a matted
 * still of its last frame crossfades over the video and a small
 * greeter cat joins the scene inside the artwork's lower-left; the
 * poster still already contains a sitting cat, so the greeter only
 * appears on the video path (tracked via `settledVia`).
 */
/**
 * The intro video's last frame as a matted still (the cat standing on
 * top of the globe, paper genuinely transparent). On the natural
 * video path it crossfades in over the ended video: pixel-identical
 * artwork, but with no paper at all, so the settled scene has no
 * rectangle in any browser. Fades from opacity 0 on mount over
 * ~0.6s (double rAF so the transition reliably runs).
 */
function FinalStill() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setShown(true));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, []);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static settled-state asset, same pattern as the other gate artwork
    <img
      src="/images/cat-globe-final.webp"
      alt=""
      width={960}
      height={960}
      loading="eager"
      decoding="async"
      draggable={false}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

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
  // How the intro settled: "video" = the video played through to its
  // last frame (the cat on top of the globe is what the stage shows);
  // "still" = settled onto the poster still (skip / error). The 7s
  // fallback leaves this null until `ended` upgrades it, and reduced
  // motion never sets it. Only "video" renders the extra greeter cat
  // beside the artwork — the poster already contains a sitting cat,
  // so showing another one there would duplicate it.
  const [settledVia, setSettledVia] = useState<"video" | "still" | null>(
    null,
  );
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
    setSettledVia("still");
    setPhase("settled");
  };

  /** Back from the game: settled poster still — never replay the video. */
  const backToWelcome = () => {
    videoRef.current?.pause();
    setVideoFaded(true);
    setSettledVia("still");
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
                ? "lg:mx-auto lg:max-w-[1150px] lg:flex-row lg:items-center lg:gap-14"
                : ""
            }`}
          >
            {/* Intro stage — the artwork itself, unframed: the poster
                still underneath (its paper matted out of the asset, so
                it is genuinely transparent), the intro video layered
                on top and clipped by .gate-video-mask — a silhouette
                of the whole orbit animation — so the video's paper
                never shows either. While the intro runs the artwork
                sits centered on its own; once settled, desktop (≥lg)
                reflows into the hero — artwork left (~54%), welcome
                text right (~46%) — while mobile keeps a single column
                with a compact artwork so the text and its CTA stay
                close at hand. When the video ends naturally it stays
                mounted underneath, holding its last frame, while a
                matted still of that same frame crossfades over it and
                the greeter cat fades in inside the artwork's
                lower-left as part of the same scene. */}
            <div
              className={`relative aspect-square ${
                settled
                  ? "w-[min(78vw,340px)] lg:w-[54%] lg:max-w-[560px]"
                  : "w-[min(88vw,520px)]"
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
                  onEnded={() => {
                    setSettledVia("video");
                    setPhase("settled");
                  }}
                  onError={() => {
                    setVideoFailed(true);
                    setSettledVia("still");
                    setPhase("settled");
                  }}
                  className={`gate-video-mask absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                    videoFaded ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
              {/* Settled still for the natural video path: a matted
                  copy of the video's last frame crossfades over the
                  ended video (which stays mounted underneath), so
                  the final scene is pure illustration on the page
                  background — no paper rectangle in any browser,
                  Safari included. Poster paths never render it: the
                  poster still is already transparent. */}
              {settled &&
                settledVia === "video" &&
                !videoFaded &&
                !videoFailed && <FinalStill />}
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
              {/* Greeter cat — only on the natural video path: the
                  stage then shows the last frame (cat on top of the
                  globe), so this sitting cat joins the scene fully
                  inside the artwork's lower-left. Its paper is matted
                  out of the asset itself, so it grounds into the page
                  background instead of reading as a sticker. On every
                  poster path the still already contains a sitting
                  cat — no duplicate. It fades in with the welcome
                  text and never overlaps it (it belongs to the
                  artwork column). */}
              {settled &&
                settledVia === "video" &&
                !videoFaded &&
                !videoFailed && (
                  // eslint-disable-next-line @next/next/no-img-element -- static decorative asset, same pattern as the other gate artwork
                  <img
                    src="/images/panel-cat.webp"
                    alt=""
                    width={480}
                    height={480}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    aria-hidden="true"
                    className="gate-panel-in pointer-events-none absolute bottom-1 left-1 z-10 w-[100px] select-none sm:bottom-2 sm:left-2 sm:w-[120px] lg:bottom-3 lg:left-3 lg:w-[150px]"
                  />
                )}
            </div>

            {/* Welcome text — appears once the intro settles, as the
                right column of the desktop hero (below the compact
                artwork on mobile). It is a plain text block floating
                directly on the gate's page background: no card, no
                surface, no border, no shadow — the artwork and the
                words share one canvas, one scene. Desktop left-aligns
                it against the artwork; mobile centers it. The heading
                carries no border or outline of any kind. */}
            {settled && (
              <div className="gate-panel-in relative mt-8 w-full max-w-[600px] text-center lg:mt-0 lg:w-[46%] lg:max-w-none lg:text-left">
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
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
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
