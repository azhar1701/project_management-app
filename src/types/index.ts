/** Shared TypeScript interfaces for the HydroGIS application */

export interface Project {
    id: string;
    title: string;
    status: 'In Progress' | 'Completed' | 'On Hold' | 'Overdue';
    description: string;
    progress: number;
    memberAvatars: string[];
    location?: { lat: number; lng: number; label: string };
}

export interface Task {
    id: string;
    title: string;
    type: 'gis' | 'calc' | 'field' | 'doc';
    status: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done';
    project: string;
    assignee: string;
    dueDate: string;
}

export interface Report {
    id: string;
    title: string;
    date: string;
    type: 'PDF' | 'DOCX' | 'CSV';
    size: string;
    project: string;
}

export interface GanttTask {
    id: string;
    name: string;
    start: number;
    width: number;
    color: string;
    deps: string[];
    label?: string;
    indent?: boolean;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    initials: string;
}
