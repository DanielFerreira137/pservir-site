import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './../layouts/PageTitle';
import { postRegister } from '../api/routes/auth/postRegister';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, phone, dateOfBirth, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    setLoading(true);

    const dataToSend = {
      password,
      email,
      name,
      phone,
      date_of_birth: dateOfBirth,
    };

    try {
      await postRegister(dataToSend);
      setSuccess('Registo efetuado com sucesso!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <PageTitle parentPage="Conta" childPage="Registo" />
      <section className="content-inner shop-account">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="login-area">
                <form onSubmit={handleSubmit}>
                  <h4 className="text-secondary">Registo</h4>
                  <p className="font-weight-600">Se ainda não tens conta, preenche os dados abaixo para te registares.</p>

                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <div className="mb-4">
                    <label className="label-title">Nome completo *</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="O teu nome" type="text" />
                  </div>

                  <div className="mb-4">
                    <label className="label-title">Email *</label>
                    <input name="email" value={formData.email} onChange={handleChange} required className="form-control" placeholder="O teu email" type="email" />
                  </div>

                  <div className="mb-4">
                    <label className="label-title">Telemóvel *</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required className="form-control" placeholder="O teu número de telemóvel" type="text" />
                  </div>

                  <div className="mb-4">
                    <label className="label-title">Data de nascimento *</label>
                    <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="form-control" type="date" />
                  </div>

                  <div className="mb-4">
                    <label className="label-title">Palavra-passe *</label>
                    <input name="password" value={formData.password} onChange={handleChange} required className="form-control" placeholder="Cria uma palavra-passe" type="password" />
                  </div>

                  <div className="mb-4">
                    <label className="label-title">Confirmar palavra-passe *</label>
                    <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="form-control" placeholder="Repete a palavra-passe" type="password" />
                  </div>

                  <div className="mb-4">
                    <small>Os teus dados serão usados apenas para gerir a tua conta neste site, conforme descrito na <Link to="/privacy-policy">política de privacidade</Link>.</small>
                  </div>

                  <button type="submit" className="btn btn-primary btnhover w-100 me-2" disabled={loading}>
                    {loading ? 'A registar...' : 'Registar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
