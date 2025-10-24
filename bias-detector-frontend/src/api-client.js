// ai-bias-detector/bias-detector-frontend/src/api-client.js

const API_BASE = "http://localhost:5000/api";

export const BiasAPI = {
  detectBias: async (text) => {
    const response = await fetch(`${API_BASE}/detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return response.json();
  },

  fullAnalysis: async (text) => {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE}/stats`);
    return response.json();
  },
};
