import React from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar';

function App() {
  return (
    // BEM Naming convention
    <div className="app">
        <div className="app__body">

          <Sidebar />
          {/* Chat */}
        </div>

    </div>
  );
}

export default App;