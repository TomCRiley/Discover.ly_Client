import React, { useState, useEffect } from 'react';
import axios from 'axios';

// require('dotenv').load();

import 'bulma';

export default function Register({ history }) {
  const [imageDisplay, updateImageDisplay] = useState([]);
  const [button, updateButton] = useState(false);
  const [inputValue, updateInputValue] = useState('');
  const [formData, updateFormData] = useState({
    caption: '',
    url: '',
  });

  // ! Function to fetch all images in our API
  async function fetchImages() {
    try {
      const { data } = await axios.get('/api/imageUpload');
      // ! reversing the data so that the newest images will appear first
      updateImageDisplay(data.reverse());
    } catch (err) {
      console.log(err);
    }
  }
  // fetchImages()

  useEffect(() => {
    fetchImages();
  }, []);

  // ! Function which updates the formData with the caption the user wants to upload.
  function handleChange(e) {
    updateInputValue(e.target.value);
    updateFormData({
      ...formData,
      caption: e.target.value,
    });
  }

  // ! Cloudinary image upload! This is will also update the formData with the url string for the photo
  // ! to be uploaded
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.cloudName}`, //!this will be your cloud name - this should be in your .env
          uploadPreset: `${process.env.default}`, //!this will be your upload presets - this should be in your .env
          cropping: true,
          theme: 'purple',
          // inlinecontainer:
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          updateFormData({
            ...formData,
            url: result.info.secure_url,
          });
        }
      )
      .open();
  }

  // ! Function that submits our formData to our API.
  // ! Will call the fetchImage function & take user back to images
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/imageUpload', formData);
      console.log(data);
      updateButton(!button);
      fetchImages();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Profile Pic Upload</h1>
        {button === true ? (
          <div className="container">
            <button className="button" onClick={() => updateButton(!button)}>
              Back
            </button>
            <button className="button" onClick={handleUpload}>
              Click to upload an image
            </button>
            <textarea
              className="textarea is-primary"
              placeholder="Your caption"
              onChange={handleChange}
              value={inputValue}
            />
            <button className="button" onClick={handleSubmit}>
              Submit and return
            </button>
          </div>
        ) : (
          <div>
            <button className="button" onClick={() => updateButton(!button)}>
              Click here to post a image
            </button>
            {imageDisplay.map((image) => {
              return (
                <div
                  key={image._id}
                  className="column is-one-third-desktop is-half-tablet is-half-mobile"
                >
                  <div className="card">
                    <div className="card-content">
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img src={image.url} />
                        </figure>
                      </div>
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{image.caption}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );

  // const [formData, updateFormData] = React.useState({
  //   username: '',
  //   profileImage: '',
  //   location: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  // });

  // // This is here for Error Display handling for Ui
  // const [errors, updateErrors] = React.useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  // });

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   updateFormData({ ...formData, [name]: value });
  //   updateErrors({ ...errors, [name]: '' });
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post('/api/register', formData);
  //     console.log(data);
  //     history.push('/login');
  //   } catch (err) {
  //     console.log(err.response.data.errors);
  //     updateErrors(err.response.data.errors);
  //   }
  // }

  // return (
  //   <div className="section">
  //     <div>
  //       <label className="label"> TESTING FOR FORM ENTRY </label>
  //       <br />
  //     </div>
  //     <div className="container">
  //       <form onSubmit={handleSubmit}>
  //         <div className="field">
  //           <label className="label">Username</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={formData.username}
  //               onChange={handleChange}
  //               name={'username'}
  //             />
  //             {}
  //             {errors.username && (
  //               <small className="has-text-danger">{errors.username}</small>
  //             )}
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Profile Picture</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={formData.email}
  //               onChange={handleChange}
  //               name={'email'}
  //             />
  //             {}
  //             {errors.email && (
  //               <small className="has-text-danger">{errors.email}</small>
  //             )}
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Email</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={formData.email}
  //               onChange={handleChange}
  //               name={'email'}
  //             />
  //             {}
  //             {errors.email && (
  //               <small className="has-text-danger">{errors.email}</small>
  //             )}
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Password</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="password"
  //               value={formData.password}
  //               onChange={handleChange}
  //               name={'password'}
  //             />
  //             {}
  //             {errors.password && (
  //               <small className="has-text-danger">{errors.password}</small>
  //             )}
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Confirm password</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="password"
  //               value={formData.passwordConfirmation}
  //               onChange={handleChange}
  //               name={'passwordConfirmation'}
  //             />
  //             {}
  //             {errors.passwordConfirmation && (
  //               <small className="has-text-danger">
  //                 {errors.passwordConfirmation}
  //               </small>
  //             )}
  //           </div>
  //         </div>
  //         <button className="button">Submit</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
