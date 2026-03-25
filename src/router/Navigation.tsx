import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* desktop version */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 p-6 shadow-xl z-50">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">Sportradar</h1>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className={`p-3 rounded-lg transition-colors font-medium ${isActive('/') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            Calendar
          </Link>
          <Link 
            to="/add-event" 
            className={`p-3 rounded-lg transition-colors font-medium ${isActive('/add-event') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            Add Event
          </Link>
        </div>
      </nav>

      {/* mobile version */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white flex justify-around items-center p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] z-50 env(safe-area-inset-bottom)">
        <Link 
          to="/" 
          className={`flex flex-col items-center p-2 rounded-lg ${isActive('/') ? 'text-blue-400' : 'text-slate-400'}`}
        >
          <span className="text-sm font-medium">Calendar</span>
        </Link>
        <Link 
          to="/add-event" 
          className={`flex flex-col items-center p-2 rounded-lg ${isActive('/add-event') ? 'text-blue-400' : 'text-slate-400'}`}
        >
          <span className="text-sm font-medium">Add Event</span>
        </Link>
      </nav>
    </>
  );
};