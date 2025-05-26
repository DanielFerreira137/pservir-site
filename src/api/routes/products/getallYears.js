import api from "../../api";

export async function getallYears() {
  try {
    const response = await api.get("/products/variaveis/allYears");

   
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
