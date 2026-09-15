// Traduction des mots-clés tapés en français vers une requête Europe PMC (en anglais).
//
// Pas d'IA : un lexique de préparation physique. Principe :
//  1. le texte est normalisé (minuscules, sans accents, sans ponctuation, pluriels simples) ;
//  2. les EXPRESSIONS sont reconnues avant les mots seuls (« saut en hauteur » avant « saut ») ;
//  3. les mots vides sont ignorés (« bénéfice », « développement », « de », « la »…) ;
//  4. un mot inconnu est gardé tel quel (pratique si on tape directement en anglais),
//     mais il est signalé à l'écran pour pouvoir le retirer.
// Chaque idée reconnue devient un groupe de synonymes anglais (OU) ; les groupes sont
// combinés entre eux (ET).
//
// Pour enrichir le lexique : ajouter une ligne [[formes françaises], [termes anglais]].
// Les termes anglais sont écrits en syntaxe Europe PMC : "expression exacte" entre
// guillemets, ou mot* pour toutes les terminaisons (le joker ne marche pas dans une expression).

const LEXIQUE = [
  // ── Sauts et plyométrie
  [['saut en hauteur', 'saut vertical', 'detente verticale', 'detente', 'hauteur de saut', 'cmj', 'countermovement jump', 'vertical jump'],
   ['"vertical jump"', '"jump height"', '"countermovement jump"']],
  [['saut en longueur', 'saut horizontal', 'saut en longueur sans elan', 'broad jump', 'long jump'],
   ['"horizontal jump"', '"long jump"', '"broad jump"']],
  [['drop jump', 'saut en contrebas', 'saut de contrebas'], ['"drop jump"', '"depth jump"']],
  [['rsi', 'force reactive', 'indice de force reactive', 'reactive strength'], ['"reactive strength"']],
  [['saut', 'sauter', 'jump'], ['jump*']],
  [['plyometrie', 'pliometrie', 'plyo', 'plyometrique', 'pliometrique', 'plyometric'], ['plyometric*', '"jump training"']],
  [['raideur', 'stiffness'], ['stiffness']],

  // ── Endurance
  [['vo2max', 'vo2 max', 'consommation maximale d oxygene', 'consommation maximale oxygene', 'capacite aerobie', 'puissance aerobie', 'puissance maximale aerobie', 'pma'],
   ['VO2max', '"VO2 max"', '"maximal oxygen uptake"', '"aerobic capacity"', '"cardiorespiratory fitness"']],
  [['vma', 'vitesse maximale aerobie', 'vitesse aerobie maximale'], ['"maximal aerobic speed"', '"velocity at VO2max"']],
  [['seuil', 'seuil anaerobie', 'seuil lactique', 'seuil ventilatoire', 'lactate'], ['threshold', 'lactate']],
  [['economie de course', 'running economy'], ['"running economy"']],
  [['endurance de force', 'endurance musculaire', 'muscular endurance'], ['"muscular endurance"']],
  [['endurance', 'aerobie', 'aerobic'], ['endurance', 'aerobic']],
  [['fractionne', 'intermittent', 'interval', 'intervalle', 'hiit', 'haute intensite', 'high intensity interval'],
   ['"high-intensity interval"', 'HIIT', '"interval training"']],
  [['sprint interval', 'sit', 'sprint interval training'], ['"sprint interval"']],
  [['repetition de sprint', 'sprints repetes', 'sprint repete', 'rsa', 'repeated sprint'], ['"repeated sprint"']],
  [['jeux reduits', 'jeu reduit', 'petits jeux', 'ssg', 'small sided game', 'small sided games'], ['"small-sided games"', '"small-sided game"', 'SSG']],
  [['distribution de l intensite', 'polarise', 'polarisation', 'entrainement polarise'], ['"intensity distribution"', 'polarized']],

  // ── Vitesse et changements de direction
  [['vitesse maximale', 'vitesse max', 'vitesse de pointe', 'top speed'], ['"maximal velocity"', '"maximum velocity"', '"top speed"']],
  [['acceleration', 'demarrage'], ['acceleration', '"short sprint"']],
  [['changement de direction', 'changements de direction', 'agilite', 'cod', 'appui', 'change of direction', 'agility'],
   ['"change of direction"', '"change-of-direction"', 'agility']],
  [['traineau', 'sled', 'sprint resiste', 'course lestee', 'sprint leste', 'resisted sprint'], ['sled', '"resisted sprint"']],
  [['sprint', 'vitesse', 'vitesse de course', 'vitesse lineaire', 'speed'], ['sprint*', '"running speed"']],

  // ── Force et puissance
  [['explosivite', 'force explosive', 'rfd', 'taux de developpement de la force', 'rate of force development'],
   ['"explosive strength"', '"rate of force development"']],
  [['vbt', 'velocity based', 'vitesse d execution', 'entrainement base sur la vitesse'], ['"velocity-based"', '"movement velocity"']],
  [['entrainement concurrent', 'concurrent', 'force et endurance', 'endurance et force', 'concurrent training'], ['"concurrent training"', 'concurrent']],
  [['complex training', 'methode contraste', 'contraste', 'potentialisation', 'ppap', 'pap', 'post activation'],
   ['"complex training"', '"contrast training"', '"post-activation"']],
  [['musculation', 'renforcement', 'renforcement musculaire', 'entrainement en force', 'entrainement de force', 'strength training', 'resistance training'],
   ['"resistance training"', '"strength training"']],
  [['force maximale', 'force max', 'force', '1rm', 'rm', 'strength'], ['"maximal strength"', '"muscular strength"', '"muscle strength"', '1RM']],
  [['puissance', 'power'], ['power']],
  [['charge lourde', 'charges lourdes', 'lourd'], ['"heavy load"', '"high-load"', '"high load"']],
  [['charge legere', 'charges legeres', 'leger'], ['"low-load"', '"low load"', '"light load"']],
  [['charge', 'load'], ['load']],
  [['volume'], ['volume']],
  [['frequence', 'frequency'], ['frequency']],
  [['intensite', 'intensity'], ['intensity']],
  [['echec', 'echec musculaire', 'failure'], ['failure']],
  [['periodisation', 'periodization'], ['periodization', 'periodisation']],
  [['affutage', 'tapering', 'taper'], ['taper*']],
  [['isometrique', 'isometrie', 'gainage isometrique', 'isometric'], ['isometric']],
  [['excentrique', 'eccentric'], ['eccentric']],
  [['nordic', 'nordique', 'ischio', 'ischio jambier', 'ischios', 'hamstring'], ['hamstring*', 'Nordic']],
  [['flywheel', 'inertiel', 'isoinertiel'], ['flywheel', 'isoinertial']],
  [['bfr', 'occlusion', 'restriction du flux sanguin', 'blood flow restriction'], ['"blood flow restriction"']],
  [['electrostimulation', 'electromyostimulation', 'ems'], ['electrostimulation', '"electrical stimulation"']],
  [['hypertrophie', 'prise de masse', 'masse musculaire', 'prise de muscle', 'hypertrophy'], ['hypertrophy', '"muscle mass"']],
  [['gainage', 'tronc', 'core', 'sangle abdominale'], ['"core stability"', '"core training"', '"core strength"']],

  // ── Santé, récupération, mobilité
  [['prevention des blessures', 'prevention blessure', 'risque de blessure', 'injury prevention'], ['"injury prevention"', '"injury risk"']],
  [['blessure', 'lesion', 'injury'], ['injur*']],
  [['tendon', 'tendinopathie', 'tendinite'], ['tendon*', 'tendinopathy']],
  [['etirement', 'souplesse', 'mobilite', 'amplitude', 'flexibilite', 'stretching', 'flexibility'], ['stretching', 'flexibility', '"range of motion"']],
  [['echauffement', 'warm up'], ['"warm-up"', '"warm up"']],
  [['recuperation', 'recovery'], ['recovery']],
  [['sommeil', 'sleep'], ['sleep']],
  [['fatigue'], ['fatigue']],
  [['test', 'tests', 'evaluation', 'testing'], ['test*', 'assessment']],
  [['equilibre', 'proprioception', 'balance'], ['balance', 'proprioception']],
  [['altitude', 'hypoxie', 'hypoxia'], ['altitude', 'hypoxi*']],
  [['chaleur', 'heat'], ['heat']],
  [['froid', 'cryotherapie', 'bain froid', 'cold water'], ['cryotherapy', '"cold water"']],
  [['cafeine', 'caffeine'], ['caffeine']],
  [['creatine'], ['creatine']],
  [['beta alanine'], ['"beta-alanine"']],
  [['bicarbonate'], ['bicarbonate']],
  [['jus de betterave', 'betterave', 'nitrate'], ['beetroot', 'nitrate']],

  // ── Sports et populations
  [['football', 'foot', 'footballeur', 'footballeuse', 'soccer'], ['soccer', 'football']],
  [['basket', 'basketball', 'basketteur'], ['basketball']],
  [['handball', 'hand'], ['handball']],
  [['rugby', 'rugbyman'], ['rugby']],
  [['tennis'], ['tennis']],
  [['volley', 'volleyball'], ['volleyball']],
  [['natation', 'nageur', 'nageuse', 'swimming'], ['swim*']],
  [['cyclisme', 'cycliste', 'velo', 'cycling'], ['cycling', 'cyclist*']],
  [['course a pied', 'coureur', 'coureuse', 'running', 'course', 'trail'], ['running', 'runner*']],
  [['athletisme', 'sprinter', 'sprinteur', 'track and field'], ['"track and field"', 'sprinter*']],
  [['sport collectif', 'sports collectifs', 'sport co', 'team sport'], ['"team sport*"']],
  [['sport de combat', 'sports de combat', 'combat', 'judo', 'boxe', 'mma'], ['"combat sport*"', 'judo', 'boxing']],
  [['femme', 'feminin', 'feminine', 'fille', 'female', 'women'], ['female*', 'women']],
  [['homme', 'masculin', 'male', 'men'], ['male*', 'men']],
  [['jeune', 'adolescent', 'enfant', 'junior', 'youth'], ['youth', 'adolescent*', 'children']],
  [['senior', 'personne agee', 'personnes agees', 'older adult', 'elderly'], ['"older adults"', 'elderly']],
  [['athlete', 'sportif', 'sportive', 'elite', 'haut niveau', 'athletes'], ['athlete*', 'elite']]
];

// Mots sans contenu pour la recherche (déjà au singulier et sans accents).
const VIDES = new Set(('de du des la le les l d un une et ou en sur pour avec a au aux chez par entre dans sans comment quel quelle '
  + 'effet impact influence benefice bienfait interet developpement developper amelioration ameliorer augmenter augmentation '
  + 'optimiser optimisation travail travailler methode meilleur meilleure efficacite efficace role lien relation etude meta analyse '
  + 'programme entrainement exercice exercices joueur joueuse pratiquant personne sujet gain progres progresser performance '
  + 'the of and on in for with effect training exercise how best').split(' ').map(m => singulier(m)));

export function normaliser(texte){
  return String(texte || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’'`\-_/.,;:!?()«»"+&]+/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

// Pluriels simples : « sauts » -> « saut », « jeux » -> « jeu ». Le x final n'est retiré
// qu'après « au »/« eu » : « vo2max » ou « max » restent intacts.
function singulier(m){
  if(m.length > 3 && /s$/.test(m) && !/(ss|us|is)$/.test(m)) return m.slice(0, -1);
  if(m.length > 4 && /(aux|eux)$/.test(m)) return m.slice(0, -1);
  return m;
}

// Lexique pré-découpé, expressions les plus longues d'abord.
const ENTREES = LEXIQUE.flatMap(([formes, en]) =>
  formes.map(f => ({ mots: normaliser(f).split(' ').map(singulier), en }))
).sort((a, b) => b.mots.length - a.mots.length);

/**
 * Analyse un texte libre.
 * @returns {{ groupes: Array<{fr:string, en:string[], inconnu?:boolean}>, inconnus: string[] }}
 */
export function analyser(texte){
  const bruts = normaliser(texte).split(' ').filter(Boolean);   // pour l'affichage
  const tokens = bruts.map(singulier);                          // pour la comparaison
  const groupes = [];
  const inconnus = [];
  let i = 0;
  while(i < tokens.length){
    const e = ENTREES.find(x => x.mots.length <= tokens.length - i && x.mots.every((m, k) => tokens[i + k] === m));
    if(e){
      if(!groupes.some(g => g.en === e.en)) groupes.push({ fr: bruts.slice(i, i + e.mots.length).join(' '), en: e.en });
      i += e.mots.length;
      continue;
    }
    const t = tokens[i], brut = bruts[i];
    // Mot inconnu : lettres et chiffres seulement (normaliser() a retiré le reste).
    // On cherche la forme tapée (brut), pas la forme « singularisée ».
    if(!VIDES.has(t) && brut.length > 1 && /^[a-z0-9]+$/.test(brut) && !inconnus.includes(brut)){
      inconnus.push(brut);
      groupes.push({ fr: brut, en: [brut], inconnu: true });
    }
    i++;
  }
  return { groupes, inconnus };
}

/**
 * Construit la requête Europe PMC à partir des groupes.
 * @param champ 'TITLE' (précis) ou 'TITLE_ABS' (titre ou résumé : plus de résultats)
 */
export function construireRequete(groupes, champ = 'TITLE'){
  return (groupes || [])
    .map(g => '(' + g.en.map(t => `${champ}:${t}`).join(' OR ') + ')')
    .join(' AND ');
}
