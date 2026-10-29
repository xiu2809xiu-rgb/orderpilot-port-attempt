# ADR 0002: A clean repository for OrderPilot

- **Status:** Accepted
- **Date:** 2026-10-29
- **Traceability:** M3, M5

## Context

OrderPilot is our product for Problem Statement #11, Spectra Innovations, allocated to the team in Week 2 (26 Oct 2026). Four things shape how its repository starts:

- **Our lecturer asked for a clean repository** with only #11's work in it.
- **The module asks for an Agile team Git workflow** (M5): stories, branches and pull requests that integrate everyone's code. 85% of the marks are individual, so the history has to show who built what, and for which problem.
- **A platform base already exists.** Before #11 was allocated, Richie, the team lead, started a platform base for the team in an earlier repository: the monorepo and its tooling, CI and security scanning, shared contracts, an API and a web shell, sessions and role-based access, a hash-chained audit trail, an AI gateway and a connector framework. It is unfinished, and it was aimed at earlier problem statements, so much of it serves their domains rather than Spectra's.
- **The port is AI-assisted** (M3), as the base was. Students own every line they submit, so what comes across has to be visible, reviewed and adapted, not copied in bulk.

Starting from nothing would spend the weeks before the Week 5 proposal rebuilding what already exists. Carrying on in the earlier repository would bring other statements' code, documents and history with it.

## Decision

We will build OrderPilot in this repository, with only #11's work in it, and port the earlier base into it one story at a time from commit `f6bb016`. [Prompt 001](../ai/prompts/001-set-up-and-port-the-base.md) lists the stories and their order: the platform base, and a starting point for each area.

**How a piece comes across.**

- A story ports only what it lists, and only its generic parts, adapted to OrderPilot on the way: OrderPilot names, `@orderpilot/*` packages, Spectra's nine roles and #11's terms. Where a file mixes generic code with another statement's domain, only the generic part comes across, with no dead code, flags, comments or test data for the rest. When in doubt, it stays out, and we record it under "Left out" in the [build report](../BUILD_REPORT.md).
- A story is merged the normal way: an issue, a branch, a pull request that closes the issue, green checks and a merge commit.
- A story brings its own pieces with it, such as its tests, its ADR (the earlier one, renumbered and rewritten for OrderPilot) and its row in the [AI usage log](../ai/ai-usage-log.md).

**We say so openly.** Every pull request that ports something starts with "Ported from the team's earlier base and adapted for OrderPilot", and new work starts with "New for OrderPilot". A ported ADR says once that it was ported from the team's earlier base.

**What stays behind:** anything that served another problem statement. That means its domain modules and screens; its mock systems, connectors and sync pipelines; its seeds, fixtures, test data, end-to-end tests, translations and synthetic data; and its screenshots, diagrams, slides, ADRs, prompts, AI usage rows, backlog, build report and history. The earlier base's 3D map and its asset scripts stay behind too, unless Richie later asks for them as a story of their own, and so does the earlier lockfile: P-5 generates a fresh one.

**Who builds what.** Richie builds the base for every area, and then each owner takes over their own: area 1 (document AI and integration core) stays with Richie, area 2 (order workflows and approvals) goes to Azri, area 3 (cross-document checks, order tracker and insights) to Iok Teck, and area 4 (financial controls, security and monitoring) to Angelyn. #11's own business rules in areas 2 to 4 are left to their owners.

**The earlier repository** is a reference we only read. We never write to it, it is never a remote of this repository, and no commits move between the two. Its board stays with it, and this repository gets a new one, OrderPilot delivery (P-2). The earlier repository will be archived later: on 29 Oct 2026 the team lead decided to keep it unarchived for now.

## Consequences

### Positive

- A clean history: `main` holds only #11's work, and every change reaches it through a pull request.
- A clear provenance: each pull request says what it ported and what is new, and the earlier base stays readable at `f6bb016`, so anyone can compare a ported piece with its source.
- The team Git workflow is in use from the first story, with an issue, a branch and a pull request each time, and checks as CI lands (P-6 onwards).
- Every piece is re-read for Spectra as it comes across, which is the review that AI-assisted work needs anyway.
- Teammates' work keeps their name. When a story brings a teammate's own work, its pull request and the AI usage log say so, and its commit names them as co-author with the GitHub no-reply address of their username. Azri's workflow state machine comes across this way, in C-1.

### Negative

- The base takes many small pull requests instead of one copy, over Sprints 1 to 3, and each piece is missing here until its story merges. The first stories have no CI to check them, because P-6 brings it, so they are checked by hand.
- ADRs are renumbered. A ported ADR takes the next free number in story order, so its number in the [index](README.md) differs from the earlier one, and its cross-references are updated to the new numbers. The earlier records are not rewritten; each ported one is a new record here.
- The earlier history does not come across, so neither does the authorship it records. Credit has to be carried over by hand, as above.
- Until the earlier repository is archived, it can still be changed on GitHub, so keeping it as it is depends on us.

## Alternatives considered

| Option                                                                       | Why rejected                                                                                                                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Carry on in the earlier repository                                           | Our lecturer asked for a clean repository, and its code, documents, ADRs and history serve earlier problem statements                                   |
| Copy the earlier base in one commit, then delete what does not fit           | Too large to review in one pull request; another statement's names and dead code would slip through, and nothing would show what came from where        |
| Fork the earlier repository, or add it as a remote and cherry-pick           | A fork keeps the whole earlier history, and cherry-picked commits mix generic and domain changes; both tie this repository to one that is not #11's     |
| Rewrite the earlier repository's history to strip the other statements' work | Destructive and hard to verify, because most commits mix generic and domain changes, and the result would still have no issues or pull requests for #11 |
| Start from nothing                                                           | Rebuilds tooling, CI, security and shells that already exist, and spends the weeks before the Week 5 proposal on them                                   |
