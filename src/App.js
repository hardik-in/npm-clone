import "./App.css";
import LandingPage from "./Components/LandingPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PackageDetails from "./Components/PackageDetails";
import PackageVersion from "./Components/PackageVersion";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/package/:packageName" element={<PackageDetails />} />
        <Route path="/package/:packageName/version/:version" element={<PackageVersion />} />
        <Route path="/NotFound" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
