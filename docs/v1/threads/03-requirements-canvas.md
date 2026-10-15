# Thread 3: Grouped React Flow requirements hierarchy

## Outcome

The Requirements page is an interactive grouped graph that can follow a real MDLM
requirement selection through any useful depth while preserving shared paths.

## Start and end

Start after Foundation is merged. Use its contract and shared fixture. The adapter
thread can run in parallel. End with a verified grouped-canvas PR and documented
components/selectors that the inspector/focus thread can reuse.

## In scope

- One stakeholder box plus actual DCP-group nodes and per-row React Flow handles.
- Meaningful group titles; no repetitive counts/captions/page headings/debug IDs.
- Exact source identity separate from unique graph occurrence identity.
- Independent +/− controls, separate row inspection callback, multi-branch expansion,
  reference-aware collapse, and shared requirements in multiple DCPs.
- Arbitrary traversal depth, HLR/LLR metadata when supplied, uneven branches and
  valid leaves. No fixed column count, fabricated tier, or synthetic DCP membership.
- Measured layered layout, row-center ports, long statements, no group overlap,
  centered parents, upward compaction, pins/manual moves, viewport preservation.
- Pan, zoom, fit, accessible row/expansion controls, mouse/touch behavior.
- Data loading/empty/diagnostic states integrated with the existing project provider.
- Reusable group/row rendering, layout, edge bundle labels, and selection interfaces
  for Thread 4. Keep source normalization outside this feature.

## Out of scope

Real adapter code, inspector contents, revision UI, focus projection, History,
new wire formats, and production changes in the MDLM kernel/process repositories.
Do not copy the prototype's manual DOM/SVG rendering or fixed coordinate logic.

## Verify and report

Own A02–A05 and graph portions of A13/A15. Prove system → HLR → LLR → extra
refinement, three simultaneous branches, shared-path collapse, variable row
heights, pins, and stable viewport. Verify actual React Flow ports with rendered
measurements, not just a screenshot of one static fixture. Provide a short
interaction recording and light/dark desktop/tablet screenshots. Document any
layout library choice and its measured grouped-port behavior in the PR.
