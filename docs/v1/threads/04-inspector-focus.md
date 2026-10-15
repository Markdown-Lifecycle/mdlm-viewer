# Thread 4: Floating inspector, revision stack, and focus

## Outcome

Any requirement opens a useful floating detail box. Its historical revisions and
reviews are inspectable, and focus adds exact-applicable artifacts around the
requirement without losing decomposition structure or hierarchy state.

## Start and end

Start only after Threads 2 and 3 are merged. End with a verified feature PR against
the real adapter and graph components, not another fixture-only mockup.

## In scope

- Right-side floating box inset from canvas edges, nearly full height, resizable
  from the left with pointer/touch/keyboard and no canvas reflow; bounded size,
  close control, internal scroll, and per-project width.
- Actual requirement wording, raw body/payload access, exact identity, native
  role/component/storage/state fields. No invented acceptance/review status.
- Newest-first expandable revision stack, each revision's wording, exact applicable
  reviews/findings/context, and preserved stack state on review navigation/return.
- Review set outcome distinct from item disposition; correct historical scope.
- VFY coverage/cases, result/evidence distinction, missing/outdated context.
- Generic artifact inspector for links, reviews, verification, and source context.
- Focus projection reusing existing groups/rows/layout and exact associations:
  center only the focused REQ (no group header); left only actual immediate parents
  (no type header); right named native downstream DCPs; reviews above; verification
  below. Hide unrelated stakeholders and siblings of the focused requirement.
- Once-per-family labels `derives from`, `derives to`, `reviews`, `verifies`, with
  row endpoints and truthful source provenance. No generic repeated type titles.
- Measured balanced layout, clickable artifacts, explicit refocus, and full
  hierarchy viewport/branch/pin/selection restoration on exit.
- Historical reviews remain in the stack rather than linked to the wrong current
  revision. No source review is fabricated to fill the upper space.

## Out of scope

History page, authoring/review approval, running verification, changes to native
MDLM semantics, global graph view, and speculative tab/customization systems.

## Verify and report

Own A06–A11 plus related A13/A15. Browser-test independent selection/expansion,
resizing without reflow, long content and scrolling, two older revisions and their
review links, multiple downstream DCPs, focus refocus and return restoration.
Check a set review with an exact r2 finding while r3 is selected. Verify both
fixture and real project behavior and record which associations the source
actually contained. Provide screenshots and a short inspector/focus recording.
