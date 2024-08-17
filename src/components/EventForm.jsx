import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import './EventForm.css';

const EventForm = ({ event, closeForm }) => {
  const { addEvent, updateEvent } = useContext(EventContext);
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [start, setStart] = useState(event?.start || '');
  const [end, setEnd] = useState(event?.end || '');
  const [location, setLocation] = useState(event?.location || '');
  const [participants, setParticipants] = useState(event?.participants || '');
  const [category, setCategory] = useState(event?.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: event?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      start,
      end,
      location,
      participants: participants.split(',').map(p => p.trim()),
      category,
    };

    if (event?.id) {
      updateEvent(updatedEvent);
    } else {
      addEvent(updatedEvent);
    }
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{event?.id ? 'Edit Event' : 'Add New Event'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* <div className="form-row">
        <div className="form-group">
          <label htmlFor="start">Start</label>
          <input
            id="start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End</label>
          <input
            id="end"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
      </div> */}
      {/* <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div> */}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      {/* <div className="form-group">
        <label htmlFor="participants">Participants (comma-separated)</label>
        <input
          id="participants"
          type="text"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
      </div> */}
      <div className="form-actions">
        <button type="submit" className="btn-save">
          Save
        </button>
        <button type="button" onClick={closeForm} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;
