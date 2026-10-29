# Build report

A short section per prompt: what each story merged, its checks, and what it left out and why.

## Prompt 001: Set up OrderPilot and port the base

[Prompt 001](ai/prompts/001-set-up-and-port-the-base.md) ports the team's earlier base into this repository one story at a time, from commit `f6bb016`, as [ADR 0002](adr/0002-clean-repository-for-orderpilot.md) records.

### Step 0 (29 Oct 2026)

- **Ruleset:** `protect-main` (id 25928154) targets the default branch. It requires a pull request (0 approvals; stale reviews dismissed on push), blocks deletion and force pushes, and has no bypass actors. It requires no status checks and has no code-scanning rule, so, as step 0.1 says for a ruleset that only requires pull requests, it was left unchanged. Each check joins it with the story that brings its job, and the code-scanning rule with P-14; P-2 mirrors it in `.github/rulesets/main.json`.
- **Changed:** Dependabot alerts, Dependabot security updates and private vulnerability reporting turned on; head branches deleted after merge; rebase merging turned off, so only merge commits and squash merges are allowed.
- **Already on:** secret scanning with push protection; the dependency graph (the repository is public, and its SBOM export answers); read-only default workflow permissions.
- **Wiki:** on, and its first page exists, so P-2 can publish it.
- **Docker:** no containers were running. The earlier base's stopped containers and their volumes were left alone.
- **Issues, made by hand:** [#1](https://github.com/xiu2809xiu-rgb/orderpilot/issues/1) "P-1: Ground rules" and [#2](https://github.com/xiu2809xiu-rgb/orderpilot/issues/2) "P-2: GitHub as code", for P-2's backlog script to adopt by title.
- **Board:** a new project, OrderPilot delivery, comes with P-2. The earlier board stays with the earlier repository.
- **Richie's answers:** the teammates' GitHub usernames (Azri `MaineJermaine`, Angelyn `angelynnmr`, Iok Teck `ITnyp`), for T-1 step 1; React Bits Pro code may sit in this public repository, with the licence risk accepted (for P-21); no licence file for now; the earlier repository stays unarchived for now and will be archived later.
- **Node:** this machine runs Node 24.15.0. `.node-version` pins 24.22.0, which CI (P-6) and the Docker images (P-13) will use.

### Stories

| Story              | Issue                                                       | Branch                 | Pull request                                              | Checks                                                                                         | Left out                                                                                                                                      |
| ------------------ | ----------------------------------------------------------- | ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| P-1 Ground rules   | [#1](https://github.com/xiu2809xiu-rgb/orderpilot/issues/1) | `docs/ground-rules`    | [#3](https://github.com/xiu2809xiu-rgb/orderpilot/pull/3) | No CI yet (P-6); no pnpm scripts yet (P-5)                                                     | The earlier slide-export and Python ignore rules (they served the slides and the 3D asset scripts; P-22 brings its own)                       |
| P-2 GitHub as code | [#2](https://github.com/xiu2809xiu-rgb/orderpilot/issues/2) | `chore/github-process` | This pull request                                         | No CI yet (P-6); no pnpm scripts yet (P-5); `node --check` on every script; the seed's dry run | The earlier backlog and its retired keys; the seed's close-on-merge logic (pull requests close their issues); the earlier wiki pages' content |

### What only Richie can do

- Upgrade Node to 24.22.0 on this machine, which needs admin rights.
- Archive the earlier repository later, as decided on 29 Oct 2026.
