import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    const apiUrl = "https://ergast.com/api/f1/current/driverStandings.json";

    try {
      const response = await axios.get(apiUrl);
      const standingsData =
        response.data.MRData.StandingsTable.StandingsLists[0]
          ?.DriverStandings || [];

      setStandings(standingsData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch standings. Please try again later.");
      setLoading(false);
    }
  };

  const rowVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, ease: "easeInOut", duration: 0.5 },
    }),
  };

  return (
    <section className="relative py-10">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="mb-4 text-4xl lg:text-6xl font-bold font-bowlby tracking-wider px-6 text-primary relative after:content-[''] after:block after:w-24 after:h-1 after:bg-secondary after:mt-2 after:mx-auto"
            >
              Current Standings
            </motion.h1>
          </div>

          {error ? (
            <p className="text-center text-red-500 text-lg">{error}</p>
          ) : standings.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No standings available.
            </p>
          ) : (
            <div className="overflow-x-auto px-4 sm:px-8 lg:px-20">
              <table className="table w-full text-sm sm:text-base">
                <thead>
                  <tr className="text-secondary font-anton text-lg sm:text-xl lg:text-3xl">
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody className="text-primary font-anton">
                  {standings.map((driver, index) => (
                    <motion.tr
                      key={driver.Driver.driverId}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <td>{driver.position}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">
                              {driver.Driver.givenName}{" "}
                              {driver.Driver.familyName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{driver.Constructors[0]?.name || "Unknown"}</td>
                      <td className="text-secondary text-sm sm:text-base lg:text-lg transition-transform transform hover:scale-125 focus:scale-125">
                        {driver.points} PTS
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="text-secondary font-anton text-lg sm:text-xl lg:text-3xl">
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Standings;
