import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import SortingVisualizer from "./components/SortingVisualizer";
import Home from "./components/Home";
import Team from "./components/Team";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <TooltipProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <Link to="/">
                <h1 className="text-3xl font-bold text-gray-900">
                  Sorting Algorithm Visualizer
                </h1>
              </Link>
              <nav className="flex gap-4">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <Link to="/team" className="hover:underline">
                  Team
                </Link>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<SortingVisualizer />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/visualizer" element={</>} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TooltipProvider>
  );
}

export default App;
