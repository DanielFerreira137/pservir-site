import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { getProduct } from "../api/routes/products/getProduct";
import { addWishList } from "../api/routes/customer/addWishList";
import { removeWishList } from "../api/routes/customer/removeWishList";
import { customerWishList } from "../api/routes/customer/customerWishList";
//Component
import ClientsSlider from "../components/Home/ClientsSlider";
import CounterSection from "../elements/CounterSection";
import NewsLetter from "../components/NewsLetter";

//Images
import book16 from "./../assets/images/books/book16.png";
import profile2 from "./../assets/images/profile2.jpg";
import profile4 from "./../assets/images/profile4.jpg";
import profile3 from "./../assets/images/profile3.jpg";
import profile1 from "./../assets/images/profile1.jpg";
//addToCart
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
// Função para buscar produtos relacionados por tags

const getRelatedProducts = async (tags, currentProductId) => {
  if (!tags || tags.length === 0) return [];

  const maxRelated = 3;
  const triedCombinations = new Set();
  let relatedProducts = [];

  const fetchByTags = async (tagsSubset) => {
    const key = tagsSubset.sort().join(",");
    if (triedCombinations.has(key)) return [];
    triedCombinations.add(key);

    const query = encodeURIComponent(tagsSubset.join(","));
    try {
      const response = await fetch(
        `http://localhost:8090/products/filter?tags=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.data.filter(
          (product) => product.product_id !== parseInt(currentProductId)
        );
      }
    } catch (error) {
      console.error("Erro ao buscar produtos relacionados:", error);
    }
    return [];
  };

  // Gera todas as combinações possíveis das tags
  const generateCombinations = (arr) => {
    const result = [];
    const f = (prefix, arr) => {
      for (let i = 0; i < arr.length; i++) {
        const combo = [...prefix, arr[i]];
        result.push(combo);
        f(combo, arr.slice(i + 1));
      }
    };
    f([], arr);
    return result.sort((a, b) => b.length - a.length); // maiores primeiro
  };

  const combinations = generateCombinations(tags);
  for (const combo of combinations) {
    const results = await fetchByTags(combo);
    for (const product of results) {
      if (!relatedProducts.some((p) => p.product_id === product.product_id)) {
        relatedProducts.push(product);
        if (relatedProducts.length === maxRelated) break;
      }
    }
    if (relatedProducts.length === maxRelated) break;
  }

  return relatedProducts.slice(0, maxRelated);
};

// Função para calcular preço original baseado na promoção (se houver)
const calculateOriginalPrice = (price, promotionId) => {
  if (promotionId && promotionId > 0) {
    return price * 1.2; // Assumindo 20% de desconto
  }
  return null;
};

// Função para obter imagem padrão se não houver imagem
const getBookImage = (imageUrl) => {
  return imageUrl || book16;
};

// Função para obter avaliação padrão
const getDefaultRating = () => {
  return Math.floor(Math.random() * 2) + 4; // Rating entre 4.0 e 5.0
};

function CommentBlog({ title, image }) {
  return (
    <>
      <div className="comment-body" id="div-comment-3">
        <div className="comment-author vcard">
          <img src={image} alt="" className="avatar" />
          <cite className="fn">{title}</cite>{" "}
          <span className="says">says:</span>
          <div className="comment-meta">
            <Link to={"#"}>December 28, 2022 at 6:14 am</Link>
          </div>
        </div>
        <div className="comment-content dlab-page-text">
          <p>
            Donec suscipit porta lorem eget condimentum. Morbi vitae mauris in
            leo venenatis varius. Aliquam nunc enim, egestas ac dui in, aliquam
            vulputate erat.
          </p>
        </div>
        <div className="reply">
          <Link to={"#"} className="comment-reply-link">
            <i className="fa fa-reply"></i> Reply
          </Link>
        </div>
      </div>
    </>
  );
}

function ShopDetail() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const { addToCart } = useCart();

  const {
    user,
    isAuthenticated,
    isInWishlist,
    toggleWishlist,
    wishlistLoading,
  } = useAuth();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const bookData = await getProduct(id);
        console.log("Dados do livro:", bookData);
        if (!bookData) {
          setError("Livro não encontrado");
          return;
        }

        // Adapta os dados da API para o formato esperado pelo componente
        const adaptedBook = {
          id: bookData.product_id,
          title: bookData.title,
          author: bookData.author,
          image: getBookImage(bookData.image),
          price: bookData.promotion.priceWithDiscount ? bookData.promotion.priceWithDiscount : bookData.price,
          originalPrice: bookData.promotion.promotionId ? bookData.price : null,
          rating: getDefaultRating(),
          publisher: bookData.publisher,
          year: bookData.year,
          writerImage: profile2,
          writerName: bookData.author,
          description1: bookData.description,
          description2: `Explore as páginas desta obra de ${bookData.author}, publicada em ${bookData.year} pela ${bookData.publisher}.`,
          details: {
            isbn: bookData.ISBN || "Não informado",
            language:
              bookData.language === "pt" ? "Português" : bookData.language,
            format:
              bookData.format ||
              `${bookData.periodicity}, ${bookData.pages || "N/A"} Páginas`,
            datePublished: `${bookData.year}`,
            pages: bookData.pages?.toString() || "N/A",
            lessons: "N/A",
            topics: bookData.tags?.length?.toString() || "N/A",
          },
          tags: bookData.tags || [],
          stock: bookData.stock,
          vatRate: bookData.vat_rate,
        };

        setBook(adaptedBook);
        setError(null);

        // Busca produtos relacionados após carregar o produto principal
        if (adaptedBook.tags && adaptedBook.tags.length > 0) {
          setLoadingRelated(true);
          try {
            const related = await getRelatedProducts(adaptedBook.tags, id);

            // Adapta os produtos relacionados para o formato esperado
            const adaptedRelated = related.map((product) => ({
              id: product.product_id,
              title: product.title,
              author: product.author,
              image: getBookImage(product.image),
              price: product.price,
              originalPrice: calculateOriginalPrice(
                product.price,
                product.promotion?.promotionId
              ),
              tags: product.tags || [],
            }));

            setRelatedBooks(adaptedRelated);
          } catch (relatedError) {
            console.error(
              "Erro ao carregar produtos relacionados:",
              relatedError
            );
            setRelatedBooks([]); // Define array vazio em caso de erro
          } finally {
            setLoadingRelated(false);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
        setError("Erro ao carregar o livro");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <div className="page-content bg-grey">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p>Carregando detalhes do livro...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content bg-grey">
        <div className="container">
          <div className="text-center py-5">
            <h2>Erro</h2>
            <p>{error}</p>
            <Link to="/shop" className="btn btn-primary">
              Voltar à Loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-content bg-grey">
        <div className="container">
          <div className="text-center py-5">
            <h2>Livro não encontrado</h2>
            <Link to="/shop" className="btn btn-primary">
              Voltar à Loja
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const handleWishlistToggle = async () => {
    if (!book) return;

    const result = await toggleWishlist(book.id);
  };
  // Cria array de detalhes do livro dinamicamente
  const tableDetail = [
    { tablehead: "Título", tabledata: book.title },
    { tablehead: "Autor", tabledata: book.author },
    { tablehead: "ISBN", tabledata: book.details.isbn },
    { tablehead: "Língua", tabledata: book.details.language },
    { tablehead: "Formato", tabledata: book.details.format },
    { tablehead: "Data de Publicação", tabledata: book.details.datePublished },
    { tablehead: "Editora", tabledata: book.publisher },
    { tablehead: "Páginas", tabledata: book.details.pages },
    { tablehead: "Capítulos", tabledata: book.details.topics },
  ];

  return (
    <>
      <div className="page-content bg-grey">
        <section className="content-inner-1">
          <div className="container">
            <div className="row book-grid-row style-4 m-b60">
              <div className="col">
                <div className="dz-box">
                  <div className="dz-media">
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{ width: "420px" }}
                    />
                  </div>
                  <div className="dz-content">
                    <div className="dz-header">
                      <h3 className="title">{book.title}</h3>
                      <div className="shop-item-rating">
                        <div className="d-lg-flex d-sm-inline-flex d-flex align-items-center">
                          <h6 className="m-b0"></h6>
                        </div>
                        <div className="social-area"></div>
                      </div>
                    </div>
                    <div className="dz-body">
                      <div className="book-detail">
                        <ul className="book-info">
                          <li>
                            <div className="writer-info">
                              <div>
                                <span>Escrito Por</span>
                                {book.writerName}
                              </div>
                            </div>
                          </li>
                          <li>
                            <span>Editado Por</span>
                            {book.publisher}
                          </li>
                          <li>
                            <span>Ano</span>
                            {book.year}
                          </li>
                        </ul>
                      </div>
                      <p className="text-1">{book.description1}</p>
                      <p className="text-2">{book.description2}</p>
                      <div className="book-footer">
                        <div className="price">
                          <h5>€{book.price}</h5>
                          {book.originalPrice && (
                            <p className="p-lr10">
                              €{book.originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="product-num">
                          <div className="quantity btn-quantity style-1 me-3">
                            <button
                              className="btn btn-plus"
                              type="button"
                              onClick={() => setCount(count + 1)}
                            >
                              <i className="ti-plus"></i>
                            </button>
                            <input
                              className="quantity-input"
                              type="text"
                              value={count}
                              onChange={(e) =>
                                setCount(parseInt(e.target.value) || 0)
                              }
                              name="quantity"
                            />
                            <button
                              className="btn btn-minus"
                              type="button"
                              onClick={() => setCount(Math.max(0, count - 1))}
                            >
                              <i className="ti-minus"></i>
                            </button>
                          </div>
                          <Link
                            className={`btn btn-primary btnhover btnhover2 ${
                              book.stock === 0 ? "disabled" : ""
                            }`}
                            
                            onClick={() => {
                              // Adiciona ao carrinho
                              addToCart({
                                id: book.id,
                                title: book.title,
                                price:book.price,
                                image: book.image,
                                number: 1,
                                originalPrice: book.originalPrice,
                                discount:
                                book.originalPrice - (book.price || 0)
                              });
                            }}
                          >
                            <i className="flaticon-shopping-cart-1"></i>
                            <span>
                              {book.stock > 0
                                ? "Adicionar ao Carrinho"
                                : "Esgotado"}
                            </span>
                          </Link>
                          <div className="bookmark-btn style-1 d-none d-sm-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`flexCheckDefault${book.id}`}
                              checked={isInWishlist(book.id)}
                              disabled={wishlistLoading}
                              onChange={handleWishlistToggle}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckDefault${book.id}`}
                              style={{
                                cursor: wishlistLoading
                                  ? "not-allowed"
                                  : "pointer",
                                opacity: wishlistLoading ? 0.6 : 1,
                                transition: "opacity 0.3s ease",
                              }}
                            >
                              {wishlistLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm text-danger"
                                  role="status"
                                  style={{ width: "16px", height: "16px" }}
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                <i className="flaticon-heart"></i> 
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8">
                <Tab.Container defaultActiveKey="details">
                  <div className="product-description tabs-site-button">
                    <Nav as="ul" className="nav nav-tabs">
                      <Nav.Item as="li">
                        <Nav.Link eventKey="details">Detalhes </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="details">
                        <table className="table border book-overview">
                          <tbody>
                            {tableDetail.map((data, index) => (
                              <tr key={index}>
                                <th>{data.tablehead}</th>
                                <td>{data.tabledata}</td>
                              </tr>
                            ))}
                            <tr>
                              <th>Taxa IVA</th>
                              <td>{book.vatRate}%</td>
                            </tr>
                            <tr className="tags">
                              <th>Categorias</th>
                              <td>
                                {book.tags && book.tags.length > 0 ? (
                                  book.tags.map((tag, index) => (
                                    <Link
                                      key={index}
                                      to={`/books-list-view-sidebar?tags=${tag}`}
                                      className="badge me-1"
                                    >
                                      {tag.toUpperCase()}
                                    </Link>
                                  ))
                                ) : (
                                  <span>Nenhuma tag disponível</span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Tab.Pane>
                      <Tab.Pane eventKey="review">
                        <div className="clear" id="comment-list">
                          <div className="post-comments comments-area style-1 clearfix">
                            <h4 className="comments-title">4 COMMENTS</h4>
                            <div id="comment">
                              <ol className="comment-list">
                                <li
                                  className="comment even thread-even depth-1 comment"
                                  id="comment-2"
                                >
                                  <CommentBlog
                                    title="Michel Poe"
                                    image={profile4}
                                  />
                                  <ol className="children">
                                    <li
                                      className="comment byuser comment-author-w3itexpertsuser bypostauthor odd alt depth-2 comment"
                                      id="comment-3"
                                    >
                                      <CommentBlog
                                        title="Celesto Anderson"
                                        image={profile3}
                                      />
                                    </li>
                                  </ol>
                                </li>
                                <li
                                  className="comment even thread-odd thread-alt depth-1 comment"
                                  id="comment-4"
                                >
                                  <CommentBlog title="Ryan" image={profile2} />
                                </li>
                                <li
                                  className="comment odd alt thread-even depth-1 comment"
                                  id="comment-5"
                                >
                                  <CommentBlog
                                    title="Stuart"
                                    image={profile1}
                                  />
                                </li>
                              </ol>
                            </div>
                            <div
                              className="default-form comment-respond style-1"
                              id="respond"
                            >
                              <h4
                                className="comment-reply-title"
                                id="reply-title"
                              >
                                LEAVE A REPLY
                                <small>
                                  <Link
                                    to={"#"}
                                    rel="nofollow"
                                    id="cancel-comment-reply-link"
                                    style={{ display: "none" }}
                                  >
                                    Cancel reply
                                  </Link>
                                </small>
                              </h4>
                              <div className="clearfix">
                                <form
                                  method="post"
                                  id="comments_form"
                                  className="comment-form"
                                  noValidate
                                >
                                  <p className="comment-form-author">
                                    <input
                                      id="name"
                                      placeholder="Author"
                                      name="author"
                                      type="text"
                                      value=""
                                    />
                                  </p>
                                  <p className="comment-form-email">
                                    <input
                                      id="email"
                                      required="required"
                                      placeholder="Email"
                                      name="email"
                                      type="email"
                                      value=""
                                    />
                                  </p>
                                  <p className="comment-form-comment">
                                    <textarea
                                      id="comments"
                                      placeholder="Type Comment Here"
                                      className="form-control4"
                                      name="comment"
                                      cols="45"
                                      rows="3"
                                      required="required"
                                    ></textarea>
                                  </p>
                                  <p className="col-md-12 col-sm-12 col-xs-12 form-submit">
                                    <button
                                      id="submit"
                                      type="submit"
                                      className="submit btn btn-primary filled"
                                    >
                                      Submit Now{" "}
                                      <i className="fa fa-angle-right m-l10"></i>
                                    </button>
                                  </p>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
              <div className="col-xl-4 mt-5 mt-xl-0">
                <div className="widget">
                  <h4 className="widget-title">Livros Que Podes Gostar</h4>
                  {loadingRelated ? (
                    <div className="text-center py-3">
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Carregando...</span>
                      </div>
                      <small className="d-block mt-2">
                        Carregando sugestões...
                      </small>
                    </div>
                  ) : (
                    <div className="row">
                      {relatedBooks.length > 0 ? (
                        relatedBooks.map((data, index) => (
                          <div className="col-xl-12 col-lg-6" key={index}>
                            <div className="dz-shop-card style-5">
                              <div className="dz-media">
                                <img src={data.image} alt={data.title} />
                              </div>
                              <div className="dz-content">
                                <h5 className="subtitle">{data.title}</h5>
                                <p className="dz-author">por {data.author}</p>
                                <ul className="dz-tags">
                                  {data.tags && data.tags.length > 0 ? (
                                    data.tags
                                      .slice(0, 3)
                                      .map((tag, tagIndex) => (
                                        <li key={tagIndex}>
                                          {tag.toUpperCase()}
                                          {tagIndex <
                                          Math.min(data.tags.length, 3) - 1
                                            ? ","
                                            : ""}
                                        </li>
                                      ))
                                  ) : (
                                    <li>DIVERSOS</li>
                                  )}
                                </ul>

                                <Link
                                  to={`/book-details/${data.id}`}
                                  className="btn btn-outline-primary btn-sm btnhover btnhover2"
                                >
                                  <i className="flaticon-shopping-cart-1 me-2"></i>{" "}
                                  Ver Detalhes
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-3">
                          <p className="text-muted">
                            Nenhum livro relacionado encontrado.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <section className="content-inner">
          <div className="container">
            <div className="row sp15">
             
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}

export default ShopDetail;
