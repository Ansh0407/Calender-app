// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyCalendar from './components/Calendar';
import EventDetails from './components/EventDetails';
import EventForm from './components/EventForm'; 
import { EventProvider } from './context/EventContext';
import ParticlesBackground from './components/ParticlesBackground';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const handleAddEvent = (slotInfo) => {
    setCurrentEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.action === 'doubleClick',
    });
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentEvent(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <EventProvider>
      <Router>
        <ParticlesBackground />
        {showForm && (
          <EventForm
            event={currentEvent}
            closeForm={handleCloseForm}
          />
        )}
        <Routes>
          <Route path="/" element={<MyCalendar onAddEvent={handleAddEvent} onEditEvent={handleEditEvent} />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
