import api from "../../api";

export async function getallPublishers() {
  try {
    const response = await api.get("/products/variaveis/allPublishers");

  
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
