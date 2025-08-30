import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function NextRaceInfo() {
  const [nextRace, setNextRace] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [raceDateTime, setRaceDateTime] = useState(null);
  const standingsLink = "/standings"; // Link to the standings page

  // Function to calculate time remaining
  const calculateTimeRemaining = (raceDate, raceTime) => {
    if (!raceDate || !raceTime) return null;

    const raceDateTime = new Date(`${raceDate}T${raceTime}`);
    const now = new Date();
    const timeDiff = raceDateTime - now;

    if (timeDiff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        message: "Race is happening now!",
      };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  // Real-time countdown timer
  useEffect(() => {
    if (!raceDateTime) return;

    const timer = setInterval(() => {
      const timeRemaining = calculateTimeRemaining(
        raceDateTime.date,
        raceDateTime.time
      );
      setTimeRemaining(timeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [raceDateTime]);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.NEXT_RACE);
        const nextRaceData = response.data;

        if (nextRaceData.race) {
          setNextRace(nextRaceData.race);
          setRaceDateTime({
            date: nextRaceData.race.date,
            time: nextRaceData.race.time,
          });
          // Set initial time remaining
          const initialTimeRemaining = calculateTimeRemaining(
            nextRaceData.race.date,
            nextRaceData.race.time
          );
          setTimeRemaining(initialTimeRemaining);
        } else {
          setTimeRemaining({
            message: (
              <>
                <h2 className="text-secondary font-anton text-2xl">
                  No upcoming races.
                </h2>
                <Link
                  to="/standings"
                  className="text-secondary font-anton underline ml-2"
                >
                  View the final standings.
                </Link>
              </>
            ),
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          setError(
            `Server error: ${
              error.response.data.detail || error.response.statusText
            }`
          );
        } else if (error.request) {
          setError("Network error: Unable to connect to server");
        } else {
          setError(`Error: ${error.message}`);
        }
        setLoading(false);
      }
    };

    fetchRaceData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center font-anton letter-tracking-wide gap-10 py-12">
      <Countdown
        nextRace={nextRace}
        timeRemaining={timeRemaining}
        loading={loading}
        error={error}
      />
    </div>
  );
}
