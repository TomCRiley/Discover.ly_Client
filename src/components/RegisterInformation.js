import React, { useState, Component } from 'react';
import axios from 'axios';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';
import presetDefault from '../assets/images/profileDefault.jpg';
import RegisterInterests from './RegisterInterests.js';

export default function Register() {
  const navigate = useNavigate();
  const [imageDisplay, updateImageDisplay] = useState(presetDefault);
  const [buildUserAnimation, updateBuildUserAnimation] = useState('');
  const [errorMessage, updateErrorMessage] = useState('');

  const [formData, updateFormData] = useState({
    username: '',
    profileImage: `${presetDefault}`,
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

  function handleChange(e) {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
    updateLoginData({ email: formData.email, password: formData.password });
    updateRequired({ ...required, [name]: '' });
    console.log(formData);
  }

  async function handleSubmit(e, next) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/register', formData);
      updateErrorMessage(data.message);
      if (data.message === 'success') {
        updateBuildUserAnimation(
          <div className="pageloader is-active ">
            <span className="title">
              Hey {formData.username}! <br />
              Creating your profile
            </span>
          </div>
        );
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    } catch (err) {
      next();
    }
    await login(loginData);
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
          croppingShowBackButton: false,
          showPoweredBy: false,
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
      <ul className="steps">
        <li className="steps-segment">
          <span className="steps-marker">
            <span className="icon">
              <i className="fa fa-heart"></i>
            </span>
          </span>
        </li>
        <li className="steps-segment is-active">
          <span className="steps-marker">
            <span className="icon">
              <i className="fa fa-circle-info"></i>
            </span>
          </span>
        </li>
        <li className="steps-segment">
          <span className="steps-marker">
            <span className="icon">
              <i className="fa fa-circle-check"></i>
            </span>
          </span>
        </li>
      </ul>

      <div className="container full-height-content">
        <h1 className="title">Sign-Up</h1>
        <label className="label">Add a profile picture</label>
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <div className="widget">
                <button className="button" onClick={handleUpload}>
                  Upload
                </button>
              </div>
              <div className="column is-half">
                <figure className="image is-128x128 ">
                  <img className="is-rounded " src={imageDisplay} />
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
          {buildUserAnimation}
        </div>
      </div>
    </>
  );
}
