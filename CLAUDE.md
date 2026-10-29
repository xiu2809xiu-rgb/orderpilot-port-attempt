# CLAUDE.md

> Project memory for AI coding agents (Claude Code) working in this repository.
> Read it in full before doing anything. It is the source of truth for context, decisions and standards.
> If an instruction conflicts with this file, follow this file and say so.

---

## 1. What this project is

**OrderPilot** is our product for Spectra Innovations, a Singapore distributor of IT products and computer peripherals: an **AI-assisted order-automation layer** beside its Navision ERP. **AI reads, rules decide, people approve.** It reads customer and vendor documents (purchase orders, proforma invoices, invoices, packing lists and shipping documents), checks them against each other, routes approvals and tasks across six teams, and shows every order on one tracker. Human approvals and financial controls stay in place: staff keep posting into Navision, and AI never approves, posts, releases goods or pays.

- **Module:** IT2134 IT Innovation Project, Diploma in IT, Nanyang Polytechnic, AY2026 Semester 2 (19 Oct 2026 to Feb 2027)
- **Theme:** SCCCI x NYP AI Innovation Challenge
- **Client:** Spectra Innovations, Problem Statement **#11**, allocated in W2 (26 Oct 2026).
- **Team:** 4 Year-2 students: Richie (team lead, area 1), Azri (area 2), Iok Teck (area 3) and Angelyn (area 4). Ownership areas are at the end of section 4.
- **Sprints:** one week each, Monday to Sunday. Sprint 1 is the module's Week 2 (26 Oct to 1 Nov 2026), and Sprint _n_ is module Week _n_ + 1. Each sprint is a milestone, `Sprint 01 (W2)` to `Sprint 18 (W19)`, and the backlog in `docs/agile/backlog.md` is generated from `scripts/github/backlog.mjs`.
- **The base:** the platform base and each area's base land one story at a time, as [prompt 001](docs/ai/prompts/001-set-up-and-port-the-base.md) sets out. Until a story lands, what this file says about its part is the plan; the story that brings it is named where it matters.

### Assessment (this shapes how we build)

| Week | Assessment | Weight |
|---|---|---|
| 5 | Proposal presentation | 25% (group 5, individual 20) |
| 7 | Mock job interview (explain your own part) | 15% individual |
| 13 | Technical review | 25% (group 5, individual 20) |
| 18 | Final presentation | 35% (group 5, individual 30) |

85% of the marks are individual. Every member must own, understand and explain distinct parts of the code. Keep module boundaries clean so ownership is obvious (`docs/team/module-ownership.md`, from P-4).

### Schedule anchors

W2 (26 Oct) problem allocation · W3 (week of 2 Nov) briefing call with Spectra Innovations · W3 project plan · W4 UI prototype · W5 proposal · W8–12 AI-assisted coding · W13 technical review · W14 observability · W15 clickstream analytics · W16 AI token usage tracking · W18 final presentation · W19 client check-in.

---

## 2. Module requirements (non-negotiable; every feature maps to at least one)

1. **Design thinking:** a problem grounded in real user and stakeholder needs, with clear solution objectives.
2. **GRS by design:** governance, risk and sustainability built into the solution design and UI prototype.
3. **AI-assisted coding:** build with AI tools responsibly and ethically, knowing their capabilities and limits.
4. **Best practices:** application security, performance optimisation and testing.
5. **Team Git workflow:** branches and pull requests to integrate and manage everyone's code.
6. **Deploy and monitor:** cloud deployment with observability, clickstream analytics and AI token usage tracking.

The labels and the traceability matrix number them M1 to M6. Keep `docs/requirements-traceability.md` current: requirement → feature/control → code location → evidence (test, screenshot, metric). P-3 brings it, with most rows still planned.

The module's AI coding tool is AWS Kiro, and students "own every line they submit".

---

## 3. The problem (summary; the analysis is in `docs/problem-statement.md`)

P-3 brings the analysis, together with `docs/assumptions.md`, `docs/client/questions-for-client.md` and `docs/data-formats.md`.

**Users:** Spectra's order teams: Product Managers, the approver, Support, Warehouse, Finance and Logistics, and the management that oversees them.

**The client today**
- A Singapore distributor of IT products and computer peripherals, and the master distributor for some brands. Its customers are in South Asia (India, Sri Lanka, Bangladesh and Pakistan) and the Middle East, and most pay before their goods are shipped. Its ERP is **Microsoft Dynamics Navision**.
- Every purchase and sales order is handled by hand and passed between the six teams.
- Staff key the same data again from customer purchase orders (POs), proforma invoices (PIs), invoices, packing lists and shipping documents (AWB/BL), and spend their time chasing approvals, payments and shipping papers.

**The two flows** (the client's process, in our words):
- **Sales:** the customer's PO (part number, quantity, USD unit price) → a stock check and the SPR (Sales Purchase Requisition) process, its trigger still to confirm → Support generates a PI from Navision with the bank details → once the customer pays, the PI goes to the warehouse for packing → invoice and packing list → the PI to the customer with the shipment date → the goods released to the forwarder under the shipping terms → shipping details to the customer → follow-up of the AWB/BL and the import permit.
- **Purchase:** a Product Manager raises an SPR → the approver reviews and approves it → Support creates the vendor PO in Navision → the vendor sends a PI with our PO number and their bank details → a forwarder is arranged under the shipping terms → the warehouse checks the goods against the invoice, packing list and AWB/BL → the goods are received into Navision from the vendor's invoice → the customer is told → Finance pays the vendor on the due date.

**Root cause:** each order's facts arrive in documents that no system reads, and the rules that tie them together (who approves what, up to which limit, in which order, and what must match) live in people's heads and inboxes. So every hand-off re-types, re-checks and chases.

**What success looks like** (the brief's four asks, in our words):
- It pulls the part numbers, quantities, prices and shipping details out of the documents that customers and vendors send.
- It compares those documents with one another, and raises any disagreement for a person to look at.
- It sends each approval and task to the team that owns it, and reminds people when something is late.
- It puts every order on one dashboard: where it stands, who has it, what is still to do and what has gone wrong.

**The client's own proposal:** four capabilities (AI document processing, an AI workflow agent, Navision integration and an order dashboard), on one principle: the AI reads documents and handles what varies, while a workflow engine enforces the business rules, approval limits and the order of steps, and the AI makes no unrestricted decisions. Our tagline, "AI reads, rules decide, people approve.", sits beside it. Its measures: order-processing time, manual touches per order, data-entry error rate, approval turnaround and overdue orders.

**Priorities:** one workflow first, as the brief suggests: MVP first, with MoSCoW priorities. The sales pilot, from the customer's PO to the order tracker, is the Must for the W4 prototype and the W5 proposal; the Should items follow by W13; the purchase flow is phase 2, built in W8 to W12 for the W18 final; real Navision integration and write-back wait until Spectra wants them. Staff keep posting into Navision, and money stays under their control. The list is in `docs/problem-statement.md` section 2.5; epics A to G get the rest of their stories at the Sprint 2 planning.

**Unknowns:** whether and how Navision can be integrated (its version, cloud or on-premise, and its interfaces); how orders and documents arrive, and how many a month; whether the pilot is the sales flow, the purchase flow or both; when an SPR is raised in a sales order; the PI sequence the client flagged (when the PI goes to the warehouse and when to the customer); the approvers, their limits and who decides while the approver is away; how payment is confirmed and how a vendor's bank details are checked; what counts as a mismatch (price tolerance, partial shipments, substitutions); the forwarders, the AWB/BL formats and each country's import permits; the costliest errors today and baselines for the five measures; the channels staff use (email, Teams, WhatsApp, Excel) and whether OrderPilot may send messages or only draft them; permission to use an AI service, in which region, and whether bank details and contacts are off-limits to it; and who signs off the results. Until the client's samples arrive through the team's data folder, everything external is **mocked**, and every assumption is logged in `docs/assumptions.md`. The brief, the client's proposal and slides, and any client sample are never committed.

---

## 4. Product scope

### Roles (RBAC)

| Role | Access |
|---|---|
| `SYSTEM_ADMIN` | Full system administration; never approves, posts or pays |
| `PRODUCT_MANAGER` | Raises SPRs for their brands and follows their orders and stock |
| `APPROVER` | Approves or rejects SPRs and other requests within their approval limit |
| `SUPPORT` | Captures and confirms documents, keeps orders up to date, generates PIs, invoices and packing lists, and sends customer updates |
| `WAREHOUSE` | Checks goods against invoices, packing lists and AWB/BL, then packs and releases them |
| `FINANCE` | Confirms customers' payments, pays vendors, and clears payment holds with a second approver |
| `LOGISTICS` | Arranges forwarders, and follows shipment dates, AWB/BL and import permits |
| `MANAGEMENT` | The order tracker, dashboards and reports, read-only |
| `AUDITOR` | Audit trail, read-only |

P-7 brings these nine roles into the shared contracts in `packages/shared`.

### Capabilities

| # | Capability | Summary |
|---|---|---|
| A | Document intake and AI extraction | Documents arrive by email (the mailbox connector) or upload, as PDFs, scans or Excel. The AI classifies each document's type and extracts its fields. Each customer's and vendor's layout is a mapping version, proposed by the AI mapping assistant and approved before use. Every extracted field carries a confidence score and a link to its source document, and anything uncertain waits for a person. |
| B | Master data and Navision | One adapter per external system behind a common `SystemConnector` interface. Customers, vendors, items (part numbers), price lists and stock are read from Navision (`mock-navision`, an OData-style API), each field with its source and its change history. Staff keep posting into Navision. A write-back comes later, only if Spectra wants it; it needs a preview and an audited approval, and goes only to the mock until the client agrees. |
| C | Order workflows and approvals | The sales and purchase workflows run on the state machine, with tasks routed to the six teams' roles: SPR approval within approval limits, an SPR raised from a sales order's shortage, SLA reminders and escalations, generated documents (PI, invoice, packing list) and notifications. |
| D | Cross-document checks, the order tracker and insights | The PO against the PI, invoice, packing list and AWB/BL, plus stock and price checks; an exceptions queue; one order tracker with each order's full trail; and the client's own measures as KPIs. |
| E | AI assistance (human in the loop) | Classification, extraction, layout mapping, an explainer for each mismatch (the logs stay the source of truth), and drafts of customer and vendor emails that a person approves and sends. Comparisons, routing and limits are fixed rules, not AI ("Where we use AI, and where we don't" in `docs/problem-statement.md`). AI never posts to Navision, approves, releases goods or pays. |
| F | Financial controls and governance | RBAC and segregation of duties (a requester never approves their own SPR); approval limits; bank-detail change control, where a PI whose bank details differ from the vendor master puts the payment on hold until Finance and a second approver clear it; masking of bank details and prices by role; a tamper-evident audit trail; retention; and no customer or pricing data sent to a third-party AI service without the client's written permission. |
| G | Monitoring and analytics | Observability (structured logs, traces, metrics, health checks), first-party clickstream analytics, and AI token usage and cost tracking, with the AI cost per document, each with an in-app dashboard. |

### Data rules

- **Synthetic data only.** Synthetic companies, fictional brands and synthetic documents. Label them "Synthetic demo data" in the UI.
- **Fake bank details.** Every bank detail is synthetic and obviously fake, never a real account.
- **Prices in USD.** Prices are in US dollars, as the client quotes them.
- **Masking.** Mask bank details and prices by role, with a "why is this hidden" reason.
- **Provenance.** Every extracted field keeps its confidence and a link to the document it came from. A person confirms anything uncertain before it is used.
- **Identity matching.** Match customers, vendors and items on their Navision numbers (customer, vendor and part numbers), never on names alone. A look-alike name is a possible match, shown for review and never merged.
- **Staff keep posting in Navision.** A write-back needs a preview and an explicit, audited approval. Against the client's real Navision it is out of scope until the client approves it; the mock may demonstrate it, labelled as a mock.
- **Human approvals stay.** AI reads, suggests and drafts. It never posts to Navision, approves, releases goods or pays: a person does, and the action is audited. Rights are enforced on the server through area 4's authorisation policy, never only hidden in the UI.
- **Open business rules are configuration.** The SPR trigger in sales, the PI sequence, the approvers and their limits, and delegation while the approver is away are configurable, never hard-coded, until Spectra confirms them.
- **Segregation of duties.** A requester never approves their own SPR or releases a payment they asked for. A changed bank detail puts the payment on hold until Finance and a second approver clear it.
- **No client document to a third-party AI without permission.** Classification and extraction must show a model the document itself, so a client's document reaches a third-party AI service only with the client's written permission, in an approved region (for example AWS Bedrock in Singapore), after a GRS assessment. Until then, the client's samples are tried only on the local throwaway stack with the deterministic `mock` provider, and only synthetic documents reach any other provider. The mapping assistant keeps to headers, field shapes and codes, and the explainer works from the fields and the differences computed inside OrderPilot, never a customer's name or contact, a price or bank details. The `mock` provider stays the default (P-18 brings the AI gateway and its ADR).
- **English first.** The UI keeps its i18n framework: every user-facing string lives in the locale files, and none is hard-coded. English is the only language; a second language comes only if Spectra asks for one.

### Ownership areas (each is deep enough to earn an A)

| Area | Owner | Scope |
|---|---|---|
| 1. Document AI and integration core | Richie | **Document AI:** the whole AI pipeline (intake, document classification, extraction, the confidence scores and their thresholds, and the review screen), the mapping of each layout, and the canonical order and its documents with provenance. **Integration:** the connector framework (Adapter + Factory) with the Navision and mailbox connectors, master data synced from Navision, and write-back behind approval. **Platform:** architecture, monorepo, design system and app shell, auth/RBAC baseline and the generic guard that calls area 4's authorisation policy, CI/CD, Docker, mock systems and the shared template engine. |
| 2. Order workflows and approvals | Azri | The sales and purchase workflows on Azri's state machine, which alone holds each order's status; task routing, SPR approval within limits, SPRs from shortages, the payment gate, SLA reminders and escalations, generated documents and notifications. |
| 3. Cross-document checks, order tracker and insights | Iok Teck | The checks engine (tolerances, currency, PO references, totals, stock), the check results and the exceptions queue with an AI explanation for each mismatch, the order tracker with each order's full trail, and the KPIs and insights. |
| 4. Financial controls, security and monitoring | Angelyn | The authorisation policy (who may approve what, the approval limits and segregation of duties), bank-detail controls, masking, audit (the AI's decisions included), retention, AI governance (what data may go to an AI service), observability, clickstream, AI cost and the AWS deployment with CloudWatch. |

**How the areas connect**
- **Order status lives only in area 2's state machine.** Area 1 owns the order's data and its documents (`orders`, `documents`); area 3 reads the status through agreed APIs and keeps no status logic of its own.
- **Area 3 owns the check results and the exceptions.** It reports pass or fail to area 2, and area 2's state machine decides what a failure blocks.
- **Area 4 owns the authorisation policy:** who may approve what, the limits and segregation of duties. Endpoints call that policy, so rights are enforced on the server, and tests prove it with direct API calls. Area 1 keeps the generic guard that calls it.
- **Area 1 owns the whole AI pipeline:** document classification, extraction, the confidence scores and their thresholds (which confidence needs a person, and which fields always do), and the review screen. Area 4 audits the AI's decisions and sets what data may go to an AI service.
- **The shared order and event contract** is agreed by the team in W3, and every owner reviews it.

**Rules**
- **Area 1 is the shared base.** Shared platform code (auth, layout, design system, API client, queues, logging, health, AI usage recording, the template engine) belongs to area 1.
- **Owners write their own domain logic.** Azri, Iok Teck and Angelyn write the core logic of areas 2 to 4. A change in their folders is a pull request the owner reviews (`docs/team/module-ownership.md`, from P-4). Area 1 builds the base of areas 2 to 4 (scaffolding, data models, the area's API contracts, typed sample data, screens and test skeletons), hands each area to its owner, and then reworks that base only when the owner asks. It keeps each area's implementation guide in `docs/team/` current and makes additive changes to the shared contracts, each in a pull request the owner reviews.

---

## 5. Architecture and stack (decided)

Record any deviation as an ADR in `docs/adr/NNNN-title.md`. Use the latest stable versions and pin exact versions. So far the [ADR index](docs/adr/README.md) holds 0001 and 0002; each decision below gets its own ADR in the story that brings it.

**Monorepo (from P-5)**
- pnpm workspaces, Node.js LTS (the version in `.node-version`, 24.22.0).
- TypeScript in `strict` mode everywhere.

**Web (`apps/web`, from P-11)**
- React 19 + Vite, Tailwind CSS v4.
- UI components: shadcn/ui (Radix) for accessible primitives, React Bits for motion and visual components, Lucide icons.
- Routing and state: React Router, TanStack Query for server state, Zustand for the minimal client state.
- Forms and i18n: react-i18next, React Hook Form + zod.
- Charts and motion: Recharts, Motion.

**API (`apps/api`, from P-8)**
- NestJS (modular, class-based dependency injection).
- Data and jobs: Prisma + PostgreSQL, BullMQ + Redis for jobs and retries.
- Validation and docs: class-validator DTOs or zod pipes, Swagger at `/api/docs`.
- Observability: nestjs-pino logging, OpenTelemetry tracing, prom-client at `/metrics`, @nestjs/terminus health checks.

**Mock external systems (`services/mock-*`)**

Small Express + TypeScript apps with deliberately different schemas. Both are planned:

| Service | Story | Schema |
|---|---|---|
| `mock-navision` | P-19 | A mock of Navision: items, customers, vendors, price lists and stock, behind an OData-style API |
| `mock-mailbox` | P-27 | A mock mailbox: inbound emails with attachments, and an HMAC-signed "new mail" webhook |

Each is a mock, and its data is labelled "Mock" wherever it appears in the UI. P-19 starts `docs/api/mock-systems.md`, which documents them.

**Shared (`packages/shared`, from P-7)**
- Canonical types, zod schemas, enums and i18n keys shared by web and api.

**AI (from P-18)**
- `LlmGateway` with three providers:
  - `mock`: the default; deterministic, needs no API key.
  - `bedrock`: AWS Bedrock.
  - `openai`: optional; also any OpenAI-compatible endpoint, set by a base URL, a key and a model.
- Every call goes through `AiUsageTracker`, which records tokens in/out, model, latency, cost estimate, feature, user and outcome.

**Infra**
- Docker (multi-stage builds, non-root user, health checks) + docker-compose: P-9 brings compose with PostgreSQL and Redis, and P-13 the images.
- GitHub Actions CI, from P-6.
- AWS target, to be documented in `infra/aws` (area 4):
  - Compute: ECS Fargate or App Runner.
  - Data: RDS PostgreSQL, ElastiCache.
  - Web hosting: S3 + CloudFront.
  - Monitoring and secrets: CloudWatch, Secrets Manager.

---

## 6. Repository layout

The layout so far:

```
.
├── .claude/
│   └── settings.json             # shared Claude Code settings: AI attribution off
├── .github/                      # ISSUE_TEMPLATE/, pull_request_template.md, CODEOWNERS, labels.json, rulesets/main.json
├── docs/
│   ├── adr/                      # README.md (the index), 0001 and 0002
│   ├── agile/                    # README.md, the working agreement, the Definitions of Ready and Done, backlog.md (generated)
│   ├── ai/                       # ai-usage-log.md, prompts/
│   ├── wiki/                     # the team wiki, published by scripts/github/publish-wiki.mjs
│   └── BUILD_REPORT.md           # a short section per prompt
├── scripts/
│   └── github/                   # labels, milestones, backlog, board and wiki as code (backlog.mjs is the data)
├── .editorconfig  .gitattributes  .gitignore  .node-version
├── AGENTS.md  CLAUDE.md
└── README.md  CONTRIBUTING.md  SECURITY.md
```

The tree grows as stories land: each story adds its own folders here. The planned layout is in [prompt 001, section 5](docs/ai/prompts/001-set-up-and-port-the-base.md#5-the-platform-base-story-by-story).

**File organisation rules**
- One concept per file; feature folders own their code.
- No "misc", "helpers2" or catch-all `utils` dumping grounds.
- Barrel `index.ts` files only at package boundaries.
- Naming: files in kebab-case; React components and classes in PascalCase; hooks in `useCamelCase`.

---

## 7. Engineering standards

### OOP (backend, mock services, non-UI frontend services)

**Layers**
- NestJS modules and controllers (thin).
- Services (use cases).
- Repositories (the only place Prisma is called).
- Domain classes and value objects that hold the invariants (`Order`, `PartNumber`, `Money`, `DateRange`, ...).

**Patterns, used only where they earn their place**

| Pattern | Use |
|---|---|
| Adapter | Each external system sits behind `SystemConnector` |
| Factory | Creates connectors from configuration |
| Strategy | Field transformers, document extractors, check rules, document and report renderers |
| Template Method | Base sync job: extract → map → validate → load → audit |
| Observer / domain events | Workflow triggers |
| Repository | Data access |

Document each pattern in `docs/architecture/patterns.md`, with file references, in the story that brings it (P-8 starts the file).

**Principles:** SOLID, depend on interfaces, constructor injection. No static singletons except framework-managed providers.

### Frontend

- Function components and hooks only; no class components.
- Classes are for non-UI services only (`ApiClient`, `AnalyticsTracker`, `FeatureFlags`).
- Keep components to roughly 200 lines or fewer; split them otherwise.

### General

- **Types and validation:** no `any`. Validate all external input at the boundaries (zod or DTOs).
- **Errors:** typed errors, a global exception filter, and one error envelope: `{ error: { code, message, details, traceId } }`.
- **Clean code:** no `console.log` in committed code (use the logger), no dead code, no commented-out code.
- **Comments and docs:** comments explain *why*, not what. Public classes and functions get concise TSDoc.
- **Config:** use a typed config module and read secrets only from env. `.env.example` documents every variable.

### Security

**Transport and headers**
- helmet with a strict CSP.
- CORS allow-list.
- Rate limiting.

**Authentication and access**
- argon2 password hashing.
- JWT in httpOnly secure cookies, with refresh-token rotation.
- RBAC guard plus a field-level masking interceptor.

**Data handling**
- Input validation; parameterised queries only (Prisma).
- Audit every write.
- HMAC verification for webhooks.

**Process**
- Dependency audit in CI.
- Follow the OWASP Top 10 and the OWASP API Security Top 10.

### Performance

- Route-level code splitting; charts are lazy-loaded.
- Pagination on every list endpoint; a database index for every query path; React Query caching.
- **Budgets** (P-11 adds the bundle-budget check to CI):
  - Initial JS ≤ 250 KB gzip.
  - LCP < 2.5 s.
  - Lighthouse ≥ 90 for Performance, Accessibility and Best Practices on the main pages.

### Testing

- **Unit tests** for domain logic (mapping, transformers, the workflow state machine, masking), with ≥ 80% line coverage on those modules.
- **API integration tests** (Supertest) for each module: the happy path plus an auth failure.
- **Playwright e2e:** a smoke test that signs in as each role, opens the shell and signs out, with axe (WCAG 2.2 AA) on every page (P-15). Then the hero journey's E2E #1 to #4 (`docs/agile/hero-journey.md`, from P-3), as the areas land.
- All tests run in CI.

---

## 8. UI and design rules (strict)

The audience is the order teams that use OrderPilot (Support, Product Managers, the approver, Finance and Logistics), who do data-heavy work at their desks every day, the warehouse staff who check goods on the floor, and the management that follows the orders. The product must feel calm, trustworthy and premium: Linear or Stripe-dashboard quality, never a generic template.

### Visual system

- **Design tokens:** live in `styles/tokens.css` (colour, type scale, spacing, radius, shadow, motion). Components use tokens only, with no ad-hoc hex values or magic numbers.
- **Colour:**
  - A warm neutral-grey base, with one primary accent (deep jade/teal) for actions.
  - Semantic colours for success, warning, danger and info; full light and dark themes.
  - No purple-gradient "AI look" and no rainbow gradients. Glass effects only where they add depth.
- **Typography:**
  - Geist for all text.
  - Tabular numerals in tables and KPIs; at most 7 type sizes; 60–80 characters per line for prose.
- **Layout:** an 8-pt spacing grid and a 12-column responsive grid. Every page follows the same anatomy: page header → filters/actions → content. Desktop-first for the order teams and management, fully usable at 1024 px; the screens the warehouse uses on the floor (the goods check) also work on a tablet, with touch targets of at least 44 px.

### Behaviour

- **Design principles to apply (and be able to cite):**
  - Visual hierarchy and Gestalt (proximity, similarity, common region).
  - Nielsen's 10 heuristics.
  - Fitts's law for primary actions, Hick's law (progressive disclosure), Jakob's law (familiar patterns).
  - Recognition over recall.
  - Error prevention: confirm destructive or irreversible actions, and show a preview before any sync writes data.
- **States:** every data view handles loading (skeletons), empty (with a next action), error (with retry and traceId), partial data, success feedback (toasts) and permission-denied.
- **Accessibility:** WCAG 2.2 AA:
  - Text contrast ≥ 4.5:1 and visible focus rings.
  - Full keyboard navigation, aria labels and semantic HTML.
  - `prefers-reduced-motion` respected everywhere.
- **Motion:** purposeful only. Use 150–250 ms ease-out for UI and springs for spatial movement. Never animate tables or forms while the user is working in them.
- **GRS visible in the UI:**
  - Data-classification badges, and masked fields with a "why is this hidden" tooltip.
  - Audit-trail links on records, and approval steps shown explicitly.
  - AI suggestions labelled with their confidence and "Requires approval".
  - "Mock", "Mock AI" and "Synthetic demo data" labels wherever mock systems, the mock AI provider or synthetic data appear.

### Banned

- Lorem ipsum, and "John Doe" placeholder data.
- Emoji used as icons, and mixed icon sets.
- Centred body text.
- More than one primary button per view.

---

## 9. Component registries (React Bits and friends)

All UI components are installed with the shadcn CLI, run from `apps/web` (where `components.json` lives). P-21 brings `components.json` and its registries, the React Bits skill and the design docs, by the end of Sprint 2.

| Namespace | What it provides | Access |
|---|---|---|
| shadcn/ui (default) | Accessible base primitives (Button, Dialog, Table, ...) | Free |
| `@react-bits` | React Bits free components from reactbits.dev, e.g. `SplitText-TS-TW` | Free, built-in namespace |
| `@reactbits-starter` | React Bits Pro components (`-tw` / `-css` variants) and the React Bits skill | Licence key |
| `@reactbits-pro` | React Bits Pro blocks (`category-number`, e.g. `pricing-4`), Application UI (e.g. `ai-chat-1-sorbet`), Agent Kit | Licence key |
| `@magicui` | Magic UI free components | Free |

### Rules

- **Licence key:**
  - `REACTBITS_LICENSE_KEY` lives only in `apps/web/.env.local`, which is git-ignored.
  - Never print it, commit it, or copy it into docs, prompts or logs.
- **Pro code is paid, and this repository is public:** on 29 Oct 2026 the team lead decided to keep this repository public with React Bits Pro code in it, and accepted the licence risk. P-21 records the decision in the component-registries ADR. The licence-key rules above still apply.
- **Variants:** always install the TypeScript + Tailwind variant (`-TS-TW` for free React Bits, `-tw` for Pro components).
- **The React Bits skill is authoritative:** `.claude/skills/reactbits/SKILL.md` covers usage, props and animation parameters. Read it before using any React Bits item.
- **Use React Bits extensively wherever it fits.** Installed but unused is a waste.
  - Pro blocks for landing/login and marketing-style sections.
  - Application UI where it matches our screens.
  - Components for text animation, backgrounds, KPI counters, cards, loaders, page transitions and empty states.
  - Every page uses at least one React Bits item.
  - Dense work surfaces (tables, forms, filters) get only subtle items (loaders, counters, hover/focus effects).
- **Make it native:** adapt every item to the design tokens (colour, radius, motion timing) so it looks built-in, not pasted in. Keep one component per file, with a header comment stating its origin.
- **Document it:**
  - Keep `docs/design/reactbits-usage.md` current: item → where it's used → why → its reduced-motion behaviour.
  - Delete anything that was installed but isn't used.

---

## 10. Git, AI use and safety

- **Branches and commits:**
  - Never commit to `main`; branch per task: `feat/<area>-<desc>`, `fix/...`, `docs/...`, `chore/...`, `ci/...`, `test/...`.
  - Conventional Commits; small, reviewable commits.
- **Pushing:** do not push or open PRs unless the user explicitly asks.
- **Never commit:** secrets or licence keys, or real personal data. The repository is public, so client documents and NYP material marked Official (Closed) are never committed.
- **No AI attribution anywhere visible:** no "Co-Authored-By" trailers for AI, no footers that credit an AI tool, no AI emojis or session links in commits, PR titles or descriptions, code comments or docs. [`.claude/settings.json`](.claude/settings.json) turns off Claude Code's automatic attribution. AI use is documented in one place only: [docs/ai/ai-usage-log.md](docs/ai/ai-usage-log.md), which the module assesses.
- **AI usage log:** log significant AI-assisted work in its area's table in `docs/ai/ai-usage-log.md` (date, tool, task, prompt file, what was accepted or changed, human reviewer). Store substantial prompts in `docs/ai/prompts/`; teammates name theirs `areaN-NNN-short-title.md`.
- **Bringing something from the earlier base:** follow the section of that name in [AGENTS.md](AGENTS.md). [ADR 0002](docs/adr/0002-clean-repository-for-orderpilot.md) records why this repository is clean and how the base comes across, story by story.
- **Honesty:** run the commands and report the real results. Never claim something works without verifying it. If something cannot be done, say so and propose the closest alternative.

---

## 11. Definition of done (every task)

- `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass, and `docker compose up --build` still works. The `pnpm` scripts arrive with P-5 and `docker compose` with P-9; until a command exists, the PR says so instead of reporting a result.
- **UI changes:** every state is covered, strings are in the locale files with no second language, keyboard and reduced-motion behaviour are checked, and screenshots in light and dark, taken from a Docker build of the branch, are saved under `docs/design/screenshots/` and shown in the PR description.
- **Docs updated:** the traceability matrix, an ADR if a decision changed, and the AI usage log if the work was AI-assisted.

The full checklist, with the team's rules, is in [docs/agile/definition-of-ready-and-done.md](docs/agile/definition-of-ready-and-done.md).
