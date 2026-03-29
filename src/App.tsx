/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy-loaded page components for route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const ProjectWorkspace = lazy(() => import('./pages/ProjectWorkspace').then(m => ({ default: m.ProjectWorkspace })));
const TaskDetail = lazy(() => import('./pages/TaskDetail').then(m => ({ default: m.TaskDetail })));
const GISModule = lazy(() => import('./pages/GISModule').then(m => ({ default: m.GISModule })));
const GlobalCalculator = lazy(() => import('./pages/GlobalCalculator').then(m => ({ default: m.GlobalCalculator })));
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="project/:id" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <ProjectWorkspace />
              </Suspense>
            } />
            <Route path="task/:id" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <TaskDetail />
              </Suspense>
            } />
            <Route path="gis" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <GISModule />
              </Suspense>
            } />
            <Route path="calculator" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <GlobalCalculator />
              </Suspense>
            } />
            <Route path="reports" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <Reports />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <Settings />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
                <NotFound />
              </Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
