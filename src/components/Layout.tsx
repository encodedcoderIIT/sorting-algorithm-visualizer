import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto px-4 py-6">{children}</div>;
};

export default Layout;
