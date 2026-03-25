import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './router/Navbar';
import { CalendarPage } from './pages/CalendarPage';
import { AddEventPage } from './pages/AddEventPage';
import { EventDetailPage } from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/add-event" element={<AddEventPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;