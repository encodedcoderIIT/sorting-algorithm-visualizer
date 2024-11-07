import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Menu, X } from "lucide-react";
import SortingVisualizer from "./components/SortingVisualizer";
import Home from "./components/Home";
import Team from "./components/Team";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <TooltipProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="bg-gray-800 text-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                to="/"
                className="hover:scale-105 transition-transform duration-200"
                onClick={closeMenu}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  VizSoft_RGS-SAV
                </h1>
                <p>Sorting Algorithm Visualizer by RGS</p>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-6">
                <Link
                  to="/"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/team"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Team
                </Link>
                <Link
                  to="/about"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  About
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div
              className={`${
                isMenuOpen ? "max-h-48" : "max-h-0"
              } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <nav className="flex flex-col px-4 py-2">
                <Link
                  to="/"
                  className="py-2 hover:text-gray-300 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  to="/team"
                  className="py-2 hover:text-gray-300 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Team
                </Link>
                <Link
                  to="/about"
                  className="py-2 hover:text-gray-300 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<SortingVisualizer />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </TooltipProvider>
  );
}

export default App;
