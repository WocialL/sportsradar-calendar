import {useState, useMemo} from 'react';
import {useEvents} from '../context/EventContext';
import {generateMonthGrid} from '../utils/dateUtils';
import {Link} from 'react-router-dom';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarPage = () => {
  const {events} = useEvents();

  // Initialize the calendar to January 2024 to align with the provided mock data.
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));

  // Memoize the 42-cell grid generation to prevent expensive date recalculations 
  // on every component re-render.
  const monthGrid = useMemo(() => {
    return generateMonthGrid(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );

  const currentMonthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  /**
   * Desktop/Tablet View Renderer
   * Utilizes CSS Grid with `auto-rows-fr` to ensure all weeks take up equal vertical space,
   * spanning the full available height of the viewport.
   */
  const renderDesktopGrid = () => (
    <div className='bg-white border border-zinc-200 flex flex-col flex-1 rounded-xl shadow-sm overflow-hidden h-full'>
      {/* Weekday headers */}
      <div className='grid grid-cols-7 border-b border-zinc-200 bg-zinc-50'>
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className='py-3 text-center text-xs md:text-sm font-black text-zinc-400 uppercase tracking-widest border-r border-zinc-200 last:border-r-0'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Main calendar cells */}
      <div className='grid grid-cols-7 flex-1 auto-rows-fr bg-zinc-200 gap-px'>
        {monthGrid.map((day, idx) => {
          const dayEvents = events.filter(
            (e) => e.dateVenue === day.dateString,
          );

          return (
            <div
              key={idx}
              className={`bg-white p-1.5 md:p-2 flex flex-col transition-colors ${day.isCurrentMonth ? '' : 'bg-zinc-50/80'}`}
            >
              {/* Day Number Badge */}
              <div className='flex justify-end mb-1.5'>
                <span
                  className={`text-xs md:text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full
                  ${
                    day.dateString === new Date().toISOString().split('T')[0]
                      ? 'bg-red-600 text-white shadow-md' // Highlight current day
                      : day.isCurrentMonth
                        ? 'text-zinc-800'
                        : 'text-zinc-400'
                  }
                `}
                >
                  {day.date.getDate()}
                </span>
              </div>

              {/* Day's Event List */}
              <div className='flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar'>
                {dayEvents.map((event) => {
                  const isPlayed = event.status === 'played';
                  const teamName = event.awayTeam?.name || 'TBA';
                  
                  // Extract abbreviation or fallback to the first 3 letters for responsive layouts
                  const teamAbbr =
                    event.awayTeam?.abbreviation ||
                    teamName.substring(0, 3).toUpperCase();

                  return (
                    <Link
                      key={event.id}
                      to={`/event/${event.id}`}
                      title={`${event.homeTeam?.name || 'TBA'} vs ${teamName}`}
                      className={`flex flex-col xl:flex-row xl:items-center text-[10px] md:text-xs font-semibold bg-white p-1.5 rounded shadow-sm border border-zinc-100 transition-all border-l-4 hover:-translate-y-0.5 hover:shadow-md overflow-hidden
                        ${isPlayed ? 'border-l-emerald-500 text-zinc-600' : 'border-l-zinc-300 text-zinc-600 hover:border-l-red-500'}
                      `}
                    >
                      <span
                        className={`font-black tracking-tight shrink-0 mb-0.5 xl:mb-0 xl:mr-1.5 ${isPlayed ? 'text-emerald-600' : 'text-zinc-900'}`}
                      >
                        {event.timeVenueUTC.slice(0, 5)}
                      </span>
                      
                      {/* Full team name visible only on large desktop screens */}
                      <span className='truncate hidden xl:block'>
                        {teamName}
                      </span>
                      
                      {/* Truncated 3-letter abbreviation for tablet/small screens to prevent UI breakage */}
                      <span className='truncate xl:hidden text-zinc-500 uppercase font-bold tracking-widest'>
                        {teamAbbr}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );


  const renderMobileList = () => {
    // Extract only days from the current month that actually contain events
    const daysWithEvents = monthGrid.filter(
      (day) =>
        day.isCurrentMonth &&
        events.some((e) => e.dateVenue === day.dateString),
    );

    // Empty state handling for the mobile view
    if (daysWithEvents.length === 0) {
      return (
        <div className='text-center py-10 text-slate-500 bg-white rounded-xl border border-slate-200 font-medium'>
          No events scheduled for this month.
        </div>
      );
    }

    return (
      <div className='flex flex-col space-y-4 pb-10'>
        {daysWithEvents.map((day) => {
          const dayEvents = events.filter(
            (e) => e.dateVenue === day.dateString,
          );
          
          return (
            <div
              key={day.dateString}
              className='bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500 border border-slate-200'
            >
              <h4 className='font-bold text-slate-800 mb-3'>
                {day.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </h4>
              <div className='space-y-2'>
                {dayEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}`}
                    className='flex justify-between items-center bg-slate-50 p-3 rounded-lg hover:bg-slate-100 border border-slate-100 transition-colors'
                  >
                    <div className='truncate pr-4'>
                      <p className='font-bold text-slate-800 text-sm truncate'>
                        {event.homeTeam?.name || 'TBA'} vs{' '}
                        {event.awayTeam?.name || 'TBA'}
                      </p>
                      <p className='text-xs text-slate-500 truncate mt-0.5'>
                        {event.originCompetitionName}
                      </p>
                    </div>
                    <span className='text-sm font-bold text-blue-600 shrink-0 bg-blue-100 px-2 py-1 rounded'>
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
    // Main wrapper dynamically calculates height for tablets to prevent scrolling issues
    <div className='flex flex-col w-full min-h-full md:h-[calc(100vh-3rem)] md:min-h-[600px]'>
      
      {/* Month Navigation Header */}
      <div className='flex justify-between items-center mb-6 shrink-0'>
        <h2 className='text-2xl md:text-3xl font-black text-zinc-800 tracking-tight'>
          {currentMonthName}
        </h2>
        <div className='flex space-x-2'>
          <button
            onClick={handlePrevMonth}
            className='px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg font-bold hover:bg-zinc-50 hover:text-red-600 transition-colors shadow-sm'
          >
            &larr; Prev
          </button>
          <button
            onClick={handleNextMonth}
            className='px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg font-bold hover:bg-zinc-50 hover:text-red-600 transition-colors shadow-sm'
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Render logic depends on CSS media queries to toggle visibility */}
      <div className='hidden md:flex flex-col flex-1 min-h-0'>
        {renderDesktopGrid()}
      </div>

      <div className='md:hidden'>{renderMobileList()}</div>
    </div>
  );
};