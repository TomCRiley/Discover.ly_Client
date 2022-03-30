import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { getSpotById, likeSpot, createComment } from '../api/spots.js';
import { getLoggedInUserId } from '../lib/auth.js';

const ShowSpot = () => {
  const { id } = useParams();
  const [spot, setSpot] = React.useState(null);
  const [commentValue, setCommentValue] = React.useState({
    text: '',
    rating: '',
  });

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

  const handleCommentChange = (e) => {
    e.preventDefault();
    setCommentValue({ ...commentValue, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit comment clicked', commentValue);
    const data = await createComment(id, commentValue);
    setCommentValue({
      text: '',
      rating: '',
    });
    console.log('returned', data);
    setSpot(data.savedSpot);
  };

  if (!spot) {
    return <p>Loading...</p>;
  }

  let icon;
  switch (spot.activity) {
    case 'Running':
      icon = 'fa-person-running';
      break;
    case 'Walking':
      icon = 'fa-person-hiking';
      break;
    case 'Cycling':
      icon = 'fa-person-biking';
      break;
    case 'Watersports':
      icon = 'fa-water';
      break;
    case 'Swimming':
      icon = 'fa-person-swimming';
      break;
    default:
      icon = 'fa-shoe-prints';
  }

  return (
    <div className="full-height-content">
      <section className="container">
        <div className="columns">
          <div className="column is-half">
            <div className="card-image">
              <figure className="image">
                <img src={spot.img} alt={spot.title} />
              </figure>
              <div className="activity-icon">
                <span className="icon has-text-white">
                  <i className={`fas ${icon}`}></i>
                </span>
              </div>
            </div>
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
      </section>

      <section className="container mt-4">
        {getLoggedInUserId() && (
          <form onSubmit={handleCommentSubmit}>
            <div className="field">
              <label htmlFor="text" className="label">
                Add a comment
              </label>
              <div className="control">
                <textarea
                  name="text"
                  id="text"
                  className="textarea"
                  rows="5"
                  value={commentValue.text}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Rating</label>
              <div className="control">
                <div className="rate" onChange={handleCommentChange}>
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5">5 stars</label>
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4">4 stars</label>
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3">3 stars</label>
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2">2 stars</label>
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1">1 star</label>
                </div>
              </div>
            </div>

            <button type="submit" className="button is-success">
              Post
            </button>
          </form>
        )}
      </section>

      <section className="container mt-4">
        {spot.comments.map((comment) => (
          <Comment key={comment._id} {...comment} />
        ))}
      </section>
    </div>
  );
};

export default ShowSpot;
