import { MapPin, MousePointer2, Pencil, Hexagon, Layers } from 'lucide-react';

export function GISModule() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-ink uppercase tracking-tight">Global GIS Module</h1>
        <p className="text-sm font-mono text-muted uppercase tracking-widest mt-1">View and manage spatial data across all projects.</p>
      </div>

      <div className="flex-1 relative bg-surface tech-border tech-shadow overflow-hidden flex">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23141414\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '100px 100px'
        }}></div>
        
        {/* Mock Global Polygons */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Project 1 */}
          <path d="M 200 150 Q 300 50 400 200 T 500 350 Q 350 450 250 400 Z" fill="rgba(242, 125, 38, 0.1)" stroke="#F27D26" strokeWidth="2" strokeDasharray="5,5" />
          <circle cx="350" cy="300" r="4" fill="#141414" />
          <text x="360" y="305" fontSize="12" fill="#141414" fontWeight="bold" fontFamily="JetBrains Mono" className="uppercase tracking-widest">Merapi Dam</text>

          {/* Project 2 */}
          <path d="M 600 200 Q 700 100 800 250 T 900 400 Q 750 500 650 450 Z" fill="rgba(20, 20, 20, 0.05)" stroke="#141414" strokeWidth="2" strokeDasharray="5,5" />
          <circle cx="750" cy="350" r="4" fill="#F27D26" />
          <text x="760" y="355" fontSize="12" fill="#141414" fontWeight="bold" fontFamily="JetBrains Mono" className="uppercase tracking-widest">Solo River Basin</text>
        </svg>

        {/* Drawing Tools (Top Left) */}
        <div className="absolute top-4 left-4 bg-paper tech-border tech-shadow flex flex-col overflow-hidden pointer-events-auto">
          <button className="p-3 text-ink hover:bg-surface hover:text-accent border-b border-ink transition-colors" title="Select"><MousePointer2 className="w-5 h-5" /></button>
          <button className="p-3 text-ink hover:bg-surface hover:text-accent border-b border-ink transition-colors" title="Draw Point"><MapPin className="w-5 h-5" /></button>
          <button className="p-3 text-ink hover:bg-surface hover:text-accent border-b border-ink transition-colors" title="Draw Line"><Pencil className="w-5 h-5" /></button>
          <button className="p-3 text-ink hover:bg-surface hover:text-accent transition-colors" title="Draw Polygon"><Hexagon className="w-5 h-5" /></button>
        </div>

        {/* Layer Menu (Bottom Left) */}
        <div className="absolute bottom-4 left-4 w-64 bg-paper tech-border tech-shadow flex flex-col max-h-[60%] pointer-events-auto">
          <div className="p-4 border-b border-ink flex items-center gap-3 bg-surface">
            <Layers className="w-4 h-4 text-ink" />
            <h3 className="font-bold text-ink text-xs font-mono uppercase tracking-widest">Global Layers</h3>
          </div>
          <div className="p-4 overflow-y-auto space-y-4">
            <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
              <span className="group-hover:text-accent transition-colors">All Projects</span>
            </label>
            <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
              <span className="group-hover:text-accent transition-colors">National River Networks</span>
            </label>
            <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
              <span className="group-hover:text-accent transition-colors">Global Topography (DEM)</span>
            </label>
            <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
              <input type="checkbox" className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
              <span className="group-hover:text-accent transition-colors">Land Use Data (2025)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
