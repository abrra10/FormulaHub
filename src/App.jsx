import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Standings = lazy(() => import("./pages/Standings"));
const Drivers = lazy(() => import("./pages/Drivers"));

export default function App() {
  return (
    <div className="bg-background">
      <Router>
        <Nav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/drivers" element={<Drivers />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}
