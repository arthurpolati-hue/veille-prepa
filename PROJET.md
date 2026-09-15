# Veille Prépa Physique

Site simple, fait par Arthur (ARD Coaching) pour un ami préparateur physique.
Il reprend l'onglet « Actualités » de l'espace coach d'ARD Coaching, orienté prépa physique.

**Projet séparé d'ARD Coaching** : aucun code, aucune donnée, aucun compte en commun.

## Ce que fait le site

- **4 sujets pré-intégrés** : Plyométrie, Force, Vitesse, Endurance & VO2max. Chacun a :
  - une synthèse « Ce qu'on sait aujourd'hui » rédigée à la main, niveau coach ;
  - le flux des méta-analyses récentes, ou les plus citées.
- **Barre de recherche en français** (« bénéfice saut en hauteur », « développement de la VO2max ») :
  - les mots-clés sont traduits en anglais par un lexique de prépa physique, sans IA ;
  - la recherche porte d'abord sur les titres, puis sur les résumés s'il y a moins de 5 résultats ;
  - le résultat peut être ajouté à « Mes sujets ».
- **Gérer** : ordre des sujets, masquer un sujet pré-intégré, renommer, modifier les mots-clés
  ou supprimer un sujet perso, transfert vers un autre appareil, réinitialisation.
- **Sujets ajoutés par l'utilisateur** : pas de synthèse, seulement la conclusion des auteurs, en
  anglais. Le résumé automatique a été écarté (option A choisie par Arthur le 15/09/2026 : gratuit, sans IA).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page et styles (thème sombre, mobile d'abord) |
| `app.js` | Logique : état, rendu, appels Europe PMC, cache, gestion, transfert |
| `themes.js` | Sujets pré-intégrés : requêtes, synthèses, références vérifiées (`REFERENCES`), exclusions cliniques |
| `traduction.js` | Lexique français → anglais et construction des requêtes Europe PMC |

Pas de build, pas de dépendance : des modules ES chargés directement par le navigateur.

## Données et confidentialité

- **Pas de serveur ni de compte.** Les sujets de l'utilisateur sont dans le `localStorage` du navigateur
  (clé `veille-prepa:etat:v1`), donc **propres à chaque appareil**.
- **Transfert entre appareils** : « Gérer » → lien `#sujets=<base64url JSON>`. L'ancre n'est jamais
  envoyée au serveur. À l'ouverture, une confirmation est demandée, puis les données sont validées
  (`normaliserEtat`) avant import.
- **Flux** : API publique Europe PMC (CORS ouvert, sans clé), mis en cache 12 h par requête et par tri
  (clés `veille-prepa:flux:*`).
- **Filtre** : méta-analyses et revues systématiques, source MEDLINE, articles rétractés exclus, études
  cliniques écartées (`EXCLUSIONS_CLINIQUES`, appliqué aussi aux recherches libres).
- **Aucun cookie, aucune mesure d'audience, aucune donnée personnelle.**

## Règles pour les synthèses (à respecter à chaque mise à jour)

Elles sont rappelées en tête de `themes.js`.

1. Ne jamais ajouter une référence de mémoire : la retrouver dans Europe PMC, vérifier le DOI et lire
   le **résumé complet**.
2. Aucun chiffre absent du résumé de l'étude citée.
3. Toujours donner les conditions (population, durée, test) et les limites.
4. Signaler les divergences entre méta-analyses au lieu de choisir.
5. Les « doses » issues de sous-groupes ou de méta-régressions sont des associations entre études :
   l'écrire.
6. Mettre à jour `maj`.

Piège déjà rencontré : un script qui retire les balises HTML avec `<[^>]+>` coupe aussi le texte
après un « p < 0,05 ». Il faut ne retirer que les vraies balises (`h4`, `i`, `sub`, etc.), sinon des
chiffres disparaissent.

## Lexique (`traduction.js`)

- **Entrée du lexique** : `[[formes françaises], [termes anglais Europe PMC]]`. Les expressions
  vont entre guillemets ; le joker `mot*` ne s'utilise que sur un mot seul.
- **Ordre de reconnaissance** : les expressions les plus longues d'abord (« vitesse maximale aérobie »
  avant « vitesse »).
- **Mots vides** (`VIDES`) : ignorés.
- **Mot inconnu** : gardé tel quel et signalé en orange. Taper en anglais fonctionne donc aussi.
- **Pluriels** : le « s » final est retiré, et le « x » seulement après « au » ou « eu ». Sinon
  « vo2max » devenait « vo2ma ».

## Tests faits le 15/09/2026

- Requêtes des 4 sujets contrôlées sur Europe PMC (tri récent et tri par citations) ; le hors-sujet a
  été retiré (sarcopénie, BPCO, essai clinique « SPRINT » sur la tension, caféine, mortalité…).
- 14 recherches libres testées. Exemples : « bénéfice saut en hauteur » → 35 publications ;
  « prévention des blessures ischio-jambiers » → 5.
- Navigateur sans écran : sujets, synthèses, flux, tri, recherche, ajout, masquer, réordonner,
  persistance après rechargement, contenu du lien de transfert. L'import par lien n'a pas été testé
  de bout en bout (la confirmation bloque en navigateur sans écran), seulement le décodage du lien.

## Mise en ligne

Pas encore en ligne au 15/09/2026. Option prévue : un dépôt GitHub séparé publié avec GitHub Pages.
N'importe quel hébergement de fichiers statiques convient.
