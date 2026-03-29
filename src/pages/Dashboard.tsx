import { CheckCircle2, Clock, AlertCircle, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export function Dashboard() {
  const { projects, tasks } = useStore(useShallow(state => ({ projects: state.projects, tasks: state.tasks })));

  const { ongoingCount, overdueCount, completedCount } = useMemo(() => {
    return {
      ongoingCount: projects.filter(p => p.status === 'In Progress').length,
      overdueCount: projects.filter(p => p.status === 'Overdue').length,
      completedCount: projects.filter(p => p.status === 'Completed').length
    };
  }, [projects]);

  const projectsAtAGlance = [
    { label: 'Ongoing', count: ongoingCount, icon: Clock, color: 'text-ink', bg: 'bg-surface', border: 'tech-border' },
    { label: 'Overdue', count: overdueCount, icon: AlertCircle, color: 'text-[#FF4400]', bg: 'bg-surface', border: 'tech-border' },
    { label: 'Completed', count: completedCount, icon: CheckCircle2, color: 'text-accent', bg: 'bg-surface', border: 'tech-border' },
  ];

  // Get up to 4 active tasks assigned to the current user
  const myTasks = useMemo(() => {
    return tasks.filter(t => t.status !== 'Done').slice(0, 4);
  }, [tasks]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink pb-4">
        <h1 className="text-3xl font-bold text-ink tracking-tight uppercase">Project Overview</h1>
        <div className="text-sm font-mono text-muted uppercase tracking-widest">
          {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Widget 1: Project At a Glance */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projectsAtAGlance.map((stat) => (
            <div key={stat.label} className={`p-6 ${stat.border} ${stat.bg} tech-shadow flex items-center justify-between`}>
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">{stat.label} Projects</p>
                <p className={`text-5xl font-mono font-bold ${stat.color}`}>{stat.count.toString().padStart(2, '0')}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.color}`} strokeWidth={1.5} />
            </div>
          ))}
        </div>

        {/* Widget 2: My Tasks */}
        <div className="col-span-1 lg:col-span-1 bg-surface tech-border tech-shadow flex flex-col h-[400px]">
          <div className="p-4 border-b border-ink flex items-center justify-between shrink-0 bg-paper">
            <h2 className="font-bold text-ink uppercase tracking-wider text-sm">My Tasks</h2>
            <button className="text-xs font-mono text-accent hover:text-accent-hover font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-4">
              {myTasks.map((task) => (
                <li key={task.id} className="group">
                  <Link to={`/task/${task.id}`} className="block p-4 border border-ink hover:bg-paper transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold text-ink line-clamp-1">{task.title}</h3>
                    </div>
                    <p className="text-xs font-mono text-muted mb-3 uppercase tracking-wide">{task.project}</p>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-ink font-bold">
                        <Clock className="w-3 h-3" /> {task.dueDate}
                      </span>
                      <span className={`px-2 py-1 border border-ink font-bold uppercase tracking-wider ${task.status === 'In Progress' ? 'bg-accent text-surface' : 'bg-paper text-ink'
                        }`}>
                        {task.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Widget 3: Mini Map GIS Overview */}
        <div className="col-span-1 lg:col-span-2 bg-surface tech-border tech-shadow flex flex-col overflow-hidden h-[400px]">
          <div className="p-4 border-b border-ink flex items-center justify-between z-10 bg-paper shrink-0">
            <h2 className="font-bold text-ink uppercase tracking-wider text-sm">Active Projects Map</h2>
            <Link to="/gis" className="text-xs font-mono flex items-center gap-1 text-accent hover:text-accent-hover font-bold uppercase tracking-widest">
              Open Full GIS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 relative bg-paper">
            <Map
              initialViewState={{
                longitude: 110.42,
                latitude: -7.54,
                zoom: 5.5,
                pitch: 45
              }}
              mapStyle={MAP_STYLE}
              interactive={true}
              attributionControl={false}
            >
              {/* Active Project Marker */}
              <Marker longitude={110.42} latitude={-7.54} anchor="bottom">
                <Link to="/project/1" className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                  <div className="bg-surface border border-accent p-1 tech-shadow text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-1 whitespace-nowrap">Merapi Dam EIA</div>
                  <MapPin className="w-6 h-6 text-accent drop-shadow-[0_0_8px_rgba(242,125,38,0.8)]" fill="#F27D26" color="#141414" />
                </Link>
              </Marker>

              <Marker longitude={112.75} latitude={-7.25} anchor="bottom">
                <Link to="/project/3" className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                  <div className="bg-surface border border-ink p-1 tech-shadow text-[10px] font-mono font-bold uppercase tracking-wider text-ink mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Brantas River</div>
                  <MapPin className="w-5 h-5 text-ink drop-shadow-md" fill="currentColor" color="#F2F2F2" />
                </Link>
              </Marker>
            </Map>
          </div>

          {/* Map Controls Mock */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <div className="bg-surface tech-border tech-shadow overflow-hidden flex flex-col">
              <button className="w-8 h-8 flex items-center justify-center text-ink hover:bg-paper border-b border-ink font-mono font-bold">+</button>
              <button className="w-8 h-8 flex items-center justify-center text-ink hover:bg-paper font-mono font-bold">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
