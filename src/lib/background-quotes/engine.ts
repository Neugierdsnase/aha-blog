/**
 * Pure scheduling/placement logic for the scattered background quotes on
 * the homepage: which quote each lane shows next, how long it stays up,
 * and where it sits. Kept free of DOM access so it can be unit-tested
 * directly; see `engine.test.ts`. The rendering/animation glue that
 * actually creates elements and drives the reveal animation lives in
 * `src/components/BackgroundQuotes.astro`.
 */

export interface Quote {
  readonly text: string;
  readonly author: string;
}

export const FONTS = [
  "font-old",
  "font-soria",
  "font-galnoy",
  "font-serif",
] as const;
export const MIN_SIZE_REM = 0.75;
export const MAX_SIZE_REM = 1.6;
export const MIN_DURATION_S = 14;
export const MAX_DURATION_S = 28;
export const LANE_COUNT = 6;
export const TOP_MIN = 14;
export const TOP_MAX = 92;
// Vertical band around the centered h1 (50%) that stays lane-free.
export const CENTER_GAP = 20;
export const FIELD_MARGIN_PX = 12;

export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export function shuffled<T>(list: readonly T[]): T[] {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickFont(): (typeof FONTS)[number] {
  return FONTS[Math.floor(Math.random() * FONTS.length)];
}

export function pickFontSizeRem(): number {
  return randomBetween(MIN_SIZE_REM, MAX_SIZE_REM);
}

/**
 * Longer quotes get a slower reveal/display cycle so there's enough time
 * to actually read them; shorter ones stay snappy. `quotes` supplies the
 * length range to scale against.
 */
export function durationForQuote(
  quote: Quote,
  quotes: readonly Quote[],
  minS = MIN_DURATION_S,
  maxS = MAX_DURATION_S,
): number {
  const lengths = quotes.map((q) => q.text.length);
  const minLen = Math.min(...lengths);
  const maxLen = Math.max(...lengths);
  if (maxLen === minLen) return minS;
  const t = (quote.text.length - minLen) / (maxLen - minLen);
  return minS + t * (maxS - minS);
}

export interface QuoteQueue {
  /** Picks the next quote, releasing `previous` back into rotation first. */
  next(previous: Quote | null): Quote;
}

/**
 * Shared across every lane so two lanes never show the same quote at the
 * same time, and quotes cycle through evenly over time.
 */
export function createQuoteQueue(quotes: readonly Quote[]): QuoteQueue {
  let queue = shuffled(quotes);
  const active = new Set<string>();

  return {
    next(previous) {
      if (previous) active.delete(previous.text);
      // At most 2 attempts: first uses the existing queue (reshuffling
      // only if it's empty), the retry always reshuffles from scratch.
      let pick: Quote | undefined;
      for (let attempt = 0; attempt < 2 && !pick; attempt++) {
        if (attempt > 0 || queue.length === 0) queue = shuffled(quotes);
        pick = queue.find((q) => !active.has(q.text));
      }
      pick ??= queue[0];
      queue = queue.filter((q) => q !== pick);
      active.add(pick.text);
      return pick;
    },
  };
}

export interface LaneTopsOptions {
  topMin?: number;
  topMax?: number;
  centerGap?: number;
}

/**
 * Evenly distributes lane positions across the space above and below the
 * centered h1, treating the excluded center band as a gap in the range so
 * no lane ever falls behind the heading. Returns `top` percentages.
 */
export function laneTops(
  count: number,
  { topMin = TOP_MIN, topMax = TOP_MAX, centerGap = CENTER_GAP }: LaneTopsOptions = {},
): number[] {
  if (count === 1) return [topMin];

  const gapStart = 50 - centerGap / 2;
  const gapEnd = 50 + centerGap / 2;
  const aboveLen = gapStart - topMin;
  const belowLen = topMax - gapEnd;
  const totalLen = aboveLen + belowLen;

  return Array.from({ length: count }, (_, i) => {
    const t = (i * totalLen) / (count - 1);
    return t <= aboveLen ? topMin + t : gapEnd + (t - aboveLen);
  });
}

/**
 * Clamps a quote's horizontal placement so, given its already-rendered
 * pixel width, both edges stay inside the field — never just centered on
 * a random point that could push it off-screen. Returns a `left`
 * percentage relative to `fieldWidth`.
 */
export function fitLeftPercent(
  fieldWidth: number,
  textWidth: number,
  marginPx = FIELD_MARGIN_PX,
): number {
  const maxLeftPx = Math.max(marginPx, fieldWidth - textWidth - marginPx);
  const leftPx = randomBetween(marginPx, maxLeftPx);
  return (leftPx / fieldWidth) * 100;
}
