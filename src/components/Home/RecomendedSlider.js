import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

//Images
import book1 from "./../../assets/images/books/grid/book1.jpg";
import book2 from "./../../assets/images/books/grid/book2.jpg";
import book5 from "./../../assets/images/books/grid/book5.jpg";
import book6 from "./../../assets/images/books/grid/book6.jpg";
import book14 from "./../../assets/images/books/grid/book14.jpg";
import book15 from "./../../assets/images/books/grid/book15.jpg";
import book16 from "./../../assets/images/books/grid/book16.jpg";

import { getallProductsRecemLancados } from "../../api/routes/products/getallProductsRecemLancados";

// import Swiper core and required modules
import { Autoplay } from "swiper";

//SwiperCore.use([EffectCoverflow,Pagination]);

const dataBlog = [
  { image: book6, title: "Adventure", price: "$18.78" },
  { image: book5, title: "Take Tango", price: "$20.50" },
  { image: book2, title: "Homie", price: "$25.50" },
  { image: book16, title: "Thunder Stunt", price: "$16.70" },
  { image: book14, title: "Heavy Lift", price: "$19.25" },
  { image: book1, title: "Real Life", price: "$27.30" },
  { image: book15, title: "Terrible", price: "$24.89" },
];

export default function RecomendedSlider() {
  const [data, setData] = useState([]);
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
        className="swiper-container  swiper-two"
        speed={1500}
        //parallax= {true}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay]}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 3,
            centeredSlides: true,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: true,
          },
        }}
      >
        {data &&
          data.map((d, i) => (
            <SwiperSlide key={i}>
              <div
                className="books-card style-1 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "560px", // garante altura mínima igual para todos os cards
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
                        objectFit: "cover",
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
                    <ul className="dz-tags " style={{  minHeight: "52px", }}>
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
                      {d.title}
                    </h4>
                    {d.author && <span className="author">{d.author}</span>}
                    <div className="price">
                      {d.promotion.promotionId !== 0 ? (
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
                {/* Botão sempre em baixo */}
                <div style={{}}>
                  <Link
                    to="/shop-cart"
                    className="btn btn-secondary btnhover btnhover2 w-100"
                  >
                    <i className="flaticon-shopping-cart-1 m-r10"></i>Carrinho
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
