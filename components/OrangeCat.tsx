/**
 * The Orange Cat — ONE character, two poses.
 *
 * Both poses are hand-authored from a single character design: the head
 * (face shape, ears, stripes, muzzle) is one shared component, the fur /
 * stripe / cream palette and stroke weight are shared constants, and the
 * tail in both poses uses the same layered-stroke banding technique.
 * Only the body posture and the eyes change: awake at a laptop in light
 * mode, curled up asleep in dark mode.
 *
 * Pose visibility is driven purely by the `.dark` class on <html> (via
 * the `dark:` variant), so the correct cat is on screen from the first
 * paint — no JS state, no flash, no hydration mismatch.
 */

const FUR = "#E8913A"; // warm ginger orange
const STRIPE = "#BC5633"; // terracotta stripes — the site accent
const CREAM = "#FAF0E4"; // muzzle, belly, inner ear, laptop screen
const INK = "#2E211A"; // warm charcoal line work
const LAPTOP = "#3A332D"; // charcoal laptop body
const SW = 2.2; // one stroke weight for the whole character

type CatHeadProps = {
  eyes: "open" | "closed";
  /** Awake pose only: one ear tipped slightly outward, alert and working. */
  tiltEar?: boolean;
};

/**
 * The shared head — drawn once, reused by both poses (the sleeping pose
 * reuses it as-is, rotated, with closed eyes). Local coordinates:
 * face is a circle of r=11 centred on (0, 0).
 */
function CatHead({ eyes, tiltEar = false }: CatHeadProps) {
  const rightEar = (
    <>
      <path
        d="M10.2,-4.6 L11.8,-15.4 L2.6,-10.6 Z"
        fill={FUR}
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M9.3,-6.8 L10.4,-12.8 L5.2,-9.9 Z" fill={CREAM} />
    </>
  );

  return (
    <g strokeLinecap="round">
      {/* Ears — drawn first so the face circle tidies their bases */}
      <path
        d="M-10.2,-4.6 L-11.8,-15.4 L-2.6,-10.6 Z"
        fill={FUR}
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M-9.3,-6.8 L-10.4,-12.8 L-5.2,-9.9 Z" fill={CREAM} />
      {tiltEar ? (
        <g transform="rotate(7 10.2 -4.6)">{rightEar}</g>
      ) : (
        rightEar
      )}

      {/* Face */}
      <circle r="11" fill={FUR} stroke={INK} strokeWidth={SW} />

      {/* Forehead stripes */}
      <g stroke={STRIPE} strokeWidth={1.7}>
        <path d="M0,-10.6 L0,-7.6" />
        <path d="M-4.6,-9.9 L-4,-7.2" />
        <path d="M4.6,-9.9 L4,-7.2" />
      </g>
      {/* Cheek stripes */}
      <g stroke={STRIPE} strokeWidth={1.5}>
        <path d="M-10.9,-1.2 L-8.2,-0.7" />
        <path d="M-10.6,2.2 L-8,1.9" />
        <path d="M10.9,-1.2 L8.2,-0.7" />
        <path d="M10.6,2.2 L8,1.9" />
      </g>

      {/* Muzzle, nose, mouth */}
      <ellipse cx="0" cy="3.6" rx="5.4" ry="4.1" fill={CREAM} />
      <path
        d="M-1.7,2 Q0,1.2 1.7,2 Q1.2,3.4 0,3.8 Q-1.2,3.4 -1.7,2 Z"
        fill={STRIPE}
      />
      <path
        d="M0,3.8 Q0,5 -1.9,5.2 M0,3.8 Q0,5 1.9,5.2"
        fill="none"
        stroke={INK}
        strokeWidth={1.3}
      />

      {/* Whiskers */}
      <g stroke={INK} strokeWidth={0.9} opacity={0.5}>
        <path d="M-6.2,2.6 L-11.8,1.2" />
        <path d="M-6.2,4.4 L-11.6,5.2" />
        <path d="M6.2,2.6 L11.8,1.2" />
        <path d="M6.2,4.4 L11.6,5.2" />
      </g>

      {/* Eyes — the only facial difference between the poses */}
      {eyes === "open" ? (
        <g fill={INK}>
          <circle cx="-4" cy="-0.6" r="1.4" />
          <circle cx="4" cy="-0.6" r="1.4" />
          <circle cx="-4.5" cy="-1.1" r="0.5" fill="#FFF" opacity={0.85} />
          <circle cx="3.5" cy="-1.1" r="0.5" fill="#FFF" opacity={0.85} />
        </g>
      ) : (
        <g fill="none" stroke={INK} strokeWidth={1.6}>
          <path d="M-5.8,-0.8 Q-4,0.6 -2.2,-0.8" />
          <path d="M2.2,-0.8 Q4,0.6 5.8,-0.8" />
        </g>
      )}
    </g>
  );
}

/**
 * The banded tail, one technique for both poses: an ink under-stroke for
 * the outline, the fur stroke on top, then terracotta bands dashed along
 * the same path — identical stripes, any posture.
 */
function BandedTail({
  d,
  length,
  dash,
  offset,
}: {
  d: string;
  length: number;
  dash: string;
  offset: number;
}) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={INK} strokeWidth={7.5} />
      <path d={d} stroke={FUR} strokeWidth={4.6} />
      <path
        d={d}
        stroke={STRIPE}
        strokeWidth={4.6}
        pathLength={length}
        strokeDasharray={dash}
        strokeDashoffset={offset}
      />
    </g>
  );
}

function GroundShadow() {
  return <ellipse cx="32" cy="57.5" rx="17" ry="2.2" fill={INK} opacity={0.08} />;
}

/** LIGHT pose — sitting upright, front paws on an open laptop. */
export function AwakeCat() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true" focusable="false">
      <GroundShadow />
      {/* Tail curled around the right side, tip up */}
      <BandedTail d="M45,50 C54,52 58,46 55.5,39" length={21} dash="3.2 7" offset={1.5} />
      {/* Body — sitting haunch */}
      <path
        d="M21,56 C17.5,46 18.5,35.5 24,30.5 C27,27.8 37,27.8 40,30.5 C45.5,35.5 46.5,46 43,56 Z"
        fill={FUR}
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <ellipse cx="32" cy="46" rx="7" ry="8.5" fill={CREAM} />
      {/* Back stripes */}
      <g fill="none" stroke={STRIPE} strokeWidth={1.7} strokeLinecap="round">
        <path d="M20.5,38 q2.8,1.8 5.5,1.4" />
        <path d="M21.5,44 q2.4,1.6 4.8,1.2" />
        <path d="M43.5,38 q-2.8,1.8 -5.5,1.4" />
        <path d="M42.5,44 q-2.4,1.6 -4.8,1.2" />
      </g>
      {/* The shared head, awake */}
      <g transform="translate(32 20)">
        <CatHead eyes="open" tiltEar />
      </g>
      {/* Laptop — charcoal body, cream screen, terracotta detail */}
      <rect x="21" y="36.5" width="22" height="14.5" rx="2" fill={LAPTOP} stroke={INK} strokeWidth={1.8} />
      <rect x="23" y="38.5" width="18" height="10.5" rx="1" fill={CREAM} />
      <circle cx="32" cy="42" r="1.6" fill={STRIPE} />
      <path d="M28,46.3 h3.4 M33,46.3 h3.4" stroke={INK} strokeWidth={1.1} strokeLinecap="round" opacity={0.45} />
      <path
        d="M18.5,55.5 L45.5,55.5 L42.8,51 L21.2,51 Z"
        fill={LAPTOP}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      {/* Front paws resting on the keyboard deck */}
      <g fill={FUR} stroke={INK} strokeWidth={1.6}>
        <ellipse cx="25" cy="53" rx="3.1" ry="2" />
        <ellipse cx="39" cy="53" rx="3.1" ry="2" />
      </g>
      <g stroke={INK} strokeWidth={0.9} opacity={0.6} strokeLinecap="round">
        <path d="M25,51.6 L25,53.2" />
        <path d="M39,51.6 L39,53.2" />
      </g>
    </svg>
  );
}

function ZMark({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <path
      d="M0,0 H5.2 L0,6.4 H5.2"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="none"
      stroke={STRIPE}
      strokeWidth={1.7 / s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** DARK pose — the same cat curled into a sleeping ball. */
export function SleepingCat() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true" focusable="false">
      <GroundShadow />
      {/* Body curled into a round ball */}
      <path
        d="M15.5,53 C12.5,40 20,27.5 32,27.5 C44,27.5 51.5,40 48.5,53 C39,56 25,56 15.5,53 Z"
        fill={FUR}
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {/* Back stripes following the curve of the ball */}
      <g fill="none" stroke={STRIPE} strokeWidth={1.7} strokeLinecap="round">
        <path d="M23,31.5 q1.8,3 4.8,3.8" />
        <path d="M31.5,29 q0.4,3.2 2.8,4.4" />
        <path d="M39.5,30.5 q-0.8,3.2 -3.6,4" />
      </g>
      {/* Tail wrapping around the front of the ball */}
      <BandedTail d="M16,46 C19,56.5 45,56.5 48.5,45.5" length={44} dash="4.5 9.5" offset={4} />
      {/* Paws tucked in front, ready to be slept on */}
      <g fill={FUR} stroke={INK} strokeWidth={1.6}>
        <ellipse cx="31" cy="54" rx="3.4" ry="2.1" />
        <ellipse cx="36.5" cy="54.5" rx="3" ry="1.9" />
      </g>
      {/* The shared head, resting down on the ball, eyes closed */}
      <g transform="translate(23.5 43.5) rotate(-10)">
        <CatHead eyes="closed" />
      </g>
      {/* Sleep marks */}
      <ZMark x={49.5} y={23.5} s={0.72} />
      <ZMark x={53.5} y={15.5} s={0.95} />
      <ZMark x={56} y={6.5} s={1.2} />
    </svg>
  );
}

/**
 * Both poses stacked in the same footprint; the `.dark` class crossfades
 * between them (~300ms, with a slight scale/rotate settle). Reduced
 * motion turns the swap into an instant cut.
 */
export default function OrangeCat() {
  return (
    <span className="relative block h-full w-full" aria-hidden="true">
      <span className="absolute inset-0 p-1.5 opacity-100 rotate-0 scale-100 transition-all duration-300 ease-out dark:opacity-0 dark:scale-90 dark:-rotate-6 motion-reduce:transition-none">
        <AwakeCat />
      </span>
      <span className="absolute inset-0 p-1.5 opacity-0 rotate-6 scale-90 transition-all duration-300 ease-out dark:opacity-100 dark:rotate-0 dark:scale-100 motion-reduce:transition-none">
        <SleepingCat />
      </span>
    </span>
  );
}
