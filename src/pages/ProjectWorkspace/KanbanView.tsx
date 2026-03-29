import React, { useState, useMemo } from 'react';
import {
    Map as MapIcon,
    Calculator,
    FileText,
    CalendarDays,
    Plus,
    MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import type { Task } from '../../types';

export function KanbanView() {
    const { allTasks, addTask, updateTask, moveTask, user } = useStore(useShallow(state => ({
        allTasks: state.tasks,
        addTask: state.addTask,
        updateTask: state.updateTask,
        moveTask: state.moveTask,
        user: state.user
    })));

    // Filter tasks for this specific project view and memoize them
    const tasks = useMemo(() => allTasks.filter(t => t.project === 'Merapi Dam EIA'), [allTasks]);

    const columns: { id: Task['status'], title: string }[] = [
        { id: 'Backlog', title: 'Backlog' },
        { id: 'To Do', title: 'To Do' },
        { id: 'In Progress', title: 'In Progress' },
        { id: 'Review', title: 'Review' },
        { id: 'Done', title: 'Done' },
    ];

    const [editingTask, setEditingTask] = useState<string | null>(null);

    const handleAddTask = (colId: Task['status']) => {
        addTask({
            title: 'New Task',
            type: 'doc',
            status: colId,
            project: 'Merapi Dam EIA',
            assignee: user.initials,
            dueDate: 'TBD'
        });
    };

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, colId: Task['status']) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        moveTask(taskId, colId);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
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
                            <span className="bg-ink text-surface font-mono text-[10px] px-1.5 py-0.5">
                                {tasks.filter(t => t.status === col.id).length}
                            </span>
                        </h3>
                        <button onClick={() => handleAddTask(col.id)} className="text-ink hover:text-accent"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-paper/50 min-h-[100px]">
                        {tasks.filter(t => t.status === col.id).map(task => (
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
                                            updateTask(task.id, { title: e.target.value || 'Untitled Task' });
                                            setEditingTask(null);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                updateTask(task.id, { title: e.currentTarget.value || 'Untitled Task' });
                                                setEditingTask(null);
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    />
                                ) : (
                                    <h4
                                        className="text-sm font-bold text-ink mb-4 cursor-text hover:text-accent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
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
                                        <CalendarDays className="w-3 h-3" /> {task.dueDate}
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
