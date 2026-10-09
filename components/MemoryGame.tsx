"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type TileId = "cat" | "laptop" | "books" | "coffee" | "globe" | "suitcase";

type Card = {
  key: string;
  tile: TileId;
  src: string;
};

const TILES: { id: TileId; src: string }[] = [
  { id: "cat", src: "/images/game/card-cat.webp" },
  { id: "laptop", src: "/images/game/card-laptop.webp" },
  { id: "books", src: "/images/game/card-books.webp" },
  { id: "coffee", src: "/images/game/card-coffee.webp" },
  { id: "globe", src: "/images/game/card-globe.webp" },
  { id: "suitcase", src: "/images/game/card-suitcase.webp" },
];

const PAIR_COUNT = TILES.length;
/** How long a mismatched pair stays face up before flipping back. */
const MISMATCH_DELAY_MS = 800;
/** Beat between finding the last pair and the completion screen. */
const WIN_DELAY_MS = 650;

/** Two copies of every tile, Fisher–Yates shuffled. */
function shuffledDeck(): Card[] {
  const cards: Card[] = TILES.flatMap((tile) => [
    { key: `${tile.id}-a`, tile: tile.id, src: tile.src },
    { key: `${tile.id}-b`, tile: tile.id, src: tile.src },
  ]);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

/**
 * The memory matching game shown inside the welcome gate: 12 cards,
 * 6 pairs. One "move" is one pair attempt (counted when the second
 * card flips). The board locks while a mismatched pair waits to flip
 * back, and found pairs stay face up with a terracotta ring.
 *
 * This component only ever mounts after a visitor presses "Start" on
 * the welcome screen — long after hydration — so shuffling with
 * Math.random in a state initializer is hydration-safe.
 */
export default function MemoryGame({
  onWin,
  onBack,
}: {
  onWin: (moves: number) => void;
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const w = t.welcome;

  const [deck, setDeck] = useState<Card[]>(shuffledDeck);
  const [faceUp, setFaceUp] = useState<number[]>([]);
  const [found, setFound] = useState<ReadonlySet<TileId>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [status, setStatus] = useState("");
  const timers = useRef<number[]>([]);

  // Clear any pending flip-back / win timers when leaving the game.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  function startOver() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setDeck(shuffledDeck());
    setFaceUp([]);
    setFound(new Set());
    setMoves(0);
    setLocked(false);
    setStatus("");
  }

  function flip(index: number) {
    if (locked) return;
    const card = deck[index];
    if (found.has(card.tile) || faceUp.includes(index)) return;

    const nextFaceUp = [...faceUp, index];
    setFaceUp(nextFaceUp);
    if (nextFaceUp.length < 2) return;

    // Second card of the attempt — this counts as one move.
    const nextMoves = moves + 1;
    setMoves(nextMoves);
    const [first, second] = nextFaceUp;

    if (deck[first].tile === deck[second].tile) {
      const tile = deck[first].tile;
      const nextFound = new Set(found);
      nextFound.add(tile);
      setFound(nextFound);
      setFaceUp([]);
      if (nextFound.size === PAIR_COUNT) {
        setStatus(w.winStatus);
        later(() => onWin(nextMoves), WIN_DELAY_MS);
      } else {
        setStatus(w.matchFound.replace("{name}", w.cards[tile]));
      }
    } else {
      setLocked(true);
      setStatus(w.mismatch);
      later(() => {
        setFaceUp([]);
        setLocked(false);
      }, MISMATCH_DELAY_MS);
    }
  }

  return (
    <div className="w-full">
      {/* Header (storyboard frame 6) — circular back button on the
          left, the game title centered with the moves/pairs counter
          line directly beneath it. The gate-level VI|EN switcher sits
          at the gate's own top-right, so it is not repeated here. */}
      <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem]">
        <button
          type="button"
          onClick={onBack}
          aria-label={w.back}
          className="absolute top-1/2 left-0 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel text-charcoal shadow-[0_4px_14px_rgba(22,18,15,0.08)] transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M20 12H4m6-6-6 6 6 6" />
          </svg>
        </button>
        <h2
          data-gate-heading
          tabIndex={-1}
          className="px-12 text-center font-display text-3xl font-extrabold tracking-tight outline-none sm:text-4xl"
        >
          {w.gameTitle}
        </h2>
        <p className="mt-2.5 text-center text-sm text-muted">
          {w.moves}:{" "}
          <span className="font-display text-base font-bold text-charcoal">
            {moves}
          </span>
          <span aria-hidden="true" className="mx-2 opacity-50">
            |
          </span>
          {w.pairs}:{" "}
          <span className="font-display text-base font-bold text-charcoal">
            {found.size}/{PAIR_COUNT}
          </span>
        </p>
      </div>
      <div
        role="progressbar"
        aria-label={w.progress}
        aria-valuemin={0}
        aria-valuemax={PAIR_COUNT}
        aria-valuenow={found.size}
        className="mx-auto mt-4 h-1.5 w-full max-w-[26rem] overflow-hidden rounded-full bg-line sm:max-w-[30rem]"
      >
        <div
          className="h-full rounded-full bg-terracotta transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${(found.size / PAIR_COUNT) * 100}%` }}
        />
      </div>

      {/* Screen-reader announcements for matches and the win */}
      <p aria-live="polite" role="status" className="sr-only">
        {status}
      </p>

      {/* The board */}
      <div className="mx-auto mt-5 grid w-full max-w-[26rem] grid-cols-3 gap-2.5 sm:max-w-[30rem] sm:grid-cols-4 sm:gap-3.5">
        {deck.map((card, index) => {
          const isFound = found.has(card.tile);
          const isUp = isFound || faceUp.includes(index);
          const name = w.cards[card.tile];
          const label = isFound
            ? w.cardFound.replace("{name}", name)
            : isUp
              ? w.cardUp.replace("{name}", name)
              : w.cardDown.replace("{n}", String(index + 1));
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => flip(index)}
              disabled={isFound}
              aria-pressed={isUp}
              aria-label={label}
              data-state={isFound ? "found" : isUp ? "up" : "down"}
              className={`memory-card relative aspect-square w-full rounded-[0.9rem] transition-transform duration-200 motion-reduce:transition-none ${
                isFound
                  ? "cursor-default ring-2 ring-terracotta ring-offset-2 ring-offset-paper"
                  : "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              }`}
            >
              <span className="memory-card-inner" aria-hidden="true">
                {/* Back — flat terracotta with a cream paw print
                    (storyboard frame 6) */}
                <span className="memory-card-face bg-terracotta shadow-[0_8px_20px_rgba(22,18,15,0.12)]">
                  <span className="absolute inset-0 grid place-items-center">
                    <svg
                      viewBox="0 0 100 100"
                      fill="currentColor"
                      className="h-11 w-11 text-cream sm:h-14 sm:w-14"
                    >
                      {/* main pad */}
                      <ellipse cx="50" cy="69" rx="21" ry="16" />
                      {/* four toes */}
                      <ellipse
                        cx="20"
                        cy="42"
                        rx="8.5"
                        ry="12"
                        transform="rotate(-18 20 42)"
                      />
                      <ellipse
                        cx="39"
                        cy="30"
                        rx="9"
                        ry="13"
                        transform="rotate(-6 39 30)"
                      />
                      <ellipse
                        cx="61"
                        cy="30"
                        rx="9"
                        ry="13"
                        transform="rotate(6 61 30)"
                      />
                      <ellipse
                        cx="80"
                        cy="42"
                        rx="8.5"
                        ry="12"
                        transform="rotate(18 80 42)"
                      />
                    </svg>
                  </span>
                </span>
                {/* Front — the painterly tile */}
                <span className="memory-card-face memory-card-front border border-line bg-cream shadow-[0_8px_20px_rgba(22,18,15,0.12)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny static game asset; plain img avoids optimizer overhead */}
                  <img
                    src={card.src}
                    alt=""
                    width={480}
                    height={480}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover select-none"
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Game actions — replay as a quiet pill; going back lives in
          the header's circular button now. */}
      <div className="mt-7 flex items-center justify-center">
        <button
          type="button"
          onClick={startOver}
          className="rounded-full border border-charcoal/25 px-6 py-2.5 text-sm font-semibold transition-colors hover:border-terracotta hover:text-terracotta"
        >
          {w.replay}
        </button>
      </div>
    </div>
  );
}
