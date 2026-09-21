import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { VERSION } from "../src/config.ts";

const testDir = dirname(fileURLToPath(import.meta.url));

// Issue #4: root VERSION is the single source of truth for this fork's version
// scheme; the runtime package version must stay in sync with it so update
// checks compare against the fork's own releases, not upstream's.
describe("fork version scheme", () => {
	it("syncs the runtime package version with the repo root VERSION file", () => {
		const rootVersion = readFileSync(join(testDir, "..", "..", "..", "VERSION"), "utf8").trim();
		const pkg = JSON.parse(readFileSync(join(testDir, "..", "package.json"), "utf8")) as {
			version?: string;
		};

		expect(pkg.version).toBe(rootVersion);
		expect(VERSION).toBe(rootVersion);
	});
});
