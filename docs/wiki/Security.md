# Security

Report a vulnerability privately from the repository's **Security** tab (**Report a vulnerability**), never in a public issue. The policy is in [SECURITY.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/SECURITY.md).

## What is on now

- Secret scanning with push protection, and private vulnerability reporting.
- Dependabot alerts and security updates, with the dependency graph.
- The ruleset on `main`: a pull request for every change, and no force pushes or deletion.

## What each story adds

| Story | Check                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------ |
| P-5   | The licence-key and samples guards in the commit and push hooks; Dependabot version updates            |
| P-6   | A dependency audit in CI                                                                               |
| P-13  | Trivy over every Docker image, and over the Dockerfiles and the compose file                           |
| P-14  | CodeQL over JavaScript and TypeScript and over the workflows; dependency review; the OpenSSF Scorecard |

A DAST scan (OWASP ZAP baseline) joins once the demo is deployed. P-14 brings `docs/security/security-testing.md`, which explains each check and what to do with a finding.
