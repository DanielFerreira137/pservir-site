import api from "../../api";

export async function getallProductsRecemLancados() {
  try {
    const response = await api.get("/products/filter?sort_by=date_product&order=dsc");

   
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
