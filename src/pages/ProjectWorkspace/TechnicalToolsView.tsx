import { useState } from 'react';
import { Map as MapIcon, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceArea } from 'recharts';

export function TechnicalToolsView() {
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
                <div className="bg-paper p-3 tech-border tech-shadow">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-1">Time: {label} hours</p>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                        Exact Discharge: {payload[0].value.toFixed(2)} m³/s
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-6 overflow-y-auto lg:overflow-hidden">
            {/* Input Panel */}
            <div className="w-full lg:w-1/3 bg-paper tech-border tech-shadow flex flex-col shrink-0">
                <div className="p-4 border-b border-ink bg-surface">
                    <h3 className="font-bold text-ink font-mono uppercase tracking-widest text-sm">Design Flood Discharge</h3>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted mt-1">Rational Method Calculation</p>
                </div>
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-widest text-ink mb-1">Runoff Coefficient (C)</label>
                        <input type="number" defaultValue={0.75} step={0.05} className="w-full px-3 py-2 tech-border bg-surface text-ink text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-widest text-ink mb-1">Rainfall Intensity (I) - mm/hr</label>
                        <input type="number" defaultValue={120} className="w-full px-3 py-2 tech-border bg-surface text-ink text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-widest text-ink mb-1">Watershed Area (A) - km²</label>
                        <div className="flex gap-2">
                            <input type="number" defaultValue={45.5} className="flex-1 px-3 py-2 tech-border bg-surface text-ink text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
                            <button className="px-3 py-2 bg-surface text-ink tech-border hover:bg-accent hover:text-ink transition-colors" title="Fetch from GIS">
                                <MapIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-ink">
                        <button className="w-full py-2 bg-ink text-paper font-mono font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-ink transition-colors tech-border">
                            Calculate
                        </button>
                    </div>
                </div>
            </div>

            {/* Output Panel */}
            <div className="flex-1 bg-paper tech-border tech-shadow flex flex-col min-h-[400px]">
                <div className="p-4 border-b border-ink flex items-center justify-between bg-surface shrink-0">
                    <h3 className="font-bold text-ink font-mono uppercase tracking-widest text-sm">Results: Unit Flood Hydrograph</h3>
                    <div className="flex items-center gap-3">
                        {(left !== 'dataMin' || right !== 'dataMax') && (
                            <button
                                onClick={zoomOut}
                                className="text-xs font-mono font-bold uppercase tracking-widest text-ink hover:text-accent px-2 py-1 bg-paper tech-border transition-colors"
                            >
                                Reset Zoom
                            </button>
                        )}
                        <button className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors">
                            <Download className="w-4 h-4" /> Export
                        </button>
                    </div>
                </div>
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 shrink-0">
                        <div className="p-2 md:p-3 bg-surface tech-border">
                            <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted mb-1">Peak Discharge (Qp)</div>
                            <div className="text-lg md:text-xl font-bold text-ink font-mono">120.5 <span className="text-xs md:text-sm font-normal text-muted">m³/s</span></div>
                        </div>
                        <div className="p-2 md:p-3 bg-surface tech-border">
                            <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted mb-1">Time to Peak (Tp)</div>
                            <div className="text-lg md:text-xl font-bold text-ink font-mono">4.0 <span className="text-xs md:text-sm font-normal text-muted">hrs</span></div>
                        </div>
                        <div className="p-2 md:p-3 bg-surface tech-border">
                            <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted mb-1">Base Time (Tb)</div>
                            <div className="text-lg md:text-xl font-bold text-ink font-mono">10.0 <span className="text-xs md:text-sm font-normal text-muted">hrs</span></div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[200px]">
                        <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2 text-center">Click and drag on the chart to zoom in. Use the brush below to pan.</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                                onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel as string | number)}
                                onMouseMove={(e) => refAreaLeft && e && setRefAreaRight(e.activeLabel as string | number)}
                                onMouseUp={zoom}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#141414" strokeOpacity={0.1} vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    type="number"
                                    domain={[left, right]}
                                    allowDataOverflow
                                    stroke="#141414"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="JetBrains Mono"
                                    label={{ value: 'Time (hours)', position: 'bottom', fill: '#141414', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                                />
                                <YAxis
                                    stroke="#141414"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="JetBrains Mono"
                                    label={{ value: 'Discharge (m³/s)', angle: -90, position: 'insideLeft', fill: '#141414', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="discharge"
                                    stroke="#F27D26"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#F27D26', strokeWidth: 2, stroke: '#141414' }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={300}
                                />
                                <Brush
                                    dataKey="time"
                                    height={30}
                                    stroke="#141414"
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
