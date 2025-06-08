import api from "../../api";

export async function customerWishList() {
  try {
    const response = await api.get("/customers/wishlist");
  
    return response.data.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
