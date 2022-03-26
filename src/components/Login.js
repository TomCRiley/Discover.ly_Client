import React from 'react';
import { login } from '../api/auth.js';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const { data } = await login(formData);
        console.log('logged in', data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };

  return (
    <div className="container full-height-content">
      <h1 className="title">Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email or Username</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Email or Username"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
        </div>

        <div className="field">
          <button type="submit" className="button">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
