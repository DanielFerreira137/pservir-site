import api from "../../api";

/**
 * Atualiza os dados do cliente na API
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.date_of_birth
 * @param {string} data.billing_address
 * @param {string} data.shipping_address
 * @param {string} data.tax_id
 * @param {string} data.status
 */
export async function putCustomer(data) {
  try {
  
    const response = await api.put("/customers/updateProfile", data);

   
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao atualizar cliente";
    throw new Error(errorMessage);
  }
}
