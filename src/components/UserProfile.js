import React from 'react';
import ProfileDefault from '../assets/images/profileDefault.jpg';
import {
  getAllSpotsForUser,
  getUserById,
  getLikedSpotsForUser,
} from '../api/spots';
import { getLoggedInUserId } from '../lib/auth';
import SpotCard from './SpotCard';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [createdSpots, setCreatedSpots] = React.useState(null);
  const [likedSpots, setLikedSpots] = React.useState(null);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      const createdSpots = await getAllSpotsForUser(user._id);
      setUser(user);
      setCreatedSpots(createdSpots);
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      const likedSpots = await getLikedSpotsForUser(user._id);
      setUser(user);
      setLikedSpots(likedSpots);
    };

    getData();
  }, []);

  console.log('user', user);
  console.log('created', createdSpots);
  console.log('liked', likedSpots);

  function spotsLength(spotsArray) {
    if (spotsArray.length === 0) {
      return <p>No spots...</p>;
    } else {
      return (
        <section className="scrolling-wrapper">
          {spotsArray.map((spot) => (
            <div className="cardzz is-rounded" key={spot._id}>
              <SpotCard key={spot._id} {...spot} />
            </div>
          ))}
        </section>

        // <div className="columns">
        //   {spotsArray.map((spot) => (
        //     <SpotCard key={spot._id} {...spot} />
        //   ))}
        // </div>
      );
    }
  }

  return (
    <section className="hero full-height-content">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={user.profileImage}
                  alt="profile pic"
                />
              </figure>
            </div>
          </div>

          <section className="section">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <div className="content is-medium">
                  <h2 className="subtitle is-5">Hi, friend!</h2>
                  <p className="is-7">
                    When you&apos;re logged in, you get access to all the spots
                    you discovered. Feel free to add a bio about yourself so
                    other users can learn more about you. This is your page!{' '}
                  </p>
                  <h1 className="title">@{user.username}</h1>
                  <p>
                    USER BIO - during register users selected preferences /
                    consequatur vel eius. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dolore sunt porro labore nemo adipisci
                    vitae ea ullam veniam ad sapiente facere commodi fugiat,
                    corrupti iusto quas expedita nesciunt reiciendis
                    necessitatibus.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="title is-5">Your spots</h3>
            <div className="">
              {!createdSpots ? <p>Loading...</p> : spotsLength(createdSpots)}
            </div>
          </section>

          <section className="my-6">
            <h3 className="title is-5">Liked spots</h3>
            <div className="">
              {!likedSpots ? <p>Loading...</p> : spotsLength(likedSpots)}
            </div>
          </section>

          <div className="has-text-centered">
            <Link to="/discover" className="button is-success">
              Discover more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
