# MDLM Viewer

## Implementation handoff

- Read [the V1 product brief](docs/v1/PRODUCT.md), [architecture](docs/v1/ARCHITECTURE.md), and the assigned [thread brief](docs/v1/IMPLEMENTATION.md) before implementation. These documents consolidate the prototype decisions; implement the whole assigned outcome and its acceptance checks.
- The agreed reference is [docs/prototypes/v1-reference.html](docs/prototypes/v1-reference.html). Earlier `output/` experiments are superseded. Do not copy prototype-only statuses, fabricated source relationships, fixed coordinates, or depth limits into the application.
- Use the shared normalized data contract and source-backed exact revisions across every view. Coordinate contract changes before parallel work; keep one writer per task branch.
- V1 is a read-only local web application. No lifecycle authoring, MDLM execution, cloud deployment, desktop packaging, or PWA infrastructure is in scope.

## Design

- Simple is the default. Use shadcn/ui components and React Flow for the requirement graph.
- Every piece of visible text must earn its place by identifying content, enabling an action, or communicating necessary state. Remove text that merely describes the interface.
- Do not add instructional captions, explanatory subtitles, redundant page headings, group counts, or narration of the action the user just performed. Use accessible labels for controls without adding visual noise.
- Keep navigation in a quiet sidebar and the project selector at the bottom.
- Show requirements as individually selectable rows inside decomposition-group nodes. Start with one stakeholder-requirements group connected to system decomposition groups.
- Connect individual requirement rows, not just group containers. Preserve multiple-parent relationships.
- Let users independently expand and collapse downstream groups from multiple requirements. Opening one branch must not close another.
- Keep the canvas free to pan, zoom, and rearrange. Preserve the user's viewport when toggling branches; compact the automatic layout and center parent groups against their visible descendants rather than appending children at the bottom. Keep row connections attached to the actual row centers.
- Clicking a requirement opens its details in a right-hand inspector. Use a separate expand/collapse control so inspecting content does not change the graph's visible branches.
- The inspector is a floating box inset from the canvas edges, not a full-height docked pane. Resize it from its left edge without reflowing the graph.
- Show the requirement's actual text, revision/status, reviews, verification, and related artifacts in the inspector. Keep metadata tied to the exact artifact revision.
- Present requirement revisions as a newest-first expandable stack in the inspector. Each revision exposes its own wording and reviews; clearly distinguish the current revision from superseded ones. Never imply that a previous revision's review applies to the current wording.
- Offer a requirement focus mode that includes linked reviews and other artifacts omitted from the decomposition hierarchy. Returning to the hierarchy restores its expanded branches and viewport.
- In focus mode, place reviews above the requirement, verification below it, parent requirements to the left, and derived requirements to the right.
- Center related groups around the focused requirement using their measured sizes. Group repeated relationship types under one label; avoid fixed per-item coordinates and repeated type captions.
- Focus mode shows only the focused requirement in its own group and only its actual parent requirements. Preserve downstream decomposition groups. Keep meaningful group names; replace generic type headings with relationship labels on connections. Label each branch bundle once, such as "derives to", and distinguish "reviews" from "verifies".
- Omit group headers above the focused requirement and its parent requirements. Retain downstream decomposition names. Keep revision identifiers in details; focus review connections must refer to the focused revision, with historical reviews available through the revision stack.
- From the focused requirement's perspective, label incoming higher-level relationships "derives from" and outgoing decomposition relationships "derives to".
- Keep prototype data clearly identified in the surrounding handoff; do not fill the product UI with prototype disclaimers.

## Scope

The checked-in reference HTML and normalized fixture are illustrative, not a production React Flow implementation or authenticated native MDLM exports. The application is not implemented by this documentation baseline. Follow the launch order and issue links in `docs/v1/IMPLEMENTATION.md`.
