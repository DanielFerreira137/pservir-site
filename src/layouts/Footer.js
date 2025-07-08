import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function heartToggle() {
	var heartBlaste = document.querySelector('.heart');
	if (heartBlaste) {
		heartBlaste.classList.toggle("heart-blast");
	}
}

function Footer({ footerChange, logoImage }) {
	const d = new Date();
	const [accordBtn, setAccordBtn] = useState();

	return (
		<>
			<footer className={`site-footer ${footerChange}`}>
				<div className="footer-top">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
								<div className="widget widget_about">
									<div className="footer-logo logo-white">
										<Link to={"/"}><img src={logoImage} alt="Pservir Logo" /></Link>
									</div>
									<p className="text">A Pservir é uma organização global dedicada à distribuição de livros e revistas com foco na transformação digital e na experiência do utilizador.</p>
									<div className="dz-social-icon style-1">
										<ul>
											<li><a href="https://www.facebook.com/pservir" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
											<li><a href="https://www.instagram.com/pservir" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
											
										</ul>
									</div>
								</div>
							</div>

							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 wow fadeInUp" data-wow-delay="0.2s">
								<div className="widget widget_services">
									<h5 className="footer-title">Ligações</h5>
									<ul>
										<li><Link to={"/about-us"}>Sobre Nós</Link></li>
										<li><Link to={"/contact-us"}>Contactos</Link></li>
										<li><Link to={"/privacy-policy"}>Política de Privacidade</Link></li>
										
									</ul>
								</div>
							</div>

							<div className="col-xl-2 col-lg-3 col-sm-4 col-6 wow fadeInUp" data-wow-delay="0.3s">
								<div className="widget widget_services">
									<h5 className="footer-title">Serviços</h5>
									<ul>
										<li><Link to={"/books-list-view-sidebar"}>Livros Em Destaque</Link></li>
										<li><Link to={"/books-grid-view-sidebar?category=mostSold"}>Livros Mais Vendidos</Link></li>
										<li><Link to={"/books-grid-view-sidebar?category=mostLiked"}>Livros Populares</Link></li>
									</ul>
								</div>
							</div>

							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 wow fadeInUp" data-wow-delay="0.4s">
								<div className="widget widget_services">
									<h5 className="footer-title">Recursos</h5>
									<ul>
										<li><Link to={"/shop-cart"}>Carrinho</Link></li>
										<li><Link to={"/shop-login"}>Login</Link></li>
										<li><Link to={"/shop-registration"}>Registar</Link></li>
									</ul>
								</div>
							</div>

							<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 wow fadeInUp" data-wow-delay="0.5s">
								<div className="widget widget_getintuch">
									<h5 className="footer-title">Contacte-nos</h5>
									<ul>
										<li>
											<i className="flaticon-placeholder"></i>
											<span>Rua da Serra 1 Sabugo, 2715-398 Almargem do Bpo.</span>
										</li>
										<li>
											<i className="flaticon-phone"></i>
											<span>(+351) 219 626 200 <br />
											(rede fixa nacional)</span>
										</li>
										<li>
											<i className="flaticon-email"></i>
											<span>loja@pservir.pt</span>
										</li>
									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>

				<div className="footer-bottom">
					<div className="container">
						<div className="row fb-inner">
							<div className="col-lg-6 col-md-12 text-start">
								<p className="copyright-text">Pservir © {d.getFullYear()} Todos os direitos reservados</p>
							</div>
							
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
