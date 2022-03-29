import React, { useState } from 'react';
import axios from 'axios';

import presetDefault from '../assets/images/profileDefault.jpg';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [imageDisplay, updateImageDisplay] = useState(presetDefault);
  const [formData, updateFormData] = useState({
    username: '',
    profileImage: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [required, updateRequired] = useState({
    username: '*',
    email: '*',
    password: '*',
    passwordConfirmation: '*',
  });

  const [loginData, updateLoginData] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, updateErrorMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
    updateLoginData({ email: formData.email, password: formData.password });
    updateRequired({ ...required, [name]: '' });
    console.log(formData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData.username.toLowerCase());
      const { data } = await axios.post('/api/register', formData);
      console.log('ALERT This is error after post attempt:', data.message);
      updateErrorMessage(data.message);
    } catch (err) {
      console.log(
        'ALERT This is an error after failing to post ',
        err.response.data.message
      );
    }
    console.log('THIS IS LOGIN DATA', loginData);
    await login(loginData);

    navigate('/');
  }

  // This uploads all information to Cloudinary
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.cloudName}`,
          uploadPreset: `${process.env.default}`,
          cropping: true,
          croppingAspectRatio: 1,
          multiple: false,
          maxImageFileSize: 5500000,
          gravity: 'face',
          buttonCaption: 'Set Profile Picture',
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          updateFormData({
            ...formData,
            profileImage: result.info.secure_url,
          });
          updateImageDisplay(result.info.secure_url);
          console.log(
            'ALERT This is the uploaded picture:',
            result.info.secure_url,
            formData,
            imageDisplay
          );
        }
      )
      .open();
  }

  return (
    <>
      <div className="pageloader ">
        <span className="title">Building your account </span>
      </div>
      <div className="container full-height-content">
        <h1 className="title">Sign-Up</h1>
        <label className="label">Profile Picture</label>
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <div className="widget">
                <button className="button" onClick={handleUpload}>
                  Click to upload a Profile Picture
                </button>
              </div>
              <div className="column is-half">
                <figure className="image is-3by3 ">
                  <img className="is-rounded" src={imageDisplay} />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">
                Username{' '}
                <small className="has-text-danger">{required.username}</small>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder="discoverlyuser"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  name={'username'}
                />

                <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">
                Email{' '}
                <small className="has-text-danger">{required.email}</small>
              </label>

              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder="discoverlyuser@example.com"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  name={'email'}
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
                  className="input"
                  placeholder=""
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  name={'password'}
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">
                Confirm password{' '}
                <small className="has-text-danger">
                  {required.passwordConfirmation}
                </small>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder=""
                  type="password"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  name={'passwordConfirmation'}
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <button className="button is-success" onClick={handleSubmit}>
              Submit
            </button>
            <small className="has-text-danger"> {errorMessage}</small>
          </form>
          <br />
          <p className="control">
            <span>Already have an account? </span>
            <a href="/login">
              <span>Login</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
