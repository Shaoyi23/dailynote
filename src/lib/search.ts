export type MatchRange = [start: number, end: number];

export type TitleMatch = {
  score: number;
  ranges: MatchRange[];
};

function mergeRanges(ranges: MatchRange[]): MatchRange[] {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: MatchRange[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];

    if (last && range[0] <= last[1]) {
      last[1] = Math.max(last[1], range[1]);
    } else {
      merged.push([range[0], range[1]]);
    }
  }

  return merged;
}

function matchToken(token: string, text: string): TitleMatch | null {
  const direct = text.indexOf(token);

  if (direct !== -1) {
    return {
      score: 1000 + token.length * 4 - direct * 2,
      ranges: [[direct, direct + token.length]],
    };
  }

  const indices: number[] = [];
  let cursor = 0;

  for (let index = 0; index < text.length && cursor < token.length; index += 1) {
    if (text[index] === token[cursor]) {
      indices.push(index);
      cursor += 1;
    }
  }

  if (cursor < token.length) {
    return null;
  }

  const ranges: MatchRange[] = [];

  for (const index of indices) {
    const last = ranges[ranges.length - 1];

    if (last && last[1] === index) {
      last[1] = index + 1;
    } else {
      ranges.push([index, index + 1]);
    }
  }

  const spread = indices[indices.length - 1] - indices[0] + 1;

  return {
    score: 500 - spread - indices[0],
    ranges,
  };
}

/**
 * Matches a query against a post title. Every whitespace-separated token must
 * match, either as a contiguous substring (preferred) or as an in-order
 * subsequence, so "evnt loop" still finds "the event loop, without the jargon".
 */
export function matchTitle(title: string, query: string): TitleMatch | null {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return null;
  }

  const text = title.toLowerCase();
  const ranges: MatchRange[] = [];
  let score = 0;

  for (const token of tokens) {
    const match = matchToken(token, text);

    if (!match) {
      return null;
    }

    score += match.score;
    ranges.push(...match.ranges);
  }

  return { score, ranges: mergeRanges(ranges) };
}
