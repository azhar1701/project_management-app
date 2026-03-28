import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-ink uppercase tracking-tight">Settings</h1>
        <p className="text-sm font-mono text-muted uppercase tracking-widest mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 overflow-y-auto pr-4">
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-paper tech-border text-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors tech-shadow">
              <User className="w-4 h-4" /> Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-paper hover:text-ink tech-border border-transparent hover:border-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors">
              <Bell className="w-4 h-4" /> Notifications
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-paper hover:text-ink tech-border border-transparent hover:border-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors">
              <Shield className="w-4 h-4" /> Security
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-paper hover:text-ink tech-border border-transparent hover:border-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors">
              <Database className="w-4 h-4" /> Data Management
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-paper hover:text-ink tech-border border-transparent hover:border-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors">
              <Palette className="w-4 h-4" /> Appearance
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-paper hover:text-ink tech-border border-transparent hover:border-ink font-mono text-xs font-bold uppercase tracking-widest transition-colors">
              <Globe className="w-4 h-4" /> Integrations
            </a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-paper tech-border tech-shadow overflow-y-auto p-8">
          <h2 className="text-lg font-bold text-ink uppercase tracking-wider mb-8 border-b border-ink pb-4">Profile Information</h2>
          
          <div className="space-y-8 max-w-lg">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-surface tech-border flex items-center justify-center text-3xl font-mono font-bold text-ink tech-shadow">
                JD
              </div>
              <div>
                <button className="px-4 py-2 bg-surface tech-border text-xs font-mono font-bold uppercase tracking-widest text-ink hover:bg-paper transition-colors tech-shadow">
                  Change Avatar
                </button>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted mt-3">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">First Name</label>
                <input type="text" defaultValue="John" className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Email Address</label>
              <input type="email" defaultValue="john.doe@hydrogis.pro" className="w-full px-4 py-2 bg-surface tech-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Role</label>
              <input type="text" defaultValue="Lead Hydrologist" disabled className="w-full px-4 py-2 bg-surface/50 tech-border text-sm font-mono text-muted cursor-not-allowed" />
            </div>

            <div className="pt-6 border-t border-ink flex justify-end gap-4">
              <button className="px-6 py-2 bg-surface tech-border text-xs font-mono font-bold uppercase tracking-widest text-ink hover:bg-paper transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
