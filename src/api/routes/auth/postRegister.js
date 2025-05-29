import api from "../../api";

/**
 * Envia os dados de registo para a API
 * @param {Object} data
 * @param {string} data.password
 * @param {string} data.email
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.date_of_birth
 */
export async function postRegister(data) {
  try {
   
    const response = await api.post("/auth/register", data);

    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao registar cliente";
    throw new Error(errorMessage);
  }
}
