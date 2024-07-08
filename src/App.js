import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calender'; // Corrected the import
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="calendar/:id" element={<Calendar />} /> {/* Corrected path to "calendar/:id" */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
