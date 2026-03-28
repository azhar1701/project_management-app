import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Camera, Send, FileText, Paperclip, CheckCircle2, XCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function TaskDetail() {
  const { id } = useParams();
  const [isComplete, setIsComplete] = useState(false);
  const [photos, setPhotos] = useState<string[]>([
    "https://picsum.photos/seed/soil1/200/200",
    "https://picsum.photos/seed/soil2/200/200"
  ]);
  const [showMap, setShowMap] = useState(false);
  const [gpsCoords, setGpsCoords] = useState("-7.542, 110.442");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotos([...photos, url]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-paper min-h-[calc(100vh-8rem)] tech-border tech-shadow flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-ink flex items-center gap-3 sticky top-0 bg-surface z-10 shrink-0">
        <Link to="/project/1" className="p-2 -ml-2 text-ink hover:bg-paper tech-border transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-ink text-surface text-[10px] font-mono font-bold uppercase tracking-widest">Field</span>
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Merapi Dam EIA</span>
            {isComplete && (
              <span className="px-2 py-0.5 bg-accent text-surface text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-ink uppercase tracking-tight">Field Survey - Soil Sampling Site A</h1>
        </div>
        <button 
          onClick={() => setIsComplete(!isComplete)}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors tech-border tech-shadow ${
            isComplete 
              ? 'bg-paper text-ink hover:bg-surface' 
              : 'bg-accent text-surface hover:bg-accent-hover'
          }`}
        >
          {isComplete ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-surface">
        {/* Task Info */}
        <div className="p-6 border-b border-ink bg-paper">
          <div className="flex flex-wrap gap-6 text-sm mb-4">
            <div className="flex items-center gap-2 text-ink">
              <Clock className="w-4 h-4 text-muted" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">Due: <strong className="text-ink">Today, 5:00 PM</strong></span>
            </div>
            <div className="flex items-center gap-2 text-ink">
              <div className="w-6 h-6 bg-surface tech-border flex items-center justify-center text-[10px] font-mono font-bold">MK</div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">Assignee: <strong className="text-ink">M. Kamal</strong></span>
            </div>
          </div>
          <p className="text-sm text-ink font-medium leading-relaxed">
            Collect soil samples at designated coordinates for permeability testing. Ensure photos are taken before and after extraction.
          </p>
        </div>

        {/* Field Data Input */}
        <div className="p-6 border-b border-ink">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 flex items-center gap-2 pb-2 border-b border-ink/10">
            <FileText className="w-4 h-4 text-accent" /> Field Data Log
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">GPS Coordinates</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Lat, Long" 
                  value={gpsCoords}
                  onChange={(e) => setGpsCoords(e.target.value)}
                  className="flex-1 px-3 py-2 bg-paper border border-ink text-sm font-mono focus:ring-1 focus:ring-accent focus:outline-none" 
                />
                <button 
                  onClick={() => setShowMap(!showMap)}
                  className="px-4 py-2 bg-surface text-ink tech-border hover:bg-paper flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest"
                >
                  <MapPin className="w-4 h-4" /> {showMap ? 'Hide' : 'Map'}
                </button>
              </div>
              {showMap && (
                <div className="mt-2 h-48 bg-paper tech-border overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(gpsCoords.split(',')[1]) - 0.01}%2C${parseFloat(gpsCoords.split(',')[0]) - 0.01}%2C${parseFloat(gpsCoords.split(',')[1]) + 0.01}%2C${parseFloat(gpsCoords.split(',')[0]) + 0.01}&layer=mapnik&marker=${gpsCoords.split(',')[0]}%2C${gpsCoords.split(',')[1]}`}
                  ></iframe>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Soil Type Observation</label>
              <select defaultValue="Clayey Silt" className="w-full px-3 py-2 bg-paper border border-ink text-sm font-mono focus:ring-1 focus:ring-accent focus:outline-none appearance-none rounded-none">
                <option value="Select type...">Select type...</option>
                <option value="Clayey Silt">Clayey Silt</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Gravelly Sand">Gravelly Sand</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-widest text-muted mb-2">Site Photos</label>
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, idx) => (
                  <div key={idx} className="aspect-square bg-paper tech-border flex items-center justify-center overflow-hidden relative group cursor-pointer tech-shadow">
                    <img src={photo} alt="Site" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <label className="aspect-square bg-surface border-2 border-dashed border-ink flex flex-col items-center justify-center text-muted hover:bg-paper hover:text-accent hover:border-accent transition-colors cursor-pointer tech-shadow">
                  <Camera className="w-6 h-6 mb-2" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Add Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
            </div>

            <button className="w-full py-3 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors mt-4">
              Save Field Log
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-6">Team Discussion</h2>
          
          <div className="space-y-6 mb-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-surface tech-border flex items-center justify-center text-xs font-mono font-bold text-ink shrink-0">JD</div>
              <div className="bg-paper tech-border p-4 text-sm text-ink tech-shadow">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">J. Doe • 2 hours ago</p>
                Make sure to check the moisture content immediately after extraction.
              </div>
            </div>
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 bg-accent tech-border flex items-center justify-center text-xs font-mono font-bold text-surface shrink-0">MK</div>
              <div className="bg-surface tech-border p-4 text-sm text-ink tech-shadow">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2 text-right">M. Kamal • Just now</p>
                Noted. The ground is quite saturated due to last night's rain.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="p-4 border-t border-ink bg-paper shrink-0">
        <div className="flex items-end gap-3">
          <button className="p-3 text-ink hover:bg-surface tech-border transition-colors shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea 
            placeholder="Add a comment..." 
            className="flex-1 max-h-32 min-h-[46px] px-4 py-3 bg-surface border border-ink text-sm font-mono focus:ring-1 focus:ring-accent focus:outline-none resize-none"
            rows={1}
          ></textarea>
          <button className="p-3 bg-accent text-surface hover:bg-accent-hover tech-border transition-colors shrink-0">
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
