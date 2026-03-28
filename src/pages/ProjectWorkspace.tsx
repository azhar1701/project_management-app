import React, { useState, useRef, useEffect } from 'react';
import { 
  Kanban, 
  CalendarDays, 
  Map as MapIcon, 
  Calculator, 
  FileText, 
  Info,
  MoreVertical,
  Plus,
  Layers,
  MousePointer2,
  Pencil,
  Hexagon,
  Download,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceArea } from 'recharts';
import { Link } from 'react-router-dom';

export function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'tasks', label: 'Tasks (Kanban)', icon: Kanban },
    { id: 'timeline', label: 'Timeline (Gantt)', icon: CalendarDays },
    { id: 'gis', label: 'GIS Map', icon: MapIcon },
    { id: 'tools', label: 'Technical Tools', icon: Calculator },
    { id: 'docs', label: 'Documents', icon: FileText },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0 border-b border-ink pb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-ink uppercase tracking-tight">Merapi Dam EIA Study</h1>
            <span className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-surface text-ink border border-ink tech-shadow">
              In Progress
            </span>
          </div>
          <p className="text-sm font-mono text-muted uppercase tracking-widest">Environmental Impact Assessment & Hydrological Modeling</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2 mr-2">
            <div className="w-8 h-8 bg-surface border border-ink flex items-center justify-center text-xs font-mono font-bold text-ink tech-shadow">JD</div>
            <div className="w-8 h-8 bg-surface border border-ink flex items-center justify-center text-xs font-mono font-bold text-ink tech-shadow">AS</div>
            <div className="w-8 h-8 bg-surface border border-ink flex items-center justify-center text-xs font-mono font-bold text-ink tech-shadow">+3</div>
          </div>
          <button className="px-4 py-2 bg-accent text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent-hover transition-colors">
            Share
          </button>
          <button className="p-2 text-ink hover:bg-paper tech-border transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Context Tabs */}
      <div className="border-b border-ink mb-6 shrink-0 overflow-x-auto hide-scrollbar">
        <nav className="flex space-x-2 min-w-max pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-ink text-surface tech-shadow translate-y-[-2px]" 
                  : "text-muted hover:text-ink hover:bg-surface tech-border bg-paper"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Area Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'tasks' && <KanbanView />}
        {activeTab === 'timeline' && <GanttView />}
        {activeTab === 'gis' && <GISView />}
        {activeTab === 'tools' && <TechnicalToolsView />}
        {activeTab === 'docs' && (
          <div className="flex items-center justify-center h-full text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Documents coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewView() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
          <div className="w-16 h-16 rounded-none border-4 border-ink flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#0055FF" strokeWidth="4" strokeDasharray="175" strokeDashoffset="40" className="opacity-100" />
            </svg>
            <span className="text-lg font-mono font-bold text-accent">75%</span>
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Overall Progress</h3>
            <p className="text-2xl font-bold text-ink uppercase tracking-tight">On Track</p>
          </div>
        </div>

        <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-surface tech-border flex items-center justify-center text-[#FF4400]">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Overdue Tasks</h3>
            <p className="text-2xl font-mono font-bold text-ink">02</p>
          </div>
        </div>

        <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-surface tech-border flex items-center justify-center text-ink">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Total Tasks</h3>
            <p className="text-2xl font-mono font-bold text-ink">24</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 tech-border tech-shadow">
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 border-b border-ink pb-2">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: 'JD completed "Delineate Catchment Area"', time: '2 hours ago' },
              { text: 'AS added a comment on "Runoff Coefficient"', time: '4 hours ago' },
              { text: 'MK uploaded "Soil_Samples_Report.pdf"', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 bg-accent shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-ink">{activity.text}</p>
                  <p className="text-xs font-mono text-muted uppercase tracking-wide mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 tech-border tech-shadow">
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 border-b border-ink pb-2">Tasks by Assignee</h3>
          <div className="space-y-4">
            {[
              { name: 'JD', count: 8, color: 'bg-accent', width: 'w-3/4' },
              { name: 'AS', count: 5, color: 'bg-ink', width: 'w-1/2' },
              { name: 'MK', count: 3, color: 'bg-muted', width: 'w-1/3' },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-ink w-6">{user.name}</span>
                <div className="flex-1 h-2 bg-paper tech-border overflow-hidden">
                  <div className={`h-full ${user.color} ${user.width}`}></div>
                </div>
                <span className="text-xs font-mono text-muted w-4">{user.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanView() {
  const columns = [
    { id: 'backlog', title: 'Backlog', count: 5 },
    { id: 'todo', title: 'To Do', count: 3 },
    { id: 'inprogress', title: 'In Progress', count: 2 },
    { id: 'review', title: 'Review', count: 1 },
    { id: 'done', title: 'Done', count: 12 },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Delineate Catchment Area', type: 'gis', col: 'inprogress', assignee: 'JD' },
    { id: 2, title: 'Calculate Runoff Coefficient', type: 'calc', col: 'inprogress', assignee: 'AS' },
    { id: 3, title: 'Field Survey - Soil Sampling', type: 'field', col: 'todo', assignee: 'MK' },
    { id: 4, title: 'Draft Hydrology Chapter', type: 'doc', col: 'review', assignee: 'JD' },
  ]);
  const [editingTask, setEditingTask] = useState<number | null>(null);

  const handleAddTask = (colId: string) => {
    const newId = Date.now();
    const newTask = {
      id: newId,
      title: 'New Task',
      type: 'doc',
      col: colId,
      assignee: 'ME'
    };
    setTasks([...tasks, newTask]);
    setEditingTask(newId);
  };

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    setTasks(tasks.map(t => t.id === taskId ? { ...t, col: colId } : t));
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'gis': return <MapIcon className="w-3.5 h-3.5 text-accent" />;
      case 'calc': return <Calculator className="w-3.5 h-3.5 text-ink" />;
      case 'field': return <MapPin className="w-3.5 h-3.5 text-[#FF4400]" />;
      default: return <FileText className="w-3.5 h-3.5 text-muted" />;
    }
  };

  return (
    <div className="h-full flex gap-6 overflow-x-auto pb-4 snap-x p-4 bg-paper">
      {columns.map(col => (
        <div 
          key={col.id} 
          className="flex-shrink-0 w-80 flex flex-col bg-surface tech-border snap-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className="p-3 flex items-center justify-between border-b border-ink bg-paper">
            <h3 className="font-bold text-ink text-xs uppercase tracking-wider flex items-center gap-2">
              {col.title}
              <span className="bg-ink text-surface font-mono text-[10px] px-1.5 py-0.5">{col.count}</span>
            </h3>
            <button onClick={() => handleAddTask(col.id)} className="text-ink hover:text-accent"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-paper/50">
            {tasks.filter(t => t.col === col.id).map(task => (
              <Link 
                to={`/task/${task.id}`} 
                key={task.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="block bg-surface p-4 tech-border tech-shadow hover:border-accent transition-all cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1.5 bg-paper px-2 py-1 border border-ink">
                    {getTypeIcon(task.type)}
                    <span className="text-ink font-mono text-[10px] uppercase tracking-widest">{task.type}</span>
                  </div>
                </div>
                {editingTask === task.id ? (
                  <input
                    autoFocus
                    className="w-full mb-3 px-2 py-1 border border-accent text-sm font-bold outline-none focus:ring-1 focus:ring-accent bg-surface text-ink"
                    defaultValue={task.title}
                    onBlur={(e) => {
                      setTasks(tasks.map(t => t.id === task.id ? { ...t, title: e.target.value || 'Untitled Task' } : t));
                      setEditingTask(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setTasks(tasks.map(t => t.id === task.id ? { ...t, title: e.currentTarget.value || 'Untitled Task' } : t));
                        setEditingTask(null);
                      }
                    }}
                    onClick={(e) => e.preventDefault()}
                  />
                ) : (
                  <h4 
                    className="text-sm font-bold text-ink mb-4 cursor-text hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingTask(task.id);
                    }}
                    title="Click to edit"
                  >
                    {task.title}
                  </h4>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-ink/10">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-surface border border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink">{task.assignee}</div>
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> Oct 25
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GanttView() {
  type Task = {
    id: string;
    name: string;
    start: number;
    width: number;
    color: string;
    deps: string[];
    label?: string;
    indent?: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', name: '1. Data Collection', start: 0, width: 33, color: 'bg-ink text-paper', deps: [] },
    { id: 't2', name: '1.1 Topography Maps', start: 0, width: 25, color: 'bg-ink text-paper opacity-80', deps: [], indent: true },
    { id: 't3', name: '2. Hydrological Analysis', start: 25, width: 50, color: 'bg-accent text-ink', deps: [], label: 'In Progress' },
    { id: 't4', name: '2.1 Catchment Delineation', start: 25, width: 16, color: 'bg-accent text-ink opacity-80', deps: ['t2'], indent: true },
    { id: 't5', name: '2.2 Design Flood Calc', start: 41, width: 25, color: 'bg-surface text-ink', deps: ['t4'], indent: true },
  ]);

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
    const newId = `t${Date.now()}`;
    const newTask: Task = {
      id: newId,
      name: `New Task`,
      start: 10,
      width: 20,
      color: 'bg-accent text-ink',
      deps: []
    };
    setTasks([...tasks, newTask]);
    setEditingTask(newId);
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
    if (ganttAction) setGanttAction(null);
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
      setTasks(tasks.map(t => {
        if (t.id === targetTaskId && !t.deps.includes(drawing.id)) {
          return { ...t, deps: [...t.deps, drawing.id] };
        }
        return t;
      }));
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
                        setTasks(tasks.map(t => t.id === task.id ? { ...t, name: e.target.value || 'Untitled Task' } : t));
                        setEditingTask(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setTasks(tasks.map(t => t.id === task.id ? { ...t, name: e.currentTarget.value || 'Untitled Task' } : t));
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
                        <polygon points={`${x2},${y2} ${x2-6},${y2-4} ${x2-6},${y2+4}`} fill="#141414" />
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

function GISView() {
  return (
    <div className="h-full relative bg-surface tech-border tech-shadow overflow-hidden flex">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23141414\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Mock Watershed Polygon */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <path d="M 300 200 Q 400 100 500 250 T 600 400 Q 450 500 350 450 Z" fill="rgba(242, 125, 38, 0.1)" stroke="#F27D26" strokeWidth="2" strokeDasharray="5,5" />
        <circle cx="450" cy="350" r="4" fill="#141414" />
        <text x="460" y="355" fontSize="12" fill="#141414" fontWeight="bold" fontFamily="JetBrains Mono" className="uppercase tracking-widest">Dam Site</text>
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
          <h3 className="font-bold text-ink text-xs font-mono uppercase tracking-widest">Map Layers</h3>
        </div>
        <div className="p-4 overflow-y-auto space-y-4">
          <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
            <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
            <span className="group-hover:text-accent transition-colors">Watershed Boundaries</span>
          </label>
          <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
            <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
            <span className="group-hover:text-accent transition-colors">River Networks</span>
          </label>
          <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
            <input type="checkbox" defaultChecked className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
            <span className="group-hover:text-accent transition-colors">Sample Points</span>
          </label>
          <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
            <input type="checkbox" className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
            <span className="group-hover:text-accent transition-colors">Land Use Data (2025)</span>
          </label>
          <label className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink cursor-pointer group">
            <input type="checkbox" className="rounded-none text-accent focus:ring-accent bg-surface border-ink" />
            <span className="group-hover:text-accent transition-colors">Topography (DEM)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function TechnicalToolsView() {
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
