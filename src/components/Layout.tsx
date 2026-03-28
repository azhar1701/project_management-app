import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Map, 
  Calculator, 
  FileBarChart, 
  Settings,
  Search,
  Bell,
  Menu,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FolderKanban, label: 'Projects', path: '/project/1' },
    { icon: Map, label: 'GIS Module', path: '/gis' },
    { icon: Calculator, label: 'Calculator', path: '/calculator' },
    { icon: FileBarChart, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-paper text-ink font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-surface border-r border-ink transition-all duration-300 flex flex-col shrink-0",
        isSidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-ink shrink-0">
          <div className={cn("flex items-center gap-2 text-accent font-mono font-bold text-sm tracking-widest uppercase overflow-hidden whitespace-nowrap", !isSidebarOpen && "hidden")}>
            <Droplets className="w-5 h-5 shrink-0" />
            <span>HydroGIS</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("p-1 hover:bg-paper rounded-none border border-transparent hover:border-ink text-ink shrink-0 transition-colors", !isSidebarOpen && "mx-auto")}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-none transition-colors whitespace-nowrap overflow-hidden border border-transparent",
                isActive ? "bg-ink text-surface font-medium" : "text-ink hover:bg-paper hover:border-ink",
                !isSidebarOpen && "justify-center px-0"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium tracking-wide">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-surface border-b border-ink flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search projects, tasks, or locations..." 
                className="w-full pl-10 pr-4 py-2 bg-paper border border-ink rounded-none text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all placeholder:text-muted"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4 shrink-0">
            <button className="relative p-2 text-ink hover:bg-paper border border-transparent hover:border-ink rounded-none transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-none border border-surface"></span>
            </button>
            <button className="flex items-center gap-2 p-1 hover:bg-paper border border-transparent hover:border-ink rounded-none transition-colors">
              <div className="w-8 h-8 bg-accent text-surface border border-ink rounded-none flex items-center justify-center font-mono font-bold text-sm">
                JD
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-paper">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
