import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import moment from 'moment';
import './EventDetails.css'; // Import the CSS file

const EventDetails = () => {
  const { id } = useParams();
  const { events, updateEvent, deleteEvent } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Events:', events);
    console.log('Searching for ID:', id);

    if (!id) {
      console.error('No id provided');
      return;
    }
    
    const foundEvent = events.find(event => event.id === id);
    if (!foundEvent) {
      console.error(`Event with id ${id} not found`);
    }
    setEvent(foundEvent);
  }, [id, events]);

  const handleUpdateEvent = () => {
    if (!event) return;

    const updatedTitle = prompt('Update event title:', event.title);
    const updatedCategory = prompt('Update event category:', event.category);
    if (updatedTitle && updatedCategory) {
      updateEvent({
        ...event,
        title: updatedTitle,
        category: updatedCategory
      });
      navigate('/');
    }
  };

  const handleDeleteEvent = () => {
    if (!event) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      deleteEvent(event.id);
      navigate('/');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="overlay">
      <div className="dialog">
        <div className="dialog-header">{event.title}</div>
        <div className="dialog-content">
          <p><strong>Start:</strong> {moment(event.start).format('LLL')}</p>
          <p><strong>End:</strong> {moment(event.end).format('LLL')}</p>
          <p><strong>Category:</strong> {event.category}</p>
        </div>
        <div className="dialog-actions">
          <button className="edit-btn" onClick={handleUpdateEvent}>Edit</button>
          <button className="delete-btn" onClick={handleDeleteEvent}>Delete</button>
          <button className="close-btn" onClick={() => navigate('/')}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
