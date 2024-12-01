import React from "react";

const Loading = () => (
  <div className="flex justify-center items-center h-screen bg-background">
    <span className="loading loading-ring loading-lg text-secondary"></span>
    <p className="ml-4 text-white">Loading, please wait...</p>
  </div>
);

export default Loading;
