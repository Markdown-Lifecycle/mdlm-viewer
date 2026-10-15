# MDLM Viewer

A read-only view of an MDLM project's requirements, decomposition, reviews,
verification, and history.

The V1 design is agreed; implementation has not started. There is no runnable
React application or live MDLM integration yet.

- [V1 product brief and acceptance criteria](docs/v1/PRODUCT.md)
- [Domain context](CONTEXT.md)
- [Architecture and MDLM integration](docs/v1/ARCHITECTURE.md)
- [Implementation threads and launch prompts](docs/v1/IMPLEMENTATION.md)
- [Shared data contract](docs/v1/contracts/viewer.ts)
- [Illustrative integration fixture](docs/v1/fixtures/project.json)
- [Agreed visual reference](docs/prototypes/v1-reference.html)

Open the reference HTML in a browser to explore the interactions. It uses sample
data and hand-built graph rendering. Its visual decisions are the reference;
its data, positioning code, and simulated lifecycle semantics are not the
production implementation.

The earlier `output/` experiments are superseded by this reference and the V1
brief. Follow [AGENTS.md](AGENTS.md) for design and delivery rules.
