import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [buildUserAnimation, updateBuildUserAnimation] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, updateErrorMessage] = React.useState('');

  const [required, updateRequired] = React.useState({
    email: '*',
    password: '*',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateRequired({ ...required, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await login(formData);
      // console.log('Logged in');

      // setTimeout(() => {
      //   console.log('Timeout');
      //   navigate('/');
      // }, 2000);
      const data = await login(formData);
      updateErrorMessage(data.message);
      if (data.message === 'success') {
        updateBuildUserAnimation(
          <div className="pageloader is-active ">
            <span className="title">
              Welcome back {formData.email}! <br /> Getting your profile
              <br />
            </span>
          </div>
        );
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="has-background-info full-height-content is-justify-content-center is-flex is-align-items-center">
      <div className="box is-rounded p-6">
        <h1 className="title">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">
              Email or Username{' '}
              <small className="has-text-danger">{required.email}</small>
            </label>
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
            <label className="label">
              Password{' '}
              <small className="has-text-danger">{required.password}</small>
            </label>
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
            <button type="submit" className="button is-warning">
              Log in
            </button>
            <small className="has-text-danger"> {errorMessage}</small>
          </div>
        </form>
        <br />
        <p className="control">
          <span>Don&apos;t have an account yet? </span>
          <Link to="/register">
            <span>Sign up</span>
          </Link>
        </p>
      </div>
      {buildUserAnimation}
    </div>
  );
};

export default Login;
