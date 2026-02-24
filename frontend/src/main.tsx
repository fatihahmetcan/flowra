import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import ProjectsPage from "./pages/ProjectsPage";
import PlanningPage from "./pages/PlanningPage";
import TimeTrackingPage from "./pages/TimeTrackingPage";
import OffersPage from "./pages/OffersPage";
import InvoicesPage from "./pages/InvoicesPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="time-tracking" element={<TimeTrackingPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);