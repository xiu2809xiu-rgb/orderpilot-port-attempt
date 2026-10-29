# AI usage log

The one place where AI-assisted work on OrderPilot is recorded, as [`AGENTS.md`](../../AGENTS.md) and [`CLAUDE.md`](../../CLAUDE.md) require. Every significant AI-assisted task gets a row in its area's table: the date, the tool, the task, the prompt file, what was accepted or changed, and the human reviewer. Each owner adds rows to their own area's table.

Substantial prompts are stored in [`prompts/`](prompts/): the platform's as `NNN-short-title.md`, and a teammate's as `areaN-NNN-short-title.md`, with their area number.

Students own every line they submit: AI output is reviewed, tested and, where needed, rewritten before it is merged. When a story brings a teammate's own work, its row says whose it is.

## Platform

| Date       | Tool                                     | Task                                                                                                                                                                                                                                                                                  | Prompt                                                                     | Accepted / changed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Human reviewer          |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 2026-10-29 | Claude Code (Anthropic, Claude Opus 5.5) | P-1 Ground rules: step 0's repository settings and the first two issues; the README, CONTRIBUTING, SECURITY, AGENTS.md and CLAUDE.md, the editor and Git settings, ADRs 0001 and 0002, the Agile documents, this log and the build report (this pull request)                         | [001-set-up-and-port-the-base.md](prompts/001-set-up-and-port-the-base.md) | Accepted with changes. Ported from the team's earlier base and adapted: only this repository is described; English first, with no second language; one-week sprints from Week 2. ADR 0002, this log and the build report are new. Checked before commit with a scan for other problem statements' terms, a relative-link check and a full read.                                                                                                                                                                                          | Richie (pending review) |
| 2026-10-29 | Claude Code (Anthropic, Claude Opus 5.5) | P-2 GitHub as code: the issue forms, the pull request template, CODEOWNERS (placeholders until T-1), the labels, the ruleset mirror, the scripts in `scripts/github/`, this prompt's backlog as data with its rendered `docs/agile/backlog.md`, and the team wiki (this pull request) | [001-set-up-and-port-the-base.md](prompts/001-set-up-and-port-the-base.md) | Accepted with changes. Ported from the team's earlier base and adapted: the four areas everywhere; English only; Sprint 1 in Week 2; the board renamed OrderPilot delivery; the earlier backlog, its retired keys and its close-on-merge logic left out, because each pull request now closes its own issue; the board no longer moves an In Progress item back to Todo when the seed runs again. The backlog's stories and acceptance criteria were written from prompt 001. A read-only dry run checked that the seed adopts #1 and #2 | Richie (pending review) |

## Area 1: Document AI and integration core

| Date | Tool | Task | Prompt | Accepted / changed | Human reviewer |
| ---- | ---- | ---- | ------ | ------------------ | -------------- |

## Area 2: Order workflows and approvals

| Date | Tool | Task | Prompt | Accepted / changed | Human reviewer |
| ---- | ---- | ---- | ------ | ------------------ | -------------- |

## Area 3: Cross-document checks, order tracker and insights

| Date | Tool | Task | Prompt | Accepted / changed | Human reviewer |
| ---- | ---- | ---- | ------ | ------------------ | -------------- |

## Area 4: Financial controls, security and monitoring

| Date | Tool | Task | Prompt | Accepted / changed | Human reviewer |
| ---- | ---- | ---- | ------ | ------------------ | -------------- |

## What the AI was not trusted to do

- Decide client facts: everything about Spectra's systems, documents and rules beyond the problem statement stays an assumption until the briefing call in the week of 2 Nov 2026. P-3 brings `docs/assumptions.md` and `docs/client/questions-for-client.md` to track them.
- Handle secrets: it never opens, prints or commits `.env` files or the React Bits licence key.
- Settle governance questions: the plan, the repository's settings and ruleset, licences and anything irreversible are the team lead's calls. On 29 Oct 2026, for example, Richie decided that React Bits Pro code may sit in this public repository and that the earlier repository stays unarchived for now.
- Mark work as done without evidence: a story is done only when its real results are in its pull request and in [`../BUILD_REPORT.md`](../BUILD_REPORT.md).
