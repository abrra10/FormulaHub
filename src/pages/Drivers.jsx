import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DriverCard from "../components/DriverCard";
import Spinner from "../components/Spinner";
import { API_ENDPOINTS } from "../config/api";

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
    try {
      const response = await axios.get(API_ENDPOINTS.DRIVERS);
      const driversData = response.data.drivers; // Note: different structure

      const driversWithDetails = driversData.map((driver) => ({
        ...driver,
        portrait: driver.portraitUrl || placeholderImage,
        team: driver.team || "Unknown",
      }));

      setDrivers(driversWithDetails);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        setError(
          `Server error: ${
            error.response.data.detail || error.response.statusText
          }`
        );
      } else if (error.request) {
        // Network error
        setError("Network error: Unable to connect to server");
      } else {
        // Other error
        setError(`Error: ${error.message}`);
      }
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
          {loading ? (
            <div className="fixed inset-0 flex justify-center items-center bg-background">
              <Spinner />
            </div>
          ) : (
            drivers.map((driver, index) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Drivers;
