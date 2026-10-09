"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type TileId = "cat" | "laptop" | "books" | "coffee" | "sun" | "moon";

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
  { id: "sun", src: "/images/game/card-sun.webp" },
  { id: "moon", src: "/images/game/card-moon.webp" },
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
      {/* HUD — moves, pairs and a slim progress bar */}
      <div className="mx-auto flex w-full max-w-[26rem] items-end justify-between gap-4 text-sm sm:max-w-[30rem]">
        <p>
          <span className="text-muted">{w.moves}: </span>
          <span className="font-display text-base font-bold">{moves}</span>
        </p>
        <p>
          <span className="text-muted">{w.pairs}: </span>
          <span className="font-display text-base font-bold">
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
        className="mx-auto mt-2.5 h-1.5 w-full max-w-[26rem] overflow-hidden rounded-full bg-line sm:max-w-[30rem]"
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
                {/* Back — charcoal editorial panel, dot texture, "D" monogram */}
                <span className="memory-card-face bg-night text-night-text shadow-[inset_0_0_0_1px_var(--color-line-dark)]">
                  <span className="dot-grid absolute inset-0 opacity-70" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-night-text/40 font-display text-lg font-bold sm:h-12 sm:w-12 sm:text-xl">
                      D
                    </span>
                  </span>
                </span>
                {/* Front — the painterly tile */}
                <span className="memory-card-face memory-card-front border border-line bg-cream">
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

      {/* Game actions */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={startOver}
          className="rounded-lg bg-charcoal px-6 py-3 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
        >
          {w.replay}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-charcoal/25 px-6 py-3 text-[15px] font-semibold transition-colors hover:border-terracotta hover:text-terracotta"
        >
          {w.back}
        </button>
      </div>
    </div>
  );
}
