import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

export default function NextRaceInfo() {
  const [nextRace, setNextRace] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const standingsLink = "/standings"; // Link to the standings page

  useEffect(() => {
    const fetchRaceData = async () => {
      const raceScheduleUrl = "https://ergast.com/api/f1/current.json";

      try {
        const response = await axios.get(raceScheduleUrl);
        const races = response.data.MRData.RaceTable.Races;
        const currentTime = new Date().getTime();

        // Find the next race in the schedule
        let upcomingRace = null;
        for (const race of races) {
          const raceDateTime = new Date(`${race.date}T${race.time}`).getTime();
          if (raceDateTime > currentTime) {
            upcomingRace = race;
            break;
          }
        }

        if (upcomingRace) {
          setNextRace(upcomingRace);
          const raceDateTime = new Date(
            `${upcomingRace.date}T${upcomingRace.time}`
          ).getTime();

          const calculateTimeRemaining = () => {
            const now = new Date().getTime();
            const timeRemaining = raceDateTime - now;

            if (timeRemaining <= 0) {
              setTimeRemaining({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                message: "Race is happening now!",
              });
            } else {
              const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

              setTimeRemaining({ days, hours, minutes, seconds });
            }
          };

          calculateTimeRemaining();
          const intervalId = setInterval(calculateTimeRemaining, 1000);

          return () => clearInterval(intervalId);
        } else {
          // Handle no upcoming races with a custom message and link
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
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching race data.");
      } finally {
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
