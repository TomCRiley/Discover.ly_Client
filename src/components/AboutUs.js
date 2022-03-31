import React from 'react';
import Cycling from '../assets/images/wide-road-cycling.png';
import WireframingExcal from '../assets/timeline/wireframing-excalidraw.png';

const AboutUs = () => {
  return (
    <>
      <section className='hero is-large notification'>
        <div class='timeline is-centered'>
          <header class='timeline-header'>
            <span class='tag is-medium is-primary'>Project Start</span>
          </header>
          <div class='timeline-item is-primary'>
            <div class='timeline-marker is-primary'></div>
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
          <div class='timeline-item is-primary'>
            <div class='timeline-marker is-primary'></div>
            <div class='timeline-content'>
              <p class='heading'>Git, Git, Git</p>
              <p>
                We needed two respositories - one for our client on the front
                end and
                <br /> one for our backend API.
              </p>
            </div>
          </div>
          <div class='timeline-item is-warning'>
            <div class='timeline-marker is-warning is-image is-32x32'>
              <img src='https://bulma.io/images/placeholders/32x32.png' />
            </div>
            <div class='timeline-content'>
              <p class='heading'>Working in the backend</p>
              <p>
                Created most of our API controllers for user, comments, spots
                etc.
              </p>
              <br />
              <img
                className='timeline-images'
                width='600px'
                src={Cycling}
                alt='cycling'
              />
            </div>
          </div>
          <div class='timeline-item is-warning'>
            <div class='timeline-marker is-warning'></div>
            <div class='timeline-content'>
              <p class='heading'>Working in the backend</p>
              <p>
                Created most of our API controllers for user, comments, spots
                etc.
              </p>
              <br />
              <img
                className='timeline-images'
                width='600px'
                src={Cycling}
                alt='cycling'
              />
            </div>
          </div>

          <header class='timeline-header'>
            <span class='tag is-primary'>2017</span>
          </header>
          <div class='timeline-item is-danger'>
            <div class='timeline-marker is-danger is-icon'>
              <i class='fa fa-flag'></i>
            </div>
            <div class='timeline-content'>
              <p class='heading'>March 2017</p>
              <p>Timeline content - Can include any HTML element</p>
            </div>
          </div>
          <header class='timeline-header'>
            <span class='tag is-medium is-primary'>Project Finished</span>
          </header>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
