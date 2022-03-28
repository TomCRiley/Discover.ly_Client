import React from 'react';
import { getAllSpots } from '../api/spots';

function Discover() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllSpots();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);
  return (
    <div className="container full-height-content">
      {data.map((spot, index) => (
        <div key={spot._id} className="columns">
          {index % 2 !== 0 ? (
            <>
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
                  // onClick={handleLike}
                >
                  <span className="icon">
                    <i className="fas fa-heart"></i>
                  </span>
                  <span>{spot.likedBy ? spot.likedBy.length : '0'}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="column is-half">
                <div className="title">{spot.title}</div>
                <div className="subtitle">{spot.location}</div>
                <div>{spot.description}</div>

                <button
                  className="button is-success is-inverted"
                  // onClick={handleLike}
                >
                  <span className="icon">
                    <i className="fas fa-heart"></i>
                  </span>
                  <span>{spot.likedBy ? spot.likedBy.length : '0'}</span>
                </button>
              </div>
              <div className="column is-half">
                <figure className="image">
                  <img src={spot.img} alt={spot.title} />
                </figure>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Discover;
