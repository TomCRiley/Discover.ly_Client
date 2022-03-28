import React from 'react';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      console.log('Logged in');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container full-height-content">
      <h1 className="title">Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email or Username</label>
          <div className="control has-icons-left">
            <input
              type="text"
              className="input"
              placeholder="Email or Username"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <span className="icon is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            <span className="icon is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <button type="submit" className="button is-success">
            Log in
          </button>
        </div>
      </form>
      <br />
      <p className="control">
        <span>Don&apos;t have an account yet? </span>
        <a href="/register">
          <span>Sign up</span>
        </a>
      </p>
    </div>
  );
};

export default Login;
