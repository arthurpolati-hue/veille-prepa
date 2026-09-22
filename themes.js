// Sujets pré-intégrés : requêtes du flux automatique + synthèses « Ce qu'on sait aujourd'hui ».
//
// ⚠️ Règles pour toute mise à jour des synthèses (les mêmes que pour la veille d'ARD Coaching) :
//  - ne jamais ajouter une référence de mémoire : la retrouver dans Europe PMC ou PubMed,
//    vérifier son DOI et lire son résumé COMPLET avant d'écrire dessus ;
//  - aucun chiffre qui ne figure pas dans le résumé de l'étude citée ;
//  - toujours donner les CONDITIONS d'un résultat (population, durée, type de test) et
//    les limites signalées par les auteurs ;
//  - quand deux méta-analyses divergent, le dire plutôt que choisir ;
//  - les « doses » issues de sous-groupes ou de méta-régressions sont des ASSOCIATIONS
//    entre études, pas des seuils testés directement : l'écrire ;
//  - mettre à jour `maj`.
// Résumés lus dans Europe PMC le 15/09/2026.

export const REFERENCES = {
  // ── Plyométrie
  '10.1136/bjsm.2007.035113': { auteurs:'Markovic', annee:2007, revue:'Br J Sports Med', type:'Méta-analyse (26 études)',
    titre:'Does plyometric training improve vertical jump height? A meta-analytical review' },
  '10.1519/jsc.0b013e318196b7c6': { auteurs:'de Villarreal et al.', annee:2009, revue:'J Strength Cond Res', type:'Méta-analyse (56 études)',
    titre:'Determining variables of plyometric training for improving vertical jump height performance: a meta-analysis' },
  '10.1519/jsc.0b013e318220fd03': { auteurs:'Sáez de Villarreal et al.', annee:2012, revue:'J Strength Cond Res', type:'Méta-analyse (26 études)',
    titre:'The effects of plyometric training on sprint performance: a meta-analysis' },
  '10.1016/j.jsams.2009.08.005': { auteurs:'Sáez de Villarreal et al.', annee:2010, revue:'J Sci Med Sport', type:'Méta-analyse (15 études)',
    titre:'Does plyometric training improve strength performance? A meta-analysis' },
  '10.1123/ijspp.2015-0694': { auteurs:'Asadi et al.', annee:2016, revue:'Int J Sports Physiol Perform', type:'Méta-analyse (24 études)',
    titre:'The Effects of Plyometric Training on Change-of-Direction Ability: A Meta-Analysis' },
  '10.1111/sms.13487': { auteurs:'Oxfeldt et al.', annee:2019, revue:'Scand J Med Sci Sports', type:'Méta-analyses (25 études, adultes)',
    titre:'Effects of plyometric training on jumping, sprint performance, and lower body muscle strength in healthy adults' },
  '10.1007/s40279-023-01825-0': { auteurs:'Ramirez-Campillo et al.', annee:2023, revue:'Sports Med', type:'Méta-analyse (61 études)',
    titre:'Effects of Plyometric Jump Training on the Reactive Strength Index in Healthy Individuals Across the Lifespan' },

  // ── Force
  '10.1519/jsc.0000000000002200': { auteurs:'Schoenfeld et al.', annee:2017, revue:'J Strength Cond Res', type:'Méta-analyse (21 études)',
    titre:'Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training' },
  '10.1249/mss.0000000000002585': { auteurs:'Lopez et al.', annee:2021, revue:'Med Sci Sports Exerc', type:'Méta-analyse en réseau (28 études)',
    titre:'Resistance Training Load Effects on Muscle Hypertrophy and Strength Gain: Systematic Review and Network Meta-analysis' },
  '10.1007/s40279-018-0872-x': { auteurs:'Grgic et al.', annee:2018, revue:'Sports Med', type:'Méta-analyse (22 études)',
    titre:'Effect of Resistance Training Frequency on Gains in Muscular Strength' },
  '10.1007/s40279-025-02344-w': { auteurs:'Pelland et al.', annee:2026, revue:'Sports Med', type:'Méta-régressions (67 études)',
    titre:'The Resistance Training Dose Response: Meta-Regressions Exploring the Effects of Weekly Volume and Frequency on Muscle Hypertrophy and Strength Gains' },
  '10.1007/s40279-014-0227-1': { auteurs:'Seitz et al.', annee:2014, revue:'Sports Med', type:'Méta-analyse (15 études)',
    titre:'Increases in lower-body strength transfer positively to sprint performance' },
  '10.1007/s40279-021-01587-7': { auteurs:'Schumann et al.', annee:2022, revue:'Sports Med', type:'Méta-analyse (43 études)',
    titre:'Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function' },
  '10.1007/s40279-021-01426-9': { auteurs:'Petré et al.', annee:2021, revue:'Sports Med', type:'Méta-analyse (27 études)',
    titre:'Development of Maximal Dynamic Strength During Concurrent Resistance and Endurance Training in Untrained, Moderately Trained, and Trained Individuals' },
  '10.1007/s40279-023-01943-9': { auteurs:'Huiberts et al.', annee:2024, revue:'Sports Med', type:'Méta-analyse (59 études)',
    titre:'Concurrent Strength and Endurance Training: A Systematic Review and Meta-Analysis on the Impact of Sex and Training Status' },

  // ── Vitesse
  '10.1007/s40279-020-01372-y': { auteurs:'Nicholson et al.', annee:2021, revue:'Sports Med', type:'Méta-analyse (121 études)',
    titre:'The Training of Short Distance Sprint Performance in Football Code Athletes' },
  '10.1007/s40279-018-0947-8': { auteurs:'Alcaraz et al.', annee:2018, revue:'Sports Med', type:'Méta-analyse (13 études)',
    titre:'The Effectiveness of Resisted Sled Training (RST) for Sprint Performance' },
  '10.1007/s40279-015-0422-8': { auteurs:'Petrakos et al.', annee:2016, revue:'Sports Med', type:'Revue systématique (11 études)',
    titre:'Resisted Sled Sprint Training to Improve Sprint Performance: A Systematic Review' },

  // ── Endurance
  '10.1007/s40279-015-0365-0': { auteurs:'Milanović et al.', annee:2015, revue:'Sports Med', type:'Méta-analyse (28 études)',
    titre:'Effectiveness of High-Intensity Interval Training (HIT) and Continuous Endurance Training for VO2max Improvements' },
  '10.1371/journal.pone.0073182': { auteurs:'Bacon et al.', annee:2013, revue:'PLoS One', type:'Méta-analyse (37 études)',
    titre:'VO2max trainability and high intensity interval training in humans: a meta-analysis' },
  '10.1111/sms.12092': { auteurs:'Sloth et al.', annee:2013, revue:'Scand J Med Sci Sports', type:'Revue systématique et méta-analyse (19 études)',
    titre:'Effects of sprint interval training on VO2max and aerobic exercise performance' },
  '10.3389/fphys.2024.1486526': { auteurs:'Wiesinger et al.', annee:2024, revue:'Front Physiol', type:'Méta-analyses (34 études, athlètes)',
    titre:'Meta-analyses of the effects of high-intensity interval training in elite athletes—part I' },
  '10.1080/02640414.2021.1876313': { auteurs:'Parmar et al.', annee:2021, revue:'J Sports Sci', type:'Revue systématique (7 études)',
    titre:'The dose-response relationship between interval-training and VO2max in well-trained endurance runners' },
  '10.1519/jsc.0000000000001316': { auteurs:'Balsalobre-Fernández et al.', annee:2016, revue:'J Strength Cond Res', type:'Méta-analyse (5 études)',
    titre:'Effects of Strength Training on Running Economy in Highly Trained Runners' },
  '10.1007/s40279-023-01978-y': { auteurs:'Llanos-Lagos et al.', annee:2024, revue:'Sports Med', type:'Méta-analyse',
    titre:"Effect of Strength Training Programs in Middle- and Long-Distance Runners' Economy at Different Running Speeds" },
  '10.1007/s40279-014-0157-y': { auteurs:'Beattie et al.', annee:2014, revue:'Sports Med', type:'Revue systématique (26 études)',
    titre:'The effect of strength training on performance in endurance athletes' }
};

// Exclusions communes aux sujets pré-intégrés : populations cliniques, hors sujet en prépa physique.
export const EXCLUSIONS_CLINIQUES = ' NOT (patients[ti] OR cancer[ti] OR "heart failure"[ti] OR diabetes[ti] '
  + 'OR stroke[ti] OR COPD[ti] OR "chronic obstructive"[ti] OR "multiple sclerosis"[ti] OR parkinson[ti] '
  + 'OR dialysis[ti] OR "spinal cord"[ti] OR HIV[ti] OR osteoarthritis[ti] OR pregnancy[ti] OR obesity[ti] '
  + 'OR rehabilitation[ti] OR "cerebral palsy"[ti] OR mortality[ti] OR "all-cause"[ti])';

export const THEMES = [
  {
    k: 'plyometrie', l: 'Plyométrie', emoji: '🦘',
    requete: '(plyometric*[ti] OR "jump training"[ti] OR "stretch-shortening"[ti])',
    synthese: {
      maj: '2026-09-15',
      intro: "La plyométrie améliore le saut, le sprint, les changements de direction et même la force, avec des effets "
        + "faibles à grands selon le test et la population. Les « doses » ci-dessous viennent de comparaisons <b>entre</b> études "
        + "(sous-groupes, méta-régressions) : ce sont des tendances, pas des seuils testés directement.",
      points: [
        { titre: 'Hauteur de saut : ce qu\'on peut attendre',
          texte: "Chez des personnes en bonne santé, la plyométrie augmente la hauteur de saut de <b>+4,7 %</b> en squat jump, "
            + "<b>+8,7 %</b> en CMJ, <b>+7,5 %</b> en CMJ avec bras et <b>+4,7 %</b> en drop jump (26 études ; tailles d'effet 0,44 à 0,88). "
            + "Chez l'adulte (≥ 18 ans, programmes de 4 à 12 semaines), l'effet sur le saut est <b>faible à modéré</b> : SMD <b>0,45</b>.",
          sources: ['10.1136/bjsm.2007.035113', '10.1111/sms.13487'] },
        { titre: 'Programmer pour le saut',
          texte: "Sur 56 études, les plus grands gains étaient associés à <b>plus de 10 semaines</b>, <b>plus de 20 séances</b> et des programmes "
            + "intenses à <b>plus de 50 sauts par séance</b>. Combiner <b>squat jump + CMJ + drop jump</b> faisait mieux qu'un seul type. "
            + "<b>Aucun bénéfice</b> à ajouter une charge. Les sportifs plus expérimentés progressaient davantage, et une bonne ou "
            + "mauvaise condition physique au départ donnait le même bénéfice.",
          sources: ['10.1519/jsc.0b013e318196b7c6'] },
        { titre: 'Programmer pour le sprint',
          texte: "Sur 26 études, les meilleurs gains en sprint étaient associés à des programmes de <b>moins de 10 semaines</b> comptant "
            + "<b>au moins 15 séances</b>, intenses, avec <b>plus de 80 sauts combinés par séance</b> ; surtout en combinant plusieurs types de "
            + "sauts et des exercices à <b>composante horizontale</b> (bonds, sauts avec déplacement, plyométrie spécifique au sprint). "
            + "Là encore, lester n'apportait rien. Chez l'adulte : SMD <b>−0,59</b> sur le temps de sprint, avec une hétérogénéité entre études.",
          sources: ['10.1519/jsc.0b013e318220fd03', '10.1111/sms.13487'] },
        { titre: 'Changements de direction',
          texte: "Sur 24 études, les programmes efficaces tournaient autour de <b>7 semaines à 2 séances par semaine</b>, intensité modérée, "
            + "<b>~100 sauts par séance</b> et <b>72 h</b> entre deux séances, en combinant drops jumps, sauts verticaux et sauts en longueur "
            + "sans élan. Les sujets en meilleure condition physique progressaient davantage ; hommes et femmes obtenaient des gains similaires.",
          sources: ['10.1123/ijspp.2015-0694'] },
        { titre: 'Force réactive (RSI)',
          texte: "Sur 61 études et 2 576 participants, la plyométrie améliore le RSI par rapport à des groupes contrôles actifs "
            + "(y compris un entraînement lourd et lent) : <b>ES 0,54</b>. L'effet était plus grand <b>chez l'adulte</b> que chez le jeune, "
            + "après <b>plus de 7 semaines</b>, <b>plus de 14 séances</b> et à <b>3 séances par semaine</b> plutôt que moins. Moins ou plus de "
            + "1 080 sauts au total : gains similaires. Certitude <b>modérée</b>. Limite : la plupart des études ne rapportaient ni douleurs "
            + "ni blessures, la tolérance est donc peu évaluée.",
          sources: ['10.1007/s40279-023-01825-0'] },
        { titre: 'Et la force maximale ?',
          texte: "Sur 15 études, les gains de force étaient indépendants du niveau de départ et <b>similaires chez les hommes et les femmes</b>. "
            + "Tendances associées aux meilleurs résultats : moins de 10 semaines, plus de 15 séances, plus de 40 sauts par séance, et "
            + "<b>plyométrie combinée à la musculation</b>. Chez l'adulte : SMD <b>0,33</b> sur la force du bas du corps. "
            + "À noter : ces analyses associent le saut à <b>plus</b> de 10 semaines mais le sprint et la force à <b>moins</b> de 10 semaines ; "
            + "ce sont des associations entre études, pas la preuve qu'un programme court est meilleur.",
          sources: ['10.1016/j.jsams.2009.08.005', '10.1111/sms.13487'] }
      ]
    }
  },
  {
    k: 'force', l: 'Force', emoji: '🏋️',
    requete: '(("resistance training"[ti] OR "strength training"[ti] OR "maximal strength"[ti] OR "muscular strength"[ti] '
      + 'OR "velocity-based"[ti] OR "1RM"[ti] OR "concurrent training"[ti]) '
      + 'AND (strength[ti] OR power[ti] OR athletes[ti] OR performance[ti] OR trained[ti])) '
      + 'NOT (older[ti] OR elderly[ti] OR sarcopenia[ti] OR arthroplasty[ti] OR supplementation[ti] OR ashwagandha[ti] '
      + 'OR "motor unit"[ti] OR corticospinal[ti] OR frailty[ti] OR caffeine[ti] OR apnea[ti])',
    synthese: {
      maj: '2026-09-15',
      intro: "La force maximale répond d'abord à la <b>charge</b> et au <b>volume</b> ; la fréquence compte surtout parce qu'elle permet "
        + "d'ajouter du volume. Limite générale : la majorité des études portent sur des sujets peu ou pas entraînés.",
      points: [
        { titre: 'Charge : lourd pour le 1RM',
          texte: "Avec des séries menées à l'échec, les charges lourdes (<b>> 60 % 1RM</b>) donnent plus de gains sur le <b>1RM</b> que les charges "
            + "légères, sans différence en force isométrique, et une hypertrophie similaire (21 études). En méta-analyse en réseau "
            + "(28 études, 747 adultes, à l'échec) : lourd (<b>≤ 8 RM</b>) et modéré (<b>9–15 RM</b>) font mieux que léger (<b>> 15 RM</b>) — "
            + "SMD <b>0,60–0,63</b> et <b>0,34–0,35</b>. Lourd contre modéré : SMD 0,26–0,28, <b>non significatif</b> (p = 0,068).",
          sources: ['10.1519/jsc.0000000000002200', '10.1249/mss.0000000000002585'] },
        { titre: 'Fréquence : surtout un moyen d\'ajouter du volume',
          texte: "Sur 22 études, les tailles d'effet montent de <b>0,74</b> à <b>0,82</b>, <b>0,93</b> puis <b>1,08</b> pour 1, 2, 3 et 4 séances "
            + "ou plus par semaine. Mais <b>à volume égal</b>, la fréquence n'a plus d'effet significatif (p = 0,421). L'effet de la fréquence "
            + "était significatif sur les exercices <b>polyarticulaires</b>, le <b>haut du corps</b>, chez les <b>femmes</b> et les jeunes adultes. "
            + "La plupart des participants étaient non entraînés.",
          sources: ['10.1007/s40279-018-0872-x'] },
        { titre: 'Volume : ça monte, mais de moins en moins',
          texte: "Sur 67 études et 2 058 participants, la force augmente avec le <b>volume hebdomadaire</b> de séries et avec la "
            + "<b>fréquence</b>, mais avec des <b>rendements décroissants</b>, nettement plus marqués pour la force que pour l'hypertrophie. "
            + "Le modèle le mieux ajusté compte les séries « indirectes » (un exercice qui sollicite le muscle sans le cibler) "
            + "pour <b>une demi-série</b>.",
          sources: ['10.1007/s40279-025-02344-w'] },
        { titre: 'Du squat au sprint',
          texte: "Sur 15 études et 510 sujets, les gains de force au squat se transfèrent au sprint : corrélation <b>très forte (r = −0,77)</b> "
            + "entre le gain au squat et le gain en sprint, pour une amélioration moyenne du sprint de <b>3,11 %</b>. L'ampleur du gain "
            + "dépendait du niveau de pratique, de la masse corporelle, de la <b>fréquence des séances</b> et du <b>repos entre séries</b> ; "
            + "pas du % 1RM, de la durée du programme ni du nombre de séries ou de répétitions.",
          sources: ['10.1007/s40279-014-0227-1'] },
        { titre: 'Force + endurance : l\'interférence',
          texte: "Sur 43 études, ajouter de l'endurance ne freine significativement ni la <b>force maximale</b> (SMD −0,06) ni "
            + "l'<b>hypertrophie</b> (−0,01), mais freine la <b>force explosive</b> (<b>−0,28</b>), surtout quand les deux sont faits "
            + "<b>dans la même séance</b> ; pas quand les séances sont séparées d'au moins 3 h. Une autre analyse (27 études) trouve un frein "
            + "sur le 1RM du bas du corps chez les <b>pratiquants entraînés</b> (ES −0,35), uniquement dans la même séance (−0,66 contre −0,10 "
            + "en séances séparées), et pas chez les non ou modérément entraînés. Une troisième (59 études) voit une petite interférence sur la "
            + "force du bas du corps chez les <b>hommes</b> (−0,43) mais pas chez les femmes (0,08). Les analyses <b>divergent</b> sur le rôle du "
            + "niveau d'entraînement ; toutes pointent l'intérêt de séparer les séances quand la force est prioritaire.",
          sources: ['10.1007/s40279-021-01587-7', '10.1007/s40279-021-01426-9', '10.1007/s40279-023-01943-9'] }
      ]
    }
  },
  {
    k: 'vitesse', l: 'Vitesse', emoji: '⚡',
    requete: '(sprint*[ti] OR "change of direction"[ti] OR "change-of-direction"[ti] OR agility[ti] OR "running speed"[ti]) '
      + 'NOT ("sprint interval"[ti] OR beetroot[ti] OR caffeine[ti] OR supplementation[ti] OR bicarbonate[ti] '
      + 'OR "blood pressure"[ti] OR systolic[ti] OR hypertension[ti])',
    synthese: {
      maj: '2026-09-15',
      intro: "Pour le sprint court, aucune méthode isolée ne se détache : c'est la <b>combinaison</b> des méthodes qui ressort, "
        + "et l'entraînement du sport seul ne suffit pas.",
      points: [
        { titre: 'Combiner les méthodes',
          texte: "La plus grande méta-analyse sur le sprint court (<b>≤ 20 m</b> ; 121 études, 3 419 athlètes de sports de football) trouve des "
            + "améliorations significatives, petites à grandes, avec les <b>méthodes combinées</b> et plusieurs familles de méthodes, mais "
            + "<b>aucune méthode n'est ressortie comme la plus efficace</b>. L'entraînement du sport seul n'améliorait pas le sprint court. "
            + "Le sport, l'âge, le niveau et la période de la saison modifiaient l'ampleur des effets. Idée clé des auteurs : augmenter la "
            + "force produite et <b>mieux l'orienter</b> dans l'action de sprint.",
          sources: ['10.1007/s40279-020-01372-y'] },
        { titre: 'Traîneau : efficace sur l\'accélération',
          texte: "Sur 13 études, le sprint au traîneau améliore l'<b>accélération</b> (ES 0,61) et le sprint complet (ES 0,36), pas "
            + "significativement la <b>vitesse maximale</b> (ES 0,27). Face à un groupe contrôle, il n'a <b>pas</b> fait significativement mieux "
            + "que le même entraînement sans charge. La charge n'était pas déterminante ; les auteurs recommandent <b>> 160 m par séance</b>, "
            + "environ <b>2 680 m</b> sur le programme, <b>2 à 3 fois par semaine</b> pendant <b>au moins 6 semaines</b>, sur surface rigide. "
            + "Une revue de 11 études détaille : charges légères (<b>< 10 % de la masse</b>) chez des sprinteurs → accélération −1,5 % mais "
            + "vitesse max +2,4 % ; charges modérées à très lourdes (<b>10 % à > 30 %</b>) chez des sportifs de force ou de sports collectifs → "
            + "accélération de +0,5 à +9,1 %. La supériorité sur le sprint sans charge reste <b>non démontrée</b>.",
          sources: ['10.1007/s40279-018-0947-8', '10.1007/s40279-015-0422-8'] },
        { titre: 'La force se transfère',
          texte: "Gagner en force au squat améliore le sprint : <b>+3,11 %</b> en moyenne, avec une corrélation très forte (<b>r = −0,77</b>) "
            + "entre gain de force et gain en sprint (15 études). Le % 1RM utilisé n'influençait pas le résultat.",
          sources: ['10.1007/s40279-014-0227-1'] },
        { titre: 'Plyométrie : penser horizontal',
          texte: "Pour le sprint, les programmes associés aux meilleurs gains combinaient plusieurs types de sauts avec une "
            + "<b>composante horizontale</b> (bonds, sauts avec déplacement), <b>au moins 15 séances</b> et <b>plus de 80 sauts par séance</b> ; "
            + "sans lest. Chez l'adulte, l'effet de la plyométrie sur le temps de sprint est modéré : SMD <b>−0,59</b>.",
          sources: ['10.1519/jsc.0b013e318220fd03', '10.1111/sms.13487'] },
        { titre: 'Changements de direction',
          texte: "La plyométrie améliore les changements de direction (24 études) : ~<b>7 semaines</b>, <b>2 séances par semaine</b>, "
            + "~<b>100 sauts</b> par séance d'intensité modérée, <b>72 h</b> de récupération, en variant drops jumps, sauts verticaux et "
            + "sauts en longueur.",
          sources: ['10.1123/ijspp.2015-0694'] },
        { titre: 'Attention aux séances mixtes',
          texte: "Faire de l'endurance dans la même séance que la force freine les gains de <b>force explosive</b> (SMD −0,28 sur 43 études), "
            + "ce qui n'est plus observé quand les séances sont séparées d'au moins 3 h.",
          sources: ['10.1007/s40279-021-01587-7'] }
      ]
    }
  },
  {
    k: 'endurance', l: 'Endurance & VO2max', emoji: '🫁',
    requete: '("VO2max"[ti] OR "VO2 max"[ti] OR "maximal oxygen uptake"[ti] OR "endurance performance"[ti] '
      + 'OR "running economy"[ti] OR "high-intensity interval"[ti] OR HIIT[ti] OR "endurance training"[ti] '
      + 'OR "endurance athletes"[ti] OR "sprint interval"[ti]) '
      + 'NOT (pulmonary[ti] OR cardiometabolic[ti] OR "older adults"[ti] OR enjoyment[ti] OR depression[ti] '
      + 'OR cognitive[ti] OR insulin[ti] OR vascular[ti] OR "fat mass"[ti] OR "body composition"[ti] '
      + 'OR "mental health"[ti] OR caffeine[ti] OR supplementation[ti] OR "health-related"[ti] OR psychological[ti])',
    synthese: {
      maj: '2026-09-15',
      intro: "Le continu comme le fractionné améliorent fortement la VO2max chez des adultes peu à moyennement entraînés. "
        + "Chez les athlètes déjà très entraînés, les gains sont plus petits et plus incertains. La force a sa place dans la préparation "
        + "d'un sportif d'endurance, via l'économie de course.",
      points: [
        { titre: 'HIIT ou continu ?',
          texte: "Sur 28 études (723 adultes de 18 à 45 ans, VO2max de départ ~<b>40,8 mL/kg/min</b>), par rapport à des groupes sans exercice : "
            + "continu <b>+4,9 mL/kg/min</b>, HIIT <b>+5,5 mL/kg/min</b>. En direct, le HIIT fait un peu mieux que le continu : "
            + "<b>+1,2 mL/kg/min</b> (petit effet), davantage avec des <b>répétitions plus longues</b> (+2,2), des programmes plus longs, un "
            + "rapport travail/repos plus élevé et un niveau de départ plus faible.",
          sources: ['10.1007/s40279-015-0365-0'] },
        { titre: 'Des intervalles plus longs',
          texte: "Sur 37 études (334 personnes sédentaires ou actives de moins de 45 ans ; 6 à 13 semaines, au moins 3 jours par semaine, "
            + "au moins 10 min de travail intense, rapport travail/repos d'au moins 1:1), le fractionné augmente la VO2max de "
            + "<b>0,51 L/min</b>. Le sous-groupe à <b>intervalles plus longs</b> (9 études) montrait des gains de ~<b>0,8 à 0,9 L/min</b>, avec une "
            + "réponse marquée chez tous les sujets.",
          sources: ['10.1371/journal.pone.0073182'] },
        { titre: 'Sprint interval training (SIT)',
          texte: "Chez des adultes sédentaires ou actifs, 2 à 8 semaines de SIT à faible volume améliorent la VO2max (g = <b>0,63</b> sur 13 études, "
            + "soit <b>+4,2 à +13,4 %</b>) et la performance aérobie, avec des adaptations surtout <b>musculaires (périphériques)</b> ; les preuves "
            + "d'adaptations centrales restent limitées.",
          sources: ['10.1111/sms.12092'] },
        { titre: 'Chez les athlètes très entraînés',
          texte: "Sur 34 études chez des athlètes d'endurance très entraînés ou d'élite, le HIIT améliore la plupart des indicateurs de "
            + "performance, avec des effets plus grands quand il est <b>ajouté</b> à l'entraînement habituel (+1,1 à +2,3 %), avec des formats "
            + "<b>plus aérobies</b> pour la VO2max (+2,6 %) et en <b>période de compétition</b> pour la VO2max (+4,3 %). L'effet sur l'économie "
            + "de course reste incertain. Chez des coureurs bien entraînés (7 études), 6 études sur 7 ne trouvaient <b>pas d'amélioration "
            + "significative</b> de la VO2max : son efficacité à ce niveau reste <b>équivoque</b>.",
          sources: ['10.3389/fphys.2024.1486526', '10.1080/02640414.2021.1876313'] },
        { titre: 'La force améliore l\'économie de course',
          texte: "Chez des coureurs de haut niveau (VO2max > 60 mL/kg/min ; 5 études), 2 à 3 séances de force par semaine pendant "
            + "<b>8 à 12 semaines</b> améliorent nettement l'économie de course (SMD <b>−1,42</b>) ; les programmes combinaient 2 à 4 exercices "
            + "du bas du corps (40–70 % 1RM dans 4 études sur 5), jusqu'à 200 sauts et 5 à 10 sprints courts. Une analyse plus récente "
            + "précise : charges lourdes (<b>≥ 80 % 1RM</b>) = petit effet, méthodes <b>combinées</b> = effet modéré, plyométrie efficace "
            + "<b>à ≤ 12 km/h</b> ; charges sous-maximales et isométrie seules = pas d'amélioration. Le lourd était plus efficace aux "
            + "<b>vitesses élevées</b> et chez les coureurs à <b>VO2max élevée</b>.",
          sources: ['10.1519/jsc.0000000000001316', '10.1007/s40279-023-01978-y', '10.1007/s40279-014-0157-y'] },
        { titre: 'Endurance + force : la VO2max',
          texte: "Sur 59 études, ajouter de la force à l'endurance réduisait les gains de VO2max chez les personnes <b>non entraînées</b>, "
            + "mais pas chez les athlètes d'endurance entraînés ou très entraînés.",
          sources: ['10.1007/s40279-023-01943-9'] }
      ]
    }
  }
];
