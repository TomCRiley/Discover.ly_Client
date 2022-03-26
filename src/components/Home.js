import React from 'react';
import { getAllSpots } from '../api/spots';
import LogoColoured from '../assets/logos/logo-coloured.png';
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
      <section className="hero is-transparent is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-6">
              <img
                className="hero-image"
                src={LogoColoured}
                alt="large hero logo"
              />
            </div>
            <div className="column notification notification is-success is-light is-5">
              <h1 id="hero-title">Discover.ly</h1>
              <h2 id="hero-subtitle">
                Uncover the world around you with Discover.ly
              </h2>
              <p id="p-about-discoverly">
                Discover.ly is a social discovery app for those who like to get
                lost. Stumble across an untouched beach? How about when you took
                that left turn that you never do on your daily run. Discover the
                world around you and upload and share new spots with people all
                around the country.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {!spots ? (
          <p>Loading...</p>
        ) : (
          spots.map((spot) => <SpotCard key={spot._id} {...spot} />)
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
