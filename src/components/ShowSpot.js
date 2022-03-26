import React from 'react';
import { useParams } from 'react-router-dom';
import { getSpotById, likeSpot } from '../api/spots.js';

const ShowSpot = () => {
  const { id } = useParams();
  const [spot, setSpot] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const spot = await getSpotById(id);
      setSpot(spot);
    };

    getData();
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();
    const data = await likeSpot(id);
    console.log(data);
    setSpot(data.data);
  };

  if (!spot) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container full-height-content">
      <div className="columns">
        <div className="column is-half">
          <figure className="image">
            <img src={spot.img} alt={spot.title} />
          </figure>
        </div>
        <div className="column is-half">
          <div className="title">{spot.title}</div>
          <div className="subtitle">{spot.location}</div>
          <div>{spot.description}</div>

          <button
            className="button is-success is-inverted"
            onClick={handleLike}
          >
            <span className="icon">
              <i className="fas fa-heart"></i>
            </span>
            <span>{spot.likedBy ? spot.likedBy.length : '0'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowSpot;
