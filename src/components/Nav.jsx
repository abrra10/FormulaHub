import { FiArrowRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-primary font-anton bg-background">
      {location.pathname === "/" ? (
        <button
          onClick={() => {
            document.getElementById("launch-schedule")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-secondary"
        >
          Next Race <FiArrowRight />
        </button>
      ) : (
        <div className="flex items-center gap-1 text-xs text-transparent">
          Next Race <FiArrowRight />
        </div>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 pl-4">
        <Link
          to="/"
          className="relative text-xs text-zinc-400 hover:text-white after:content-[''] after:block after:w-0 after:h-1 after:bg-secondary after:mt-2 after:mx-auto hover:after:w-6 after:transition-width after:duration-300"
        >
          Home
        </Link>
        <Link
          to="/standings"
          className="relative text-xs text-zinc-400 hover:text-white after:content-[''] after:block after:w-0 after:h-1 after:bg-secondary after:mt-2 after:mx-auto hover:after:w-6 after:transition-width after:duration-300"
        >
          Standings
        </Link>
        <Link
          to="/drivers"
          className="relative text-xs text-zinc-400 hover:text-white after:content-[''] after:block after:w-0 after:h-1 after:bg-secondary after:mt-2 after:mx-auto hover:after:w-6 after:transition-width after:duration-300"
        >
          Drivers
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
