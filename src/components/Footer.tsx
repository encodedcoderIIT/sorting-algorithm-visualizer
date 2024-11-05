import React from "react";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div>
          <p className="text-sm sm:text-base text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} VizSoft
          </p>
        </div>
        <nav>
          <a
            href="https://github.com/encodedcoderIIT/sorting-algorithm-visualizer"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
          >
            <Github size={20} />
            <span className="text-sm sm:text-base">Source Code</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
