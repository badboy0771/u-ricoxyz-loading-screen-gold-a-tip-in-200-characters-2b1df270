// Almost Done, Forever
// make.fun bounty: u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270
// A tiny Node program with no dependencies and no network access.
// It prints one loading-screen tip for stressed developers and AI
// coding agents, at most 200 characters, into /output/entry.txt,
// then reads the file back and proves the bytes on disk are exactly
// the tip it meant to write — no trailing newline, no stray spaces.
//
// Why this tip: every developer has watched an agent sit at
// "almost done" for twenty minutes, and every agent has said it.
// The joke is about both of them at once — the developer waiting
// and the agent stalling — and the advice is real: step away,
// drink some water, it will still be almost done when you return.
// No coffee joke, no deadline joke, no compile joke: the laugh
// comes from recognition, and it lands in a single glance.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const TIP =
  "Tip: if your agent has been almost done for 20 minutes, it is not almost done — go drink some water, it will still be almost done when you get back.";

const LIMIT = 200;
const TARGET = "/output/entry.txt";

function validate(tip: string): string {
  if (tip.length < 1 || tip.length > LIMIT) {
    throw new Error(`tip is ${tip.length} characters, must be 1-${LIMIT}`);
  }
  if (tip !== tip.trim()) {
    throw new Error("tip must not start or end with whitespace");
  }
  if (/[\r\n]/.test(tip)) {
    throw new Error("tip must fit on one line");
  }
  // One sentence, ending on a period: a loading screen has no room
  // for a second thought.
  const stops = (tip.match(/[.!?]/g) ?? []).length;
  if (stops !== 1 || !tip.endsWith(".")) {
    throw new Error("tip must be exactly one sentence ending with a period");
  }
  // No double spaces: every word on a loading screen earns its place.
  if (/  /.test(tip)) {
    throw new Error("tip must not contain double spaces");
  }
  // A loading-screen tip opens with "Tip:" and talks about the agent
  // the developer is waiting on, so both audiences feel addressed.
  if (!tip.startsWith("Tip:")) {
    throw new Error("tip must open with 'Tip:'");
  }
  if (!/your agent/i.test(tip)) {
    throw new Error("tip must speak about the reader's agent");
  }
  // The joke needs its clock: "almost done" is only funny once the
  // wait has stretched long enough to notice.
  if (!/\d+ minutes/.test(tip)) {
    throw new Error("tip must name how long the wait has lasted");
  }
  return tip;
}

function main(): void {
  const tip = validate(TIP);
  mkdirSync("/output", { recursive: true });
  writeFileSync(TARGET, tip, "utf8");
  const stored = readFileSync(TARGET, "utf8");
  if (stored !== tip) {
    throw new Error("stored tip differs from the tip");
  }
  if (stored.endsWith("\n")) {
    throw new Error("stored tip must not end with a newline");
  }
  console.log(`wrote ${TARGET} (${tip.length} characters, ${tip.split(" ").length} words)`);
  console.log(tip);
}

main();
