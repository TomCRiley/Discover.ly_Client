import React from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../api/spots';

const SpotCard = ({
  _id,
  title,
  location,
  img,
  activity,
  createdBy,
  likedBy,
}) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(createdBy);
      setUser(user);
    };

    getData();
  }, []);

  let icon;
  switch (activity) {
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

  if (!_id) {
    return <p>No spots...</p>;
  }

  return (
    <div className="column">
      <Link to={`/spots/${_id}`}>
        <div className="card is-rounded">
          <div className="card-image">
            <figure className="image">
              <img src={img} alt={title} />
            </figure>
            <div className="activity-icon">
              <span className="icon has-text-white">
                <i className={`fas ${icon} fa-xl`}></i>
              </span>
            </div>
          </div>
          <div className="card-content">
            <div className="title is-4 title-card">{title}</div>
            {user ? (
              <p className="subtitle is-6">{`@${user.username}`}</p>
            ) : null}
            <p className="subtitle is-6">{location}</p>

            <button className="button is-warning is-inverted">
              <span className="icon">
                <i className="fas fa-heart"></i>
              </span>
              <span>{likedBy ? likedBy.length : '0'}</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
