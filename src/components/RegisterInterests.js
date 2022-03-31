import React, { useState } from 'react';
import axios from 'axios';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';
import presetDefault from '../assets/images/profileDefault.jpg';

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
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">One</p>
            <p className="subtitle">Subtitle</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">Two</p>
            <p className="subtitle">Subtitle</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">Three</p>
            <p className="subtitle">Subtitle</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">Four</p>
            <p className="subtitle">Subtitle</p>
          </article>
        </div>
      </div>
      Name TEST TEST
    </>
  );
}
