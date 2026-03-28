import { FileText, Download, Filter, FileBarChart, CalendarDays } from 'lucide-react';

export function Reports() {
  const reports = [
    { id: 1, title: 'Merapi Dam - Q3 Hydrology Report', date: '2025-10-15', type: 'PDF', size: '2.4 MB', project: 'Merapi Dam EIA' },
    { id: 2, title: 'Solo River Basin - Flood Risk Assessment', date: '2025-09-28', type: 'DOCX', size: '1.1 MB', project: 'Solo River Basin' },
    { id: 3, title: 'Catchment Area Analysis - Site B', date: '2025-09-10', type: 'PDF', size: '3.8 MB', project: 'Merapi Dam EIA' },
    { id: 4, title: 'Monthly Progress Report - August', date: '2025-08-31', type: 'PDF', size: '1.5 MB', project: 'All Projects' },
    { id: 5, title: 'Soil Sampling Results - Raw Data', date: '2025-08-15', type: 'CSV', size: '450 KB', project: 'Merapi Dam EIA' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 shrink-0 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink uppercase tracking-tight">Reports</h1>
          <p className="text-sm font-mono text-muted uppercase tracking-widest mt-1">Access and download project reports and data exports.</p>
        </div>
        <button className="px-4 py-2 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors flex items-center gap-2">
          <FileBarChart className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="flex-1 bg-paper tech-border tech-shadow flex flex-col overflow-hidden">
        <div className="p-4 border-b border-ink bg-surface flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest tech-border bg-paper hover:bg-surface flex items-center gap-2 text-ink">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="relative">
              <select defaultValue="All Projects" className="appearance-none pl-4 pr-10 py-2 text-xs font-mono font-bold uppercase tracking-widest tech-border bg-paper hover:bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-accent rounded-none">
                <option value="All Projects">All Projects</option>
                <option value="Merapi Dam EIA">Merapi Dam EIA</option>
                <option value="Solo River Basin">Solo River Basin</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-64 px-4 py-2 tech-border bg-paper text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-surface">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink bg-paper text-[10px] font-mono font-bold uppercase tracking-widest text-muted">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-paper transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-surface tech-border flex items-center justify-center text-ink shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-ink text-sm uppercase tracking-wider">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-muted">{report.project}</td>
                  <td className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-muted flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-ink" />
                    {report.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-ink">
                    <span className="px-2 py-1 bg-paper tech-border text-ink text-[10px] font-mono font-bold uppercase tracking-widest">
                      {report.type}
                    </span>
                    <span className="ml-3 text-[10px] font-mono uppercase tracking-widest text-muted">{report.size}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-ink hover:text-surface hover:bg-accent tech-border transition-colors opacity-0 group-hover:opacity-100">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
