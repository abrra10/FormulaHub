# Frontend Migration Guide

This guide will help you update your React frontend to use the new FastAPI backend instead of the Ergast API.

## 1. Update API Base URL

First, create a configuration file for your API endpoints:

```javascript
// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  DRIVERS: `${API_BASE_URL}/api/drivers`,
  STANDINGS: `${API_BASE_URL}/api/standings`,
  RACES: `${API_BASE_URL}/api/races`,
  NEXT_RACE: `${API_BASE_URL}/api/races/next`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
```

## 2. Update Drivers Page

Replace the Ergast API call in `src/pages/Drivers.jsx`:

```javascript
// OLD CODE (Ergast API)
const fetchDrivers = async () => {
  const apiUrl = "https://ergast.com/api/f1/2024/drivers.json";
  const response = await axios.get(apiUrl);
  const driversData = response.data.MRData.DriverTable.Drivers;
  // ... rest of the code
};

// NEW CODE (FastAPI Backend)
import { API_ENDPOINTS } from "../config/api";

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
    setError(`Fetch error: ${error.message}`);
    setLoading(false);
  }
};
```

## 3. Update Standings Page

Replace the Ergast API call in `src/pages/Standings.jsx`:

```javascript
// OLD CODE (Ergast API)
const fetchStandings = async () => {
  const apiUrl = "https://ergast.com/api/f1/current/driverStandings.json";
  const response = await axios.get(apiUrl);
  const standingsData =
    response.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ||
    [];
  // ... rest of the code
};

// NEW CODE (FastAPI Backend)
import { API_ENDPOINTS } from "../config/api";

const fetchStandings = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.STANDINGS);
    const standingsData = response.data.standings; // Note: different structure

    setStandings(standingsData);
    setLoading(false);
  } catch (error) {
    setError(`Fetch error: ${error.message}`);
    setLoading(false);
  }
};
```

## 4. Update NextRaceInfo Component

Replace the Ergast API call in `src/components/NextRaceInfo.jsx`:

```javascript
// OLD CODE (Ergast API)
const fetchRaceData = async () => {
  const raceScheduleUrl = "https://ergast.com/api/f1/current.json";
  const response = await axios.get(raceScheduleUrl);
  const races = response.data.MRData.RaceTable.Races;
  // ... complex logic to find next race
};

// NEW CODE (FastAPI Backend)
import { API_ENDPOINTS } from "../config/api";

const fetchRaceData = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.NEXT_RACE);
    const nextRaceData = response.data;

    if (nextRaceData.race) {
      setNextRace(nextRaceData.race);
      setTimeRemaining(nextRaceData.time_remaining);
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
    setError("Error fetching race data.");
    setLoading(false);
  }
};
```

## 5. Update Data Structure Handling

The new API returns data in a different structure. Update your component rendering:

### Drivers Page

```javascript
// OLD: driver.Driver.givenName, driver.Driver.familyName
// NEW: driver.givenName, driver.familyName

// OLD: driver.Constructors[0]?.name
// NEW: driver.team
```

### Standings Page

```javascript
// OLD: driver.Driver.givenName, driver.Driver.familyName
// NEW: driver.driver.givenName, driver.driver.familyName

// OLD: driver.Constructors[0]?.name
// NEW: driver.constructor.name
```

## 6. Add Error Handling

The new API provides better error handling. Update your error states:

```javascript
// Add more specific error handling
const [error, setError] = useState(null);

// In your fetch functions
try {
  const response = await axios.get(API_ENDPOINTS.DRIVERS);
  // ... handle success
} catch (error) {
  if (error.response) {
    // Server responded with error status
    setError(
      `Server error: ${error.response.data.detail || error.response.statusText}`
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
```

## 7. Environment Variables

Create a `.env` file in your React project root:

```env
REACT_APP_API_URL=http://localhost:8000
```

## 8. CORS Configuration

The FastAPI backend is already configured with CORS for your frontend. If you're running on different ports, update the CORS configuration in `f1-backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 9. Testing the Migration

1. Start your FastAPI backend:

   ```bash
   cd f1-backend
   python start.py
   ```

2. Test the API endpoints:

   ```bash
   python test_api.py
   ```

3. Update your React app and test the frontend:
   ```bash
   npm run dev
   ```

## 10. Benefits of the New API

- **Better Performance**: Caching reduces API calls
- **More Data**: FastF1 provides richer data than Ergast
- **Reliability**: Your own backend won't go down like Ergast
- **Customization**: You can add custom endpoints and data processing
- **Real-time Updates**: Better support for live race data

## 11. Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the backend CORS configuration includes your frontend URL
2. **Data Structure Mismatch**: Check the API response structure in the browser dev tools
3. **Connection Errors**: Ensure the backend is running on the correct port
4. **Cache Issues**: Clear browser cache if you see old data

### Debug Tips:

- Use the API documentation at `http://localhost:8000/docs`
- Check browser network tab for API calls
- Use the test script to verify backend functionality
- Check backend logs for errors
