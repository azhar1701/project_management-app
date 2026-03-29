import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Project, Task, GanttTask, Report, UserProfile } from '../types';

interface AppState {
    projects: Project[];
    tasks: Task[];
    ganttTasks: GanttTask[];
    reports: Report[];
    user: UserProfile;

    // Actions
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    moveTask: (id: string, newStatus: Task['status']) => void;
    deleteTask: (id: string) => void;

    addGanttTask: (task: Omit<GanttTask, 'id'>) => void;
    updateGanttTask: (id: string, updates: Partial<GanttTask>) => void;

    updateUser: (updates: Partial<UserProfile>) => void;
    resetStore: () => void;
}

const initialProjects: Project[] = [
    {
        id: 'proj-1',
        title: 'Merapi Dam EIA Study',
        status: 'In Progress',
        description: 'Environmental Impact Assessment & Hydrological Modeling',
        progress: 75,
        memberAvatars: ['JD', 'AS', '+3'],
        location: { lat: -7.5407, lng: 110.446, label: 'Merapi Dam EIA' },
    },
    {
        id: 'proj-2',
        title: 'Ciliwung River Basin',
        status: 'Overdue',
        description: 'Flood Mitigation Analysis & Watershed Mapping',
        progress: 45,
        memberAvatars: ['AS', 'MK', '+1'],
        location: { lat: -6.1751, lng: 106.8272, label: 'Ciliwung River Basin' },
    },
    {
        id: 'proj-3',
        title: 'Brantas Flood Control',
        status: 'On Hold',
        description: 'Topographic Survey & River Cross Sections',
        progress: 15,
        memberAvatars: ['MK', 'JD'],
        location: { lat: -7.2504, lng: 112.7688, label: 'Brantas Flood Control' },
    },
];

const initialTasks: Task[] = [
    { id: uuidv4(), title: 'GIS Data Gathering', type: 'gis', status: 'Backlog', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Oct 28' },
    { id: uuidv4(), title: 'Literature Review', type: 'doc', status: 'Backlog', project: 'Merapi Dam EIA', assignee: 'AS', dueDate: 'Oct 29' },
    { id: uuidv4(), title: 'Review Survey Plan', type: 'doc', status: 'Backlog', project: 'Merapi Dam EIA', assignee: 'MK', dueDate: 'Oct 30' },
    { id: uuidv4(), title: 'Equipment Calibration', type: 'field', status: 'Backlog', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Nov 01' },
    { id: uuidv4(), title: 'Stakeholder Meeting', type: 'doc', status: 'Backlog', project: 'Merapi Dam EIA', assignee: 'AS', dueDate: 'Nov 02' },
    { id: uuidv4(), title: 'Field Survey - Soil Sampling', type: 'field', status: 'To Do', project: 'Merapi Dam EIA', assignee: 'MK', dueDate: 'Oct 25' },
    { id: uuidv4(), title: 'Setup GNSS Base Station', type: 'field', status: 'To Do', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Oct 26' },
    { id: uuidv4(), title: 'Prepare Field Logs', type: 'doc', status: 'To Do', project: 'Merapi Dam EIA', assignee: 'AS', dueDate: 'Oct 26' },
    { id: uuidv4(), title: 'Delineate Catchment Area', type: 'gis', status: 'In Progress', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Oct 25' },
    { id: uuidv4(), title: 'Calculate Runoff Coefficient', type: 'calc', status: 'In Progress', project: 'Merapi Dam EIA', assignee: 'AS', dueDate: 'Oct 25' },
    { id: uuidv4(), title: 'Draft Hydrology Chapter', type: 'doc', status: 'Review', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Oct 25' },
    { id: uuidv4(), title: 'Project Kickoff', type: 'doc', status: 'Done', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Oct 10' },
    { id: uuidv4(), title: 'Initial Site Visit', type: 'field', status: 'Done', project: 'Merapi Dam EIA', assignee: 'MK', dueDate: 'Oct 12' },
    { id: uuidv4(), title: 'Procure Topo Maps', type: 'gis', status: 'Done', project: 'Merapi Dam EIA', assignee: 'AS', dueDate: 'Oct 15' },
    // Add some dashboard global tasks
    { id: 'task-dash-1', title: 'Review Merapi Dam Hydrology Report', type: 'doc', status: 'In Progress', project: 'Merapi Dam EIA', assignee: 'JD', dueDate: 'Today, 2:00 PM' },
    { id: 'task-dash-2', title: 'Update Watershed Boundary GIS Layer', type: 'gis', status: 'To Do', project: 'Ciliwung River Basin', assignee: 'JD', dueDate: 'Today, 5:00 PM' },
    { id: 'task-dash-3', title: 'Field Survey Data Entry - Site A', type: 'field', status: 'Backlog', project: 'Brantas Flood Control', assignee: 'JD', dueDate: 'Tomorrow, 9:00 AM' },
];

const initialGanttTasks: GanttTask[] = [
    { id: 't1', name: '1. Data Collection', start: 1, width: 8, color: 'bg-[#141414]', deps: [], label: 'T1' },
    { id: 't2', name: '1.1 Topography Maps', start: 1, width: 3, color: 'bg-[#F27D26]', deps: [], indent: true, label: 'T1.1' },
    { id: 't3', name: '1.2 Hydrological Data', start: 4, width: 5, color: 'bg-[#141414]', deps: ['t2'], indent: true, label: 'T1.2' },
    { id: 't4', name: '2. Hydrological Analysis', start: 9, width: 10, color: 'bg-[#141414]', deps: ['t3'], label: 'T2' },
    { id: 't5', name: '2.1 Catchment Delineation', start: 9, width: 4, color: 'bg-[#F27D26]', deps: [], indent: true, label: 'T2.1' },
    { id: 't6', name: '2.2 Design Flood Calc', start: 13, width: 6, color: 'bg-[#141414]', deps: ['t5'], indent: true, label: 'T2.2' },
    { id: 't7', name: '3. Hydraulic Modeling', start: 19, width: 8, color: 'bg-[#141414]', deps: ['t6'], label: 'T3' },
    { id: 't8', name: '4. Reporting & EIA Draft', start: 27, width: 5, color: 'bg-[#141414]', deps: ['t7'], label: 'T4' },
];

const initialReports: Report[] = [
    { id: 'rep-1', title: 'Monthly Progress Report - Merapi EIA', date: '2026-10-01', type: 'PDF', size: '2.4 MB', project: 'Merapi Dam EIA' },
    { id: 'rep-2', title: 'Watershed Delineation Maps v2', date: '2026-10-05', type: 'PDF', size: '15.6 MB', project: 'Ciliwung River Basin' },
    { id: 'rep-3', title: 'Soil Sampling Field Logs - Site A', date: '2026-10-12', type: 'CSV', size: '0.8 MB', project: 'Merapi Dam EIA' },
    { id: 'rep-4', title: 'Initial Hydrological Flow Calculations', date: '2026-10-15', type: 'DOCX', size: '1.2 MB', project: 'Brantas Flood Control' },
    { id: 'rep-5', title: 'Q3 Stakeholder Engagement Minutes', date: '2026-10-20', type: 'PDF', size: '3.1 MB', project: 'Merapi Dam EIA' },
];

const initialUser: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@hydrogis.pro',
    role: 'Lead Hydrologist',
    initials: 'JD',
};

const initialState = {
    projects: initialProjects,
    tasks: initialTasks,
    ganttTasks: initialGanttTasks,
    reports: initialReports,
    user: initialUser,
};

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            ...initialState,

            addTask: (task) =>
                set((state) => ({
                    tasks: [...state.tasks, { ...task, id: uuidv4() }],
                })),

            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, ...updates } : task
                    ),
                })),

            moveTask: (id, newStatus) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, status: newStatus } : task
                    ),
                })),

            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),

            addGanttTask: (task) =>
                set((state) => ({
                    ganttTasks: [...state.ganttTasks, { ...task, id: uuidv4() }],
                })),

            updateGanttTask: (id, updates) =>
                set((state) => ({
                    ganttTasks: state.ganttTasks.map((task) =>
                        task.id === id ? { ...task, ...updates } : task
                    ),
                })),

            updateUser: (updates) =>
                set((state) => ({
                    user: { ...state.user, ...updates },
                })),

            resetStore: () => set(initialState),
        }),
        {
            name: 'hydrogis-storage', // Key for localStorage
            partialize: (state) => ({
                tasks: state.tasks, // Persist dynamic lists
                ganttTasks: state.ganttTasks,
                user: state.user,
                projects: state.projects, // If we add project creation/editing
            }),
        }
    )
);
