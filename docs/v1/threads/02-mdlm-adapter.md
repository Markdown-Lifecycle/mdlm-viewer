# Thread 2: Real read-only MDLM snapshots

## Outcome

The existing API serves coherent, source-backed snapshots of configured MDLM
projects, with exact history, decomposition, review, and verification associations.

## Start and end

Start after Foundation is merged, using its contract and fixture API. End with
one bounded adapter PR, sanitized native fixtures, and a real-project read-only
witness. Thread 3 may run in parallel; leave its files alone.

## In scope

- Discover/validate configured kernel and selected process without upgrading them.
- Authenticate actual read-only native JSON shapes; retain sanitized native
  fixtures separately from the illustrative viewer fixture.
- Project registry IDs → fixed configured roots/commands; no arbitrary path RPC.
- Complete consistent snapshot capture, source fingerprint, manual refresh,
  bounded retry/rejection for changing sources, and useful diagnostics.
- Exact selected RQS/REQ/DCP graph, requirement wording/EARS rendering, optional
  role/component metadata, all retained revisions and raw provenance.
- Shared DCP children, uneven depth, empty groups, invalid references/cycles.
- REV → RQS membership and exact requirement/group assessment mapping; preserve
  set-level context and historical review scope. Corrections/withdrawals retain
  their records. Never create a direct native REV → REQ link that does not exist.
- VFY specification/cases/coverage vs results/evidence; source-backed applicability,
  observation errors, missing/outdated evidence, unknown statuses.
- Normalize retained artifact/operation events for Thread 5 with real timing and
  ordering only. Unsupported source event data gets a diagnostic, not fiction.
- Preserve unknown artifact types as inspectable raw data.

## Out of scope

UI redesign, React Flow layout, running/repairing MDLM work, changing kernel or
process package, writing source projects, and generic support for unrelated older
process models. Do not touch private live project bytes to manufacture a fixture.

## Native sources and boundaries

Read ARCHITECTURE.md and the configured repositories' relevant instructions.
Use only inspection surfaces proven read-only. `list` is highest recorded, not
necessarily graph-selected/accepted. `history` alone lacks full revision content.
No proposals, settlements, upgrades, executions, registrations, or verification
runs are authorized by this task.

## Verify and report

Own adapter coverage for A01, A03–A04 data, A07 data, A10–A14. Test one REQ r2
reviewed in an old RQS while r3 is selected, shared children, native set-level
review findings, missing evidence, and an interrupted source read. Show a real
project import and before/after hashes/status for lifecycle/product/review/execution
state. Document exactly which packages/commands were exercised and remaining
source limitations. Any limitation preventing the agreed V1 is unresolved work,
not a completed adapter hidden behind fixtures.
