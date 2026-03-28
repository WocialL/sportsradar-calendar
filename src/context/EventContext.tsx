import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SportEvent } from '../types';
import mockData from '../data/sportData.json';

/**
 * EventContext & EventProvider
 * * Manages the global state for sports events throughout the application.
 * * Architectural decisions:
 * 1. Data Initialization & Persistent Storage: Attempts to load data from LocalStorage first. 
 * If empty, loads the provided mock JSON data. This fulfills the "Persistent Storage" bonus requirement.
 * 2. Data Hydration: Injects a unique 'id' (via crypto.randomUUID) into each event 
 * from the mock data. This is crucial because the original JSON lacks unique 
 * identifiers, which are required for React list keys and dynamic URL routing.
 * 3. Runtime State Management: Exposes the `addEvent` method to fulfill the requirement 
 * of adding new events during runtime. State changes are automatically synced to LocalStorage.
 */

interface EventContextType {
  events: SportEvent[];
  addEvent: (newEvent: SportEvent) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<SportEvent[]>(() => {
    const savedEvents = localStorage.getItem('sportradar_events');
    
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return mockData.data.map((item, index) => ({
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : `event-${index}`,
    })) as unknown as SportEvent[]; 
  });

  useEffect(() => {
    localStorage.setItem('sportradar_events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent: SportEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};