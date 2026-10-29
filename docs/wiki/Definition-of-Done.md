# Definition of Done

A story is done when it is merged into `main` through a pull request and:

- every acceptance criterion is met, with the evidence in the pull request;
- lint, typecheck, tests and the build pass, and CI and the security checks are green;
- new domain logic has unit tests (80% line coverage on domain modules), new endpoints have integration tests for the happy path and the auth failures, and new journeys have an end-to-end step with axe checks;
- UI changes handle every state, keep every string in the locale files with no second language, work with the keyboard and reduced motion, and come with screenshots in light and dark from a Docker build of the branch;
- data is synthetic, writes are audited, endpoints have RBAC and validation, and no secret or key is committed;
- the traceability matrix, ADRs, assumptions and the AI usage log are updated where relevant;
- the code owner (or the team lead for shared files) has reviewed it, and every review thread is resolved.

A check whose story has not landed yet does not apply: the pull request says so instead of reporting a result. The full checklists, including the Definition of Ready and the sprint and release checks, are in [definition-of-ready-and-done.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/definition-of-ready-and-done.md).
