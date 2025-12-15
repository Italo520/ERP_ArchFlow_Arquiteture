import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import FinancialDashboard from './pages/FinancialDashboard';
import Clients from './pages/Clients';
import Documents from './pages/Documents';
import Kanban from './pages/Kanban';
import ProjectDetails from './pages/ProjectDetails';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Layout><FinancialDashboard /></Layout>} />
        <Route path="/clients" element={<Layout><Clients /></Layout>} />
        <Route path="/documents" element={<Layout><Documents /></Layout>} />
        <Route path="/projects" element={<Layout><Kanban /></Layout>} />
        <Route path="/projects/details" element={<Layout><ProjectDetails /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
