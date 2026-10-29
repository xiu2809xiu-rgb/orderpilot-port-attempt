## What and why

<!-- One or two sentences: the change and the problem it solves. One task per pull request.
     Start with "Ported from the team's earlier base and adapted for OrderPilot" if the change brings
     something from the earlier base (AGENTS.md section 11), or with "New for OrderPilot" otherwise. -->

Closes #

## Acceptance criteria

<!-- Copy the story's criteria and tick each one this PR meets, with its evidence: a test name, a screenshot, a log line. -->

- [ ] …

## Ownership area

- [ ] Area 1: Document AI and integration core
- [ ] Area 2: Order workflows and approvals
- [ ] Area 3: Cross-document checks, order tracker and insights
- [ ] Area 4: Financial controls, security and monitoring
- [ ] Team: assessments, the client and process

## Module requirements covered

<!-- M1 design thinking · M2 GRS by design · M3 AI-assisted coding · M4 best practices · M5 team Git workflow · M6 deploy and monitor -->

## How it was verified

<!-- Paste the real results, not "works on my machine". Say so if a command does not exist yet. -->

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `docker compose up --build` still works (if Docker, infra or env changed)

## UI changes

<!-- Delete this section if there is no UI change. -->

- [ ] Every state handled: loading, empty, error (retry + traceId), partial, success, permission-denied
- [ ] Every string in the locale files, with no second language (no hard-coded text)
- [ ] Keyboard navigation and focus rings checked
- [ ] `prefers-reduced-motion` respected
- [ ] Screenshots in light and dark, from a Docker build of the branch, saved under `docs/design/screenshots/` and shown here

## Docs

- [ ] `docs/requirements-traceability.md` updated
- [ ] ADR added or updated (if a decision changed)
- [ ] `docs/ai/ai-usage-log.md` updated (if the work was AI-assisted)

## Data and security

- [ ] Synthetic data only, with obviously fake bank details; nothing from Spectra; no secrets or licence keys
- [ ] New writes are audited; new endpoints have RBAC and input validation
- [ ] No new CodeQL, dependency-review or Trivy findings, or each one is triaged in the Security tab

## Definition of Done

<!-- docs/agile/definition-of-ready-and-done.md -->

- [ ] The branch holds one task, and every acceptance criterion above is met
- [ ] CI and the security checks are green
- [ ] Reviewed by the code owner or the team lead, then merged with a merge commit
