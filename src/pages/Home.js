import React from 'react'
import CalendarForm from '../components/CalendarForm';

const Home = () => {
    const [calendar, setCalendar] = React.useState(null);

    const handleCalendarUpdate = (newCalendar) => {
      setCalendar(newCalendar);
    };
  
    return (
      <div className="container mt-5">
        <h1 className="mb-4">A2: Calendar Co-pilot</h1>
        <CalendarForm onCalendarUpdate={handleCalendarUpdate} />
      </div>
    );
}

export default Home