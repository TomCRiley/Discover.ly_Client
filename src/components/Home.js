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
      <section className="hero">
        <div>
          <h1> TEST </h1>
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
