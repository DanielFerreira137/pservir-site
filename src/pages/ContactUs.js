import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import swal from "sweetalert2";

import PageTitle from './../layouts/PageTitle';
import CounterSection from '../elements/CounterSection';
import NewsLetter from '../components/NewsLetter';

import bg2 from './../assets/images/background/bg2.jpg';

const Contacto = () => {
    const form = useRef();

    const enviarEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_gfykn6i', 'template_iy1pb0b', e.target, 'HccoOtZS6GHw-N-m6')
            .then((result) => {
                console.log(result.text);
                swal('Sucesso!', 'O formulário foi submetido com sucesso.', "success");
            }, (error) => {
                console.log(error.text);
                swal('Erro!', 'Ocorreu um problema ao enviar a mensagem.', "error");
            });
        e.target.reset();
    };

    return (
        <>
            <div className="page-content">
                <PageTitle parentPage="Início" childPage="Contacto" />

                <div className="content-inner-2 pt-0">
                    <div className="map-iframe">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.3938198454994!2d-9.292789623508629!3d38.82344075106345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ed17a99ff9e4b%3A0x82ab0201b9fe13a6!2sPublicadora%20SerVir%2C%20SA!5e0!3m2!1spt-PT!2spt!4v1749411242118!5m2!1spt-PT!2spt" style={{ border: '0', width: '100%', minHeight: '100%', marginBottom: '-8px' }} allowFullScreen></iframe>
                    </div>
                </div>

                <section className="contact-wraper1" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="contact-info">
                                    <div className="section-head text-white style-1">
                                        <h3 className="title text-white">Fale Connosco</h3>
                                        <p>Se estiver interessado em colaborar connosco, entre em contacto.</p>
                                    </div>
                                    <ul className="no-margin">
                                        <li className="icon-bx-wraper text-white left m-b30">
                                            <div className="icon-md">
                                                <span className="icon-cell text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                </span>
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="dz-tilte text-white">A Nossa Morada</h5>
                                                <p>Rua da Serra 1 Sabugo, 2715-398 Almargem do Bpo.</p>
                                            </div>
                                        </li>
                                        <li className="icon-bx-wraper text-white left m-b30">
                                            <div className="icon-md">
                                                <span className="icon-cell text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                </span>
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="dz-tilte text-white">O Nosso Email</h5>
                                                <p>loja@pservir.pt<br /></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-7 m-b40">
                                <div className="contact-area1 m-r20 m-md-r0">
                                    <div className="section-head style-1">
                                        <h6 className="sub-title text-primary">CONTACTO</h6>
                                        <h3 className="title m-b20">Entre em Contacto Connosco</h3>
                                    </div>
                                    <form className="dz-form dzForm" ref={form} onSubmit={enviarEmail}>
                                        <input type="hidden" className="form-control" name="dzToDo" defaultValue="Contacto" />
                                        <div className="dzFormMsg"></div>
                                        <div className="input-group">
                                            <input required type="text" className="form-control" name="dzName" placeholder="Nome Completo" />
                                        </div>
                                        <div className="input-group">
                                            <input required type="text" className="form-control" name="dzEmail" placeholder="Endereço de Email" />
                                        </div>
                                        <div className="input-group">
                                            <input required type="text" className="form-control" name="dzPhoneNumber" placeholder="Telefone" />
                                        </div>
                                        <div className="input-group">
                                            <textarea required name="dzMessage" rows="5" className="form-control" placeholder="Mensagem"></textarea>
                                        </div>
                                        <div>
                                            <button name="submit" type="submit" value="submit" className="btn w-100 btn-primary btnhover">ENVIAR</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
};

export default Contacto;
