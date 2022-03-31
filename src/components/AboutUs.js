import React from 'react';
import Cycling from '../assets/images/wide-road-cycling.png';
import WireframingExcal from '../assets/timeline/wireframing-excalidraw.png';
import Models from '../assets/timeline/models.png';
import Figma from '../assets/timeline/figma.png';
import UserProfiles from '../assets/timeline/user-profiles.png';
import TeamMeeting from '../assets/timeline/team-meeting.png';
import Register from '../assets/timeline/register-page.png';
import SpotPage from '../assets/timeline/spot-page.png';
import SpotCards from '../assets/timeline/spot-cards.png';
import LikedSpots from '../assets/timeline/liked-spots.png';

const AboutUs = () => {
  return (
    <>
      <section className='hero is-large notification'>
        <div class='timeline is-centered'>
          <header class='timeline-header'>
            <span class='tag is-medium is-info'>Project Start</span>
          </header>
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info'></div>
            <div class='timeline-content'>
              <p class='heading'>Wireframing</p>
              <p>
                We were pretty quick to come up with a concept for our third
                General Assembly project. <br />
                We jumped straight into wireframing using excalidraw: <br />
                <img
                  className='timeline-images'
                  src={WireframingExcal}
                  width='600px'
                  alt='wireframing'
                />
              </p>
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info'></div>
            <div class='timeline-content'>
              <p class='heading'>Figma Concept and Design</p>
              <p>
                We spent time having a (first go!) with Figma in an attempt to
                build a colour palette and confirm our CSS layout. We also
                designed a logo based around a pin point for our mapping
                functions.
                <img
                  className='timeline-images'
                  src={Figma}
                  width='600px'
                  alt='wireframing'
                />
              </p>
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info'></div>
            <div class='timeline-content'>
              <p class='heading'>Git, Git, Git</p>
              <p>
                We created two respositories - one for our client on the front
                end and one for our backend API.
              </p>
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info'></div>
            <div class='timeline-content'>
              <p class='heading'>Spin up the backend..</p>
              <p>
                Created most of our API controllers for user, comments, spots
                etc.
              </p>
              {/* <img
                className='timeline-images'
                width='600px'
                src={Cycling}
                alt='cycling'
              /> */}
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info'></div>
            <div class='timeline-content'>
              <p class='heading'>Models!</p>
              <p>
                Worked on getting models for our comments, users, 'spots' and
                images - dueo to working with an external API provider
                Cloudinary.
              </p>
              <img
                className='timeline-images'
                width='600px'
                src={Models}
                alt='Models'
              />
            </div>
          </div>

          {/* <header class='timeline-header'>
            <span class='tag is-info'>2017</span>
          </header> */}
          <div class='timeline-item is-info'>
            <div class='timeline-marker is-info is-icon'>
              <i class='fa fa-flag'></i>
            </div>
            <div class='timeline-content'>
              <p class='heading'>Minimum Viable Product</p>
              <p>
                We wanted user profiles, maps, likes and comments. It took us a
                few days to get a very basic MVP going before we could start
                building in our stretch goals.
              </p>
              <img
                className='timeline-images'
                width='600px'
                src={UserProfiles}
                alt='Models'
              />
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-content'>
              <p class='heading'>A card based interface</p>
              <p>We worked on structuring our cards for 'discovered spots'.</p>
              <img
                className='timeline-images'
                width='600px'
                src={SpotCards}
                alt='Models'
              />
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-content'>
              <p class='heading'>Important Team Meetings</p>
              <p>Very important things being discussed.</p>
              <img
                className='timeline-images'
                width='600px'
                src={TeamMeeting}
                alt='Models'
              />
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-content'>
              <p class='heading'>Implementing Stretch Goals</p>
              <p>A more detailed register and log in functionality</p>
              <img
                className='timeline-images'
                width='600px'
                src={Register}
                alt='Models'
              />
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-content'>
              <p class='heading'>Implementing Stretch Goals</p>
              <p>Maps!</p>
              <img
                className='timeline-images'
                width='600px'
                src={SpotPage}
                alt='Models'
              />
            </div>
          </div>
          <div class='timeline-item is-info'>
            <div class='timeline-content'>
              <p class='heading'>Implementing Stretch Goals</p>
              <p>Populating user 'likes'.</p>
              <img
                className='timeline-images'
                width='600px'
                src={LikedSpots}
                alt='Models'
              />
            </div>
          </div>
          <header class='timeline-header'>
            <span class='tag is-medium is-info'>Project Launched</span>
          </header>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
