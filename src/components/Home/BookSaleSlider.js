import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

import { getallProductsRecemLancados } from "../../api/routes/products/getallProductsRecemLancados";
import { useCart } from "../../context/CartContext";

export default function RecomendedSlider() {
  const [data, setData] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getallProductsRecemLancados();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        className="swiper-container swiper-two"
        speed={1500}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          // Mobile pequeno
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          // Mobile
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          // Tablet pequeno
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Tablet
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          // Desktop pequeno
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          // Desktop médio
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // Desktop grande
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {data &&
          data
            .filter((d) => d.promotion?.promotionId !== 0)
            .map((d, i) => (
              <SwiperSlide key={i}>
                <div
                  className="books-card style-1 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "560px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div
                      className="dz-media position-relative"
                      style={{ height: "320px", overflow: "hidden" }}
                    >
                      <img
                        src={d.image}
                        alt="book"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                      {d.promotion?.promotionId !== 0 && (
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
                          -{d.promotion.discount}
                        </div>
                      )}
                    </div>

                    <div className="dz-content">
                      <ul className="dz-tags" style={{ minHeight: "52px" }}>
                        {d.tags && d.tags.length > 0 ? (
                          d.tags.map((tag, index) => (
                            <li key={index} style={{ display: "inline" }}>
                              <Link to="#">{tag.toUpperCase()}</Link>
                              {index < d.tags.length - 1 && ", "}
                            </li>
                          ))
                        ) : (
                          <li>
                            <Link to="#">Sem Tags</Link>
                          </li>
                        )}
                      </ul>

                      <h4 className="title" style={{ minHeight: "8rem" }}>
                        <Link to={`/book-details/${d.product_id}`}>
                          {d.title}
                        </Link>
                      </h4>

                      {d.author && <span className="author">{d.author}</span>}

                      <div className="price">
                        {d.promotion?.promotionId !== 0 ? (
                          <>
                            <span className="price-num">
                              {d.promotion.priceWithDiscount} € &nbsp;
                            </span>
                            <del className="price-num">{d.price} €</del>
                          </>
                        ) : (
                          <span className="price-num">{d.price} €</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      className="btn btn-secondary btnhover btnhover2 w-100"
                      onClick={() =>
                        addToCart({
                          id: d.product_id,
                          title: d.title,
                          price:
                            d.promotion?.promotionId !== 0
                              ? d.promotion.priceWithDiscount
                              : d.price,
                          image: d.image,
                          number: 1,
                          originalPrice: d.price,
                          discount:
                            d.price -
                            (d.promotion?.promotionId !== 0
                              ? d.promotion.priceWithDiscount
                              : d.price),
                        })
                      }
                    >
                      <i className="flaticon-shopping-cart-1 m-r10"></i>
                      Carrinho
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
