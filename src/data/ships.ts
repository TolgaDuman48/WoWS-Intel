export type Ship = {
  id: string; name: string; nation: string; tier: number; shipClass: string;
  hp: number; speed: number;
  main: { guns: number; caliber: number; reload: number; sigma: number; dispersion: string; apVelocity: number; apWeight: number; fuse: number; arming: number; ricochet: string; overmatch: number };
  secondary: { range: number; battery: string; pen: string };
  gimmicks: string[];
};

export const ships: Ship[] = [
  { id:'los-andes', name:'Los Andes', nation:'Pan-America', tier:9, shipClass:'Battleship', hp:71100, speed:30,
    main:{guns:12,caliber:381,reload:33,sigma:1.7,dispersion:'Standard BB',apVelocity:804,apWeight:879,fuse:0.033,arming:64,ricochet:'45° / 60°',overmatch:26},
    secondary:{range:8.3,battery:'127 mm + 234 mm',pen:'21 / 59 mm'}, gimmicks:['Combat Instructions','Improved Repair Party','Heavy secondaries'] },
  { id:'libertad', name:'Libertad', nation:'Pan-America', tier:10, shipClass:'Battleship', hp:95000, speed:30,
    main:{guns:12,caliber:419,reload:33,sigma:1.7,dispersion:'Standard BB',apVelocity:747,apWeight:1157,fuse:0.033,arming:70,ricochet:'45° / 60°',overmatch:29},
    secondary:{range:8.3,battery:'127 mm + 234 mm',pen:'21 / 59 mm'}, gimmicks:['Combat Instructions','Improved Repair Party','Heavy secondaries'] },
  { id:'schlieffen', name:'Schlieffen', nation:'Germany', tier:10, shipClass:'Battlecruiser', hp:76100, speed:34.1,
    main:{guns:8,caliber:420,reload:28,sigma:1.8,dispersion:'Battlecruiser',apVelocity:810,apWeight:1050,fuse:0.033,arming:70,ricochet:'45° / 60°',overmatch:29},
    secondary:{range:8.3,battery:'105 mm + 150 mm',pen:'26 / 38 mm'}, gimmicks:['Improved secondary accuracy','Hydroacoustic Search','Torpedoes','Low concealment'] }
];
