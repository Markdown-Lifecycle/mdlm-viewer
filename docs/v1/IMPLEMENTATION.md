# Launching the V1 implementation

This is a prepared work queue. No implementation threads were launched by the
design session. Taylor starts each thread when ready; do not launch more ordinary
threads merely because these task briefs exist.

## Order

| Thread | Deliverable | Start after | Main ownership |
| --- | --- | --- | --- |
| [1: Foundation](threads/01-foundation.md) | Runnable local shell, typed contract, fixture API, checks | This documentation baseline | Scaffolding, shared contract, shell |
| [2: MDLM adapter](threads/02-mdlm-adapter.md) | Real read-only snapshots and exact associations | 1 merged | Server/normalization |
| [3: Requirements canvas](threads/03-requirements-canvas.md) | Grouped React Flow hierarchy through arbitrary depth | 1 merged; parallel with 2 | Requirements graph/layout |
| [4: Inspector and focus](threads/04-inspector-focus.md) | Floating details, revisions/reviews, grouped focus | 2 and 3 merged | Inspector/focus, graph integration |
| [5: History and V1 closure](threads/05-history-integration.md) | History, real-project verification, complete V1 handoff | 4 merged | History, integration, evidence |

Implement one independently verifiable outcome per issue/PR. Task-specific
in/out-of-scope lists and acceptance checks are in each brief. All five are V1;
the split is delivery order, not a proposal to cut the later work.

Each new thread uses its own worktree off the stated merged base, not the shared
design checkout. Do not start a dependent task from old `main` and guess missing
interfaces. If Taylor chooses stacked branches instead, explicitly identify the
predecessor branch/commit and PR base in the new thread before editing.

Threads 2 and 3 must share Thread 1's exact installed contract/fixture/API. Neither
changes it independently. Raise a concrete incompatibility and make one coordinated
contract adjustment; do not invent feature-specific wire formats or duplicate
mock models. Foundation's placeholder requirement/history pages are replaced by
the feature owners; its router already imports their stable entry points.

## Copy/paste launch prompts

Each prompt identifies its issue; [the issue index](ISSUES.md) is the queue.
These prompts intentionally do not start another thread automatically.

### Thread 1

> Issue: https://github.com/Markdown-Lifecycle/mdlm-viewer/issues/1
>
> Implement MDLM Viewer V1 Thread 1 (Foundation). Read AGENTS.md, the GitHub issue
> and its latest comments, docs/v1/PRODUCT.md, docs/v1/ARCHITECTURE.md,
> docs/v1/contracts/viewer.ts, and docs/v1/threads/01-foundation.md. Start an isolated
> worktree from origin/main containing this documentation. Build the bounded
> outcome, verify it, and deliver a review-ready PR with the fixture shell evidence.
> This is implementation, not another design exercise. Do not merge or deploy.

### Thread 2

> Issue: https://github.com/Markdown-Lifecycle/mdlm-viewer/issues/2
>
> Implement MDLM Viewer V1 Thread 2 (MDLM adapter). Read AGENTS.md, the GitHub issue
> and latest comments, docs/v1/{PRODUCT,ARCHITECTURE,IMPLEMENTATION}.md, and
> docs/v1/threads/02-mdlm-adapter.md. Confirm Thread 1 is merged and identify its
> installed contract and commands before editing. Use an isolated worktree from
> that merged main. Implement real read-only project snapshots, test exact revision
> associations, retain a real-project no-mutation witness, and deliver a review-ready
> PR. Coordinate with the canvas thread only through the shared contract. Do not
> mutate lifecycle data, run MDLM work, merge, or deploy.

### Thread 3

> Issue: https://github.com/Markdown-Lifecycle/mdlm-viewer/issues/3
>
> Implement MDLM Viewer V1 Thread 3 (Requirements canvas). Read AGENTS.md, the
> GitHub issue and latest comments, docs/v1/PRODUCT.md, docs/v1/ARCHITECTURE.md,
> docs/v1/threads/03-requirements-canvas.md, and the agreed reference prototype.
> Confirm Thread 1 is merged; use its installed contract and fixture in an isolated
> worktree from that merged main. Build the grouped React Flow hierarchy, including
> shared paths, useful depth, measured row ports, pins, and independent expansion.
> Verify in the browser and deliver a review-ready PR with interaction evidence.
> Do not build a separate mock model, redesign the UI, merge, or deploy.

### Thread 4

> Issue: https://github.com/Markdown-Lifecycle/mdlm-viewer/issues/4
>
> Implement MDLM Viewer V1 Thread 4 (Inspector and focus). Read AGENTS.md, the
> GitHub issue and latest comments, docs/v1/PRODUCT.md, docs/v1/ARCHITECTURE.md,
> docs/v1/threads/04-inspector-focus.md, and the agreed reference prototype.
> Confirm Threads 2 and 3 are merged. In an isolated worktree from that merged main,
> implement the floating inspector, exact revision/review stack, artifact navigation,
> and grouped focus projection using the existing normalized snapshots and graph
> components. Verify all assigned scenarios against fixtures and real MDLM data.
> Deliver a review-ready PR with evidence. Do not merge or deploy.

### Thread 5

> Issue: https://github.com/Markdown-Lifecycle/mdlm-viewer/issues/5
>
> Implement MDLM Viewer V1 Thread 5 (History and V1 closure). Read AGENTS.md, the
> GitHub issue and latest comments, all docs/v1 product/architecture documents,
> and docs/v1/threads/05-history-integration.md. Confirm Thread 4 and its dependencies
> are merged. In an isolated worktree from that merged main, implement History,
> integrate project refresh/error states, and finish the entire A01–A15 acceptance
> matrix. Fix in-scope integration failures; don't merely list them. Deliver a
> review-ready PR, reproducible local launch instructions, and an honest evidence
> record distinguishing fixture, real-project, and unverified coverage. Do not merge
> or deploy.

## Every thread's handoff

- Exact base/head commit, issue and PR link, commands, checks, browser evidence,
  and remaining acceptance coverage.
- Follow the repo/house PR review workflow, including `babysit-pr` when opening
  a PR. Link the PR to its T3 thread. Do not claim optional reviewer apps ran if
  they are not installed for this organization.
- UI changes have local preview screenshots and a short recording when behavior
  is clearer in motion. Do not publish private source/data in evidence.
- Run `npm run verify` after Foundation establishes it. Use focused tests first;
  add checks for concrete unresolved concerns rather than repeating every layer.
- No automatic merge, hosted deployment, hardware action, or lifecycle mutation.
  Report required approval at the finished, reviewable PR boundary.
