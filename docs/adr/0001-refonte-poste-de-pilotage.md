# ADR 0001 : refonte "poste de pilotage"

Date : 2026-10-09. Statut : acceptée par Adam (direction B choisie le 09/10/2026).

## Décision

Réécrire le portfolio en place, en multi-pages, avec Next.js 16 en rendu statique, next-intl (FR sans préfixe, EN et ES préfixés, chemins traduits, aucune détection automatique, aucun cookie), GSAP et ScrollTrigger chargés en différé, contenu en fichiers validés par Zod.

## Écarts à l'architecture de départ, et pourquoi

| Écart | Raison |
|---|---|
| Pas de Tailwind | la maquette est en CSS pur sur des jetons ; Tailwind n'apportait que du poids et une seconde source de vérité pour les couleurs |
| Pas de `@gsap/react` | GSAP est importé dynamiquement hors du chemin du LCP ; `gsap.context` et `matchMedia` nettoyés au démontage suffisent, sans paquet de plus |
| Pas de couverture par projet | aucune image sourcée : les panneaux de données portent le projet, aucune illustration inventée |
| Budget JS initial à 170 Ko gzip au lieu de 110 | le socle App Router (react-dom 70 Ko, routeur 45 Ko) dépasse déjà 110 Ko ; mesuré à 156 Ko, sous le plafond de 200 Ko de la demande |
| Cas sabotés construits dans les tests, pas committés | un fichier sabordé dans le dépôt ferait échouer la garde qu'il sert à tester |
| Image OpenGraph par langue, pas par page | un visuel de marque suffit ; titre et description sont propres à chaque page |
| Pas de flux RSS | aucune note publiée au lancement |
| Projet hospitalier publiable si anonymisé | décision d'Adam du 09/10/2026 : anonymisation sans lien de code ni nom d'établissement ; l'accord écrit reste à recueillir (voir le rapport) |
| CV en Georgia, pas en Cambria | Cambria est fermée à un autre projet dans le registre des polices et n'est pas redistribuable ; Georgia donne le même registre serif |
| `prefetch={false}` sur les liens légaux du pied de page | le préchargement par segments de Next 16 y renvoyait des 404 dans la console |

## Conséquences

- Le contenu ne se modifie que par PR relue. Le script de synchro ne publie rien.
- Toute nouvelle route doit être déclarée dans `src/i18n/routing.ts` et le sitemap (`check_routes`).
- Toute nouvelle famille de police doit être inscrite au registre au nom du projet (`check_fonts`).
