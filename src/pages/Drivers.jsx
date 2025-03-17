import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DriverCard from "../components/DriverCard";
import Spinner from "../components/Spinner"; // Import Spinner

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderImage =
    "https://via.placeholder.com/150?text=Driver+Portrait";

  const driverPortraits = {
    albon: "https://example.com/albon.jpg",
    hamilton: "https://example.com/hamilton.jpg",
    verstappen: "https://example.com/verstappen.jpg",
  };

  const teams = {
    albon: "Williams",
    hamilton: "Mercedes",
    verstappen: "Red Bull",
  };

  const fetchDrivers = async () => {
    const apiUrl = "https://ergast.com/api/f1/2024/drivers.json";

    try {
      const response = await axios.get(apiUrl);
      const driversData = response.data.MRData.DriverTable.Drivers;

      const driversWithDetails = driversData.map((driver) => ({
        ...driver,
        portrait: driverPortraits[driver.driverId] || placeholderImage,
        team: teams[driver.driverId] || "Unknown",
      }));

      setDrivers(driversWithDetails);
      setLoading(false);
    } catch (error) {
      setError(`Fetch error: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const cardVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, ease: "easeInOut", duration: 0.5 },
    }),
  };

  return (
    <section className="py-auto relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="container mx-auto px-4 py-8 mt-8 bg-background">
          <motion.h1
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-4 text-4xl lg:text-6xl font-bold font-bowlby tracking-wider px-6 text-primary text-center relative after:content-[''] after:block after:w-24 after:h-1 after:bg-secondary after:mt-2 after:mx-auto"
          >
            Drivers
          </motion.h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((driver, index) => (
              <motion.div
                key={driver.driverId}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <DriverCard
                  image={driver.portrait}
                  name={`${driver.givenName} ${driver.familyName}`}
                  nationality={driver.nationality}
                  permanentNumber={driver.permanentNumber}
                  team={driver.team}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Drivers;
