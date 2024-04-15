
import './App.css';
import DatabaseTestReadButton from "./DatabaseTestReadButton";
import TestBarChart from "./TestBarChart";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <TestBarChart></TestBarChart>
          <DatabaseTestReadButton></DatabaseTestReadButton>
      </header>
    </div>
  );
}

export default App;
