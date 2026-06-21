import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Preview from './pages/Preview';

/**
 * Main Router Controller
 * Maps request paths to specific pages.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}
