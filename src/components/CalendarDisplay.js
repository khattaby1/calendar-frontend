import React from 'react';

function CalendarDisplay({ calendar }) {
  return (
    <div className="mt-5">
      <h2>Proposed Calendar</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(calendar).map(([day, timeSlot]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{timeSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success mt-3">Confirm and Save</button>
    </div>
  );
}

export default CalendarDisplay;
