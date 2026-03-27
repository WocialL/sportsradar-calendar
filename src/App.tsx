import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './router/Navigation';
import { CalendarPage } from './pages/CalendarPage';
import { AddEventPage } from './pages/AddEventPage';
import { EventDetailPage } from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-zinc-50 text-zinc-900 font-sans">
        <Navigation />
        
        <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col p-4 md:p-6 w-full max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/event/:id" element={<EventDetailPage />} /> 
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;