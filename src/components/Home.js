import React from 'react';
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

  //state for updating the cards that show example discoveries?
  return (
    <>
      <section id="hero-image" className="hero is-large hero-background">
        <div className="hero-body">
          <div className="container">
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
            <button className="button is-success is-light">Sign up</button>
            <p className="control has-text-white">
              <span>Already have an account? </span>
              <a href="/login">
                <span className="has-text-success">Log in</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="columns mt-6">
        {!spots ? (
          <p>Loading...</p>
        ) : (
          spots.slice(0, 4).map((spot) => <SpotCard key={spot._id} {...spot} />)
        )}
      </section>
    </>
  );
};

export default Home;

{
  /* <img src={LogoColoured} alt='large hero logo' />
          <h1 class='title'>Large section</h1>
          <h2 class='subtitle'>
            A simple container to divide your page into
            <strong>sections</strong>, like the one you're currently reading.
          </h2> */
}
