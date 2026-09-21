# TODO Archive

> 已处理条目的归档（含已完成、已更新后被替代、已放弃），编号保留、永不复用。正文保留当时记录，可回溯。

## 🟢 绿色（计划类新功能，改期无实际损失）

- [x] **T2** 把「粘贴剪贴板图片」的快捷键从 `ctrl+v` 改为 `cmd+v`（macOS 习惯）。现状：`app.clipboard.pasteImage` 默认键位是 `ctrl+v`（见 `packages/coding-agent/src/core/keybindings.ts`，windows 布局下为 `alt+v`）。实现时注意：macOS 终端里 `cmd+v` 默认被终端自身截获做文本粘贴，TUI 根本收不到这个键——需要终端支持 kitty keyboard protocol 把 super 修饰键传给应用，或在终端侧改键位放行；改之前先确认用户在用的终端（如 Ghostty）能否把 `cmd+v` 透传给 TUI，否则改了也触发不了。（记录：2026-09-20 00:02）✅**已完成**（完成：2026-09-21 15:44）
  - 实现说明：最终走「终端侧」方案（条目中预留的两条路之一），pi 仓库本身未改键位——在 Ghostty 独立 fork（`~/Developer/ghostty`）打了「Cmd+V 粘贴剪贴板图片为临时文件路径」补丁（tag `v1.3.1-paste.1`，已并入 main）：Ghostty 截获 Cmd+V 后检测剪贴板图片数据，写入 `$TMPDIR/ghostty-paste-<UUID>.png` 并把路径作为文本粘贴给 TUI。pi（及 Claude Code 等 TUI）通过 Cmd+V 直接收到图片路径文本，自行读取图片，macOS 习惯的 Cmd+V 粘贴截图可用，目标达成且对所有 TUI 应用通用。pi 侧默认键位保持 `ctrl+v` 不变，无回归风险。
