import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './../layouts/PageTitle';
import { useCart } from '../context/CartContext';

function ShopCart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleNumPlus = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, item.number + 1);
    }
  };

  const handleNumMinus = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.number > 1) {
      updateQuantity(id, item.number - 1);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.number * parseFloat(item.price),
    0
  );

  const total = subtotal; // Add shipping/coupon logic if needed
  console.log('Cart Items:', cartItems);
  return (
    <div className="page-content">
      <PageTitle parentPage="Loja" childPage="Carrinho" />
      <section className="content-inner shop-account">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table check-tbl">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Nome do produto</th>
                      <th>Preço unitário</th>
                      <th >Desconto</th>
                      <th>Quantidade</th>
                      <th>Total</th>
                      <th className="text-end">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="6">O carrinho está vazio.</td>
                      </tr>
                    ) : (
                      cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="product-item-img">
                            <img src={item.image} alt={item.title} />
                          </td>
                          <td className="product-item-name">{item.title}</td>
                          <td className="product-item-price">
                            {parseFloat(item.originalPrice).toFixed(2)} €
                          </td>
                          <td className="product-item-price">
                            {parseFloat(item.discount).toFixed(2)} €
                          </td>
                          <td className="product-item-quantity">
                            <div className="quantity btn-quantity style-1 me-3">
                              <button
                                className="btn btn-plus"
                                type="button"
                                onClick={() => handleNumPlus(item.id)}
                              >
                                <i className="ti-plus"></i>
                              </button>
                              <input
                                type="text"
                                className="quantity-input"
                                value={item.number}
                                readOnly
                              />
                              <button
                                className="btn btn-minus"
                                type="button"
                                onClick={() => handleNumMinus(item.id)}
                              >
                                <i className="ti-minus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="product-item-totle">
                            {(item.number * parseFloat(item.price)).toFixed(2)} €
                          </td>
                          
                          <td className="product-item-close">
                            <Link
                              to="#"
                              className="ti-close"
                              onClick={() => removeFromCart(item.id)}
                            ></Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="widget">
                <h4 className="widget-title">Resumo do Pedido</h4>
                <table className="table-bordered check-tbl m-b25">
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>{total.toFixed(2)} €</td>
                    </tr>
                  </tbody>
                </table>
                <div className="form-group m-b25">
                  <Link
                    to="/shop-checkout"
                    className="btn btn-primary btnhover"
                    type="button"
                  >
                    Proceder para Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShopCart;
