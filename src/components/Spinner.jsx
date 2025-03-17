import React from "react";

const Spinner = () => {
  return (
    <div
      className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
