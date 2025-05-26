import api from "../../api";

export async function getallAuthors() {
  try {
    const response = await api.get("/products/variaveis/allAuthors");

 
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
