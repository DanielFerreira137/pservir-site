import api from "../../api";

export async function getminPriceAndMaxPrice() {
  try {
    const response = await api.get("/products/variaveis/minPriceAndMaxPrice");

    const fixed  = {
      minPrice: response.data.minPrice-1,
      maxPrice: response.data.maxPrice,
    };
    return fixed;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao obter informações do cliente";
    throw new Error(errorMessage);
  }
}
