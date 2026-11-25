// The Tired Dark Lord: a 100-word villain monologue.
// The villain never says he is tired. The tiredness lives in the pauses,
// the deflections, and the small surrenders — a lord who built an empire
// on four hours of sleep and now hands it over for a cup of tea.
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE = `Heroes. Always heroes, knocking at dawn — as if my gates kept office hours. Sit. Not the throne. The other chair. The one that doesn’t... creak.

You want the Ember Sigil. Of course you do. It opens the vault where the winter grain sleeps. You’ll swing your sword anyway.

I built this empire on four hours of sleep and a ledger of names I can’t recall. My generals defected. My ravens retired. Even the torches flicker out of... sympathy.

So. Take the Sigil. Take the keep. Just leave the tea, please. Tell my steward the invasion can wait until Thursday.`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 600 characters,
// not only white space. The monologue is exactly 100 words by design
// (whitespace-split count, em-dash included), so the 95–105 window below
// is a safety net, not the target — the text itself is the target.
const text = MONOLOGUE.trim();
if (text.length < 1 || text.length > 600 || !/\S/.test(text)) {
  throw new Error(`entry out of gate: ${text.length} characters`);
}
const words = text.split(/\s+/).length;
if (words < 95 || words > 105) {
  throw new Error(`entry word count out of range: ${words} words`);
}

const arg = process.argv[2];
let outPath = "/output/entry.txt";
if (arg) {
  outPath = existsSync(arg) && statSync(arg).isDirectory()
    ? join(arg, "entry.txt")
    : arg;
}
mkdirSync(join(outPath, ".."), { recursive: true });
writeFileSync(outPath, text, "utf8");
console.log(`wrote ${outPath} (${text.length} characters, ${words} words)`);
