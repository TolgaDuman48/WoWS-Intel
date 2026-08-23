import { readFile, writeFile } from 'node:fs/promises';

const applicationId = process.env.WOWS_APPLICATION_ID;
if (!applicationId) throw new Error('WOWS_APPLICATION_ID gerekli.');

const path = new URL('../src/data/catalog.json', import.meta.url);
const catalog = JSON.parse(await readFile(path, 'utf8'));
const descriptions = new Map();
let page = 1;

while (true) {
  const url = new URL('https://api.worldofwarships.eu/wows/encyclopedia/ships/');
  url.searchParams.set('application_id', applicationId);
  url.searchParams.set('language', 'tr');
  url.searchParams.set('fields', 'ship_id,description');
  url.searchParams.set('page_no', String(page));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API isteği başarısız: ${response.status}`);
  const payload = await response.json();
  if (payload.status !== 'ok') throw new Error(JSON.stringify(payload.error));
  for (const ship of Object.values(payload.data ?? {})) descriptions.set(ship.ship_id, ship.description);
  if (page >= payload.meta.page_total) break;
  page += 1;
}

let translated = 0;
for (const ship of catalog) {
  const description = descriptions.get(ship.ship_id);
  if (description) {
    ship.description = description;
    translated += 1;
  }
}

await writeFile(path, `${JSON.stringify(catalog)}\n`, 'utf8');
console.log(`${translated}/${catalog.length} geminin resmî Türkçe açıklaması güncellendi.`);
