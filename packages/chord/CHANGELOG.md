# Changelog

## [Unreleased]

### Fixed

- `src/delta/index.ts` (`spliceItems`): reduced the splice chunk size from 10,000 to 4,096 spread args per `Reflect.apply` call. ~10k positional args sit right at the V8 call-stack limit on some platforms (macOS / Node 22: `RangeError: Maximum call stack size exceeded` in the large-append delta test, only when run in the full file context); 4k keeps headroom with no behavior change. Restores a fully green local `./test.sh` ([#2](https://github.com/xhqing/pi/issues/2)).
