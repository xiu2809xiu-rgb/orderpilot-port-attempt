# Security policy

OrderPilot is a student proof of concept for Spectra Innovations (IT2134 IT Innovation Project, Nanyang Polytechnic). This public repository holds **synthetic data only**, and nothing from Spectra. Security problems in its code or its set-up still matter to us, and we fix them.

## Reporting a vulnerability

Report it privately, never in a public issue or pull request:

1. Open the repository's **Security** tab and choose **Report a vulnerability**. GitHub's private vulnerability reporting is on for this repository.
2. Describe what you found, how to reproduce it, and what an attacker could do with it.

Report a secret, a licence key or a real client document that you find in the repository the same way.

We acknowledge a report within three working days. A confirmed problem is fixed in a pull request that refers to the advisory, and we credit the reporter in the advisory unless they would rather not be named.

## Scope

In scope:

- everything in this repository: today its documents and settings, and, as each part lands, the shared packages (P-7), the API (P-8), the web app (P-11) and the mock systems (P-19);
- the build and deployment set-up: the workflows (from P-6), `docker-compose.yml` (P-9), the Dockerfiles in `infra/docker/` (P-13), and the AWS deployment when it comes.

We fix problems on the latest `main`; there are no other supported versions.

Out of scope:

- Spectra's own systems. OrderPilot does not connect to them, and a mock stands in for Navision. Please do not test them.
- Weaknesses in the real products that the mock systems imitate, such as Microsoft Dynamics Navision. Report those to their vendors.

## Data and secrets

- **Synthetic data only:** synthetic companies and documents, obviously fake bank details, and prices in USD.
- **Nothing from Spectra in Git:** its brief, its proposal, its documents and its samples stay out of this repository. A client sample is tried only on a local machine, in the git-ignored `samples/` folder.
- **No client data to an AI service without permission:** until Spectra gives its written permission, no client document, customer data or price goes to a third-party AI service; only synthetic documents do.
- **The React Bits licence key** lives only in `apps/web/.env.local`, which Git ignores. Never print, paste or commit it. P-5 adds a pre-commit guard that refuses it.
- **Environment files** (`.env` and `.env.local`) are git-ignored. P-9 brings `.env.example`, which documents every variable with a safe default.
- **A secret that reaches GitHub is treated as leaked:** we rotate it first, then remove it.

## How the project checks itself

| Practice                                                                            | When      | Where                                                                      |
| ----------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| Private vulnerability reporting                                                     | On now    | Repository settings                                                        |
| Secret scanning with push protection                                                | On now    | Repository settings                                                        |
| Dependabot alerts and security updates                                              | On now    | Repository settings, with the dependency graph                             |
| Protection of `main`: a pull request for every change, no force pushes, no deletion | On now    | The ruleset on `main`, mirrored in `.github/rulesets/main.json`            |
| Read-only default permissions for workflows                                         | On now    | Repository settings                                                        |
| Dependabot version updates                                                          | From P-5  | `.github/dependabot.yml`                                                   |
| Licence-key and samples guards in the commit and push hooks                         | From P-5  | `.husky/`, `scripts/check-licence-key.mjs` and `scripts/check-samples.mjs` |
| Dependency audit in CI                                                              | From P-6  | `pnpm audit` in `.github/workflows/ci.yml`                                 |
| Container image and configuration scanning (Trivy)                                  | From P-13 | `ci.yml` and `.github/workflows/security.yml`                              |
| Static analysis (SAST) with CodeQL                                                  | From P-14 | `.github/workflows/codeql.yml`                                             |
| Dependency review on every pull request                                             | From P-14 | `.github/workflows/dependency-review.yml`                                  |
| Supply-chain review (OpenSSF Scorecard)                                             | From P-14 | `.github/workflows/scorecard.yml`                                          |

Dependabot has nothing to watch until P-5 adds the first `package.json`. P-14 also brings `docs/security/security-testing.md`: what each check covers, and how to triage its findings.
