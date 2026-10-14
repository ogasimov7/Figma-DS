/**
 * Prevents `npm run build` from running while the dev server is active.
 * Running both at once corrupts the .next cache and breaks CSS.
 */
import { execSync } from "node:child_process";

const ports = [3000, 3001];

for (const port of ports) {
  try {
    const result = execSync(`lsof -ti:${port}`, { encoding: "utf8" }).trim();
    if (result) {
      console.error(
        `\n⚠️  Dev server detected on port ${port}. Stop it before running build.\n` +
          `   Run: lsof -ti:${port} | xargs kill\n` +
          `   Or use Ctrl+C in the dev terminal.\n` +
          `   Building while dev is running breaks CSS hot reload.\n`
      );
      process.exit(1);
    }
  } catch {
    /* port is free — no process listening */
  }
}
