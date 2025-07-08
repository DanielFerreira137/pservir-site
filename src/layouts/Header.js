import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
//images

import logo from "./../assets/images/simbolo_publicadora.png";
import profile from "./../assets/images/profile1.jpg";
import pic1 from "./../assets/images/books/small/pic1.jpg";
import pic2 from "./../assets/images/books/small/pic2.jpg";
import pic3 from "./../assets/images/books/small/pic3.jpg";

import Collapse from "react-bootstrap/Collapse";
import { MenuListArray2 } from "./MenuListArray2";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const { user, isAuthenticated, wishlistLength, logout } = useAuth();

  const { cartItems, removeFromCart } = useCart();
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.number,
    0
  );

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const [selectBtn, setSelectBtn] = useState("Category");
  /* for sticky header */
  const [headerFix, setheaderFix] = React.useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  /* handleSearch */
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector(".header-item-search input");
    if (searchInput && searchInput.value.trim() !== "") {
      const searchQuery = searchInput.value.trim();
      // Redirect to the search results page with the query
      window.location.href = `/books-list-view-sidebar?search=${encodeURIComponent(
        searchQuery
      )}`;
    } else {
      alert("Por favor, insira um termo de pesquisa válido.");
    }
  };
  /* handleSearch End */

  /* for open menu Toggle btn  */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Nova função para fechar a sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
    setActive(""); // Também fecha submenus
  };
  /*  Toggle btn End  */

  useEffect(() => {
    var mainMenu = document.getElementById("OpenMenu");
    if (mainMenu) {
      if (sidebarOpen) {
        mainMenu.classList.add("show");
      } else {
        mainMenu.classList.remove("show");
      }
    }
  });

  // Menu dropdown list
  const [active, setActive] = useState("Home");
  const handleMenuActive = (status) => {
    setActive(status);
    if (active === status) {
      setActive("");
    }
  };
  
  // Função para lidar com clicks em links do menu
  const handleMenuClick = (data) => {
    if (data.content) {
      // Se tem submenu, apenas toggle o submenu
      handleMenuActive(data.title);
    } else {
      // Se não tem submenu, fecha a sidebar
      closeSidebar();
    }
  };

  // Função para lidar com clicks em links do submenu
  const handleSubMenuClick = () => {
    closeSidebar();
  };

  // Função para lidar com logout
  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  // Menu dropdown list End

  return (
    <header className="site-header mo-left header style-1">
      <div className="header-info-bar">
        <div className="container clearfix">
          <div className="logo-header logo-dark">
            <Link to={"/"}>
              <img src={logo} alt="logo" style={{ padding: "10px" }} />
            </Link>
          </div>

          {/* <!-- EXTRA NAV --> */}
          <div className="extra-nav">
            <div className="extra-cell">
              <ul className="navbar-nav header-right">
                <li className="nav-item">
                  <Link
                    to={isAuthenticated() ? "/wishlist" : "/shop-login"}
                    className="nav-link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                    </svg>
                    {isAuthenticated() && (
                      <span className="badge">{wishlistLength || 0}</span>
                    )}
                  </Link>
                </li>
                <Dropdown as="li" className="nav-item">
                  <Dropdown.Toggle
                    as="button"
                    type="button"
                    className="nav-link box cart-btn i-false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                    <span className="badge">{cartItems.length}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu as="ul" className="dropdown-menu cart-list">
                    {cartItems.length === 0 ? (
                      <li className="cart-item text-center py-3">
                        <span className="text-muted">Carrinho vazio</span>
                      </li>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <li className="cart-item" key={item.id}>
                            <div className="media">
                              <div className="media-left">
                                <Link to={`/book-details/${item.id}`}>
                                  <img
                                    alt={item.title}
                                    className="media-object"
                                    src={item.image}
                                    width="40"
                                  />
                                </Link>
                              </div>
                              <div className="media-body">
                                <h6 className="dz-title">
                                  <Link
                                    to={`/book-details/${item.id}`}
                                    className="media-heading"
                                  >
                                    {item.title}
                                  </Link>
                                </h6>
                                <span className="dz-price">
                                  {(item.price * item.number).toFixed(2)} €
                                </span>
                                <span
                                  className="item-close"
                                  style={{
                                    backgroundColor: "#488cd4",
                                    color: "white",
                                    display: "block",
                                    fontSize: "24px",
                                    height: "24px",
                                    lineHeight: "24px",
                                    position: "absolute",
                                    right: "0px",
                                    textAlign: "center",
                                    top: "50%",
                                    width: "24px",
                                    borderRadius: "6px",
                                    fontWeight: "400",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  {item.number}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                        <li className="cart-item text-center">
                          <h6 className="text-secondary">
                            Total = {cartTotal.toFixed(2)} €
                          </h6>
                        </li>
                        <li className="text-center d-flex">
                          <Link
                            to={"/shop-cart"}
                            className="btn btn-sm btn-primary me-2 btnhover w-100"
                          >
                            Ver Carrinho
                          </Link>
                          <Link
                            to={"/shop-checkout"}
                            className="btn btn-sm btn-outline-primary btnhover w-100"
                          >
                            Finalizar Compra
                          </Link>
                        </li>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                {isAuthenticated() ? (
                  <>
                    <Dropdown
                      as="li"
                      className="nav-item dropdown profile-dropdown  ms-4"
                    >
                      <Dropdown.Toggle as="div" className="nav-link i-false">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.name
                          )}&size=200&background=0D8ABC&color=fff`}
                          alt={user?.name}
                        />
                        <div className="profile-info">
                          <h6 className="title">{user?.name}</h6>
                          <span>{user?.email}</span>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu py-0 dropdown-menu-end">
                        <div className="dropdown-header">
                          <h6 className="m-0">{user?.name}</h6>
                          <span>{user?.email}</span>
                        </div>
                        <div className="dropdown-body">
                          <Link
                            to={"/my-profile"}
                            className="dropdown-item d-flex justify-content-between align-items-center ai-icon"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                              <span className="ms-2">Perfil</span>
                            </div>
                          </Link>
                          <Link
                            to={"/shop-order"}
                            className="dropdown-item d-flex justify-content-between align-items-center ai-icon"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                              </svg>
                              <span className="ms-2">As Minhas Encomendas</span>
                            </div>
                          </Link>
                          <Link
                            to={"/wishlist"}
                            className="dropdown-item d-flex justify-content-between align-items-center ai-icon"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                              </svg>
                              <span className="ms-2">Lista de Desejos</span>
                            </div>
                          </Link>
                        </div>
                        <div className="dropdown-footer">
                          <Link
                            onClick={logout}
                            className="btn btn-primary w-100 btnhover btn-sm"
                          >
                            Sair
                          </Link>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/shop-login"}
                      className="btn btn-primary btnhover ms-2"
                    >
                      Aderir
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* <!-- header search nav --> */}
          <div className="header-search-nav" onSubmit={handleSearch}>
            <form className="header-item-search">
              <div className="input-group search-input">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  placeholder="Procura os teus livros aqui"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn" type="button" onClick={handleSearch}>
                  <i className="flaticon-loupe"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`sticky-header main-bar-wraper navbar-expand-lg ${
          headerFix ? "is-fixed" : ""
        }`}
      >
        <div className="main-bar clearfix">
          <div className="container clearfix">
            <div className="logo-header logo-dark">
              <Link to={"#"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>

            {/* <!-- Nav Toggle Button --> */}
            <button
              className={`navbar-toggler collapsed navicon justify-content-end ${
                sidebarOpen ? "open" : ""
              }`}
              onClick={showSidebar}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* <!-- EXTRA NAV --> */}

            {/* <!-- Main Nav --> */}
            <div
              className={`header-nav navbar-collapse collapse justify-content-start ${
                sidebarOpen ? "show" : ""
              }`}
              id="navbarNavDropdown"
            >
              <div className="logo-header logo-dark">
                <Link to={"#"} onClick={closeSidebar}>
                  <img src={logo} alt="" />
                </Link>
              </div>
              <form className="search-input" onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Procura os teu Livros Aqui"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn" type="button">
                    <i className="flaticon-loupe"></i>
                  </button>
                </div>
              </form>
              <ul className="nav navbar-nav">
                {MenuListArray2.map((data, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        active === data.title && data.content
                          ? "sub-menu-down open"
                          : data.content
                          ? "sub-menu-down"
                          : ""
                      } `}
                    >
                      <Link
                        to={data.content ? "#" : data.to}
                        onClick={() => handleMenuClick(data)}
                      >
                        <span>{data.title}</span>
                      </Link>
                      {data.content && (
                        <Collapse in={active === data.title ? true : false}>
                          <ul className="sub-menu">
                            {data.content &&
                              data.content.map((data, index) => {
                                return (
                                  <li key={index}>
                                    <Link to={data.to} onClick={handleSubMenuClick}>
                                      {data.title}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </Collapse>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="d-block d-md-none">
                {" "}
                {/* Mostra apenas no mobile */}
                <ul>
                  <li>
                    <ul className="nav navbar-nav">
                      {isAuthenticated() ? (
                        <li>
                          <Link to={"/my-profile"} onClick={closeSidebar}>
                            Perfil
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link to={"/shop-login"} onClick={closeSidebar}>
                            Entrar
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;