import { Route, Routes } from 'react-router-dom';

// import './App.css';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route exact path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />

      </Routes>
    </div>
  );
}

export default App;
