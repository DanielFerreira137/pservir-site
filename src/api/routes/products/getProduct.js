import api from "../../api";

/**
 * Envia os dados de registo para a API
 * @param {string} productId
 */
export async function getProduct(productId) {
  try {
    const response = await api.get("/products/"+productId);
    if (!response || !response.data) {
      throw new Error("Resposta inválida da API");
    }

    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage =
      err.response?.data?.message || "Erro ao registar cliente";
    throw new Error(errorMessage);
  }
}
