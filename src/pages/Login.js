import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import PageTitle from './../layouts/PageTitle';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [forgotPass, setForgotPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/auth/login', { email, password });

      const { token, ...user } = response.data;

      if (user && token) {
        login(user, token);
        setSuccess(`Bem-vindo!`);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setError('Erro inesperado ao fazer login.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <PageTitle parentPage="Shop" childPage="Login" />
      <section className="content-inner shop-account">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="login-area">
                <h4>Novo Cliente</h4>
                <p>Ao criar uma conta na nossa loja, poderá concluir as suas compras de forma mais rápida, acompanhar o status dos seus pedidos e guardar os seus dados para futuras compras com mais comodidade.</p>
                <Link to="/shop-registration" className="btn btn-primary btnhover m-r5 button-lg radius-no">
                  Criar Uma Conta
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-4">
              <div className="login-area">
                <form onSubmit={handleLogin} className={`col-12 ${forgotPass ? 'd-none' : ''}`}>
                  <h4 className="text-secondary">LOGIN</h4>
                  <p className="font-weight-600">Se tem uma conta connosco, inicie sessão.</p>
                  {error && <div className="alert alert-danger mb-3">{error}</div>}
                  {success && <div className="alert alert-success mb-3">{success}</div>}

                  <div className="mb-4">
                    <label className="label-title">Email *</label>
                    <input name="email" required className="form-control" placeholder="Seu Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="label-title">PALAVRA-PASSE *</label>
                    <input name="password" required className="form-control" placeholder="Sua Palavra-Passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="text-left">
                    <button type="submit" className="btn btn-primary btnhover me-2" disabled={loading}>
                      {loading ? 'Loading...' : 'Login'}
                    </button>
                    <Link to="#" className="m-l5" onClick={() => setForgotPass(!forgotPass)}>
                      <i className="fas fa-unlock-alt"></i> Esqueceu a Palavra-Passe?
                    </Link>
                  </div>
                
                </form>

                <form onSubmit={(e) => e.preventDefault()} className={`col-12 ${forgotPass ? '' : 'd-none'}`}>
                  <h4 className="text-secondary">FORGET PASSWORD ?</h4>
                  <p className="font-weight-600">We will send you an email to reset your password.</p>
                  <div className="mb-3">
                    <label className="label-title">E-MAIL *</label>
                    <input name="dzName" required className="form-control" placeholder="Your Email Id" type="email" />
                  </div>
                  <div className="text-left">
                    <Link to="#" className="btn btn-outline-secondary btnhover m-r10 active" onClick={() => setForgotPass(false)}>
                      Back
                    </Link>
                    <button type="submit" className="btn btn-primary btnhover">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
