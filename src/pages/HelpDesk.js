import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from './../layouts/PageTitle';

function HelpDesk(){
    return(
        <>
            <div className="page-content">
                <PageTitle childPage="Centro de Ajuda" parentPage="Páginas" />
                <div className="section-full content-inner-1 bg-white">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left part start --> */}
                            <div className="col-lg-8 col-md-7 col-sm-12 inner-text">
                                <h2 className="title">Centro de Ajuda</h2>
                                <p className="m-b30">
                                    Bem-vindo ao nosso Centro de Ajuda! Aqui encontrará respostas às questões mais frequentes e informações úteis sobre como utilizar a nossa plataforma de livros. Estamos cá para tornar a sua experiência de leitura o mais agradável possível.
                                </p>
                                
                                <h4 className="title">Como Fazer um Pedido</h4>
                                <p>
                                    Fazer um pedido na nossa livraria é simples e rápido. Navegue pela nossa extensa colecção de livros, adicione os títulos desejados ao carrinho de compras e proceda ao checkout. Aceitamos vários métodos de pagamento seguros, incluindo cartões de crédito, débito e transferência bancária.
                                </p>
                                <p className="m-b30">
                                    Após confirmar o seu pedido, receberá um email de confirmação com todos os detalhes. O tempo de entrega varia entre 2 a 5 dias úteis, dependendo da sua localização.
                                </p>
                                
                                <h4 className="title">Questões Frequentes</h4>
                                <ul className="list-check primary m-b30">
                                    <li>Como posso acompanhar o meu pedido? Utilize o código de rastreamento enviado por email.</li>
                                    <li>Qual é a política de devoluções? Aceitamos devoluções até 30 dias após a entrega.</li>
                                    <li>Os livros estão em bom estado? Todos os nossos livros são cuidadosamente verificados antes do envio.</li>
                                    <li>Fazem entregas ao domicílio? Sim, entregamos em todo o território nacional.</li>
                                    <li>Posso cancelar um pedido? Sim, até 24 horas após a confirmação da compra.</li>
                                    <li>Têm livros noutros idiomas? Sim, temos uma secção dedicada a livros em várias línguas.</li>
                                </ul>
                                
                                <h4 className="title">Gestão da Conta</h4>
                                <p>
                                    Na sua conta pessoal pode gerir as suas informações, consultar o histórico de encomendas, criar listas de desejos e receber recomendações personalizadas baseadas nos seus gostos literários. Para criar uma conta, basta clicar em "Aderir" no topo da página.
                                </p>
                                <p className="m-b30">
                                    Se esqueceu a sua palavra-passe, utilize a opção "Esqueci-me da palavra-passe" na página de login. Enviaremos um link de recuperação para o seu email.
                                </p>
                                
                                <h4 className="title">Apoio ao Cliente</h4>
                                <ul className="list-check primary m-b30">
                                    <li>Email de apoio: loja@pservir.pt - Respondemos em até 24 horas.</li>
                                    <li>Telefone: (+351) 219 626 200 - Disponível de segunda a sexta, das 9h às 18h.</li>
                                    <li>Chat online: Disponível no canto inferior direito durante o horário comercial.</li>
                                    <li>FAQ online: Consulte a nossa secção de questões frequentes para respostas imediatas.</li>
                                    <li>Formulário de contacto: Disponível na página "Contacte-nos" para questões específicas.</li>
                                </ul>
                                
                                <h4 className="title">Problemas Técnicos</h4>
                                <p>
                                    Se encontrar dificuldades técnicas no nosso website, tente primeiro limpar a cache do seu navegador e certifique-se de que tem a versão mais recente. A nossa plataforma está optimizada para funcionar nos principais navegadores: Chrome, Firefox, Safari e Edge.
                                </p>
                                <p className="m-b30">
                                    Para problemas persistentes, contacte o nosso apoio técnico através do email loja@pservir.pt, incluindo detalhes sobre o problema e o navegador que está a utilizar.
                                </p>
                                
                                <h4 className="title">Dicas Úteis</h4>
                                <ul className="list-check primary">
                                    <li>Crie uma lista de desejos para guardar livros que pretende comprar mais tarde.</li>
                                    <li>Subscreva a nossa newsletter para receber ofertas exclusivas e novidades.</li>
                                    <li>Utilize os filtros de pesquisa para encontrar rapidamente o que procura.</li>
                                    <li>Consulte as avaliações de outros leitores antes de fazer a sua escolha.</li>
                                    <li>Aproveite as promoções sazonais e descontos especiais para membros.</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12 m-b30 mt-md-0 mt-4">
                                <aside className="side-bar sticky-top right">
                                    <div className="service_menu_nav widget style-1">
                                        <ul className="menu">
                                            <li className="menu-item"><Link to={"/about-us"}>Sobre Nós</Link></li>
                                            <li className="menu-item"><Link to={"/privacy-policy"}>Política de Privacidade</Link></li>
                                            <li className="menu-item active"><Link to={"/help-desk"}>Centro de Ajuda</Link></li>
                                            <li className="menu-item"><Link to={"/contact-us"}>Contacte-nos</Link></li>
                                        </ul>
                                    </div>
                                    
                                    {/* Widget de Contacto Rápido */}
                                    <div className="widget style-1 mt-4">
                                        <div className="widget-title">
                                            <h4 className="title">Contacto Rápido</h4>
                                        </div>
                                        <div className="widget-content">
                                            <div className="contact-info">
                                                <div className="contact-item d-flex align-items-center mb-3">
                                                    <div className="contact-icon me-3">
                                                        <i className="fas fa-map-marker-alt text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <strong>Morada:</strong><br/>
                                                        Rua da Serra 1 Sabugo<br/>
                                                        2715-398 Almargem do Bpo.
                                                    </div>
                                                </div>
                                                <div className="contact-item d-flex align-items-center mb-3">
                                                    <div className="contact-icon me-3">
                                                        <i className="fas fa-phone text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <strong>Telefone:</strong><br/>
                                                        (+351) 219 626 200
                                                    </div>
                                                </div>
                                                <div className="contact-item d-flex align-items-center mb-3">
                                                    <div className="contact-icon me-3">
                                                        <i className="fas fa-envelope text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <strong>Email:</strong><br/>
                                                        loja@pservir.pt
                                                    </div>
                                                </div>
                                                <div className="contact-item d-flex align-items-center">
                                                    <div className="contact-icon me-3">
                                                        <i className="fas fa-clock text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <strong>Horário:</strong><br/>
                                                        Seg-Sex: 9h-18h
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Widget de Links Úteis */}
                                    <div className="widget style-1 mt-4">
                                        <div className="widget-title">
                                            <h4 className="title">Links Úteis</h4>
                                        </div>
                                        <div className="widget-content">
                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <Link to="/shop-order" className="text-decoration-none">
                                                        <i className="fas fa-box me-2"></i>
                                                        Acompanhar Pedido
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/shop-cart" className="text-decoration-none">
                                                        <i className="fas fa-shopping-cart me-2"></i>
                                                        Carrinho de Compras
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/wishlist" className="text-decoration-none">
                                                        <i className="fas fa-heart me-2"></i>
                                                        Lista de Desejos
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/my-profile" className="text-decoration-none">
                                                        <i className="fas fa-user me-2"></i>
                                                        Minha Conta
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HelpDesk;