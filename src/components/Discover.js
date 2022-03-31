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

  return (
    <>
      <div className='is-flex is-justify-content-center py-6'>
        <form onSubmit={handleSubmit}>
          <div className='field has-addons'>
            <label htmlFor='search' className='label'>
              <div className='control has-icons-left is-rounded'>
                <input
                  type='text'
                  className='input'
                  placeholder='Enter search word'
                  name='text'
                  onChange={handleChange}
                  value={filter.text}
                />
                <span className='icon is-left'>
                  <i className='fas fa-search'></i>
                </span>
              </div>
            </label>
            <div className='control'>
              <button type='submit' className='button is-warning'>
                Update results
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='container full-height-content'>
        {data.length === 0 ? (
          <p>No results</p>
        ) : (
          data.map((spot, index) => (
            <Link to={`/spots/${spot._id}`} key={spot._id} className='columns'>
              {index % 2 === 0 ? (
                <>
                  <div className='column is-half'>
                    <figure className='image'>
                      <img src={spot.img} alt={spot.title} />
                    </figure>
                  </div>
                  <div className="column is-half">
                    <div className="title">{spot.title}</div>
                    <div className="subtitle">{spot.location}</div>
                    <div className="has-text-black">{spot.description}</div>

                    <button className='button is-warning is-inverted'>
                      <span className='icon'>
                        <i className='fas fa-heart'></i>
                      </span>
                      <span>{spot.likedBy ? spot.likedBy.length : '0'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='column is-half'>
                    <div className='title'>{spot.title}</div>
                    <div className='subtitle'>{spot.location}</div>
                    <div>{spot.description}</div>
                  <div className="column is-half">
                    <div className="title">{spot.title}</div>
                    <div className="subtitle">{spot.location}</div>
                    <div className="has-text-black">{spot.description}</div>

                    <button className='button is-warning is-inverted'>
                      <span className='icon'>
                        <i className='fas fa-heart'></i>
                      </span>
                      <span>{spot.likedBy ? spot.likedBy.length : '0'}</span>
                    </button>
                  </div>
                  <div className='column is-half'>
                    <figure className='image'>
                      <img src={spot.img} alt={spot.title} />
                    </figure>
                  </div>
                </>
              )}
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export default Discover;
