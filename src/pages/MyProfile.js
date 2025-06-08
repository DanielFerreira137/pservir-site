import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "./../assets/images/profile3.jpg";
import { useAuth } from "../context/AuthContext";
import { putCustomer } from "../api/routes/customer/putCustomer";

function MyProfile() {
  const { user,logout } = useAuth();
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
    faturacao_rua: "",
    faturacao_cidade: "",
    faturacao_codigo_postal: "",
    faturacao_pais: "",
  });

  const [dadosEnvio, setDadosEnvio] = useState({
    envio_rua: "",
    envio_cidade: "",
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

    const billingParts = user.billingAddress?.split(";") || [];
    const shippingParts = user.shippingAddress?.split(";") || [];

    setDadosFaturacao({
      faturacao_rua: billingParts[0] || "",
      faturacao_cidade: billingParts[1] || "",
      faturacao_codigo_postal: billingParts[2] || "",
      faturacao_pais: billingParts[3] || "",
    });

    setDadosEnvio({
      envio_rua: shippingParts[0] || "",
      envio_cidade: shippingParts[1] || "",
      envio_codigo_postal: shippingParts[2] || "",
      envio_pais: shippingParts[3] || "",
    });
  }, [user]);

  const copiarEnderecoFaturacao = () => {
    setDadosEnvio({
      envio_rua: dadosFaturacao.faturacao_rua,
      envio_cidade: dadosFaturacao.faturacao_cidade,
      envio_codigo_postal: dadosFaturacao.faturacao_codigo_postal,
      envio_pais: dadosFaturacao.faturacao_pais,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billing_address = [
      dadosFaturacao.faturacao_rua,
      dadosFaturacao.faturacao_cidade,
      dadosFaturacao.faturacao_codigo_postal,
      dadosFaturacao.faturacao_pais,
    ]
      .filter(Boolean)
      .join(";");

    const shipping_address = usarMesmoEndereco
      ? billing_address
      : [
          dadosEnvio.envio_rua,
          dadosEnvio.envio_cidade,
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
      password: form.palavra_passe,
      billing_address,
      shipping_address,
      date_of_birth: form.data_nascimento,
      status: "active",
    };

    try {
      await putCustomer(payload);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert(err.message || "Erro ao atualizar perfil");
    }
  };

  const paginasPerfil = [
    { to: "/shop-cart", icons: "flaticon-shopping-cart-1", name: "Meu Carrinho" },
    { to: "/wishlist", icons: "far fa-heart", name: "Favoritos" },
    { to: "/help-desk", icons: "far fa-id-card", name: "Ajuda" },
    { to: "/privacy-policy", icons: "fa fa-key", name: "Política de Privacidade" },
    { to: "/shop-login", icons: "fas fa-sign-out-alt", name: "Sair" },
  ];

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
                      {["faturacao_rua", "faturacao_cidade", "faturacao_codigo_postal", "faturacao_pais"].map((campo) => (
                        <div className="col-lg-6 col-md-6" key={campo}>
                          <div className="mb-3">
                            <label className="form-label">
                              {campo.replace("faturacao_", "").replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name={campo}
                              value={dadosFaturacao[campo]}
                              onChange={(e) =>
                                setDadosFaturacao({ ...dadosFaturacao, [campo]: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      ))}
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
                      {["envio_rua", "envio_cidade", "envio_codigo_postal", "envio_pais"].map((campo) => (
                        <div className="col-lg-6 col-md-6" key={campo}>
                          <div className="mb-3">
                            <label className="form-label">
                              {campo.replace("envio_", "").replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name={campo}
                              value={dadosEnvio[campo]}
                              onChange={(e) =>
                                setDadosEnvio({ ...dadosEnvio, [campo]: e.target.value })
                              }
                              disabled={usarMesmoEndereco}
                            />
                          </div>
                        </div>
                      ))}
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
