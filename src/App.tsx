import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import { DopaProvider } from './context/DopaContext';

function App() {
  return (
    <DopaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="activities" element={<Activities />} />
            <Route path="profile" element={<Profile />} />
            <Route path="resources" element={<Resources />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </DopaProvider>
  );
}

export default App;
