# TODO Archive

> 已处理条目的归档（含已完成、已更新后被替代、已放弃），编号保留、永不复用。正文保留当时记录，可回溯。

## 🟠 橙色（防护缺口，可能演化为实际影响）

- [x] **T3** 把版本更新检查从官方源改成本 fork 自己的 GitHub Release，并理顺版本号体系。背景：本仓库已于 2026-09-19 断开与上游 earendil-works/pi 的 fork 关系、独立演进，但版本更新检查逻辑还是上游遗留的——`packages/coding-agent/src/utils/version-check.ts` 硬编码官方源 `https://pi.dev/api/latest-version`，每次启动拿本机版本号（`package.json`，仍沿用上游的 0.86.0）去对照官方最新版，官方一发新版（2026-09-20 的 0.86.1）fork 这边就弹「Update Available」误导提示；更危险的是按提示跑 `pi update` 会从官方安装源（`pi.dev/api/installer/releases`）拉官方包覆盖安装，把本 fork 的全局安装连同硬件光标等定制改动一起冲掉。要做的事：① 理顺版本号体系，以根 `VERSION`（当前 0.0.3）为唯一权威，同步 `packages/coding-agent/package.json`（仍为上游遗留的 0.86.0）等引用处；② 把更新检查源改为本 fork 的 GitHub Release（xhqing/pi），对照 fork 自己的版本号给更新提示；③ 顺带处理 `pi update` 命令的指向，切断「官方包覆盖 fork 安装」的路径。属核心代码改动（`packages/coding-agent/src`），实现时走 dev-workflow。临时缓解（本机）：`~/.zshrc` 加 `export PI_SKIP_VERSION_CHECK=1` 可先关掉误导提示。需求端 Issue 已建：[#4](https://github.com/xhqing/pi/issues/4)（含 Problem / Expected behavior，实现走 dev-workflow 时以它为需求端）。（记录：2026-09-21 20:32）✅**已转移**（已转移至 [Issue #4](https://github.com/xhqing/pi/issues/4)，归档：2026-09-21 21:05）

## 🟢 绿色（计划类新功能，改期无实际损失）

- [x] **T2** 把「粘贴剪贴板图片」的快捷键从 `ctrl+v` 改为 `cmd+v`（macOS 习惯）。现状：`app.clipboard.pasteImage` 默认键位是 `ctrl+v`（见 `packages/coding-agent/src/core/keybindings.ts`，windows 布局下为 `alt+v`）。实现时注意：macOS 终端里 `cmd+v` 默认被终端自身截获做文本粘贴，TUI 根本收不到这个键——需要终端支持 kitty keyboard protocol 把 super 修饰键传给应用，或在终端侧改键位放行；改之前先确认用户在用的终端（如 Ghostty）能否把 `cmd+v` 透传给 TUI，否则改了也触发不了。（记录：2026-09-20 00:02）✅**已完成**（完成：2026-09-21 15:44）
  - 实现说明：最终走「终端侧」方案（条目中预留的两条路之一），pi 仓库本身未改键位——在 Ghostty 独立 fork（`~/Developer/ghostty`）打了「Cmd+V 粘贴剪贴板图片为临时文件路径」补丁（tag `v1.3.1-paste.1`，已并入 main）：Ghostty 截获 Cmd+V 后检测剪贴板图片数据，写入 `$TMPDIR/ghostty-paste-<UUID>.png` 并把路径作为文本粘贴给 TUI。pi（及 Claude Code 等 TUI）通过 Cmd+V 直接收到图片路径文本，自行读取图片，macOS 习惯的 Cmd+V 粘贴截图可用，目标达成且对所有 TUI 应用通用。pi 侧默认键位保持 `ctrl+v` 不变，无回归风险。
