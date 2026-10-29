# Architecture decision records

This folder records the significant technical decisions behind OrderPilot, the AI-assisted order-automation layer for Spectra Innovations (Problem Statement #11). Each record gives the context, the decision, its consequences and the options we rejected. That way any team member can explain _why_ the platform is built the way it is, at the mock interview (week 7), the technical review (week 13) and the final presentation (week 18).

[`CLAUDE.md`](../../CLAUDE.md) section 5 lists _what_ was decided, and these records explain _why_. A pull request that changes a decision updates both.

## Index

| No.                                             | Title                             | Status   | Date       |
| ----------------------------------------------- | --------------------------------- | -------- | ---------- |
| [0001](0001-record-architecture-decisions.md)   | Record architecture decisions     | Accepted | 2026-10-29 |
| [0002](0002-clean-repository-for-orderpilot.md) | A clean repository for OrderPilot | Accepted | 2026-10-29 |

Later stories of the platform base bring their own records with them, ported from the team's earlier base, renumbered in story order and rewritten for OrderPilot, as [ADR 0002](0002-clean-repository-for-orderpilot.md) explains.

## Statuses

| Status             | Meaning                                               |
| ------------------ | ----------------------------------------------------- |
| Proposed           | Open for review in a pull request                     |
| Accepted           | Merged; the team builds to it                         |
| Rejected           | Considered and declined; kept for the record          |
| Deprecated         | No longer applies and has no replacement              |
| Superseded by NNNN | Replaced by a later ADR, which links back to this one |

## Adding an ADR

1. Take the next free number on the latest `main`: pull `main` first, then check the index above. Numbers are never reused. If someone merges that number before you do, renumber yours (its file name, its title and its row here) before you merge.
2. Create `NNNN-kebab-case-title.md` from the template in [ADR 0001](0001-record-architecture-decisions.md#template).
3. Add a row to this index in the same pull request, and request review from the owner of every area the decision affects. [`CLAUDE.md`](../../CLAUDE.md) section 4 names the areas and their owners, and P-4 brings `docs/team/module-ownership.md`.
4. The ADR becomes Accepted when the pull request merges.

Decisions made before the briefing call rest on assumptions about Spectra's Navision (its version and interfaces), how documents arrive and in which layouts, and the approval rules. P-3 brings `docs/assumptions.md` and `docs/client/questions-for-client.md`, which record them. Some of these decisions will be superseded once Navision's interfaces, the client's sample documents and the approval rules are known.
