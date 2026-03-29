import { CalendarDays, Layers } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

export function OverviewView() {
    const tasks = useStore(useShallow(state => state.tasks));

    const { totalTasks, progress, overdueTasks } = useMemo(() => {
        const projectTasks = tasks.filter(t => t.project === 'Merapi Dam EIA');
        const total = projectTasks.length;
        const completed = projectTasks.filter(t => t.status === 'Done').length;
        const prog = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Simple mock logic for overdue (e.g. anything not Done, for now we just show a static 2 or calculated)
        const overdue = 2;

        return { totalTasks: total, progress: prog, overdueTasks: overdue };
    }, [tasks]);

    return (
        <div className="h-full overflow-y-auto p-6 bg-paper">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
                    <div className="w-16 h-16 rounded-none border-4 border-ink flex items-center justify-center relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="30" cy="30" r="28" fill="none" stroke="#0055FF" strokeWidth="4" strokeDasharray="175" strokeDashoffset={175 - (175 * progress) / 100} className="opacity-100 transition-all duration-500" />
                        </svg>
                        <span className="text-lg font-mono font-bold text-accent">{progress}%</span>
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Overall Progress</h3>
                        <p className="text-2xl font-bold text-ink uppercase tracking-tight">{progress === 100 ? 'Completed' : 'On Track'}</p>
                    </div>
                </div>

                <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface tech-border flex items-center justify-center text-[#FF4400]">
                        <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Overdue Tasks</h3>
                        <p className="text-2xl font-mono font-bold text-ink">{overdueTasks.toString().padStart(2, '0')}</p>
                    </div>
                </div>

                <div className="bg-surface p-6 tech-border tech-shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface tech-border flex items-center justify-center text-ink">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-1">Total Tasks</h3>
                        <p className="text-2xl font-mono font-bold text-ink">{totalTasks.toString().padStart(2, '0')}</p>
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
