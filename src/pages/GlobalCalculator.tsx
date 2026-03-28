import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceArea } from 'recharts';
import { Download } from 'lucide-react';

export function GlobalCalculator() {
  const data = [
    { time: 0, discharge: 0 },
    { time: 1, discharge: 15 },
    { time: 2, discharge: 45 },
    { time: 3, discharge: 85 },
    { time: 4, discharge: 120 },
    { time: 5, discharge: 95 },
    { time: 6, discharge: 60 },
    { time: 7, discharge: 35 },
    { time: 8, discharge: 15 },
    { time: 9, discharge: 5 },
    { time: 10, discharge: 0 },
  ];

  const [left, setLeft] = useState<string | number>('dataMin');
  const [right, setRight] = useState<string | number>('dataMax');
  const [refAreaLeft, setRefAreaLeft] = useState<string | number>('');
  const [refAreaRight, setRefAreaRight] = useState<string | number>('');

  const zoom = () => {
    let rLeft = refAreaLeft;
    let rRight = refAreaRight;

    if (rLeft === rRight || rRight === '') {
      setRefAreaLeft('');
      setRefAreaRight('');
      return;
    }

    if (rLeft > rRight) {
      [rLeft, rRight] = [rRight, rLeft];
    }

    setRefAreaLeft('');
    setRefAreaRight('');
    setLeft(rLeft);
    setRight(rRight);
  };

  const zoomOut = () => {
    setRefAreaLeft('');
    setRefAreaRight('');
    setLeft('dataMin');
    setRight('dataMax');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-paper p-4 tech-border tech-shadow">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted mb-2">Time: {label} hours</p>
            <p className="text-sm font-mono font-bold text-accent">
              Exact Discharge: {payload[0].value.toFixed(2)} m³/s
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="h-full flex flex-col">
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-ink uppercase tracking-tight">Global Calculator</h1>
          <p className="text-sm font-mono text-muted uppercase tracking-widest mt-1">Perform hydrological calculations independent of specific projects.</p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-y-auto lg:overflow-hidden">
          {/* Input Panel */}
          <div className="w-full lg:w-1/3 bg-paper tech-border tech-shadow flex flex-col shrink-0">
            <div className="p-4 border-b border-ink bg-surface">
              <h3 className="font-bold text-ink uppercase tracking-wider">Design Flood Discharge</h3>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Rational Method Calculation</p>
            </div>
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Runoff Coefficient (C)</label>
                <input type="number" defaultValue={0.75} step={0.05} className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Rainfall Intensity (I) - mm/hr</label>
                <input type="number" defaultValue={120} className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Catchment Area (A) - km²</label>
                <input type="number" defaultValue={45.5} className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              
              <div className="pt-6 border-t border-ink">
                <div className="bg-surface p-6 tech-border tech-shadow">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2">Peak Discharge (Q)</p>
                  <p className="text-3xl font-mono font-bold text-ink">11.37 <span className="text-sm font-normal text-muted">m³/s</span></p>
                </div>
              </div>

            <button className="w-full py-3 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors">
              Save Calculation
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-2/3 bg-paper tech-border tech-shadow flex flex-col">
          <div className="p-4 border-b border-ink flex items-center justify-between bg-surface shrink-0">
            <h3 className="font-bold text-ink uppercase tracking-wider">Unit Hydrograph</h3>
            <div className="flex items-center gap-4">
              {(left !== 'dataMin' || right !== 'dataMax') && (
                <button 
                  onClick={zoomOut}
                  className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink hover:text-surface hover:bg-ink px-3 py-1.5 bg-paper tech-border transition-colors"
                >
                  Reset Zoom
                </button>
              )}
              <button className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent hover:text-accent-hover">
                <Download className="w-4 h-4" /> Export Data
              </button>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-4 text-center">Click and drag on the chart to zoom in. Use the brush below to pan.</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data} 
                margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel as string | number)}
                onMouseMove={(e) => refAreaLeft && e && setRefAreaRight(e.activeLabel as string | number)}
                onMouseUp={zoom}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#141414" opacity={0.1} />
                <XAxis 
                  dataKey="time" 
                  type="number"
                  domain={[left, right]}
                  allowDataOverflow
                  tick={{fontSize: 10, fill: '#141414', fontFamily: 'JetBrains Mono'}} 
                  tickLine={false} 
                  axisLine={false} 
                  label={{ value: 'Time (hours)', position: 'bottom', fill: '#141414', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                />
                <YAxis 
                  tick={{fontSize: 10, fill: '#141414', fontFamily: 'JetBrains Mono'}} 
                  tickLine={false} 
                  axisLine={false} 
                  label={{ value: 'Discharge (m³/s)', angle: -90, position: 'insideLeft', fill: '#141414', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="discharge" 
                  stroke="#F27D26" 
                  strokeWidth={2} 
                  dot={{r: 4, fill: '#F27D26', strokeWidth: 2, stroke: '#E4E3E0'}} 
                  activeDot={{r: 6}} 
                  animationDuration={300}
                />
                <Brush 
                  dataKey="time" 
                  height={30} 
                  stroke="#F27D26" 
                  fill="#E4E3E0"
                  tickFormatter={(value) => `${value}h`}
                  onChange={(e) => {
                    if (e && e.startIndex !== undefined && e.endIndex !== undefined) {
                      setLeft(data[e.startIndex].time);
                      setRight(data[e.endIndex].time);
                    }
                  }}
                />
                {refAreaLeft && refAreaRight ? (
                  // @ts-expect-error Recharts types are missing some SVG props
                  <ReferenceArea x1={refAreaLeft} x2={refAreaRight} fill="#F27D26" fillOpacity={0.1} />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
