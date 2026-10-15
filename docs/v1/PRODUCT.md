# MDLM Viewer V1

Status: agreed design from Taylor's prototype session on 2026-10-15. This defines
the first implementation, not a claim that the prototype already implements it.
Later explicit user decisions supersede this document.

## Outcome and scope

Open a local MDLM project and understand what its requirements say, how they
decompose, which exact revisions have reviews and verification, and how that
state came together. Follow a requirement from stakeholder intent through useful
software detail without reading a directory of lifecycle Markdown by hand.

V1 is a local web application with a read-only local service. Desktop packaging,
PWA installation, and hosted deployment are deferred. It must work end to end with
real MDLM data, not stop at a polished mock-data screen.

In scope:

- Several explicitly configured local projects, switched from the sidebar footer.
- Requirements as the default view, using React Flow directly in that view.
- Arbitrary useful decomposition depth, shared requirements, and uneven branches.
- Independently expandable branches, measured layout, pan, zoom, and fit.
- A floating, resizable requirement/artifact inspector with revision history.
- Requirement focus mode with reviews and verification added around its graph.
- One History view combining artifact changes and recorded MDLM operations.
- Exact revision identity, source context, and honest missing/outdated evidence.
- Manual refresh that installs a coherent new snapshot without mixing revisions.

Out of scope:

- Editing requirements, approving reviews, running agents or verification,
  changing project lifecycle state, or accepting a baseline.
- A separate Activity page, Connections page, metrics dashboard, global graph of
  every artifact, and notifications.
- Accounts, multi-user collaboration, cloud hosting, background polling,
  automatic project discovery, native wrappers, and offline/PWA infrastructure.
- An impact-analysis engine, a source-code browser, and arbitrary snapshot diffs.
  Exact source references and existing recorded relationships remain visible.

## Shell and visual language

Use React, TypeScript, shadcn/ui components, and React Flow. Keep the design quiet,
neutral, and compatible with light and dark appearances. Use ordinary component
defaults rather than developing a new design system.

The left sidebar contains Requirements and History. The project selector sits at
the bottom. Switching projects preserves the selected top-level view; graph
selection, expansions, viewport, and inspector state stay scoped to their project.
First visits open the initial hierarchy. Refresh must not keep a selection that
no longer exists; make that change apparent without inventing a replacement.

Every visible word must identify content, enable an action, or communicate
necessary state. Omit redundant page titles, explanatory subtitles, group counts,
action narration, debug identities, and prototype disclaimers from the graph.
Use accessible names for icon controls. Reveal exact IDs and detailed metadata in
the inspector. Meaningful decomposition names earn their place.

## Hierarchy

Start with one stakeholder box containing individually selectable stakeholder
requirements, connected to the first level of decomposition-group boxes. Each
box contains its own requirement rows. Deeper groups extend toward the right;
the canvas is free to pan in both directions rather than a fixed column wizard.

Use the project's actual DCP membership. The stakeholder box is a viewer grouping;
it is not a fabricated MDLM artifact. A DCP has one exact parent and zero or more
exact children. A child may belong to several groups. Show it in each relevant
group as the same requirement identity; selection/reviews/history refer to that
shared revision, never to separate copies. Use unique view-occurrence IDs for
React Flow handles. Do not merge separate DCPs merely because their titles match.

The current prototype's system boxes are illustrative and do not establish native
DCP membership. Real mapping is specified in ARCHITECTURE.md.

Each expandable requirement has a separate +/− control. Clicking its text opens
details; clicking the control toggles downstream groups. Multiple branches stay
open simultaneously. Collapse removes only occurrences no longer reachable from
another open path. Selecting a requirement must not change expanded branches.

Requirements can be stakeholder, system, software high-level (HLR), or software
low-level (LLR), and can refine further. These roles are metadata, not four fixed
columns or compulsory tiers. Do not synthesize an HLR or LLR to fill a column.
Stop at actual leaves. Preserve component metadata when it exists.

### Layout

- Measure rendered group and row dimensions. Attach edges to actual row centers.
- Keep groups at comparable depth in coherent left-to-right ranks, preserving
  parent/child order and avoiding overlaps and unnecessary crossings.
- Center parents against their visible descendants; compact unused vertical
  space when branches close. Normalize the layout toward the top of the canvas.
- Do not append newly opened groups after all existing groups without considering
  their parent. Do not hard-code offsets for a single example's row count.
- Preserve the viewport on branch changes. Auto-layout may reposition automatic
  nodes; manual moves persist until an explicit layout reset. Treat manually moved
  groups as pinned obstacles rather than silently overwriting their positions.
- Support dragging groups, panning, zooming, and fitting the current graph.
- Handle empty groups, long/multiline statements, shared children, and large
  expanded branches. Expose malformed/cyclic source relationships as diagnostics;
  do not loop forever or quietly manufacture a tree.

## Floating inspector

Open a box over the right side of the canvas. Inset it a little from the top,
right, and bottom; it should occupy nearly the canvas height without becoming a
full-height dock. It does not shrink or reflow the graph. Resize horizontally from
its left edge, within usable minimum and viewport bounds. Include a close control,
keyboard resizing, touch support, and internal scrolling for long content.

For a requirement, show:

- Useful title and the actual statement, not just its graph label. Render software
  EARS data using MDLM's semantics and preserve the original payload/body too.
- Exact revision ID, kind/level/component when supplied, and source-backed state.
- Newest-first revision stack, with the selected/current revision and superseded
  revisions distinguished. Expand an entry to see its own wording and reviews.
- Review outcome, findings, per-requirement/per-group assessment, rationale, and
  reviewed context. A set-level review is not automatically a direct requirement
  review; retain the RQS/assessment path through which it applies.
- Verification specification, coverage/cases, recorded results and evidence when
  available. A specification is not an execution or a pass result.
- Related artifacts and source references, navigable in this same inspector.

Current selection, highest recorded revision, frozen/editable storage, review
outcome, verification result, and stakeholder acceptance are separate facts. Never
collapse them into an invented `Accepted` or `Passed` badge. Missing fields or
unavailable evidence are unknown/unavailable, not negative product results.

Prior reviews remain attached to the exact revisions reviewed. If the current
revision has no review, show that concisely. Do not relabel a historical review as
current or invent an in-progress review. Preserve the revision-stack expansion
when navigating into a review and back.

## Requirement focus mode

Enter from the inspector. Replace the broad hierarchy with a focused neighborhood,
using the same decomposition-group presentation and the same underlying data.

- Center: only the focused requirement, with no group/type header above it.
- Left: only its actual immediate parents, grouped as appropriate but without a
  stakeholder or higher-level type header. Omit unrelated parents and siblings.
- Right: its immediate downstream decomposition groups, retaining meaningful group
  names and their real member rows. Do not flatten them into one generic list.
- Above: reviews applicable to this exact revision, including set-review context.
- Below: verification artifacts applicable to this exact revision. Distinguish
  specifications, results, and supporting evidence when inspecting them.
- Label the incoming relationship bundle `derives from`; label outgoing
  decomposition bundles `derives to` once across the outgoing family, not on each
  parallel edge. Use `reviews` and `verifies` for the appropriate artifact links.
  Keep direction readable and the individual requirement endpoints intact.
- Omit repeated generic type titles. Use measured sizes and balanced spacing;
  reviews and verification bracket the focused item, not the top of one arbitrary
  list. Labels must not collide with nodes or conceal unrelated edges.
- All visible requirements/artifacts open their details. Focusing a different
  requirement explicitly changes the neighborhood. Inspecting it alone does not.
- Returning to Hierarchy restores its project, expansions, pins, viewport, zoom,
  and prior selection. Inspector width remains a preference for that project.

Do not draw a current-review edge for an older revision. Historical reviews are
available in the detail stack. A review may reference a whole RQS: represent it
with truthful provenance, not a fabricated source `REV → REQ` link.

## History

One sidebar destination covers both “what changed” and “what ran.” Show a compact,
ordered list of requirement/artifact revisions, reviews, verification results, and
recorded operations available from the project. Selecting an event opens its exact
artifact or operation details in the floating inspector.

Keep timestamps, source ordering, and causal links distinct. Unknown timing stays
unknown; do not use an import timestamp or file mtime as an event time. Show why
an operation produced or consumed an artifact only when the source records it.
Never infer current running/idle state from the last recorded event. Live agent
monitoring is deferred.

## Acceptance scenarios

These IDs are the shared definition of V1 done. Focused tests should protect the
data semantics; browser checks should cover interaction and layout.

| ID | Scenario and required result |
| --- | --- |
| A01 | Launch locally with documented commands; open a configured real MDLM project and switch between two projects without leaking selection or snapshot data. |
| A02 | Initial graph contains stakeholder rows and native first-level DCP groups; row endpoints identify exact requirements. |
| A03 | Expand system → HLR → LLR and an additional same-level refinement; no hard-coded depth limit or mandatory empty tiers. |
| A04 | Keep three branches open; collapse one shared path without hiding a group/requirement still reachable through another. |
| A05 | Render wrapped titles and unequal group heights without overlapping nodes or detached edges; compact on collapse and preserve viewport/manual pins. |
| A06 | Inspect any row without toggling it; resize the floating box from the left with pointer and keyboard; graph dimensions remain unchanged. |
| A07 | Inspect current wording and two historical revisions; open each revision's own review, findings, and context, then return to the expanded stack. |
| A08 | Enter focus: hide siblings/unrelated parents, retain named downstream DCPs, show exact-applicable reviews above and verification below with one directional bundle label. |
| A09 | Inspect linked artifacts in focus, then return to the hierarchy with branches, pins, zoom, and viewport restored. |
| A10 | A review of an RQS covering REQ r2 never appears as review of REQ r3 unless the exact selected r3 is actually included/assessed. Set verdict and individual finding remain distinct. |
| A11 | Verification specification, passing/failing result, observation error, missing evidence, and outdated evidence are distinguishable; no status is synthesized from graph connectivity. |
| A12 | History events open exact revisions/operation records, preserving recorded ordering, timestamps, input/output links, and unknown values. |
| A13 | Loading/empty/unsupported/error/refresh states are usable. A changing project cannot yield a mixed-generation snapshot; stale requests cannot overwrite a new project. |
| A14 | Real project before/after checks show no lifecycle, product, Git-index, review-registry, or execution-state mutations. No kernel commands run work. |
| A15 | Browser evidence covers light/dark, a desktop and tablet viewport, long content, multiple groups, shared paths, and inspector/focus/history behavior. Controls have accessible names and focus visibility. |

## Reference boundaries

[The reference prototype](../prototypes/v1-reference.html) captures the visual and
interaction direction. It is not React Flow, is not connected to MDLM, uses
fabricated IDs/reviews/statuses, and implements limited-depth fixture behavior.
It contains old CSS and fixed-coordinate assumptions that must not become the
production architecture. The documented criteria supersede those shortcuts.
