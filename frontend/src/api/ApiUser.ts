const API_URL = "http://localhost:8081/api";

export const ApiUser = {
  post: async (endpoint: string, body: object) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    // se não tem corpo na resposta, retorna null
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return null;
  },

  get: async (endpoint: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    // se não tem corpo na resposta, retorna null
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return null;
  }
};