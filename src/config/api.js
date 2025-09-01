// API Configuration for FormulaHub
// Production: Render backend, Development: localhost
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment
  ? "http://localhost:8000"
  : "https://f1-backend-dm42.onrender.com";

export const API_ENDPOINTS = {
  DRIVERS: `${API_BASE_URL}/api/drivers`,
  STANDINGS: `${API_BASE_URL}/api/standings`,
  RACES: `${API_BASE_URL}/api/races`,
  NEXT_RACE: `${API_BASE_URL}/api/races/next`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
