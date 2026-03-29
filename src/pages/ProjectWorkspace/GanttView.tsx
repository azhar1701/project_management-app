import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import type { GanttTask } from '../../types';

export function GanttView() {
    const { ganttTasks, addGanttTask, updateGanttTask } = useStore(useShallow(state => ({
        ganttTasks: state.ganttTasks,
        addGanttTask: state.addGanttTask,
        updateGanttTask: state.updateGanttTask
    })));
    const [tasks, setTasks] = useState<GanttTask[]>(ganttTasks);

    // Sync local state when global store changes
    useEffect(() => {
        setTasks(ganttTasks);
    }, [ganttTasks]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [drawing, setDrawing] = useState<{ id: string, startX: number, startY: number, currentX: number, currentY: number } | null>(null);
    const [ganttAction, setGanttAction] = useState<{
        type: 'move' | 'resize-left' | 'resize-right',
        id: string,
        startX: number,
        initialStart: number,
        initialWidth: number
    } | null>(null);
    const [editingTask, setEditingTask] = useState<string | null>(null);

    const handleAddTask = () => {
        addGanttTask({
            name: `New Task`,
            start: 10,
            width: 20,
            color: 'bg-accent text-ink',
            deps: []
        });
    };

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            setContainerWidth(entries[0].contentRect.width);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        if (drawing) {
            setDrawing({
                ...drawing,
                currentX: mouseX,
                currentY: e.clientY - rect.top,
            });
        } else if (ganttAction) {
            const deltaPercent = ((mouseX - ganttAction.startX) / rect.width) * 100;
            setTasks(tasks.map(t => {
                if (t.id === ganttAction.id) {
                    if (ganttAction.type === 'move') {
                        return { ...t, start: Math.max(0, Math.min(100 - t.width, ganttAction.initialStart + deltaPercent)) };
                    } else if (ganttAction.type === 'resize-left') {
                        const newStart = Math.max(0, Math.min(ganttAction.initialStart + ganttAction.initialWidth - 1, ganttAction.initialStart + deltaPercent));
                        const newWidth = ganttAction.initialWidth - (newStart - ganttAction.initialStart);
                        return { ...t, start: newStart, width: newWidth };
                    } else if (ganttAction.type === 'resize-right') {
                        const newWidth = Math.max(1, Math.min(100 - t.start, ganttAction.initialWidth + deltaPercent));
                        return { ...t, width: newWidth };
                    }
                }
                return t;
            }));
        }
    };

    const handleMouseUpGlobal = () => {
        if (drawing) setDrawing(null);
        if (ganttAction) {
            // Commit changes to global store
            const modifiedTask = tasks.find(t => t.id === ganttAction.id);
            if (modifiedTask) {
                updateGanttTask(ganttAction.id, { start: modifiedTask.start, width: modifiedTask.width });
            }
            setGanttAction(null);
        }
    };

    const handleMouseDown = (e: React.MouseEvent, taskId: string, index: number, endPercent: number) => {
        e.stopPropagation();
        const startX = (endPercent / 100) * containerWidth;
        const startY = index * 40 + 12;
        setDrawing({ id: taskId, startX, startY, currentX: startX, currentY: startY });
    };

    const handleMouseUpTask = (e: React.MouseEvent, targetTaskId: string) => {
        e.stopPropagation();
        if (drawing && drawing.id !== targetTaskId) {
            const targetTask = tasks.find(t => t.id === targetTaskId);
            if (targetTask && !targetTask.deps.includes(drawing.id)) {
                updateGanttTask(targetTaskId, { deps: [...targetTask.deps, drawing.id] });
            }
        }
        setDrawing(null);
    };

    const getTask = (id: string) => tasks.find(t => t.id === id);
    const getTaskIndex = (id: string) => tasks.findIndex(t => t.id === id);
    const getX = (percent: number) => (percent / 100) * containerWidth;
    const getY = (index: number) => index * 40 + 12;

    const generateCurve = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} C ${x1 + 20} ${y1}, ${x2 - 20} ${y2}, ${x2} ${y2}`;
    };

    return (
        <div
            className="h-full bg-paper tech-border tech-shadow overflow-hidden flex flex-col select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpGlobal}
            onMouseLeave={handleMouseUpGlobal}
        >
            {/* Header */}
            <div className="p-4 border-b border-ink flex items-center justify-between bg-surface shrink-0">
                <div className="flex items-center gap-2">
                    <button onClick={handleAddTask} className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest bg-ink text-paper hover:bg-accent hover:text-ink transition-colors tech-border">
                        <Plus className="w-4 h-4" /> Add Task
                    </button>
                    <button className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest bg-paper text-ink hover:bg-surface transition-colors tech-border">Today</button>
                    <div className="flex tech-border overflow-hidden">
                        <button className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest bg-paper text-ink hover:bg-surface border-r border-ink">Days</button>
                        <button className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest bg-ink text-paper border-r border-ink">Weeks</button>
                        <button className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest bg-paper text-ink hover:bg-surface">Months</button>
                    </div>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-accent inline-block"></span>
                    Drag from the end of a task to the start of another to create a dependency
                </div>
            </div>

            <div className="flex-1 overflow-auto relative p-4">
                <div className="min-w-[800px]">
                    {/* Timeline Header */}
                    <div className="flex border-b border-ink pb-2 mb-4 text-xs font-mono font-bold uppercase tracking-widest text-ink">
                        <div className="w-64 shrink-0">Task Name</div>
                        <div className="flex-1 flex justify-between px-4">
                            <span>W1 Oct</span>
                            <span>W2 Oct</span>
                            <span>W3 Oct</span>
                            <span>W4 Oct</span>
                            <span>W1 Nov</span>
                        </div>
                    </div>

                    {/* Gantt Body */}
                    <div className="flex relative pb-12">
                        {/* Labels */}
                        <div className="w-64 shrink-0 space-y-4 z-20 bg-paper">
                            {tasks.map(task => (
                                <div key={task.id} className={`h-6 flex items-center text-xs font-mono uppercase tracking-widest text-ink pr-4 ${task.indent ? 'pl-4' : 'font-bold'}`}>
                                    {editingTask === task.id ? (
                                        <input
                                            autoFocus
                                            className="w-full px-1 py-0.5 border border-ink bg-surface text-xs outline-none focus:ring-1 focus:ring-accent"
                                            defaultValue={task.name}
                                            onBlur={(e) => {
                                                updateGanttTask(task.id, { name: e.target.value || 'Untitled Task' });
                                                setEditingTask(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    updateGanttTask(task.id, { name: e.currentTarget.value || 'Untitled Task' });
                                                    setEditingTask(null);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <span
                                            className="truncate cursor-text hover:text-accent hover:bg-surface px-1 -ml-1 rounded-none w-full"
                                            onClick={() => setEditingTask(task.id)}
                                            title="Click to edit"
                                        >
                                            {task.name}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Bars & SVG */}
                        <div className="flex-1 relative space-y-4" ref={containerRef}>
                            {/* Grid Lines */}
                            <div className="absolute inset-0 pointer-events-none flex px-4 z-0">
                                <div className="flex-1 border-l border-ink opacity-20"></div>
                                <div className="flex-1 border-l border-ink opacity-20"></div>
                                <div className="flex-1 border-l border-ink opacity-20"></div>
                                <div className="flex-1 border-l border-ink opacity-20"></div>
                                <div className="flex-1 border-l border-ink opacity-20"></div>
                            </div>

                            {/* Today Line */}
                            <div className="absolute top-0 bottom-0 left-[35%] w-px bg-accent pointer-events-none z-0">
                                <div className="absolute top-0 -translate-x-1/2 -translate-y-full bg-accent text-ink font-bold font-mono uppercase tracking-widest text-[10px] px-1 rounded-none mb-1">Today</div>
                            </div>

                            {/* SVG Overlay */}
                            <svg className="absolute inset-0 pointer-events-none z-10 overflow-visible" style={{ width: '100%', height: '100%' }}>
                                {/* Existing Dependencies */}
                                {tasks.map((task, targetIndex) =>
                                    task.deps.map(depId => {
                                        const sourceTask = getTask(depId);
                                        const sourceIndex = getTaskIndex(depId);
                                        if (!sourceTask || sourceIndex === -1) return null;

                                        const x1 = getX(sourceTask.start + sourceTask.width);
                                        const y1 = getY(sourceIndex);
                                        const x2 = getX(task.start);
                                        const y2 = getY(targetIndex);

                                        return (
                                            <g key={`${depId}-${task.id}`}>
                                                <path d={generateCurve(x1, y1, x2, y2)} fill="none" stroke="#141414" strokeWidth="2" />
                                                <polygon points={`${x2},${y2} ${x2 - 6},${y2 - 4} ${x2 - 6},${y2 + 4}`} fill="#141414" />
                                            </g>
                                        );
                                    })
                                )}

                                {/* Drawing Dependency */}
                                {drawing && (
                                    <path d={generateCurve(drawing.startX, drawing.startY, drawing.currentX, drawing.currentY)} fill="none" stroke="#F27D26" strokeWidth="2" strokeDasharray="4" />
                                )}
                            </svg>

                            {/* Task Bars */}
                            {tasks.map((task, index) => (
                                <div key={task.id} className="relative h-6 bg-surface rounded-none group z-20">
                                    <div
                                        className={`absolute h-full rounded-none tech-border flex items-center px-2 cursor-move ${task.color}`}
                                        style={{ left: `${task.start}%`, width: `${task.width}%` }}
                                        onMouseDown={(e) => {
                                            if (!containerRef.current) return;
                                            const rect = containerRef.current.getBoundingClientRect();
                                            setGanttAction({ type: 'move', id: task.id, startX: e.clientX - rect.left, initialStart: task.start, initialWidth: task.width });
                                        }}
                                    >
                                        {task.label && <span className="text-[10px] font-mono uppercase tracking-widest font-bold pointer-events-none">{task.label}</span>}

                                        {/* Resize Left */}
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize z-10"
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                if (!containerRef.current) return;
                                                const rect = containerRef.current.getBoundingClientRect();
                                                setGanttAction({ type: 'resize-left', id: task.id, startX: e.clientX - rect.left, initialStart: task.start, initialWidth: task.width });
                                            }}
                                        />

                                        {/* Resize Right */}
                                        <div
                                            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize z-10"
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                if (!containerRef.current) return;
                                                const rect = containerRef.current.getBoundingClientRect();
                                                setGanttAction({ type: 'resize-right', id: task.id, startX: e.clientX - rect.left, initialStart: task.start, initialWidth: task.width });
                                            }}
                                        />

                                        {/* Start Handle (Drop Target) */}
                                        <div
                                            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-paper border-2 border-ink rounded-none opacity-0 group-hover:opacity-100 cursor-crosshair z-30 transition-opacity hover:scale-125"
                                            onMouseUp={(e) => handleMouseUpTask(e, task.id)}
                                        />

                                        {/* End Handle (Drag Source) */}
                                        <div
                                            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-paper border-2 border-ink rounded-none opacity-0 group-hover:opacity-100 cursor-crosshair z-30 transition-opacity hover:scale-125"
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                handleMouseDown(e, task.id, index, task.start + task.width);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
