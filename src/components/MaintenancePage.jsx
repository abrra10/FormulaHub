import React from "react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary text-background font-anton">
      <div className="bg-primary p-8 rounded-lg shadow-lg flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20 mb-6 text-secondary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.007v-.008H12v.008zm9-3.75a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold mb-4 text-secondary">
          We'll be back soon!
        </h1>
        <p className="text-lg mb-2 text-background text-center">
          FormulaHub is currently undergoing maintenance due to API downtime.
        </p>
        <p className="text-md text-background text-center">
          We're working hard to get things up and running again. Thank you for
          your patience!
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
