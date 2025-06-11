import React, { useState, useEffect } from "react";
import { Collapse, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
//Components
import PageTitle from "./../layouts/PageTitle";
import { Link } from "react-router-dom";
// API
import { postOrder } from "../api/routes/order/postOrders"; // Ajuste o caminho conforme sua estrutura
//images

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

const SingleInput = ({
  title,
  value,
  onChange,
  name,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control"
        placeholder={title}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

function ShopCheckout() {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [accordBtn, setAccordBtn] = useState(false);
  const [criarConta, setCriarConta] = useState(false);
  const [usarMesmoEndereco, setUsarMesmoEndereco] = useState(true);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.number * parseFloat(item.price),
    0
  );
  const discountOnOrder = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.discount || 0),
    0
  );

  const total = subtotal;
  // Estados para dados de faturação
  const [dadosFaturacao, setDadosFaturacao] = useState({
    nome: "",
    apelido: "",
    empresa: "",
    pais: "Portugal",
    morada: "",
    apartamento: "",
    cidade: "",
    distrito: "",
    codigoPostal: "",
    email: "",
    telefone: "",
  });

  // Estados para dados de envio
  const [dadosEnvio, setDadosEnvio] = useState({
    nome: "",
    apelido: "",
    empresa: "",
    pais: "Portugal",
    morada: "",
    apartamento: "",
    cidade: "",
    distrito: "",
    codigoPostal: "",
    email: "",
    telefone: "",
  });

  const [observacoes, setObservacoes] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dadosMB, setDadosMB] = useState(null);
  const [error, setError] = useState(null);

  // Carregar dados do usuário quando disponível
  useEffect(() => {
    if (user) {
      // Parse dos endereços do usuário com novo formato de 6 campos
      const billingParts = user.billingAddress?.split(";") || [];
      const shippingParts = user.shippingAddress?.split(";") || [];

      const dadosBase = {
        nome: user.name?.split(" ")[0] || "",
        apelido: user.name?.split(" ").slice(1).join(" ") || "",
        empresa: "",
        pais: billingParts[5] || user.country || "Portugal",
        morada: billingParts[0] || "",
        apartamento: billingParts[1] || "",
        cidade: billingParts[2] || "",
        distrito: billingParts[3] || "",
        codigoPostal: billingParts[4] || "",
        email: user.email || "",
        telefone: user.phone || "",
      };

      setDadosFaturacao(dadosBase);

      // Se usar mesmo endereço, copiar dados de faturação
      if (usarMesmoEndereco) {
        setDadosEnvio(dadosBase);
      } else {
        setDadosEnvio({
          ...dadosBase,
          morada: shippingParts[0] || "",
          apartamento: shippingParts[1] || "",
          cidade: shippingParts[2] || "",
          distrito: shippingParts[3] || "",
          codigoPostal: shippingParts[4] || "",
          pais: shippingParts[5] || "Portugal",
        });
      }
    }
  }, [user, usarMesmoEndereco]);

  const handleFaturacaoChange = (e) => {
    const { name, value } = e.target;
    setDadosFaturacao((prev) => ({ ...prev, [name]: value }));

    // Se usar mesmo endereço, atualizar envio também
    if (usarMesmoEndereco) {
      setDadosEnvio((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEnvioChange = (e) => {
    const { name, value } = e.target;
    setDadosEnvio((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsarMesmoEndereco = (e) => {
    const checked = e.target.checked;
    setUsarMesmoEndereco(checked);
    if (checked) {
      setDadosEnvio({ ...dadosFaturacao });
    }
  };

  /**
   * Gera o número da fatura
   * @returns {string}
   */
  const generateInvoiceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const timestamp = now.getTime().toString().slice(-6);
    return `INV-${year}-${timestamp}`;
  };

  /**
   * Formata os dados de endereço para string
   * @param {Object} dados - Dados do endereço
   * @returns {string}
   */
  const formatAddress = (dados) => {
    return `${dados.morada};${dados.apartamento};${dados.cidade};${dados.distrito};${dados.codigoPostal};${dados.pais}`;
  };

  /**
   * Prepara os dados do pedido para envio à API
   * @returns {OrderData}
   */
  const prepareOrderData = () => {
    const enderecoEnvio = usarMesmoEndereco ? dadosFaturacao : dadosEnvio;

    const orderItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.number,
      price: parseFloat(item.price),
      discount: parseFloat(item.discount).toFixed(2) || 0,
      total: item.number * parseFloat(item.price),
    }));
  

    return {
      status: "pendente",
      subtotal: subtotal,
      discount: discountOnOrder.toFixed(2) || 0,
      tax: 0,
      shipping_cost: 0,
      total: total,
      payment_method: "Multibanco",
      payment_status: "pendente",
      shipping_method: "correio",
      shipping_status: "pendente",
      billing_address: formatAddress(dadosFaturacao),
      shipping_address: formatAddress(enderecoEnvio),
      invoice_number: generateInvoiceNumber(),
      notes: observacoes,
      customer_notes: observacoes,
      items: orderItems,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDadosMB(null);

    try {
      // Preparar dados do pedido
      const orderData = prepareOrderData();

      console.log("Dados do pedido:", {
        faturacao: dadosFaturacao,
        envio: usarMesmoEndereco ? dadosFaturacao : dadosEnvio,
        pagamento: "Pagamento por Entidade/Referência Multibanco",
        observacoes,
        criarConta: criarConta ? { password } : null,
        orderData,
      });

      // Enviar pedido para API
      const response = await postOrder(orderData);

      console.log("Resposta da API:", response);

      // Simular dados do Multibanco (substitua pela resposta real da API)
      const dadosMultibanco = {
        entidade: response.payment_entity || "23432",
        referencia: response.payment_reference || "660 742 974",
        valor: total.toFixed(2),
        dataLimite: response.payment_deadline || "2025-06-18",
      };

      setDadosMB(dadosMultibanco);

      // Limpar carrinho após sucesso (opcional)
      // clearCart();
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      setError(error.message || "Erro ao processar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
      // Temporário para debug

      localStorage.removeItem("shopping_cart");
    }
  };

  return (
    <>
      <div className="page-content">
        <PageTitle parentPage="Loja" childPage="Finalizar Compra" />
        <section className="content-inner-1">
          <div className="container">
            <form className="shop-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="widget">
                    <h4 className="widget-title">Endereço de Faturação</h4>

                    <div className="form-group">
                      <Form.Select
                        name="pais"
                        value={dadosFaturacao.pais}
                        onChange={handleFaturacaoChange}
                      >
                        <option value="Portugal">Portugal</option>
                        <option value="Espanha">Espanha</option>
                        <option value="França">França</option>
                        <option value="Alemanha">Alemanha</option>
                        <option value="Itália">Itália</option>
                        <option value="Reino Unido">Reino Unido</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Angola">Angola</option>
                        <option value="Moçambique">Moçambique</option>
                      </Form.Select>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <SingleInput
                          title="Nome *"
                          name="nome"
                          value={dadosFaturacao.nome}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <SingleInput
                          title="Apelido *"
                          name="apelido"
                          value={dadosFaturacao.apelido}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                    </div>

                    <SingleInput
                      title="Nome da Empresa (opcional)"
                      name="empresa"
                      value={dadosFaturacao.empresa}
                      onChange={handleFaturacaoChange}
                    />

                    {/* Morada - campo completo */}
                    <SingleInput
                      title="Morada *"
                      name="morada"
                      value={dadosFaturacao.morada}
                      onChange={handleFaturacaoChange}
                    />

                    {/* Apartamento e Cidade */}
                    <div className="row">
                      <div className="col-md-6">
                        <SingleInput
                          title="Apartamento, andar, etc."
                          name="apartamento"
                          value={dadosFaturacao.apartamento}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <SingleInput
                          title="Cidade *"
                          name="cidade"
                          value={dadosFaturacao.cidade}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                    </div>

                    {/* Distrito e Código Postal */}
                    <div className="row">
                      <div className="col-md-6">
                        <SingleInput
                          title="Distrito"
                          name="distrito"
                          value={dadosFaturacao.distrito}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <SingleInput
                          title="Código Postal *"
                          name="codigoPostal"
                          value={dadosFaturacao.codigoPostal}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <SingleInput
                          title="Email *"
                          name="email"
                          type="email"
                          value={dadosFaturacao.email}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <SingleInput
                          title="Telefone *"
                          name="telefone"
                          value={dadosFaturacao.telefone}
                          onChange={handleFaturacaoChange}
                        />
                      </div>
                    </div>

                    {!user && (
                      <>
                        <button
                          className="btn btn-primary btnhover mb-3"
                          type="button"
                          onClick={() => setCriarConta(!criarConta)}
                        >
                          Criar uma conta{" "}
                          <i className="fa fa-arrow-circle-o-down"></i>
                        </button>
                        <Collapse in={criarConta}>
                          <div>
                            <p>
                              Crie uma conta introduzindo as informações abaixo.
                              Se já é cliente, por favor faça login no topo da
                              página.
                            </p>
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Palavra-passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </Collapse>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mesmoEndereco"
                      checked={usarMesmoEndereco}
                      onChange={handleUsarMesmoEndereco}
                    />
                    <label className="form-check-label" htmlFor="mesmoEndereco">
                      Usar o mesmo endereço para envio
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btnhover mb-3"
                    type="button"
                    onClick={() => setAccordBtn(!accordBtn)}
                    disabled={usarMesmoEndereco}
                  >
                    Enviar para endereço diferente{" "}
                    <i className="fa fa-arrow-circle-o-down"></i>
                  </button>

                  <Collapse in={accordBtn && !usarMesmoEndereco}>
                    <div>
                      <h5>Endereço de Envio</h5>
                      <div className="form-group">
                        <Form.Select
                          name="pais"
                          value={dadosEnvio.pais}
                          onChange={handleEnvioChange}
                        >
                          <option value="Portugal">Portugal</option>
                          <option value="Espanha">Espanha</option>
                          <option value="França">França</option>
                          <option value="Alemanha">Alemanha</option>
                          <option value="Itália">Itália</option>
                          <option value="Reino Unido">Reino Unido</option>
                          <option value="Brasil">Brasil</option>
                          <option value="Angola">Angola</option>
                          <option value="Moçambique">Moçambique</option>
                        </Form.Select>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <SingleInput
                            title="Nome *"
                            name="nome"
                            value={dadosEnvio.nome}
                            onChange={handleEnvioChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <SingleInput
                            title="Apelido *"
                            name="apelido"
                            value={dadosEnvio.apelido}
                            onChange={handleEnvioChange}
                          />
                        </div>
                      </div>

                      <SingleInput
                        title="Nome da Empresa (opcional)"
                        name="empresa"
                        value={dadosEnvio.empresa}
                        onChange={handleEnvioChange}
                      />

                      {/* Morada - campo completo */}
                      <SingleInput
                        title="Morada *"
                        name="morada"
                        value={dadosEnvio.morada}
                        onChange={handleEnvioChange}
                      />

                      {/* Apartamento e Cidade */}
                      <div className="row">
                        <div className="col-md-6">
                          <SingleInput
                            title="Apartamento, andar, etc."
                            name="apartamento"
                            value={dadosEnvio.apartamento}
                            onChange={handleEnvioChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <SingleInput
                            title="Cidade *"
                            name="cidade"
                            value={dadosEnvio.cidade}
                            onChange={handleEnvioChange}
                          />
                        </div>
                      </div>

                      {/* Distrito e Código Postal */}
                      <div className="row">
                        <div className="col-md-6">
                          <SingleInput
                            title="Distrito"
                            name="distrito"
                            value={dadosEnvio.distrito}
                            onChange={handleEnvioChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <SingleInput
                            title="Código Postal *"
                            name="codigoPostal"
                            value={dadosEnvio.codigoPostal}
                            onChange={handleEnvioChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>

                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Observações sobre o seu pedido, ex: notas especiais para entrega"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows="4"
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="dz-divider bg-gray-dark text-gray-dark icon-center my-5">
              <i className="fa fa-circle bg-white text-gray-dark"></i>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="widget">
                  <h4 className="widget-title">O Seu Pedido</h4>
                  <table className="table-bordered check-tbl">
                    <thead className="text-center">
                      <tr>
                        <th>IMAGEM</th>
                        <th>NOME DO PRODUTO</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, ind) => (
                        <tr key={ind}>
                          <td className="product-item-img">
                            <img src={item.image} alt={item.title} />
                          </td>

                          <td className="product-item-name">
                            <Link to={`/book-details/${item.id}`}>
                              {item.title}{" "}
                            </Link>
                          </td>

                          <td className="product-price">
                            {" "}
                            {parseFloat(item.price).toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="shop-form widget">
                  <h4 className="widget-title">Total do Pedido</h4>
                  <table className="table-bordered check-tbl mb-4">
                    <tbody>
                      <tr>
                        <td>Subtotal do Pedido</td>
                        <td className="product-price">{total.toFixed(2)} €</td>
                      </tr>
                      <tr>
                        <td>Envio</td>
                        <td>Envio Gratuito</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td className="product-price-total">
                          <strong>{total.toFixed(2)} €</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h4 className="widget-title">Método de Pagamento</h4>
                  <p>
                    Apenas disponível:{" "}
                    <strong>
                      Pagamento por Entidade/Referência Multibanco
                    </strong>
                  </p>
                  <p>
                    As informações de pagamento serão geradas após finalizar o
                    pedido.
                  </p>

                  <div className="form-group">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {!dadosMB && (
                      <div className="form-group">
                        <button
                          className="btn btn-primary btnhover"
                          type="submit"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading
                            ? "Processando..."
                            : "Finalizar Pedido Agora"}
                        </button>
                      </div>
                    )}

                    {loading && (
                      <p>A gerar entidade e referência de pagamento...</p>
                    )}

                    {dadosMB && (
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "fit-content",
                          maxWidth: "100%",
                          fontFamily: "Arial, sans-serif",
                          backgroundColor: "#f9f9f9",
                          margin: "0 auto", // centra a div
                        }}
                      >
                        <img
                          src="https://img.icons8.com/?size=256&id=HWbgAihjYdU_&format=png"
                          alt="MB"
                          style={{ width: "60px", marginRight: "24px" }}
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <div>
                            <strong>ENTIDADE:&nbsp;&nbsp;&nbsp;</strong>{" "}
                            <span style={{ paddingLeft: "8px" }}>
                              {dadosMB.entidade}
                            </span>
                          </div>
                          <div>
                            <strong>
                              REF. MB:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </strong>{" "}
                            <span style={{ paddingLeft: "8px" }}>
                              {dadosMB.referencia}
                            </span>
                          </div>
                          <div>
                            <strong>
                              VALOR:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </strong>{" "}
                            <span style={{ paddingLeft: "8px" }}>
                              {dadosMB.valor} €
                            </span>
                          </div>
                          <div>
                            <strong>DATA LIMITE:</strong>{" "}
                            <span style={{ paddingLeft: "8px" }}>
                              {dadosMB.dataLimite}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {dadosMB && (
                    <>
                      <p>
                        A sua encomenda pode ser consultada na página de{" "}
                        <strong>Encomendas</strong> no seu perfil, onde também
                        estará disponível a{" "}
                        <strong>entidade e referência</strong> para pagamento.
                      </p>
                      <p>
                        Caso o pagamento não seja efetuado até à{" "}
                        <strong>data limite</strong>, a encomenda será{" "}
                        <strong>cancelada automaticamente</strong>.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ShopCheckout;
