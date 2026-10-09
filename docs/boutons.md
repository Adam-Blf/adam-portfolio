# Boutons et appels à l'action

Règle d'Adam du 09/10/2026 : le libellé dit ce que le visiteur gagne, la phrase "Je veux [libellé]" est naturelle et le clic la satisfait tout de suite, les contrastes sont mesurés (texte 4,5:1, fond ou bordure 3:1) dans les deux thèmes, et le libellé suit le stade de l'audience. En anglais et en espagnol, c'est l'intention qui est traduite, pas les mots (`messages/en.json`, `messages/es.json`).

Contrastes : `node tools/contrast_report.mjs` (mêmes jetons que ceux servis, `src/styles/tokens.css`).

| Type | Texte | Fond ou bordure contre la page ou le panneau | Sombre | Clair |
|---|---|---|---|---|
| Principal | texte sur son fond | fond contre la page | 10,65:1 et 10,65:1 | 17,40:1 et 15,87:1 |
| Secondaire | encre sur panneau 15,42:1 (clair 17,40:1) | bordure contre panneau | 4,15:1 | 5,21:1 |
| Lien ambre | ambre sur panneau | sans fond | 9,89:1 | 7,21:1 |
| Anneau de focus | | contre le panneau | 9,89:1 | 7,21:1 |

## Inventaire

| Page | Stade | Libellé FR | Destination | Type |
|---|---|---|---|---|
| Accueil, premier écran | découverte | Voir ce que je construis en data | section projets, juste dessous | principal |
| Accueil, premier écran | découverte | Lire mon CV en une page | `/cv` | secondaire |
| Accueil, chiffres | considération | Voir comment j'ai relié ces sources | fiche Urban Data Explorer | lien |
| Accueil, chiffres | considération | Voir comment Vigie résiste aux attaques | fiche Vigie | lien |
| Accueil, chiffres | considération | Voir comment je contrôle ces formats | fiche Station PMSI | lien |
| Accueil, chiffres | considération | Voir ce que j'ai animé au BDE | `/a-propos#engagement` | lien |
| Accueil et projets | considération | Voir les résultats de {projet} (si un chiffre est annoncé) ou Voir comment j'ai construit {projet} | fiche du projet | lien |
| Accueil | considération | Voir tous mes projets, par catégorie | `/projets` | secondaire |
| Accueil | considération | Lire mon parcours en détail | `/a-propos#journal` | secondaire |
| Accueil | considération | Voir ce que BLF Lab's livre à ses clients | site du studio | principal |
| Accueil, contact | décision | Recevoir une réponse par e-mail | envoi du formulaire, confirmation affichée | principal |
| Accueil et contact | décision | adresse e-mail affichée | messagerie | principal |
| Accueil et contact | décision | Échanger sur LinkedIn | profil LinkedIn | secondaire |
| Accueil et contact | décision | Lire mon code sur GitHub | profil GitHub | secondaire |
| Accueil et contact | décision | Avoir mon CV en une page | `/cv` | secondaire |
| Parcours | considération | Voir ce que ces compétences ont produit | `/projets` | secondaire |
| Fiche projet | considération | Essayer ce projet en ligne | démonstration (si elle existe) | principal |
| Fiche projet | considération | Lire le code de ce projet | dépôt public (si public) | secondaire |
| Fiche projet | décision | Recevoir une réponse à mes questions sur ce projet | `/contact` | principal |
| Fiche projet | considération | Comparer avec mes autres projets | `/projets` | secondaire |
| Notes (vide) | considération | Voir mes projets en attendant les premières notes | `/projets` | principal |
| CV | décision | Enregistrer mon CV en PDF | boîte d'impression du navigateur | principal |
| Page introuvable | découverte | Retrouver l'accueil | `/` | principal |

Contrôles fonctionnels, qui gardent un libellé court (seuls leurs contrastes sont garantis) : lien d'évitement, retour aux projets, filtres de catégorie, langue, thème, menu mobile.

## Points à valider par Adam

- Aucun délai de réponse n'est promis ("sous 48 h" est absent) : ce délai n'existe nulle part ailleurs sur le site, et un bouton ne promet pas ce que la page ne dit pas. À ajouter ensemble si Adam s'y engage.
- Le bouton de démonstration n'apparaît que si la démonstration existe (404 Monkey, Ohypnozen) ; le bouton de code, que si le dépôt est public.
- Le lien "Lire les notes de terrain" est absent tant qu'aucune note n'est publiée.
