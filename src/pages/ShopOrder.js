import React, { useState, useEffect } from "react";
import PageTitle from "./../layouts/PageTitle";
// Mock PageTitle component
import { getOrder } from "../api/routes/order/getOrders";
// Mock data based on your JSON structure


function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulate API call
    //setOrders(mockOrders);
    
    // Define and call async function to fetch real data
    const fetchOrders = async () => {
      try {
        const data = await getOrder();
        setOrders(data);
      }
      catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error appropriately
      }
    };
    
    // Uncomment the following line to fetch real data from the API
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pendente: "badge-warning",
      shipped: "badge-info",
      entregue: "badge-success",
      cancelado: "badge-danger",
    };
    return statusClasses[status] || "badge-secondary";
  };

  const getPaymentStatusBadge = (status) => {
    const statusClasses = {
      pago: "badge-success",
      pendente: "badge-warning",
      falhado: "badge-danger",
    };
    return statusClasses[status] || "badge-secondary";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="page-content">
      <PageTitle parentPage="Conta" childPage="Minhas Encomendas" />
      <section className="content-inner shop-account">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table check-tbl">
                  <thead>
                    <tr>
                      <th>Nº Encomenda</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Pagamento</th>
                      <th>Total</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Não foram encontradas encomendas.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.order_id}>
                          <td className="product-item-name">
                            <strong>#{order.order_id}</strong>
                            <br />
                            <small>{order.invoice_number}</small>
                          </td>
                          <td className="product-item-price">
                            {formatDate(order.order_date)}
                          </td>
                          <td>
                            <span
                              className={`badge ${getStatusBadge(
                                order.status
                              )} text-uppercase`}
                            >
                              {order.status}
                            </span>
                            {order.shipping_status && (
                              <div>
                                <small className="text"></small>
                              </div>
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge ${getPaymentStatusBadge(
                                order.payment_status
                              )} text-uppercase`}
                            >
                              {order.payment_status}
                            </span>
                            <div>
                              <small className="text"></small>
                            </div>
                          </td>
                          <td className="product-item-price">
                            <strong>{order.total.toFixed(2)} €</strong>
                            <div>
                              <small className="text">
                                Subtotal: {order.subtotal.toFixed(2)} €
                              </small>
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => viewOrderDetails(order)}
                            >
                              Ver Detalhes
                            </button>
                            {order.tracking_number && (
                              <div className="mt-1">
                                <small className="text"></small>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div className="modal-dialog modal-xl">
            <div
              className="modal-content"
              style={{
                borderRadius: "20px",
                border: "none",
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              }}
            >
              {/* Beautiful Header */}
              <div
                className="modal-header border-0 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%,rgb(62, 74, 185) 100%)",
                  color: "white",
                  borderRadius: "20px 20px 0 0",
                  padding: "30px",
                }}
              >
                <div className="position-absolute top-0 end-0 opacity-25">
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      transform: "translate(50%, -50%)",
                    }}
                  ></div>
                </div>
                <div className="position-relative">
                  <h4 className="modal-title mb-2 fw-bold">
                    Encomenda #{selectedOrder.order_id}
                  </h4>
                  <p className="mb-0 opacity-75">
                    {selectedOrder.invoice_number} •{" "}
                    {formatDate(selectedOrder.order_date)}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white position-absolute"
                  style={{ top: "20px", right: "20px" }}
                  onClick={closeOrderDetails}
                ></button>
              </div>

              <div className="modal-body p-0">
                {/* Status Cards */}
                <div className="p-4 bg-light">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body text-center p-3">
                          <div
                            className="mb-2 mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background:
                                selectedOrder.status === "shipped"
                                  ? "#28a745"
                                  : "#ffc107",
                            }}
                          >
                            <span className="text-white fw-bold">
                              {selectedOrder.status === "shipped" ? "📦" : "⏳"}
                            </span>
                          </div>
                          <h6 className="mb-1">Status</h6>
                          <span
                            className={`badge ${getStatusBadge(
                              selectedOrder.status
                            )} text-uppercase`}
                          >
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body text-center p-3">
                          <div
                            className="mb-2 mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background:
                                selectedOrder.payment_status === "pago"
                                  ? "#28a745"
                                  : "#ffc107",
                            }}
                          >
                            <span className="text-white fw-bold">
                              {selectedOrder.payment_status === "pago"
                                ? "💳"
                                : "⏰"}
                            </span>
                          </div>
                          <h6 className="mb-1">Pagamento</h6>
                          <span
                            className={`badge ${getPaymentStatusBadge(
                              selectedOrder.payment_status
                            )} text-uppercase`}
                          >
                            {selectedOrder.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body text-center p-3">
                          <div
                            className="mb-2 mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "#17a2b8",
                            }}
                          >
                            <span className="text-white fw-bold">🚚</span>
                          </div>
                          <h6 className="mb-1">Envio</h6>
                          <small className="text">
                            {selectedOrder.shipping_method}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body text-center p-3">
                          <div
                            className="mb-2 mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "#6f42c1",
                            }}
                          >
                            <span className="text-white fw-bold">💰</span>
                          </div>
                          <h6 className="mb-1">Total</h6>
                          <h5 className="mb-0 text-primary">
                            {selectedOrder.total.toFixed(2)} €
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details Section */}
                <div
                  className="p-4"
                  style={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body p-4">
                          <h6 className="card-title text-primary mb-3">
                            Endereços
                          </h6>
                          <div className="mb-3">
                            <small className="text text-uppercase fw-bold">
                              Faturação
                            </small>
                            <p className="mb-0">
                              {selectedOrder.billing_address}
                            </p>
                          </div>
                          <div>
                            <small className="text text-uppercase fw-bold">
                              Envio
                            </small>
                            <p className="mb-0">
                              {selectedOrder.shipping_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{ borderRadius: "15px" }}
                      >
                        <div className="card-body p-4">
                          <h6 className="card-title text-primary mb-3">
                            Pagamento & Envio
                          </h6>
                          <div className="mb-2">
                            <small className="text">
                              Método de Pagamento:
                            </small>
                            <span className="ms-2 fw-bold">
                              {selectedOrder.payment_method}
                            </span>
                          </div>
                          {selectedOrder.payment_date && (
                            <div className="mb-2">
                              <small className="text">
                                Data de Pagamento:
                              </small>
                              <span className="ms-2">
                                {formatDate(selectedOrder.payment_date)}
                              </span>
                            </div>
                          )}
                          {selectedOrder.tracking_number && (
                            <div className="mb-2">
                              <small className="text">Tracking:</small>
                              <code className="ms-2 bg-light px-2 py-1 rounded">
                                {selectedOrder.tracking_number}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products Section */}
                  <div className="mb-4">
                    <div
                      className="card border-0 shadow-sm"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-0">
                      <h6 className="card-title text-primary mb-3 px-4 py-3">
                              Produtos
                            </h6>
                        {selectedOrder.order_items.map((item, index) => (
                          <div
                            key={item.orderItem_id}
                            className={`p-4 ${
                              index !== selectedOrder.order_items.length - 1
                                ? "border-bottom"
                                : ""
                            }`}
                            style={{ borderColor: "#f0f0f0" }}
                          >
                            
                            <div className="row align-items-center">
                              <div className="col-md-6">
                                <div className="d-flex align-items-center">
                                  {item.product.ProductImages &&
                                    item.product.ProductImages[0] && (
                                      <div
                                        className="me-3"
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          borderRadius: "10px",
                                          overflow: "hidden",
                                          boxShadow:
                                            "0 4px 8px rgba(0,0,0,0.1)",
                                        }}
                                      >
                                        <img
                                          src={
                                            item.product.ProductImages[0]
                                              .image_url
                                          }
                                          alt={item.product.title_product}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    )}
                                  <div>
                                    <h6 className="mb-1">
                                      {item.product.title_product}
                                    </h6>
                                    <small className="text">
                                      {item.product.author_product}
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row text-center">
                                  <div className="col-3">
                                    <small className="text d-block">
                                      Preço
                                    </small>
                                    <strong>{ (item.price + item.discount).toFixed(2)} €</strong>
                                 
                                  </div>
                                  <div className="col-3">
                                    <small className="text d-block">
                                      Qtd
                                    </small>
                                    <span
                                      className="badge bg-light text-dark"
                                      style={{
                                        borderRadius: "20px",
                                        padding: "8px 12px",
                                      }}
                                    >
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <div className="col-3">
                                    <small className="text d-block">
                                      Desconto
                                    </small>
                                    <span className="text-success">
                                      -{item.discount.toFixed(2)} €
                                    </span>
                                  </div>
                                  <div className="col-3">
                                    <small className="text d-block">
                                      Total
                                    </small>
                                    <strong className="text-primary">
                                      {item.total.toFixed(2)} €
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="row">
                    <div className="col-md-6">
                      {/* Notes Section */}
                      {(selectedOrder.notes ||
                        selectedOrder.customer_notes) && (
                        <div className="mb-4">
                          <div
                            className="card border-0 shadow-sm"
                            style={{ borderRadius: "15px", height: "19rem" }}
                          >
                            <div className="card-body p-4">
                            <h6 className="card-title text-primary mb-3">
                              Notas
                            </h6>
                              {selectedOrder.notes && (
                                <div className="mb-2">
                                  <span className="badge bg-primary me-2">
                                    Loja
                                  </span>
                                  {selectedOrder.notes}
                                </div>
                              )}
                              {selectedOrder.customer_notes && (
                                <div>
                                  <span className="badge bg-info me-2">
                                    Cliente
                                  </span>
                                  {selectedOrder.customer_notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div
                        className="card border-0 shadow-sm"
                        style={{
                          borderRadius: "15px",
                          background:
                            "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                          height: "19rem",
                        }}
                      >
                        <div className="card-body p-4">
                        <h6 className="card-title text-primary mb-3">
                              Resumo Financeiro
                            </h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>{selectedOrder.subtotal.toFixed(2)} €</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 text-success">
                            <span>Desconto:</span>
                            <span>-{selectedOrder.discount.toFixed(2)} €</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Taxa:</span>
                            <span>{selectedOrder.tax.toFixed(2)} €</span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span>Envio:</span>
                            <span>
                              {selectedOrder.shipping_cost.toFixed(2)} €
                            </span>
                          </div>
                          <hr style={{ borderColor: "#dee2e6" }} />
                          <div className="d-flex justify-content-between">
                            <strong className="h5">Total:</strong>
                            <strong className="h5 text-primary">
                              {selectedOrder.total.toFixed(2)} €
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal-footer border-0 bg-light"
                style={{ borderRadius: "0 0 20px 20px", padding: "20px 30px" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  style={{ borderRadius: "25px", padding: "10px 25px" }}
                  onClick={closeOrderDetails}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    borderRadius: "25px",
                    padding: "10px 25px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  Imprimir Recibo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
