-- HydroGIS Production Schema (Supabase / PostgreSQL)

-- 1. Enable PostGIS Extension First!
-- This gives PostgreSQL true spatial and geographical intelligence 
-- allowing query calculations for watersheds, radii, and geo-boundaries.
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. User Profiles Table (Synchronizes automatically with Supabase Auth)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'Field Surveyor',
    initials TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects Table (Includes PostGIS Geometry configuration)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('In Progress', 'Completed', 'On Hold', 'Overdue')),
    description TEXT,
    progress INTEGER DEFAULT 0,
    -- Map Marker Coordination (EPSG:4326 is the globally recognized WGS 84 format)
    location geometry(Point, 4326),
    location_label TEXT,
    owner_id UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Unified Tasks Table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('gis', 'calc', 'field', 'doc')),
    status TEXT CHECK (status IN ('Backlog', 'To Do', 'In Progress', 'Review', 'Done')),
    assignee_id UUID REFERENCES public.user_profiles(id),
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Zero-Trust Security: Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 6. Granular Security Policies
-- Anyone authenticated can see active projects
CREATE POLICY "Allow read access to authenticated users for projects"
    ON public.projects FOR SELECT 
    TO authenticated USING (true);

-- Only project owners can edit project metadata
CREATE POLICY "Allow update access to owners exclusively"
    ON public.projects FOR UPDATE 
    USING (auth.uid() = owner_id);

-- Tasks are visible to any authenticated user right now
CREATE POLICY "Allow read access to authenticated users for tasks"
    ON public.tasks FOR SELECT 
    TO authenticated USING (true);
