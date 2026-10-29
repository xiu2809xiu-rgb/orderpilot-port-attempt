# How the team works

We build OrderPilot, our product for Problem Statement #11, Spectra Innovations, in one-week sprints from Monday to Sunday that follow the module weeks. Sprint 1 is the module's Week 2 (26 Oct to 1 Nov 2026), and Sprint _n_ is Week _n_ + 1. The backlog, the board and the pull requests all live in GitHub.

| Document                                                           | What it covers                                                                                                                |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [working-agreement.md](working-agreement.md)                       | Roles, ceremonies, the board, and the path from a story to `main`                                                             |
| [definition-of-ready-and-done.md](definition-of-ready-and-done.md) | When a story may enter a sprint, and when it counts as done                                                                   |
| [backlog.md](backlog.md)                                           | Every epic and story with its acceptance criteria, sprint, estimate and priority, generated from `scripts/github/backlog.mjs` |

The rest of the team's documents come with later stories of the platform base, which [prompt 001](../ai/prompts/001-set-up-and-port-the-base.md) lists in section 5:

| Document                            | What it will cover                                                                                                    | Story |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| `docs/agile/hero-journey.md`        | The sales-pilot demo story, and the end-to-end scenarios E2E #1 to #4                                                 | P-3   |
| `docs/team/module-ownership.md`     | The four ownership areas, their owners and backup owners, the paths each one owns, and the shared files               | P-4   |
| `docs/agile/test-plan.md`           | Test levels, environments, traceability, the failure and edge-case matrix, entry and exit criteria, schedule, defects | P-6   |
| `docs/security/security-testing.md` | SAST and the other security checks, and how findings are triaged                                                      | P-14  |

## In GitHub

| Practice                            | Where                                                                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Epics, stories, tasks, spikes, bugs | Issue forms in `.github/ISSUE_TEMPLATE/`, with blank issues off; stories are sub-issues of their epic                                                 |
| Sprints                             | Milestones `Sprint 01 (W2)` to `Sprint 18 (W19)`, and the Sprint field of the project board                                                           |
| The board                           | The **OrderPilot delivery** project: Status, Sprint, Estimate and Area                                                                                |
| Labels                              | `.github/labels.json`: type, area, priority (MoSCoW), module requirement (M1 to M6), status and dependencies                                          |
| Task allocation                     | One assignee per issue; the area label shows who reviews                                                                                              |
| Code owners                         | `.github/CODEOWNERS`, with placeholders until T-1 names each area's owner and backup owner                                                            |
| Pull requests                       | `.github/pull_request_template.md`: the linked story, acceptance evidence and the Definition of Done                                                  |
| Protection of `main`                | The ruleset, mirrored in `.github/rulesets/main.json`: pull requests only, no deletion, no force pushes, and each check from the story that brings it |
| Wiki                                | Pages in `docs/wiki/`, published with `scripts/github/publish-wiki.mjs`                                                                               |

All of this is kept as code. The backlog is data in `scripts/github/backlog.mjs`, so a change to the plan is reviewed like code, and `docs/agile/backlog.md` and the wiki's sprint calendar are generated from it (`node scripts/github/render-backlog.mjs`). The scripts in `scripts/github/` create the labels, the milestones, the board and the backlog's issues, and publish the wiki; only Richie runs them. The ruleset is changed in GitHub's settings, and `.github/rulesets/main.json` mirrors it after every change.
