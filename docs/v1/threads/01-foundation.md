# Thread 1: Local foundation and shared contract

## Outcome

A new checkout can install dependencies and launch a local React application and
read-only API, switch fixture projects from the sidebar footer, and share one
validated data contract with the later features.

## Start and end

Start from the documentation baseline on `main`. End with a runnable, verified PR
plus exact module entry points and commands that Threads 2 and 3 can consume.
The app is fixture-backed at this stage; say so in the handoff, not with a graph
banner. Do not present this as the completed viewer.

## In scope

- React/TypeScript/Vite/npm, shadcn/ui shell, React Flow dependency, local Node API.
- Pin tested toolchain, lockfile, one verify command, and proportional CI.
- Install `docs/v1/contracts/viewer.ts` into `src/shared/`; runtime-validate it.
- Use the supplied fixture, add a second project, and cover absent/invalid data.
- Implement the API envelopes and fixture snapshot provider from ARCHITECTURE.md.
- Stable entry points for Requirements, History, inspector selection, and the
  snapshot/project provider. Requirements/History content can be minimal stubs.
- Per-project state container and request-generation protection for switching and
  refresh. Do not add graph business logic to shell state.
- Local `.viewer/projects.json` configuration example, gitignore behavior,
  documented dev/build/serve/verify commands, light/dark appearances.
- Browser shell smoke test, schema/identity/ref-integrity checks, and API failure
  states. Keep fixture mode explicit in developer configuration/source metadata.

## Out of scope

Real MDLM parsing, final graph/layout, inspector/focus implementation, History
content, cloud/PWA/native packaging, and speculative state/plugin frameworks.

## Contract handoff

Document installed types and file paths. Keep the proposed contract shape unless
an actual integration need requires a change; update docs/fixtures together and
explain the reason. The API must expose exact revisions and associations rather
than a tree of nodes that prevents shared paths or historical inspection.

## Verify and report

Cover the shell portions of A01, A13, A15. Ensure build and local serve work,
client fetches the API, project switching is isolated, and errors are visible.
Provide screenshots of the shell and list the deliberately unfinished features.
Thread 1 is done when the next two threads can implement independently against a
working shared seam, not merely when dependencies install.
