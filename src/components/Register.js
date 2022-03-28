import React, { useState } from 'react';
import axios from 'axios';
import 'bulma';
import presetDefault from '../assets/images/profileDefault.jpg';

export default function Register({ history }) {
  const [imageDisplay, updateImageDisplay] = useState(presetDefault);
  const [formData, updateFormData] = useState({
    username: '',
    profileImage: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/register', formData);

      history.push('/Login'); //Change this to redirect to wherever - homepage?, success?, login?
      console.log('Registration Sucess', data);
    } catch (err) {
      console.log('ALERT, Something went wrong when submitting', err);
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
          showCompletedButton: true,
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
                <figure className="image is-3by3">
                  <img src={imageDisplay} />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
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
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  className="input"
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
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
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
              <label className="label">Confirm password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
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
          </form>
        </div>
      </div>
    </>
  );
}
