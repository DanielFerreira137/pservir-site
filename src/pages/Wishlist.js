import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho

//Components
import PageTitle from "./../layouts/PageTitle";

function ListaDesejos() {
  const {
    wishlist,
    wishlistLoading,
    wishlistLength,
    removeFromWishlist,
    loadWishlist,
    user,
  } = useAuth();

  const [removendoItem, setRemovendoItem] = useState(null);

  // Remove item da wishlist
  const handleRemoverItem = async (productId) => {
    setRemovendoItem(productId);
    try {
      const result = await removeFromWishlist(productId);
      if (!result.success) {
        console.error("Erro ao remover item:", result.message);
        // Aqui você pode mostrar uma notificação de erro
      }
    } catch (error) {
      console.error("Erro ao remover da wishlist:", error);
    } finally {
      setRemovendoItem(null);
    }
  };

  if (!user) {
    return (
      <div className="page-content">
        <PageTitle parentPage="Loja" childPage="Lista de Desejos" />
        <section className="content-inner-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h3>Acesso Restrito</h3>
                <p className="mb-4">
                  Você precisa fazer login para ver sua lista de desejos.
                </p>
                <Link to="/login" className="btn btn-primary btnhover">
                  Fazer Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (wishlistLoading) {
    return (
      <div className="page-content">
        <PageTitle parentPage="Loja" childPage="Lista de Desejos" />
        <section className="content-inner-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando sua lista de desejos...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="page-content">
        <PageTitle parentPage="Loja" childPage="Lista de Desejos" />
        <section className="content-inner-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {wishlist.length === 0 ? (
                  <div className="text-center py-5">
                    <h3>Sua lista de desejos está vazia</h3>
                    <p className="mb-4">
                      Adicione produtos à sua lista de desejos para vê-los aqui.
                    </p>
                    <Link to="/books-list-view-sidebar" className="btn btn-primary btnhover">
                      Continuar a Comprar
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4>
                        Minha Lista de Desejos ({wishlistLength}{" "}
                        {wishlistLength === 1 ? "item" : "itens"})
                      </h4>
                    </div>

                    <div className="table-responsive">
                      <table className="table check-tbl">
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th>Nome do Produto</th>
                            <th>Preço Unitário</th>
                            <th>Ação</th>
                            <th>Remover</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist.map((item, index) => (
                            <tr key={item.id || index}>
                              <td className="product-item-img">
                                <img
                                  src={
                                    item.imagem ||
                                    item.image ||
                                    "/placeholder-book.jpg"
                                  }
                                  alt={item.titulo || item.title || "Produto"}
                                  style={{
                                    width: "80px",
                                    height: "100px",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td className="product-item-name">
                                {item.titulo ||
                                  item.title ||
                                  "Produto sem nome"}
                              </td>
                              <td className="product-item-price">
                                {item.priceWithDiscount || "0.00"} €
                              </td>
                              <td className="product-item-totle">
                                <Link
                                  to={`/book-details/${item.product_id || item.id}`}
                                  className="btn btn-primary btnhover"
                                >
                                  Ver Detalhes
                                </Link>
                              </td>
                              <td className="product-item-close">
                                <button
                                  className="btn btn-link text-danger p-0"
                                  onClick={() =>
                                    handleRemoverItem(item.product_id)
                                  }
                                  disabled={removendoItem === item.product_id}
                                  title="Remover da lista de desejos"
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "16px",
                                    cursor:
                                      removendoItem === item.product_id
                                        ? "not-allowed"
                                        : "pointer",
                                    opacity:
                                      removendoItem === item.product_id
                                        ? 0.6
                                        : 1,
                                    transition: "opacity 0.3s ease",
                                  }}
                                >
                                  {removendoItem === item.product_id ? (
                                    <div
                                      className="spinner-border spinner-border-sm text-danger"
                                      role="status"
                                      style={{ width: "16px", height: "16px" }}
                                    >
                                      <span className="visually-hidden">
                                        Removendo...
                                      </span>
                                    </div>
                                  ) : (
                                    <i className="ti-close"></i>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-12 text-center">
                        <Link to="/books-list-view-sidebar" className="btn btn-outline-primary">
                          <i className="fas fa-arrow-left me-2"></i>
                          Continuar a Comprar
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ListaDesejos;
