# Prompt 001: Set up OrderPilot and port the base, one story at a time

This repository holds **OrderPilot**, our product for Problem Statement #11, Spectra Innovations, in the IT2134 IT Innovation Project (SCCCI x NYP AI Innovation Challenge). Our lecturer asked for a clean repository with only #11's work in it, and the module asks for an Agile team Git workflow. So:

- **Nothing from another problem statement comes in:** no code, names, fields, strings, comments, test data, documents, decisions, prompts, logs, screenshots or history.
- **The base comes across from the platform base Richie started for the team** before #11 was allocated. It was unfinished and aimed at earlier statements, so only what OrderPilot needs comes across, one story at a time, each piece adapted to OrderPilot and merged the normal way: an issue, a branch, a pull request, green checks.
- **We say so openly.** ADR 0002 records the approach, and every pull request that ports something says so.
- **You build the base for every area, and then each owner takes over their area.** Richie is the team lead. The base brings what the earlier base had, adapted, plus a starting point for each area. #11's own business rules in areas 2 to 4 are left to their owners.

## 1. Sources

- **The earlier base:** a read-only clone at `../orderpilot-base-reference`, checked out at commit `f6bb016`. Read it with `git -C ../orderpilot-base-reference show f6bb016:<path>`, or open its files. Never edit, commit, fetch or push there, and never add it as a remote of this repository. If it is missing or at another commit, stop and tell Richie.
- **#11's decisions,** in the earlier base at that commit: `docs/problem-statement.md`, `AGENTS.md`, sections 1 to 4 of `CLAUDE.md`, and the decisions in `docs/ai/prompts/006-final-ps11-spectra.md` and `docs/ai/prompts/007-orderpilot-name-scope-and-contracts.md` (the scope and MoSCoW, the four areas and the contracts between them, where we use AI, the targets, and the briefing-call questions). Use those two prompts as sources only and never copy them in, because they also deal with earlier statements.
- **Spectra's own documents** stay out of Git, as before.
- **Set-up lessons on Richie's Windows machine** (Node, pnpm, Docker Desktop) are in the earlier `docs/BUILD_REPORT.md`. Read them when you hit a set-up problem, but don't copy the report.

## 2. Rules for every story

1. **One story, one issue, one branch, one pull request.** Branch from the latest `main`. The pull request closes its issue and is merged with a merge commit once every required check is green. Then the branch is deleted and the story moves to Done.
2. **Names:** branches `feat/<area>-…`, `fix/…`, `docs/…`, `chore/…`, `ci/…` or `test/…`; Conventional Commits; small commits.
3. **Port only what the story lists, and only its generic parts.** Adapt as you go: OrderPilot names, `@orderpilot/*` packages, Spectra's roles and #11's terms. Where a file mixes generic code with another statement's domain, bring only the generic part, and leave no dead code, flags, comments or test data for what stayed out. When in doubt, leave it out and list it in your report.
4. **The pull request follows the template:**
   - what and why, starting with "Ported from the team's earlier base and adapted for OrderPilot" or "New for OrderPilot";
   - the acceptance criteria, each with its evidence;
   - the real results of `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`, plus `docker compose up --build` once it exists;
   - for UI changes, screenshots in light and dark from a Docker build of the branch, saved under `docs/design/screenshots/` and shown in the pull request.
5. **Each story brings its own pieces with it:** its Prisma models and migration, its tests, its `.env.example` entries, its ADR (the earlier one, renumbered and rewritten for OrderPilot), its rows in the traceability matrix and in `docs/architecture/patterns.md`, and one row in the AI usage log.
6. **No AI attribution anywhere:** no Co-Authored-By trailers for AI, no "Generated with" lines, no AI emojis or session links, in commits, pull requests, comments or docs. P-1 brings `.claude/settings.json`, which turns attribution off.
7. **Data:** synthetic only, and nothing from Spectra in Git. The React Bits licence key lives only in `apps/web/.env.local`: never print, copy or commit it.
8. **Teammates' own work keeps their name.** Azri wrote the workflow state machine. Say so in the pull request that brings it and in the AI usage log, and make him a co-author of that commit with the GitHub no-reply address of his username (T-1), never his school email. Once the owners are collaborators, request the owner's review on every pull request that brings their area's base.
9. **Honesty and care:** run the commands and report their real results. Ask Richie before anything destructive or irreversible, and before any change to this plan.

## 3. Step 0, before the first pull request

1. **The ruleset.** List the rulesets that target `main`, and keep everything that protects it: pull requests required, no deletion, no force pushes, and any bypass as Richie set it.
   - If a ruleset also requires status checks or code-scanning results, those cannot exist until their workflows do, so nothing could merge without the bypass. Richie approves this change: remove only the required checks and the code-scanning rule for now.
   - If it only requires pull requests, leave it as it is.
   - Either way, each check is required from the story that brings its job (section 5), and the code-scanning rule from P-14. By the end of Sprint 2 the ruleset matches the earlier repository's: pull requests, the seven checks and CodeQL.

2. **Settings:**
   - turn on the dependency graph (dependency review needs it), Dependabot alerts and security updates, secret scanning with push protection, and private vulnerability reporting;
   - delete head branches after merge, allow only merge commits and squash, and set the default workflow permissions to read-only;
   - make sure the wiki is on. Richie makes its first page in the browser, because GitHub has no API for that. Check that it exists before P-2 publishes the wiki, and ask him once if it doesn't.

3. **Docker:** if containers from the earlier base are still running (`docker ps`), they hold the ports this repository uses. Ask Richie to stop them, and never remove them or their volumes.

4. **The first two issues,** for P-1 and P-2, made by hand so their pull requests have something to close. P-2's backlog script adopts them by title.

## 4. Sprints, pace and reports

- **One sprint is one week, Monday to Sunday.** Sprint 1 is this week, 26 Oct to 1 Nov 2026 (the module's Week 2), and Sprint _n_ is module Week _n_ + 1. The milestones are `Sprint 01 (W2)` to `Sprint 18 (W19)`.
- **Pace doesn't matter; the process does.** Work through the base stories in order, without waiting between them. If a sprint's stories are done early, pull the next ones into the current sprint and say so in its review.
- **At the end of each sprint** (Sunday), write a short review in the milestone (what merged, what didn't, and why), move unfinished stories to the next sprint, and report (section 10). Richie adds the retrospective. Then carry on, unless Richie says to stop.
- **Stop when the base is done** (sections 5 and 6, up to P-22), or whenever you are blocked.
- **If your context is compacted, or a new session picks this up,** re-read this prompt, work out where you are from the board, the open pull requests and `docs/BUILD_REPORT.md`, and carry on.

## 5. The platform base, story by story

### Sprint 1 (this week): the team's way of working, and an API that runs

**P-1 Ground rules** (`docs/ground-rules`)

- **From:**
  - `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `AGENTS.md` and `CLAUDE.md`;
  - `.claude/settings.json`, which Richie may have copied in already, so that attribution is off from the first commit. Commit it as it is;
  - `.editorconfig`, `.gitattributes`, `.gitignore` (it replaces GitHub's template) and `.node-version`;
  - `docs/adr/0001-record-architecture-decisions.md` and the ADR index;
  - `docs/agile/`: its README, the working agreement, and the Definitions of Ready and Done.
- **New:**
  - ADR 0002, "A clean repository for OrderPilot": the lecturer's request; the platform base the team lead started for the team before #11 was allocated, unfinished and aimed at earlier statements; porting it story by story from commit `f6bb016`; what stays behind, in general terms; the team lead building every area's base before the owners take over; and that the earlier repository is archived;
  - a fresh `docs/ai/ai-usage-log.md`, with one table per area, the platform and area 1 first;
  - this prompt as `docs/ai/prompts/001-set-up-and-port-the-base.md`, moved there if Richie saved it elsewhere.
- **Changes:**
  - `CLAUDE.md` describes only this repository: no earlier statement, archive tag, earlier ADR, or earlier role, mock system, layout or journey. The layout tree grows as stories land.
  - English first: the i18n framework stays and every string lives in the locale files, but a second language comes only if Spectra asks. The Definition of Done asks for strings in the locale files, with no second language.
  - `AGENTS.md` gets this repository's paths and names, and a new section, "Bringing something from the earlier base", with rules 3 to 5 above, for any teammate's AI that ever needs to.
  - The working agreement and the README speak for Spectra. One sprint is one week, and Sprint 1 is the module's Week 2.

**P-2 GitHub as code** (`chore/github-process`)

- **From:** `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`, `.github/CODEOWNERS`, `.github/labels.json`, `.github/rulesets/main.json`, `scripts/github/` and `docs/wiki/`.
- **Changes:**
  - The four areas everywhere, the pull request template's list included: `area: 1 document AI and integration`, `area: 2 order workflows and approvals`, `area: 3 checks, tracker and insights`, `area: 4 controls and monitoring`, and `area: team`.
  - The pull request template's UI checklist asks for strings in the locale files, with no second language, like the Definition of Done.
  - Blank issues stay off, and the issue forms' contact links point to this repository.
  - `docs/agile/backlog.md` and the wiki's sprint calendar are generated from `backlog.mjs`, as before.
  - The sprint calendar starts on Monday 26 Oct 2026, with Sprint _n_ in module Week _n_ + 1.
  - The board is **OrderPilot delivery**.
  - `CODEOWNERS` keeps its placeholders until T-1.
  - `rulesets/main.json` mirrors the live ruleset after step 0, and after every later change to it.
  - `backlog.mjs` holds only this prompt's backlog: epic P (section 5), the area-base stories under their epics (section 6), the team stories (section 7), and epics A to G with nothing else in them yet. Prompt 002 writes the rest of their stories from the owners' planning notes at the Sprint 2 planning.
  - The wiki's Getting started page says what works so far.
- **After the merge, run the scripts:**
  - the labels;
  - the milestones `Sprint 01 (W2)` to `Sprint 18 (W19)`;
  - the board, with its Status, Sprint, Estimate and Area fields and its views;
  - the backlog, adopting step 0's two issues.

  Then publish the wiki. If the token lacks the project scope, ask Richie to run `gh auth refresh -s project`. Ask him to group the Backlog view by Sprint, which the API cannot do.

**P-3 The problem and the questions** (`docs/problem-and-questions`)

- **From:** `docs/problem-statement.md`, which is already #11's (fix its links), and the section of `docs/data-formats.md` on trying a client's sample.
- **New, for #11 only,** from the decisions in section 1:
  - `docs/assumptions.md`;
  - `docs/client/questions-for-client.md`: the three items to ask for first, then the questions in priority order;
  - `docs/data-formats.md`: the assumed formats of POs, PIs, invoices, packing lists, AWB/BL and Navision exports, each to confirm;
  - `docs/requirements-traceability.md`: M1 to M6 → planned features → where → evidence, mostly "planned" for now;
  - `docs/agile/hero-journey.md`: the sales-pilot demo story, and E2E #1 to #4 from prompt 007;
  - starting points for the team's own work: `docs/design-thinking/` (the method, and the role table from prompt 007, point 10, to start the personas; journeys, how might we, hypotheses and success metrics are left for T-6), and `docs/grs/grs-by-design.md` (its structure, with prompt 007's GRS points; the rest is left for T-7).

**P-4 The four areas** (`docs/areas`)

- **From:** `docs/team/module-ownership.md`, and the shape of the earlier area guides.
- **New:**
  - four guides: `docs/team/area-1-document-ai-and-integration.md`, `area-2-order-workflows-and-approvals.md`, `area-3-checks-tracker-and-insights.md` and `area-4-controls-security-and-monitoring.md`. Each covers its area's scope and planned paths, the contracts between the areas (prompt 007, point 4), what its owner explains at the Week 7 interview, and two sections that its base stories fill in: "What the base gives you" and "What's yours to build";
  - `module-ownership.md`: the owners (Richie, Azri, Iok Teck and Angelyn), the paths each area owns, the shared files, and the backup owners as TBD until T-1.

**P-5 Monorepo and tooling** (`chore/monorepo-tooling`)

- **From:**
  - the root `package.json`, with only the scripts that work so far, and `pnpm-workspace.yaml`;
  - `packages/tsconfig`, `packages/eslint-config` and `eslint.config.js`;
  - `.prettierrc.json`, `.prettierignore`, `commitlint.config.js`, `.husky/` and the lint-staged settings;
  - `scripts/check-licence-key.mjs`, `scripts/check-samples.mjs` and `samples/README.md`;
  - `.github/dependabot.yml`.
- **Changes:**
  - `@orderpilot/*` names.
  - The supply-chain settings stay (exact pins, `minimumReleaseAge`, reviewed `allowBuilds`, and overrides and ignored advisories, each with a reason and a review date), but only the entries for what is installed now.
  - A fresh `pnpm-lock.yaml`.
- **ADRs:** the earlier 0003 (pnpm monorepo) and 0004 (TypeScript and ESM).

**P-6 The verify pipeline** (`ci/verify`)

- **From:**
  - the `verify` job of `.github/workflows/ci.yml`, with only the steps that apply yet: the samples history check, install, audit, format, lint, typecheck, test and build. Later stories add their own steps;
  - `docs/agile/test-plan.md`, with its failure and edge-case matrix seeded with #11's cases (from prompt 007 and the client questions), each marked "planned" with the story that will cover it.
- **Check it adds:** **Lint, typecheck, test, build**.
- **ADR:** the earlier 0012 (testing strategy).

**P-7 Shared contracts** (`feat/platform-shared-contracts`)

- **From:** `packages/shared`: `api/` (the envelope and the error codes), `auth/` (roles, permissions, session and user reference), `audit/` and `ai/usage`, with their specs.
- **Changes:**
  - Spectra's nine roles: `SYSTEM_ADMIN`, `PRODUCT_MANAGER`, `APPROVER`, `SUPPORT`, `WAREHOUSE`, `FINANCE`, `LOGISTICS`, `MANAGEMENT` and `AUDITOR`.
  - Only the permissions the platform checks so far (users, audit, AI usage and connectors). Each area adds its own in its stories, and area 4 owns the matrix.
  - Only the error codes in use.
- **ADR:** the earlier 0009 (shared zod contracts).

**P-8 The API shell** (`feat/platform-api-shell`)

- **From:**
  - `apps/api`: `main.ts`, `app.module.ts`, `config/`, `bootstrap/` (helmet with a strict CSP, the CORS allow-list, rate limiting and Swagger), `infrastructure/logging`, `common/errors`, `common/filters`, `common/pipes`, `common/http` and `modules/health`;
  - `nest-cli.json`, the tsconfigs and `vitest.config.ts`;
  - `docs/architecture/README.md` and `patterns.md`, with only the patterns that exist so far.
- **Changes:**
  - "OrderPilot API". The env schema holds only what the API reads now.
  - **One root `.env` is enough** for the API, Prisma, the seed and the tests: load `apps/api/.env`, then the root `.env`, never override what the shell, CI or Docker set, and skip missing files quietly.
- **ADRs:** the earlier 0006 (NestJS layered modules), and the logging part of 0016 (observability baseline).

**P-9 Database, Redis and the local stack** (`feat/platform-database`)

- **From:**
  - `prisma.config.ts` and `prisma/schema.prisma`, with only `User`, `RefreshToken`, `RolePermission` and `AuditEvent`, plus the append-only audit trigger;
  - `infrastructure/prisma`, `infrastructure/redis` and `infrastructure/queues`;
  - `infrastructure/audit`: the hash-chained writer and its verification;
  - `test/support`: the test app, global setup, test environment and data reset;
  - `docker-compose.yml`, with PostgreSQL and Redis only, and `.env.example`.
- **Changes:**
  - The database and its user are `orderpilot`; queues only for what exists.
  - **Ports follow `POSTGRES_PORT` and `REDIS_PORT` everywhere:** in `DATABASE_URL`, `REDIS_URL` and the test URLs (for example with dotenv-expand), so changing one line moves them all.
  - The Getting started page, `CONTRIBUTING.md` and `AGENTS.md` say `cp .env.example .env`. Add a short troubleshooting note on "port already in use", and on "role does not exist", which means another PostgreSQL answered.
  - Test it from a clean clone with nothing loaded in the shell: once on the default ports, once with `POSTGRES_PORT=5433`.
- **ADR:** the earlier 0007 (Prisma and PostgreSQL).

### Sprint 2: sign in, the shell, the full pipeline and area 1's base

**P-10 Sign-in and sessions** (`feat/platform-auth`)

- **From:** `modules/auth`, `modules/users`, `common/guards` (auth, CSRF and permissions), `common/decorators`, the users and access seeds, and the auth, users and audit integration tests.
- **Changes:**
  - The demo sign-in offers Spectra's roles, with synthetic names.
  - Users carry no fields from earlier domains.
  - Every sign-in and change is audited.
  - The permissions guard calls the role-permission matrix, which area 4 owns.
- **ADR:** the earlier 0010 (sessions and RBAC). Masking comes with F-1.

**P-11 The web shell** (`feat/platform-web-shell`)

- **From:**
  - `apps/web`'s base: Vite, React, TypeScript, Tailwind, the tokens in `styles/`, and only the shadcn primitives in use;
  - `src/app/`: the layouts, router, route guards, session, providers and preferences, and the shell (sidebar, top bar, breadcrumbs, command palette, and the theme, user, role and notifications menus);
  - `src/lib/`, `src/hooks/`, `src/test/` and the i18n framework;
  - `public/`: the theme script, and a new OrderPilot favicon;
  - the login page (the sign-in form and the demo role picker, without the 3D teaser) and the settings page;
  - `scripts/check-bundle-budget.mjs`.
- **Changes:** OrderPilot's navigation, with "planned" pages for the areas; English strings only.
- **Check:** the bundle budget step joins the verify job.
- **ADRs:** the earlier 0005 (web stack), 0015 (i18n and fonts, now English first) and 0018 (CSP and inline styles).

**P-12 Common components** (`feat/platform-web-components`)

- **From:** `src/components/common/` with its tests: the data table, the page header, every state, the mock, synthetic-data, status and classification badges, the masked value, permission denied, the planned page and the rest.

**P-13 Docker images** (`ci/docker`)

- **From:**
  - `infra/docker/`: the API and web images, nginx with its security headers, the entrypoint and the samples override;
  - `.dockerignore`, and the `api` and `web` services in `docker-compose.yml`;
  - the CI `docker` job with Trivy, and `.github/workflows/security.yml`.
- **Checks it adds:** **Docker images** and **IaC and Dockerfile scan**.
- **ADR:** the earlier 0014 (Docker and AWS).

**P-14 Code scanning** (`ci/code-scanning`)

- **From:** `codeql.yml` and its config, `dependency-review.yml`, `scorecard.yml` and `docs/security/security-testing.md`.
- **Checks it adds:**
  - **Analyze (javascript-typescript)**, **Analyze (actions)** and **Dependency review**;
  - the code-scanning rule, with CodeQL alerts blocking at errors and security alerts at high or higher.
- Triage the first findings, with a reason for each dismissal.

**P-15 End-to-end smoke** (`test/e2e-smoke`)

- **From:** the Playwright config, `e2e/support/` (axe, the demo session and the layout helpers), and the CI `e2e` job.
- **New:** a smoke test that signs in as each role, opens the shell and signs out, with axe (WCAG 2.2 AA) on every page.
- **Check it adds:** **End-to-end smoke**. The ruleset now matches the earlier one again.

**P-16 Diagrams as code** (`docs/diagrams`)

- **From:** `scripts/build-diagrams.mjs`, the diagrams README and `sources.json`, and `diagrams:check` in CI.
- **New, for #11 only,** from the decisions in section 1: the system context, the containers, the sales flow and the local deployment.

**P-17 Events, queues and live updates** (`feat/platform-events`)

- **From:** `infrastructure/events` (the domain event bus and the realtime SSE stream), the event and realtime contracts in `packages/shared`, and the web realtime client.
- **Changes:** only the platform's events for now; each area adds its own.
- **ADR:** the earlier 0008 (jobs, events and realtime).

**P-18 The AI gateway** (`feat/area1-ai-gateway`)

- **From:** `infrastructure/llm` (the gateway, the mock, Bedrock and OpenAI providers, the usage tracker and the token estimate), the `AiUsageRecord` model, and the AI usage contracts.
- **Changes:**
  - The mock model is `orderpilot-mock-1`. `mock` stays the default, so CI and demos need no key.
  - Add OpenAI-compatible settings (a base URL, a key and a model), so that Groq, Gemini's OpenAI-compatible endpoint, OpenRouter, NVIDIA NIM or a local Ollama work by configuration alone.
  - Keys live only in the root `.env`.
- **ADR:** the earlier 0011 (the AI gateway and the human in the loop).

**P-19 Mock Navision** (`feat/area1-mock-navision`)

- **New for OrderPilot,** built on the generic skeleton of the earlier mock services: the app, config, auth, envelope, errors and logger, and `infra/docker/mock-service.Dockerfile`.
  - An OData-style API for items, customers, vendors, price lists and stock levels.
  - A `packages/synthetic-data` package, with the earlier seeded random generator and date helpers, and new synthetic items, customers, vendors and stock.
  - Its tests, its compose service, and a new `docs/api/mock-systems.md`.
- **ADR:** the earlier 0013 (mock external systems).

**P-20 The connector framework and the Navision adapter** (`feat/area1-connectors`)

- **From:**
  - the generic parts of `modules/connectors`: the `SystemConnector` interface, the factory, the health probe, the retry policy, the HTTP JSON client, data minimisation, the offline connector, and the controller, service and repository;
  - the `Connector` model and the web connector list.
- **Changes:** the interface fetches named record kinds (items, customers, vendors, price lists, stock levels and mail messages) instead of one fixed record type.
- **New:** the Navision adapter against P-19's mock, so a stock lookup works end to end.
- **ADR:** the earlier 0002 (hub and spoke).

**P-21 React Bits and the design docs** (`feat/platform-design-system`, by the end of Sprint 2, so the UI prototype in Sprint 3 can use it)

- **From:**
  - `components.json` and its registries, `.mcp.json` and `.claude/skills/reactbits/`;
  - the React Bits items OrderPilot's screens use;
  - `docs/design/design-system.md` and `reactbits-usage.md`;
  - the earlier ADR 0017 on component registries.
- Ask Richie again whether React Bits Pro code may sit in a public repository, and whether to add a licence file.

### Sprint 3: the last piece of the base

**P-22 Slides as code** (`docs/slides`, for the Week 5 proposal in Sprint 4): `scripts/build-slides.mjs`, the theme and the README, a new OrderPilot deck, and `slides:check` in CI.

### Area 1, after the base (Richie's own area, in the sprint that needs each one)

- **P-23 File import** (when Navision exports are first imported):
  - the staged import store, the staged rows, and the file import service and controller;
  - safe file reading: size and zip-bomb limits, encoding detection, and refusing columns such as full bank account numbers;
  - only the UTF-8, UTF-8 with BOM, Windows-1252 and ambiguous fixtures;
  - the import screens, and the date and encoding rules of `docs/architecture/data-formats.md`, rewritten for Spectra's documents.
- **P-24 The mapping engine** (with P-23 or the layout-mapping story):
  - the engine and the transformer registry, with only these transforms: copy, constant, date, number, value map, lowercase, last four digits and rules;
  - mapping configs that keep their versions;
  - re-typed to OrderPilot's canonical targets: order headers and lines, customers, vendors and items.
- **P-25 The AI mapping assistant** (with the layout-mapping story): the assistant and its prompt, with a vocabulary of OrderPilot's fields. A person approves every proposal.
- **P-26 The template engine** (with the PI draft, Should item 2): new for OrderPilot, because the earlier base only planned it in tests. A template renderer and an Excel export as a platform service, for area 2's documents and area 3's reports.
- **P-27 Signed webhooks and the mock mailbox** (with email intake, Should item 5):
  - the HMAC signature check, the idempotent store of inbound events and the outbox processor, renamed for a mailbox's "new mail" webhook;
  - a new `mock-mailbox` service on the same skeleton as P-19.

## 6. The area bases (Sprint 2, after P-10 to P-12)

You build these too, each as the first stories of its epic, and then hand each area to its owner.

- Each base brings what the earlier base had for that area, adapted, plus a clear starting point. #11's own business rules stay with the owner.
- Where the earlier base only planned something in tests (`it.todo`), the tests that apply to #11 come across, rewritten in #11's terms, as the owner's to-do list.
- When an area's base is merged, fill in its guide's "What the base gives you" and "What's yours to build", and tell Richie, so he can hand it over.

**C-1 The workflow engine** (area 2, Azri)

- **From:**
  - `packages/shared/src/workflows/`;
  - the generic parts of `modules/workflows`: Azri's state machine (rule 8), the service, the repository and the controllers;
  - the workflow and notification models;
  - the web workflows feature: the board, the task list, the instance page, the SLA badge and the approval chain.
- **Not built in the earlier base:** step retries, SLA reminders and notifications exist only as planned tests, so they come across as Azri's to-do list.
- **Left to Azri:** Spectra's sales and purchase flow definitions, the SPR rules and the payment gate. No earlier workflow definition comes across; the tests use a neutral two-step sample.

**D-1 A starting point for the checks and the tracker** (area 3, Iok Teck)

- **New for OrderPilot,** because the earlier base has nothing for this area:
  - the `checks` module, with a check-rule Strategy interface;
  - the check result and exception contracts in `packages/shared`, and an empty exceptions model;
  - the `order-tracker` web feature as a planned page;
  - to-do tests for the MVP's mismatch: a packing list whose quantity differs from the PO.
- **Left to Iok Teck:** every check and its tolerance, the exceptions queue, the tracker and the KPIs.

**F-1 Access policy and masking** (area 4, Angelyn)

- **From:**
  - `modules/access`: the access-policy service and repository, the field masker, and the destination policy, which becomes the rules on what data may go to an AI service;
  - the field-masking interceptor;
  - `packages/shared/src/governance/`: classification, the masking policy and masked values;
  - the `DataClassification` model, and the web access and classification pages. Most of the administration exists only as planned tests.
- **Left to Angelyn:** the masking rules for bank details and prices by role, the approval limits, segregation of duties and the bank-detail control. The base's tests use a neutral sample rule.

**F-2 The audit trail viewer** (area 4, Angelyn)

- **From:** `modules/audit` (the trail service, repository and controller, and the changed fields), and the web audit log page with its chain check.

**F-3 Retention** (area 4, Angelyn)

- **From:** the retention policy model and page.

**G-1 Observability, clickstream and AI usage** (area 4, Angelyn)

- **From:** `modules/analytics` (the clickstream intake works; the dashboards run on mock data, with planned tests), the clickstream model, the web analytics pages, and the tracker in `src/lib/`.
- **Left to Angelyn:** the real dashboards, in Weeks 14 to 16 (Sprints 13 to 15).

## 7. Team stories

Create these too:

- **T-1 Owners, backups and reviews** (Sprint 1):
  1. Ask Richie for each teammate's GitHub username.
  2. Invite them with Write access, and add them to the board.
  3. Fill `CODEOWNERS`: each area's paths go to its owner and Richie, and everything else to Richie.
  4. Agree a backup owner for each area.
  5. Then propose one approving review and code-owner review in the ruleset, and apply them only on Richie's yes.
- **T-2** The briefing call with Spectra (Sprint 2).
- **T-3** The project plan (Sprint 2), including prompt 002, which writes the rest of epics A to G's stories from the owners' planning notes.
- **T-4** The UI prototype across the four areas (Sprint 3).
- **T-5** The proposal deck and presentation (Sprint 4).
- **T-6** Design thinking: personas, journeys, how might we, and success metrics (Sprints 2 and 3).
- **T-7** GRS by design (Sprints 3 and 4).
- **T-8** Preparing for the mock interview (Sprints 5 and 6).

## 8. What never comes across

- Anything that serves another problem statement:
  - its domain modules and screens;
  - its mock systems, their connectors and its sync pipelines;
  - its seeds, fixtures, test data, end-to-end tests, translations and synthetic data;
  - its screenshots, diagrams, slides, ADRs, prompts, AI usage rows, backlog, build report and history.
- The 3D integration map and its asset scripts, unless Richie later asks for them as a story of their own.
- The earlier lockfile: generate a fresh one.

## 9. Practices to keep

Tick each one in every report, and say where it lives.

- **Process:**
  - stories under epics, with acceptance criteria;
  - one task per branch and pull request, Conventional Commits, the pull request template, and merge commits;
  - reviews within one working day, with threads resolved before merging;
  - the board's columns, with a work-in-progress limit of two per person;
  - one-week sprints as milestones, with planning, a daily written stand-up, refinement, a review, and a retrospective recorded in the milestone;
  - the Definitions of Ready and Done, and the labels (type, area, MoSCoW priority, module requirement M1 to M6, status and dependencies);
  - issue forms for stories, tasks, epics, spikes and bugs, with blank issues off;
  - the backlog, board, labels and milestones as code, and the wiki published from `docs/wiki/`;
  - code owners and a backup owner for each area, and the ruleset mirrored in Git.
- **Quality and security:**
  - pinned versions and the supply-chain settings;
  - the type-aware lint with no warnings, formatting, and the commit, pre-commit and pre-push hooks with the licence-key and samples guards;
  - the layered back end and its documented patterns, one error envelope with a trace id, and typed config with every variable in `.env.example`;
  - helmet, CORS, rate limiting, argon2, httpOnly cookies with refresh rotation, CSRF, and RBAC with field masking;
  - an audit event in the hash chain for every write, and signed webhooks;
  - pagination, and an index for every query;
  - the budgets: initial JS 250 KB gzip or less, LCP under 2.5 s, and Lighthouse 90 or more;
  - unit tests (80% or more on domain logic), API integration tests with 401 and 403 cases, component tests, and the Playwright smoke test with axe;
  - the seven checks, Dependabot, CodeQL, dependency review, Trivy, the IaC scan and Scorecard, with least-privilege workflow permissions;
  - coverage reports, Lighthouse at each release, and a DAST scan (OWASP ZAP baseline) once the demo is deployed.
- **Releases:** a feature freeze in the sprint before each assessment, then a tag on `main`: `v0.1-proposal` (Week 5), `v0.2-technical-review` (Week 13) and `v1.0-final` (Week 18).
- **UI:**
  - design tokens only, in light and dark themes;
  - every state: loading, empty, error with retry and trace id, partial, success and permission denied;
  - WCAG 2.2 AA and reduced motion;
  - GRS visible in the UI, with "Mock", "Mock AI" and "Synthetic demo data" labels;
  - the banned list in `CLAUDE.md`.
- **Docs and AI use:**
  - ADRs, the traceability matrix and the test plan;
  - data formats, assumptions and client questions;
  - diagrams as code;
  - the AI usage log, with prompts in `docs/ai/prompts/` (teammates use `areaN-NNN-…`);
  - `AGENTS.md` for every tool, and no AI attribution;
  - a short section per prompt in a new `docs/BUILD_REPORT.md`.
- **Settings outside Git:** step 0's settings, the board's grouping and the collaborators.

## 10. Reports

At the end of each sprint, when the base is done, and whenever you are blocked, report:

- each story's pull request and its checks, and anything you left out of it, with the reason;
- the practices in section 9, ticked, with the story that brings any that are missing;
- which areas are ready to hand over;
- what only Richie can do by hand;
- your questions.

After a sprint report, carry on unless Richie says to stop. After the base is done, or when blocked, wait for Richie.
