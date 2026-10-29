# Contributing to OrderPilot

Read [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) first. AGENTS.md sets the rules for every teammate and the AI tools they use, and CLAUDE.md sets the product, the stack and the standards. This guide covers the mechanics of contributing; the team's process (roles, ceremonies and the board) is in [docs/agile/](docs/agile/README.md).

## Set up

The repository holds documents and settings only, so there is nothing to install, build or run yet. To contribute now, you need:

- Git, with your own identity in this repository: `git config user.name "<your name>"` and `git config user.email "<the email on your GitHub account>"`. Commits carry your own name, because the history is how each member's work is seen.
- The GitHub CLI, signed in (`gh auth login`), and write access to the repository, which T-1 gives each teammate.
- An editor that follows `.editorconfig`: UTF-8, LF line endings and two-space indents. `.gitattributes` keeps line endings LF in the repository and the working tree, so scripts and hooks behave the same on Windows and Linux.

Each later story adds to the set-up, and updates this guide when it does:

| Story | What it adds                                                                                                                                                                                                |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-5   | Node.js 24.22 (the version in `.node-version`) and pnpm 12, then `pnpm install`. It brings the type-aware lint, Prettier, commitlint, and the commit and push hooks with the licence-key and samples guards |
| P-6   | CI on every pull request, starting with the **Lint, typecheck, test, build** check                                                                                                                          |
| P-8   | The API shell in `apps/api`                                                                                                                                                                                 |
| P-9   | Docker Desktop with Compose v2, for PostgreSQL and Redis, and `.env.example`, which you copy to a root `.env`                                                                                               |
| P-11  | The web shell in `apps/web`                                                                                                                                                                                 |
| P-13  | The API and web images, so that `docker compose up --build` runs the whole app                                                                                                                              |
| P-15  | The end-to-end smoke test, with Playwright and axe                                                                                                                                                          |
| P-21  | React Bits. The licence key is needed only to install React Bits Pro items: Richie shares it privately, and it goes only in your own git-ignored `apps/web/.env.local`                                      |

## One story, from issue to `main`

1. **Take the story.** Work only on an issue in the current sprint. Assign yourself and move it to In Progress, with at most two per person. P-2 brings the sprint milestones and the **OrderPilot delivery** board; until then, the issues are in the repository's Issues tab. If the story does not meet the [Definition of Ready](docs/agile/definition-of-ready-and-done.md), raise it before you start.

2. **Branch from the latest `main`,** one story per branch. Never reuse an old branch.

   ```bash
   git switch main
   git pull --ff-only
   git switch -c feat/area2-sales-workflow
   ```

   | Prefix   | For                                                                                 | Example                                                |
   | -------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
   | `feat/`  | A feature, named by its area: `area1` to `area4`, or `platform` for the shared base | `feat/area2-sales-workflow`, `feat/platform-api-shell` |
   | `fix/`   | A bug fix                                                                           | `fix/area3-price-tolerance`                            |
   | `docs/`  | Documentation only                                                                  | `docs/ground-rules`                                    |
   | `chore/` | Tooling, dependencies and upkeep                                                    | `chore/monorepo-tooling`                               |
   | `ci/`    | Workflows and checks                                                                | `ci/verify`                                            |
   | `test/`  | Tests only                                                                          | `test/e2e-smoke`                                       |

3. **Commit small, with [Conventional Commits](https://www.conventionalcommits.org/).** Use your area as the scope (`area1` to `area4`); platform and team work may use a topic such as `api`, `docker` or `adr`, or no scope.

   ```text
   feat(area2): route an SPR to the approver within their limit
   test(area3): flag a packing list whose quantity differs from the PO
   docs: add the working agreement
   ```

   The types are `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`, `chore`, `style` and `revert`. The subject starts in lower case and has no full stop, and the whole header stays within 100 characters. From P-5, commitlint refuses anything else, and the pre-commit hook lints and formats your staged files; until then, follow these rules by hand. When a commit brings a teammate's own work, make them its co-author with the GitHub no-reply address of their username, never a school email.

4. **Keep the branch up to date.** Before your first push, you may rebase onto the latest `main` (`git fetch origin`, then `git rebase origin/main`). After it, merge `origin/main` instead, so that a force push is never needed. [AGENTS.md](AGENTS.md) explains how to resolve a conflict without losing anyone's work.

5. **Open a pull request to `main`** that closes its issue. P-2 brings the template (`.github/pull_request_template.md`); until then, give the description the same sections:
   - what and why, starting with "Ported from the team's earlier base and adapted for OrderPilot" or "New for OrderPilot";
   - `Closes #<issue>`, with one keyword per issue: "Closes #41, closes #42" closes both, while "Closes #41 and #42" closes only the first;
   - the acceptance criteria, each with its evidence: a test name, a screenshot or a log line;
   - the ownership area, and the module requirements (M1 to M6) it serves;
   - the real results of the checks in [Before you push](#before-you-push);
   - for a UI change, screenshots in light and dark from a Docker build of the branch, saved under `docs/design/screenshots/`.

   From P-2, also add one `type:` label, your area's label (`area: 1 document AI and integration`, `area: 2 order workflows and approvals`, `area: 3 checks, tracker and insights`, `area: 4 controls and monitoring`, or `area: team`) and the `req:` labels it serves.

6. **Wait for green checks.** There is no CI until P-6, so a pull request shows no checks yet. Each required check joins the ruleset on `main` with the story that brings its job:

   | Required check                                                                                                    | From |
   | ----------------------------------------------------------------------------------------------------------------- | ---- |
   | **Lint, typecheck, test, build**                                                                                  | P-6  |
   | **Docker images** and **IaC and Dockerfile scan**                                                                 | P-13 |
   | **Analyze (javascript-typescript)**, **Analyze (actions)** and **Dependency review**, with the code-scanning rule | P-14 |
   | **End-to-end smoke**                                                                                              | P-15 |

   Fix a failing check with a new commit on the same branch; never force-push. A security finding is fixed or triaged, never ignored.

7. **Get a review.** The code owner of every folder you touch reviews, and Richie reviews shared files. Reviews happen within one working day. Answer every comment and resolve every conversation before merging. Until T-1 makes the owners collaborators and fills `CODEOWNERS`, Richie checks each pull request against the [Definition of Done](docs/agile/definition-of-ready-and-done.md) before merging.

8. **Merge with a merge commit** once every required check is green, then tidy up:

   ```bash
   gh pr merge <number> --merge --delete-branch
   git switch main
   git pull --ff-only
   git branch -d <branch>
   ```

   The issue closes through `Closes #<issue>`, and the story moves to Done. Never push to `main` directly: its ruleset requires a pull request for every change, and refuses force pushes and deletion.

## Before you push

Nothing runs yet. Once P-5 and P-6 have brought the scripts, run the checks and paste their real output into the pull request:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

From P-9, the integration tests need PostgreSQL and Redis running in Docker. The [Definition of Done](docs/agile/definition-of-ready-and-done.md) lists everything a story needs, and the test plan that P-6 brings (`docs/agile/test-plan.md`) says which tests belong where.

Then check the diff:

```bash
git fetch origin
git diff --stat origin/main...HEAD
git diff --name-only --diff-filter=D origin/main...HEAD
```

The last command lists the files your branch deletes, and each must be one you meant to delete. The diff holds no secrets, `.env` files, client documents, AI attribution, `console.log` or commented-out code.

## Code standards in short

- TypeScript in strict mode, and no `any`. Validate external input at the boundary with zod, using the shared schemas in `packages/shared` (from P-7).
- Back end: thin controllers, services for use cases, repositories as the only place Prisma is called, and domain classes with no Prisma in them.
- Front end: function components and hooks. Every data view handles loading, empty, error (with retry and trace id), partial, success and permission-denied. Design tokens only, in light and dark.
- English first: every user-facing string lives in the locale files, never in the code, and there is no second language unless Spectra asks for one.
- Comments explain why, not what, and public classes and functions get concise TSDoc. No `console.log`, dead code or commented-out code.

## AI-assisted work

Every AI tool follows [AGENTS.md](AGENTS.md), and so does the teammate using it. Your AI works only in your own area, plans before it edits, never deletes anyone's work, and runs no destructive command without your OK. [CLAUDE.md](CLAUDE.md) sets the standards it codes to.

- Log significant AI-assisted work as a row in your area's table in [docs/ai/ai-usage-log.md](docs/ai/ai-usage-log.md). Store a substantial prompt in `docs/ai/prompts/` as `areaN-NNN-short-title.md`, with your own area number.
- No AI attribution anywhere: no co-author trailers for an AI tool, and no AI footers, emoji or session links in commits, pull requests, comments or docs. `.claude/settings.json` turns Claude Code's own attribution off.
- To bring something from the team's earlier base, follow the "Bringing something from the earlier base" section of [AGENTS.md](AGENTS.md): only what the story lists and only its generic parts, adapted for OrderPilot, with the story's own tests, ADR and log row, in a pull request that says it is ported.

## Security and data

- Synthetic data only: synthetic companies and documents, obviously fake bank details, and prices in USD.
- Nothing from Spectra goes into Git. A client sample is tried only on your own machine, in the git-ignored `samples/` folder; P-5 adds a guard that refuses to commit one.
- Never commit or share a `.env` file or the React Bits licence key, which lives only in `apps/web/.env.local`.
- Report a vulnerability privately, as [SECURITY.md](SECURITY.md) explains, never in a public issue.
