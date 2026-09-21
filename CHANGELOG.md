# Changelog

Root-level changelog and version baseline for the standalone fork. The root version tracks the `pi-monorepo` workspace root; per-package changes continue to be recorded in `packages/*/CHANGELOG.md`. This file was created on 2026-09-20, after the repository was detached from the earendil-works/pi fork network (2026-09-19), to give the now-independent repo a single root version authority.

## [Unreleased]

### Added

- `TODO.md`: registered **T3** — repoint the version update check from the upstream pi.dev endpoint to this fork's own GitHub Releases and unify the version numbering (root `VERSION` 0.0.3 vs the upstream-inherited `package.json` 0.86.0 coexist; the upstream update banner misleads fork users, and `pi update` can overwrite the fork install with the official package).

## [0.0.3] - 2026-09-20

Initial root version, taken from the root `package.json` (`pi-monorepo` 0.0.3).

### Added

- Root `VERSION` and root `CHANGELOG.md` as the repo-wide version baseline.
- `scripts/build-npm-tarball.mjs`: self-contained npm-layout release tarball for GitHub Release distribution (inlines workspace packages and TUI native prebuilds, drops unpublished workspace dependencies).
- Bilingual README: `README_cn.md` alongside the English `README.md`.

### Changed

- Repository detached from the upstream fork network and now evolves independently: upstream community infrastructure removed (contributor/issue/PR/audit/model-catalog workflows, issue templates, `APPROVED_CONTRIBUTORS`, `CONTRIBUTING.md`), project guidance (`CLAUDE.md`) updated for standalone-fork positioning.
- The bundle build now copies TUI native prebuilds into `dist/bundle/native` and fails when one is missing; `@earendil-works/chord` is inlined instead of staying external.
