import React, { useState } from 'react';
import axios from 'axios';

import 'bulma';
import presetDefault from '../assets/images/profileDefault.jpg';
import { Navigate } from 'react-router-dom';

export default function Register() {
  const [imageDisplay, updateImageDisplay] = useState(presetDefault);
  const [formData, updateFormData] = useState({
    username: '',
    profileImage: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
    updateErrors({ ...errors, [name]: '' });
    console.log(formData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log('trying to register', formData);
      const { data } = await axios.post('/api/register', formData);
      console.log('Registration Sucess', data);
      Navigate('/home');
    } catch (err) {
      window.alert('error');
      console.log('ALERT This is the error ', err.response.data.message);
      // updateErrors(err.response.data.errors);
      // window.alert('error');
    }
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
      <div className='container full-height-content'>
        <h1 className='title'>Sign-Up</h1>
        <label className='label'>Profile Picture</label>
        <div className='container'>
          <div className='columns'>
            <div className='column is-half'>
              <div className='widget'>
                <button className='button' onClick={handleUpload}>
                  Click to upload a Profile Picture
                </button>
              </div>
              <div className='column is-half'>
                <figure className='image is-3by3'>
                  <img src={imageDisplay} />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  type='text'
                  value={formData.username}
                  onChange={handleChange}
                  name={'username'}
                />
                {
                  //  IF errors, display error message. If none, dont display.
                }
                {errors.username && (
                  <small className="has-text-danger">{errors.username}</small>
                )}
                <span className="icon is-left">
                  <i className="fas fa-user"></i>

                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  type='text'
                  value={formData.email}
                  onChange={handleChange}
                  name={'email'}
                />
                <span className='icon is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  name={'password'}
                />
                <span className='icon is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Confirm password</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  name={'passwordConfirmation'}
                />
                <span className='icon is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </div>
            </div>
            <button className='button is-success' onClick={handleSubmit}>
              Submit
            </button>
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
