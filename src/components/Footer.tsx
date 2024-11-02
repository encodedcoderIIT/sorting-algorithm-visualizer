import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; {new Date().getFullYear()} Sorting Algorithm Visualizer</p>
        </div>
        <nav className="flex gap-4">
          <a
            href="https://github.com/encodedcoderIIT/sorting-algorithm-visualizer"
            className="hover:underline"
          >
            Source Code
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
