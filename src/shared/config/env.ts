const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Missing VITE_API_URL in environment variables.");
}

export const ENV = {
  API_URL,
};
