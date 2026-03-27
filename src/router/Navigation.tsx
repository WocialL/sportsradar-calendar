import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden md:flex flex-col w-64 bg-zinc-950 text-white min-h-screen fixed left-0 top-0 p-6 shadow-2xl z-50 border-r border-zinc-800">
        <h1 className="text-3xl font-black mb-10 tracking-tighter">
          sport<span className="text-red-600">radar</span>
        </h1>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className={`p-3 rounded-lg transition-all font-bold tracking-wide ${isActive('/') ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
          >
            Calendar
          </Link>
          <Link 
            to="/add-event" 
            className={`p-3 rounded-lg transition-all font-bold tracking-wide ${isActive('/add-event') ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
          >
            Add Event
          </Link>
        </div>
      </nav>

      {/* MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 text-white flex justify-around items-center p-3 shadow-[0_-4px_15px_rgba(0,0,0,0.5)] z-50 env(safe-area-inset-bottom) border-t border-zinc-800">
        <Link to="/" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/') ? 'text-red-500' : 'text-zinc-500'}`}>
          <span className="text-xs font-bold uppercase tracking-wider">Calendar</span>
        </Link>
        <Link to="/add-event" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/add-event') ? 'text-red-500' : 'text-zinc-500'}`}>
          <span className="text-xs font-bold uppercase tracking-wider">Add Event</span>
        </Link>
      </nav>
    </>
  );
};