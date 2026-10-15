# V1 shared fixture

`project.json` is synthetic **normalized viewer data**, not native MDLM JSON and
not evidence about Watt Watch. Some raw payloads are intentionally abbreviated;
Thread 2 must capture separate sanitized native fixtures to test the real adapter.
Do not feed this fixture to MDLM or infer native RES links from its example links.

It contains stakeholder → system → HLR → LLR → further LLR refinement, uneven
branches, shared requirements in distinct native-shaped DCPs, and three revisions
of one requirement. A review of revision 2 fails; a separate review of revision 3
passes. Each review targets a different exact RQS. It also includes a verification
specification, an observation error, a recorded pass, and unavailable evidence.
The pass is a recorded claim; missing evidence remains missing.

All event times are unknown. Import time must not replace them. Source ordering
is fixture ordering only. Source paths/digests may be null. The two software paths
are independent components; `level` metadata does not prescribe an array index.

Foundation copies/adapts this into runnable test fixtures and runtime-validates
it against `contracts/viewer.ts`. Add a second project plus separate edge-case
fixtures for long wrapping text, empty groups, invalid references/cycles, corrected
reviews, and unsupported source semantics. Do not make invalid fixture data pass
by weakening the contract or silently discarding associations.
