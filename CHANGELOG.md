# Changelog

Root-level changelog and version baseline for the standalone fork. The root version tracks the `pi-monorepo` workspace root; per-package changes continue to be recorded in `packages/*/CHANGELOG.md`. This file was created on 2026-09-20, after the repository was detached from the earendil-works/pi fork network (2026-09-19), to give the now-independent repo a single root version authority.

## [Unreleased]

### Added

- `TODO.md`: registered **T3** — repoint the version update check from the upstream pi.dev endpoint to this fork's own GitHub Releases and unify the version numbering (root `VERSION` 0.0.3 vs the upstream-inherited `package.json` 0.86.0 coexist; the upstream update banner misleads fork users, and `pi update` can overwrite the fork install with the official package).
- `packages/coding-agent/test/fork-version.test.ts`: new test-first coverage for issue #4 — the runtime package version (`packages/coding-agent/package.json`, re-exported as `config.ts` `VERSION`) must equal the repo root `VERSION` file, locking the "root VERSION is the single source of truth" acceptance criterion.

### Changed

- `packages/coding-agent/test/version-check.test.ts` and `test/package-command-paths.test.ts`: rewrote the update-check expectations for issue #4 ahead of implementation (tests red on the current upstream-pointing code): version-check requests must target this fork's GitHub Releases (`xhqing/pi`) with zero `pi.dev` traffic, response mocks use the GitHub `tag_name` payload shape, and `pi update --self` (installer-managed and npm-global paths) must either update from the fork's own source or disable with fork guidance — both Issue-sanctioned outcomes. Removed passthrough cases for `packageName`/`note` fields and the renamed-package self-update cases: GitHub release payloads carry neither field, so upstream's package-migration flow is unreachable from the fork's check source.
- Implemented issue #4: the update check now reads `https://api.github.com/repos/xhqing/pi/releases/latest` (tag comparison, semver-validated), `pi update --self` installs the fork's own release tarball (`pi-coding-agent-<version>.tgz`, newly shipped by the release workflow) instead of an npm registry spec, and installer-managed self-updates without `PI_INSTALLER_API_BASE` disable with fork guidance instead of contacting pi.dev. Version scheme unified: the internal `@earendil-works/pi-*`/chord workspace family (11 packages, enforced by the install-lock/shrinkwrap generators) moved from the upstream-inherited 0.86.0 to the root `VERSION` value 0.0.3; locks regenerated.
- Follow-up fixing the execution gaps of the issue #4 test rewrite in commit 698323171 so its claims match reality: removed the leftover renamed-package case `fails self-update when renamed npm package installation fails` (that commit removed only one of the two cases it claimed), converted the last `{version}`-shaped update-check mock to the `tag_name` payload with the fork release tarball (`getForkReleaseTarballUrl(VERSION)`) as the expected npm install spec in `keeps npm self-updates non-managed when the managed environment is inherited`, and fixed three TS2493 errors (zero-argument fetch mocks destructured via `mock.calls[0]`) so `npm run check` passes again; `test/version-check.test.ts` (8/8) and `test/package-command-paths.test.ts` (30/30) are green against the implemented branch.
- Follow-up fixing the PR #5 CI failure (`model-registry.test.ts`, 3 cases): the built-in model catalog refreshes from the network during `npm run build` (`generate-models`), and the upstream catalog has retired the bare `anthropic/claude-opus-4` id (only `4.1`+ remain), so test expectations referencing that id went stale — not a regression of this PR (the main-baseline CI run passed only because the catalog it fetched still carried the id; re-running it today would fail the same way; upstream fixed the same staleness in eaf72ed4d "update stale test expectations"). Updated all 6 references (find-by-id plus the `modelOverrides` key) from `anthropic/claude-opus-4` to `anthropic/claude-opus-4.1` — behavior assertions unchanged, only the referenced built-in id now exists in the catalog; `test/model-registry.test.ts` 85/85 green and `npm run check` passes locally after a clean `npm ci` + `npm run build` reproduction of the CI environment.

### Fixed

- `packages/chord` (`src/delta/index.ts` `spliceItems`): reduced the splice chunk size from 10,000 to 4,096 spread args — ~10k positional args sit at the V8 call-stack limit on macOS / Node 22 and made the large-append delta test fail stably in local full-suite runs (`RangeError: Maximum call stack size exceeded`). No behavior change beyond stack headroom; local `./test.sh` is fully green again ([#2](https://github.com/xhqing/pi/issues/2)).

## [0.0.3] - 2026-09-20

Initial root version, taken from the root `package.json` (`pi-monorepo` 0.0.3).

### Added

- Root `VERSION` and root `CHANGELOG.md` as the repo-wide version baseline.
- `scripts/build-npm-tarball.mjs`: self-contained npm-layout release tarball for GitHub Release distribution (inlines workspace packages and TUI native prebuilds, drops unpublished workspace dependencies).
- Bilingual README: `README_cn.md` alongside the English `README.md`.

### Changed

- Repository detached from the upstream fork network and now evolves independently: upstream community infrastructure removed (contributor/issue/PR/audit/model-catalog workflows, issue templates, `APPROVED_CONTRIBUTORS`, `CONTRIBUTING.md`), project guidance (`CLAUDE.md`) updated for standalone-fork positioning.
- The bundle build now copies TUI native prebuilds into `dist/bundle/native` and fails when one is missing; `@earendil-works/chord` is inlined instead of staying external.
