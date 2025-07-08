import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "./../assets/images/profile3.jpg";
import { useAuth } from "../context/AuthContext";
import { putCustomer } from "../api/routes/customer/putCustomer";
import sweetAlert from "sweetalert2";

function MyProfile() {
  const { user, logout } = useAuth();
  const [usarMesmoEndereco, setUsarMesmoEndereco] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    pais: "",
    nif: "",
    data_nascimento: "",
    palavra_passe: "",
  });

  const [dadosFaturacao, setDadosFaturacao] = useState({
    faturacao_morada: "",
    faturacao_apartamento: "",
    faturacao_cidade: "",
    faturacao_distrito: "",
    faturacao_codigo_postal: "",
    faturacao_pais: "",
  });

  const [dadosEnvio, setDadosEnvio] = useState({
    envio_morada: "",
    envio_apartamento: "",
    envio_cidade: "",
    envio_distrito: "",
    envio_codigo_postal: "",
    envio_pais: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      nome: user.name || "",
      email: user.email || "",
      telefone: user.phone || "",
      pais: user.country || "",
      nif: user.taxId || "",
      data_nascimento: formatDate(user.dateOfBirth),
      palavra_passe: "",
    });

    // Parse billing address with new detailed format
    const billingParts = user.billingAddress?.split(";") || [];
    setDadosFaturacao({
      faturacao_morada: billingParts[0] || "",
      faturacao_apartamento: billingParts[1] || "",
      faturacao_cidade: billingParts[2] || "",
      faturacao_distrito: billingParts[3] || "",
      faturacao_codigo_postal: billingParts[4] || "",
      faturacao_pais: billingParts[5] || "",
    });

    // Parse shipping address with new detailed format
    const shippingParts = user.shippingAddress?.split(";") || [];
    setDadosEnvio({
      envio_morada: shippingParts[0] || "",
      envio_apartamento: shippingParts[1] || "",
      envio_cidade: shippingParts[2] || "",
      envio_distrito: shippingParts[3] || "",
      envio_codigo_postal: shippingParts[4] || "",
      envio_pais: shippingParts[5] || "",
    });
  }, [user]);

  const copiarEnderecoFaturacao = () => {
    setDadosEnvio({
      envio_morada: dadosFaturacao.faturacao_morada,
      envio_apartamento: dadosFaturacao.faturacao_apartamento,
      envio_cidade: dadosFaturacao.faturacao_cidade,
      envio_distrito: dadosFaturacao.faturacao_distrito,
      envio_codigo_postal: dadosFaturacao.faturacao_codigo_postal,
      envio_pais: dadosFaturacao.faturacao_pais,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billing_address = [
      dadosFaturacao.faturacao_morada,
      dadosFaturacao.faturacao_apartamento,
      dadosFaturacao.faturacao_cidade,
      dadosFaturacao.faturacao_distrito,
      dadosFaturacao.faturacao_codigo_postal,
      dadosFaturacao.faturacao_pais,
    ]
      .filter(Boolean)
      .join(";");

    const shipping_address = usarMesmoEndereco
      ? billing_address
      : [
          dadosEnvio.envio_morada,
          dadosEnvio.envio_apartamento,
          dadosEnvio.envio_cidade,
          dadosEnvio.envio_distrito,
          dadosEnvio.envio_codigo_postal,
          dadosEnvio.envio_pais,
        ]
          .filter(Boolean)
          .join(";");

    const payload = {
      name: form.nome,
      email: form.email,
      phone: form.telefone,
      country: form.pais,
      tax_id: form.nif,
      billing_address,
      shipping_address,
      date_of_birth: form.data_nascimento,
      status: "active",
    };

    try {
      console. log("Atualizando perfil com os seguintes dados:", payload);
      await putCustomer(payload);
      sweetAlert.fire({
        title: "Sucesso!",
        text: "Perfil atualizado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      
    }
  };

  const paginasPerfil = [
    { to: "/shop-order", icons: "flaticon-shopping-cart-1", name: "As Minhas Encomendas" },
    { to: "/wishlist", icons: "far fa-heart", name: "Favoritos" },
    { to: "/help-desk", icons: "far fa-id-card", name: "Ajuda" },
    { to: "/privacy-policy", icons: "fa fa-key", name: "Política de Privacidade" },
    { to: "/shop-login", icons: "fas fa-sign-out-alt", name: "Sair" },
  ];

  // Helper function to format field labels
  const formatLabel = (campo) => {
    return campo
      .replace(/(faturacao_|envio_)/, "")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace("codigo postal", "Código Postal")
      .replace("apartamento", "Apartamento, andar, etc.");
  };

  return (
    <div className="page-content bg-white">
      <div className="content-block">
        <section className="content-inner bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 m-b30">
                <div className="sticky-top">
                  <div className="shop-account">
                    <div className="account-detail text-center">
                      <div className="my-image">
                        <Link to="#">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name
                            )}&size=200&background=0D8ABC&color=fff`}
                            alt={user?.name}
                          />
                        </Link>
                      </div>
                      <div className="account-title">
                        <h4 className="m-b5">
                          <Link to="#">{user?.name}</Link>
                        </h4>
                      </div>
                    </div>
                    <ul className="account-list">
                      <li>
                        <Link to="/my-profile" className="active">
                          <i className="far fa-user"></i>
                          <span>Perfil</span>
                        </Link>
                      </li>
                      {paginasPerfil.map((item, i) => (
                        <li key={i}>
                          <Link to={item.to} onClick={item.to === "/" ? logout : null}>
                            <i className={item.icons}></i>
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-9 col-lg-8 m-b30">
                <div className="shop-bx shop-profile">
                  <div className="shop-bx-title clearfix">
                    <h5 className="text-uppercase">Informações Básicas</h5>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row m-b30">
                      {[
                        { label: "Nome", name: "nome", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Telefone", name: "telefone", type: "text" },
                        { label: "País", name: "pais", type: "text" },
                        { label: "NIF", name: "nif", type: "text" },
                        { label: "Data de Nascimento", name: "data_nascimento", type: "date" },
                      ].map((field, i) => (
                        <div className="col-lg-6 col-md-6" key={i}>
                          <div className="mb-3">
                            <label htmlFor={field.name} className="form-label">
                              {field.label}:
                            </label>
                            <input
                              type={field.type}
                              className="form-control"
                              name={field.name}
                              value={form[field.name]}
                              onChange={(e) =>
                                setForm({ ...form, [field.name]: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="shop-bx-title clearfix">
                      <h5 className="text-uppercase">Endereço de Faturação</h5>
                    </div>
                    <div className="row">
                      {/* Morada - full width */}
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_morada")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_morada"
                            value={dadosFaturacao.faturacao_morada}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_morada: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      
                      {/* Apartamento e Cidade */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_apartamento")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_apartamento"
                            value={dadosFaturacao.faturacao_apartamento}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_apartamento: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_cidade")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_cidade"
                            value={dadosFaturacao.faturacao_cidade}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_cidade: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      
                      {/* Distrito e Código Postal */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_distrito")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_distrito"
                            value={dadosFaturacao.faturacao_distrito}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_distrito: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_codigo_postal")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_codigo_postal"
                            value={dadosFaturacao.faturacao_codigo_postal}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_codigo_postal: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      
                      {/* País */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("faturacao_pais")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="faturacao_pais"
                            value={dadosFaturacao.faturacao_pais}
                            onChange={(e) =>
                              setDadosFaturacao({ ...dadosFaturacao, faturacao_pais: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="mesmoEndereco"
                        checked={usarMesmoEndereco}
                        onChange={(e) => {
                          const ativo = e.target.checked;
                          setUsarMesmoEndereco(ativo);
                          if (ativo) copiarEnderecoFaturacao();
                        }}
                      />
                      <label className="form-check-label" htmlFor="mesmoEndereco">
                        Usar o mesmo endereço para envio
                      </label>
                    </div>

                    <div className="shop-bx-title clearfix mt-4">
                      <h5 className="text-uppercase">Endereço de Envio</h5>
                    </div>
                    <div className="row">
                      {/* Morada - full width */}
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_morada")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_morada"
                            value={dadosEnvio.envio_morada}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_morada: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                      
                      {/* Apartamento e Cidade */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_apartamento")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_apartamento"
                            value={dadosEnvio.envio_apartamento}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_apartamento: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                      
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_cidade")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_cidade"
                            value={dadosEnvio.envio_cidade}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_cidade: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                      
                      {/* Distrito e Código Postal */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_distrito")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_distrito"
                            value={dadosEnvio.envio_distrito}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_distrito: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                      
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_codigo_postal")} *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_codigo_postal"
                            value={dadosEnvio.envio_codigo_postal}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_codigo_postal: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                      
                      {/* País */}
                      <div className="col-lg-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            {formatLabel("envio_pais")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="envio_pais"
                            value={dadosEnvio.envio_pais}
                            onChange={(e) =>
                              setDadosEnvio({ ...dadosEnvio, envio_pais: e.target.value })
                            }
                            disabled={usarMesmoEndereco}
                          />
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-primary btnhover mt-2">Guardar Alterações</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyProfile;