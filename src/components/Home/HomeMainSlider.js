import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

//Images
import bgwave from "./../../assets/images/background/waveelement.png";
import partner1 from "./../../assets/images/partner/partner-1.png";
import partner2 from "./../../assets/images/partner/partner-2.png";
import partner3 from "./../../assets/images/partner/partner-3.png";
import group from "./../../assets/images/Group.png";
import media1 from "./../../assets/images/banner/banner-media.png";
import media2 from "./../../assets/images/banner/banner-media2.png";
import book16 from "./../../assets/images/books/book16.png";
import book9 from "./../../assets/images/books/grid/book9.jpg";
import { getbydiscount } from "../../api/routes/products/getbydiscount";
import { getallProducts } from "../../api/routes/products/getallProducts";
//import { EffectFade, Autoplay , Parallax, Pagination} from "swiper";

import SwiperCore, {
  EffectFade,
  Autoplay,
  FreeMode,
  Parallax,
  Thumbs,
  Pagination,
} from "swiper";
SwiperCore.use([Parallax, Thumbs, FreeMode, Autoplay, Pagination, EffectFade]);

export default function HomeMainSlider() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getallProducts();
        setProducts(data.data);
        
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);
  const homeData1 = [
    {
      image: media2,
      title: "Bem-vindo à nossa livraria online",
    },
  ];

  const homeData2 = [
    { image: book16, title: "Pushing Clouds", price: "9.5" },
    { image: book9, title: "Think and Grow Rich", price: "10.4" },
    { image: book16, title: "Pushing Clouds", price: "9.5" },
    { image: book9, title: "Think and Grow Rich", price: "10.4" },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const paginationRef = React.useRef(null);
  return (
    <>
      <Swiper
        className="swiper-container main-swiper "
        speed={1500}
        parallax={true}
        //spaceBetween= {10}
        //freeMode={true}
        effect={"fade"}
        slidesPerView={"auto"}
        loop={false}
        //watchSlidesProgress= {true}
        pagination={{
          el: ".swiper-pagination-five",
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Autoplay, Pagination, Parallax]}
      >
        {homeData1.map((data, index) => (
          <SwiperSlide
            className="bg-blue"
            key={index}
            style={{ backgroundColor: `url(${bgwave})` }}
          >
            <div className="container">
              <div className="banner-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="swiper-content">
                      <div className="content-info">
                        <h6 className="sub-title" data-swiper-parallax="-10">
                          {data.datatitle}
                        </h6>
                        <h1 className="title mb-0" data-swiper-parallax="-20">
                          {data.title}
                        </h1>

                        <p className="text mb-0" data-swiper-parallax="-20">
                          Aqui encontrará uma seleção cuidada de livros que
                          promovem o conhecimento, a saúde e o bem-estar da sua
                          família. Com temas que vão da saúde ao estilo de vida,
                          da educação à espiritualidade, cada obra foi escolhida
                          para inspirar e enriquecer o seu dia a dia.
                        </p>
                        <div className="price" data-swiper-parallax="-50">
                          Publicadora SerVir — a pensar em si, todos os dias.
                        </div>
                        <div className="content-btn" data-swiper-parallax="-60">
                          <Link
                            className="btn btn-primary btnhover"
                            to={"/books-list-view-sidebar"}
                          >
                            Descobrir Livros
                          </Link>
                          <Link
                            className="btn border btnhover ms-4 text-white"
                            to={"/about-us"}
                          >
                            Sobre Nós
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="banner-media" data-swiper-parallax="-100">
                      <img src={data.image} alt="banner-media" />
                    </div>
                    <img
                      className="pattern"
                      src={group}
                      data-swiper-parallax="-100"
                      alt="dots"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="container swiper-pagination-wrapper">
          <div className="swiper-pagination-five" ref={paginationRef}></div>
        </div>
      </Swiper>

      <div
        ref={paginationRef}
        className="swiper-pagination-about about-pagination swiper-pagination-clickable swiper-pagination-bullets"
      ></div>

      <Swiper
        className="swiper-container main-swiper-thumb"
        //onSwiper={(e)=>console.log(e.swiper)}

        spaceBetween={10}
        slidesPerView={2}
        //slidesPerView= {"auto"}
        //slidesPerView= {1}
        loop={true}
        speed={1500}
        //freeMode={true}
        //effect={"fade"}
        watchSlidesProgress={true}
        autoplay={{
          delay: 2800,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
      >
        {products &&
          products.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="books-card">
                <div className="dz-media">
                  <img src={data.image} alt="book" />
                </div>
                <div className="dz-content">
                  <h5 className="title mb-0">{data.title}</h5>
                  <div className="dz-meta">
                    <ul>
                      <li>{data.author}</li>
                    </ul>
                  </div>
                  <div className="book-footer">
                    <div className="price">
                      {data.promotion.promotionId !== 0 ? (
                        <>
                          <span className="price-num">
                            {data.promotion.priceWithDiscount} €
                          </span>
                          &nbsp;
                          <del className="price-num-old">{data.price} €</del>
                        </>
                      ) : (
                        <span className="price-num">{data.price} €</span>
                      )}
                    </div>

                    <div className="book-btn">
                      <Link
                        to={`/books-detail/${data._id}`}
                        className="btn btn-primary btnhover"
                      >
                        Ver Detalhes
                      </Link>
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
