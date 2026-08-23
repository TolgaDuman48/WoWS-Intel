import { readFile, writeFile } from 'node:fs/promises';

const catalog = JSON.parse(await readFile(new URL('../src/data/catalog.json', import.meta.url), 'utf8'));
const output = {};
const labels = {
  'Dispersion type': 'dispersionType', 'Dispersion formula': 'dispersionFormula', Sigma: 'sigma',
  'Maximum dispersion (m)': 'maxDispersion', 'Maximum damage': 'apDamage',
  'Shell velocity (m/s)': 'apVelocity', 'Shell weight (kg)': 'apWeight',
  'Fuse time (sec)': 'fuse', 'Ricochet start (°)': 'ricochetStart',
  'Always ricochet (°)': 'ricochetAlways', 'Normalisation (°)': 'normalization',
  'Arming threshold (mm)': 'armingThreshold'
};
const shellLabels = {
  'Name': 'name', 'Maximum damage': 'maxDamage', 'Fire chance (%)': 'fireChance',
  'Shell velocity (m/s)': 'velocity', 'Shell weight (kg)': 'weight', 'Penetration (mm)': 'penetration',
  'Fuse time (sec)': 'fuse', 'Ricochet start (°)': 'ricochetStart', 'Always ricochet (°)': 'ricochetAlways',
  'Normalisation (°)': 'normalization', 'Arming threshold (mm)': 'armingThreshold'
};

const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&times;/g, '×').replace(/&deg;|&#176;/g, '°').replace(/&amp;/g, '&').replace(/\s+/g, ' ').replace(/^•\s*/, '').trim();

function parse(html) {
  const result = {};
  const shells = [];
  for (const table of html.matchAll(/<table\b[\s\S]*?<\/table>/gi)) {
    const plain = text(table[0]);
    const isAp = /AP SHELL/i.test(plain);
    const shellType = plain.match(/\b(AP|HE|SAP) SHELL\b/i)?.[1]?.toUpperCase();
    const shell = shellType ? { type: shellType } : null;
    for (const row of table[0].matchAll(/<tr\b[\s\S]*?<\/tr>/gi)) {
      const cells = [...row[0].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(match => text(match[1]));
      if (cells.length < 2) continue;
      const shellKey = shellLabels[cells[0]];
      if (shell && shellKey) shell[shellKey] = cells[1];
      const key = labels[cells[0]];
      if (!key || (key.startsWith('ap') && !isAp)) continue;
      result[key] = cells[1];
    }
    if (shell && Object.keys(shell).length > 2) shells.push(shell);
  }
  if (shells.length) result.shells = shells;
  const consumableSection = html.match(/id="Consumables"[\s\S]*?(?=<h2 id="Gallery"|<div class="mw-heading mw-heading2"><h2 id="Gallery")/)?.[0] ?? '';
  const consumables = [];
  for (const item of consumableSection.matchAll(/<li><b>Slot (\d+):<\/b>([\s\S]*?)<\/li>/gi)) {
    const slot = Number(item[1]);
    for (const option of item[2].matchAll(/<a[^>]*title="([^"]+)"[^>]*>[^<]+<\/a>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?\(([^<]+)\)(?=\s*(?:<b>or<\/b>|$))/gi)) {
      consumables.push({ slot, name: text(option[1]), icon: option[2].replace(/\/18px-/, '/36px-'), details: text(option[3]) });
    }
  }
  if (consumables.length) result.consumables = consumables;
  return Object.keys(result).length >= 3 ? result : null;
}

let cursor = 0;
async function worker() {
  while (cursor < catalog.length) {
    const ship = catalog[cursor++];
    const url = new URL('https://wiki.worldofwarships.com/api.php');
    url.searchParams.set('action', 'parse'); url.searchParams.set('page', `Ship:${ship.name}`);
    url.searchParams.set('prop', 'text'); url.searchParams.set('format', 'json'); url.searchParams.set('origin', '*');
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'WoWS-Intel/1.0 ship-data-indexer' } });
      const payload = await response.json();
      const stats = payload.parse?.text?.['*'] ? parse(payload.parse.text['*']) : null;
      if (stats) output[ship.ship_id] = { ...stats, source: `https://wiki.worldofwarships.com/Ship:${encodeURIComponent(ship.name)}`, retrievedAt: new Date().toISOString().slice(0, 10) };
    } catch { /* Wiki'de bulunmayan ya da geçici hata veren gemi atlanır. */ }
    if (cursor % 100 === 0) console.log(`${cursor}/${catalog.length}`);
  }
}

await Promise.all(Array.from({ length: 6 }, worker));
await writeFile(new URL('../src/data/wiki-hidden.json', import.meta.url), `${JSON.stringify(output)}\n`, 'utf8');
console.log(`${Object.keys(output).length}/${catalog.length} Wiki gemisi eşleştirildi.`);
