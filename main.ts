// one-emoji-one-smile - make.fun entry for u-0xkianno-one-emoji-one-smile-5470751f.
// Node 22, standard library only. Writes the single entry emoji to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this emoji, no trailing newline, so the gate sees 1 character
// of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// REVISION 2 - final check of 🤗 against the last two challengers:
// - 🫶 (heart hands): a warm gesture, but newer and less universal
//   across ages, so it is weaker on criterion 3 than a hug.
// - 🌞 (sun with face): cheerful and warm by metaphor, but less directly
//   a smile than a face offering a hug, so weaker on criterion 1.
// 🤗 stays: it wins criteria 1-5 in the judge's own order, with
// criterion 4 ("chosen rather than default") as the deciding edge over
// the default smileys. Entry: U+1F917 HUGGING FACE, 1 code point,
// 4 bytes UTF-8 - inside the gate's 1-8 characters.
const ENTRY = '🤗';

// Guard the gate: the entry must be exactly one emoji - one code point,
// 1-8 characters, not only whitespace - and nothing else.
if ([...ENTRY].length !== 1 || ENTRY.length < 1 || ENTRY.length > 8 || !ENTRY.trim()) {
  throw new Error(`entry must be exactly one emoji, got ${ENTRY.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
if (readFileSync(target, 'utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
