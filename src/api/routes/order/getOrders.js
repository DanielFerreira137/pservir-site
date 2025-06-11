import api from "../../api";

export async function getOrder() {
  try {
    const response = await api.get("/orders");

    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
