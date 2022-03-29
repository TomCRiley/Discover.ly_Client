import React from 'react';
import { getFilteredSpots } from '../api/spots';
import { Link } from 'react-router-dom';

function Discover() {
  const [data, setData] = React.useState(null);
  const [filter, setFilter] = React.useState({
    text: '',
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    try {
      const results = await getFilteredSpots(filter);
      setData(results);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="search" className="label">
            Search
          </label>
          <div className="control has-icons-left">
            <input
              type="text"
              className="input"
              placeholder="Enter search word"
              name="text"
              onChange={handleChange}
              value={filter.text}
            />
            <span className="icon is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        <button type="submit" className="button is-success">
          Update results
        </button>
      </form>
      <div className="container full-height-content">
        {data.map((spot, index) => (
          <Link to={`/spots/${spot._id}`} key={spot._id} className="columns">
            {index % 2 === 0 ? (
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

                  <button className="button is-success is-inverted">
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

                  <button className="button is-success is-inverted">
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
          </Link>
        ))}
      </div>
    </>
  );
}

export default Discover;
