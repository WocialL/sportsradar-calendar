export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  dateString: string; // Formatted as YYYY-MM-DD for O(1) event lookup
}


 // Generates a 42-cell grid (6 weeks) for a given month, so it's standard calendar view.

export const generateMonthGrid = (year: number, month: number): CalendarDay[] => {
 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const firstDayIndex = new Date(year, month, 1).getDay();
  
  // Adjust to make Monday the first day of the week
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const days: CalendarDay[] = [];

  // 1. Pad with previous month's trailing days
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthDays - i);
    days.push(formatDayObject(d, false));
  }

  // 2. Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push(formatDayObject(d, true));
  }

  // 3. Pad with next month's leading days to fill the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const d = new Date(year, month + 1, i);
    days.push(formatDayObject(d, false));
  }

  return days;
};

// Helper to ensure local timezone doesn't shift the YYYY-MM-DD string
const formatDayObject = (date: Date, isCurrentMonth: boolean): CalendarDay => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    date,
    isCurrentMonth,
    dateString: `${year}-${month}-${day}`
  };
};