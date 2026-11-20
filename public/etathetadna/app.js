// ηθDNA web app front end. All computation runs in worker.js (Pyodide, the cg_web package);
// this file is UI only. Messages from Python come in English, each issue with a stable code.

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (x, d = 0) => Number(x).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });

const MAP_EXAMPLES = [
  { id: '1bna', label: '1BNA · B-DNA', file: 'examples/1bna.pdb' },
  { id: '116d', label: '116D · A-DNA', file: 'examples/116d.pdb' },
  { id: '181d', label: '181D · Z-DNA', file: 'examples/181d.pdb' },
  { id: '1kf1', label: '1KF1 · G-quadruplex + K⁺', file: 'examples/1kf1.pdb' },
  { id: '7x7q', label: '7X7Q · protein–DNA (DNA part)', file: 'examples/7x7q_trun.pdb' },
];
const BM_EXAMPLES = [
  { id: '4ocb', label: '4OCB · Z-DNA, 3 M NaCl', file: 'examples/cg_frames/4ocb_cg_md.pdb' },
  { id: '1jpq', label: '1JPQ · G4 + channel K⁺', file: 'examples/cg_frames/1jpq_cg_md.pdb' },
  { id: '116d', label: '116D · A-DNA, 3 M', file: 'examples/cg_frames/116d_3M_cg_md.pdb' },
  { id: '7x7q', label: '7X7Q · protein–DNA (SIRAH)', file: 'examples/cg_frames/7x7q_cg_md.pdb' },
];
const STATUS = { loading_python: 'Loading Python runtime…', loading_numpy: 'Loading numpy…', loading_app: 'Loading the ηθDNA tools…' };
const MAX_FILE = 300e6;          // bytes read whole (PDB, prmtop, restart); trajectories are read frame by frame
const TEMPLATE_NAMES = { B: 'B', A: 'A', s: 'syn', Z: 'Z' };

const state = { ready: false, info: null, map: { text: '', name: '', result: null, seq: 0 }, bm: newBm() };
function newBm() {
  return { mode: 'pdb', pdb: '', pdbName: '', prmtop: '', prmName: '', prmInfo: null, crd: null, crdName: '',
    crdKind: null, crdText: '', nc: null, avail: 0, result: null, running: false, stop: false, seq: 0, frame: 1 };
}

// ------------------------------------------------------------------ worker
// The deployment stamps PAGE_VERSION and the ?v= of every asset (scripts/deploy_danslab.sh);
// locally they stay "dev".
const PAGE_VERSION = '1.0.0.g09053f0';
const worker = new Worker(new URL('worker.js?v=1.0.0.g09053f0', import.meta.url), { type: 'module' });
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
    const stale = PAGE_VERSION !== 'dev' && d.version !== PAGE_VERSION;
    if (stale) {
      let tried = false;
      try { tried = sessionStorage.getItem('etdna-reloaded') === d.version; sessionStorage.setItem('etdna-reloaded', d.version); } catch (e) {}
      if (!tried) { location.reload(); return; }
    }
    state.ready = true;
    $('#ver').textContent = 'v' + d.version;
    call('info').then((info) => { state.info = info; renderModel(info); bootDone(); refreshButtons(); }).catch((e) => bootFailed(e.message));
  } else if (d.status === 'error') {
    bootFailed(d.error);
  } else {
    $('#bootmsg').textContent = STATUS[d.status] || d.status;
  }
}
function bootDone() {
  $('#boot').classList.add('done');
  setTimeout(() => $('#boot').classList.add('hidden'), 400);
}
function bootFailed(msg) {
  $('#bootmsg').textContent = `Could not start the engine: ${msg}`;
  $('#boot').classList.add('failed');
}

// ------------------------------------------------------------------ helpers
function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function b64bytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesB64(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
}
async function fetchText(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  return r.text();
}
function issueList(el, issues) {
  const order = { error: 0, warning: 1, info: 2 };
  el.innerHTML = [...(issues || [])].sort((a, b) => order[a.level] - order[b.level])
    .map((i) => `<li class="${esc(i.level)}">${esc(i.message)}<span class="code">${esc(i.code)}</span></li>`).join('');
}
function showError(el, msg) { el.innerHTML = `<li class="error">${esc(msg)}</li>`; }
function stat(v, l, s = '') { return `<div class="stat"><div class="v">${v}</div><div class="l">${esc(l)}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`; }
function baseName(fname) { return (fname || 'system').replace(/\.[^.]+$/, '').replace(/[^A-Za-z0-9_.-]+/g, '_').slice(0, 40) || 'system'; }
function dropTarget(zone, onFile) {
  for (const ev of ['dragenter', 'dragover']) zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add('over'); });
  for (const ev of ['dragleave', 'drop']) zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove('over'); });
  zone.addEventListener('drop', (e) => { const f = e.dataTransfer.files[0]; if (f) onFile(f); });
}

// ------------------------------------------------------------------ 3D viewers (NGL)
const theme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
const bg = () => (theme() === 'light' ? '#f2f2f2' : '#0b0b0b');
const BASE_COLORS = { A: 0xe5484d, T: 0x3e7bfa, G: 0x30a46c, C: 0xf5a524 };
const TEMPLATE_COLORS = { B: 0x6b7280, A: 0x2563eb, syn: 0xd97706, Z: 0x16a34a };
const ION_COLOR = 0xa855f7;
const OTHER = 0x8c8c8c;
// backbone beads in greys (P lightest), so that colour is left for the bases
const BEAD_COLORS = () => (theme() === 'light'
  ? { P: 0x262626, K: 0x737373, N: 0xa3a3a3 } : { P: 0xf5f5f5, K: 0x9ca3af, N: 0x6b7280 });
const viewers = {};
function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
}
function viewer(key, el) {
  if (!window.NGL || !hasWebGL()) throw new Error('no WebGL');
  if (!viewers[key]) {
    $(el).innerHTML = '';
    viewers[key] = { stage: new NGL.Stage(el.slice(1), { backgroundColor: bg(), tooltip: true }), comps: [], spinning: false };
  }
  return viewers[key];
}
addEventListener('resize', () => { for (const v of Object.values(viewers)) v.stage.handleResize(); });
function disposeViewer(key, el, msg) {
  if (viewers[key]) { viewers[key].stage.dispose(); delete viewers[key]; }
  $(el).innerHTML = `<div class="empty">${esc(msg)}</div>`;
}
// Turn the molecule so that its longest axis lies across the view, then fit it.
function orient(v, comp, sele) {
  try {
    const pa = comp.structure.getPrincipalAxes(sele ? new NGL.Selection(sele) : undefined);
    v.stage.animationControls.rotate(pa.getRotationQuaternion(), 0);
  } catch (e) { /* older NGL: keep the default view */ }
  comp.autoView(sele, 0);
}
function scheme(fn) { return NGL.ColormakerRegistry.addScheme(function () { this.atomColor = fn; }); }
function baseOfRes(name) {
  const m = /^(?:D([ACGT])[X1]|([ACGT])X[35]|D([ACGT])[35]?)$/.exec(name);
  return m ? (m[1] || m[2] || m[3]) : null;
}
function legend(el, items) {
  $(el).innerHTML = items.map(([c, l]) => `<span class="sw"><i style="background:#${c.toString(16).padStart(6, '0')}"></i>${esc(l)}</span>`).join('');
}

// ------------------------------------------------------------------ MAP
const mapState = state.map;
function renderMapExamples() {
  $('#map-examples').innerHTML = MAP_EXAMPLES.map((e) => `<button class="btn ghost small" type="button" data-ex="${e.id}">${esc(e.label)}</button>`).join('');
}
function setMapInput(text, name) {
  mapState.text = text;
  mapState.name = name;
  const kb = text.length / 1024;
  $('#map-fname').textContent = name ? `${name} · ${kb < 1024 ? fmt(kb) + ' kB' : fmt(kb / 1024, 1) + ' MB'}` : '';
  refreshButtons();
}
async function openMapFile(file) {
  if (!file) return;
  if (file.size > MAX_FILE) return showError($('#map-issues'), `${file.name} is too large (${fmt(file.size / 1e6)} MB)`);
  $('#map-paste').value = '';
  setMapInput(await file.text(), file.name);
  runMap();
}
function mapPayload() {
  return {
    pdb: mapState.text, name: baseName(mapState.name),
    g4: { place: $('#g4-place').checked, ion: $('#g4-ion').value, site: $('#g4-site').value, tips: $('#g4-tips').checked },
    build: { salt: +$('#b-salt').value || 0, cation: $('#b-cation').value, ztype: $('#b-ztype').checked, end_restraint: $('#b-endres').checked },
  };
}
async function runMap() {
  if (!state.ready || !mapState.text.trim()) return;
  const mine = ++mapState.seq;
  $('#map-status').innerHTML = '<span class="spinner"></span>Mapping…';
  try {
    const out = await call('map', mapPayload());
    if (mine !== mapState.seq) return;
    mapState.result = out;
    renderMap(out);
    $('#map-status').textContent = '';
  } catch (e) {
    if (mine !== mapState.seq) return;
    mapState.result = null;
    $('#map-status').textContent = '';
    showError($('#map-issues'), e.message);
    for (const id of ['#map-stats', '#map-strandwrap']) $(id).classList.add('hidden');
    $('#map-g4').innerHTML = '';
  }
  refreshButtons();
}
function renderMap(out) {
  const s = out.stats;
  const other = Object.entries(s.input).filter(([k]) => k !== 'DNA').map(([k, v]) => `${fmt(v)} ${k}`).join(', ');
  $('#map-stats').innerHTML = stat(fmt(s.nucleotides), 'nucleotides', other ? `input also had ${esc(other)}` : '') +
    stat(fmt(s.strands), s.strands === 1 ? 'strand' : 'strands') + stat(fmt(s.beads), 'CG beads') +
    stat(`${s.charge > 0 ? '+' : ''}${fmt(s.charge)}`, 'net charge (e)', 'neutralized by the build') +
    stat(fmt(s.channel_ions), 'channel cations', s.channel_ions ? 'G-quadruplex' : '') +
    stat(fmt(s.repeat), 'repeat residues', 'runs of identical bases');
  $('#map-stats').classList.remove('hidden');
  $('#map-strands').innerHTML = '<thead><tr><th>chain</th><th>residues</th><th>5′ → 3′</th></tr></thead><tbody>' +
    out.strands.map((x) => `<tr><td>${esc(x.chain)}</td><td>${x.first}–${x.last} · ${x.n} nt</td><td class="seqcell">${esc(x.sequence)}</td></tr>`).join('') + '</tbody>';
  $('#map-strandwrap').classList.toggle('hidden', !out.strands.length);
  $('#map-g4').innerHTML = (out.g4.report || []).map((l) => `<li>${esc(l)}</li>`).join('');
  issueList($('#map-issues'), out.issues);
  $('#map-cmd').textContent = `${out.command}\n${out.run}`;
  showMapStructure(out).catch(() => {
    disposeViewer('map', '#map-viewer', '3D view unavailable (this browser has no WebGL). The CG structure can still be downloaded.');
  });
}
async function showMapStructure(out) {
  const v = viewer('map', '#map-viewer');
  v.stage.removeAllComponents();
  v.aa = await v.stage.loadFile(new Blob([mapState.text], { type: 'text/plain' }), { ext: 'pdb', name: 'atomistic' });
  v.cg = await v.stage.loadFile(new Blob([out.view_pdb], { type: 'text/plain' }), { ext: 'pdb', name: 'cg' });
  applyMapRepr();
  orient(v, v.cg);
}
function applyMapRepr() {
  const v = viewers.map;
  if (!v || !v.cg) return;
  const by = $('#map-color [aria-pressed="true"]').dataset.v;
  const color = scheme((atom) => {
    const r = atom.resname;
    if (r === 'KW4' || r === 'NW4') return ION_COLOR;
    const b = baseOfRes(r);
    if (by === 'base') return b ? BASE_COLORS[b] : OTHER;
    const n = atom.atomname;
    const bc = BEAD_COLORS();
    if (n.startsWith('P')) return bc.P;
    if (n.startsWith('C4')) return bc.K;
    if (n === 'N9G' || n === 'N9A' || n === 'N1C' || n === 'N1T') return bc.N;
    return b ? BASE_COLORS[b] : OTHER;
  });
  v.cg.removeAllRepresentations();
  v.cg.addRepresentation('ball+stick', { colorScheme: color, radiusType: 'size', radiusSize: 0.32, aspectRatio: 3.0, bondScale: 1.0 });
  v.aa.removeAllRepresentations();
  if ($('#map-showaa').checked) v.aa.addRepresentation('line', { sele: 'not water and not ion', color: theme() === 'light' ? 0x777777 : 0x9a9a9a, opacity: 0.55, linewidth: 1 });
  legend('#map-legend', by === 'base'
    ? [[BASE_COLORS.A, 'A'], [BASE_COLORS.C, 'C'], [BASE_COLORS.G, 'G'], [BASE_COLORS.T, 'T'], [ION_COLOR, 'channel K⁺/Na⁺']]
    : [[BEAD_COLORS().P, 'P'], [BEAD_COLORS().K, 'C4′'], [BEAD_COLORS().N, 'glycosidic N'], [BASE_COLORS.A, 'A'], [BASE_COLORS.C, 'C'],
      [BASE_COLORS.G, 'G'], [BASE_COLORS.T, 'T'], [ION_COLOR, 'channel K⁺/Na⁺']]);
}

// ------------------------------------------------------------------ BACKMAP
const bm = () => state.bm;
function renderBmExamples() {
  $('#bm-examples').innerHTML = BM_EXAMPLES.map((e) => `<button class="btn ghost small" type="button" data-bmex="${e.id}">${esc(e.label)}</button>`).join('');
}
function setBmMode(mode) {
  bm().mode = mode;
  for (const b of $$('#bm-mode button')) b.setAttribute('aria-pressed', String(b.dataset.v === mode));
  $('#bm-pdbin').classList.toggle('hidden', mode !== 'pdb');
  $('#bm-prmin').classList.toggle('hidden', mode !== 'prmtop');
  updateAvail();
}
async function setBmPdb(text, name) {
  const s = bm();
  s.pdb = text;
  s.pdbName = name;
  $('#bm-pdb-fname').textContent = name ? `${name} · ${fmt(text.length / 1024)} kB` : '';
  s.pdbInfo = null;
  if (text) {
    try { s.pdbInfo = await call('pdb_info', { cg_pdb: text }); } catch (e) { showError($('#bm-issues'), e.message); }
  }
  updateAvail();
}
async function openBmPdb(file) {
  if (!file) return;
  if (file.size > MAX_FILE) return showError($('#bm-issues'), `${file.name} is too large`);
  setBmMode('pdb');
  await setBmPdb(await file.text(), file.name);
}
async function openPrmtop(file) {
  if (!file) return;
  const s = bm();
  s.prmtop = await file.text();
  s.prmName = file.name;
  $('#bm-prm-fname').textContent = file.name;
  try { s.prmInfo = await call('prmtop_info', { prmtop: s.prmtop }); } catch (e) { s.prmInfo = null; showError($('#bm-issues'), e.message); }
  await checkNc();
  updateAvail();
}
async function openCoords(file) {
  if (!file) return;
  const s = bm();
  s.crd = file;
  s.crdName = file.name;
  s.nc = null;
  s.crdText = '';
  $('#bm-crd-fname').textContent = `${file.name} · ${fmt(file.size / 1e6, 1)} MB`;
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  if (head[0] === 0x43 && head[1] === 0x44 && head[2] === 0x46) {          // "CDF": NetCDF
    s.crdKind = 'nc';
    let n = 65536;
    try {
      for (;;) {
        const bytes = new Uint8Array(await file.slice(0, Math.min(n, file.size)).arrayBuffer());
        const h = await call('nc_header', { head_b64: bytesB64(bytes), file_size: file.size });
        if (h.need_bytes && n < file.size) { n = h.need_bytes; continue; }
        s.nc = h;
        break;
      }
    } catch (e) { showError($('#bm-issues'), e.message); }
  } else {
    if (file.size > MAX_FILE) return showError($('#bm-issues'), `${file.name} is too large to read whole: use a NetCDF trajectory`);
    s.crdText = await file.text();
    s.crdKind = /^(ATOM|HETATM|MODEL|CRYST1|REMARK|TITLE)/m.test(s.crdText.slice(0, 5000)) ? 'pdb' : 'rst7';
  }
  await checkNc();
  updateAvail();
}
async function checkNc() {
  const s = bm();
  if (s.nc && s.prmInfo && s.nc.natom !== s.prmInfo.natom) {
    showError($('#bm-issues'), `The trajectory has ${fmt(s.nc.natom)} atoms and the prmtop ${fmt(s.prmInfo.natom)}: they do not belong together.`);
  }
}
function availFrames() {
  const s = bm();
  if (s.mode === 'pdb') return s.pdbInfo ? s.pdbInfo.frames : 0;
  if (!s.prmInfo) return 0;
  if (s.crdKind === 'nc') return s.nc ? s.nc.nframes : 0;
  if (s.crdKind === 'rst7') return 1;
  if (s.crdKind === 'pdb') return (s.crdText.match(/^MODEL/gm) || []).length || 1;
  return 0;
}
function updateAvail() {
  const s = bm();
  const n = availFrames();
  s.avail = n;
  const info = [];
  if (s.mode === 'pdb' && s.pdbInfo) {
    const c = Object.entries(s.pdbInfo.content).map(([k, v]) => `${fmt(v)} ${k}`).join(', ');
    info.push(`${fmt(s.pdbInfo.atoms)} beads · ${c}`);
  }
  if (s.mode === 'prmtop' && s.prmInfo) {
    const c = Object.entries(s.prmInfo.solute).map(([k, v]) => `${fmt(v)} ${k}`).join(', ');
    info.push(`prmtop: ${fmt(s.prmInfo.natom)} atoms; solute ${fmt(s.prmInfo.n_solute)} (${c})`);
  }
  if (s.mode === 'prmtop' && s.nc) info.push(`trajectory: ${fmt(s.nc.nframes)} frames${s.nc.program ? ' · ' + esc(s.nc.program) : ''}`);
  $('#bm-inputinfo').innerHTML = info.map(esc).join('<br>');
  const max = state.info ? state.info.max_frames : 100;
  $('#bm-first').max = $('#bm-last').max = Math.max(n, 1);
  $('#bm-first').value = 1;
  $('#bm-last').value = Math.max(n, 1);
  $('#bm-nframes').max = Math.min(Math.max(n, 1), max);
  $('#bm-nframes').value = Math.min(n, 10) || 1;
  $('#bm-avail').innerHTML = n ? `${fmt(n)} frame${n === 1 ? '' : 's'} available. Evenly spaced between <i>From</i> and <i>To</i>, as <code>backmap_dna.py --n-frames</code> does; up to ${max}.`
    : `Evenly spaced between <i>From</i> and <i>To</i>, as <code>backmap_dna.py --n-frames</code> does; up to ${max}.`;
  updateBmCmd();
  refreshButtons();
}
function pickFrames() {
  const n = bm().avail;
  const first = Math.max(1, Math.min(+$('#bm-first').value || 1, n));
  const last = Math.max(first, Math.min(+$('#bm-last').value || n, n));
  const k = Math.max(1, Math.min(+$('#bm-nframes').value || 1, last - first + 1, state.info ? state.info.max_frames : 100));
  if (k === 1) return [first - 1];
  const out = [];
  for (let i = 0; i < k; i++) out.push(Math.round(first - 1 + (i * (last - first)) / (k - 1)));
  return [...new Set(out)];
}
function updateBmCmd() {
  const s = bm();
  const prm = s.mode === 'prmtop' && s.prmName ? s.prmName : 'system.prmtop';
  const traj = s.mode === 'prmtop' && s.crdKind === 'nc' ? s.crdName : 'md.nc';
  const name = baseName(s.mode === 'prmtop' ? s.prmName : s.pdbName);
  let cmd = `python backmap_dna.py ${prm} --traj ${traj} -o out/${name} --n-frames ${+$('#bm-nframes').value || 1}`;
  if (!$('#bm-conf').checked) cmd += ' --no-conformers';
  if ($('#bm-resolvate').checked) cmd += ' --resolvate';
  $('#bm-cmd').textContent = cmd;
}
function bmBusy(on) {
  const s = bm();
  s.running = on;
  $('#bm-stop').classList.toggle('hidden', !on);
  $('#bm-progress').classList.toggle('hidden', !on);
  refreshButtons();
}
function bmProgress(done, total, msg) {
  $('#bm-bar').style.width = `${total ? Math.round((100 * done) / total) : 0}%`;
  $('#bm-msg').textContent = msg;
}
async function runBackmap() {
  const s = bm();
  if (!state.ready || s.running || !s.avail) return;
  const frames = pickFrames();
  const mine = ++s.seq;
  s.stop = false;
  s.result = null;
  bmBusy(true);
  $('#bm-issues').innerHTML = '';
  $('#bm-status').textContent = '';
  const t0 = performance.now();
  const batch = s.mode === 'prmtop' && s.prmInfo && s.prmInfo.n_solute > 3000 ? 2 : 5;
  const merged = { models: [], templates: {}, codes: [], frame_ids: [], issues: [], first: null };
  try {
    for (let i = 0; i < frames.length; i += batch) {
      if (s.stop) break;
      const part = frames.slice(i, i + batch);
      bmProgress(i, frames.length, `Frames ${i + 1}–${i + part.length} of ${frames.length}`);
      const payload = { conformers: $('#bm-conf').checked, first_model: i + 1 };
      if (s.mode === 'pdb') Object.assign(payload, { cg_pdb: s.pdb, frames: part });
      else if (s.crdKind === 'nc') {
        const n = s.prmInfo.n_solute;
        const b64 = [];
        for (const f of part) {
          const off = s.nc.begin + f * s.nc.recsize;
          b64.push(bytesB64(new Uint8Array(await s.crd.slice(off, off + n * 12).arrayBuffer())));
        }
        Object.assign(payload, { prmtop: s.prmtop, frames_b64: b64, n_atoms: n, frame_ids: part.map((f) => f + 1) });
      } else Object.assign(payload, { prmtop: s.prmtop, coords: { format: s.crdKind, text: s.crdText }, frames: part });
      const out = await call('backmap', payload);
      if (mine !== s.seq) return;
      if (!merged.first) merged.first = out;
      merged.models.push(out.pdb.replace(/\nEND\n?$/, ''));
      for (const [k, v] of Object.entries(out.templates)) merged.templates[k] = (merged.templates[k] || 0) + v;
      merged.codes.push(...out.codes);
      merged.frame_ids.push(...(s.mode === 'prmtop' && s.crdKind === 'nc' ? out.frame_ids : part.map((f) => f + 1)));
      for (const x of out.issues) if (!merged.issues.some((y) => y.message === x.message)) merged.issues.push(x);
    }
    if (!merged.first) return;
    const r = { ...merged.first, pdb: merged.models.join('\n') + '\nEND\n', templates: merged.templates, codes: merged.codes,
      frame_ids: merged.frame_ids, frames: merged.codes.length, issues: merged.issues };
    s.result = r;
    const secs = ((performance.now() - t0) / 1000).toFixed(1);
    $('#bm-status').textContent = `${r.frames} frame${r.frames === 1 ? '' : 's'} in ${secs} s${s.stop ? ' (stopped)' : ''}`;
    renderBackmap(r);
  } catch (e) {
    if (mine === s.seq) showError($('#bm-issues'), e.message);
  } finally {
    if (mine === s.seq) bmBusy(false);
  }
}
function renderBackmap(r) {
  const sm = r.summary;
  const total = Object.values(r.templates).reduce((a, b) => a + b, 0);
  const bar = total ? `<div class="bar">${['B', 'A', 'syn', 'Z'].map((k) => `<i style="width:${(100 * (r.templates[k] || 0)) / total}%;background:#${TEMPLATE_COLORS[k].toString(16).padStart(6, '0')}"></i>`).join('')}</div>` : '';
  const tmpl = total ? ['B', 'A', 'syn', 'Z'].filter((k) => r.templates[k]).map((k) => `<span class="tmpl ${k}">${k}</span> ${fmt((100 * r.templates[k]) / total)}%`).join(' &nbsp;') : '';
  $('#bm-stats').innerHTML = stat(fmt(r.frames), r.frames === 1 ? 'frame' : 'frames', r.source) +
    stat(fmt(sm.nucleotides), 'nucleotides', `${sm.dna_chains} strand${sm.dna_chains === 1 ? '' : 's'}`) +
    (sm.protein_residues ? stat(fmt(sm.protein_residues), 'protein residues', 'SIRAH recipe') : '') +
    (sm.channel_ions ? stat(fmt(sm.channel_ions), 'channel cations', 'K⁺/Na⁺') : '') +
    stat(fmt(sm.heavy_atoms), 'heavy atoms per frame') +
    (total ? `<div class="stat" style="grid-column: span 2"><div class="l">templates, all frames${r.conformers ? '' : ' (B only)'}</div><div class="s">${tmpl}</div>${bar}</div>` : '');
  $('#bm-stats').classList.remove('hidden');
  issueList($('#bm-issues'), r.issues);
  $('#bm-framebar').classList.toggle('hidden', r.frames < 2);
  $('#bm-frame').max = r.frames;
  $('#bm-frame').value = 1;
  bm().frame = 1;
  $('#bm-restable').classList.toggle('hidden', !r.residues.some((x) => x.template));
  renderResidueTable();
  updateBmCmd();
  showBmStructure(r).catch(() => disposeViewer('bm', '#bm-viewer', '3D view unavailable (this browser has no WebGL). The structure can still be downloaded.'));
}
function frameTemplates() {
  const r = bm().result;
  const code = r.codes[bm().frame - 1] || '';
  const map = new Map();
  r.residues.forEach((x, i) => { if (code[i] && code[i] !== '-') map.set(`${x.chain}:${x.resid}`, TEMPLATE_NAMES[code[i]]); });
  return map;
}
function renderResidueTable() {
  const r = bm().result;
  if (!r) return;
  const code = r.codes[bm().frame - 1] || '';
  const rows = r.residues.map((x, i) => [x, TEMPLATE_NAMES[code[i]]]).filter(([, t]) => t);
  $('#bm-residues').innerHTML = '<thead><tr><th>chain</th><th>residue</th><th>name</th><th>template</th></tr></thead><tbody>' +
    rows.map(([x, t]) => `<tr><td>${x.chain}</td><td class="num">${x.resid}</td><td>${esc(x.resname)}</td><td><span class="tmpl ${t}">${t}</span></td></tr>`).join('') + '</tbody>';
  $('#bm-frameno').textContent = r.frames > 1 ? `${bm().frame} / ${r.frames} (#${r.frame_ids[bm().frame - 1]})` : '';
}
// For the viewer only: NGL knows DA/DC/DG/DT, so the Amber terminal names (DA5, DG3, ...) are
// written as their base residue (cartoons and base colours then work on the ends too), and the
// channel cations K+/Na+ get the PDB names K/NA and an element column, so that NGL sees ions.
function viewerPdb(pdb) {
  return pdb.split('\n').map((l) => {
    if (!l.startsWith('ATOM  ')) return l;
    const res = l.slice(16, 20).trim();
    if (/^D[ACGT][35]$/.test(res)) return `${l.slice(0, 16)}  ${res.slice(0, 2)}${l.slice(20)}`;
    if (res === 'K+' || res === 'Na+') {
      const el = res === 'K+' ? 'K' : 'NA';
      return `${l.slice(0, 12)}${el.padStart(2).padEnd(4)}${el.padStart(4)}${l.slice(20)}`.padEnd(76) + el.padStart(2);
    }
    return l;
  }).join('\n');
}
async function showBmStructure(r) {
  const v = viewer('bm', '#bm-viewer');
  v.stage.removeAllComponents();
  v.comp = await v.stage.loadFile(new Blob([viewerPdb(r.pdb)], { type: 'text/plain' }), { ext: 'pdb', name: 'backmapped' });
  applyBmRepr();
  orient(v, v.comp, '/0');
}
function applyBmRepr() {
  const v = viewers.bm;
  if (!v || !v.comp) return;
  const model = `/${bm().frame - 1}`;
  const by = $('#bm-color [aria-pressed="true"]').dataset.v;
  const repr = $('#bm-repr [aria-pressed="true"]').dataset.v;
  const tmap = frameTemplates();
  const elementColor = by === 'element';
  const color = elementColor ? 'element' : scheme((atom) => {
    const rn = atom.resname;
    if (rn === 'K+' || rn === 'Na+' || rn === 'K' || rn === 'NA') return ION_COLOR;
    if (by === 'template') {
      const t = tmap.get(`${atom.chainname}:${atom.resno}`);
      return t ? TEMPLATE_COLORS[t] : OTHER;
    }
    const b = /^D([ACGT])$/.exec(rn);
    return b ? BASE_COLORS[b[1]] : OTHER;
  });
  v.comp.removeAllRepresentations();
  if (repr === 'cartoon') {
    v.comp.addRepresentation('cartoon', { sele: `${model} and (nucleic or protein)`, colorScheme: color, aspectRatio: 4 });
    v.comp.addRepresentation('base', { sele: `${model} and nucleic`, colorScheme: color });
  } else {
    v.comp.addRepresentation('licorice', { sele: `${model} and not ion`, colorScheme: color, radiusSize: 0.18 });
  }
  v.comp.addRepresentation('spacefill', { sele: `${model} and ion`, colorScheme: color, radiusScale: 0.7 });
  if (by === 'template') legend('#bm-legend', [[TEMPLATE_COLORS.B, 'B (1BNA)'], [TEMPLATE_COLORS.A, 'A (116D)'], [TEMPLATE_COLORS.syn, 'syn (1JPQ)'], [TEMPLATE_COLORS.Z, 'Z (181D)'], [OTHER, 'protein'], [ION_COLOR, 'K⁺/Na⁺']]);
  else if (by === 'base') legend('#bm-legend', [[BASE_COLORS.A, 'A'], [BASE_COLORS.C, 'C'], [BASE_COLORS.G, 'G'], [BASE_COLORS.T, 'T'], [OTHER, 'protein'], [ION_COLOR, 'K⁺/Na⁺']]);
  else $('#bm-legend').innerHTML = '';
}

// ------------------------------------------------------------------ MODEL tab
function renderModel(info) {
  $('#model-beads').innerHTML = info.beads.map((b) => `<div><h4>${b.base} · ${b.unit} <span class="hint">total ${fmt(b.charge)} e</span></h4>
    <table><thead><tr><th>bead</th><th>atom</th><th>type</th><th>charge</th></tr></thead><tbody>${b.beads.map((x) =>
      `<tr><td><code>${esc(x.name)}</code></td><td><code>${esc(x.atom)}</code></td><td>${esc(x.type)}</td><td class="num">${fmt(x.charge, 2)}</td></tr>`).join('')}</tbody></table></div>`).join('');
  const bases = ['G', 'A', 'T', 'C'];
  $('#model-templates').innerHTML = '<thead><tr><th>template</th><th>conformation</th><th>source</th>' +
    bases.map((b) => `<th>χ ${b}</th>`).join('') + '</tr></thead><tbody>' +
    info.templates.map((t) => `<tr><td><span class="tmpl ${t.label}">${t.label}</span></td><td>${esc(t.conformation)}</td><td>${esc(t.source)}</td>` +
      bases.map((b) => `<td class="num">${info.chi[b][t.label] !== undefined ? info.chi[b][t.label] + '°' : '—'}</td>`).join('') + '</tr>').join('') + '</tbody>';
}

// ------------------------------------------------------------------ COMMAND LINE tab
// Static files made by scripts/web_cli.py at build time: the downloads and their manifest, and the
// option reference of the tools (read from their argparse parsers). No Python needed in the page.
const optRow = (o) => `<tr><td>${esc(o.flags)}${o.required ? '<span class="req">required</span>' : ''}</td>` +
  `<td class="def">${o.default !== null && o.default !== undefined ? esc(Array.isArray(o.default) ? o.default.join(' ') : o.default) : ''}</td>` +
  `<td>${esc(o.help)}${o.repeat ? ' <span class="hint">(repeatable)</span>' : ''}</td></tr>`;
const optTable = (opts) => `<div class="tablewrap flowtable"><table class="opts"><thead><tr><th>option</th><th>default</th><th>meaning</th></tr></thead><tbody>${opts.map(optRow).join('')}</tbody></table></div>`;
function firstPara(doc) { return (doc || '').split(/\n\s*\n/)[0].replace(/\s*\n\s*/g, ' '); }
async function loadCli() {
  const v = encodeURIComponent(PAGE_VERSION);
  try {
    const m = await (await fetch(`downloads/manifest.json?v=${v}`, { cache: 'no-cache' })).json();
    $('#cli-downloads').innerHTML = m.downloads.map((d) => `<div class="dl"><h3>${esc(d.title)}</h3><p>${esc(d.what)}.</p>
      <a class="btn" href="downloads/${esc(d.file)}?v=${encodeURIComponent(m.version)}" download="${esc(d.file)}">Download ${esc(d.file)}</a>
      <div class="meta">${fmt(d.size / 1e6, 1)} MB · ${d.files} files · v${esc(m.version)}<br>sha256 ${esc(d.sha256)}</div></div>`).join('');
  } catch (e) { $('#cli-downloads').innerHTML = '<p class="error">The downloads are not in this build (run scripts/build_web.sh).</p>'; }
  try {
    const c = await (await fetch(`cli.json?v=${v}`, { cache: 'no-cache' })).json();
    const tool = (t) => `<section class="tool" id="cli-${t.name.replace('.py', '')}"><h2>${esc(t.name)}</h2>
      <p class="summary">${esc(firstPara(t.doc))}</p>
      <pre>${esc(t.usage)}</pre>${optTable(t.options)}
      ${t.kind === 'build' ? `<p class="hint">Plus the <a href="#cli-common">options of both builders</a>.</p>` : ''}
      <details class="full"><summary>Full description (<code>${esc(t.name)} -h</code>)</summary><pre>${esc(t.doc)}</pre></details></section>`;
    const [bd, bdp, bm2] = c.tools;
    $('#cli-ref').innerHTML = tool(bd) + tool(bdp) +
      `<section class="tool" id="cli-common"><h2>Options of both builders</h2><p>build_dna.py and build_dna_protein.py take all of these.</p>${optTable(c.common)}</section>` +
      `<section class="tool" id="cli-run_md"><h2>run_md.sh</h2><p>Written next to every build. Re-launch it and it goes on from the last finished stage.</p><pre>${esc(c.run_md)}</pre></section>` +
      tool(bm2) +
      `<section class="tool" id="cli-api"><h2>Python API</h2><p>Every function of <code>cg_dna</code> and <code>cg_backmap</code> can be imported; these are the shortest entry points.</p>` +
      c.api.map((a) => `<pre>${esc(a.signature)}</pre><p class="hint">${esc(firstPara(a.doc))}</p>`).join('') +
      `<p>The mapping alone: <code>python -m cg_dna.convert_dna input.pdb output_cg.pdb</code>.</p></section>`;
  } catch (e) { $('#cli-ref').innerHTML = '<p class="error">The option reference is not in this build (run scripts/build_web.sh).</p>'; }
}

// ------------------------------------------------------------------ tabs, buttons, reset
const TABS = ['map', 'backmap', 'model', 'cli', 'docs'];
function selectTab(name) {
  for (const t of TABS) {
    $(`#tab-${t}`).setAttribute('aria-selected', String(t === name));
    $(`#view-${t}`).classList.toggle('hidden', t !== name);
  }
  $('#boot').classList.toggle('aside', name === 'model' || name === 'cli' || name === 'docs');
  for (const v of Object.values(viewers)) setTimeout(() => v.stage.handleResize(), 0);
}
function refreshButtons() {
  const s = bm();
  $('#map-run').disabled = !state.ready || !mapState.text.trim();
  for (const id of ['#map-dlpdb', '#map-dlzip', '#map-tobackmap']) $(id).disabled = !mapState.result;
  $('#bm-from-map').disabled = !mapState.result;
  $('#bm-run').disabled = !state.ready || s.running || !s.avail;
  for (const id of ['#bm-dlpdb', '#bm-dlzip']) $(id).disabled = !s.result || s.running;
}
function resetAll() {
  mapState.seq++;
  bm().seq++;
  bm().stop = true;
  Object.assign(mapState, { text: '', name: '', result: null });
  state.bm = newBm();
  for (const id of ['#map-file', '#bm-pdb-file', '#bm-prm-file', '#bm-crd-file']) $(id).value = '';
  $('#map-paste').value = '';
  $('#map-pastebox').open = false;
  $('#map-fname').textContent = $('#bm-pdb-fname').textContent = '';
  $('#bm-prm-fname').textContent = 'CG topology (.prmtop / .parm7)';
  $('#bm-crd-fname').textContent = '.nc trajectory, .rst7 / .inpcrd, or PDB';
  for (const [id, v] of [['#g4-place', true], ['#g4-tips', false], ['#b-ztype', true], ['#b-endres', true], ['#bm-conf', true], ['#bm-resolvate', false], ['#map-showaa', true]]) $(id).checked = v;
  $('#g4-ion').value = 'KW4'; $('#g4-site').value = 'between'; $('#b-salt').value = 0.15; $('#b-cation').value = 'NaW';
  $('#map-build').open = false;
  disposeViewer('map', '#map-viewer', 'The ηθDNA beads appear here.');
  disposeViewer('bm', '#bm-viewer', 'The reconstructed structure appears here.');
  for (const id of ['#map-stats', '#map-strandwrap', '#bm-stats', '#bm-restable', '#bm-framebar', '#bm-progress', '#bm-stop']) $(id).classList.add('hidden');
  for (const id of ['#map-g4', '#map-issues', '#bm-issues', '#map-legend', '#bm-legend', '#map-status', '#bm-status', '#bm-inputinfo']) $(id).innerHTML = '';
  $('#map-cmd').textContent = 'python build_dna.py system/system_cg.pdb --cg-input -o system/system\nbash system/run_md.sh system';
  setBmMode('pdb');
  selectTab('map');
  refreshButtons();
}

// ------------------------------------------------------------------ wiring
for (const t of TABS) $(`#tab-${t}`).onclick = () => selectTab(t);
$('#reset').onclick = resetAll;
$('#map-open').onclick = () => $('#map-file').click();
$('#map-file').onchange = (e) => openMapFile(e.target.files[0]);
dropTarget($('#map-drop'), openMapFile);
$('#map-paste').addEventListener('input', () => { setMapInput($('#map-paste').value, $('#map-paste').value.trim() ? 'pasted.pdb' : ''); });
$('#map-run').onclick = runMap;
$('#map-examples').addEventListener('click', async (ev) => {
  const b = ev.target.closest('[data-ex]');
  if (!b) return;
  const ex = MAP_EXAMPLES.find((e) => e.id === b.dataset.ex);
  try {
    $('#map-paste').value = '';
    setMapInput(await fetchText(ex.file), ex.file.split('/').pop());
    runMap();
  } catch (e) { showError($('#map-issues'), e.message); }
});
for (const id of ['#g4-place', '#g4-ion', '#g4-site', '#g4-tips', '#b-salt', '#b-cation', '#b-ztype', '#b-endres']) {
  $(id).addEventListener('change', () => { if (mapState.result) runMap(); });
}
function segmented(sel, onChange) {
  for (const b of $$(`${sel} button`)) b.onclick = () => {
    for (const x of $$(`${sel} button`)) x.setAttribute('aria-pressed', String(x === b));
    onChange(b.dataset.v);
  };
}
segmented('#map-color', applyMapRepr);
$('#map-showaa').onchange = applyMapRepr;
$('#map-spin').onclick = () => { const v = viewers.map; if (v) { v.spinning = !v.spinning; v.stage.setSpin(v.spinning); } };
$('#map-recenter').onclick = () => { const v = viewers.map; if (v && v.cg) orient(v, v.cg); };
$('#map-dlpdb').onclick = () => mapState.result && download(`${mapState.result.name}_cg.pdb`, mapState.result.cg_pdb, 'chemical/x-pdb');
$('#map-dlzip').onclick = () => mapState.result && download(`${mapState.result.name}_etathetadna.zip`, b64bytes(mapState.result.zip_b64), 'application/zip');
const fromMap = async () => {
  if (!mapState.result) return;
  setBmMode('pdb');
  await setBmPdb(mapState.result.cg_pdb, `${mapState.result.name}_cg.pdb (Map tab)`);
  selectTab('backmap');
};
$('#map-tobackmap').onclick = fromMap;
$('#bm-from-map').onclick = fromMap;

segmented('#bm-mode', setBmMode);
$('#bm-pdb-open').onclick = () => $('#bm-pdb-file').click();
$('#bm-pdb-file').onchange = (e) => openBmPdb(e.target.files[0]);
dropTarget($('#bm-dropzone'), openBmPdb);
$('#bm-prm-open').onclick = () => $('#bm-prm-file').click();
$('#bm-prm-file').onchange = (e) => openPrmtop(e.target.files[0]);
$('#bm-crd-open').onclick = () => $('#bm-crd-file').click();
$('#bm-crd-file').onchange = (e) => openCoords(e.target.files[0]);
$('#bm-examples').addEventListener('click', async (ev) => {
  const b = ev.target.closest('[data-bmex]');
  if (!b) return;
  const ex = BM_EXAMPLES.find((e) => e.id === b.dataset.bmex);
  try {
    setBmMode('pdb');
    await setBmPdb(await fetchText(ex.file), ex.file.split('/').pop());
  } catch (e) { showError($('#bm-issues'), e.message); }
});
for (const id of ['#bm-nframes', '#bm-first', '#bm-last', '#bm-conf', '#bm-resolvate']) $(id).addEventListener('change', updateBmCmd);
$('#bm-run').onclick = runBackmap;
$('#bm-stop').onclick = () => { bm().stop = true; $('#bm-msg').textContent = 'Stopping after this batch…'; };
segmented('#bm-color', applyBmRepr);
segmented('#bm-repr', applyBmRepr);
$('#bm-frame').addEventListener('input', () => { bm().frame = +$('#bm-frame').value; applyBmRepr(); renderResidueTable(); });
$('#bm-spin').onclick = () => { const v = viewers.bm; if (v) { v.spinning = !v.spinning; v.stage.setSpin(v.spinning); } };
$('#bm-recenter').onclick = () => { const v = viewers.bm; if (v && v.comp) orient(v, v.comp, `/${bm().frame - 1}`); };
$('#bm-dlpdb').onclick = () => {
  const s = bm();
  if (s.result) download(`${baseName(s.mode === 'pdb' ? s.pdbName : s.prmName)}_backmapped.pdb`, s.result.pdb, 'chemical/x-pdb');
};
$('#bm-dlzip').onclick = async () => {
  const s = bm();
  if (!s.result) return;
  const name = baseName(s.mode === 'pdb' ? s.pdbName : s.prmName).replace(/_cg(_md)?$/, '');
  $('#bm-status').innerHTML = '<span class="spinner"></span>Packing…';
  try {
    const out = await call('backmap_package', { pdb: s.result.pdb, has: s.result.has, name, resolvate: $('#bm-resolvate').checked });
    download(`${name}_backmap_package.zip`, b64bytes(out.zip_b64), 'application/zip');
    $('#bm-status').textContent = '';
  } catch (e) { $('#bm-status').textContent = ''; showError($('#bm-issues'), e.message); }
};
for (const b of $$('[data-copy]')) b.onclick = async () => {
  const text = $(`#${b.dataset.copy}`).textContent;
  try { await navigator.clipboard.writeText(text); b.textContent = 'copied'; setTimeout(() => { b.textContent = 'copy'; }, 1200); } catch (e) { prompt('Copy:', text); }
};

// The theme belongs to the surrounding danslab.xyz page; its toggle writes the shared
// localStorage key, and the storage event reaches this same-origin frame.
addEventListener('storage', (ev) => {
  if (ev.key === 'theme' && (ev.newValue === 'light' || ev.newValue === 'dark')) {
    document.documentElement.setAttribute('data-theme', ev.newValue);
    for (const v of Object.values(viewers)) v.stage.setParameters({ backgroundColor: bg() });
    applyMapRepr();
    applyBmRepr();
  }
});

// ------------------------------------------------------------------ embedding
// On danslab.xyz the app runs in a same-origin iframe (components/AppFrame.tsx); reporting our
// height lets the host grow the frame, so the page has one scrollbar instead of two.
if (window.parent !== window) {
  document.documentElement.classList.add('embedded');
  let last = 0;
  const report = () => {
    const h = Math.ceil(document.documentElement.getBoundingClientRect().height);
    if (Math.abs(h - last) < 2) return;
    last = h;
    parent.postMessage({ type: 'app:height', height: h }, location.origin);
  };
  if (window.ResizeObserver) new ResizeObserver(report).observe(document.documentElement);
  addEventListener('load', report);
  setInterval(report, 1000);
  report();
}

$('#go-cli').onclick = (ev) => { ev.preventDefault(); selectTab('cli'); };

renderMapExamples();
renderBmExamples();
loadCli();
setBmMode('pdb');
refreshButtons();
