# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0.0] - 2026-04-06

### Added
- AskMe AI widget on the Hero section — visitors can type a question or pick a suggestion chip and get a streamed answer about Elwin's background, skills, and experience
- Streaming SSE API route (`/api/ask`) backed by Azure AI Foundry (claude-haiku-4-5), with in-memory rate limiting (5 requests per 15 hours per IP)
- Vitest + @testing-library/react test suite with 5 regression tests covering the AskMe component (streaming, rate limit error, chip interaction, hide-chips-after-ask)

### Changed
- gstack migrated from vendored copy in `.claude/skills/gstack/` to shared team install at `~/.claude/skills/gstack` (vendoring deprecated)
- gstack upgraded to v0.15.15.0
