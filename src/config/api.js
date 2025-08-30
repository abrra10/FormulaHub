// API Configuration for FormulaHub
// Change this URL when deploying to Cloudflare Workers
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// For Cloudflare Workers deployment, use:
// const API_BASE_URL = "https://formulahub-api.your-subdomain.workers.dev";

export const API_ENDPOINTS = {
  DRIVERS: `${API_BASE_URL}/api/drivers`,
  STANDINGS: `${API_BASE_URL}/api/standings`,
  RACES: `${API_BASE_URL}/api/races`,
  NEXT_RACE: `${API_BASE_URL}/api/races/next`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
