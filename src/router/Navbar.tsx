import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Sportradar Calendar</Link>
        </h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300 transition-colors">
            Calendar
          </Link>
          <Link to="/add-event" className="hover:text-blue-300 transition-colors">
            Add Event
          </Link>
        </div>
      </div>
    </nav>
  );
};