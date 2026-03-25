import { useState, useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { generateMonthGrid } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarPage = () => {
  const { events } = useEvents();
  
  // We initialize the calendar to January 2024 to match the provided mock data.
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));

  // Memoize grid generation to prevent unnecessary recalculations on re-renders
  const firstMonthGrid = useMemo(() => {
    return generateMonthGrid(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const secondMonthGrid = useMemo(() => {
    return generateMonthGrid(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Renders the traditional grid for desktop devices
  const renderDesktopGrid = (monthName: string, grid: ReturnType<typeof generateMonthGrid>) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">{monthName}</h3>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-slate-400 pb-2">
            {day}
          </div>
        ))}
        {grid.map((day, idx) => {
          // Find events occurring on this specific day
          const dayEvents = events.filter(e => e.dateVenue === day.dateString);
          
          return (
            <div 
              key={idx} 
              className={`min-h-25 p-2 border border-slate-100 rounded-lg transition-colors
                ${day.isCurrentMonth ? 'bg-white' : 'bg-slate-50 text-slate-400'}
                ${dayEvents.length > 0 ? 'hover:border-blue-300' : ''}
              `}
            >
              <span className={`text-sm font-medium ${day.isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}`}>
                {day.date.getDate()}
              </span>
              
              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <Link 
                    key={event.id} 
                    to={`/event/${event.id}`}
                    className="block text-xs bg-blue-100 text-blue-700 p-1 rounded truncate hover:bg-blue-200"
                  >
                    {event.timeVenueUTC.slice(0, 5)} - {event.awayTeam?.name || 'TBA'}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Renders a scrollable list of rectangles for mobile devices
  const renderMobileList = () => {
    // Combine both months and extract only days that have events for a cleaner mobile UX
    const allDays = [...firstMonthGrid, ...secondMonthGrid];
    const daysWithEvents = allDays.filter(day => 
      day.isCurrentMonth && events.some(e => e.dateVenue === day.dateString)
    );

    // Filter out duplicate dates, since grids might overlap at the edges
    const uniqueDays = Array.from(new Map(daysWithEvents.map(item => [item.dateString, item])).values());

    return (
      <div className="flex flex-col space-y-4">
        {uniqueDays.map(day => {
          const dayEvents = events.filter(e => e.dateVenue === day.dateString);
          
          return (
            <div key={day.dateString} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-800 mb-3">
                {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h4>
              <div className="space-y-3">
                {dayEvents.map(event => (
                  <Link 
                    key={event.id}
                    to={`/event/${event.id}`} 
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-lg hover:bg-slate-100"
                  >
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {event.homeTeam?.name || 'TBA'} vs {event.awayTeam?.name || 'TBA'}
                      </p>
                      <p className="text-xs text-slate-500">{event.originCompetitionName}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {event.timeVenueUTC.slice(0, 5)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
          Prev Month
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          Event Calendar
        </h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
          Next Month
        </button>
      </div>

      {/* DESKTOP VIEW: 2-Month Grid */}
      <div className="hidden md:grid grid-cols-1 xl:grid-cols-2 gap-6">
        {renderDesktopGrid(currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), firstMonthGrid)}
        
        {/* Calculate name of the next month */}
        {renderDesktopGrid(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), 
          secondMonthGrid
        )}
      </div>

      {/* MOBILE VIEW: Scrolling Rectangles */}
      <div className="md:hidden">
        {renderMobileList()}
      </div>
    </div>
  );
};