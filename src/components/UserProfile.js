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
      <div className="has-background-info p-4 mb-4">
        <div className="columns py-6">
          <div className="column is-6 is-offset-2">
            <div className="content is-medium">
              <h2 className="subtitle is-5">Hi, friend!</h2>
              <h1 className="title">@{user.username}</h1>
              <p className="is-7">
                When you&apos;re logged in, you get access to all the spots you
                discovered.
              </p>
              <p>Check out the places you&apos;ve liked, too!</p>
            </div>
          </div>

          <div className="column is-2">
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src={user.profileImage}
                alt="profile pic"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="container">
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
          <Link to="/discover" className="button is-warning">
            Discover more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
