# Changelog

Toutes les évolutions notables de ce projet sont documentées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
versionnage [semver](https://semver.org/lang/fr/).

## [2.1.0] - 2026-08-08

Lot 1 de la refonte v3 : vérité du contenu et conformité légale. Aucune phrase du
site ne doit être fausse, et aucune obligation légale ne doit manquer.

### Removed (contenu mensonger hérité du thème d'origine)

- Trois recommandations inventées, attribuées nommément à la Fondation Vallée /
  GHT Sud Paris, à l'ISIT et à un client, supprimées de `/parcours`. Une citation
  prêtée à une organisation réelle sans son accord écrit est une allégation fausse
  sur les qualités du professionnel (article L121-2 du code de la consommation).
- Section de dix marques partenaires inventées, affichée sous une accroche de
  confiance, et son composant.
- Section annonçant quatre publications qui n'existaient pas, et son composant.
- Adresse électronique de l'employeur retirée de `/cv`. Une boîte professionnelle
  d'établissement public n'a pas à être publiée sur un site personnel.

### Fixed (référencement)

- `public/robots.txt` interdisait l'indexation de `/projets`, `/competences` et
  `/frise`, et traînait des chemins d'un projet sans rapport. Remplacé par
  `src/app/robots.ts`, généré depuis la source unique des routes.
- `src/app/sitemap.ts` déclarait cinq routes inexistantes, en omettait quatre
  réelles, et annonçait une date de modification figée au 2026-02-09. Régénéré
  depuis la même source unique, avec la date de build.
- Route `/frise` supprimée : elle redirigeait vers `/timeline`, qui n'existe pas,
  et servait donc un 404. L'URL est conservée en redirection permanente vers
  `/parcours`, pour ne perdre ni lien entrant ni référencement acquis.
- Le pied de page annonçait 12 projets alors que le catalogue en contient 32. Le
  compte est désormais calculé, plus jamais écrit en dur.

### Added

- `src/lib/routes.ts`, source unique des routes publiques, dont dérivent le
  sitemap, le robots et la garde de cohérence.
- Pages `/mentions-legales` et `/confidentialite`, absentes jusqu'ici alors que le
  site est publié. Rédigées sur la base de l'article 1-1 de la LCEN, dans sa
  rédaction issue de la loi SREN n° 2024-449 du 21 mai 2024, et non sur
  l'article 6 III, abrogé.
- `src/data/legal.ts`, identité de l'éditeur et de l'hébergeur, source unique.
- Trois gardes de non-régression en Node pur, chacune validée par sabotage
  volontaire avant d'être acceptée verte, et documentant ses angles morts.
- Workflow CI qui exécute les gardes, le typecheck et le build.

### Changed

- Ton du site remis à la première personne du singulier, le thème d'origine
  parlait au nom d'une agence.
- Le README annonçait un dark mode natif qui n'existait dans aucune règle du
  code. Mention retirée jusqu'à la refonte de la direction artistique.
- Serveur de développement fixé sur le port 3100, conformément au registre des
  ports, pour ne pas entrer en conflit avec les autres projets.

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
