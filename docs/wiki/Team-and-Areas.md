# Team and areas

Four ownership areas, so that each member owns, writes and can explain distinct code (85% of the module marks are individual). The team lead builds every area's base first; then each owner takes over their own area.

| Area                                                 | Owner              | Scope                                                                                                                                                                                                                               |
| ---------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Document AI and integration core                  | Richie (team lead) | Document intake, classification and extraction with confidence scores and a review screen, the mapping of each layout, the canonical order and its documents, the Navision and mailbox connectors and master data, and the platform |
| 2. Order workflows and approvals                     | Azri               | The sales and purchase workflows on the state machine that alone holds each order's status: task routing, SPR approval within limits, the payment gate, SLA reminders and escalations, generated documents and notifications        |
| 3. Cross-document checks, order tracker and insights | Iok Teck           | The checks of each PO against its PI, invoice, packing list and AWB/BL, plus stock and price checks; the exceptions queue; the order tracker; and the KPIs and insights                                                             |
| 4. Financial controls, security and monitoring       | Angelyn            | Who may approve what, approval limits and segregation of duties, bank-detail controls, masking, audit, retention, what data may go to an AI service, observability, clickstream, AI cost and the AWS deployment                     |

## How the areas connect

- Order status lives only in area 2's state machine; area 3 reads it through agreed APIs.
- Area 3 owns the check results and the exceptions, and reports pass or fail to area 2.
- Area 4 owns the authorisation policy, which every endpoint calls; area 1 keeps the generic guard that calls it.
- Area 1 owns the whole AI pipeline; area 4 audits the AI's decisions and sets what data may go to an AI service.

P-4 brings the area guides and `docs/team/module-ownership.md`, which records each area's folders and the shared files. Story T-1 agrees a backup owner for each area and puts the GitHub usernames into `.github/CODEOWNERS`, so pull requests ask the right reviewer. Shared code (authentication, the app shell, the API client, queues, logging) belongs to area 1.
