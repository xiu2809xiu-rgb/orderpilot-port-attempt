# OrderPilot team wiki

OrderPilot is the AI-assisted order-automation layer we are building for Spectra Innovations, a Singapore distributor of IT products and computer peripherals that runs on Microsoft Dynamics Navision (Problem Statement #11; SCCCI x NYP AI Innovation Challenge, IT2134). It reads each customer and vendor document once, checks the documents against each other, routes approvals and tasks across Spectra's six teams, and follows every order on one tracker. **AI reads, rules decide, people approve.** All data is synthetic.

These pages are a map. The documents they point to live in the repository, where every change is reviewed in a pull request. The platform base is still being ported story by story from the team's earlier base ([ADR 0002](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/adr/0002-clean-repository-for-orderpilot.md)), so some documents are still to come; each one names the story that brings it.

## Start here

- [Getting started](Getting-Started): what works so far, and what each story adds.
- [How we work](How-We-Work): sprints, the board, and the path from a story to `main`.
- [Definition of Done](Definition-of-Done): the checklist every story passes.
- [Sprint calendar](Sprint-Calendar): the 18 one-week sprints and the assessments.
- [Team and areas](Team-and-Areas): who owns what, and how the areas connect.
- [Security](Security): how to report a vulnerability, and the checks that run.

## Key documents in the repository

| Document                                                                                                    | Why read it                                                     |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [CLAUDE.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/CLAUDE.md)                               | The product, its scope, the stack and the engineering standards |
| [AGENTS.md](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/AGENTS.md)                               | The rules for every AI tool, and for the teammate using it      |
| [Backlog](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/backlog.md)                     | Every epic and story with its acceptance criteria               |
| [Working agreement](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/agile/working-agreement.md) | Roles, ceremonies, the board and the path to `main`             |
| [Decision records](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/adr/README.md)               | Why the platform is built the way it is                         |
| [AI usage log](https://github.com/xiu2809xiu-rgb/orderpilot/blob/main/docs/ai/ai-usage-log.md)              | Significant AI-assisted work, one table per area                |

Still to come: the problem statement, the assumptions, the questions for Spectra, design thinking, GRS by design and the traceability matrix (P-3); the area guides and module ownership (P-4); and the test plan (P-6).
