# Domain context

MDLM stores versioned lifecycle artifacts in Git-backed repositories. The viewer
reads those records; it does not run the lifecycle or become its source of truth.
See [the V1 brief](docs/v1/PRODUCT.md) for agreed behavior and
[architecture](docs/v1/ARCHITECTURE.md) for inspected integration boundaries.

- **REQ:** one requirement identity with immutable historical revisions. Its
  software role can be system, high-level (HLR), or low-level (LLR); branches may
  have uneven depth. Stakeholder requirements describe user intent/constraints.
- **DCP:** an exact parent requirement and its immediate child requirements.
  This is the native decomposition group behind a graph box, not an arbitrary
  visual category. Shared children retain one source identity.
- **RQS:** an exact selected requirement graph, including REQ and DCP revisions.
  This selection is not synonymous with highest revision or stakeholder acceptance.
- **REV:** a review of an exact subject, often an RQS. Requirement/group findings
  carry the context needed to associate a set review with a particular requirement.
- **VFY:** a verification definition with cases/coverage. Recorded results and
  evidence are separate; a VFY link alone never proves passing behavior.
- **Hierarchy:** the project's decomposition graph, with independently opened
  branches and per-requirement row connections.
- **Focus:** a neighborhood of one exact requirement, keeping downstream groups
  and adding applicable reviews/verification. It does not change source data.
- **History:** recorded artifact changes and operations. It is not live agent state.
- **Snapshot:** one coherent viewer read of a project and its selected process.
  Its import time is not the time its artifacts were created.

The checked-in prototype and JSON fixture use illustrative data. They establish
presentation and integration cases, not native schema truth or product results.
