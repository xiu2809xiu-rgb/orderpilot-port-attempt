# Getting started

The platform base is being ported story by story ([ADR 0002](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/adr/0002-clean-repository-for-orderpilot.md)), so this page says what works so far, and grows as each story lands.

## What works so far

- **The documents and the process:** the ground rules ([AGENTS.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/AGENTS.md), [CLAUDE.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/CLAUDE.md), [CONTRIBUTING.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/CONTRIBUTING.md)), the [working agreement](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/working-agreement.md) and the [Definitions of Ready and Done](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/definition-of-ready-and-done.md).
- **GitHub as code:** the issue forms, the pull request template, the labels, the milestones, the backlog and the **OrderPilot delivery** board, all defined in the repository and created by the scripts in `scripts/github/`. Only Richie runs those scripts; they need Node.js and the GitHub CLI, signed in.
- **Nothing to install or run yet:** there is no `package.json`, no CI and no app.

## What each story adds

| Story | What you will be able to do                                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-5   | `pnpm install` with Node.js 24.22 (the version in `.node-version`) and pnpm 12 (`npm install --global pnpm@12.14.0`); lint, format and the commit hooks |
| P-6   | See CI check every pull request                                                                                                                         |
| P-8   | Start the API shell, with its health checks and Swagger                                                                                                 |
| P-9   | Start PostgreSQL and Redis with Docker Desktop (Compose v2), after `cp .env.example .env`                                                               |
| P-10  | Sign in with a demo role                                                                                                                                |
| P-11  | Open the web shell                                                                                                                                      |
| P-13  | Run everything with `docker compose up --build`                                                                                                         |

## What you need now

- **Git**, with your own name and the email on your GitHub account (`git config user.name`, `git config user.email`).
- The **GitHub CLI** (`gh`), signed in, to work with issues and pull requests.

Read [How we work](How-We-Work) for branches, commits and reviews, and [CONTRIBUTING.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/CONTRIBUTING.md) for the details.

## The React Bits licence key

Only needed to install React Bits Pro items, once P-21 brings the registries. The team lead shares it privately; keep it in your own git-ignored `apps/web/.env.local` and never paste it anywhere else. From P-5, a pre-commit hook refuses any commit that contains it.
