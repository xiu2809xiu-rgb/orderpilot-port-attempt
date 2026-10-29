# OrderPilot

Team repository for the SCCCI x NYP AI Innovation Challenge (IT2134 IT Innovation Project, AY2026 S2). OrderPilot is our product for Problem Statement #11, Spectra Innovations: AI-assisted order automation beside Navision, Spectra's ERP. It aims to read each customer and vendor document once, check the documents against each other, route approvals and tasks across six teams, and follow every order on one tracker, with human approvals and financial controls kept in place.

**AI reads, rules decide, people approve.**

> Nothing runs yet. The platform base is being ported story by story from the team's earlier base, and the [status](#status) below says what is here so far. All data in this repository is synthetic.

## What OrderPilot is for

Spectra Innovations is a Singapore distributor of IT products and computer peripherals, and its ERP is Microsoft Dynamics Navision. Every purchase and sales order is handled by hand and passed between six teams: the Product Managers, the approver, Support, the warehouse, Finance and Logistics. Staff key the same data again from purchase orders (POs), proforma invoices (PIs), invoices, packing lists and shipping documents (AWB/BL), and spend their time chasing approvals, payments and shipping papers.

OrderPilot is meant to:

- read the part numbers, quantities, prices and shipping details from the documents that customers and vendors send;
- compare those documents with one another, and raise any disagreement for a person to look at;
- send each approval and task to the team that owns it, and remind people when something is late;
- show every order on one tracker: where it stands, who has it, what is still to do and what has gone wrong.

AI reads, suggests and drafts. Fixed rules decide the approval limits, the order of steps and what must match, and people approve. Staff keep posting into Navision, and AI never approves, posts, releases goods or pays. We plan to start with one workflow, the sales pilot from the customer's PO to the order tracker, and to confirm it with Spectra at the briefing call in the week of 2 Nov 2026 (Week 3). P-3 brings the full analysis, in `docs/problem-statement.md`.

## The four areas

Each member owns one area and explains its code at the assessments, where 85% of the marks are individual. The team lead builds every area's base first; then each owner takes over their own area and builds #11's business rules in it.

| Area                                                 | Owner              | What it covers                                                                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Document AI and integration core                  | Richie (team lead) | Document intake, classification and extraction, with confidence scores and a review screen; the canonical order and its documents; the Navision and mailbox connectors and the master data; and the platform base                     |
| 2. Order workflows and approvals                     | Azri               | The sales and purchase workflows on the state machine that alone holds each order's status: task routing, SPR approvals within limits, the payment gate, SLA reminders and escalations, and generated documents                       |
| 3. Cross-document checks, order tracker and insights | Iok Teck           | The checks of each PO against its PI, invoice, packing list and AWB/BL, plus stock and price checks; the exceptions queue; the order tracker; and the KPIs                                                                            |
| 4. Financial controls, security and monitoring       | Angelyn            | Who may approve what, with approval limits and segregation of duties; bank-detail controls, masking, the audit trail and retention; what data may go to an AI service; and observability, clickstream, AI cost and the AWS deployment |

P-4 brings each area's guide in `docs/team/`, and `docs/team/module-ownership.md` with the paths each area owns.

## How we work

- **One-week sprints,** Monday to Sunday. Sprint 1 is 26 Oct to 1 Nov 2026, the module's Week 2, and Sprint _n_ falls in module Week _n_ + 1. Each sprint has a planning meeting, a written stand-up every working day, a backlog refinement, a review and a retrospective.
- **One story, one issue, one branch, one pull request.** Each branch starts from the latest `main`, uses Conventional Commits in small commits, and is merged with a merge commit once every required check is green. [CONTRIBUTING.md](CONTRIBUTING.md) has the steps.
- **The process** is in [docs/agile/](docs/agile/README.md): the [working agreement](docs/agile/working-agreement.md) and the [Definitions of Ready and Done](docs/agile/definition-of-ready-and-done.md). The rest is kept as code: the issue forms, the pull request template, the labels, the milestones `Sprint 01 (W2)` to `Sprint 18 (W19)`, the [backlog](docs/agile/backlog.md) and the **OrderPilot delivery** board, with the scripts that create them in `scripts/github/`, and the [team wiki](https://github.com/xiu2809xiu-rgb/orderpilot/wiki), published from `docs/wiki/`.
- **AI use:** every AI tool follows [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md). Significant AI-assisted work is recorded in one place, the [AI usage log](docs/ai/ai-usage-log.md), and commits and pull requests carry no AI attribution.
- **Releases:** a feature freeze in the sprint before each assessment, then a tag on `main`: `v0.1-proposal` (Week 5), `v0.2-technical-review` (Week 13) and `v1.0-final` (Week 18).

## Status

Our lecturer asked for a repository with only #11's work in it. So the platform base that the team lead started for the team before #11 was allocated comes across story by story: each piece is adapted for OrderPilot and merged through its own issue and pull request, and nothing that served another problem statement comes in ([ADR 0002](docs/adr/0002-clean-repository-for-orderpilot.md)).

So far, the ground rules (P-1) and GitHub as code (P-2) are in place. Nothing runs yet: there is no `package.json`, no CI and no app. These stories bring them:

| Story | Brings                                                               |
| ----- | -------------------------------------------------------------------- |
| P-5   | The pnpm monorepo, TypeScript, lint, formatting and the commit hooks |
| P-6   | CI: the **Lint, typecheck, test, build** check on every pull request |
| P-8   | The API shell (NestJS), with health checks and Swagger               |
| P-9   | PostgreSQL, Redis and the local stack in `docker-compose.yml`        |
| P-11  | The web shell (React and Vite)                                       |

The quick start, the ports and the scripts join this README as those stories land. Until Spectra's samples arrive, every external system will be a mock, starting with a mock Navision (P-19).

## Documents

| Document                                                      | What it covers                                                                                                                                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CONTRIBUTING.md](CONTRIBUTING.md)                            | How a story goes from its issue to `main`, and the set-up so far                                                                                                                            |
| [SECURITY.md](SECURITY.md)                                    | How to report a vulnerability, and how the project checks itself                                                                                                                            |
| [AGENTS.md](AGENTS.md)                                        | The rules for every AI tool, and for the teammate using it                                                                                                                                  |
| [CLAUDE.md](CLAUDE.md)                                        | The product, its scope, the stack and the standards                                                                                                                                         |
| [docs/adr/](docs/adr/README.md)                               | The architecture decisions: [0001](docs/adr/0001-record-architecture-decisions.md) on recording them, and [0002](docs/adr/0002-clean-repository-for-orderpilot.md) on this clean repository |
| [docs/agile/](docs/agile/README.md)                           | The [working agreement](docs/agile/working-agreement.md), the [Definitions of Ready and Done](docs/agile/definition-of-ready-and-done.md) and the [backlog](docs/agile/backlog.md)          |
| [AI usage log](docs/ai/ai-usage-log.md)                       | Significant AI-assisted work, with one table per area                                                                                                                                       |
| [Prompt 001](docs/ai/prompts/001-set-up-and-port-the-base.md) | How this repository is set up and the base is ported, story by story                                                                                                                        |
| [Build report](docs/BUILD_REPORT.md)                          | A short section for each prompt                                                                                                                                                             |

Later stories add the rest: the problem statement, the assumptions and the questions for Spectra (P-3), the area guides and module ownership (P-4), and the architecture notes (P-8).
