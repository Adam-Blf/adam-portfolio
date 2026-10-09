import { z } from "zod";

/** Schemas du contenu. Le build echoue si un fichier ne les respecte pas. */

export const LOCALES = ["fr", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const LocaleSchema = z.enum(LOCALES);

const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const Slug = z.string().regex(/^[a-z0-9-]+$/);

/** Autorisations. Seul Adam les ecrit, jamais le script de synchro. */
export const Visibility = z.object({
  publish: z.boolean().default(false),
  anonymized: z.boolean().default(false),
  approvals: z.object({
    employer: IsoDate.nullable(),
    client: IsoDate.nullable(),
    coAuthors: z.array(z.object({ id: z.string(), approvedOn: IsoDate })),
  }),
  reviewedBy: z.literal("adam").nullable(),
  reviewedOn: IsoDate.nullable(),
});

export const PROJECT_KINDS = ["hospital", "school", "studio", "client", "personal"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

export const ProjectMeta = z
  .object({
    slug: Slug,
    kind: z.enum(PROJECT_KINDS),
    status: z.enum(["live", "shipped", "wip", "archived"]),
    period: z.object({ start: z.string().nullable(), end: z.string().nullable() }),
    stack: z.array(z.string()).min(1),
    links: z.object({
      repo: z.string().url().nullable(),
      demo: z.string().url().nullable(),
    }),
    coAuthors: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int(),
    visibility: Visibility,
    provenance: z.object({ vaultId: z.string(), checkedOn: IsoDate }),
  })
  .superRefine((m, ctx) => {
    const v = m.visibility;
    if (m.kind === "hospital" && m.links.repo) {
      ctx.addIssue({ code: "custom", message: "hospital: aucun lien vers le code" });
    }
    if (m.kind === "hospital" && m.links.demo) {
      ctx.addIssue({ code: "custom", message: "hospital: aucun lien vers une demonstration" });
    }
    if (m.kind === "hospital" && v.publish && !v.anonymized && !v.approvals.employer) {
      ctx.addIssue({ code: "custom", message: "hospital: anonymisation ou accord de l'etablissement requis" });
    }
    if (m.kind === "client" && v.publish && !v.approvals.client) {
      ctx.addIssue({ code: "custom", message: "client: accord du client requis" });
    }
    for (const id of m.coAuthors) {
      if (v.publish && !v.approvals.coAuthors.some((c) => c.id === id)) {
        ctx.addIssue({ code: "custom", message: `co-auteur ${id}: accord requis` });
      }
    }
  });
export type ProjectMeta = z.infer<typeof ProjectMeta>;

const Summary = z.string().min(20).max(160);
const Status = z.enum(["draft", "review", "published"]);

export const ProjectFront = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  role: z.string().min(1),
  summary: Summary,
  results: z.array(z.object({ metric: z.string().nullable(), text: z.string() })).max(3),
  limits: z.array(z.string()).default([]),
  status: Status,
  reviewedOn: IsoDate.nullable().default(null),
});
export type ProjectFront = z.infer<typeof ProjectFront>;

export const NoteFront = z.object({
  title: z.string().min(1),
  date: IsoDate,
  updated: IsoDate.nullable().default(null),
  summary: Summary,
  topics: z.array(z.string()).default([]),
  status: Status,
  reviewedOn: IsoDate.nullable().default(null),
  source: z.object({ vaultId: z.string(), checkedOn: IsoDate }),
});
export type NoteFront = z.infer<typeof NoteFront>;

const TimelineText = z.object({
  role: z.string(),
  summary: z.string(),
});

export const TimelineEntry = z.object({
  id: Slug,
  kind: z.enum(["work", "education", "leadership", "service"]),
  tag: z.string().min(2).max(5),
  start: z.string().regex(/^\d{4}(-\d{2})?$/),
  end: z.string().regex(/^\d{4}(-\d{2})?$/).nullable(),
  precision: z.enum(["year", "month"]),
  org: z.string(),
  featured: z.boolean().default(false),
  cv: z.boolean().default(false),
  i18n: z.object({ fr: TimelineText, en: TimelineText, es: TimelineText }),
  provenance: z.object({ vaultId: z.string(), checkedOn: IsoDate }),
});
export type TimelineEntry = z.infer<typeof TimelineEntry>;

export const Metrics = z.record(
  z.string(),
  z.object({
    value: z.number(),
    source: z.string(),
    checkedOn: IsoDate,
    caveat: z.string().optional(),
  }),
);
export type Metrics = z.infer<typeof Metrics>;

export const Skills = z.array(
  z.object({
    family: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        /** Slugs de projets, ou "alternance" quand la preuve est le poste actuel. */
        proofs: z.array(z.string()).min(1),
      }),
    ),
  }),
);
export type Skills = z.infer<typeof Skills>;

export const Identity = z.object({
  name: z.string(),
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  studio: z.string().url(),
  place: z.string(),
});
export type Identity = z.infer<typeof Identity>;
