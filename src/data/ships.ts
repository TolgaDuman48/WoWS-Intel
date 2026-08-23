export type SecondaryMount = { caliber: number; reload: number; penetration: number; velocity: number; damage: number };

export type Ship = {
  id: string; name: string; nation: 'Pan-America' | 'Germany'; nationCode: 'PA' | 'DE'; tier: 9 | 10;
  shipClass: 'Battleship' | 'Battlecruiser'; description: string; hp: number; speed: number;
  concealment: number; turningRadius: number; rudderShift: number;
  main: { layout: string; guns: number; caliber: number; reload: number; range: number; sigma: number;
    dispersionType: string; dispersionFormula: string; maxDispersion: number; apDamage: number; apVelocity: number;
    apWeight: number; fuse: number; arming: number; ricochetStart: number; ricochetAlways: number;
    normalization: number; overmatch: number };
  secondary: { range: number; mounts: SecondaryMount[] };
  consumables: string[]; features: string[]; source: string;
};

export const ships: Ship[] = [
  {
    id: 'los-andes', name: 'Los Andes', nation: 'Pan-America', nationCode: 'PA', tier: 9, shipClass: 'Battleship',
    description: 'A fast battleship concept combining British capital-ship thinking with powerful 234 mm secondary artillery.',
    hp: 71100, speed: 30, concealment: 15.1, turningRadius: 860, rudderShift: 13,
    main: { layout: '6 x 2', guns: 12, caliber: 381, reload: 33, range: 19.58, sigma: 1.7, dispersionType: 'Standard battleship', dispersionFormula: '10R + 60', maxDispersion: 256, apDamage: 10700, apVelocity: 804, apWeight: 879, fuse: 0.033, arming: 64, ricochetStart: 45, ricochetAlways: 60, normalization: 6, overmatch: 26 },
    secondary: { range: 8.3, mounts: [{ caliber: 127, reload: 6.4, penetration: 21, velocity: 792, damage: 1800 }, { caliber: 234, reload: 14, penetration: 59, velocity: 881, damage: 3850 }] },
    consumables: ['Damage Control Party', 'Improved Repair Party'], features: ['Combat Instructions', 'Enhanced acceleration', 'Heavy secondaries'],
    source: 'https://wiki.worldofwarships.com/Ship:Los_Andes',
  },
  {
    id: 'libertad', name: 'Libertad', nation: 'Pan-America', nationCode: 'PA', tier: 10, shipClass: 'Battleship',
    description: 'A mighty South American dreadnought concept with six twin turrets and a secondary-focused combat-instruction system.',
    hp: 95000, speed: 30, concealment: 16.2, turningRadius: 910, rudderShift: 14.9,
    main: { layout: '6 x 2', guns: 12, caliber: 419, reload: 33, range: 20.5, sigma: 1.7, dispersionType: 'Standard battleship', dispersionFormula: '10R + 60', maxDispersion: 265, apDamage: 11700, apVelocity: 747, apWeight: 1157, fuse: 0.033, arming: 70, ricochetStart: 45, ricochetAlways: 60, normalization: 6, overmatch: 29 },
    secondary: { range: 8.3, mounts: [{ caliber: 127, reload: 6.4, penetration: 21, velocity: 792, damage: 1800 }, { caliber: 234, reload: 14, penetration: 59, velocity: 881, damage: 3850 }] },
    consumables: ['Damage Control Party', 'Improved Repair Party'], features: ['Combat Instructions', 'Enhanced acceleration', 'Heavy secondaries'],
    source: 'https://wiki.worldofwarships.com/Ship:Libertad',
  },
  {
    id: 'schlieffen', name: 'Schlieffen', nation: 'Germany', nationCode: 'DE', tier: 10, shipClass: 'Battlecruiser',
    description: 'A high-speed German battlecruiser project built around strong concealment, torpedoes and exceptionally efficient secondaries.',
    hp: 76100, speed: 34.1, concealment: 15, turningRadius: 970, rudderShift: 17.3,
    main: { layout: '4 x 2', guns: 8, caliber: 420, reload: 27, range: 19.81, sigma: 1.7, dispersionType: 'Battlecruiser', dispersionFormula: '8.4R + 48', maxDispersion: 214, apDamage: 12950, apVelocity: 835, apWeight: 1050, fuse: 0.033, arming: 70, ricochetStart: 45, ricochetAlways: 60, normalization: 6, overmatch: 29 },
    secondary: { range: 8.3, mounts: [{ caliber: 105, reload: 3.2, penetration: 26, velocity: 900, damage: 1200 }, { caliber: 150, reload: 7.1, penetration: 38, velocity: 875, damage: 1700 }] },
    consumables: ['Fast Damage Control Team', 'Repair Party', 'Hydroacoustic Search'], features: ['Improved secondary accuracy', 'Torpedoes', 'Low concealment'],
    source: 'https://wiki.worldofwarships.com/Ship:Schlieffen',
  },
];
