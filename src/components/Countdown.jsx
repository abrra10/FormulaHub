import React, { useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
export default function Countdown({
  nextRace,
  timeRemaining,
  loading,
  error,
  onLocationUpdate,
}) {
  useEffect(() => {
    if (
      nextRace &&
      nextRace.Circuit &&
      nextRace.Circuit.Location &&
      onLocationUpdate
    ) {
      const { locality, country } = nextRace.Circuit.Location;
      onLocationUpdate({ locality, country });
    }
  }, [nextRace, onLocationUpdate]);

  return (
    <div className="px-4 py-8 lg:px-12 lg:py-14 rounded w-full flex flex-col lg:flex-row items-center justify-center gap-8">
      {loading ? (
        <div className="flex justify-center items-center ">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : timeRemaining && timeRemaining.message ? (
        <div className="text-2xl font-bold font-anton letter-tracking-wide">
          {timeRemaining.message}
        </div>
      ) : (
        <>
          {/* Place and Countdown Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Place Section */}
            {nextRace && (
              <div className="text-2xl font-bold font-anton letter-tracking-wide text-primary text-center lg:text-left whitespace-normal max-w-full">
                <p>
                  <span className="font-bold ">{nextRace.raceName} at</span>{" "}
                </p>
                <h2 className="font-bold text-4xl">
                  {nextRace.Circuit.circuitName}
                </h2>
                <h2 className="flex items-center gap-2 font-bold text-4xl px-10 py-4 text-secondary">
                  {nextRace.Circuit.Location.locality},{" "}
                  <span className="flex items-center gap-2 ">
                    {nextRace.Circuit.Location.country}
                    <HiOutlineLocationMarker className="text-4xl text-secondary" />
                  </span>
                </h2>
              </div>
            )}

            {/* Countdown Section */}
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max my-auto">
              <div className="flex flex-col p-2 bg-secondary text-background rounded-box ">
                <span className="countdown font-anton letter-tracking-wide text-5xl text-background">
                  <span style={{ "--value": timeRemaining?.days || 0 }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-secondary text-background rounded-box ">
                <span className="countdown font-anton letter-tracking-wide text-5xl text-background">
                  <span style={{ "--value": timeRemaining?.hours || 0 }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-secondary rounded-box text-background">
                <span className="countdown font-anton letter-tracking-wide text-5xl text-background">
                  <span
                    style={{ "--value": timeRemaining?.minutes || 0 }}
                  ></span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-secondary rounded-box text-background">
                <span className="countdown font-anton letter-tracking-wide text-5xl text-background">
                  <span
                    style={{ "--value": timeRemaining?.seconds || 0 }}
                  ></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
