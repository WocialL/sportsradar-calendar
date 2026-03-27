import {useParams, Link} from 'react-router-dom';
import {useEvents} from '../context/EventContext';

export const EventDetailPage = () => {
  const {id} = useParams<{id: string}>();
  const {events} = useEvents();

  // Locate the specific event in context
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
        <h2 className='text-2xl font-black text-zinc-800 mb-4 uppercase tracking-tight'>
          Event not found
        </h2>
        <p className='text-zinc-500 mb-6 font-medium'>
          The sports event you are looking for does not exist.
        </p>
        <Link
          to='/'
          className='px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 uppercase tracking-wider text-sm'
        >
          Return to Calendar
        </Link>
      </div>
    );
  }

  // Sidebar data preparation:
  // Exclude the currently viewed event and limit the recommendations to 5 items
  const otherMatches = events.filter((e) => e.id !== id).slice(0, 5);

  return (
    <div className='max-w-7xl mx-auto w-full'>
      {/* Navigation: Back to the main calendar view */}
      <Link
        to='/'
        className='inline-flex items-center text-zinc-500 hover:text-red-600 font-black tracking-wide uppercase text-sm mb-6 transition-colors group'
      >
        <span className='mr-2 group-hover:-translate-x-1 transition-transform'>
          &larr;
        </span>{' '}
        Back to Calendar
      </Link>

      {/* Main Layout: 2-column grid on extra-large screens (Main Content + Sidebar) */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8'>
        
        {/* --- LEFT COLUMN: Main Event Details --- */}
        <div className='xl:col-span-2 space-y-6 md:space-y-8'>
          
          {/* Scoreboard / Hero Card */}
          <div className='bg-zinc-950 rounded-2xl shadow-xl border border-zinc-800 relative overflow-hidden p-6 md:p-12'>
            {/* Decorative top border accent */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900'></div>

            <div className='uppercase tracking-widest text-xs font-black text-red-500 mb-8 text-center'>
              {event.originCompetitionName}
            </div>

            {/* Teams and Score Wrapper */}
            <div className='flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4'>
              
              {/* Home Team */}
              <div className='flex-1 text-center sm:text-right w-full sm:w-auto'>
                <h2 className='text-3xl sm:text-4xl xl:text-5xl font-black text-white mb-1 leading-tight tracking-tighter break-words'>
                  {event.homeTeam?.name || 'TBA'}
                </h2>
                <p className='text-zinc-500 text-xs sm:text-sm uppercase font-bold tracking-widest'>
                  {event.homeTeam?.teamCountryCode || 'N/A'}
                </p>
              </div>

              {/* Dynamic Score / Match Status Display */}
              <div className='flex flex-col items-center px-2 shrink-0'>
                {/* Conditionally render the final score if the match is completed, otherwise show a "VS" placeholder */}
                {event.status === 'played' && (event as any).result ? (
                  <div className='text-4xl sm:text-6xl font-black text-emerald-400 bg-zinc-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-zinc-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] tracking-tighter whitespace-nowrap'>
                    {(event as any).result.homeGoals} -{' '}
                    {(event as any).result.awayGoals}
                  </div>
                ) : (
                  <span className='text-3xl sm:text-4xl font-black text-zinc-700 mb-2'>
                    VS
                  </span>
                )}
                <span
                  className={`mt-4 px-4 py-1.5 rounded-sm text-[10px] sm:text-xs font-black uppercase tracking-widest
                  ${event.status === 'played' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                >
                  {event.status}
                </span>
              </div>

              {/* Away Team */}
              <div className='flex-1 text-center sm:text-left w-full sm:w-auto'>
                <h2 className='text-3xl sm:text-4xl xl:text-5xl font-black text-white mb-1 leading-tight tracking-tighter break-words'>
                  {event.awayTeam?.name || 'TBA'}
                </h2>
                <p className='text-zinc-500 text-xs sm:text-sm uppercase font-bold tracking-widest'>
                  {event.awayTeam?.teamCountryCode || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Match Technical Information Card */}
          <div className='bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8'>
            <h3 className='text-lg font-black text-zinc-800 mb-6 border-b border-zinc-100 pb-4 uppercase tracking-tight'>
              Match Information
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
              <div className='bg-zinc-50 p-4 rounded-xl border border-zinc-100'>
                <p className='text-[10px] md:text-xs text-zinc-400 uppercase font-black tracking-widest mb-1'>
                  Date
                </p>
                <p className='text-sm md:text-base font-bold text-zinc-800'>
                  {event.dateVenue}
                </p>
              </div>
              <div className='bg-zinc-50 p-4 rounded-xl border border-zinc-100'>
                <p className='text-[10px] md:text-xs text-zinc-400 uppercase font-black tracking-widest mb-1'>
                  Time (UTC)
                </p>
                <p className='text-sm md:text-base font-bold text-zinc-800'>
                  {event.timeVenueUTC}
                </p>
              </div>
              <div className='bg-zinc-50 p-4 rounded-xl border border-zinc-100'>
                <p className='text-[10px] md:text-xs text-zinc-400 uppercase font-black tracking-widest mb-1'>
                  Season
                </p>
                <p className='text-sm md:text-base font-bold text-zinc-800'>
                  {event.season}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Other Matches*/}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sticky top-6'>
            <h3 className='text-lg font-black text-zinc-800 mb-4 uppercase tracking-tight border-b border-zinc-100 pb-4'>
              Other Matches
            </h3>

            <div className='space-y-3'>
              {otherMatches.map((match) => {
                const isPlayed = match.status === 'played';
                return (
                  <Link
                    key={match.id}
                    to={`/event/${match.id}`}
                    className='block bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 hover:border-red-300 hover:shadow-md transition-all group'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-wider'>
                        {match.dateVenue}
                      </span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest ${isPlayed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                      >
                        {match.status}
                      </span>
                    </div>

                    <div className='space-y-1'>
                      <div className='flex justify-between items-center font-bold text-sm text-zinc-800'>
                        <span className='truncate pr-2 group-hover:text-red-600 transition-colors'>
                          {match.homeTeam?.name || 'TBA'}
                        </span>
                        {/* Display score if available, otherwise fallback to dash */}
                        {isPlayed && (match as any).result ? (
                          <span className='shrink-0 text-emerald-600 font-black'>{`${(match as any).result.homeGoals}`}</span>
                        ) : (
                          <span className='shrink-0 text-zinc-300'>-</span>
                        )}
                      </div>
                      <div className='flex justify-between items-center font-bold text-sm text-zinc-800'>
                        <span className='truncate pr-2 group-hover:text-red-600 transition-colors'>
                          {match.awayTeam?.name || 'TBA'}
                        </span>
                        {isPlayed && (match as any).result ? (
                          <span className='shrink-0 text-emerald-600 font-black'>{`${(match as any).result.awayGoals}`}</span>
                        ) : (
                          <span className='shrink-0 text-zinc-300'>-</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty state handling for the sidebar */}
            {otherMatches.length === 0 && (
              <p className='text-sm font-medium text-zinc-400 text-center py-4'>
                No other matches available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};