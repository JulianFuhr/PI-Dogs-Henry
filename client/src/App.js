import { Route, useLocation, Routes } from 'react-router-dom';

// import './App.css';
import { Home, LandingPage, Create, Detail } from "./views"
import { NavBar } from './components';


function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/home/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
