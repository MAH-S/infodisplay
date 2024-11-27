import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EventsCard from "./components/EventsCard";
import EditEvent from "./components/EditEvent";
import ManageEvents from "./components/ManageEvents"; // Import your manage events component

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit-events" element={<EditEvent />} /> {/* Add this route for editing events */}
        <Route path="/events" element={<EventsCard />} /> {/* Add this route for events page */}
        <Route path="/manage-events" element={<ManageEvents />} /> {/* Add this route for managing events */}
      </Routes>
    </div>
  );
}

export default App;
