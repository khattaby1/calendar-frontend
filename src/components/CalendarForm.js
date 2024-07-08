import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CalendarForm({ onCalendarUpdate }) {
  const [description, setDescription] = useState('');
  const [days, setDays] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:4000/api/ai/generate', {
        prompt: `Describe your availability:\n\n${description}\n\n Format: Day of week: Start time - End time return a json file`,
      });

      const generatedCalendar = response.data.response;
      console.log(generatedCalendar);

      // Extract keys and values using regex
      const regex = /"([^"]+)": "([^"]+)"/g;
      let match;
      const availability = {};

      // Iterate over matches
      while ((match = regex.exec(generatedCalendar)) !== null) {
        const day = match[1];
        const timeSlot = match[2];
        availability[day] = timeSlot;
      }

      setDays(availability);
      setError('');
    } catch (error) {
      console.error('Error generating calendar:', error);
      setError('Error generating calendar. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const confButton = async () => {
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:4000/api/calender/saveCalendar', {
        "Saturday": days.Saturday,
        "Sunday": days.Sunday,
        "Monday": days.Monday,
        "Tuesday": days.Tuesday,
        "Wednesday": days.Wednesday,
        "Thursday": days.Thursday,
        "Friday": days.Friday
      });
      console.log(response.data._id);
      const calendarId = response?.data?._id;
      navigate(`/calendar/${calendarId}`);
    } catch (error) {
      console.error('Error saving calendar:', error);
      setError('Error saving calendar. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Describe your availability:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Example: “I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise, ..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Generate Calendar</button>
      </form>

      {loading && (
        <div className="mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {days && !loading && (
        <div className="mt-4">
          <h4>Generated Calendar:</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(days).map(([day, availability]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={confButton} className="btn btn-primary">Confirm Calendar</button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default CalendarForm;
