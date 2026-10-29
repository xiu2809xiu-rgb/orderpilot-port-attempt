# Definition of Ready and Definition of Done

The two checklists every story passes: once before it enters a sprint, and once before it counts as done. They apply to every area. The Done list is [CLAUDE.md](../../CLAUDE.md) section 11 with the team rules added, and this is the one place the full list is written down.

Some items rely on tools and documents that later stories of the platform base bring, such as the `pnpm` scripts (P-5), CI (P-6), the local stack (P-9), the locale files (P-11) and the Docker images (P-13). Until the story that brings one has merged, its item does not apply yet: the pull request says so and names that story, instead of reporting a result.

## Definition of Ready

A story can enter a sprint when:

- [ ] It names its user (a persona or a role) and the value they get: "As a …, I want …, so that …".
- [ ] Its acceptance criteria can each be checked by a teammate without asking the author: "Given …, when …, then …".
- [ ] It is estimated in story points (1, 2, 3, 5, 8 or 13). Anything above 8 is split first.
- [ ] It has a priority (Must, Should or Could), an area label and the module requirements it serves.
- [ ] It is a sub-issue of its epic, and its dependencies on other stories or areas are named.
- [ ] Nothing blocks it: no open question for Spectra, no missing interface from another area.
- [ ] The test approach is clear: which unit, integration or end-to-end tests will prove it (the test plan, `docs/agile/test-plan.md`, comes with P-6).

## Definition of Done

### For every story and pull request

- [ ] **Acceptance criteria** are all met, and the pull request shows the evidence for each.
- [ ] **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass, and `docker compose up --build` still works. CI, CodeQL, dependency review and the Trivy scans are green, or each finding is triaged in the Security tab.
- [ ] **Tests:** new domain logic has unit tests, keeping at least 80% line coverage on domain modules. New endpoints have Supertest tests for the happy path and the auth failures (401 and 403). A new user journey has a Playwright step with axe checks.
- [ ] **API:**
  - inputs are validated with the shared zod schemas
  - list endpoints are paginated, and every new query path has an index
  - every write is audited
  - Swagger is current
- [ ] **UI:**
  - every state is handled: loading, empty, error (with retry and `traceId`), partial, success and permission-denied
  - every user-facing string is in the locale files, never hard-coded, with no second language unless Spectra asks for one
  - keyboard use and reduced motion are checked
  - the page uses at least one React Bits item, recorded in `docs/design/reactbits-usage.md`
  - screenshots in light and dark, from a Docker build of the branch, are saved under `docs/design/screenshots/` and shown in the pull request
- [ ] **Data and security:** synthetic data only, with obviously fake bank details and nothing from Spectra's own documents; no secrets or licence keys; RBAC and masking on every new endpoint.
- [ ] **Docs:**
  - the rows in `docs/requirements-traceability.md` are updated
  - an ADR is added if a decision changed ([the ADR index](../adr/README.md))
  - `docs/assumptions.md` is updated if an assumption was confirmed or broken
  - the [AI usage log](../ai/ai-usage-log.md) has an entry in its area's table if the work was AI-assisted
- [ ] **Review and merge:** the code owner (or the team lead for shared files) reviewed it, every review thread is resolved, and it was merged into `main` through a pull request with a merge commit.

### For a sprint

- [ ] Every story in the sprint is Done, or the review moves it to the next sprint or back to the backlog, with the reason.
- [ ] `main` is green, and the demo still runs from `docker compose up --build`.
- [ ] The review is written in the sprint's milestone (what merged, what didn't, and why), and the retrospective's actions are recorded there too.

### For an assessment release (W5, W13, W18)

- [ ] The release is tagged on `main` (`v0.1-proposal`, `v0.2-technical-review`, `v1.0-final`).
- [ ] The traceability matrix and the [build report](../BUILD_REPORT.md) match what is shown.
- [ ] Each member can walk through their own area's code, tests and decisions.
