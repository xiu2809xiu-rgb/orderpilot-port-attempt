# Working agreement

How the four of us plan, build, review and ship OrderPilot for Spectra Innovations. It turns module requirement 5 (team Git workflow) and the assessment calendar into habits. Change it by pull request, after agreeing at a retrospective.

A practice that depends on something still to come names the story that brings it, such as P-6 for CI. Those stories make up the platform base, and [prompt 001](../ai/prompts/001-set-up-and-port-the-base.md) lists them.

## Roles

| Role                        | Who                                                                 | Responsibilities                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Product owner and team lead | Richie                                                              | Owns the backlog and its priorities, speaks for Spectra between client sessions, runs the ceremonies, owns area 1 and the platform base, and builds each area's base before its owner takes over                                           |
| Area owners                 | Richie (area 1), Azri (area 2), Iok Teck (area 3), Angelyn (area 4) | Write their area's core logic and tests, keep its guide in `docs/team/` current, and review pull requests that touch their folders. P-4 brings the guides and `docs/team/module-ownership.md`, and T-1 agrees a backup owner for each area |
| Reviewer of the day         | Whoever is not the author                                           | Reviews open pull requests within one working day                                                                                                                                                                                          |

## The sprint

One sprint is one week, Monday to Sunday. Sprint 1 is the module's Week 2 (26 Oct to 1 Nov 2026), and Sprint _n_ is Week _n_ + 1, so the 18 sprints run to Week 19 and each assessment week is a sprint of its own: the proposal (Week 5) is Sprint 4, the mock interview (Week 7) Sprint 6, the technical review (Week 13) Sprint 12 and the final presentation (Week 18) Sprint 17. Each sprint is a GitHub milestone, from `Sprint 01 (W2)` to `Sprint 18 (W19)`, and an iteration of the Sprint field on the **OrderPilot delivery** board. The scripts in `scripts/github/` create both, and the [backlog](backlog.md) lists every sprint with its goal.

| Ceremony           | When                                        | Time box   | Output                                                                                                                                                            |
| ------------------ | ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sprint planning    | Start of the week (at the weekly lesson)    | 30 minutes | Stories pulled into the sprint, each meeting the Definition of Ready, with an owner                                                                               |
| Stand-up           | Every working day, written in the team chat | 5 minutes  | Yesterday, today, blockers; a blocker gets the `status: blocked` label                                                                                            |
| Backlog refinement | Mid-week                                    | 30 minutes | Next sprint's stories split, estimated and given acceptance criteria                                                                                              |
| Sprint review      | End of the week, by Sunday                  | 20 minutes | A demo of merged work against the acceptance criteria, the board updated, and a short review written in the sprint's milestone: what merged, what didn't, and why |
| Retrospective      | Straight after the review                   | 15 minutes | One thing to keep and one to change, which the team lead records in the sprint's milestone                                                                        |

**Capacity.** Plan about 8 story points per member per sprint, fewer in assessment weeks. At the review, each unfinished story moves to the next sprint or goes back to the backlog, and the review says which and why; nothing spills over silently. If a sprint's stories are done early, we pull in the next ones and say so in the review.

**Releases.** The proposal, the technical review and the final presentation each get a release: a feature freeze in the sprint before the assessment, then a tag on `main` (`v0.1-proposal` in Week 5, `v0.2-technical-review` in Week 13 and `v1.0-final` in Week 18). The [Definition of Done](definition-of-ready-and-done.md#for-an-assessment-release-w5-w13-w18) lists what a release needs.

## The board

The **OrderPilot delivery** project (GitHub Projects) shows every epic and story with its Sprint, Estimate, Area and Status. Two views come with it: **Sprint board**, the current sprint with a column per status, and **Backlog**, the full table. The scripts in `scripts/github/` create the board and both views. Group the Backlog by Sprint once in the browser (View options, then Group by), because GitHub's API cannot set grouping.

| Status      | Means                                                                                                       | Limit        |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------------ |
| Todo        | In the sprint, not started                                                                                  |              |
| In Progress | Someone is assigned and a branch exists                                                                     | 2 per person |
| Done        | Merged into `main` and meeting the [Definition of Done](definition-of-ready-and-done.md#definition-of-done) |              |

An issue is assigned to the one person doing it. Pairing is welcome; the assignee stays the one who explains it at an assessment.

## From story to main

1. **Pick** a story from the sprint, assign yourself, and move it to In Progress.
2. **Branch** from an up-to-date `main`, one task per branch: `feat/<area>-<description>`, `fix/…`, `docs/…`, `chore/…`, `ci/…` or `test/…`.
3. **Commit** in small Conventional Commits. The hooks that P-5 brings run lint, format, the licence-key guard and the samples guard.
4. **Open a pull request** with the template filled in (`.github/pull_request_template.md`): `Closes #<story>`, the acceptance criteria with evidence, and screenshots in light and dark for UI. A pull request that brings something from the team's earlier base says so first ([ADR 0002](../adr/0002-clean-repository-for-orderpilot.md)).
5. **Checks.** Every check must be green. Each check becomes required with the story that brings its job, from the verify job in P-6 to the end-to-end smoke test in P-15, and CodeQL's code-scanning rule comes with P-14. A finding is fixed or triaged, never ignored (P-14 brings `docs/security/security-testing.md`).
6. **Review.** The code owner of the touched folder reviews, or the team lead for shared files, and for everything until T-1 names the owners. Reviews come within one working day, and every review thread is resolved before merging. While the team lead builds the platform base alone, the lead's pull requests are checked against the Definition of Done before merging, and teammates may review them afterwards. Once the owners are collaborators, each owner reviews the pull request that brings their area's base.
7. **Merge** with a merge commit, delete the branch, and the story closes through `Closes #…` and moves to Done.
8. **Pull.** Everyone starts their next branch from the new `main`.

## Communication

- Decisions that change the architecture or a CLAUDE.md rule become an ADR in [`docs/adr/`](../adr/README.md).
- Questions for Spectra go into `docs/client/questions-for-client.md`, and their answers into `docs/assumptions.md`; P-3 brings both.
- AI-assisted work is logged in [ai-usage-log.md](../ai/ai-usage-log.md), in its area's table. Nothing in commits, pull requests or code carries AI attribution.
