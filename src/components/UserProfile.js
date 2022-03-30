import React from 'react';
import ProfileDefault from '../assets/images/profileDefault.jpg';
import { getAllSpots, getUserById } from '../api/spots';
import { getLoggedInUserId } from '../lib/auth';
import SpotCard from './SpotCard';

const UserProfile = () => {
  const [spots, setSpots] = React.useState(null);
  const [user, setUser] = React.useState({});
  //get user spots not all spots
  React.useEffect(() => {
    const getData = async () => {
      const spots = await getAllSpots();
      const user = await getUserById(getLoggedInUserId());
      setUser(user);
      setSpots(spots);
    };

    getData();
  }, []);
  return (
    <section class='hero '>
      <div class='hero-body'>
        <div class='container'>
          <div class='columns'>
            <div class='column is-8 is-offset-2'>
              <figure class='image is-128x128'>
                <img
                  class='is-rounded'
                  src={user.profileImage}
                  alt='profile pic'
                />
              </figure>
            </div>
          </div>

          <section class='section'>
            <div class='columns'>
              <div class='column is-8 is-offset-2'>
                <div class='content is-medium'>
                  <h2 class='subtitle is-5'>Hi, friend!</h2>
                  <p class='is-7'>
                    When you're logged in, you get access to all the spots you
                    discovered. Feel free to add a bio about yourself so other
                    users can learn more about you. This is your page!{' '}
                  </p>
                  <h1 class='title'>{user.username}</h1>
                  <p>
                    USER BIO Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Adipisci temporibus quidem architecto voluptatibus
                    neque modi quo obcaecati numquam dolorum assumenda vero
                    minima consequuntur soluta sunt quae ratione, consequatur
                    vel eius. Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Dolore sunt porro labore nemo adipisci vitae ea ullam
                    veniam ad sapiente facere commodi fugiat, corrupti iusto
                    quas expedita nesciunt reiciendis necessitatibus.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class='is-divider'></div>

          <section className='columns'>
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
