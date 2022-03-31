import React from 'react';
import { Link } from 'react-router-dom';
import { getAllSpots } from '../api/spots';
import SpotCard from './SpotCard';

const Home = () => {
  const [spots, setSpots] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const spots = await getAllSpots();
      setSpots(spots);
    };

    getData();
  }, []);

  return (
    <>
      <section className="hero is-large hero-background">
        <div className="hero-body">
          <div className="container columns">
            <div className="column is-two-thirds">
              <h1 className="styled-title title has-text-white is-size-1">
                Discover.ly
              </h1>
              <p className="subtitle has-text-white">
                Discover.ly is a social discovery app for those who like to get
                lost. Stumble across an untouched beach? How about when you took
                that left turn that you never do on your daily run. Discover the
                world around you and upload and share new spots with people all
                around the country.
              </p>
              <Link className="button is-success is-light" to="/register">
                <span>Sign up</span>
              </Link>
              <p className="control has-text-white">
                <span>Already have an account? </span>
                <Link to="/login">
                  <span className="has-text-success">Log in</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="columns mt-6">
        {!spots ? (
          <p>Loading...</p>
        ) : (
          spots.slice(0, 3).map((spot) => <SpotCard key={spot._id} {...spot} />)
        )}
      </section>

      <div className="has-text-centered mb-5">
        <Link to="/discover" className="button is-warning p-5">
          Discover more
        </Link>
      </div>
    </>
  );
};

export default Home;
