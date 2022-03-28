import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../api/spots.js';

const CreateSpot = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    location: '',
    activity: '',
    img: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createSpot(formData);
      console.log('Spot added', data);
      // navigate(`/spots/${data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('form data', formData);

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
              className="input"
              name="description"
              type="textarea"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
            />
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
          <label className="label">Upload an image</label>
          <input
            className="input"
            name="img"
            type="text"
            placeholder="Upload an image"
            onChange={handleChange}
          />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateSpot;
