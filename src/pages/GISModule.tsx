import { MapPin, MousePointer2, Pencil, Hexagon, Layers } from 'lucide-react';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import type { FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// Mock GeoJSON data for a Watershed Catchment Area
const watershedGeojson = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'Merapi Catchment' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [110.35, -7.50],
            [110.45, -7.48],
            [110.50, -7.55],
            [110.42, -7.62],
            [110.35, -7.50]
          ]
        ]
      }
    }
  ]
};

const fillLayer: Omit<FillLayerSpecification, 'source'> = {
  id: 'watershed-fill',
  type: 'fill',
  paint: {
    'fill-color': '#F27D26',
    'fill-opacity': 0.2
  }
};

const lineLayer: Omit<LineLayerSpecification, 'source'> = {
  id: 'watershed-outline',
  type: 'line',
  paint: {
    'line-color': '#F27D26',
    'line-width': 2,
    'line-dasharray': [2, 2]
  }
};

export function GISModule() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-ink uppercase tracking-tight">Global GIS Module</h1>
        <p className="text-sm font-mono text-muted uppercase tracking-widest mt-1">View and manage spatial data across all projects.</p>
      </div>

      <div className="flex-1 relative bg-surface tech-border tech-shadow overflow-hidden flex">
        <Map
          initialViewState={{
            longitude: 110.42,
            latitude: -7.54,
            zoom: 10,
            pitch: 30
          }}
          mapStyle={MAP_STYLE}
          attributionControl={false}
        >
          <NavigationControl position="bottom-right" style={{ marginRight: '16px', marginBottom: '16px' }} />

          <Source id="watershed" type="geojson" data={watershedGeojson}>
            <Layer {...fillLayer} />
            <Layer {...lineLayer} />
          </Source>
        </Map>

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
