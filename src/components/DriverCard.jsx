import React from "react";
import Flag from "react-world-flags";
// Import country data
import {
  nationalityToCountry,
  countryToIsoCode,
} from "../utils/countryData.js";

// Import driver images
import albon from "../assets/drivers/albon.jpg";
import alonso from "../assets/drivers/alonso.jpg";
import bearman from "../assets/drivers/bearman.jpg";
import bottas from "../assets/drivers/bottas.jpg";
import colapinto from "../assets/drivers/colapinto.jpg";
import gasly from "../assets/drivers/gasly.jpg";
import hamilton from "../assets/drivers/hamilton.jpg";
import hulkenberg from "../assets/drivers/hulkenberg.jpg";
import lawson from "../assets/drivers/lawson.jpg";
import leclerc from "../assets/drivers/leclerc.jpg";
import magnussen from "../assets/drivers/magnussen.jpg";
import norris from "../assets/drivers/norris.jpg";
import ocon from "../assets/drivers/ocon.jpg";
import perez from "../assets/drivers/perez.jpg";
import piastri from "../assets/drivers/piastri.jpg";
import ricciardo from "../assets/drivers/ricciardo.jpg";
import russell from "../assets/drivers/russell.jpg";
import sainz from "../assets/drivers/sainz.jpg";
import sargeant from "../assets/drivers/sargeant.jpg";
import stroll from "../assets/drivers/stroll.jpg";
import tsunoda from "../assets/drivers/tsunoda.jpg";
import verstappen from "../assets/drivers/verstappen.jpg";
import zhou from "../assets/drivers/zhou.jpg";

const driverData = {
  "Alexander Albon": { image: albon, team: "Williams" },
  "Fernando Alonso": { image: alonso, team: "Aston Martin" },
  "Oliver Bearman": { image: bearman, team: "Haas" },
  "Valtteri Bottas": { image: bottas, team: "Alfa Romeo" },
  "Franco Colapinto": { image: colapinto, team: "Alpine" },
  "Pierre Gasly": { image: gasly, team: "Alpine" },
  "Lewis Hamilton": { image: hamilton, team: "Mercedes" },
  "Nico Hülkenberg": { image: hulkenberg, team: "Haas" },
  "Liam Lawson": { image: lawson, team: "AlphaTauri" },
  "Charles Leclerc": { image: leclerc, team: "Ferrari" },
  "Kevin Magnussen": { image: magnussen, team: "Haas" },
  "Lando Norris": { image: norris, team: "McLaren" },
  "Esteban Ocon": { image: ocon, team: "Alpine" },
  "Sergio Pérez": { image: perez, team: "Red Bull" },
  "Oscar Piastri": { image: piastri, team: "McLaren" },
  "Daniel Ricciardo": { image: ricciardo, team: "AlphaTauri" },
  "George Russell": { image: russell, team: "Mercedes" },
  "Carlos Sainz": { image: sainz, team: "Ferrari" },
  "Logan Sargeant": { image: sargeant, team: "Williams" },
  "Lance Stroll": { image: stroll, team: "Aston Martin" },
  "Yuki Tsunoda": { image: tsunoda, team: "AlphaTauri" },
  "Max Verstappen": { image: verstappen, team: "Red Bull" },
  "Guanyu Zhou": { image: zhou, team: "Alfa Romeo" },
};

const DriverCard = ({ name, nationality, permanentNumber }) => {
  // Resolve the country name from the nationality
  const countryName = nationalityToCountry[nationality] || nationality;

  // Get the ISO country code from the country name
  const countryCode = countryToIsoCode[countryName] || "US";

  // Resolve the image and team for the driver
  const { image, team } = driverData[name] || {
    image: "../assets/default-driver.jpg",
    team: "Unknown Team",
  };

  return (
    <div className="card card-side  rounded-none !rounded-tr-lg !important !bg-secondary">
      <figure className="bg-primary flex flex-col items-center">
        {/* Driver's image with hover/focus effect */}
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg m-4 transition-transform transform hover:scale-105 hover:brightness-110 focus:scale-105 focus:brightness-110"
        />

        {/* Display team name below the image */}
        <div className="mt-2 text-lg text-center font-anton text-secondary">
          <span>{team}</span>
        </div>
      </figure>

      <div className="card-body font-anton tracking-wide text-background">
        <h2 className="card-title pt-4 transition-transform transform hover:scale-105">
          {name}
        </h2>
        <p className="text-xl transition-transform transform hover:scale-105">
          {permanentNumber}
        </p>

        <div className="flex items-center space-x-2 transition-transform transform hover:scale-105">
          <Flag code={countryCode} style={{ width: "24px", height: "16px" }} />
          <span>{countryName}</span>
        </div>

        <div className="card-actions justify-end">
          <a
            href={`https://en.wikipedia.org/wiki/${name.replace(" ", "_")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn rounded-none bg-primary text-secondary hover:opacity-80 !rounded-tr-lg !important"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
