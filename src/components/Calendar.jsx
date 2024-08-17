// MyCalendar.jsx
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventContext } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground';
import LoadingSpinner from './LoadingSpinner';
import './Calendar.css';
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onAddEvent }) => {
  const { events, filterEventsByCategory } = useContext(EventContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectSlot = useCallback((slotInfo) => {
    onAddEvent(slotInfo);
  }, [onAddEvent]);

  const handleSelectEvent = useCallback((event) => {
    navigate(`/event/${event.id}`);
  }, [navigate]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterEventsByCategory(category);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="calendar-container">
      <ParticlesBackground />
      <div className="calendar-content">
        <div className="filter-container">
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
        />
      </div>
    </div>
  );
};

MyCalendar.propTypes = {
  onAddEvent: PropTypes.func.isRequired,
};

export default MyCalendar;
