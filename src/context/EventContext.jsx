// context/EventContext.jsx
import React, { useState, createContext, useEffect, useMemo } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  function addEvent(newEvent) {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  function updateEvent(updatedEvent) {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }

  function deleteEvent(eventId) {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  }

  function filterEventsByCategory(category) {
    setFilteredCategory(category);
  }

  const contextValue = useMemo(() => {
    const displayedEvents = filteredCategory
      ? events.filter((event) => event.category === filteredCategory)
      : events;

    return {
      events: displayedEvents,
      addEvent,
      updateEvent,
      deleteEvent,
      filterEventsByCategory,
    };
  }, [events, filteredCategory]);

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
}
