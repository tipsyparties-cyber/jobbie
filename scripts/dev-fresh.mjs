import { createServer } from "node:net";
import { rmSync } from "node:fs";
import { spawn } from "node:child_process";

/* ==================================================================== *
 *  dev:fresh — a dev server that is never serving a stale stylesheet.
 *
 *  It deletes `.next` first, because editing globals.css while Turbopack
 *  is running serves the OLD stylesheet under an unchanged chunk hash and
 *  the page then renders with markup that has no rules behind it. That
 *  looks like broken HTML rather than a caching problem, which is what
 *  makes it expensive. AGENTS.md has the diagnosis.
 *
 *  THE PORT IS CHECKED FIRST, and that is the whole reason this is a
 *  script rather than a one-liner in package.json. The one-liner deleted
 *  `.next` and then failed to bind, which left the server that was
 *  already running reading from a directory that no longer existed — so
 *  the command that exists to avoid a broken preview caused one. Twice.
 * ==================================================================== */

const PORT = Number(process.argv[2] || 3001);

function portFree(port) {
  return new Promise((resolve) => {
    const s = createServer();
    s.once("error", () => resolve(false));
    s.once("listening", () => s.close(() => resolve(true)));
    s.listen(port, "0.0.0.0");
  });
}

if (!(await portFree(PORT))) {
  console.error(
    `\n  Port ${PORT} is already in use, so nothing has been deleted.\n\n` +
      `  Something is already serving this site. Either use it, or stop it\n` +
      `  first — on Windows:\n\n` +
      `      Get-NetTCPConnection -LocalPort ${PORT} -State Listen |\n` +
      `        ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }\n`
  );
  process.exit(1);
}

rmSync(".next", { recursive: true, force: true });

spawn("npx", ["next", "dev", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
}).on("exit", (code) => process.exit(code ?? 0));
