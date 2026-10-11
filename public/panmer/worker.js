// Panmer compute worker: self-hosted Pyodide + the panmer package (panmer.zip).
// Messages in:  {id, name, payload}  -> name in estimate | design | analyze | catalog
// Messages out: {id, ok, result | error}  and  {status: "..."} while loading.
import { loadPyodide } from './pyodide/pyodide.mjs';

const base = new URL('./', import.meta.url).href;

async function boot() {
  postMessage({ status: 'Loading Python runtime…' });
  const py = await loadPyodide({ indexURL: base + 'pyodide/' });
  postMessage({ status: 'Loading Panmer…' });
  const version = (await (await fetch(base + 'VERSION', { cache: 'no-cache' })).text()).trim();
  const zip = await (await fetch(base + 'panmer.zip?v=' + encodeURIComponent(version))).arrayBuffer();
  py.unpackArchive(zip, 'zip', { extractDir: '/home/pyodide' });
  py.runPython('import sys; sys.path.insert(0, "/home/pyodide")\nfrom panmer.api import call');
  postMessage({ status: 'ready', version });
  return py.globals.get('call');
}

const ready = boot().catch((e) => { postMessage({ status: 'error', error: String(e) }); throw e; });

onmessage = async (ev) => {
  const { id, name, payload } = ev.data;
  try {
    const call = await ready;
    const out = JSON.parse(call(name, JSON.stringify(payload)));
    postMessage({ id, ...out });
  } catch (e) {
    postMessage({ id, ok: false, error: String(e) });
  }
};
