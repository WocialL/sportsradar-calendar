import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './router/Navigation';
import { CalendarPage } from './pages/CalendarPage';
import { AddEventPage } from './pages/AddEventPage';
import { EventDetailPage } from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
        <Navigation />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
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