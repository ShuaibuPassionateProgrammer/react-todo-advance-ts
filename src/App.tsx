import React from "react";
import ToDo from "./components/ToDo";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <ToDo />
    </div>
  );
};

export default App;