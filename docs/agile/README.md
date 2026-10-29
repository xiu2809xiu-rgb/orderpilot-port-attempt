# How the team works

We build OrderPilot, our product for Problem Statement #11, Spectra Innovations, in one-week sprints from Monday to Sunday that follow the module weeks. Sprint 1 is the module's Week 2 (26 Oct to 1 Nov 2026), and Sprint _n_ is Week _n_ + 1. The backlog, the board and the pull requests all live in GitHub.

| Document                                                           | What it covers                                                    |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [working-agreement.md](working-agreement.md)                       | Roles, ceremonies, the board, and the path from a story to `main` |
| [definition-of-ready-and-done.md](definition-of-ready-and-done.md) | When a story may enter a sprint, and when it counts as done       |

The rest of the team's documents come with later stories of the platform base, which [prompt 001](../ai/prompts/001-set-up-and-port-the-base.md) lists in section 5:

| Document                            | What it will cover                                                                                                    | Story |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| `docs/agile/backlog.md`             | Every epic and story with its acceptance criteria, sprint, estimate and priority                                      | P-2   |
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

P-2 brings all of this as code. The backlog becomes data in `scripts/github/backlog.mjs`, so changes to the plan are reviewed like code, and once P-2 has merged, its scripts create the labels, the milestones, the board and the backlog's issues, and publish the wiki. Until then, two things are in place: the ruleset on `main`, which already asks for a pull request and refuses deletion and force pushes, and the issues for P-1 and P-2, made by hand, which the backlog script adopts by title.
