/** V1 handoff contract. Thread 1 installs/runtime-validates this in src/shared. */
export type RevisionId = string;
export type StableId = string;
export interface SourceRef {
  path: string | null; // Source-relative locator, not an unrestricted file API.
  digest: string | null;
  processRef: string;
}
export interface ArtifactRevision {
  id: StableId;
  revisionId: RevisionId;
  revision: number;
  type: string;
  title: string;
  body: string;
  payload: Record<string, unknown>;
  links: { type: string; target: string }[];
  source: SourceRef;
  storage: "frozen" | "editable" | "unknown";
  recordedAt: string | null;
}
export interface RequirementView {
  revisionId: RevisionId;
  kind: "stakeholder" | "software";
  level: "system" | "high-level" | "low-level" | null;
  component: string | null;
  statement: string; // Actual rendered statement, never a fallback title.
}
export interface DecompositionView {
  revisionId: RevisionId; // The exact native DCP, not a synthetic category.
  parent: RevisionId;
  children: RevisionId[];
}
export interface RequirementSelection {
  requirementSet: RevisionId;
  basis: "package-projection" | "latest-recorded-requirement-set";
  requirements: RevisionId[];
  decompositions: RevisionId[];
}
export interface AssociationPath {
  from: RevisionId;
  relation: string; // Native link or named projection/payload path.
  to: RevisionId;
  source: "link" | "payload" | "projection";
}
export interface ReviewAssociation {
  review: RevisionId;
  requirement: RevisionId;
  reviewedSubject: RevisionId; // Often RQS, not the requirement itself.
  applicability: "requirement-assessment" | "group-assessment" | "set-membership";
  group: RevisionId | null;
  outcome: string | null; // Native set/subject outcome, not an invented REQ status.
  disposition: string | null; // Exact native assessment disposition when present.
  rationale: string | null;
  path: AssociationPath[];
}
export interface VerificationAssociation {
  requirement: RevisionId;
  specification: RevisionId;
  results: RevisionId[];
  caseIds: string[];
  path: AssociationPath[];
}
export interface EvidenceRef {
  id: string;
  ownerRevision: RevisionId;
  locator: string;
  mediaType: string | null;
  digest: string | null;
  availability: "available" | "missing" | "unknown";
}
export interface HistoryEvent {
  id: string;
  kind: "artifact-revision" | "review" | "verification-result" | "operation";
  title: string;
  recordedAt: string | null;
  sourceOrder: number | null;
  artifacts: RevisionId[];
  operationId: string | null;
  inputs: RevisionId[];
  outputs: RevisionId[];
  source: SourceRef;
  details: Record<string, unknown>; // Original operation/event fields, not prose guesses.
}
export interface Diagnostic {
  code: string;
  message: string;
  artifact: RevisionId | null;
  severity: "warning" | "error";
}
export interface ProjectSummary {
  id: string;
  name: string;
}
export interface ProjectSnapshot {
  schemaVersion: 1;
  project: ProjectSummary;
  snapshotId: string;
  capturedAt: string;
  source: {
    fingerprint: string;
    gitCommit: string | null;
    processRef: string;
    kernelVersion: string;
    consistency: "immutable-capture" | "verified-input-digest";
    mode: "live" | "fixture";
  };
  selection: RequirementSelection | null; // No formal requirements is a valid empty view.
  artifacts: ArtifactRevision[]; // Includes selected records and their retained history/context.
  requirements: RequirementView[];
  decompositions: DecompositionView[];
  reviews: ReviewAssociation[];
  verification: VerificationAssociation[];
  evidence: EvidenceRef[];
  events: HistoryEvent[];
  diagnostics: Diagnostic[];
}
