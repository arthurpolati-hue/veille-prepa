// Veille prépa physique — logique de la page.
//
// Tout se passe dans le navigateur : pas de serveur, pas de compte.
//  - Flux : API publique d'Europe PMC (CORS ouvert, sans clé), filtrée sur les méta-analyses
//    et revues systématiques, articles rétractés exclus. Mis en cache 12 h par sujet.
//  - Sujets de l'utilisateur : localStorage (propre à l'appareil). Transfert vers un autre
//    appareil par un lien qui contient les sujets dans l'ancre (#sujets=…), jamais envoyée
//    au serveur.
// Contenu externe : toujours échappé ; les liens sont reconstruits vers doi.org ou europepmc.org.

import { THEMES, REFERENCES, EXCLUSIONS_CLINIQUES } from './themes.js';
import { analyser, construireRequete } from './traduction.js';
import { chercher as chercherPubmed, lienArticle } from './pubmed.js';

// PubMed (NCBI) depuis le 22/09/2026 : Europe PMC a cessé d'envoyer les en-têtes CORS,
// son API est devenue inutilisable depuis un navigateur (détails dans pubmed.js).
const FILTRE = ' AND (meta-analysis[pt] OR systematic review[pt]) NOT retracted publication[pt]';
const CACHE_MS = 12 * 3600 * 1000;
const SEUIL_ELARGIR = 5;            // moins de résultats dans les titres -> on cherche aussi dans les résumés
const CLE_ETAT = 'veille-prepa:etat:v1';
const ID_RECHERCHE = '__recherche';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const escapeHtml = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = iso => { const s = String(iso || ''); return s.length >= 10 ? `${s.slice(8, 10)}/${s.slice(5, 7)}/${s.slice(0, 4)}` : s; };

/* ───────────────────────────── État ───────────────────────────── */

function etatParDefaut(){
  return { version: 1, masques: [], perso: [], ordre: THEMES.map(t => t.k), actif: THEMES[0].k, tri: 'recent' };
}

// Valide tout ce qui vient du stockage ou d'un lien de transfert (données non fiables).
function normaliserEtat(e){
  const d = etatParDefaut();
  if(!e || typeof e !== 'object') return d;
  const perso = (Array.isArray(e.perso) ? e.perso : [])
    .filter(p => p && typeof p.id === 'string' && /^p[a-z0-9]{4,20}$/.test(p.id) && typeof p.titre === 'string')
    .slice(0, 60)
    .map(p => ({
      id: p.id,
      titre: p.titre.slice(0, 80) || 'Sujet',
      saisie: String(p.saisie || '').slice(0, 200),
      manuel: String(p.manuel || '').slice(0, 2000),
      cree: Number(p.cree) || Date.now()
    }));
  const ids = new Set([...THEMES.map(t => t.k), ...perso.map(p => p.id)]);
  const ordre = (Array.isArray(e.ordre) ? e.ordre : []).filter((id, i, arr) => ids.has(id) && arr.indexOf(id) === i);
  ids.forEach(id => { if(!ordre.includes(id)) ordre.push(id); });
  return {
    version: 1,
    masques: (Array.isArray(e.masques) ? e.masques : []).filter(k => THEMES.some(t => t.k === k)),
    perso,
    ordre,
    actif: ids.has(e.actif) ? e.actif : d.actif,
    tri: e.tri === 'cite' ? 'cite' : 'recent'
  };
}

function chargerEtat(){
  try{ return normaliserEtat(JSON.parse(localStorage.getItem(CLE_ETAT) || 'null')); }
  catch(_){ return etatParDefaut(); }
}
function sauverEtat(){
  try{ localStorage.setItem(CLE_ETAT, JSON.stringify(etat)); }catch(_){ /* stockage plein ou refusé : l'état reste en mémoire */ }
}

let etat = chargerEtat();
let recherche = null;               // recherche ponctuelle en cours (non enregistrée)
let gestionOuverte = false;

/* ───────────────────────────── Sujets ───────────────────────────── */

// Forme commune à un sujet pré-intégré, personnel ou à la recherche ponctuelle.
function versSujet(id){
  if(id === ID_RECHERCHE && recherche) return sujetPerso({ ...recherche, id: ID_RECHERCHE }, true);
  const t = THEMES.find(x => x.k === id);
  if(t) return { id: t.k, titre: t.l, emoji: t.emoji, preset: true, synthese: t.synthese,
                 requete: '(' + t.requete + ')' + EXCLUSIONS_CLINIQUES, requeteLarge: null };
  const p = etat.perso.find(x => x.id === id);
  return p ? sujetPerso(p, false) : null;
}

function sujetPerso(p, ponctuel){
  if(p.manuel){
    return { id: p.id, titre: p.titre, emoji: ponctuel ? '🔎' : '📌', preset: false, ponctuel,
             saisie: p.saisie, requete: p.manuel, requeteLarge: null, analyse: null };
  }
  const a = analyser(p.saisie);
  // Même filtre que les sujets pré-intégrés : sans lui, « VO2max » ramène surtout de la réadaptation cardiaque.
  const avecFiltre = q => q ? '(' + q + ')' + EXCLUSIONS_CLINIQUES : '';
  return { id: p.id, titre: p.titre, emoji: ponctuel ? '🔎' : '📌', preset: false, ponctuel, saisie: p.saisie, analyse: a,
           requete: avecFiltre(construireRequete(a.groupes, 'ti', a.mode)),
           requeteLarge: avecFiltre(construireRequete(a.groupes, 'tiab', a.mode)) };
}

const sujetsVisibles = () => etat.ordre
  .filter(id => !etat.masques.includes(id))
  .map(versSujet)
  .filter(Boolean);

const nouvelId = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const majuscule = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

/* ───────────────────────────── Rendu ───────────────────────────── */

function renderChips(){
  const visibles = sujetsVisibles();
  if(!visibles.some(s => s.id === etat.actif) && etat.actif !== ID_RECHERCHE){
    etat.actif = visibles.length ? visibles[0].id : ID_RECHERCHE;
  }
  $('#chips').innerHTML = (recherche
      ? `<button class="chip recherche ${etat.actif === ID_RECHERCHE ? 'actif' : ''}" type="button" data-sujet="${ID_RECHERCHE}">🔎 ${escapeHtml(recherche.titre)}</button>`
      : '')
    + visibles.map(s => `<button class="chip ${s.id === etat.actif ? 'actif' : ''}" type="button" data-sujet="${escapeHtml(s.id)}">${s.emoji} ${escapeHtml(s.titre)}</button>`).join('')
    + (visibles.length === 0 && !recherche ? '<p class="vide">Aucun sujet affiché : ouvre « Gérer » pour en réafficher, ou cherche un sujet.</p>' : '');
}

function renderCompris(){
  const zone = $('#compris');
  if(!recherche){ zone.innerHTML = ''; return; }
  const s = versSujet(ID_RECHERCHE);
  const dejaAjoute = etat.perso.some(p => p.saisie.toLowerCase() === recherche.saisie.toLowerCase() && p.manuel === recherche.manuel);
  const mots = s.analyse
    ? s.analyse.groupes.map(g => g.inconnu
        ? `<span class="mot inconnu" title="Mot non reconnu, cherché tel quel">${escapeHtml(g.fr)} <small>(non traduit)</small></span>`
        : `<span class="mot">${escapeHtml(g.fr)} <small>→ ${escapeHtml(g.en.map(x => x.replace(/"/g, '')).join(', '))}</small></span>`).join('')
    : '<span class="mot">requête personnalisée</span>';
  zone.innerHTML = `<div class="compris">
    <div class="compris-titre">Mots-clés compris</div>
    <div class="mots">${mots}</div>
    ${s.analyse && s.analyse.inconnus.length ? `<p class="avertissement">« ${escapeHtml(s.analyse.inconnus.join(' », « '))} » n'est pas dans le lexique : cherché tel quel (en anglais, ça marche). S'il n'y a aucun résultat, retire ce mot ou tape-le en anglais.</p>` : ''}
    <details class="avance">
      <summary>Ajuster la requête (avancé, en anglais)</summary>
      <textarea id="requeteManuelle" spellcheck="false">${escapeHtml(s.requete)}</textarea>
      <button class="btn btn-ghost btn-sm" type="button" id="appliquerRequete" style="margin-top:6px;">Appliquer</button>
    </details>
    <div class="ajout">
      <input type="text" id="nomSujet" maxlength="80" value="${escapeHtml(recherche.titre)}" aria-label="Nom du sujet">
      <button class="btn btn-blue btn-sm" type="button" id="ajouterSujet" ${dejaAjoute ? 'disabled' : ''}>${dejaAjoute ? 'Déjà dans mes sujets ✓' : '+ Ajouter à mes sujets'}</button>
    </div>
  </div>`;
}

function renderGestion(){
  const zone = $('#gestion');
  zone.classList.toggle('ouverte', gestionOuverte);
  $('#gererBtn').textContent = gestionOuverte ? 'Fermer' : 'Gérer';
  $('#gererBtn').setAttribute('aria-expanded', String(gestionOuverte));
  if(!gestionOuverte){ zone.innerHTML = ''; return; }
  const n = etat.ordre.length;
  zone.innerHTML = `<h2>Gérer mes sujets</h2>
    <p class="sub" style="margin:0 0 6px;font-size:0.84rem;">Change l'ordre, masque un sujet pré-intégré, renomme ou supprime tes sujets.</p>
    ${etat.ordre.map((id, i) => {
      const s = versSujet(id);
      if(!s) return '';
      const masque = etat.masques.includes(id);
      return `<div class="g-ligne ${masque ? 'masque' : ''}" data-id="${escapeHtml(id)}">
        <div class="g-nom">${s.emoji} ${escapeHtml(s.titre)}<small>${s.preset ? 'Pré-intégré, avec synthèse' : 'Mots-clés : ' + escapeHtml(s.saisie || 'requête personnalisée')}</small></div>
        <div class="g-actions">
          <button class="btn btn-ghost btn-sm" type="button" data-action="monter" ${i === 0 ? 'disabled' : ''} aria-label="Monter">↑</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="descendre" ${i === n - 1 ? 'disabled' : ''} aria-label="Descendre">↓</button>
          ${s.preset
            ? `<button class="btn btn-ghost btn-sm" type="button" data-action="${masque ? 'afficher' : 'masquer'}">${masque ? 'Réafficher' : 'Masquer'}</button>`
            : `<button class="btn btn-ghost btn-sm" type="button" data-action="renommer">Renommer</button>
               <button class="btn btn-ghost btn-sm" type="button" data-action="motscles">Mots-clés</button>
               <button class="btn btn-danger btn-sm" type="button" data-action="supprimer">Supprimer</button>`}
        </div>
      </div>`;
    }).join('')}
    <div class="g-bas">
      <button class="btn btn-ghost btn-sm" type="button" id="transfererBtn">Transférer mes sujets sur un autre appareil</button>
      <button class="btn btn-danger btn-sm" type="button" id="reinitBtn">Tout réinitialiser</button>
    </div>
    <div id="transfertZone"></div>`;
}

function lienSource(doi){
  const ref = REFERENCES[doi];
  const libelle = ref ? `${ref.auteurs}, ${ref.annee} — ${ref.revue}` : doi;
  return `<a class="src-chip" href="https://doi.org/${encodeURI(doi)}" target="_blank" rel="noopener" title="${escapeHtml(ref ? ref.titre + ' · ' + ref.type : doi)}">${escapeHtml(libelle)}</a>`;
}

function renderContenu(){
  const s = versSujet(etat.actif);
  const zone = $('#contenu');
  if(!s){ zone.innerHTML = ''; return; }
  const sy = s.synthese;
  zone.innerHTML = `
    <div class="sujet-tete">
      <h2>${s.emoji} ${escapeHtml(s.titre)}</h2>
      <span class="badge">${s.preset ? 'Sujet pré-intégré' : s.ponctuel ? 'Recherche ponctuelle' : 'Mon sujet'}</span>
    </div>
    ${sy ? `<div class="card">
      <h2>Ce qu'on sait aujourd'hui</h2>
      <p class="synth-maj">Synthèse mise à jour le ${escapeHtml(fmtDate(sy.maj))} · chaque chiffre vérifié dans l'étude citée</p>
      ${sy.intro ? `<p class="synth-intro">${sy.intro}</p>` : ''}
      ${sy.points.map(p => `<div class="synth-point">
        <h3>${escapeHtml(p.titre)}</h3>
        <p>${p.texte}</p>
        <div class="src-chips">${p.sources.map(lienSource).join('')}</div>
      </div>`).join('')}
    </div>` : ''}
    <div class="card">
      <div class="flux-tete">
        <h2>Méta-analyses</h2>
        <button class="btn btn-ghost btn-sm" type="button" id="rafraichir" aria-label="Actualiser">↻</button>
      </div>
      ${sy ? '' : `<p class="note" style="margin:0 0 6px;">Pas de synthèse rédigée pour ce sujet : voici les méta-analyses trouvées, avec la conclusion de leurs auteurs.</p>`}
      <div id="flux"><p class="vide">Recherche des méta-analyses…</p></div>
      <p class="note" id="fluxNote"></p>
    </div>`;
  chargerFlux(s, false);
}

function renderTout(){
  renderChips();
  renderCompris();
  renderGestion();
  renderContenu();
}

/* ───────────────────────────── Flux Europe PMC ───────────────────────────── */

// Titres et résumés arrivent avec des balises et parfois des entités doublement encodées
// (« &lt;sub&gt;2&lt;/sub&gt; ») : on décode, puis on retire les balises.
function texteBrut(v){
  let s = String(v || '');
  for(let k = 0; k < 2; k++){
    s = s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  }
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+([.,;:)])/g, '$1').replace(/\s+/g, ' ').trim();
}

// Conclusion des auteurs : section « Conclusion(s) » du résumé si elle existe, sinon ses
// deux dernières phrases. Les mentions d'enregistrement et de financement sont coupées.
function extraireConclusion(html){
  if(!html) return '';
  let t = String(html);
  for(let k = 0; k < 2; k++) t = t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  t = t.replace(/<h4>\s*([^<]*)<\/h4>/gi, ' ##$1## ').replace(/<\/?[a-z][^>]*>/gi, ' ').replace(/\s+/g, ' ').trim();
  const m = t.match(/(?:##\s*|\b)(?:CONCLUSIONS?(?: AND RELEVANCE)?|Conclusions?(?: and relevance)?|INTERPRETATION|Interpretation)\s*(?:##)?\s*:?\s*(.+)$/);
  let c = m ? m[1] : t.split('. ').slice(-2).join('. ');
  c = c.replace(/##[^#]*##/g, ' ')
       .split(/\s(?:Registration|PROSPERO|Trial registration|Systematic review registration|Protocol registration|Funding|This (?:review|study|work|meta-analysis) (?:received|was (?:funded|supported)))\b/i)[0].trim();
  return c.length > 520 ? c.slice(0, 520).replace(/\s+\S*$/, '') + '…' : c;
}

function hacher(s){
  let h = 5381;
  for(let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

// PubMed trie par date. Le tri « plus citées » n'existe pas dans les E-utilities :
// l'option a été retirée de l'écran.
async function interroger(requete){
  return chercherPubmed(requete + FILTRE);
}

let jetonFlux = 0;
async function chargerFlux(s, forcer){
  const jeton = ++jetonFlux;
  if(!s.requete){
    $('#flux').innerHTML = '<p class="vide">Aucun mot-clé exploitable : essaie d\'autres mots.</p>';
    $('#fluxNote').textContent = '';
    return;
  }
  const cle = 'veille-prepa:flux:v2:' + hacher(s.requete + '|' + (s.requeteLarge || ''));
  let cache = null;
  try{ cache = JSON.parse(localStorage.getItem(cle) || 'null'); }catch(_){}
  if(!forcer && cache && Date.now() - cache.t < CACHE_MS){ renderFlux(cache); return; }

  $('#flux').innerHTML = '<p class="vide">Recherche des méta-analyses…</p>';
  try{
    let res = await interroger(s.requete);
    let large = false;
    if(res.total < SEUIL_ELARGIR && s.requeteLarge){
      const r2 = await interroger(s.requeteLarge);
      if(r2.total > res.total){ res = r2; large = true; }
    }
    cache = { t: Date.now(), total: res.total, items: res.items, large };
    try{ localStorage.setItem(cle, JSON.stringify(cache)); }catch(_){}
    if(jeton === jetonFlux) renderFlux(cache);
  } catch(e){
    console.error('[veille] Europe PMC indisponible', e);
    if(jeton !== jetonFlux) return;
    if(cache){ renderFlux(cache, true); return; }
    $('#flux').innerHTML = '<p class="vide">Impossible de joindre Europe PMC pour l\'instant (réseau ou service indisponible). Réessaie dans un moment.</p>';
    $('#fluxNote').textContent = '';
  }
}

// Les articles sont en anglais. Pas d'IA ni de clé : on ouvre Google Traduction avec le
// titre et la conclusion (contenu public). Les textes portent lang="en" pour que Safari
// et Chrome proposent aussi de traduire la page entière.
function lienTraduction(it){
  const texte = [it.titre, it.conclusion].filter(Boolean).join('\n\n').slice(0, 4500);
  return 'https://translate.google.com/?sl=en&tl=fr&op=translate&text=' + encodeURIComponent(texte);
}

function renderFlux(cache, horsLigne){
  const il30j = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
  const items = cache.items || [];
  $('#flux').innerHTML = items.length ? items.map(it => {
    const lien = lienArticle(it);
    const type = it.metaAnalyse ? 'Méta-analyse' : 'Revue systématique';
    const noms = it.auteurs || [];
    const auteurs = noms.slice(0, 2).join(', ') + (noms.length > 2 ? ' et al.' : '');
    return `<div class="flux-item">
      <div class="flux-meta">
        ${it.date >= il30j ? '<span class="flux-badge neuf">Nouveau</span>' : ''}
        <span class="flux-badge">${type}</span>
        <span>${escapeHtml(fmtDate(it.date))}${it.revue ? ' · ' + escapeHtml(it.revue) : ''}</span>
      </div>
      ${lien ? `<a class="flux-titre" href="${escapeHtml(lien)}" target="_blank" rel="noopener" lang="en">${escapeHtml(it.titre)}</a>`
             : `<span class="flux-titre" lang="en">${escapeHtml(it.titre)}</span>`}
      <div class="flux-meta" style="margin-top:4px;">${escapeHtml(auteurs)}</div>
      ${it.conclusion ? `<p class="flux-concl" lang="en"><span>Conclusion des auteurs</span>${escapeHtml(it.conclusion)}</p>` : ''}
      <a class="flux-trad" href="${escapeHtml(lienTraduction(it))}" target="_blank" rel="noopener">🌐 Traduire en français</a>
    </div>`;
  }).join('') : '<p class="vide">Aucune méta-analyse trouvée. Essaie des mots-clés plus larges (par exemple un seul mot de moins).</p>';
  const quand = new Date(cache.t);
  $('#fluxNote').textContent = (horsLigne ? 'Hors ligne : dernière liste enregistrée. ' : '')
    + `${(cache.total || 0).toLocaleString('fr-FR')} publication(s) trouvée(s)`
    + (cache.large ? ' en cherchant aussi dans les résumés (peu de résultats dans les titres seuls)' : '')
    + ` · mis à jour le ${quand.toLocaleDateString('fr-FR')} à ${quand.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.`
    + ' Les articles sont en anglais : « Traduire en français » ouvre la traduction du titre et de la conclusion.';
}

/* ───────────────────────────── Actions ───────────────────────────── */

function lancerRecherche(texte){
  const saisie = texte.trim().slice(0, 200);
  if(!saisie) return;
  const a = analyser(saisie);
  if(a.groupes.length === 0){
    recherche = null;
    $('#compris').innerHTML = '<p class="avertissement" style="margin-top:12px;">Aucun mot-clé exploitable dans cette recherche. Essaie par exemple « plyométrie sprint ».</p>';
    return;
  }
  recherche = { titre: majuscule(saisie), saisie, manuel: '' };
  etat.actif = ID_RECHERCHE;
  renderTout();
}

$('#rechercheForm').addEventListener('submit', e => {
  e.preventDefault();
  lancerRecherche($('#rechercheTexte').value);
});
$$('[data-exemple]').forEach(b => b.addEventListener('click', () => {
  $('#rechercheTexte').value = b.dataset.exemple;
  lancerRecherche(b.dataset.exemple);
}));

$('#compris').addEventListener('click', e => {
  if(e.target.closest('#appliquerRequete')){
    const q = $('#requeteManuelle').value.trim().slice(0, 2000);
    if(!q || !recherche) return;
    recherche.manuel = q;
    renderTout();
    return;
  }
  if(e.target.closest('#ajouterSujet') && recherche){
    const titre = ($('#nomSujet').value.trim() || recherche.titre).slice(0, 80);
    const p = { id: nouvelId(), titre, saisie: recherche.saisie, manuel: recherche.manuel, cree: Date.now() };
    etat.perso.push(p);
    etat.ordre.push(p.id);
    etat.actif = p.id;
    recherche = null;
    $('#rechercheTexte').value = '';
    sauverEtat();
    renderTout();
  }
});

$('#chips').addEventListener('click', e => {
  const b = e.target.closest('[data-sujet]');
  if(!b) return;
  etat.actif = b.dataset.sujet;
  if(etat.actif !== ID_RECHERCHE) sauverEtat();
  renderChips();
  renderContenu();
});

// (le sélecteur de tri a disparu : PubMed ne propose que le tri par date)
$('#contenu').addEventListener('click', e => {
  if(e.target.closest('#rafraichir')) chargerFlux(versSujet(etat.actif), true);
});

$('#gererBtn').addEventListener('click', () => { gestionOuverte = !gestionOuverte; renderGestion(); });

$('#gestion').addEventListener('click', async e => {
  const b = e.target.closest('[data-action]');
  if(b){
    const id = b.closest('[data-id]').dataset.id;
    const i = etat.ordre.indexOf(id);
    const p = etat.perso.find(x => x.id === id);
    switch(b.dataset.action){
      case 'monter':    if(i > 0) [etat.ordre[i - 1], etat.ordre[i]] = [etat.ordre[i], etat.ordre[i - 1]]; break;
      case 'descendre': if(i < etat.ordre.length - 1) [etat.ordre[i + 1], etat.ordre[i]] = [etat.ordre[i], etat.ordre[i + 1]]; break;
      case 'masquer':   if(!etat.masques.includes(id)) etat.masques.push(id); break;
      case 'afficher':  etat.masques = etat.masques.filter(k => k !== id); break;
      case 'renommer': {
        const nom = prompt('Nouveau nom du sujet :', p ? p.titre : '');
        if(p && nom && nom.trim()) p.titre = nom.trim().slice(0, 80);
        break;
      }
      case 'motscles': {
        const mots = prompt('Mots-clés du sujet (en français ou en anglais) :', p ? p.saisie : '');
        if(p && mots && mots.trim()){
          if(analyser(mots).groupes.length === 0){ alert('Aucun mot-clé exploitable : sujet inchangé.'); break; }
          p.saisie = mots.trim().slice(0, 200);
          p.manuel = '';
        }
        break;
      }
      case 'supprimer':
        if(p && confirm(`Supprimer le sujet « ${p.titre} » ?`)){
          etat.perso = etat.perso.filter(x => x !== p);
          etat.ordre = etat.ordre.filter(k => k !== id);
        }
        break;
    }
    sauverEtat();
    renderTout();
    return;
  }
  if(e.target.closest('#transfererBtn')){
    const donnees = { perso: etat.perso, masques: etat.masques, ordre: etat.ordre };
    const lien = location.origin + location.pathname + '#sujets=' + versBase64(JSON.stringify(donnees));
    let copie = false;
    try{ await navigator.clipboard.writeText(lien); copie = true; }catch(_){}
    $('#transfertZone').innerHTML = `<p class="note">${copie ? 'Lien copié ✓ ' : ''}Ouvre ce lien sur ton autre appareil (envoie-le-toi par message ou email) : tes sujets y seront importés.</p>
      <input class="lien-transfert" type="text" readonly value="${escapeHtml(lien)}" aria-label="Lien de transfert">`;
    $('.lien-transfert').select();
    return;
  }
  if(e.target.closest('#reinitBtn')){
    if(!confirm('Revenir aux réglages de départ ? Tes sujets personnels seront supprimés de cet appareil.')) return;
    etat = etatParDefaut();
    recherche = null;
    sauverEtat();
    renderTout();
  }
});

/* ───────────────────────────── Transfert entre appareils ───────────────────────────── */

function versBase64(texte){
  const octets = new TextEncoder().encode(texte);
  let bin = '';
  octets.forEach(o => { bin += String.fromCharCode(o); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function depuisBase64(b64){
  const bin = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

function importerDepuisLien(){
  const m = location.hash.match(/^#sujets=([A-Za-z0-9_-]+)$/);
  if(!m) return;
  history.replaceState(null, '', location.pathname + location.search);
  try{
    const donnees = normaliserEtat({ ...JSON.parse(depuisBase64(m[1])), version: 1 });
    const n = donnees.perso.length;
    if(confirm(`Importer ${n} sujet${n > 1 ? 's' : ''} personnel${n > 1 ? 's' : ''} et ton organisation ? Cela remplace les sujets enregistrés sur cet appareil.`)){
      etat = { ...donnees, actif: etat.actif, tri: etat.tri };
      etat = normaliserEtat(etat);
      sauverEtat();
    }
  } catch(e){
    console.error('[veille] Lien de transfert illisible', e);
    alert('Ce lien de transfert est illisible ou incomplet.');
  }
}

importerDepuisLien();
renderTout();
