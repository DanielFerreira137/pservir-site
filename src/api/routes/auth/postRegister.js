import api from "../../api";

/**
 * Envia os dados de registo para a API
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @param {string} data.email
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.country
 * @param {string} data.date_of_birth
 * @param {string} data.billing_address
 * @param {string} data.shipping_address
 * @param {string} data.tax_id
 * @param {string} data.status
 */
export async function postRegister(data) {
  try {
    console.log("Dados a enviar:", data);
    const response = await api.post("/auth/register", data);

    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao registar cliente";
    throw new Error(errorMessage);
  }
}
