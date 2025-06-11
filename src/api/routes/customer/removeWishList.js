import api from "../../api";

/**
 * Envia os dados de registo para a API
 * @param {Object} data
 * @param {Number} data.productId
 */
export async function removeWishList(data) {
  try {
    console.log("Dados a enviar:", data);
    const response = await api.delete("/customers/removeFromWishlist", {
      data: data // precisa estar dentro de um objeto com a chave `data`
    });

    return response.data;
  } catch (err) {
    console.error("Erro:", err);
  }
}


