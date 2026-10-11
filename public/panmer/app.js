// Panmer front end. All computation runs in worker.js (Pyodide); this file is UI only.

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => (n == null ? '–' : Number(n).toLocaleString('en-US'));

const MINIABC = ['GCAACGTGCTATGGAAGC', 'GCAATAAGTACCAGGAGC', 'GCAGAAACAGCTCTGCGC', 'GCAGGCGCAAGACTGAGC',
  'GCATTGGGGACACTACGC', 'GCGAACTCAAAGGTTGGC', 'GCGACCGAATGTAATTGC', 'GCGGAGGGCCGGGTGGGC',
  'GCGTTAGATTAAAATTGC', 'GCTACGCGGATCGAGAGC', 'GCTGATATACGATGCAGC', 'GCTGGCATGAAGCGACGC',
  'GCTTGTGACGGCTAGGGC'];

const EXAMPLES = [
  { label: 'miniABC (k=4, 18-mers)', tab: 'design', na: 'DNA', mods: [], k: 4, core: 14 },
  { label: 'Hexamers (k=6, 20-mers)', tab: 'design', na: 'DNA', mods: [], k: 6, core: 16 },
  { label: 'DNA + 5mC (k=4)', tab: 'design', na: 'DNA', mods: ['M5C'], m: 'all', k: 4, core: 14 },
  { label: 'modXNA sampler (k=4, ≤1 mod)', tab: 'design', na: 'DNA', mods: ['M6A', 'M5C', 'H5C', '8OG'], m: '1', k: 4, core: 14 },
  { label: 'hexABC-like, minimal (k=6, segments)', tab: 'design', na: 'DNA', mods: [], k: 6, core: 16, mode: 'segments' },
  { label: "miniABC′ replica (k=4)", tab: 'design', na: 'DNA', mods: [], k: 4, core: 14, ref: MINIABC.join('\n'), cons: { maxsc: 4, maxrun: 4 }, effort: '2' },
  { label: 'Analyse miniABC (2019)', tab: 'analyze', na: 'DNA', mods: [], k: 4, oligos: MINIABC.join('\n') },
];

const state = { tab: 'design', na: 'DNA', mods: new Set(), catalog: [], ready: false, last: null, mode: 'tiled' };

// ------------------------------------------------------------------ worker
const worker = new Worker(new URL('worker.js?v=0.2.0', import.meta.url), { type: 'module' });
let seq = 0;
const pending = new Map();
worker.onmessage = (ev) => {
  const d = ev.data;
  if (d.status) return onStatus(d);
  const p = pending.get(d.id);
  if (!p) return;
  pending.delete(d.id);
  d.ok ? p.resolve(d.result) : p.reject(new Error(d.error));
};
const call = (name, payload = {}) => new Promise((resolve, reject) => {
  const id = ++seq;
  pending.set(id, { resolve, reject });
  worker.postMessage({ id, name, payload });
});

function onStatus(d) {
  if (d.status === 'ready') {
    state.ready = true;
    $('#ver').textContent = 'v' + d.version;
    $('#run').disabled = false;
    $('#runan').disabled = false;
    $('#status').textContent = $('#status2').textContent = '';
    loadCatalog().then(() => { applyURL(); estimate(); });
  } else if (d.status === 'error') {
    $('#estimate').innerHTML = `<span class="error">Could not start the engine: ${esc(d.error)}</span>`;
  } else {
    $('#status').innerHTML = $('#status2').innerHTML = `<span class="spinner"></span>${esc(d.status)}`;
  }
}

// ------------------------------------------------------------------ params
function params() {
  const p = {
    alphabet: state.mods.size ? { nucleic: state.na, mods: [...state.mods] } : { preset: state.na },
    k: +$('#k').value, clamp: $('#clamp').value.trim(),
    max_mods: state.mods.size ? $('#maxmods').value : null,
  };
  if (state.tab !== 'analyze') {
    const num = (id) => ($(id).value === '' ? null : +$(id).value);
    Object.assign(p, {
      core: +$('#core').value, seed: +$('#seed').value,
      segmented: state.mode === 'segments', effort: +$('#effort').value,
      constraints: { gc_min: num('#gcmin'), gc_max: num('#gcmax'), max_homopolymer: num('#maxrun'), max_selfcomp: num('#maxsc') },
    });
    const ref = $('#refoligos').value.trim();
    if (ref) p.replica_of = ref.split(/\r?\n/);
  } else p.oligos = $('#oligos').value.split(/\r?\n/);
  return p;
}

function setNucleic(na) {
  state.na = na;
  for (const b of $('#nucleic').querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.v === na));
}

function setMode(m) {
  state.mode = m;
  for (const b of $('#mode').querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.v === m));
}

function syncExtras() {
  const cons = ['#gcmin', '#gcmax', '#maxrun', '#maxsc'].filter((id) => $(id).value !== '').length;
  $('#conscount').textContent = cons ? `${cons} active` : 'none';
  const ref = $('#refoligos').value.trim();
  $('#repcount').textContent = ref ? `${ref.split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('>')).length} reference oligos` : 'off';
  // both force the segment strategy; show that rather than letting it look ignored
  if (cons || ref) setMode('segments');
  $('#modehint').textContent = (cons || ref)
    ? 'Constraints and replica mode need the segment strategy, so it is selected automatically.'
    : 'One reverse-complement-complete master cut into overlapping cores. Segments recombine the master into independent walks and can reach the absolute minimum number of oligos.';
}

function setTab(tab) {
  state.tab = tab;
  for (const t of ['design', 'analyze', 'docs']) $(`#tab-${t}`).setAttribute('aria-selected', String(tab === t));
  // Documentation replaces the whole workbench; the other two share it
  $('#workbench').classList.toggle('hidden', tab === 'docs');
  for (const el of document.querySelectorAll('.docs-only')) el.classList.toggle('hidden', tab !== 'docs');
  for (const el of document.querySelectorAll('.design-only')) el.classList.toggle('hidden', tab !== 'design');
  for (const el of document.querySelectorAll('.analyze-only')) el.classList.toggle('hidden', tab !== 'analyze');
  if (tab === 'docs') scrollTo({ top: 0, behavior: 'smooth' });
}

function syncModUI() {
  const n = state.mods.size;
  $('#modcount').textContent = n ? `${n} selected` : 'none';
  $('#maxmodsfield').classList.toggle('hidden', !n);
  for (const cb of $('#modlist').querySelectorAll('input[data-code]')) cb.checked = state.mods.has(cb.dataset.code);
  for (const cb of $('#fams').querySelectorAll('input[data-fam]')) {
    const fam = visibleMods().filter((b) => b.parent === cb.dataset.fam);
    const sel = fam.filter((b) => state.mods.has(b.code)).length;
    cb.checked = fam.length > 0 && sel === fam.length;
    cb.indeterminate = sel > 0 && sel < fam.length;
    cb.nextElementSibling.textContent = `${cb.dataset.fam}* (${sel}/${fam.length})`;
  }
}

// ------------------------------------------------------------------ catalogue
const FAMS = ['A', 'C', 'G', 'T', 'U'];
const visibleMods = () => state.catalog.filter((b) =>
  ($('#incprot').checked || !b.protected) && ($('#incdup').checked || !b.duplicate_of));

async function loadCatalog() {
  state.catalog = await call('catalog');
  $('#fams').innerHTML = FAMS.map((f) =>
    `<label><input type="checkbox" data-fam="${f}"><span>${f}*</span></label>`).join('');
  renderModList();
}

function renderModList() {
  const q = $('#modfilter').value.trim().toLowerCase();
  const rows = visibleMods().filter((b) => !q || b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q));
  let html = '';
  for (const f of FAMS) {
    const fam = rows.filter((b) => b.parent === f);
    if (!fam.length) continue;
    html += `<div class="grp">${f}-based · paired with ${f === 'A' ? (state.na === 'DNA' ? 'T' : 'U') : { C: 'G', G: 'C', T: 'A', U: 'A' }[f]}</div>`;
    html += fam.map((b) => `<label title="${esc(b.name)}"><input type="checkbox" data-code="${esc(b.code)}">` +
      `<span class="code">${esc(b.code)}</span><span class="nm">${esc(b.name)}</span>` +
      (b.protected ? '<span class="tag">protected</span>' : '') +
      (b.duplicate_of ? `<span class="tag">= ${esc(b.duplicate_of)}</span>` : '') + '</label>').join('');
  }
  $('#modlist').innerHTML = html || '<div class="status" style="padding:8px">No match.</div>';
  syncModUI();
}

// ------------------------------------------------------------------ estimate
let estTimer = null;
function estimate() {
  clearTimeout(estTimer);
  estTimer = setTimeout(async () => {
    if (!state.ready || state.tab !== 'design') return;
    const box = $('#estimate');
    try {
      const e = await call('estimate', params());
      let cls = 'ok', msg = 'comfortable for MD';
      if (!e.feasible) { cls = 'bad'; msg = e.sigma > 0 ? 'too many k-mers for the browser — lower k, the modifications or the cap' : 'core must be at least k'; }
      else if (e.min_oligos > 2000) { cls = 'bad'; msg = 'beyond typical MD budgets (> 2000 oligos)'; }
      else if (e.min_oligos > 200) { cls = 'warn'; msg = 'feasible but large (200–2000 oligos)'; }
      box.className = 'estimate ' + cls;
      box.innerHTML = `<b>${fmt(e.min_oligos)}</b> oligos at least · ${fmt(e.n_classes)} double-stranded ${+$('#k').value}-mer classes · σ = ${e.sigma} windows per core<br><span>${msg}</span>`;
      $('#run').disabled = !e.feasible;
    } catch (err) {
      box.className = 'estimate bad';
      box.innerHTML = `<span class="error">${esc(err.message)}</span>`;
      $('#run').disabled = true;
    }
  }, 120);
}

// ------------------------------------------------------------------ URL state
function toURL(run) {
  const u = new URLSearchParams();
  u.set('tab', state.tab); u.set('na', state.na); u.set('k', $('#k').value); u.set('clamp', $('#clamp').value.trim());
  if (state.mods.size) { u.set('mods', [...state.mods].join(',')); u.set('m', $('#maxmods').value); }
  if (state.tab === 'design') {
    u.set('core', $('#core').value); u.set('seed', $('#seed').value);
    if (state.mode === 'segments') u.set('mode', 'segments');
    if ($('#effort').value !== '1') u.set('effort', $('#effort').value);
    for (const [key, id] of [['gcmin', '#gcmin'], ['gcmax', '#gcmax'], ['maxrun', '#maxrun'], ['maxsc', '#maxsc']]) if ($(id).value !== '') u.set(key, $(id).value);
  }
  if (run) u.set('run', '1');
  history.replaceState(null, '', '?' + u.toString());
  return location.href;
}

function applyURL() {
  const u = new URLSearchParams(location.search);
  if (![...u.keys()].length) return;
  applySettings({
    tab: ['design', 'analyze', 'docs'].includes(u.get('tab')) ? u.get('tab') : 'design', na: u.get('na') || 'DNA', k: u.get('k'), core: u.get('core'),
    seed: u.get('seed'), clamp: u.get('clamp'), m: u.get('m'),
    mods: (u.get('mods') || '').split(',').filter(Boolean),
    mode: u.get('mode'), effort: u.get('effort'),
    cons: ['gcmin', 'gcmax', 'maxrun', 'maxsc'].some((x) => u.get(x))
      ? { gcmin: u.get('gcmin'), gcmax: u.get('gcmax'), maxrun: u.get('maxrun'), maxsc: u.get('maxsc') } : null,
  });
  if (u.get('run') === '1' && state.tab === 'design') runDesign();
}

function applySettings(s) {
  setTab(s.tab || 'design');
  setNucleic(s.na || 'DNA');
  state.mods = new Set(s.mods || []);
  if (s.k != null) $('#k').value = s.k;
  if (s.core != null) $('#core').value = s.core;
  if (s.seed != null) $('#seed').value = s.seed;
  $('#clamp').value = s.clamp ?? 'GC';
  if (s.m) $('#maxmods').value = s.m;
  if (s.oligos != null) $('#oligos').value = s.oligos;
  setMode(s.mode || 'tiled');
  $('#effort').value = s.effort || '1';
  $('#refoligos').value = s.ref || '';
  for (const [id, v] of Object.entries({ '#gcmin': s.cons?.gcmin, '#gcmax': s.cons?.gcmax, '#maxrun': s.cons?.maxrun, '#maxsc': s.cons?.maxsc })) $(id).value = v ?? '';
  $('#consbox').open = !!s.cons;
  $('#repbox').open = !!s.ref;
  syncExtras();
  $('#modsbox').open = state.mods.size > 0;
  renderModList();
  estimate();
}

// ------------------------------------------------------------------ downloads
function download(name, text, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ------------------------------------------------------------------ design
async function runDesign() {
  const btn = $('#run');
  btn.disabled = true;
  $('#status').innerHTML = '<span class="spinner"></span>Designing…';
  const t0 = performance.now();
  try {
    const r = await call('design', params());
    r.elapsed = (performance.now() - t0) / 1000;
    state.last = r;
    renderDesign(r, toURL(true));
    showResults();
    $('#status').textContent = `Done in ${r.elapsed.toFixed(2)} s.`;
  } catch (e) {
    $('#results').innerHTML = `<div class="panel"><p class="error">${esc(e.message)}</p></div>`;
    $('#status').textContent = '';
  } finally { btn.disabled = false; }
}

// on narrow screens the results sit below the form: bring them into view
const showResults = () => { if (matchMedia('(max-width: 900px)').matches) $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' }); };

function stat(v, l, s = '') { return `<div class="stat"><div class="v">${v}</div><div class="l">${l}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`; }

function renderDesign(r, link) {
  const st = r.stats, p = r.params, b = st.bounds;
  const tag = `panmer_k${p.k}_core${p.core}_seed${p.seed}${st.mode === 'segments' ? '_seg' : ''}`;
  const gap = b.tiled - b.independent;
  const rows = r.oligos.map((o) => `<tr><td>${esc(o.id)}</td><td class="seq">${esc(o.watson)}</td>` +
    `<td class="num">${o.gc_core}</td><td class="num">${o.max_homopolymer}</td>` +
    `<td class="num ${o.max_selfcomp >= 6 ? 'flag' : ''}">${o.max_selfcomp}</td>` +
    (r.modxna ? `<td class="num">${o.n_mod_pairs}</td>` : '') + '</tr>').join('');
  $('#results').innerHTML = `
  <div class="panel">
    <h2>Library</h2>
    <div class="stats">
      ${stat(fmt(st.n_oligos), 'oligos', `${p.core + 2 * (p.clamp || '').length}-mers: ${esc(p.clamp)} + ${p.core}-bp core + clamp`)}
      ${stat(`${fmt(b.independent)} / ${fmt(b.tiled)}`, 'lower bounds: independent / tiled', gap ? `tiling one master costs ${gap} extra oligo${gap > 1 ? 's' : ''}` : 'both bounds coincide — this library is minimal')}
      ${stat(fmt(r.estimate.n_classes), `${p.k}-mer classes covered`, `${fmt(st.windows)} windows · ${fmt(st.redundancy)} redundant`)}
      ${st.mode === 'segments'
        ? stat(fmt(st.n_segments), 'segments', 'independent walks, recombined')
        : stat(fmt(st.master_kmers), 'master length (k-mers)', `${fmt(st.master_nt)} nt`)}
      ${st.violations != null ? stat(st.violations === 0 ? 'all pass' : fmt(st.violations), 'sequence constraints', st.violations === 0 ? 'every oligo satisfies them' : '<span class="flag">oligos violating the limits</span>') : ''}
      ${st.replica_collisions != null ? stat(st.replica_collisions === 0 ? 'none' : fmt(st.replica_collisions), 'replica collisions', st.replica_collisions === 0 ? 'every k-mer in a new helical position' : '<span class="flag">k-mers keeping their position</span>') : ''}
    </div>
    <div class="actions">
      <button class="btn small" data-dl="fasta">FASTA</button>
      <button class="btn ghost small" data-dl="csv">CSV</button>
      <button class="btn ghost small" data-dl="json">JSON (all results)</button>
      ${r.modxna ? '<button class="btn ghost small" data-dl="modxna">modXNA build script</button>' : ''}
      <button class="btn ghost small" id="copylink">Copy reproducible link</button>
    </div>
    <div class="tablewrap"><table>
      <thead><tr><th>id</th><th>Watson 5′→3′</th><th>GC core %</th><th>max run</th><th>max self-compl.</th>${r.modxna ? '<th>mod. pairs</th>' : ''}</tr></thead>
      <tbody>${rows}</tbody></table></div>
    <h3>${st.mode === 'segments' ? `Segments (${fmt(st.n_segments)})` : `Master sequence (${fmt(st.master_nt)} nt)`}</h3>
    <div class="seqbox">${st.mode === 'segments' ? r.segments.map((x, i) => `${i + 1}. ${esc(x)}`).join('<br>') : esc(r.master)}</div>
    <p class="status">Panmer ${esc(r.version)} · seed ${p.seed} · self-complementary stretches ≥ 6 bp are highlighted.${p.replica_of ? ' The link carries the parameters but not the reference library, so re-running it needs the reference pasted again — download the JSON to keep the full record.' : ' The same link always reproduces this library.'}</p>
  </div>`;
  const files = {
    fasta: [`${tag}.fasta`, r.fasta], csv: [`${tag}.csv`, r.csv, 'text/csv'],
    json: [`${tag}.json`, JSON.stringify(r, null, 1), 'application/json'], modxna: [`${tag}_modxna.sh`, r.modxna],
  };
  for (const btn of $('#results').querySelectorAll('[data-dl]')) btn.onclick = () => download(...files[btn.dataset.dl]);
  $('#copylink').onclick = async (ev) => {
    try { await navigator.clipboard.writeText(link); ev.target.textContent = 'Link copied'; }
    catch { prompt('Copy this link:', link); }
  };
}

// ------------------------------------------------------------------ analyse
async function runAnalyze() {
  const btn = $('#runan');
  btn.disabled = true;
  $('#status2').innerHTML = '<span class="spinner"></span>Analysing…';
  try {
    const r = await call('analyze', params());
    toURL(false);
    renderAnalyze(r);
    showResults();
    $('#status2').textContent = '';
  } catch (e) {
    $('#results').innerHTML = `<div class="panel"><p class="error">${esc(e.message)}</p></div>`;
    $('#status2').textContent = '';
  } finally { btn.disabled = false; }
}

function renderAnalyze(r) {
  const k = +$('#k').value;
  const rep = Object.entries(r.repeated).sort((a, b) => b[1] - a[1]);
  const complete = r.missing === 0;
  $('#results').innerHTML = `
  <div class="panel">
    <h2>Coverage</h2>
    <div class="stats">
      ${stat(`${fmt(r.covered)} / ${fmt(r.n_classes)}`, `${k}-mer classes covered`, complete ? 'complete' : `<span class="flag">${fmt(r.missing)} missing</span>`)}
      ${stat(fmt(r.n_oligos), 'oligos', `core length ${r.core_lengths.join(', ')} bp`)}
      ${stat(fmt(r.windows), 'k-mer windows', `${fmt(r.redundancy)} redundant`)}
      ${r.bound_independent ? stat(fmt(r.bound_independent), 'minimum possible oligos', r.n_oligos === r.bound_independent ? 'this library is minimal' : `${r.n_oligos - r.bound_independent} above the bound`) : ''}
    </div>
    ${r.out_of_scope ? `<p class="status">${fmt(r.out_of_scope)} covered classes exceed the modification cap and are not counted.</p>` : ''}
    <h3>Repeated classes (${rep.length})</h3>
    <div class="chips">${rep.map(([c, n]) => `<span class="chip">${esc(c)} ×${n}</span>`).join('') || '<span class="status">none</span>'}</div>
    <h3>Per oligo</h3>
    <div class="tablewrap"><table>
      <thead><tr><th>#</th><th>oligo 5′→3′</th><th>GC core %</th><th>max run</th><th>max self-compl.</th></tr></thead>
      <tbody>${r.per_oligo.map((o, i) => `<tr><td>${i + 1}</td><td class="seq">${esc(o.oligo)}</td><td class="num">${(100 * o.gc).toFixed(1)}</td><td class="num">${o.max_homopolymer}</td><td class="num ${o.max_selfcomp >= 6 ? 'flag' : ''}">${o.max_selfcomp}</td></tr>`).join('')}</tbody>
    </table></div>
  </div>`;
}

// ------------------------------------------------------------------ wiring
$('#examples').innerHTML = EXAMPLES.map((e, i) => `<button type="button" class="btn ghost small" data-ex="${i}">${esc(e.label)}</button>`).join('');
$('#examples').onclick = (ev) => {
  const i = ev.target.dataset.ex;
  if (i == null) return;
  const ex = EXAMPLES[i];
  applySettings({ seed: 0, clamp: 'GC', mode: 'tiled', effort: '1', ref: '', cons: null, ...ex });
  if (!state.ready) return;
  ex.tab === 'design' ? runDesign() : runAnalyze();
};
$('#mode').onclick = (ev) => { if (ev.target.dataset.v) { setMode(ev.target.dataset.v); syncExtras(); } };
for (const id of ['#gcmin', '#gcmax', '#maxrun', '#maxsc', '#refoligos']) $(id).addEventListener('input', syncExtras);
$('#useminiabc').onclick = () => { $('#refoligos').value = MINIABC.join('\n'); syncExtras(); };
$('#clearref').onclick = () => { $('#refoligos').value = ''; syncExtras(); };
$('#tab-design').onclick = () => { setTab('design'); syncExtras(); estimate(); };
$('#tab-analyze').onclick = () => setTab('analyze');
$('#tab-docs').onclick = () => setTab('docs');
// links inside the documentation that point back at the app
$('#view-docs').addEventListener('click', (ev) => {
  const a = ev.target.closest('a[href="#design"]');
  if (a) { ev.preventDefault(); setTab('design'); syncExtras(); estimate(); }
});
$('#nucleic').onclick = (ev) => { if (ev.target.dataset.v) { setNucleic(ev.target.dataset.v); renderModList(); estimate(); } };
$('#modlist').onchange = (ev) => {
  const c = ev.target.dataset.code;
  if (!c) return;
  ev.target.checked ? state.mods.add(c) : state.mods.delete(c);
  syncModUI(); estimate();
};
$('#fams').onchange = (ev) => {
  const f = ev.target.dataset.fam;
  if (!f) return;
  for (const b of visibleMods()) if (b.parent === f) ev.target.checked ? state.mods.add(b.code) : state.mods.delete(b.code);
  syncModUI(); estimate();
};
$('#modfilter').oninput = renderModList;
$('#incprot').onchange = $('#incdup').onchange = renderModList;
$('#clearmods').onclick = () => { state.mods.clear(); syncModUI(); estimate(); };
for (const id of ['#k', '#core', '#clamp', '#maxmods']) $(id).addEventListener('input', estimate);
$('#run').onclick = runDesign;
$('#runan').onclick = runAnalyze;
$('#theme').onclick = () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme still switches */ }
};
setTab('design');
syncExtras();
