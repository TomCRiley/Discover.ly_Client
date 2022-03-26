import axios from 'axios';

export const getAllSpots = async () => {
  const options = {
    method: 'GET',
    url: '/api/spots',
  };

  const { data } = await axios.request(options);

  return data;
};

export const getSpotById = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/spots/${id}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const getUserById = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/users/${userId}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const likeSpot = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/spots/${id}/likes`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};
