import React from 'react';
import ProfileDefault from '../assets/images/profileDefault.jpg';
import { getAllSpotsForUser, getUserById } from '../api/spots';
import { getLoggedInUserId } from '../lib/auth';
import SpotCard from './SpotCard';

const UserProfile = () => {
  const [spots, setSpots] = React.useState(null);
  const [user, setUser] = React.useState({});
  //get user spots not all spots
  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      const spots = await getAllSpotsForUser(user._id);
      setUser(user);
      setSpots(spots);
    };

    getData();
  }, []);

  return (
    <section className="hero ">
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
                    When you're logged in, you get access to all the spots you
                    discovered. Feel free to add a bio about yourself so other
                    users can learn more about you. This is your page!{' '}
                  </p>
                  <h1 className="title">{user.username}</h1>
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

          <div className="is-divider"></div>

          <section className="columns">
            {!spots ? (
              <p>Loading...</p>
            ) : (
              spots
                .slice(0, 4)
                .map((spot) => <SpotCard key={spot._id} {...spot} />)
            )}

          </section>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
