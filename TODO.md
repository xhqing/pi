# TODO

> 个人隐私类待办分流至 `TODO.local.md`（不入公开仓库），格式与本文件一致。

## 🟠 橙色（防护缺口，可能演化为实际影响）

### 测试

- [ ] **T1** 本地全量测试 `./test.sh` 有一个环境性稳定失败：`packages/chord/test/delta.test.ts` 的 `accepts large append argument lists without spreading them internally`（100,000 参数 push → `spliceItems` 按 chunkSize=10,000 spread 进 `splice`，在 `src/delta/index.ts:156` 抛 `RangeError: Maximum call stack size exceeded`）。本地 macOS / Node 22.22.3 单独跑该文件 3 次全挂、全量跑 2 次全挂；同一测试在上游 CI（Ubuntu / Node 22.23.2）通过，且裸 Node、worker 线程、带 Proxy/cloneJson 的 vitest 单文件探针均不复现——只在 delta.test.ts 完整文件上下文里触发，指向 V8 栈/JIT 状态的平台特异行为，非代码回归。风险：本地回归门禁永久带红，久了会习惯性忽略失败、掩盖真正的回归。候选处理：深挖根因／把 chunkSize 调小（如 4,096）向上游提 PR／知悉并接受（每次跑全量时人工忽略这 1 条）。排查日志存于本机 `/tmp/pi-full-test.log`（临时文件，勿依赖长期存在）。（记录：2026-09-19 19:32）

