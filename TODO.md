# TODO

> 个人隐私类待办分流至 `TODO.local.md`（不入公开仓库），格式与本文件一致。

## 🟠 橙色（防护缺口，可能演化为实际影响）

### 发布与版本检查

- [ ] **T5** 更新链路的剩余缺口（T4 已更新的部分之外的）：① 预发布 Release 带 `--prerelease` 标记，按 GitHub 规则不进 `releases/latest` 指针，而 update check 只读该端点 → `pi update --self` 永远取不到 rc 构建（rc 只能手动下载 Release asset 安装）；② 同版本重发不触发更新：update 用 semver 比较 `releases/latest` 与当前版本，版本号相同时（如 0.0.3 重发新构建）判定「已是最新」，刷新须 `pi update --force` 或手动 `npm install -g <tarball URL>`。候选处理：update check 改读含 prerelease 的 releases 列表端点并按语义化版本挑最新（需走 dev-workflow）／或接受现状（rc 手动下载 + `--force` 刷新）。背景：v0.0.3 正式发版后 `latest` 指针不再被上游遗留的 v0.86.0 污染；自动预发布流水线（原 auto-rc）已按用户要求改为仅手动触发（`gh workflow run prerelease.yml`）。（记录：2026-09-29 19:38）

