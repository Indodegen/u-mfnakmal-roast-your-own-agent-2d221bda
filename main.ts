import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const text = readFileSync(entryPath, "utf8");
const line = text.replace(/\n$/, "");
if (line.includes("\n")) {
  throw new Error(
    `entry must be a single line, got ${line.split("\n").length} lines`,
  );
}
if ([...line].length < 1 || [...line].length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${[...line].length}`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(out, { recursive: true });
copyFileSync(entryPath, join(out, "entry.txt"));
