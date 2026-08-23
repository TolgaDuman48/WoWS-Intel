'use client';
import { useMemo, useState } from 'react';
import { ships, Ship } from '../data/ships';

const tiers = [1,2,3,4,5,6,7,8,9,10];
function Stat({title, rows}:{title:string;rows:[string,string|number][]}){return <article className="stat"><h3>{title}</h3>{rows.map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</article>}

export default function Home(){
 const [selected,setSelected]=useState<Ship>(ships[0]); const [compare,setCompare]=useState<string[]>([]); const [secondaryBuild,setSecondaryBuild]=useState(false); const [combat,setCombat]=useState(false);
 const selectedCompare=useMemo(()=>ships.filter(s=>compare.includes(s.id)),[compare]);
 const toggle=(id:string)=>setCompare(v=>v.includes(id)?v.filter(x=>x!==id):v.length<3?[...v,id]:v);
 const secRange=(s:Ship)=>{let r=s.secondary.range;if(secondaryBuild)r*=1.2;if(combat&&s.nation==='Pan-America')r*=1.2;return r.toFixed(2)};
 return <main>
  <header><div><small>WORLD OF WARSHIPS TECHNICAL DATABASE</small><h1>WoWS <em>Intel</em></h1></div><div className="badge">COMPARE {compare.length}/3</div></header>
  <nav>TECH TREE <span>SHIP INSPECTOR</span><span>HIDDEN STATS</span><span>BUILD</span></nav>
  <section className="tree"><div className="tiers"><b>Nation / Line</b>{tiers.map(t=><b key={t}>T{t}</b>)}</div>{['Pan-America','Germany'].map(n=><div className="nation" key={n}><aside><strong>{n}</strong><small>{n==='Germany'?'Battlecruisers':'Battleships'}</small></aside><div className="nodes">{tiers.map(t=>{const s=ships.find(x=>x.nation===n&&x.tier===t);return <div className="slot" key={t}>{s?<button onClick={()=>setSelected(s)} className={selected.id===s.id?'selected':''}><small>TIER {s.tier}</small><strong>{s.name}</strong><span>{s.main.guns} × {s.main.caliber} mm</span></button>:<i/>}</div>})}</div></div>)}</section>
  <section className="panel"><div className="title"><div><small>{selected.nation} · TIER {selected.tier} · {selected.shipClass}</small><h2>{selected.name}</h2></div><button onClick={()=>toggle(selected.id)}>{compare.includes(selected.id)?'✓ IN COMPARE':'+ ADD TO COMPARE'}</button></div>
   <div className="tabs">PORT <b>HIDDEN STATS</b> BUILD</div>
   <div className="stats"><Stat title="SURVIVABILITY" rows={[["Hit points",selected.hp.toLocaleString()],["Max speed",selected.speed+' kn']]}/><Stat title="MAIN BATTERY" rows={[["Battery",`${selected.main.guns} × ${selected.main.caliber} mm`],["Reload",selected.main.reload+' s'],["Sigma",selected.main.sigma],["Dispersion",selected.main.dispersion],["Overmatch",selected.main.overmatch+' mm']]}/><Stat title="AP BALLISTICS" rows={[["Muzzle velocity",selected.main.apVelocity+' m/s'],["Shell weight",selected.main.apWeight+' kg'],["Fuse",selected.main.fuse+' s'],["Arming threshold",selected.main.arming+' mm'],["Ricochet",selected.main.ricochet]]}/><Stat title="SECONDARY" rows={[["Base range",selected.secondary.range+' km'],["Calculated range",secRange(selected)+' km'],["Battery",selected.secondary.battery],["HE penetration",selected.secondary.pen]]}/></div>
   <div className="build"><div><b>LIVE BUILD CALCULATOR</b><small>Seçimler hesaplanan değerleri anında değiştirir.</small></div><label><input type="checkbox" checked={secondaryBuild} onChange={e=>setSecondaryBuild(e.target.checked)}/> Secondary range modifier (+20%)</label>{selected.nation==='Pan-America'?<label><input type="checkbox" checked={combat} onChange={e=>setCombat(e.target.checked)}/> Combat Instructions — range effect</label>:null}</div>
   <div className="gimmicks">{selected.gimmicks.map(x=><span key={x}>{x}</span>)}</div>
  </section>
  {selectedCompare.length?<section className="compare"><h2>Ship Comparison <small>{selectedCompare.length}/3</small></h2><div className="comparison"><div className="labels"><b>SHIP</b>{['HP','Speed','Main battery','Reload','Sigma','Overmatch','AP velocity','AP weight','Ricochet','Secondary range','Secondary HE pen'].map(x=><span key={x}>{x}</span>)}</div>{selectedCompare.map(s=><div className="col" key={s.id}><b>{s.name}</b><span>{s.hp.toLocaleString()}</span><span>{s.speed} kn</span><span>{s.main.guns}×{s.main.caliber} mm</span><span>{s.main.reload} s</span><span>{s.main.sigma}</span><span>{s.main.overmatch} mm</span><span>{s.main.apVelocity} m/s</span><span>{s.main.apWeight} kg</span><span>{s.main.ricochet}</span><span>{secRange(s)} km</span><span>{s.secondary.pen}</span></div>)}</div></section>:null}
  <footer>WoWS Intel · Technical prototype · Data model prepared for official WoWS sources</footer>
 </main>
}
