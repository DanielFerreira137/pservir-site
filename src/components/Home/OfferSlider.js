import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
//import "swiper/css";
import { Navigation, Pagination } from "swiper";

//Images

import blog3 from "./../../assets/images/blog/blog5.jpg";
import blog5 from "./../../assets/images/blog/blog6.jpg";
import blog7 from "./../../assets/images/blog/blog7.jpg";
import { getbydiscount } from "../../api/routes/products/getbydiscount";

// import Swiper core and required modules

const dataBlog = [
  { image: blog3, title: "SECONDS [Part I]" },
  { image: blog5, title: "TERRRIBLE MADNESS" },
  { image: blog7, title: "REWORK" },
  { image: blog3, title: "SECONDS [Part I]" },
  { image: blog5, title: "TERRRIBLE MADNESS" },
  { image: blog7, title: "REWORK" },
];

function OfferSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  // const paginationRef = React.useRef(null)
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await getbydiscount();

        setPromotions(response);
     
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <>
      <div className="section-head book-align">
        <h2 className="title mb-0">Promoções Especiais</h2>
        <div className="pagination-align style-1">
          <div
            className="book-button-prev swiper-button-prev"
            ref={navigationPrevRef}
          >
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div
            className="book-button-next swiper-button-next"
            ref={navigationNextRef}
          >
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
      <Swiper
        className="swiper-container  book-swiper"
        // speed= {1500}
        //parallax= {true}
        slidesPerView={3}
        spaceBetween={30}
        //loop={true}
        // pagination= {{
        //     el: ".swiper-pagination-two",
        //     clickable: true,
        // }}
        autoplay={{
          delay: 4000,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        onSwiper={(swiper) => {
          // Se quiser guardar ou fazer debug da instância:
         
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          360: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1680: {
            slidesPerView: 3,
          },
        }}
      >
        {promotions &&
          promotions.map((item, ind) => {
            const discountText = `${item.discount}%`;
            const colors = [
              "#007bff",
              "#28a745",
              "#fd7e14",
              "#6610f2",
              "#6f42c1",
              "#dc3545",
            ];
            const backgroundColor = colors[ind % colors.length];

            return (
              <SwiperSlide key={ind}>
                <div className="dz-card style-2">
                  <div className="dz-media">
                    <Link to="/books-detail">
                      <div
                        className="d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          backgroundColor: backgroundColor,
                          height: "180px",
                          fontSize: "3rem",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem",
                        }}
                      >
                        {discountText}
                      </div>
                    </Link>
                  </div>
                  <div className="dz-info">
                    <h4 className="dz-title">
                      <Link to="/books-detail">{item.title}</Link>
                    </h4>
                    <div className="dz-meta"></div>
                    <p>{item.description}</p>
                    <div className="bookcard-footer">
                      <Link
                        to="/shop-cart"
                        className="btn btn-primary m-t15 btnhover btnhover2"
                      >
                        Explorar
                      </Link>
                      <div className="price-details"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
export default OfferSlider;
