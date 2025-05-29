import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { getallProductsOrderPrice } from "../../api/routes/products/getallProductsOrderPrice";
// Import Swiper styles
// import "swiper/css";

// Images
import book3 from "./../../assets/images/books/grid/book3.jpg";
import book5 from "./../../assets/images/books/grid/book5.jpg";
import book7 from "./../../assets/images/books/grid/book7.jpg";
import book11 from "./../../assets/images/books/grid/book11.jpg";
import book12 from "./../../assets/images/books/grid/book12.jpg";
import book15 from "./../../assets/images/books/grid/book15.jpg";

const dataBlog = [
  { image: book5, title: "Take Out Tango" },
  { image: book11, title: "The Missadventure" },
  { image: book7, title: "Seconds [PART 1]" },
  { image: book12, title: "The Missadventure" },
  { image: book15, title: "Terrible Madness" },
  { image: book3, title: "Battle Drive" },
];

function BookSaleSlider() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getallProductsOrderPrice();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="section-head book-align">
        <h2 className="title mb-0">Livros em Promoção</h2>
        <div className="pagination-align style-1">
          <div className="swiper-button-prev" ref={navigationPrevRef}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className="swiper-pagination-two" ref={paginationRef}></div>
          <div className="swiper-button-next" ref={navigationNextRef}>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
      <Swiper
        className="swiper-container books-wrapper-3 swiper-four"
        speed={1500}
        parallax={true}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        pagination={{
          el: ".swiper-pagination-two",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
        }}
        modules={[Navigation, Pagination]}
      >
        {data &&
          data
            .filter((item) => item.promotion?.promotionId !== 0)
            .map((item, ind) => (
              <SwiperSlide key={ind}>
                <div
                  className="books-card style-3 d-flex flex-column wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{
                    height: "100%",
                    minHeight: "540px", // altura total igual entre cards
                  }}
                >
                  <div className="dz-media position-relative">
                    <img
                      src={item.image}
                      alt="book"
                      style={{
                        height: "320px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div
                      className="badge text-white"
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        padding: "5px 10px",
                        fontSize: "0.8rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      -{item.promotion.discount}
                    </div>
                  </div>

                  <div className="dz-content d-flex flex-column flex-grow-1">
                  <ul className="dz-tags mb-2">
                      {item.tags && item.tags.length > 0 ? (
                        item.tags.map((tag, index) => (
                          <li key={index}>
                            <Link to="#">
                              {tag.toUpperCase()}
                              {index < item.tags.length - 1 && ","}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <Link to="#">Sem Tags</Link>
                        </li>
                      )}
                    </ul>
                    <h5 className="title">
                      <Link to="/books-grid-view">{item.title}</Link>
                    </h5>

                   

                    <div className="book-footer mt-auto d-flex justify-content-between align-items-end">
                      <div className="rate">
                        <Link
                          to="/shop-cart"
                          className="btn btn-secondary btnhover btnhover2 w-100"
                        >
                          <i className="flaticon-shopping-cart-1 m-r10"></i>
                          Carrinho
                        </Link>
                      </div>
                      <div className="price text-end">
                        <span className="price-num fw-bold text-primary">
                          {item.promotion.priceWithDiscount} €
                        </span>
                        <br />
                        <del>{item.price} €</del>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}

export default BookSaleSlider;
