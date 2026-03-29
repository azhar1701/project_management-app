import { useState } from 'react';
import {
    Kanban,
    CalendarDays,
    Map as MapIcon,
    Calculator,
    FileText,
    Info,
    MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OverviewView } from './OverviewView';
import { KanbanView } from './KanbanView';
import { GanttView } from './GanttView';
import { GISView } from './GISView';
import { TechnicalToolsView } from './TechnicalToolsView';

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
                    <div className="flex items-center justify-center h-full text-muted border-2 border-dashed border-ink/20">
                        <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-muted" />
                            <p className="text-sm font-mono uppercase tracking-widest">Documents coming soon</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
