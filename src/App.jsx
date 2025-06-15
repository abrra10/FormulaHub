import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import MaintenancePage from "./components/MaintenancePage";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Standings = lazy(() => import("./pages/Standings"));
const Drivers = lazy(() => import("./pages/Drivers"));

export default function App() {
  return <MaintenancePage />;
}
