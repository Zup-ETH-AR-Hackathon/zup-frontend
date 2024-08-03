import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import SecondPage from './SecondPage';
import CheckComponent from './CheckComponent';

import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
        <CheckComponent />
      </div>
    </Router>
  );
}

export default App;
