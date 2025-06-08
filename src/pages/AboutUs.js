import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

import PageTitle from './../layouts/PageTitle';
import TestimonialSlider from './../components/Home/TestimonialSlider';
import ClientsSlider from './../components/Home/ClientsSlider';
import NewsLetter from '../components/NewsLetter';
import CounterSection from './../elements/CounterSection';

import about1 from './../assets/images/about/about1.jpg';
import about2 from './../assets/images/about/about2.png';

const missionBlog = [
    { iconClass: 'flaticon-open-book-1', title: 'Distribuição Global' },
    { iconClass: 'flaticon-exclusive', title: 'Gestão Eficiente' },
    { iconClass: 'flaticon-store', title: 'Transformação Digital' },
];

function SobreNos() {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle parentPage="Início" childPage="Sobre Nós" />
                <section className="content-inner overlay-white-middle">
                    <div className="container">
                        <div className="row about-style1 align-items-center">
                            <div className="col-lg-6 m-b30">
                                <div className="row sp10 about-thumb">
                                    <div className="col-sm-6 aos-item">
                                        <div className="split-box">
                                            <img className="m-b30" src={about1} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="split-box">
                                            <img className="m-b20 aos-item" src={about2} alt="" />
                                        </div>
                                        <div className="exp-bx aos-item">
                                            <div className="exp-head">
                                                <div className="counter-num">
                                                    <h2><span className="counter"><CountUp end={20} /></span><small>+</small></h2>
                                                </div>
                                                <h6 className="title">Anos de Experiência</h6>
                                            </div>
                                            <div className="exp-info">
                                                <ul className="list-check primary">
                                                    <li>Livros e Revistas</li>
                                                    <li>Projetos Educativos</li>
                                                    <li>Plataforma Global</li>
                                                    <li>ONG Humanitária</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 m-b30 aos-item">
                                <div className="about-content px-lg-4">
                                    <div className="section-head style-1">
                                        <h2 className="title">Transformando o Acesso ao Conhecimento</h2>
                                        <p>A Pservir é uma ONG global dedicada à distribuição de livros e revistas, promovendo o conhecimento e a educação. Com foco na transformação digital, estamos a criar uma nova plataforma intuitiva que melhora a experiência do utilizador e centraliza a gestão de encomendas e subscrições.</p>
                                    </div>
                                    <Link to={"/contact-us"} className="btn btn-primary btnhover shadow-primary">Fale Connosco</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content-inner-1 bg-light">
                    <div className="container">
                        <div className="section-head text-center">
                            <h2 className="title">Nossa Missão</h2>
                            <p>Facilitar o acesso à educação e informação através da tecnologia, oferecendo uma experiência de utilizador moderna e uma gestão eficiente das publicações e encomendas.</p>
                        </div>
                        <div className="row">
                            {missionBlog.map((data, i) => (
                                <div className="col-lg-4 col-md-6" key={i}>
                                    <div className="icon-bx-wraper style-3 m-b30">
                                        <div className="icon-lg m-b20">
                                            <i className={`icon-cell ${data.iconClass}`}></i>
                                        </div>
                                        <div className="icon-content">
                                            <h4 className="title">{data.title}</h4>
                                            <p>Estamos a construir uma solução tecnológica sustentável e escalável para transformar a gestão e distribuição de publicações no mundo inteiro.</p>
                                            <Link to={"/sobre-nos"}>Saber Mais <i className="fa-solid fa-angles-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

              {/*  <section className="content-inner bg-light">
                    <div className="container">
                        <div className="row sp15">
                            <CounterSection />
                        </div>
                    </div>
                </section>

                <div className="py-5">
                    <div className="container">
                        <ClientsSlider />
                    </div>
                </div>

                <NewsLetter />*/}
            </div>
        </>
    );
}

export default SobreNos;
