import api from "../../api";

export async function getallProductsOrderPrice() {
  try {
    const response = await api.get("/products/filter?sort_by=price&order=asc");

    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
