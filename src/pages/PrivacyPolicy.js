import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from './../layouts/PageTitle';

function PrivacyPolicy(){
    return(
        <>
            <div className="page-content">
                <PageTitle childPage="Política de Privacidade" parentPage="Páginas" />
                <section className="content-inner-1 shop-account">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left part start --> */}
                            <div className="col-lg-8 col-md-7 col-sm-12 inner-text">
                                <h4 className="title">A Política de Privacidade da nossa livraria foi actualizada em 18 de Julho de 2025.</h4>
                                <p className="m-b30">
                                    A protecção da sua privacidade é uma prioridade fundamental para nós. Esta política de privacidade explica como recolhemos, utilizamos e protegemos as suas informações pessoais quando utiliza os nossos serviços online. Comprometemo-nos a garantir que os seus dados sejam tratados com o máximo cuidado e em conformidade com o Regulamento Geral sobre a Protecção de Dados (RGPD). Para questões específicas sobre privacidade, pode <Link to={"/contact-us"}>contactar-nos</Link> através dos nossos canais oficiais.
                                </p>
                                <div className="dlab-divider bg-gray-dark"></div>
                                
                                <h4 className="title">Quem Somos e o que Esta Política Abrange</h4>
                                <p className="m-b30">
                                    Somos uma livraria online dedicada a fornecer uma vasta selecção de livros e uma experiência de compra segura e agradável. Esta política de privacidade aplica-se a todos os serviços oferecidos através do nosso website, incluindo navegação, compras, criação de conta, newsletter e comunicações. Como empresa sediada em Portugal, cumprimos rigorosamente todas as leis aplicáveis de protecção de dados, incluindo o RGPD e a Lei de Protecção de Dados Pessoais portuguesa. O nosso compromisso é ser transparente sobre como os seus dados são recolhidos e utilizados.
                                </p>
                                
                                <h4 className="title">Que informações pessoais recolhemos</h4>
                                <ul className="list-check primary m-a0">
                                    <li><strong>Dados de registo e conta:</strong> Nome completo, endereço de email, palavra-passe e data de nascimento quando cria uma conta na nossa plataforma.</li>
                                    <li><strong>Informações de entrega e facturação:</strong> Morada completa, número de telefone, código postal e informações de contacto necessárias para processar e entregar os seus pedidos.</li>
                                    <li><strong>Dados de pagamento:</strong> Informações de cartão de crédito/débito ou outros métodos de pagamento, processadas de forma segura através dos nossos parceiros de pagamento certificados.</li>
                                    <li><strong>Histórico de compras:</strong> Detalhes dos livros adquiridos, datas de compra, valores e preferências de leitura para melhorar as nossas recomendações.</li>
                                    <li><strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência no site e cookies para optimizar a sua experiência de utilização.</li>
                                    <li><strong>Comunicações:</strong> Emails, mensagens de chat ou outras comunicações quando nos contacta para apoio ao cliente ou esclarecimentos sobre os nossos serviços.</li>
                                </ul>
                                
                                <div className="dlab-divider bg-gray-dark mt-4 mb-4"></div>
                                
                                <h4 className="title">Como Utilizamos as Suas Informações</h4>
                                <p className="m-b20">As informações recolhidas são utilizadas para os seguintes propósitos legítimos:</p>
                                <ul className="list-check primary m-b30">
                                    <li>Processar e gerir os seus pedidos, incluindo pagamento, envio e apoio pós-venda.</li>
                                    <li>Criar e manter a sua conta pessoal na nossa plataforma.</li>
                                    <li>Fornecer recomendações personalizadas de livros baseadas no seu histórico de compras.</li>
                                    <li>Enviar comunicações importantes sobre os seus pedidos e actualizações do serviço.</li>
                                    <li>Melhorar a funcionalidade e segurança do nosso website.</li>
                                    <li>Cumprir obrigações legais e regulamentares aplicáveis.</li>
                                </ul>
                                
                                <h4 className="title">Partilha de Dados com Terceiros</h4>
                                <p className="m-b20">Podemos partilhar as suas informações nas seguintes circunstâncias limitadas:</p>
                                <ul className="list-check primary m-b30">
                                    <li><strong>Fornecedores de serviços:</strong> Empresas de transporte, processadores de pagamento e prestadores de serviços técnicos essenciais.</li>
                                    <li><strong>Obrigações legais:</strong> Quando exigido por lei, regulamento ou processo judicial válido.</li>
                                    <li><strong>Protecção de direitos:</strong> Para proteger os nossos direitos legais, propriedade ou segurança dos utilizadores.</li>
                                </ul>
                                
                                <h4 className="title">Os Seus Direitos de Protecção de Dados</h4>
                                <p className="m-b20">Sob o RGPD, tem os seguintes direitos em relação aos seus dados pessoais:</p>
                                <ul className="list-check primary m-b30">
                                    <li><strong>Direito de acesso:</strong> Solicitar uma cópia dos dados pessoais que temos sobre si.</li>
                                    <li><strong>Direito de rectificação:</strong> Corrigir dados pessoais inexactos ou incompletos.</li>
                                    <li><strong>Direito ao apagamento:</strong> Solicitar a eliminação dos seus dados pessoais em certas circunstâncias.</li>
                                    <li><strong>Direito à portabilidade:</strong> Receber os seus dados num formato estruturado e legível por máquina.</li>
                                    <li><strong>Direito de oposição:</strong> Opor-se ao processamento dos seus dados para fins de marketing directo.</li>
                                </ul>
                                
                                <h4 className="title">Segurança dos Dados</h4>
                                <p className="m-b30">
                                    Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isto inclui encriptação de dados, firewalls, acesso restrito a informações pessoais e formação regular da nossa equipa sobre protecção de dados. No entanto, nenhum sistema de transmissão pela internet é 100% seguro, pelo que não podemos garantir segurança absoluta.
                                </p>
                                
                                <h4 className="title">Retenção de Dados</h4>
                                <p className="m-b30">
                                    Os seus dados pessoais são conservados apenas pelo tempo necessário para cumprir os propósitos para os quais foram recolhidos, ou conforme exigido por lei. Os dados de conta são mantidos enquanto a conta permanecer activa. Os dados de compras são conservados conforme exigido pelas obrigações fiscais e contabilísticas.
                                </p>
                                
                                <h4 className="title">Cookies e Tecnologias Similares</h4>
                                <p className="m-b30">
                                    Utilizamos cookies e tecnologias similares para melhorar a sua experiência no nosso website. Pode gerir as suas preferências de cookies nas definições do seu navegador. Alguns cookies são essenciais para o funcionamento do site, enquanto outros nos ajudam a analisar o tráfego e personalizar o conteúdo.
                                </p>
                                
                                <h4 className="title">Contacto</h4>
                                <p className="m-b30">
                                    Para exercer os seus direitos de protecção de dados ou esclarecer questões sobre esta política, pode contactar-nos através de:
                                </p>
                                <ul className="list-check primary m-b30">
                                    <li><strong>Email:</strong> loja@pservir.pt</li>
                                    <li><strong>Telefone:</strong> (+351) 219 626 200</li>
                                    <li><strong>Morada:</strong> Rua da Serra 1 Sabugo, 2715-398 Almargem do Bpo.</li>
                                </ul>
                                
                                <p className="m-b30">
                                    <strong>Última actualização:</strong> 18 de Julho de 2025<br/>
                                    Reservamo-nos o direito de actualizar esta política de privacidade periodicamente. As alterações serão comunicadas através do nosso website.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12 m-b30 mt-md-0 mt-4">
                                <aside className="side-bar sticky-top right">
                                    <div className="service_menu_nav widget style-1">
                                        <ul className="menu">
                                            <li className="menu-item"><Link to={"/about-us"}>Sobre Nós</Link></li>
                                            <li className="menu-item active"><Link to={"/privacy-policy"}>Política de Privacidade</Link></li>
                                            <li className="menu-item "><Link to={"/help-desk"}>Centro de Ajuda</Link></li>
                                            <li className="menu-item"><Link to={"/contact-us"}>Contacte-nos</Link></li>
                                        </ul>
                                    </div>
                                    
                                    {/* Widget de Informações RGPD */}
                                    <div className="widget style-1 mt-4">
                                        <div className="widget-title">
                                            <h4 className="title">Os Seus Direitos</h4>
                                        </div>
                                        <div className="widget-content">
                                            <div className="privacy-info">
                                                <div className="privacy-item mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-shield-alt text-primary me-2"></i>
                                                        <span><strong>Dados Protegidos</strong></span>
                                                    </div>
                                                    <small className="text-muted">Cumprimos rigorosamente o RGPD</small>
                                                </div>
                                                <div className="privacy-item mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-eye text-primary me-2"></i>
                                                        <span><strong>Acesso aos Dados</strong></span>
                                                    </div>
                                                    <small className="text-muted">Pode consultar os seus dados a qualquer momento</small>
                                                </div>
                                                <div className="privacy-item mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-edit text-primary me-2"></i>
                                                        <span><strong>Rectificação</strong></span>
                                                    </div>
                                                    <small className="text-muted">Corrija dados incorrectos facilmente</small>
                                                </div>
                                                <div className="privacy-item">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-trash text-primary me-2"></i>
                                                        <span><strong>Apagamento</strong></span>
                                                    </div>
                                                    <small className="text-muted">Solicite a eliminação dos seus dados</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Widget de Contacto para Privacidade */}
                                    <div className="widget style-1 mt-4">
                                        <div className="widget-title">
                                            <h4 className="title">Questões de Privacidade</h4>
                                        </div>
                                        <div className="widget-content">
                                            <p className="mb-3">Tem dúvidas sobre os seus dados pessoais?</p>
                                            <Link to="/contact-us" className="btn btn-primary btn-sm w-100 mb-2">
                                                Contactar-nos
                                            </Link>
                                            <div className="text-center">
                                                <small className="text-muted">
                                                    <i className="fas fa-envelope me-1"></i>
                                                    loja@pservir.pt
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            
            </div>
        </>
    )
}
export default PrivacyPolicy;