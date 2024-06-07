import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './components/login';
import Register from './components/register';
import Buy from "./components/buy"
import Profile from './components/profile';
import Ticket from './components/ticket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
