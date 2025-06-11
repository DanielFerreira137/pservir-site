import api from "../../api";

/**
 * @typedef {Object} OrderItem
 * @property {number} product_id
 * @property {number} quantity
 * @property {number} price
 * @property {number} discount
 * @property {number} total
 */

/**
 * @typedef {Object} OrderData
 * @property {string} status
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} tax
 * @property {number} shipping_cost
 * @property {number} total
 * @property {string} payment_method
 * @property {string} payment_status
 * @property {string} shipping_method
 * @property {string} shipping_status
 * @property {string} billing_address
 * @property {string} shipping_address
 * @property {string} invoice_number
 * @property {string} notes
 * @property {string} customer_notes
 * @property {OrderItem[]} items
 */

/**
 * Cria um novo pedido
 * @param {OrderData} orderData - Dados do pedido
 * @returns {Promise<any>} Resposta da API
 */
export async function postOrder(orderData) {
  try {
    const response = await api.post("/orders", orderData);

    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Erro:", err);
    const errorMessage = err.response?.data?.message || "Erro ao criar pedido";
    throw new Error(errorMessage);
  }
}