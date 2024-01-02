import React from 'react';
import { BrowserRouter as Router, Routes, Link,Route} from 'react-router-dom';
import Home from './Home';
import FlashCards from './FlashCards';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <h1>My React Portfolio</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cards">Flash Cards</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/cards" element={<FlashCards />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
