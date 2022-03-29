import React from 'react';
import { getAllSpots } from '../api/spots';
import LogoColoured from '../assets/logos/logo-coloured.png';
import WideRoadCycling from '../assets/images/wide-road-cycling.png';
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
      <section className='hero is-large image'>
        <figure>
          <img src={WideRoadCycling} />
          <div className='is-overlay column hero-body is-4'>
            {/* <div className='column notification is-success is-light is-4 is-offset-4-desktop is-offset-4-tablet'></div> */}
            <div id='dialogue-box'>
              <span className='is-size-1 has-text-centered' id='hero-title'>
                Discover.ly
              </span>
              <br />
              <span className='is-size-5' id='hero-subtitle'>
                Uncover the world around you with Discover.ly
              </span>
              <br />
              <span
                className='has-text-centered is-size-7-desktop'
                id='p-about-discoverly'
              >
                Discover.ly is a social discovery app for those who like to get
                lost. Stumble across an untouched beach? How about when you took
                that left turn that you never do on your daily run. Discover the
                world around you and upload and share new spots with people all
                around the country.
              </span>
            </div>
          </div>
        </figure>
      </section>
      <section className='columns'>
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
