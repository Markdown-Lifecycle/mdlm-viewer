# V1 architecture and integration

These are implementation defaults chosen to make the agreed design buildable.
They are not claims that a live integration has already been tested.

## Runtime

- React + TypeScript + Vite, npm, shadcn/ui, and React Flow (`@xyflow/react`).
- A small TypeScript Node service serves a read-only API to the local application.
  Vite proxies that API during development; the service serves the built client
  for a local production smoke test. Bind to loopback by default.
- Vitest for fast behavior tests; Playwright for a small set of real interaction
  and layout checks. One `npm run verify` command runs the required checks.
- Pin the tested toolchain in `.mise.toml`, commit `package-lock.json`, and pin CI
  actions to exact commits. Use GitHub-hosted `ubuntu-latest` runners.
- Use a measured layered layout. The canvas thread owns selecting a maintained
  layout implementation and documenting why it handles grouped row ports, shared
  requirements, and pins. Do not add multiple layout engines or duplicate graph
  models to explore alternatives in production.

Suggested module ownership (foundation creates the actual scaffolding):

| Path | Owner |
| --- | --- |
| `src/shared/` | Contract, runtime validation, selectors shared across features |
| `src/server/` | Local registry, read adapter, snapshot API, source diagnostics |
| `src/client/app/` | Shell, routing, project/snapshot state |
| `src/client/features/requirements/` | Hierarchy graph, row nodes, layout, expansion |
| `src/client/features/inspector/` | Floating box, revisions, artifact navigation |
| `src/client/features/focus/` | Focus projection reusing requirement graph pieces |
| `src/client/features/history/` | Combined artifact/operation list |
| `tests/fixtures/` | Synthetic and sanitized native fixtures, clearly identified |

Use one normalized snapshot and one identity model across all views. Per-feature
state can be ordinary React state/context; do not introduce a state framework
unless the foundation needs it for a concrete shared-state seam.

## Project access

A viewer-owned, gitignored `.viewer/projects.json` registry records an explicit
project ID, display name, lifecycle repository root, and configured kernel command.
Commit only a configuration example with placeholder paths. Do not scan the disk,
copy credentials, or add files to the project being viewed. V1 configuration may
be edited in a file; an add-project wizard is deferred.

The service accepts configured project IDs, not arbitrary browser-supplied paths
or commands. Run the fixed configured executable with argument arrays, no shell
interpolation. The CLI must run in the lifecycle repository, not the product
source repository. Viewer cache/receipts belong under `.viewer/`, not `.lifecycle`.
A normal browser cannot read an arbitrary project directory: the local service is
part of the V1 deliverable, not an optional integration left for later.

Use ordinary local-app precautions: loopback binding, same-origin API, explicit
allowlisted projects, and safe Markdown rendering (no raw executable HTML). There
is no authentication, remote server, or broad filesystem/command API in V1.

## Native source facts checked for this handoff

Checked local checkouts on 2026-10-15:

- Kernel `9ef7cfa6134c55e8e03d2d8334daccb02151139e`.
- Process package `06e6a28eda60c6ee471bec426aff3424fe7646ea`.

These identify inspected code, not required globally installed versions. A real
project retains its selected package; do not upgrade it to match these checkouts.
The adapter must verify its configured kernel and selected process before reading.

Relevant source locations, relative to those repositories:

| Source | Fact |
| --- | --- |
| `mdlm-kernel/operator/MDLM.md` | `history`, exact `show`, `backlinks`, and bounded `trace` inspection commands |
| `mdlm-kernel/src/command-application.ts` | `list --json`, `show --json`, `history --json`, `process show --json`, and their actual envelopes |
| `mdlm-kernel/src/lifecycle-repository.ts` | `list` chooses the highest recorded revision per stable identity; `history` lists revisions, not their full content |
| `mdlm-process-package/iterative/types/REQ.yaml` | `stakeholder`/`software` kinds; optional `system`/`high-level`/`low-level`; HLR/LLR component metadata |
| `mdlm-process-package/iterative/types/DCP.yaml` | One exact parent REQ; zero or more exact child REQs |
| `mdlm-process-package/iterative/types/RQS.yaml` | Exact `contains`, `decomposition`, and `retires` relationships define the selected requirement graph |
| `mdlm-process-package/iterative/types/REV.yaml` | `reviews` targets RQS/IMP/CHG/VFY; per-requirement and per-decomposition assessments carry exact finding context |
| `mdlm-process-package/iterative/types/VFY.yaml` | Verification definitions have cases, coverage, authoring/source context; they are not execution results |
| `mdlm-process-package/iterative/skills/typed-requirements.md` | Useful uneven depth and shared requirements; no compulsory tier filling |

Support the inspected REQ/DCP/RQS process model first, including packages with
optional level metadata absent. Detect unsupported package models and retain raw
artifacts/diagnostics; do not silently reinterpret old SYS/DWP models. Generic
support for arbitrary process packages is deferred.

## Read adapter and coherent snapshots

Use supported kernel inspection surfaces. Start by authenticating actual JSON
shapes with retained native fixtures; do not parse terminal prose or implement
another Markdown lifecycle parser. The allowlisted V1 inspection operations are
`list`, exact `show`, `history`, `backlinks`, bounded normal `trace`, `schema`, and
`process show`, all with `--json`. Use only the subset needed after proving it is
read-only in the configured version. A direct supported inspection-library API
is acceptable if it preserves the same semantics and is pinned.

Never invoke init, proposal, execution, review registration, settlement, upgrade,
or verification execution commands. Do not launch work to fill missing evidence.
If an inspection has side effects, replace that path or report the integration
limitation; the viewer may not mutate the inspected project.

`list` alone is not a current requirement selection. Resolve the selected RQS from
native package semantics when available; otherwise use the latest recorded RQS
as an explicitly identified selection, not an accepted baseline. Follow its exact
`contains`/`decomposition` references. Historical revision inspection must never
resolve a stable ID to today's latest revision. Show unselected latest revisions
in their lineage details without mixing them into the selected graph.

A multi-command import must observe one repository cut. The adapter thread owns a
bounded consistency mechanism, for example an immutable read capture or a digest
of all relevant lifecycle/package inputs verified before and after inspection.
Git HEAD alone is insufficient when current lifecycle data can be uncommitted.
Publish only a complete validated snapshot. If the source changes, retry a bounded
number of times or return a source-changing diagnostic; keep the previous complete
snapshot visibly stale rather than combining two generations.

A snapshot has an identity, source digest/cut, package reference, capture time,
and diagnostics. Capture time is never an artifact's creation time. Requesting
refresh reads a new snapshot; client responses are keyed by project and snapshot
so a slow old request cannot overwrite another project or newer refresh.

## Normalization contract

[`contracts/viewer.ts`](contracts/viewer.ts) is the proposed cross-thread contract.
Thread 1 copies it into `src/shared/`, adds runtime validation, and owns any
necessary coordinated change before parallel threads start. The fixture in this
folder is normalized illustrative data, not an authentic native export.

- Preserve raw datum payload, body, typed links, exact revision ID, stable ID,
  process/source provenance, and relevant projections. Unknown types remain
  inspectable instead of disappearing.
- Requirement text may need rendering from `payload.statement` or EARS fields.
  A title is not a statement. Use package semantics, not a generic grammar guess.
- A selected graph identifies exact RQS, REQ, and DCP revisions. Highest/latest,
  selected, frozen, accepted, reviewed, and verified remain independent.
- Review applicability is a derived index with its explicit source path: REV →
  RQS plus exact membership/assessment; REV → IMP/VFY is not automatically a
  requirements-content review. Preserve set-level outcome and per-item finding
  separately. Do not aggregate unrelated findings into the selected REQ verdict.
- Verification applicability is grounded in exact cases/coverage/targets and source
  context. Record the path and keep VFY definitions separate from RES/evidence.
  Never invent a direct native `verifies` link if applicability is a projection.
- Historical revisions and their associations are available in the same snapshot.
  Missing/corrected/withdrawn records retain their identities and native links.
- Operations/events use recorded inputs, outputs, ordering, and timestamps only.
  Unsupported operation data is a bounded diagnostic, not fabricated activity.

API surface:

- `GET /api/projects` → `{ projects: ProjectSummary[] }`.
- `GET /api/projects/:projectId/snapshot` → complete `ProjectSnapshot`.
- `POST /api/projects/:projectId/refresh` → newly read complete `ProjectSnapshot`;
  this mutates only viewer-owned cache, never MDLM. Serialize/coalesce per-project
  refreshes and reject superseded client responses.
- Non-2xx errors use `{ error: { code, message, retryable } }`. Return useful
  unavailable/unsupported/invalid-source distinctions without leaking secrets.

V1 may return the complete normalized snapshot, including history, rather than
prematurely adding pagination/lazy RPCs. Keep evidence blobs out of that response;
use retained evidence references and bounded text previews. Large/binary evidence
browsing is deferred. Do not copy private live project data into committed fixtures.

## Layout and identity

Graph state and source data are separate. A node occurrence key includes the exact
DCP revision/path plus row requirement revision. The same REQ can appear in several
groups, but the inspector always opens the single exact source artifact.

Expansion is a set of visible requirement occurrences/paths with reachability,
not one global `expandedRequirement` variable. Removing one route cannot hide a
shared group reachable through another. Cycle detection and unresolved references
produce diagnostics. Do not equate the requirement's semantic level with its
numerical graph depth.

Focus is another projection of the same snapshot. Reuse group/row rendering,
handles, inspector, and artifact associations. Keep enough provenance on projected
edges to open the source RQS/REV/VFY context. Use view-specific bundle labels
without rewriting native link direction.

## Verification and release boundary

Adapter checks include native JSON fixtures, multiple snapshots/revisions, RQS
selection, historical review scoping, verification definition/result separation,
and source-change rejection. Use a before/after filesystem/Git witness to establish
read-only behavior on a real configured project.

Graph checks cover shared-path collapse, arbitrary useful depth, measured ports,
nonoverlap, pins, and state restoration. Browser checks cover the actual app,
including inspector resize with pointer/keyboard, focus links, revision review
navigation, project switching, refresh races, and History.

No cloud preview or deployment is required for this local-only V1. Provide a local
preview and screenshots/short interaction evidence for UI PRs. Do not introduce
cloud infrastructure solely to satisfy a deployment pipeline designed for hosted
applications. A public/hosted edition would be a separate authorized scope.
