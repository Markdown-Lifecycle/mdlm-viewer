# Thread 5: History and complete V1 integration

## Outcome

History explains recorded project changes and operations, and the entire V1 is
ready for Taylor to run locally against real projects with reviewable evidence.

## Start and end

Start after Thread 4 and its dependencies are merged. End with a History/integration
PR, a reproducible local runbook, and a completed A01–A15 evidence matrix. Do not
stop after a new page compiles while the remaining V1 scenarios are unverified.

## In scope

- One compact History list covering exact artifact revisions, reviews, verification
  results, and recorded operations from the normalized snapshot.
- Click-through to exact revision or operation details in the floating inspector,
  including recorded inputs/outputs, timestamps/order and source provenance.
- Unknown time/causality and unavailable operation data remain explicit; no last
  event → currently running inference or fabricated activity timestamps.
- Verify project-switch state isolation, manual refresh, source-change failures,
  empty/loading/unsupported states, stale response cancellation, and diagnostics.
- Full real-project end-to-end checks, fixture edge cases, layout/accessibility
  fixes for observed in-scope failures, and README/local configuration/run commands.
- Complete the acceptance matrix with exact test/recording/source evidence and
  honest limits. Fix in-scope regressions in the feature seam that owns them.

## Out of scope

Cloud/PWA/native distribution, notifications/polling, agent execution, lifecycle
mutations, new product features, and speculative hardening/refactoring.

## Verify and report

Own A12 and closure of A01–A15. Run the repo verify command and the bounded browser
suite. Use at least one real configured project with retained history/reviews and
fixture coverage for branches/levels or evidence states absent in that project.
Use two real projects if available; otherwise identify the second-project smoke as
fixture-backed rather than claiming multi-project live coverage. Retain before/
after no-mutation witnesses for inspected repositories.

Write `docs/v1/VALIDATION.md` with fixture vs native vs UI evidence, commands,
checked commits/package identities, screenshots/recording paths, and any genuinely
unverified scenario. Any missing required implementation remains open; do not
mark the whole V1 complete because CI passed. Hand Taylor the PR plus local launch
instructions. Do not merge or deploy.
