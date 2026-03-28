import { CheckCircle2, Clock, AlertCircle, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const projectsAtAGlance = [
    { label: 'Ongoing', count: 12, icon: Clock, color: 'text-ink', bg: 'bg-surface', border: 'tech-border' },
    { label: 'Overdue', count: 3, icon: AlertCircle, color: 'text-[#FF4400]', bg: 'bg-surface', border: 'tech-border' },
    { label: 'Completed', count: 45, icon: CheckCircle2, color: 'text-accent', bg: 'bg-surface', border: 'tech-border' },
  ];

  const myTasks = [
    { id: 1, title: 'Review Merapi Dam Hydrology Report', project: 'Merapi Dam EIA', due: 'Today, 2:00 PM', status: 'In Progress' },
    { id: 2, title: 'Update Watershed Boundary GIS Layer', project: 'Ciliwung River Basin', due: 'Today, 5:00 PM', status: 'To Do' },
    { id: 3, title: 'Field Survey Data Entry - Site A', project: 'Brantas Flood Control', due: 'Tomorrow', status: 'To Do' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink pb-4">
        <h1 className="text-3xl font-bold text-ink tracking-tight uppercase">Project Overview</h1>
        <div className="text-sm font-mono text-muted uppercase tracking-widest">Thursday, Oct 24, 2026</div>
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
                        <Clock className="w-3 h-3" /> {task.due}
                      </span>
                      <span className={`px-2 py-1 border border-ink font-bold uppercase tracking-wider ${
                        task.status === 'In Progress' ? 'bg-accent text-surface' : 'bg-paper text-ink'
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
            {/* Placeholder for Map */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23111111\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}></div>
            
            {/* Mock Map Pins */}
            <Link to="/project/1" className="absolute top-1/4 left-1/3 flex flex-col items-center group cursor-pointer">
              <div className="bg-surface border border-ink px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-ink mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Merapi Dam EIA</div>
              <MapPin className="w-6 h-6 text-accent drop-shadow-md" fill="currentColor" />
            </Link>
            <div className="absolute top-1/2 left-2/3 flex flex-col items-center group cursor-pointer">
              <div className="bg-surface border border-ink px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-ink mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ciliwung River Basin</div>
              <MapPin className="w-6 h-6 text-ink drop-shadow-md" fill="currentColor" />
            </div>
            <div className="absolute bottom-1/3 left-1/4 flex flex-col items-center group cursor-pointer">
              <div className="bg-surface border border-ink px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-ink mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Brantas Flood Control</div>
              <MapPin className="w-6 h-6 text-accent drop-shadow-md" fill="currentColor" />
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
    </div>
  );
}
