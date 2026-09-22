# TODO

> 个人隐私类待办分流至 `TODO.local.md`（不入公开仓库），格式与本文件一致。

## 🟠 橙色（防护缺口，可能演化为实际影响）

### 发布与版本检查

- [ ] **T4** fork 的版本检查链路被上游残留的 v0.86.0 Release 污染，且预发布永远进不了 `releases/latest`：issue #4 实现后 update check 读 `api.github.com/repos/xhqing/pi/releases/latest`，但该端点现在返回上游残留的 v0.86.0（fork 断开前遗留的正式 Release，非 prerelease），fork 运行版 0.0.3 会被永久提示「有新版 0.86.0」（semver 比较 0.0.3 < 0.86.0，且 fork 序列要很久才会超过它）；同时 auto-rc 发的 `--prerelease` Release 按规则不进 latest 指针，`pi update --self` 拿不到 rc，验收只能手动下载 Release asset。候选处理：删掉 v0.86.0 残留 Release（tag 保留作为历史，Release 删除是公开动作需用户决定）／update check 改读含 prerelease 的 releases 列表端点并按语义化版本挑最新（需走 dev-workflow）。触发于配 auto-rc 时发现（记录：2026-09-22 16:26）。

### 测试

- [ ] **T1** 本地全量测试 `./test.sh` 有一个环境性稳定失败：`packages/chord/test/delta.test.ts` 的 `accepts large append argument lists without spreading them internally`（100,000 参数 push → `spliceItems` 按 chunkSize=10,000 spread 进 `splice`，在 `src/delta/index.ts:156` 抛 `RangeError: Maximum call stack size exceeded`）。本地 macOS / Node 22.22.3 单独跑该文件 3 次全挂、全量跑 2 次全挂；同一测试在上游 CI（Ubuntu / Node 22.23.2）通过，且裸 Node、worker 线程、带 Proxy/cloneJson 的 vitest 单文件探针均不复现——只在 delta.test.ts 完整文件上下文里触发，指向 V8 栈/JIT 状态的平台特异行为，非代码回归。风险：本地回归门禁永久带红，久了会习惯性忽略失败、掩盖真正的回归。候选处理：深挖根因／把 chunkSize 调小（如 4,096）向上游提 PR／知悉并接受（每次跑全量时人工忽略这 1 条）。排查日志存于本机 `/tmp/pi-full-test.log`（临时文件，勿依赖长期存在）。（记录：2026-09-19 19:32）

