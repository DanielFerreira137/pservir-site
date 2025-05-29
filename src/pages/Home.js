import React from "react";

//Components
import HomeMainSlider from "../components/Home/HomeMainSlider";
import ClientsSlider from "./../components/Home/ClientsSlider";
import RecomendedSlider from "./../components/Home/RecomendedSlider";
import BookSaleSlider from "./../components/Home/BookSaleSlider";
import FeaturedSlider from "./../components/Home/FeaturedSlider";
import OfferSlider from "./../components/Home/OfferSlider";
import TestimonialSlider from "./../components/Home/TestimonialSlider";
import LatestNewsSlider from "./../components/Home/LatestNewsSlider";
import NewsLetter from "./../components/NewsLetter";

//element
import CounterSection from "./../elements/CounterSection";

const iconBlog = [
  { title: "Quick Delivery", iconClass: "flaticon-power" },
  { title: "Secure Payment", iconClass: "flaticon-shield " },
  { title: "Best Quality", iconClass: "flaticon-like" },
  { title: "Return Guarantee", iconClass: "flaticon-star" },
];

function Index1() {
  return (
    <>
      <div className="page-content bg-white">
        <div className="main-slider style-1">
          <HomeMainSlider />
        </div>

        <section className="content-inner-1 bg-grey reccomend">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title">Lançamentos Recentes</h2>
              <p>
                Conheça os títulos mais recentes da nossa livraria,
                cuidadosamente selecionados para enriquecer a sua vida com mais
                conhecimento, inspiração e bem-estar. Descubra novas leituras
                nas áreas de saúde, espiritualidade, educação e muito mais.
              </p>
            </div>
            <RecomendedSlider />
          </div>
        </section>

        <section className="content-inner-2">
          <div className="container">
            <div className="row">
              {iconBlog.map((data, ind) => (
                <div className="col-lg-3 col-sm-6" key={ind}>
                  <div className="icon-bx-wraper style-1 m-b30 text-center">
                    <div className="icon-bx-sm m-b10">
                      <i className={`icon-cell ${data.iconClass}`} />
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-title m-b10">{data.title}</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="content-inner-1">
          <div className="container">
            <BookSaleSlider />
          </div>
        </section>
        <section className="content-inner-">
          <div className="container">
            <OfferSlider />
          </div>
        </section>

        {/*<section className="content-inner-2">
					<div className="container">
						<div className="section-head text-center">
							<h2 className="title">Latest News</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
						</div>
						<LatestNewsSlider />	
					</div>
				</section>	*/}
        <section className="content-inner-2">
          <NewsLetter />
        </section>
      </div>
    </>
  );
}
export default Index1;
