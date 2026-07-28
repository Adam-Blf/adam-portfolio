# Changelog

Toutes les évolutions notables de ce projet sont documentées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
versionnage [semver](https://semver.org/lang/fr/).

## [2.0.0] - 2026-07-28

### Changed (breaking - rebranding complet)

- Rebranding complet du template "PIXZEN - Futuristic AI Agency" en portfolio personnel d'Adam Beloucif.
- `package.json` : nom, description et version alignés sur l'identité réelle du projet.
- README entièrement réécrit en français avec badges, section Architecture (diagramme Mermaid) et documentation du développement local.

### Added

- Page 404 personnalisée (`src/app/not-found.tsx`).
- Données réelles du parcours (LinkedIn) dans `src/data/timelineData.ts`.
- Catalogue de projets étendu de 14 à 32 entrées dans `src/data/projectsData.ts`, avec métadonnées vérifiées via `gh repo list`.
- Nouvelle taxonomie de catégories à 5 valeurs : Data Engineering & Big Data, Data Science & Machine Learning, Hospitalier & Santé, Applications Web & PWA, Utilitaires & Jeux.
- `src/lib/version.ts` : singleton exposant la version depuis `package.json`.

### Fixed

- Déduplication de la liste de projets : `FeaturedWork.tsx` importe désormais `projectsData` au lieu de déclarer sa propre liste locale divergente. La page d'accueil et `/projets` partagent maintenant la même source de vérité.
- Catégorie "Hospitalier & Web PWA" fusionnée dans "Hospitalier & Santé" : le projet pgvplaning redevient atteignable via les filtres de `/projets`.
- `pgvplaning.liveUrl` rétabli vers `https://pgvplaning.vercel.app` (le sous-domaine `planning.beloucif.com` n'a pas de DNS pointé).
- `facturation-404-monkey.githubUrl` corrigé vers le dépôt réel `Adam-Blf/eden-facturation` au lieu du profil GitHub générique.
- Suppression de l'import mort `Sparkles` dans `FeaturedWork.tsx`.

## [1.2.0] et versions antérieures

Historique du template PIXZEN avant rebranding, non détaillé ici.
