'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import catalogData from '../data/catalog.json';

type CatalogShip = {
  ship_id: number;
  ship_id_str: string;
  name: string;
  description: string;
  nation: string;
  type: string;
  tier: number;
  is_premium: boolean;
  is_special: boolean;
  price_credit: number;
  price_gold: number;
  images: { small: string; medium: string; large: string; contour: string } | null;
  default_profile: {
    hull?: { health?: number };
    engine?: { max_speed?: number };
    artillery?: { distance?: number; shot_delay?: number; max_dispersion?: number };
    concealment?: { detect_distance_by_ship?: number };
  } | null;
};

const catalog = (catalogData as CatalogShip[]).filter((ship) => ship.images?.medium);
const nationNames: Record<string, string> = {
  usa: 'U.S.A.', japan: 'Japan', ussr: 'U.S.S.R.', germany: 'Germany', uk: 'U.K.',
  france: 'France', italy: 'Italy', pan_asia: 'Pan-Asia', europe: 'Europe',
  netherlands: 'Netherlands', pan_america: 'Pan-America', spain: 'Spain', commonwealth: 'Commonwealth',
};
const roman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

export default function CatalogExplorer() {
  const [query, setQuery] = useState('');
  const [nation, setNation] = useState('all');
  const [shipClass, setShipClass] = useState('all');
  const [tier, setTier] = useState('all');
  const [visible, setVisible] = useState(48);
  const [selected, setSelected] = useState<CatalogShip | null>(null);

  const filtered = useMemo(() => catalog.filter((ship) => {
    const matchesQuery = ship.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (nation === 'all' || ship.nation === nation) &&
      (shipClass === 'all' || ship.type === shipClass) && (tier === 'all' || ship.tier === Number(tier));
  }), [query, nation, shipClass, tier]);

  const resetVisible = () => setVisible(48);
  const selectShip = (ship: CatalogShip) => {
    setSelected(ship);
    document.getElementById('catalog-detail')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return <section className="catalog-section frame" id="catalog">
    <div className="section-heading"><div><span className="index">01</span><div><p className="eyebrow">OFFICIAL WARGAMING API</p><h2>All ships</h2></div></div><p>{filtered.length.toLocaleString('en-US')} / {catalog.length.toLocaleString('en-US')} records</p></div>
    <div className="catalog-controls">
      <label className="ship-search"><span>SEARCH</span><input value={query} onChange={(event) => { setQuery(event.target.value); resetVisible(); }} placeholder="Ship name..." /></label>
      <label><span>NATION</span><select value={nation} onChange={(event) => { setNation(event.target.value); resetVisible(); }}><option value="all">All nations</option>{Object.entries(nationNames).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>CLASS</span><select value={shipClass} onChange={(event) => { setShipClass(event.target.value); resetVisible(); }}><option value="all">All classes</option>{['Battleship', 'Cruiser', 'Destroyer', 'AirCarrier', 'Submarine'].map((value) => <option value={value} key={value}>{value}</option>)}</select></label>
      <label><span>TIER</span><select value={tier} onChange={(event) => { setTier(event.target.value); resetVisible(); }}><option value="all">All tiers</option>{Array.from({ length: 11 }, (_, index) => index + 1).map((value) => <option value={value} key={value}>{roman[value]}</option>)}</select></label>
    </div>

    {selected && <div className="catalog-detail" id="catalog-detail">
      <div className="catalog-detail-image"><Image src={selected.images!.large} alt={`${selected.name} ship preview`} fill sizes="(max-width: 700px) 100vw, 420px" /></div>
      <div><p className="eyebrow">{nationNames[selected.nation] ?? selected.nation} / TIER {roman[selected.tier]} / {selected.type}</p><h3>{selected.name}</h3><p>{selected.description}</p><div className="catalog-badges">{selected.is_premium && <span>PREMIUM</span>}{selected.is_special && <span>SPECIAL</span>}<span>OFFICIAL API</span></div></div>
      <div className="catalog-port-stats"><Stat label="Hit points" value={selected.default_profile?.hull?.health?.toLocaleString('en-US') ?? '-'} /><Stat label="Maximum speed" value={value(selected.default_profile?.engine?.max_speed, 'kn')} /><Stat label="Main range" value={value(selected.default_profile?.artillery?.distance, 'km')} /><Stat label="Reload" value={value(selected.default_profile?.artillery?.shot_delay, 's')} /><Stat label="Max dispersion" value={value(selected.default_profile?.artillery?.max_dispersion, 'm')} /><Stat label="Sea detection" value={value(selected.default_profile?.concealment?.detect_distance_by_ship, 'km')} /></div>
      <button className="detail-close" onClick={() => setSelected(null)} aria-label="Close ship detail">CLOSE</button>
    </div>}

    <div className="catalog-grid">{filtered.slice(0, visible).map((ship) => <button className="catalog-card" key={ship.ship_id} onClick={() => selectShip(ship)}>
      <div className="catalog-image"><Image src={ship.images!.medium} alt="" fill sizes="240px" /></div>
      <span className="catalog-tier">{roman[ship.tier]}</span><span className="catalog-name"><strong>{ship.name}</strong><small>{nationNames[ship.nation] ?? ship.nation} / {ship.type}</small></span>{(ship.is_premium || ship.is_special) && <i>{ship.is_special ? 'S' : 'P'}</i>}
    </button>)}</div>
    {visible < filtered.length && <button className="load-more" onClick={() => setVisible((current) => current + 48)}>LOAD 48 MORE <span>{filtered.length - visible} REMAINING</span></button>}
    {!filtered.length && <div className="empty-results">No ships match these filters.</div>}
  </section>;
}

function value(input: number | undefined, unit: string) {
  return input === undefined || input === null ? '-' : `${input.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${unit}`;
}

function Stat({ label, value: statValue }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{statValue}</strong></div>;
}
