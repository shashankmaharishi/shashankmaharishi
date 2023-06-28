import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
