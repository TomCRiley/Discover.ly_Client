import React from 'react';
import { MapContainer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../api/spots.js';
import presetDefault from '../assets/logos/logo-coloured.png';
import Map from './Map.js';

const CreateSpot = () => {
  const navigate = useNavigate();
  const [imageDisplay, updateImageDisplay] = React.useState(presetDefault);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    location: '',
    activity: '',
    img: `${presetDefault}`,
    lat: '',
    lng: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createSpot(formData);
      console.log('Spot added', data);
      navigate(`/spots/${data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMapChange = (coordinates) => {
    setFormData({ ...formData, lat: coordinates.lat, lng: coordinates.lng });
  };

  console.log('form data', formData);

  // This uploads all information to Cloudinary
  function handleUpload(e) {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.cloudName}`,
          uploadPreset: `${process.env.defaultSpot}`,
          cropping: true,
          croppingAspectRatio: 2,
          multiple: false,
          maxImageFileSize: 5500000,
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setFormData({
            ...formData,
            img: result.info.secure_url,
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
    <section className="container full-height-content">
      <h1 className="title">Add new spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              type="textarea"
              rows="5"
              required
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Location</label>
          <div className="control">
            <input
              className="input"
              name="location"
              type="text"
              placeholder="Location"
              onChange={handleChange}
              value={formData.location}
            />
          </div>
        </div>
        <div className="container mapcontainer">
          <Map className="tile" onChange={handleMapChange} editable={true} />
        </div>

        <div className="field">
          <label className="label">Select an activity</label>
          <div className="control">
            <div className="select">
              <select name="activity" onChange={handleChange}>
                <option value="">Select an activity</option>
                <option value="Running">Running</option>
                <option value="Walking">Walking</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Watersports">Watersports</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Add an image</label>
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <div className="widget">
                  <button className="button" onClick={handleUpload}>
                    Upload
                  </button>
                </div>
                <div className="column is-half">
                  <figure className="image is-3by3 ">
                    <img className="image is-4by4" src={imageDisplay} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="button is-success" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateSpot;
