import { describe, expect, it } from "vitest";
import {
  createQuoteQueue,
  durationForQuote,
  FONTS,
  fitLeftPercent,
  laneTops,
  MAX_SIZE_REM,
  MIN_SIZE_REM,
  pickFont,
  pickFontSizeRem,
  type Quote,
  randomBetween,
  shuffled,
} from "./engine";

function quote(text: string, author = "Someone"): Quote {
  return { text, author };
}

describe("randomBetween", () => {
  it("stays within [min, max)", () => {
    for (let i = 0; i < 200; i++) {
      const value = randomBetween(5, 10);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThan(10);
    }
  });

  it("returns the bound when min equals max", () => {
    expect(randomBetween(3, 3)).toBe(3);
  });
});

describe("shuffled", () => {
  it("preserves every element without mutating the input", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffled(input);
    expect(result).not.toBe(input);
    expect([...result].sort()).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  it("eventually produces a different order than the input", () => {
    const input = Array.from({ length: 8 }, (_, i) => i);
    const reordered = Array.from({ length: 20 }, () => shuffled(input)).some(
      (result) => result.some((v, i) => v !== input[i]),
    );
    expect(reordered).toBe(true);
  });
});

describe("pickFont", () => {
  it("always returns one of the known fonts", () => {
    for (let i = 0; i < 50; i++) {
      expect(FONTS).toContain(pickFont());
    }
  });
});

describe("pickFontSizeRem", () => {
  it("stays within the configured size range", () => {
    for (let i = 0; i < 50; i++) {
      const size = pickFontSizeRem();
      expect(size).toBeGreaterThanOrEqual(MIN_SIZE_REM);
      expect(size).toBeLessThanOrEqual(MAX_SIZE_REM);
    }
  });
});

describe("durationForQuote", () => {
  const quotes = [quote("short"), quote("a".repeat(50)), quote("mid-length text here")];

  it("maps the shortest quote to the minimum duration", () => {
    expect(durationForQuote(quotes[0], quotes, 10, 20)).toBe(10);
  });

  it("maps the longest quote to the maximum duration", () => {
    expect(durationForQuote(quotes[1], quotes, 10, 20)).toBe(20);
  });

  it("scales linearly for lengths in between", () => {
    const duration = durationForQuote(quotes[2], quotes, 10, 20);
    expect(duration).toBeGreaterThan(10);
    expect(duration).toBeLessThan(20);
  });

  it("falls back to the minimum when every quote has the same length", () => {
    const sameLength = [quote("abcde"), quote("fghij")];
    expect(durationForQuote(sameLength[0], sameLength, 10, 20)).toBe(10);
  });

  it("defaults to the module's MIN/MAX duration constants", () => {
    const duration = durationForQuote(quotes[1], quotes);
    expect(duration).toBeGreaterThan(0);
  });
});

describe("createQuoteQueue", () => {
  it("never shows the same quote in two lanes active at once", () => {
    const quotes = Array.from({ length: 6 }, (_, i) => quote(`quote-${i}`));
    const queue = createQuoteQueue(quotes);

    // Simulate every lane mounting for the first time simultaneously:
    // each calls next(null), none has released anything yet.
    const picks = Array.from({ length: quotes.length }, () => queue.next(null));
    const seen = new Set(picks.map((p) => p.text));
    expect(seen.size).toBe(quotes.length);
  });

  it("cycles through every quote before repeating for a single consumer", () => {
    const quotes = Array.from({ length: 5 }, (_, i) => quote(`quote-${i}`));
    const queue = createQuoteQueue(quotes);

    let previous: Quote | null = null;
    const seen = new Set<string>();
    for (let i = 0; i < quotes.length; i++) {
      previous = queue.next(previous);
      seen.add(previous.text);
    }
    expect(seen.size).toBe(quotes.length);
  });

  it("keeps working with a single quote", () => {
    const quotes = [quote("only one")];
    const queue = createQuoteQueue(quotes);

    let previous: Quote | null = null;
    for (let i = 0; i < 5; i++) {
      previous = queue.next(previous);
      expect(previous.text).toBe("only one");
    }
  });

  it("degrades gracefully when more lanes than quotes are active at once", () => {
    const quotes = [quote("a"), quote("b")];
    const queue = createQuoteQueue(quotes);

    // 3 concurrent lanes, only 2 distinct quotes available.
    const picks = [queue.next(null), queue.next(null), queue.next(null)];
    for (const pick of picks) {
      expect(quotes.map((q) => q.text)).toContain(pick.text);
    }
  });
});

describe("laneTops", () => {
  it("returns a single centered value for count 1", () => {
    expect(laneTops(1, { topMin: 14 })).toEqual([14]);
  });

  it("spans the full range and stays clear of the center gap", () => {
    const tops = laneTops(6, { topMin: 14, topMax: 92, centerGap: 20 });
    expect(tops[0]).toBe(14);
    expect(tops[tops.length - 1]).toBe(92);
    for (const top of tops) {
      expect(top).toBeGreaterThanOrEqual(14);
      expect(top).toBeLessThanOrEqual(92);
      // Strictly inside the gap (40, 60) is never allowed; the boundary
      // values themselves are fine.
      expect(top < 40 || top > 60).toBe(true);
    }
  });

  it("returns values in ascending order", () => {
    const tops = laneTops(6);
    for (let i = 1; i < tops.length; i++) {
      expect(tops[i]).toBeGreaterThan(tops[i - 1]);
    }
  });
});

describe("fitLeftPercent", () => {
  it("keeps both edges inside the field for normal widths", () => {
    for (let i = 0; i < 100; i++) {
      const fieldWidth = 1200;
      const textWidth = 300;
      const marginPx = 12;
      const leftPercent = fitLeftPercent(fieldWidth, textWidth, marginPx);
      const leftPx = (leftPercent / 100) * fieldWidth;
      expect(leftPx).toBeGreaterThanOrEqual(marginPx - 1e-9);
      expect(leftPx).toBeLessThanOrEqual(fieldWidth - textWidth - marginPx + 1e-9);
    }
  });

  it("clamps to the margin when the text is wider than the field allows", () => {
    const fieldWidth = 300;
    const textWidth = 500;
    const marginPx = 12;
    const leftPercent = fitLeftPercent(fieldWidth, textWidth, marginPx);
    expect(leftPercent).toBeCloseTo((marginPx / fieldWidth) * 100, 5);
  });
});
