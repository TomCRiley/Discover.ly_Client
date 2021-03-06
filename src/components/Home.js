import React from 'react';
import { Link } from 'react-router-dom';
import ReactTextTransition, { presets } from 'react-text-transition';
import { getAllSpots } from '../api/spots';
import SpotCard from './SpotCard';
import { getLoggedInUserId } from '../lib/auth.js';

const Home = () => {
  const [spots, setSpots] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const spots = await getAllSpots();
      setSpots(spots);
    };
    for (let i = 0; i < 5; i++) {
      setTimeout(function () {
        updateText(texts[i]);
        console.log(i);
      }, 2000 * i);
    }
    getData();
  }, []);

  const texts = ['lakes', 'mountains', 'rivers', 'ly'];
  const [setText, updateText] = React.useState('');

  console.log('userid', getLoggedInUserId());

  return (
    <>
      <section className="hero is-large hero-background">
        <div className="hero-body">
          <div className="container columns">
            <div className="column is-two-thirds">
              <h1 className="styled-title title has-text-white is-size-1">
                <section className="inline">
                  Discover.
                  <ReactTextTransition
                    text={setText}
                    springConfig={presets.gentle}
                    style={{
                      margin: '0 0px',
                    }}
                    inline
                  />
                </section>
              </h1>
              <p className="subtitle has-text-white">
                Discover.ly is a social discovery app for those who like to get
                lost. Stumble across an untouched beach? How about when you took
                that left turn that you never do on your daily run. Discover the
                world around you and upload and share new spots with people all
                around the country.
              </p>

              {getLoggedInUserId() ? (
                <span></span>
              ) : (
                <>
                  <Link className="button is-success is-light" to="/register">
                    <span>Sign up</span>
                  </Link>
                  <p className="control has-text-white">
                    <span>Already have an account? </span>
                    <Link to="/login">
                      <span className="has-text-success">Log in</span>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="columns is-centered mt-6">
        {!spots ? (
          <p>Loading...</p>
        ) : (
          spots
            // .sort(spots.likedby.length)(function (a, b) {
            //   return b - a;
            // })
            // .sort(spots.likedby.length)
            .slice(0, 3)

            .map((spot) => (
              <>
                <div className="is-parent m-4">
                  <SpotCard key={spot._id} {...spot} />
                </div>
              </>
            ))
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
