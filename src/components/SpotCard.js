import React from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../api/spots';

const SpotCard = ({ _id, title, location, img, activity, createdBy }) => {
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
    case 'Swimming':
      icon = 'fa-person-swimming';
      break;
    case 'Watersports':
      icon = 'fa-water';
      break;
    default:
      icon = 'fa-shoe-prints';
  }
  return (
    <div className="column is-one-quarter-desktop is-half-tablet is-one-mobile">
      <Link to={`/spots/${_id}`}>
        <div className="card">
          <div className="card-image">
            <figure>
              <img src={img} alt={title} />
            </figure>
            <div className="activity-icon">
              <span className="icon has-text-white">
                <i className={`fas ${icon}`}></i>
              </span>
            </div>
          </div>
          <div className="card-content">
            <div className="title is-4">{title}</div>
            {user ? (
              <p className="subtitle is-6">{`@${user.username}`}</p>
            ) : null}

            <p className="subtitle is-6">{location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
