import api from "../../api";

/**
 * Envia os dados de registo para a API
 * @param {Object} data
 * @param {Number} data.productId
 */
export async function addWishList(data) {
  try {
    console.log("Dados a enviar:", data);
    const response = await api.post("/customers/addToWishlist", data);

    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao registar cliente";
    throw new Error(errorMessage);
  }
}
