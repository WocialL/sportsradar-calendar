import { describe, it, expect } from 'vitest';
import { generateMonthGrid } from './dateUtils';

describe('generateMonthGrid', () => {
  it('should always generate exactly 42 days (6 weeks) for calendar grid', () => {
    const gridJan = generateMonthGrid(2024, 0); 
    expect(gridJan.length).toBe(42);

    const gridFeb = generateMonthGrid(2024, 1);
    expect(gridFeb.length).toBe(42);
  });

  it('should correctly identify current month days vs padding days', () => {
    const gridFeb = generateMonthGrid(2024, 1);
    
    const currentMonthDays = gridFeb.filter(day => day.isCurrentMonth);
    
    expect(currentMonthDays.length).toBe(29);
  });

  it('should format dateString correctly as YYYY-MM-DD', () => {
    const gridJan = generateMonthGrid(2024, 0);
    
    const midMonthDay = gridJan.find(day => day.date.getDate() === 15 && day.isCurrentMonth);
    
    expect(midMonthDay).toBeDefined();
    expect(midMonthDay?.dateString).toBe('2024-01-15');
  });
});