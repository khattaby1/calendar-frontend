import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Calendar = () => {
  const location = useLocation();
  const calendarId = location.pathname.split("/")[2];

  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/calender/calender/${calendarId}`,);
        setCalendar(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching calendar. Please try again.');
        setLoading(false);
      } 
    };

    fetchCalendar();
  }, [calendarId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Calendar</h2>
      <div className="row">
        {calendar && Object.entries(calendar).map(([day, availability]) => (
          <div key={day} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{day}</h5>
                <p className="card-text">{availability}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
