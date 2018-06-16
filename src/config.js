// Use API_URL defined in .env and fallback to localhost
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? RADYS_API_URL
    : 'http://localhost:4000';
