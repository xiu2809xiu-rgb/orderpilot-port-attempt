# How we work

One sprint is one week, Monday to Sunday. Sprint 1 is the module's Week 2 (26 Oct to 1 Nov 2026), and Sprint _n_ falls in module Week _n_ + 1. The backlog, the board and the code reviews are all in GitHub.

## Each week

| When              | What                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Start of the week | **Sprint planning:** pull ready stories into the sprint and assign them                                          |
| Every working day | **Stand-up**, written in the team chat: yesterday, today, blockers                                               |
| Mid-week          | **Refinement:** split and estimate next sprint's stories                                                         |
| End of the week   | **Review** of merged work, written in the sprint's milestone, then a short **retrospective**, recorded there too |

## From a story to main

1. Assign yourself a story from the sprint and move it to **In Progress** on the board, at most two per person.
2. Branch from an up-to-date `main`: one task per branch, named `feat/<area>-<description>`, `fix/…`, `docs/…`, `chore/…`, `ci/…` or `test/…`.
3. Commit in small [Conventional Commits](https://www.conventionalcommits.org/).
4. Open a pull request with the template: `Closes #<story>`, the acceptance criteria with their evidence, and screenshots in light and dark for UI changes.
5. Wait for every required check to be green, and a review from the code owner within one working day. Each check is required from the story that brings it: the verify job from P-6, the Docker and IaC scans from P-13, CodeQL and dependency review from P-14, and the end-to-end smoke test from P-15.
6. Merge with a merge commit once every review thread is resolved; the story closes itself. Everyone pulls `main` before their next branch.

## Where the details are

- [Working agreement](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/working-agreement.md): roles, ceremonies, the board and the work-in-progress limit.
- [Definition of Ready and Done](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/definition-of-ready-and-done.md).
- [Backlog](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/backlog.md) and the **OrderPilot delivery** [project board](https://github.com/xiu2809xiu-rgb/orderpilot/projects).
