import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { SportEvent } from '../types';

export const AddEventPage = () => {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    competition: '',
    date: '',
    time: '',
    homeTeamName: '',
    homeTeamCountry: '',
    awayTeamName: '',
    awayTeamCountry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the new SportEvent object.
    // Generate a unique ID and format the data to match the mock JSON structure.
    const newEvent: SportEvent = {
      id: crypto.randomUUID ? crypto.randomUUID() : `event-${Date.now()}`,
      season: new Date(formData.date).getFullYear() || new Date().getFullYear(),
      status: 'scheduled', // By default, newly added runtime events are scheduled
      timeVenueUTC: formData.time + ':00', 
      dateVenue: formData.date,
      
      // Construct Home Team object
      homeTeam: {
        name: formData.homeTeamName,
        officialName: formData.homeTeamName,
        // Auto-generate a 3-letter abbreviation for the responsive UI if one isn't provided
        abbreviation: formData.homeTeamName.substring(0, 3).toUpperCase(),
        teamCountryCode: formData.homeTeamCountry.toUpperCase(),
      },
      
      // Construct Away Team object
      awayTeam: {
        name: formData.awayTeamName,
        officialName: formData.awayTeamName,
        abbreviation: formData.awayTeamName.substring(0, 3).toUpperCase(),
        teamCountryCode: formData.awayTeamCountry.toUpperCase(),
      },
      originCompetitionName: formData.competition,
    };

    // Dispatch to global state
    addEvent(newEvent);
    
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Navigation: Return to dashboard */}
      <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-800 font-black tracking-wide uppercase text-sm mb-6 transition-colors group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Calendar
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        
        {/* --- Form Header --- */}
        <div className="bg-zinc-950 p-6 md:p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Add New Event</h2>
          <p className="text-zinc-400 mt-2 text-sm font-medium">Create a new sports match and add it to your schedule.</p>
        </div>

        {/* --- Form Body --- */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 bg-zinc-50">
          
          {/* Section 1: Core Match Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-2">Match Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Competition Name</label>
                <input 
                  type="text" name="competition" required value={formData.competition} onChange={handleChange}
                  placeholder="e.g. Champions League" 
                  className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Date</label>
                  <input 
                    type="date" name="date" required value={formData.date} onChange={handleChange}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Time</label>
                  <input 
                    type="time" name="time" required value={formData.time} onChange={handleChange}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Team Configurations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Home Team Inputs */}
            <div className="space-y-4 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-black text-zinc-800 uppercase tracking-widest">Home Team</h3>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Team Name</label>
                <input 
                  type="text" name="homeTeamName" required value={formData.homeTeamName} onChange={handleChange}
                  placeholder="e.g. Real Madrid" 
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Country Code</label>
                <input 
                  type="text" name="homeTeamCountry" required value={formData.homeTeamCountry} onChange={handleChange}
                  placeholder="e.g. ESP" maxLength={3}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                />
              </div>
            </div>

            {/* Away Team Inputs */}
            <div className="space-y-4 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-black text-zinc-800 uppercase tracking-widest">Away Team</h3>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Team Name</label>
                <input 
                  type="text" name="awayTeamName" required value={formData.awayTeamName} onChange={handleChange}
                  placeholder="e.g. Barcelona" 
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Country Code</label>
                <input 
                  type="text" name="awayTeamCountry" required value={formData.awayTeamCountry} onChange={handleChange}
                  placeholder="e.g. ESP" maxLength={3}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-800 font-medium uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-zinc-200 flex justify-end">
            <button 
              type="submit" 
              className="w-full md:w-auto px-8 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest active:scale-95"
            >
              Save Event
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};