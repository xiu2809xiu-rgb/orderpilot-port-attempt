// The product backlog as data: sprints, epics and user stories with acceptance
// criteria. `seed-backlog.mjs` creates them in GitHub (milestones, issues,
// sub-issues) and `render-backlog.mjs` writes docs/agile/backlog.md from it,
// so the plan is reviewed in a pull request before anything is created.
// Keys are never reused: GitHub issues are matched by key, so a story whose
// title changes keeps its issue and history.

const AREA = {
  1: "area: 1 document AI and integration",
  2: "area: 2 order workflows and approvals",
  3: "area: 3 checks, tracker and insights",
  4: "area: 4 controls and monitoring",
  team: "area: team",
};

/** Sprint n runs Monday to Sunday of module week n + 1, from Sprint 1 = 26 Oct 2026 (W2). */
export const SPRINTS = [
  {
    number: 1,
    goal: "The team's way of working, and an API that runs: ground rules, GitHub as code, the problem and the areas, the monorepo, CI, the shared contracts, the API shell and the database; owners and reviews",
  },
  {
    number: 2,
    goal: "Sign in, the shell, the full pipeline and area 1's base; the area bases for areas 2 to 4; the briefing call with Spectra and the project plan",
  },
  {
    number: 3,
    goal: "The last piece of the base (slides as code); the UI prototype across the four areas; design thinking and GRS by design; feature freeze for the proposal",
  },
  { number: 4, goal: "Proposal presentation (25%); the release tagged v0.1-proposal" },
  { number: 5, goal: "Owners start their core logic; preparing for the mock interview" },
  { number: 6, goal: "Mock job interview (15%): each member explains their own code" },
  {
    number: 7,
    goal: "AI-assisted coding: the sales pilot's Must items end to end; file import and the mapping engine; the purchase flow (phase 2) starts",
  },
  {
    number: 8,
    goal: "AI-assisted coding: the AI mapping assistant; the payment gate (Should 1)",
  },
  {
    number: 9,
    goal: "AI-assisted coding: the PI draft on the template engine (Should 2); full invoice and packing-list matching (Should 3)",
  },
  {
    number: 10,
    goal: "AI-assisted coding: AWB/BL and import-permit follow-ups (Should 4); email intake and drafted notifications (Should 5)",
  },
  {
    number: 11,
    goal: "AI-assisted coding: more matching rules (Should 6); the purchase flow end to end; feature freeze for the technical review",
  },
  { number: 12, goal: "Technical review (25%); the release tagged v0.2-technical-review" },
  { number: 13, goal: "Observability: tracing, metrics and dashboards" },
  { number: 14, goal: "Clickstream analytics" },
  { number: 15, goal: "AI token usage and cost tracking" },
  {
    number: 16,
    goal: "Deployment hardening, a DAST scan (OWASP ZAP baseline) and rehearsal; feature freeze for the final",
  },
  { number: 17, goal: "Final presentation (35%); the release tagged v1.0-final" },
  { number: 18, goal: "Client check-in and handover" },
];

const PLANNED_BY_002 =
  "Its stories are written from the owners' planning notes at the Sprint 2 planning (prompt 002, story T-3).";

export const EPICS = [
  {
    key: "P",
    title: "Platform base",
    area: AREA[1],
    labels: ["req: M4 best practices", "req: M5 team Git workflow"],
    goal: "The team's way of working and the platform every area builds on, ported story by story from the team's earlier base and adapted for OrderPilot (ADR 0002), so that each owner writes their area's logic instead of plumbing.",
    stories: [
      {
        key: "P-1",
        title: "Ground rules",
        sprint: 1,
        points: 3,
        priority: "must",
        branch: "docs/ground-rules",
        labels: ["req: M3 AI-assisted coding"],
        story:
          "As a teammate, or the AI assistant working for one, I want the team's ground rules in the repository from its first commit, so that we all work the same way and nothing from another problem statement comes in.",
        acceptance: [
          "Given a fresh clone, when a teammate reads the README, `CONTRIBUTING.md`, `SECURITY.md`, `AGENTS.md` and `CLAUDE.md`, then they describe OrderPilot and this repository only.",
          "Given a commit or pull request made with Claude Code, when it is created, then `.claude/settings.json` keeps AI attribution off.",
          "Given ADR 0002, when a reviewer reads it, then it explains why this repository is clean and how the earlier base is ported story by story from commit `f6bb016`.",
          "Given a story, when it is planned, then the working agreement and the Definitions of Ready and Done say how: one-week sprints from Sprint 1 in module Week 2, and strings in the locale files with no second language.",
          "Given AI-assisted work, when it merges, then the AI usage log has its row in its area's table.",
        ],
      },
      {
        key: "P-2",
        title: "GitHub as code",
        sprint: 1,
        points: 5,
        priority: "must",
        branch: "chore/github-process",
        story:
          "As the team, we want our labels, milestones, issue forms, pull request template, ruleset, backlog, board and wiki kept as code, so that our process is reviewed in pull requests and can be re-run safely.",
        acceptance: [
          "Given `.github/labels.json`, when `sync-labels.mjs` runs, then GitHub has those labels, with the four area labels and `area: team`.",
          "Given `backlog.mjs`, when `seed-backlog.mjs --project` runs, then the milestones `Sprint 01 (W2)` to `Sprint 18 (W19)`, the epics and their stories exist, each story a sub-issue of its epic, and the P-1 and P-2 issues are adopted, not duplicated.",
          "Given the board script, when it runs, then the **OrderPilot delivery** board has its Status, Sprint, Estimate and Area fields and its views.",
          "Given `.github/rulesets/main.json`, when it is compared with the live ruleset on `main`, then they match.",
          "Given `docs/wiki/`, when `publish-wiki.mjs` runs, then the wiki's Getting started page says what works so far.",
        ],
      },
      {
        key: "P-3",
        title: "The problem and the questions",
        sprint: 1,
        points: 5,
        priority: "must",
        branch: "docs/problem-and-questions",
        labels: ["req: M1 design thinking", "req: M2 GRS by design"],
        story:
          "As the team, we want #11's problem, our assumptions, the questions for Spectra, the assumed document formats and the traceability matrix written down, so that every feature traces back to Spectra's need and the briefing call starts from our questions in priority order.",
        acceptance: [
          "Given `docs/problem-statement.md`, when a reviewer follows its links, then every link resolves in this repository.",
          "Given `docs/client/questions-for-client.md`, when it goes to Spectra, then it leads with the three items to ask for first, then the questions in priority order.",
          "Given `docs/data-formats.md`, when a document type is looked up, then the assumed format of POs, PIs, invoices, packing lists, AWB/BL and Navision exports is there, marked to confirm, with how to try a client's sample without committing it.",
          "Given `docs/requirements-traceability.md`, when a module requirement M1 to M6 is looked up, then its planned features, where they live and their evidence are listed, mostly as planned.",
          "Given `docs/agile/hero-journey.md`, when the demo is planned, then the sales-pilot story and E2E #1 to #4 are there.",
          "Given `docs/design-thinking/` and `docs/grs/grs-by-design.md`, when T-6 and T-7 start, then the method, the role table and the GRS structure are there to build on.",
        ],
      },
      {
        key: "P-4",
        title: "The four areas",
        sprint: 1,
        points: 3,
        priority: "must",
        branch: "docs/areas",
        story:
          "As an area owner, I want my area's scope, paths, contracts and interview points written down, so that I know what is mine and how it connects to the other areas.",
        acceptance: [
          "Given `docs/team/module-ownership.md`, when an owner looks up a path, then it names the area that owns it, and the shared files and the backup owners (TBD until T-1) are listed.",
          'Given an area guide, when its owner reads it, then it covers the scope and planned paths, the contracts between the areas, what to explain at the Week 7 interview, and the sections "What the base gives you" and "What\'s yours to build".',
          "Given two guides that describe the same boundary, when they are compared, then they agree: order status only in area 2, the checks and exceptions in area 3, the authorisation policy in area 4 and the AI pipeline in area 1.",
        ],
      },
      {
        key: "P-5",
        title: "Monorepo and tooling",
        sprint: 1,
        points: 5,
        priority: "must",
        branch: "chore/monorepo-tooling",
        story:
          "As a developer, I want one pnpm workspace with shared TypeScript and lint settings and commit hooks, so that every package is built and checked the same way from its first line.",
        acceptance: [
          "Given a fresh clone, when I run `pnpm install`, then it installs from a fresh lockfile within the supply-chain policy: exact pins, `minimumReleaseAge` and reviewed `allowBuilds`, each override and ignored advisory with a reason and a review date.",
          "Given `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`, when I run them, then each passes.",
          "Given a commit, when its message is not a Conventional Commit, or a staged file holds the React Bits licence key or a client sample, then the commit is refused.",
          "Given Dependabot, when an update is due, then it opens a pull request after its cooldown.",
        ],
      },
      {
        key: "P-6",
        title: "The verify pipeline",
        sprint: 1,
        points: 3,
        priority: "must",
        branch: "ci/verify",
        story:
          "As the team, we want every pull request checked in CI, so that `main` always installs, lints, type-checks, tests and builds.",
        acceptance: [
          "Given a pull request, when CI runs, then the job **Lint, typecheck, test, build** runs the samples history check, install, audit, format, lint, typecheck, test and build, and it is a required check on `main`.",
          "Given `docs/agile/test-plan.md`, when one of #11's failure or edge cases is looked up, then it is in the matrix, marked planned with the story that will cover it.",
          "Given the workflow, when it runs, then its token is read-only.",
        ],
      },
      {
        key: "P-7",
        title: "Shared contracts",
        sprint: 1,
        points: 3,
        priority: "must",
        branch: "feat/platform-shared-contracts",
        story:
          "As a developer in any area, I want the API envelope, the error codes, the roles, permissions and session, and the audit and AI-usage contracts in one shared package, so that the web app and the API agree on them by type.",
        acceptance: [
          "Given `@orderpilot/shared`, when the web app or the API names a role, then it is one of Spectra's nine roles.",
          "Given the permissions, when the platform checks one, then it is about users, audit, AI usage or connectors; each area adds its own in its stories.",
          "Given an API error, when it is returned, then it uses the one envelope `{ error: { code, message, details, traceId } }` with a code that is in use.",
          "Given the contracts' specs, when `pnpm test` runs, then they pass.",
        ],
      },
      {
        key: "P-8",
        title: "The API shell",
        sprint: 1,
        points: 5,
        priority: "must",
        branch: "feat/platform-api-shell",
        story:
          "As a developer, I want a NestJS API shell with typed config, structured logs, one error envelope, security headers and health checks, so that each area adds its modules to a secure and observable base.",
        acceptance: [
          'Given the API, when it starts, then it answers `/health` and `/health/live`, and serves Swagger at `/api/docs` as "OrderPilot API".',
          "Given any response, when it leaves the API, then helmet sets a strict CSP and the other security headers, CORS allows only the allow-list, and rate limiting applies.",
          "Given an error, when it is thrown, then the global filter returns the error envelope with a trace id, and the log line carries the same trace id.",
          "Given the env files, when the API, Prisma, the seed or the tests start, then they load `apps/api/.env` and then the root `.env`, never override what the shell, CI or Docker set, and skip a missing file quietly.",
          "Given `docs/architecture/patterns.md`, when a reader looks up a pattern, then it lists only the patterns that exist so far, with file references.",
        ],
      },
      {
        key: "P-9",
        title: "Database, Redis and the local stack",
        sprint: 1,
        points: 5,
        priority: "must",
        branch: "feat/platform-database",
        labels: ["req: M6 deploy and monitor"],
        story:
          "As a developer, I want PostgreSQL, Redis, Prisma, the audit trail and the queues running locally, so that the API has a database and every write is audited from the start.",
        acceptance: [
          "Given `docker compose up`, when it runs, then PostgreSQL and Redis start healthy, with the database and its user named `orderpilot`.",
          "Given `POSTGRES_PORT=5433` in `.env`, when the stack, Prisma, the API and the tests start, then they all use port 5433, because `DATABASE_URL`, `REDIS_URL` and the test URLs follow the port variables.",
          "Given the schema, when it is migrated, then `User`, `RefreshToken`, `RolePermission` and `AuditEvent` exist, and the database refuses an update or delete of an audit event.",
          "Given audit events, when the chain is verified, then each event's hash links to the one before it, and a changed event breaks the chain.",
          "Given a clean clone with nothing loaded in the shell, when I follow the Getting started page (`cp .env.example .env`), then the stack works on the default ports and with `POSTGRES_PORT=5433`.",
        ],
      },
      {
        key: "P-10",
        title: "Sign-in and sessions",
        sprint: 2,
        points: 8,
        priority: "must",
        branch: "feat/platform-auth",
        labels: ["req: M2 GRS by design"],
        story:
          "As a member of Spectra's staff, I want to sign in and get only my role's rights, enforced on the server, so that nobody sees or does more than their job needs.",
        acceptance: [
          "Given the demo sign-in, when I pick one of Spectra's nine roles, then I am signed in as its synthetic user.",
          "Given a wrong password, when I sign in, then the reply takes as long as for an unknown email and reveals neither.",
          "Given an endpoint, when a role without its permission calls it directly, then the API answers 403, and an unauthenticated call gets 401.",
          "Given a sign-in, a sign-out, a refresh or a change to a user, when it happens, then an audit event records who, what and when.",
          "Given the permissions guard, when it decides, then it asks the role-permission matrix that area 4 owns.",
        ],
      },
      {
        key: "P-11",
        title: "The web shell",
        sprint: 2,
        points: 8,
        priority: "must",
        branch: "feat/platform-web-shell",
        labels: ["req: M1 design thinking"],
        story:
          "As a member of Spectra's staff, I want one calm, accessible app to sign in to and move between the areas, so that every screen I use feels like one product.",
        acceptance: [
          "Given the web app, when I sign in, then the shell shows OrderPilot's navigation with planned pages for the areas, the breadcrumbs, the command palette, and the theme, user, role and notifications menus.",
          "Given any text on screen, when it renders, then it comes from the English locale files.",
          "Given the light or dark theme, when I choose it, then it applies before the first paint and is remembered.",
          "Given a production build, when CI runs, then the bundle budget step fails if the initial JS is over 250 KB gzip.",
        ],
      },
      {
        key: "P-12",
        title: "Common components",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/platform-web-components",
        labels: ["req: M2 GRS by design"],
        story:
          "As a developer in any area, I want the shared components for tables, headers, every state, badges, masked values and planned pages, so that each screen handles every state in the same way.",
        acceptance: [
          "Given a data view, when it is loading, empty, failed, partial or refused, then a shared component shows that state, with a retry and the trace id on an error.",
          'Given mock or synthetic data, when it is shown, then a "Mock", "Mock AI" or "Synthetic demo data" badge says so.',
          "Given a masked value, when it is shown, then it says why it is hidden.",
          "Given the components, when `pnpm test` runs, then each has its component test.",
        ],
      },
      {
        key: "P-13",
        title: "Docker images",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "ci/docker",
        labels: ["req: M6 deploy and monitor"],
        story:
          "As the team, we want production images for the API and the web app, built and scanned in CI, so that the demo runs anywhere the same way and ships no known vulnerability.",
        acceptance: [
          "Given `docker compose up --build`, when it runs, then the API and web images build in stages, run as a non-root user and report healthy, and nginx sets the security headers.",
          "Given a pull request, when CI runs, then **Docker images** builds both images and scans them with Trivy, and **IaC and Dockerfile scan** checks the Dockerfiles and compose; both are required checks.",
        ],
      },
      {
        key: "P-14",
        title: "Code scanning",
        sprint: 2,
        points: 3,
        priority: "must",
        branch: "ci/code-scanning",
        story:
          "As the team, we want static analysis and dependency review on every pull request, so that a vulnerable change or package is caught before it reaches `main`.",
        acceptance: [
          "Given a pull request, when CI runs, then **Analyze (javascript-typescript)**, **Analyze (actions)** and **Dependency review** run, and all three are required checks.",
          "Given the ruleset, when a change has a CodeQL alert at error level or a security alert at high or higher, then it cannot merge.",
          "Given the first findings, when they are triaged, then each is fixed or dismissed with its reason in `docs/security/security-testing.md`.",
        ],
      },
      {
        key: "P-15",
        title: "End-to-end smoke",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "test/e2e-smoke",
        story:
          "As the team, we want a browser test that signs in as every role on the real images, so that a broken sign-in or shell is caught before it merges.",
        acceptance: [
          "Given the Docker stack, when the smoke test runs, then it signs in as each of Spectra's nine roles, opens the shell and signs out.",
          "Given each page it opens, when axe runs, then there is no WCAG 2.2 AA violation.",
          "Given a pull request, when CI runs, then **End-to-end smoke** is a required check, and the ruleset requires pull requests, the seven checks and CodeQL.",
        ],
      },
      {
        key: "P-16",
        title: "Diagrams as code",
        sprint: 2,
        points: 3,
        priority: "should",
        branch: "docs/diagrams",
        labels: ["req: M1 design thinking"],
        story:
          "As the team, we want our architecture diagrams built from text sources, so that they are reviewed in pull requests and never drift from the code.",
        acceptance: [
          "Given `docs/diagrams/`, when the build runs, then the system context, the containers, the sales flow and the local deployment render from their Mermaid sources.",
          "Given a changed source, when CI's `diagrams:check` runs, then it fails until the rendered diagram is rebuilt.",
        ],
      },
      {
        key: "P-17",
        title: "Events, queues and live updates",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/platform-events",
        story:
          "As a developer in any area, I want a domain event bus and a live stream to the browser, so that a change in one area reaches the others and the screens without polling.",
        acceptance: [
          "Given a platform event, when it is published on the domain event bus, then its subscribers receive it, and the realtime stream forwards it to signed-in browsers that may see it.",
          "Given an event, when it is typed, then its name and payload come from `packages/shared`.",
          "Given the web realtime client, when the stream drops, then it reconnects.",
        ],
      },
      {
        key: "P-18",
        title: "The AI gateway",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/area1-ai-gateway",
        labels: [
          "req: M3 AI-assisted coding",
          "req: M6 deploy and monitor",
          "req: M2 GRS by design",
        ],
        story:
          "As the owner of the AI pipeline, I want every AI call to go through one gateway that is mocked by default and costed every time, so that the demo needs no key and every call is accounted for.",
        acceptance: [
          "Given no AI key, when a feature calls the gateway, then the mock provider `orderpilot-mock-1` answers deterministically.",
          "Given OpenAI-compatible settings (a base URL, a key and a model) in the root `.env`, when the provider is `openai`, then Groq, Gemini's OpenAI-compatible endpoint, OpenRouter, NVIDIA NIM or a local Ollama work by configuration alone.",
          "Given any call, when it completes or fails, then an AI usage record stores the tokens in and out, the model, the latency, the cost estimate, the feature, the user and the outcome.",
        ],
      },
      {
        key: "P-19",
        title: "Mock Navision",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/area1-mock-navision",
        story:
          "As the team, we want a mock of Spectra's Navision with synthetic items, customers, vendors, price lists and stock, so that we build and demo the integration before we have access to the real one.",
        acceptance: [
          "Given `mock-navision`, when it is called with its service token, then it serves synthetic items, customers, vendors, price lists and stock levels through an OData-style API.",
          "Given `packages/synthetic-data`, when it generates data from a seed, then the same seed gives the same data.",
          "Given the compose stack, when it starts, then `mock-navision` runs, labelled as a mock, and `docs/api/mock-systems.md` describes it.",
        ],
      },
      {
        key: "P-20",
        title: "The connector framework and the Navision adapter",
        sprint: 2,
        points: 8,
        priority: "must",
        branch: "feat/area1-connectors",
        story:
          "As Support, I want an item's stock looked up in Navision from OrderPilot, so that I can answer a customer's PO without opening another system.",
        acceptance: [
          "Given a connector configuration, when the factory builds it, then it returns an adapter behind `SystemConnector` that fetches named record kinds: items, customers, vendors, price lists, stock levels and mail messages.",
          "Given the Navision adapter, when it looks up an item's stock in mock Navision, then the stock comes back end to end.",
          "Given a failing system, when it is called, then the retry policy backs off, the health probe reports it down, and only the minimised fields are kept.",
          'Given the web connector list, when it opens, then each connector shows its status and its "Mock" label.',
        ],
      },
      {
        key: "P-21",
        title: "React Bits and the design docs",
        sprint: 2,
        points: 3,
        priority: "must",
        branch: "feat/platform-design-system",
        labels: ["req: M1 design thinking"],
        story:
          "As a developer building a screen, I want the component registries, the React Bits items OrderPilot uses and the design-system docs, so that the UI prototype in Sprint 3 looks like one product.",
        acceptance: [
          "Given `components.json`, when an item is installed, then it comes from a listed registry, and the licence key is read only from `apps/web/.env.local`.",
          "Given each React Bits item OrderPilot uses, when it is installed, then it is adapted to the tokens, one file with its origin, and listed in `docs/design/reactbits-usage.md` with its reduced-motion behaviour.",
          "Given `docs/design/design-system.md`, when a teammate builds a screen, then the tokens, the components and the rules are there.",
        ],
      },
      {
        key: "P-22",
        title: "Slides as code",
        sprint: 3,
        points: 3,
        priority: "must",
        branch: "docs/slides",
        labels: ["req: M1 design thinking"],
        story:
          "As the team, we want the proposal deck built from text with our theme, so that it is reviewed like code and ready for Week 5.",
        acceptance: [
          "Given `docs/slides/`, when the build runs, then the OrderPilot deck exports to HTML, PDF and PPTX with its theme.",
          "Given a changed deck, when CI's `slides:check` runs, then it fails until the exports are rebuilt.",
        ],
      },
      {
        key: "P-23",
        title: "File import",
        sprint: 7,
        points: 5,
        priority: "should",
        branch: "feat/area1-file-import",
        story:
          "As Support, I want a Navision export imported safely and staged for review, so that master data arrives without re-typing and without a dangerous file getting in.",
        acceptance: [
          "Given an export, when it is imported, then it is read within the size and zip-bomb limits with its encoding detected, staged, and refused if it holds a column such as a full bank account number.",
          "Given a UTF-8, UTF-8 with BOM, Windows-1252 or ambiguous file, when it is imported, then it is read correctly, or the person is asked to choose its encoding.",
          "Given the import screens, when a file has problems, then each one is shown with its row, under the date and encoding rules of `docs/architecture/data-formats.md`, rewritten for Spectra's documents.",
        ],
      },
      {
        key: "P-24",
        title: "The mapping engine",
        sprint: 7,
        points: 5,
        priority: "should",
        branch: "feat/area1-mapping-engine",
        story:
          "As Support, I want each customer's and vendor's layout mapped onto OrderPilot's own records by configuration, so that a new layout needs no code.",
        acceptance: [
          "Given a mapping config, when it is applied, then the transforms (copy, constant, date, number, value map, lowercase, last four digits and rules) produce OrderPilot's order headers and lines, customers, vendors and items.",
          "Given a changed mapping, when it is saved, then it becomes a new version, and the earlier versions stay readable.",
        ],
      },
      {
        key: "P-25",
        title: "The AI mapping assistant",
        sprint: 8,
        points: 3,
        priority: "should",
        branch: "feat/area1-mapping-assistant",
        labels: ["req: M3 AI-assisted coding", "req: M2 GRS by design"],
        story:
          "As Support, I want the AI to propose the mapping of a new layout for me to approve, so that adding a customer's layout takes minutes and a person still decides.",
        acceptance: [
          "Given a new layout, when the assistant proposes a mapping, then it sees only headers, field shapes and codes, with a vocabulary of OrderPilot's fields.",
          "Given a proposal, when nobody has approved it, then it is never used.",
        ],
      },
      {
        key: "P-26",
        title: "The template engine",
        sprint: 9,
        points: 5,
        priority: "should",
        branch: "feat/area1-template-engine",
        story:
          "As the owners of areas 2 and 3, we want one template renderer and Excel export as a platform service, so that area 2's documents and area 3's reports are generated the same way.",
        acceptance: [
          "Given a template and an order's data, when it renders, then the document comes back, and the Excel export writes the same data.",
          "Given a PI draft in area 2 or a report in area 3, when it is generated, then it uses this service.",
        ],
      },
      {
        key: "P-27",
        title: "Signed webhooks and the mock mailbox",
        sprint: 10,
        points: 5,
        priority: "should",
        branch: "feat/area1-mailbox-webhooks",
        labels: ["req: M2 GRS by design"],
        story:
          "As Support, I want documents that arrive by email picked up safely, so that a PO sent to the mailbox starts its order without anyone forwarding it.",
        acceptance: [
          'Given a "new mail" webhook, when its HMAC signature is wrong or stale, then it is refused, and when it is replayed, then it is stored once.',
          "Given a stored inbound event, when the outbox processor runs, then it is processed once, with retries.",
          "Given `mock-mailbox`, when it starts, then it serves synthetic emails with attachments, labelled as a mock.",
        ],
      },
    ],
  },
  {
    key: "A",
    title: "Document intake and AI extraction",
    area: AREA[1],
    labels: ["req: M3 AI-assisted coding"],
    goal: `Documents arrive by email or upload; the AI classifies each one and extracts its fields through an approved mapping of its layout, each field with its confidence and a link to its source, and anything uncertain waits for a person. ${PLANNED_BY_002}`,
    stories: [],
  },
  {
    key: "B",
    title: "Master data and Navision",
    area: AREA[1],
    labels: ["req: M4 best practices"],
    goal: `Customers, vendors, items, price lists and stock are read from Navision through its adapter, each field with its source and history, and matched on Navision numbers, never on names alone; staff keep posting into Navision. ${PLANNED_BY_002}`,
    stories: [],
  },
  {
    key: "C",
    title: "Order workflows and approvals",
    area: AREA[2],
    labels: ["req: M4 best practices"],
    goal: "The sales and purchase workflows run on Azri's state machine, which alone holds each order's status, with tasks routed to Spectra's teams, SPR approval within limits, SLA reminders and escalations, generated documents and notifications.",
    stories: [
      {
        key: "C-1",
        title: "The workflow engine",
        sprint: 2,
        points: 8,
        priority: "must",
        branch: "feat/area2-workflow-engine-base",
        story:
          "As Azri, the owner of area 2, I want the workflow engine's base (the shared contracts, my state machine, the service, repository and controllers, the models and the web workflows feature), so that I can build Spectra's sales and purchase flows on it.",
        acceptance: [
          "Given a neutral two-step sample workflow, when it runs, then Azri's state machine moves it through its states as his tests specify, and the commit that brings the state machine names Azri as its co-author.",
          "Given the workflow and notification models, when they are migrated, then instances, tasks and notifications are stored, with an index for each query.",
          "Given the web workflows feature, when it opens, then the board, the task list, the instance page, the SLA badge and the approval chain render every state.",
          "Given step retries, SLA reminders and notifications, when the tests run, then they are to-do tests: Azri's list.",
        ],
      },
    ],
  },
  {
    key: "D",
    title: "Cross-document checks, the order tracker and insights",
    area: AREA[3],
    labels: ["req: M4 best practices"],
    goal: "Each order's documents are checked against each other, the order and Navision, each mismatch goes to an exceptions queue with an explanation, and one order tracker shows every order's status, owner, outstanding actions and exceptions, with Spectra's own measures as KPIs.",
    stories: [
      {
        key: "D-1",
        title: "A starting point for the checks and the tracker",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/area3-checks-base",
        story:
          "As Iok Teck, the owner of area 3, I want a checks module, its contracts and a planned tracker page to start from, so that I can build the checks, the exceptions queue and the tracker in my own way.",
        acceptance: [
          "Given the `checks` module, when a check rule is added, then it implements the check-rule Strategy interface.",
          "Given `packages/shared`, when a check result or an exception is typed, then its contract is there, with an empty exceptions model.",
          "Given the `order-tracker` web feature, when it opens, then it is a planned page.",
          "Given the MVP's mismatch (a packing list whose quantity differs from the PO), when the tests run, then its to-do tests are Iok Teck's list.",
        ],
      },
    ],
  },
  {
    key: "E",
    title: "AI assistance with a human in the loop",
    area: AREA[1],
    labels: ["req: M3 AI-assisted coding", "req: M2 GRS by design"],
    goal: `AI classifies, extracts, maps, explains and drafts; people approve. Every call goes through the AI gateway and is costed, no customer or pricing data reaches a third-party AI service without Spectra's written permission, and AI never posts, approves, releases goods or pays. ${PLANNED_BY_002}`,
    stories: [],
  },
  {
    key: "F",
    title: "Financial controls and governance",
    area: AREA[4],
    labels: ["req: M2 GRS by design"],
    goal: "Who may approve what, the approval limits, segregation of duties, the bank-detail change control, masking of bank details and prices by role, the audit trail, retention and what data may go to an AI service, each enforced on the server and visible in the UI.",
    stories: [
      {
        key: "F-1",
        title: "Access policy and masking",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/area4-access-masking",
        story:
          "As Angelyn, the owner of area 4, I want the access policy, the field masker, the rules on what data may go to an AI service and their pages as a base, so that I can write Spectra's masking rules, limits and controls on it.",
        acceptance: [
          "Given a classified field, when a role without clearance reads it, then the field-masking interceptor masks it and says why.",
          "Given data bound for an AI service, when the destination policy decides, then only what its rules allow is sent.",
          "Given the access and classification pages, when they open, then they show the policy; the base's tests use a neutral sample rule, and the administration's planned tests are Angelyn's list.",
        ],
      },
      {
        key: "F-2",
        title: "The audit trail viewer",
        sprint: 2,
        points: 3,
        priority: "must",
        branch: "feat/area4-audit-viewer",
        story:
          "As an auditor, I want to read the audit trail with its changed fields and check its hash chain, so that I can test that approvals, payments and changes followed the controls.",
        acceptance: [
          "Given the audit log page, when an auditor opens it, then the events are listed with their changed fields, paginated and filtered.",
          "Given the chain check, when it runs, then it reports whether the hash chain is intact.",
        ],
      },
      {
        key: "F-3",
        title: "Retention",
        sprint: 2,
        points: 2,
        priority: "should",
        branch: "feat/area4-retention",
        story:
          "As Angelyn, the owner of area 4, I want a retention policy per record type with its page, so that records are kept only as long as Spectra and the law require.",
        acceptance: [
          "Given a record type with a retention policy, when the page opens, then it shows the period and why.",
        ],
      },
    ],
  },
  {
    key: "G",
    title: "Monitoring and analytics",
    area: AREA[4],
    labels: ["req: M6 deploy and monitor"],
    goal: "The deployed demo is observable, its use is measured first-party with consent, and every AI call is costed, with the AI cost per document, each with an in-app dashboard.",
    stories: [
      {
        key: "G-1",
        title: "Observability, clickstream and AI usage",
        sprint: 2,
        points: 5,
        priority: "must",
        branch: "feat/area4-observability-base",
        story:
          "As Angelyn, the owner of area 4, I want the clickstream intake, the tracker and the analytics pages as a base, so that I can build the real dashboards in Weeks 14 to 16.",
        acceptance: [
          "Given the web tracker, when a page is viewed, then the clickstream intake stores the event.",
          "Given the analytics pages, when they open, then the dashboards show mock data labelled as such, with planned tests for the real dashboards as Angelyn's list.",
        ],
      },
    ],
  },
  {
    key: "T",
    title: "Team, assessments and the client",
    area: AREA.team,
    labels: ["req: M5 team Git workflow"],
    goal: "Every assessment and client touchpoint is planned as work, so that each member is ready to show and explain their own part.",
    stories: [
      {
        key: "T-1",
        title: "Owners, backups and reviews",
        sprint: 1,
        points: 2,
        priority: "must",
        type: "type: task",
        story:
          "As the team lead, I want each owner on GitHub with their paths in CODEOWNERS and a backup for each area, so that every pull request reaches the right reviewer.",
        acceptance: [
          "Given each teammate's GitHub username, when they are invited, then they have Write access and are on the board.",
          "Given CODEOWNERS, when a pull request touches an area's paths, then GitHub requests a review from its owner and Richie, and everything else goes to Richie.",
          "Given each area, when the team agrees, then `docs/team/module-ownership.md` names its backup owner.",
          "Given the ruleset, when Richie says yes, then it requires one approving review and the code owner's review.",
        ],
      },
      {
        key: "T-2",
        title: "The briefing call with Spectra",
        sprint: 2,
        points: 2,
        priority: "must",
        type: "type: task",
        labels: ["req: M1 design thinking"],
        story:
          "As the team, we want a prepared briefing call with Spectra, so that our assumptions are confirmed or corrected before we build on them.",
        acceptance: [
          "Given the client questions, when the call is booked, then the priority questions and the three items to ask for first go to Spectra in writing before the call.",
          "Given the call, when it ends, then its answers are folded into the assumptions, the data formats, the client questions and the backlog.",
        ],
      },
      {
        key: "T-3",
        title: "The project plan",
        sprint: 2,
        points: 3,
        priority: "must",
        type: "type: task",
        story:
          "As the team, we want a project plan agreed at the Sprint 2 planning, so that every owner knows what they build in which sprint.",
        acceptance: [
          "Given the owners' planning notes, when the Sprint 2 planning meets, then prompt 002 writes the rest of the stories of epics A to G.",
          "Given the shared order and event contract, when the team meets in Week 3, then every owner reviews and agrees it.",
          "Given the plan, when it is shared, then it covers the sprints to Week 19, the assessments and the releases.",
        ],
      },
      {
        key: "T-4",
        title: "The UI prototype across the four areas",
        sprint: 3,
        points: 5,
        priority: "must",
        type: "type: task",
        labels: ["req: M1 design thinking", "req: M2 GRS by design"],
        story:
          "As the team, we want a UI prototype of the sales pilot across the four areas, so that Spectra and the assessors see the solution before we build it.",
        acceptance: [
          "Given the prototype, when it is shown in Week 4, then each area has its screens on the shell, with every state, in light and dark, and GRS visible in the UI.",
        ],
      },
      {
        key: "T-5",
        title: "The proposal deck and presentation",
        sprint: 4,
        points: 5,
        priority: "must",
        type: "type: task",
        labels: ["req: M1 design thinking"],
        story:
          "As the team, we want a proposal presentation that shows the problem, our solution and each member's part, so that we earn the Week 5 marks.",
        acceptance: [
          'Given the deck, when it is presented in Week 5, then each member presents their own area within the time limit, and "Where we use AI, and where we don\'t" is in it.',
          "Given the presentation, when it is over, then `main` is tagged `v0.1-proposal`.",
        ],
      },
      {
        key: "T-6",
        title: "Design thinking: personas, journeys, how might we, and success metrics",
        sprint: 2,
        points: 3,
        priority: "must",
        type: "type: task",
        labels: ["req: M1 design thinking"],
        story:
          "As the team, we want personas, journey maps, how-might-we statements and success metrics grounded in Spectra's roles, so that every feature answers a real need. It runs through Sprints 2 and 3.",
        acceptance: [
          "Given the role table, when the personas are written, then each of Spectra's roles has one.",
          "Given the journeys, when they are mapped, then the sales and purchase flows, today and in future, have their pain points, how-might-we statements, hypotheses and success metrics.",
        ],
      },
      {
        key: "T-7",
        title: "GRS by design",
        sprint: 3,
        points: 3,
        priority: "must",
        type: "type: task",
        labels: ["req: M2 GRS by design"],
        story:
          "As the team, we want governance, risk and sustainability designed into OrderPilot and visible in the prototype, so that the controls are part of the product, not an afterthought. It runs through Sprints 3 and 4.",
        acceptance: [
          "Given the GRS design, when it is reviewed, then governance, the risk register (each risk with an owner, a mitigation and its inherent and residual ratings) and sustainability are complete.",
          "Given the UI prototype, when it is shown, then the GRS controls are visible in it.",
        ],
      },
      {
        key: "T-8",
        title: "Preparing for the mock interview",
        sprint: 5,
        points: 2,
        priority: "must",
        type: "type: task",
        story:
          "As a team member, I want to rehearse explaining my own code and decisions, so that I can answer any question about my part at the Week 7 interview. It runs through Sprints 5 and 6.",
        acceptance: [
          "Given my area, when a teammate asks about any file I own, then I can explain what it does, why, and how it is tested.",
        ],
      },
    ],
  },
];
