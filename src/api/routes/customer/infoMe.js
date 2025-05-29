import api from "../../api";

export async function fetchCustomerInfo() {
  try {
    const response = await api.get("/customers/infoMe");

    
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
