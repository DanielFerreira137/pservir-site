import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Dropdown, Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
//Component
import ClientsSlider from "../components/Home/ClientsSlider";
import NewsLetter from "../components/NewsLetter";

//element
import CounterSection from "../elements/CounterSection";
import ShopSidebar from "../elements/ShopSidebar";
import FunctionalFilters from "./functional_filters_component"; // Importar o componente de filtros

//Images
import book16 from "./../assets/images/books/grid/book16.jpg";
import book12 from "./../assets/images/books/grid/book12.jpg";
//cart
import { useCart } from "../context/CartContext";

function BooksListViewSidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const { addToCart } = useCart();

  const filtersFromURL = {
    categories: searchParams.get("category")?.split(",") || [],
    authors: searchParams.get("author_product")?.split(",") || [],
    tags: searchParams.get("tags")?.split(",") || [],
    publishers: searchParams.get("publisher_product")?.split(",") || [],
    years: searchParams.get("date_product")?.split(",") || [],
    languages: searchParams.get("language")?.split(",") || [],
    price_min: parseFloat(searchParams.get("price_min")) || 0,
    price_max: parseFloat(searchParams.get("price_max")) || 1000,
    promotion_id: searchParams.get("promotion_id") || "",
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 20;

  // Detectar mudanças de tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular páginas
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    console.log("Category parameter:", searchParams.get("category"));

    const fetchProducts = async () => {
      try {
        let data;

        if (!searchParams.get("category")) {
          console.log("No category filter applied, redirecting to books list.");
          const queryString = location.search;
          const response = await fetch(
            process.env.REACT_APP_API + `/products/filter${queryString}`
          );
          data = await response.json();
        } else if (searchParams.get("category") === "mostSold") {
          const response = await fetch(
            process.env.REACT_APP_API + `/products/list/mostSold`
          );
          data = await response.json();
        } else if (searchParams.get("category") === "mostLiked") {
          const response = await fetch(
            process.env.REACT_APP_API + `/products/list/mostLiked`
          );
          data = await response.json();
        } else if (searchParams.get("category") === "opportunities") {
          const response = await fetch(
            process.env.REACT_APP_API + `/products/filter`
          );
          data = await response.json();
          const filteredProducts = data.data.filter(
            (product) =>
              product.promotion && product.promotion.promotionId !== 0
          );
          data.data = filteredProducts;
        }

        console.log("Produtos carregados:", data.data);
        setProducts(data.data);
        setTotalProducts(data.data.length);
        setCurrentPage(1); // Reset para primeira página quando carregar novos produtos
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };

    fetchProducts();
  }, [location.search]);

  const [accordBtn, setAccordBtn] = useState();
  const [selectBtn, setSelectBtn] = useState("Newest");

  // Função para mudar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll para o topo da lista de produtos
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Gerar números das páginas para mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajustar startPage se estivermos no final
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="page-content bg-grey">
        <div className="content-inner-1 border-bottom">
          <div className="container">
            <div className="row ">
              {/* Sidebar Desktop */}
              <div className="col-xl-3 d-none d-xl-block">
                <ShopSidebar
                  initialFilters={filtersFromURL}
                  currentLink="/books-list-view-sidebar"
                />
              </div>

              <div className="col-xl-9">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="title">
                    {searchParams.get("category") === "mostSold"
                      ? "Mais Vendidos"
                      : searchParams.get("category") === "mostLiked"
                      ? "Mais Populares"
                      : searchParams.get("category") === "opportunities"
                      ? "Oportunidades"
                      : searchParams.get("category") === null
                      ? "Todos os Livros"
                      : searchParams.get("category")}
                  </h4>

                  {/* Botão Filter - apenas mobile */}
                  <Button
                    variant="primary"
                    onClick={() => setShowFilters(true)}
                    className="d-xl-none"
                  >
                    <i className="fas fa-filter me-2"></i>
                    Filtros
                  </Button>
                </div>

                <div className="filter-area m-b30">
                  <div className="grid-area">
                    <div className="shop-tab">
                      <ul
                        className="nav text-center product-filter justify-content-end"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            to={
                              searchParams.get("category") != null
                                ? "/books-list-view-sidebar?category=" +
                                  searchParams.get("category")
                                : "/books-list-view-sidebar"
                            }
                            className="nav-link"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 5H21C21.2652 5 21.5196 4.89464 21.7071 4.7071C21.8946 4.51957 22 4.26521 22 4C22 3.73478 21.8946 3.48043 21.7071 3.29289C21.5196 3.10536 21.2652 3 21 3H3C2.73478 3 2.48043 3.10536 2.29289 3.29289C2.10536 3.48043 2 3.73478 2 4C2 4.26521 2.10536 4.51957 2.29289 4.7071C2.48043 4.89464 2.73478 5 3 5Z"
                                fill="#AAAAAA"
                              ></path>
                              <path
                                d="M3 13H21C21.2652 13 21.5196 12.8947 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8947 2.73478 13 3 13Z"
                                fill="#AAAAAA"
                              ></path>
                              <path
                                d="M3 21H21C21.2652 21 21.5196 20.8947 21.7071 20.7071C21.8946 20.5196 22 20.2652 22 20C22 19.7348 21.8946 19.4804 21.7071 19.2929C21.5196 19.1054 21.2652 19 21 19H3C2.73478 19 2.48043 19.1054 2.29289 19.2929C2.10536 19.4804 2 19.7348 2 20C2 20.2652 2.10536 20.5196 2.29289 20.7071C2.48043 20.8947 2.73478 21 3 21Z"
                                fill="#AAAAAA"
                              ></path>
                            </svg>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to={
                              searchParams.get("category") != null
                                ? "/books-grid-view-sidebar?category=" +
                                  searchParams.get("category")
                                : "/books-grid-view-sidebar"
                            }
                            className="nav-link"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11ZM4 4H9V9H4V4Z"
                                fill="#AAAAAA"
                              ></path>
                              <path
                                d="M14 11H21C21.2652 11 21.5196 10.8946 21.7071 10.7071C21.8946 10.5196 22 10.2652 22 10V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2H14C13.7348 2 13.4804 2.10536 13.2929 2.29289C13.1054 2.48043 13 2.73478 13 3V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11ZM15 4H20V9H15V4Z"
                                fill="#AAAAAA"
                              ></path>
                              <path
                                d="M3 22H10C10.2652 22 10.5196 21.8946 10.7071 21.7071C10.8946 21.5196 11 21.2652 11 21V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13H3C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22ZM4 15H9V20H4V15Z"
                                fill="#AAAAAA"
                              ></path>
                              <path
                                d="M14 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V14C22 13.7348 21.8946 13.4804 21.7071 13.2929C21.5196 13.1054 21.2652 13 21 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V21C13 21.2652 13.1054 21.5196 13.2929 21.7071C13.4804 21.8946 13.7348 22 14 22ZM15 15H20V20H15V15Z"
                                fill="#AAAAAA"
                              ></path>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="category">
                    <div className="filter-category"></div>
                  </div>
                </div>
                <Collapse in={accordBtn} className="acod-content">
                  <div>
                    <div className="widget widget_services style-2"></div>
                  </div>
                </Collapse>

                {/* Renderizar apenas os produtos da página atual */}
                {currentProducts &&
                  currentProducts.map((data, i) => (
                    <div key={data.product_id} className="col-md-12 col-sm-12">
                      <div className="dz-shop-card style-2">
                        <div className="dz-media position-relative">
                          <img
                            src={data.image}
                            alt="book"
                            className="w-100 h-100 object-cover"
                          />
                          {data.promotion?.promotionId !== 0 && (
                            <div className="badge text-white position-absolute top-0 start-0 m-2 fw-bold">
                              -{data.promotion.discount}
                            </div>
                          )}
                        </div>

                        <div className="dz-content">
                          <div className="dz-header">
                            <div>
                              <ul className="dz-tags">
                                {data.tags && data.tags.length > 0 ? (
                                  data.tags.map((tag, index) => (
                                    <li key={index}>
                                      <Link to="#">
                                        {tag.toUpperCase()}
                                        {index < data.tags.length - 1 && ","}
                                      </Link>
                                    </li>
                                  ))
                                ) : (
                                  <li>
                                    <Link to={"/books-list"}>No Tags</Link>
                                  </li>
                                )}
                              </ul>
                              <h4 className="title mb-0">
                                <Link to={`/book-details/${data.product_id}`}>
                                  {data.title}
                                </Link>
                              </h4>
                            </div>
                            <div className="price">
                              {data.promotion?.promotionId !== 0 ? (
                                <>
                                  <span className="price-num text-primary">
                                    {data.promotion.priceWithDiscount} €
                                  </span>
                                  <del>{data.price} €</del>
                                </>
                              ) : (
                                <>
                                  <span className="price-num text-primary">
                                    {data.price} €
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="dz-body">
                            <div className="dz-rating-box">
                              <div>
                                <p className="dz-para">
                                  {data.description  ||
                                    "No description available."}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;
                                </p>
                                <div>
                                  {data.promotion?.promotionId !== 0 ? (
                                    <>
                                      <Link
                                        to={"/pricing"}
                                        className="badge me-1"
                                      >
                                        Produto em {data.promotion.discount} de
                                        desconto
                                      </Link>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="review-num"></div>
                            </div>
                            <div className="rate">
                              <ul className="book-info">
                                <li>
                                  <span>Escrito Por</span>
                                  {data.author}
                                </li>
                                <li>
                                  <span>Editado Por</span>
                                  {data.publisher}
                                </li>
                                <li>
                                  <span>Ano</span>
                                  {data.year}
                                </li>
                              </ul>
                              <div className="d-flex">
                                <button
                                  className="btn btn-secondary btnhover btnhover2"
                                  onClick={() => {
                                    // Adiciona ao carrinho
                                    addToCart({
                                      id: data.product_id,
                                      title: data.title,
                                      price:
                                        data.promotion?.promotionId !== 0
                                          ? data.promotion.priceWithDiscount
                                          : data.price,
                                      image: data.image,
                                      number: 1,
                                      originalPrice: data.price,
                                      discount:
                                        data.price -
                                        (data.promotion?.promotionId !== 0
                                          ? data.promotion.priceWithDiscount
                                          : data.price),
                                    });
                                  }}
                                >
                                  <i className="flaticon-shopping-cart-1 me-2"></i>
                                  Carrinho
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Paginação atualizada */}
                <div className="row page">
                  <div className="col-md-6">
                    <p className="page-text">
                      Mostrando {startIndex + 1} a{" "}
                      {Math.min(endIndex, totalProducts)} de {totalProducts}{" "}
                      produtos
                    </p>
                  </div>
                  <div className="col-md-6">
                    <nav aria-label="Blog Pagination">
                      <ul className="pagination style-1 p-t20">
                        {/* Botão Anterior */}
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link prev"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Anterior
                          </button>
                        </li>

                        {/* Primeira página */}
                        {getPageNumbers()[0] > 1 && (
                          <>
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(1)}
                              >
                                1
                              </button>
                            </li>
                            {getPageNumbers()[0] > 2 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                          </>
                        )}

                        {/* Números das páginas */}
                        {getPageNumbers().map((pageNumber) => (
                          <li key={pageNumber} className="page-item">
                            <button
                              className={`page-link ${
                                currentPage === pageNumber ? "active" : ""
                              }`}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </li>
                        ))}

                        {/* Última página */}
                        {getPageNumbers()[getPageNumbers().length - 1] <
                          totalPages && (
                          <>
                            {getPageNumbers()[getPageNumbers().length - 1] <
                              totalPages - 1 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </button>
                            </li>
                          </>
                        )}

                        {/* Botão Próxima */}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link next"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Próxima
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Filtros Mobile */}
      <Modal
        show={showFilters}
        onHide={() => setShowFilters(false)}
        size="lg"
        fullscreen="lg-down"
        className="filters-modal"
      >
        <Modal.Header closeButton className="border-bottom bg-light">
          <Modal.Title>
            <i className="fas fa-filter me-2"></i>
            Filtros de Pesquisa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-0"
          style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          {/* Usar o componente FunctionalFilters importado */}
          <FunctionalFilters
            currentLink="/books-list-view-sidebar"
            onClose={() => setShowFilters(false)}
          />
        </Modal.Body>
      </Modal>

      {/* CSS customizado */}
      <style jsx>{`
        .filters-modal .modal-dialog {
          margin: 0;
        }
        
        @media (max-width: 992px) {
          .filters-modal .modal-dialog {
            width: 100vw;
            max-width: 100vw;
            height: 100vh;
            margin: 0;
          }
          
          .filters-modal .modal-content {
            height: 100vh;
            border-radius: 0;
            border: none;
          }
        }
        }
      `}</style>
    </>
  );
}
export default BooksListViewSidebar;
