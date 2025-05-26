import api from "../../api";

export async function getbydate() {
  try {
    const response = await api.get("/products/promotions/by-date");

  
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
