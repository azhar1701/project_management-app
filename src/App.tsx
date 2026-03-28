/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectWorkspace } from './pages/ProjectWorkspace';
import { TaskDetail } from './pages/TaskDetail';
import { GISModule } from './pages/GISModule';
import { GlobalCalculator } from './pages/GlobalCalculator';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="project/:id" element={<ProjectWorkspace />} />
          <Route path="task/:id" element={<TaskDetail />} />
          <Route path="gis" element={<GISModule />} />
          <Route path="calculator" element={<GlobalCalculator />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
