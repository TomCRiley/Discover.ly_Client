import React from 'react';
import { Link } from 'react-router-dom';

const SpotCard = ({ _id, title, location, img, activity }) => {
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
          </div>

          <div className="card-header">
            <div className="card-header-title">
              <span className="icon">
                <i className={`fas ${icon}`}></i>
              </span>
              <span>{title}</span>
            </div>
          </div>

          <div className="card-content">
            <p className="subtitle">{location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
